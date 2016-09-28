// var parse = require('./lib/pdf2jsonParser.js');
// var transform = require('./lib/mapJson.js');

// var pdf1Path = __dirname + "/old.pdf";
// var raw1Path = __dirname + "/rawOld.json";
var res1Path = __dirname + "/resOld.json";

// var pdf2Path = __dirname + "/new.pdf";
// var raw2Path = __dirname + "/rawNew.json";
var res2Path = __dirname + "/resNew.json";

// console.log("Stage 1: Parse pdf");
// parse(pdf1Path, raw1Path, function() {
//     console.log("Stage 1 Completed");
//     console.log("Stage 2: Transform");

//     transform(raw1Path, res1Path, function() {
//         console.log("Stage 2 Completed");
//     });
// });




var diffJsonPath = __dirname + "/diff.json";

var diff = require('./lib/diffMaker.js');

diff(res1Path, res2Path, diffJsonPath);