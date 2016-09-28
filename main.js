// 'use strict';s
var fs = require('fs');
//     PDFParser = require("pdf2json");

// let pdfParser = new PDFParser();

// pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
// pdfParser.on("pdfParser_dataReady", pdfData => {
//     fs.writeFile("./F1040EZ.json", JSON.stringify(pdfData));
// });

// pdfParser.loadPDF("./Sys1DB397Visu1DBHMI-1.pdf");


var config = require('./F1040EZ.json');
// var _ = require('lodash');
var values = [];

function Obj () {
    this.name = "";
    this.datenTyp = "";
    this.startwert = "";
    this.offset = "";
    this.remanenz = "";
    this.erreichbarAusHMI = "";
    this.sichtbarInHMI = "";
    this.einstellwert = "";
    this.kommentar = "";
}

Obj.prototype = {
    getColumnNumber:  function (x) {
        var column = 0;
        if (0 < x && x < 12) column = 0;
        else if (12 < x && x < 16) column = 1;
        else if (16 < x && x < 19) column = 2;
        else if (19 < x && x < 26) column = 3;
        else if (26 < x && x < 29) column = 4;
        else if (29 < x && x < 32) column = 5;
        else if (32 < x && x < 35) column = 6;
        else if (35 < x && x < 38) column = 7;
        else if (38 < x && x < 50) column = 8;
        return column;
    },
    build: function (content, column) {
        switch (column) {
            case 0: 
                this.name += content;
                break;
            case 1:
                this.datenTyp += content;
                break;
            case 2:
                this.startwert += content;
                break;
            case 3:
                this.offset += content;
                break;
            case 4:
                this.remanenz += content;
                break;
            case 5:
                this.erreichbarAusHMI += content;
                break;
            case 6:
                this.sichtbarInHMI += content;
                break;
            case 7:
                this.einstellwert += content;
                break;
            case 8:
                this.kommentar += content;
                break;
        }
    }
}

for (var pageIndex in config.formImage.Pages) {
    var obj = new Obj();
    var prev = 0;
    for (var textIndex in config.formImage.Pages[pageIndex].Texts) {
        var text = config.formImage.Pages[pageIndex].Texts[textIndex];
        var columnFlag = obj.getColumnNumber(text.x); 
        if (columnFlag < prev) {
            console.log(obj);
            values.push(obj);
            obj = new Obj(); 
        }
        obj.build(text.R[0].T, columnFlag);
        prev = columnFlag;      
    }
}
// _.mapValues(config.pages, function(page){
    
// });
console.log(values);
fs.writeFile("./result.json", JSON.stringify(values));