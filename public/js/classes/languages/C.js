"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function () {
    function C(listStatement) {
        this.listStatement = listStatement;
    }
    C.prototype.generateSourceCode = function () {
        this.generateStartingTemplate();
        this.generateBody();
        this.generateFinishTemplate();
        return this.sourceCode;
    };
    C.prototype.generateStartingTemplate = function () {
        this.sourceCode = '';
        this.sourceCode += '#include<stdio.h>\n';
        this.sourceCode += '#include<string.h>\n\n';
        this.sourceCode += 'int main()\n';
        this.sourceCode += '{\n';
    };
    C.prototype.generateBody = function () {
        var temp;
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = '';
            temp = this.getIndentation(this.listStatement[i].level);
            temp += this.listStatement[i].generateCSourceCode();
            this.sourceCode += temp;
        }
    };
    C.prototype.generateFinishTemplate = function () {
        this.sourceCode += '\n';
        this.sourceCode += '\treturn 0;\n';
        this.sourceCode += '}';
    };
    C.prototype.getIndentation = function (level) {
        var indentation = '';
        var tab = '\t';
        for (var i = 0; i < level; i++)
            indentation += tab;
        return indentation;
    };
    return C;
}());
exports.default = C;
