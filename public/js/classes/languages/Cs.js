"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cs = /** @class */ (function () {
    function Cs(listStatement) {
        this.listStatement = listStatement;
        this.sourceCode = '';
    }
    Cs.prototype.generateSourceCode = function () {
        this.generateStartingTemplate();
        this.generateBody();
        this.generateFinishTemplate();
        return this.sourceCode;
    };
    Cs.prototype.generateStartingTemplate = function () {
        this.sourceCode = '';
        this.sourceCode += 'using System;\n\n';
        this.sourceCode += 'public class Decode\n';
        this.sourceCode += '{\n';
        this.sourceCode += '\tpublic Decode()\n';
        this.sourceCode += '\t{\n';
    };
    Cs.prototype.generateBody = function () {
        var temp = [];
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generateCsSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++) {
                this.sourceCode += this.getIndentation(2) + temp[j];
            }
        }
        if (this.listStatement.length == 0) {
            this.sourceCode += '\n';
        }
    };
    Cs.prototype.generateFinishTemplate = function () {
        this.sourceCode += '\t}\n\n';
        this.sourceCode += '\tpublic static void Main(string[] args)\n';
        this.sourceCode += '\t{\n';
        this.sourceCode += '\t\tnew Decode();\n';
        this.sourceCode += '\t}\n';
        this.sourceCode += '}';
    };
    Cs.prototype.getIndentation = function (level) {
        var indentation = '';
        var tab = '\t';
        for (var i = 0; i < level; i++)
            indentation += tab;
        return indentation;
    };
    return Cs;
}());
exports.default = Cs;
