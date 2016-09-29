var fs = require('fs');
var pretty = require('pretty-data').pd;
var rusDiff = require('rus-diff').rusDiff;

diffMaker = function(res1JsonPath, res2JsonPath, diffResultPath, callback) {
    var res1 = require(res1JsonPath);
    var res2 = require(res2JsonPath);
    // { '$set': { '1.erreichbarAusHMI': 'False' } }
    // получаем данные в формате диффов для mongodb, далее мы их просто трансформируем для красоты и удобства работы с ними
    var diff = rusDiff(res1,res2).$set;

    // шаг 1. группируем изменения по объектам, в которых они произошли
    var groups = {};
    var groupById = function(x) {
        // '1.erreichbarAusHMI'
        part = x.split(".");
        if (part[0] in groups) groups[part[0]].push(part[1]);
        else groups[part[0]] = new Array(part[1]);
    }
    // немножко запутанно, но именно в строчке ниже заполняется изначально пустой объект groups
    Object.keys(diff).forEach(groupById);

    // создаем красивый diff из наших групп
    var prettyDiff = {};

    var mapper = function(x) {
        var changedFields = {};
        var fill = function(fieldName){
            var obj = {};
            
            if (x < res1.length) {
                obj["oldValue"] = res1[x][fieldName]; // oldvalue, первые [x] - это обращение к элементу массива, вторые [fieldName] - это обращение к полю объекта из массива
            }    
            if (x < res2.length) {
                obj["newValue"] = res2[x][fieldName];// newvalue
            }
            changedFields[fieldName] = obj;
        }
        groups[x].forEach(fill);
        if (x < res1.length) prettyDiff[res1[x].name] = changedFields;
        else prettyDiff[res2[x].name] = changedFields;
    }
    // немножко запутанно, но именно в строчке ниже заполняется изначально пустой prettyDiff
    Object.keys(groups).forEach(mapper);

    
    // пишем в файл результат (наконец-то )
    fs.writeFile(diffResultPath, pretty.json(prettyDiff), callback);
}

module.exports = diffMaker;