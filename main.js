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

var cells = {
    cell1: {
        begin: 4,
        end: 12
    },
    cell2: {
        begin: 12,
        end: 16
    },
    cell3: {
        begin: 16,
        end: 19
    },
    cell4: {
        begin: 19,
        end: 26
    },
    cell5: {
        begin: 26,
        end: 29
    },
    cell6: {
        begin: 29,
        end: 32
    },
    cell7: {
        begin: 32,
        end: 35
    },
    cell8: {
        begin: 35,
        end: 38
    },
    cell9: {
        begin: 38,
        end: 50
    }
}

var counter = 0;
for (var pageIndex in config.formImage.Pages) {
    var obj = {};
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
