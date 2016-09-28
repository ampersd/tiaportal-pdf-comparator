var fs = require('fs');
var PDFParser = require("pdf2json");

/// ./F1040EZ.json
/// ./Sys1DB397Visu1DBHMI-1.pdf

// TODO обернуть в промисы, чтобы можно было цепочку методов делать
Parse = function(pdfPath, rawJsonPath, callback) {
    var pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFile(rawJsonPath, JSON.stringify(pdfData), callback);
    });

    pdfParser.loadPDF(pdfPath);
}

module.exports = Parse;