"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../utilities/ReturnClone"));
var Statement = /** @class */ (function () {
    function Statement(level) {
        this.statementId = '';
        this.level = level;
        this.childStatement = undefined;
        this.parent = undefined;
    }
    Statement.prototype.updateChildLevel = function () {
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                this.childStatement[i].level = this.level + 1;
                this.childStatement[i].updateChildLevel();
            }
        }
    };
    Statement.prototype.moveToSurface = function () {
        this.level = 1;
        this.parent = undefined;
    };
    Statement.prototype.getParent = function () {
        return this.parent;
    };
    Statement.prototype.getIndentation = function () {
        var indentation = '';
        var tab = '\t';
        for (var i = 1; i < this.level; i++)
            indentation += tab;
        return indentation;
    };
    Statement.prototype.generateId = function (number) { };
    Statement.prototype.writeToCanvas = function (canvas, isClose) { };
    Statement.prototype.updateChildStatement = function (childStatement) { };
    Statement.prototype.callClickEvent = function (canvas, x, y) { };
    Statement.prototype.findVariable = function (variable) { return undefined; };
    Statement.prototype.cloneStatement = function (statementCount) { return new ReturnClone_1.default(this, false); };
    Statement.prototype.findStatement = function (statement) { return false; };
    Statement.prototype.generateCSourceCode = function () { return []; };
    Statement.prototype.generateJavaSourceCode = function () { return []; };
    Statement.prototype.generatePythonSourceCode = function () { return []; };
    return Statement;
}());
exports.default = Statement;
