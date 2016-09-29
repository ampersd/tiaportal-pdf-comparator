var fs = require('fs');
// not all in one line, but normal
var pretty = require('pretty-data').pd;

var Line = function () {
    this.name = "";
    this.datenTyp = "";
    this.offset = "";
    this.startwert = "";
    this.remanenz = "";
    this.erreichbarAusHMI = "";
    this.sichtbarInHMI = "";
    this.einstellwert = "";
    this.kommentar = "";
}

Line.prototype = {
    // x coordinate of text in each column (you could find values in raw*.json)
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
    // if you will have different column nam - you need to put it here
    build: function (contentUri, column) {
        var content = decodeURI(contentUri);
        switch (column) {
            case 0: 
                this.name += content;
                break;
            case 1:
                this.datenTyp += content;
                break;
            case 2:
                this.offset += content;
                break;
            case 3:
                this.startwert += content;
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

Transform = function(rawJsonPath, MappedJsonPath, callback) {
    var config = require(rawJsonPath);
    var values = {};

    for (var pageIndex in config.formImage.Pages) {
        var obj = new Line();
        var prev = 0; // previous value
        var prevX = 0;
        for (var textIndex in config.formImage.Pages[pageIndex].Texts) {
            var text = config.formImage.Pages[pageIndex].Texts[textIndex];
            var columnFlag = obj.getColumnNumber(text.x); 
            // идея в том, что если колонка стала вдруг
            if (columnFlag < prev) {
                // console.log(obj);
                values[obj.name] = obj;
                obj = new Line(); 
            }
            // для работы с индентациями в первом столбце
            if (columnFlag === 0 && text.x > prevX) {
                values[obj.name] = obj;
                obj = new Line(); 
            }
            obj.build(text.R[0].T, columnFlag);
            prev = columnFlag; 
            prevX = text.x;     
        }
    }

    fs.writeFile(MappedJsonPath, pretty.json(values), callback);
}

module.exports = Transform;