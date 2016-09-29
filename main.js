var parse = require('./lib/pdf2jsonParser.js');
var transform = require('./lib/mapJson.js');
var diff = require('./lib/diffMaker.js');
var diffJsonPath = __dirname + "/diff.json";

// var pdf1Path = __dirname + "/old.pdf";
// var pdf2Path = __dirname + "/new.pdf";
// var raw1Path = __dirname + "/rawOld.json";
// var raw2Path = __dirname + "/rawNew.json";
// var res1Path = __dirname + "/resOld.json";
// var res2Path = __dirname + "/resNew.json";

// console.log("Stage1: Start processing old.pdf");
// parse(pdf1Path, raw1Path, function() {
//     console.log("Stage 1: Completed");
//     console.log("Stage 2: Transform json \"old\"");

//     transform(raw1Path, res1Path, function() {
//         console.log("Stage 2 Completed");
//         console.log("Stage 3: Start processing new.pdf");

//         parse(pdf2Path, raw2Path, function() {
//             console.log("Stage 3: Completed");
//             console.log("Stage 4: Transform json \"new\"");

//             transform(raw2Path, res2Path, function() {
//                 console.log("Stage 4 Completed");
//                 console.log("Stage 5: finding diff");

//                 diff(res1Path, res2Path, diffJsonPath, function(){
//                     console.log("diff saved to " + diffJsonPath);
//                 });
//             });
//         }); 
//     });
// });



// only finding diff stage
var res1Path = __dirname + "/resOld.json";
var res2Path = __dirname + "/resNew.json";
var diffJsonPath = __dirname + "/diff.json";
var diff = require('./lib/diffMaker.js');
diff(res1Path, res2Path, diffJsonPath);