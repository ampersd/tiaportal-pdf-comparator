var fs = require('fs');
var pretty = require('pretty-data').pd;
var rusDiff = require('rus-diff').rusDiff;

diffMaker = function(res1JsonPath, res2JsonPath, diffResultPath, callback) {
    var res1 = require(res1JsonPath);
    var res2 = require(res2JsonPath);
    // { '$set': { '1.erreichbarAusHMI': 'False' } }
    // получаем данные в формате диффов для mongodb, далее мы их просто трансформируем для красоты и удобства работы с ними
    var diff = rusDiff(res1,res2)
    var changed = diff.$set;
    var removed = diff.$unset;
    
    // шаг 1. группируем изменения по объектам, в которых они произошли
    var groups = {
        removed: {},
        updated: {},
        added: {}
    };

    groups.removed = removed;

    var groupById = function(x) {
        // '1.erreichbarAusHMI'
        parts = x.split(".");
        if (parts.length === 1) {
            // for verbose output we can change 'true' to 'changed[parts[0]]'
            groups.added[parts[0]] = true;  // добавить в added
        }
        else {
            // добавить в updated
            if (!(parts[0] in groups.updated)) groups.updated[parts[0]] = {};       
            groups.updated[parts[0]][parts[1]] = changed[x];
        }
    }
    // в строке ниже метод groupById применяется к каждому объекту в changed
    Object.keys(changed).forEach(groupById);
    
    // пишем в файл результат (наконец-то )
    fs.writeFile(diffResultPath, pretty.json(groups), callback);
}

module.exports = diffMaker;