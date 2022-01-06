"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cpp = /** @class */ (function () {
    function Cpp(listStatement) {
        this.listStatement = listStatement;
    }
    Cpp.prototype.generateSourceCode = function () {
        this.generateStartingTemplate();
        this.generateBody();
        this.generateFinishTemplate();
        return this.sourceCode;
    };
    Cpp.prototype.generateStartingTemplate = function () {
        this.sourceCode = '';
        this.sourceCode += '#include<iostream>\n';
        this.sourceCode += '#include<string.h>\n';
        this.sourceCode += 'using namespace std;\n\n';
        this.sourceCode += 'int main()\n';
        this.sourceCode += '{\n';
    };
    Cpp.prototype.generateBody = function () {
        var temp = [];
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generateCSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++) {
                this.sourceCode += this.getIndentation(1) + temp[j];
            }
        }
    };
    Cpp.prototype.generateFinishTemplate = function () {
        this.sourceCode += '\n';
        this.sourceCode += '\treturn 0;\n';
        this.sourceCode += '}';
    };
    Cpp.prototype.getIndentation = function (level) {
        var indentation = '';
        var tab = '\t';
        for (var i = 0; i < level; i++)
            indentation += tab;
        return indentation;
    };
    return Cpp;
}());
exports.default = Cpp;
