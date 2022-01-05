"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Java = /** @class */ (function () {
    function Java(listStatement) {
        this.listStatement = listStatement;
    }
    Java.prototype.generateSourceCode = function () {
        this.generateStartingTemplate();
        this.generateBody();
        this.generateFinishTemplate();
        return this.sourceCode;
    };
    Java.prototype.generateStartingTemplate = function () {
        this.sourceCode = '';
        this.sourceCode += 'import java.util.Scanner;\n\n';
        this.sourceCode += 'public class Decode\n';
        this.sourceCode += '{\n';
        this.sourceCode += '\tScanner scan = new Scanner(System.in);\n\n';
        this.sourceCode += '\tpublic Decode()\n';
        this.sourceCode += '\t{\n';
    };
    Java.prototype.generateBody = function () {
        var temp = [];
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generateJavaSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++) {
                this.sourceCode += this.getIndentation(2) + temp[j];
            }
        }
        if (this.listStatement.length == 0) {
            this.sourceCode += '\n';
        }
    };
    Java.prototype.generateFinishTemplate = function () {
        this.sourceCode += '\t}\n\n';
        this.sourceCode += '\tpublic static void main(String[] args)\n';
        this.sourceCode += '\t{\n';
        this.sourceCode += '\t\tnew Decode();\n';
        this.sourceCode += '\t}\n';
        this.sourceCode += '}';
    };
    Java.prototype.getIndentation = function (level) {
        var indentation = '';
        var tab = '\t';
        for (var i = 0; i < level; i++)
            indentation += tab;
        return indentation;
    };
    return Java;
}());
exports.default = Java;
