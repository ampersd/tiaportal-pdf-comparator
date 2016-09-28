var parse = require('./lib/pdf2jsonParser.js');
var transform = require('./lib/mapJson.js');

var pdfPath = __dirname + "/Sys1DB397Visu1DBHMI-1.pdf";
var rawJsonPath = __dirname + "/raw.json";
var finalJsonPath = __dirname + "/res.json";

console.log("Stage 1: Parse pdf");
parse(pdfPath, rawJsonPath, function() {
    console.log("Stage 1 Completed");
    console.log("Stage 2: Transform");

    transform(rawJsonPath, finalJsonPath, function() {
        console.log("Stage 2 Completed");
    });
});




