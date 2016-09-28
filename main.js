// 'use strict';
// let fs = require('fs'),
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

}

Obj.prototype = {
    build: function (textObj, object) {
        var column = 0;
        if (4 < textObj.x < 12) column = 0;
        else if (12 < textObj.x < 16) column = 1;
        else if (16 < textObj.x < 19) column = 2;
        else if (19 < textObj.x < 26) column = 3;
        else if (26 < textObj.x < 29) column = 4;
        else if (29 < textObj.x < 32) column = 5;
        else if (32 < textObj.x < 35) column = 6;
        else if (35 < textObj.x < 38) column = 7;
        else if (38 < textObj.x < 50) column = 8;
        switch (column) {
            case 0: 
                this.name += text.R[0].T;
                break;
            case 1:
                this.datenTyp += text.R[0].T;
                break;
            case 2:
                this.startwert += text.R[0].T;
                break;
            case 3:
                this.offset += text.R[0].T;
                break;
            case 4:
                this.remanenz += text.R[0].T;
                break;
            case 5:
                this.erreichbarAusHMI += text.R[0].T;
                break;
            case 6:
                this.sichtbarInHMI += text.R[0].T;
                break;
            case 7:
                this.einstellwert += text.R[0].T;
                break;
            case 8:
                this.kommentar += text.R[0].T;
                break;
        }
        return this;
    }
}


var counter = 0;
for (var pageIndex in config.formImage.Pages) {
    var obj = new Obj();
    for (var textIndex in config.formImage.Pages[pageIndex].Texts) {
        var text = config.formImage.Pages[pageIndex].Texts[textIndex];     
        if (cells.cell1.begin < text.x < cells.cell1.end) {
            if (counter == 0) {
                obj.name = text.R[0].T;
                counter++;
            } else {
                if (counter == 8) {
                    values.push(obj);
                    obj = {};
                }
                if (counter == 1) {
                    obj.name += text.R[0].T;
                }
            }
        } 
        if (cells.cell2.begin < text.x < cells.cell2.end) {
            if (counter == 1) {
                obj.datenTyp = text.R[0].T;
                counter++;
            } else {
                if (counter == 2) {
                    obj.datenTyp += text.R[0].T;
                }
            }
        } 
        if (cells.cell3.begin < text.x < cells.cell3.end) {
            if (counter == 2) {
                obj.offset = text.R[0].T;
                counter++;
            } else {
                if (counter == 3) {
                    obj.offset += text.R[0].T;
                }
            }
        } 
        if (cells.cell4.begin < text.x < cells.cell4.end) {
            if (counter == 3) {
                obj.startwert = text.R[0].T;
                counter++;
            } else {
                if (counter == 4) {
                    obj.startwert += text.R[0].T;
                }
            }
        } 
        if (cells.cell5.begin < text.x < cells.cell5.end) {
            // obj.remanenz = text.R[0].T;
            if (counter == 4) {
                obj.remanenz = text.R[0].T;
                counter++;
            } else {
                if (counter == 5) {
                    obj.remanenz += text.R[0].T;
                }
            }
        } 
        if (cells.cell6.begin < text.x < cells.cell6.end) {
            // obj.erreichbarAusHMI = text.R[0].T;
            if (counter == 5) {
                obj.erreichbarAusHMI = text.R[0].T;
                counter++;
            } else {
                if (counter == 6) {
                    obj.erreichbarAusHMI += text.R[0].T;
                }
            }
        } 
        if (cells.cell7.begin < text.x < cells.cell7.end) {
            // obj.sichtbarInHMI = text.R[0].T;
            if (counter == 6) {
                obj.sichtbarInHMI = text.R[0].T;
                counter++;
            } else {
                if (counter == 7) {
                    obj.sichtbarInHMI += text.R[0].T;
                }
            }
        } 
        if (cells.cell8.begin < text.x < cells.cell8.end) {
            // obj.einstellwert = text.R[0].T;
            if (counter == 7) {
                obj.einstellwert = text.R[0].T;
                counter++;
            } else {
                if (counter == 8) {
                    obj.einstellwert += text.R[0].T;
                }
            }
        } 
        if (cells.cell9.begin < text.x < cells.cell9.end) {
            // obj.kommentar = text.R[0].T;
            if (counter == 8) {
                obj.kommentar = text.R[0].T;
                counter++;
            } else {
                if (counter == 9) {
                    obj.kommentar += text.R[0].T;
                }
            }
        }
    }

}
// _.mapValues(config.pages, function(page){
    
// });
console.log(values);
