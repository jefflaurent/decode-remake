"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Python = /** @class */ (function () {
    function Python(listStatement) {
        this.listStatement = listStatement;
        this.sourceCode = '';
    }
    Python.prototype.generateSourceCode = function () {
        this.generateBody();
        return this.sourceCode;
    };
    Python.prototype.generateBody = function () {
        var temp = [];
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generatePythonSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++) {
                this.sourceCode += temp[j];
            }
        }
    };
    return Python;
}());
exports.default = Python;
