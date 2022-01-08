"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Language = /** @class */ (function () {
    function Language(listStatement) {
        this.listStatement = listStatement;
        this.sourceCode = '';
    }
    Language.prototype.generateSourceCode = function () { return ''; };
    Language.prototype.generateStartingTemplate = function () { };
    Language.prototype.generateBody = function () { };
    Language.prototype.generateFinishTemplate = function () { };
    Language.prototype.getIndentation = function (level) {
        var indentation = '';
        var tab = '\t';
        for (var i = 0; i < level; i++)
            indentation += tab;
        return indentation;
    };
    return Language;
}());
exports.default = Language;
