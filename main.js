// var parse = require('./lib/pdf2jsonParser.js');
// var transform = require('./lib/mapJson.js');

// var pdfPath = __dirname + "/Sys1DB397Visu1DBHMI-1.pdf";
// var rawJsonPath = __dirname + "/raw.json";
// var finalJsonPath = __dirname + "/res.json";

// console.log("Stage 1: Parse pdf");
// parse(pdfPath, rawJsonPath, function() {
//     console.log("Stage 1 Completed");
//     console.log("Stage 2: Transform");

//     transform(rawJsonPath, finalJsonPath, function() {
//         console.log("Stage 2 Completed");
//     });
// });



var res1 = require("./res.json");
var res2 = require("./res2.json");
var rusDiff = require('rus-diff').rusDiff;

// { '$set': { '1.erreichbarAusHMI': 'False' } }
// Example: x = { '1.erreichbarAusHMI': 'False' }
var groups = {};
var groupById = function(x) {
    // '1.erreichbarAusHMI'
    part = x.split(".");
    if (part[0] in groups) groups[part[0]].push(part[1]);
    else groups[part[0]] = new Array(part[1]);
}

var diff = rusDiff(res1,res2).$set;
var keys = Object.keys(diff);

// немножко запутанно, но именно в строчке ниже заполняется изначально пустой объект groups
Object.keys(diff).forEach(groupById);

// создаем красивый diff из наших групп
var prettyDiff = {};

var mapper = function(x) {
    var changedFields = {};

    var fill = function(fieldName){
        changedFields[fieldName] = {
            "oldValue": res1[x][fieldName], // oldvalue, первые [x] - это обращение к элементу массива, вторые [fieldName] - это обращение к полю объекта из массива
            "newValue": res2[x][fieldName] // newvalue
        }
    }

    groups[x].forEach(fill);

    if (res1[x].name in prettyDiff) {
    }
    else prettyDiff[res1[x].name] = changedFields;
}

// немножко запутанно, но именно в строчке ниже заполняется изначально пустой prettyDiff
Object.keys(groups).forEach(mapper);

console.log(prettyDiff);


