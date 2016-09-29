var fs = require('fs');
var pretty = require('pretty-data').pd;
var rusDiff = require('rus-diff').rusDiff;

diffMaker = function(res1JsonPath, res2JsonPath, diffResultPath, callback) {
    var res1 = require(res1JsonPath);
    var res2 = require(res2JsonPath);
    // { '$set': { '1.erreichbarAusHMI': 'False' } }
    // get data in diff mongodb format, next we transform them into 'group' for the best perception
    var diff = rusDiff(res1,res2);

    // write intermidiate stage result
    fs.writeFile(__dirname + "/../temp/mongodbDiff.json", pretty.json(diff), callback);

    var changed = diff.$set;
    var removed = diff.$unset;
    
    // grouped changes by the objects in which they occurred
    var groups = {
        removed: {},
        updated: {},
        added: {}
    };

    groups.removed = removed;

    var groupByName = function(x) {
        // "$set": {
        //     "ActuellValueHumidity.kommentar": "ActuellValueHumidity",
        //     "ActuellValueHumidity.offset": "60.0",
        //     "ActuellValueSunEast": { ... }
        // }
        // keys: 'ActuellValueHumidity.kommentar', 'ActuellValueHumidity.offset', 'ActuellValueSunEast'
        // parts[0] = ActuellValueHumidity, parts[1] = kommentar
        // 'ActuellValueSunEast' has only parts[0] - it's absolutely new added element
        
        parts = x.replace("%2C", ",").split("."); // replace - for some URI symbols
        if (parts.length === 1) {
            // add to 'added'
            groups.added[parts[0]] = true;  // for verbose output we can change 'true' to 'changed[parts[0]]'
        }
        else {
            // add to 'updated'
            if (!(parts[0] in groups.updated)) groups.updated[parts[0]] = {};       
            groups.updated[parts[0]][parts[1]] = changed[x];
        }
    }
    // in line below method 'groupByName' applies to every field in 'changed'
    Object.keys(changed).forEach(groupByName);
    
    // write result to a file (finally)
    fs.writeFile(diffResultPath, pretty.json(groups), callback);
}

module.exports = diffMaker;