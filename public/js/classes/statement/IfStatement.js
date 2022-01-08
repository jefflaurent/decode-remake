"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../utilities/ReturnClone"));
var If_1 = __importDefault(require("./helper/ifs/If"));
var Statement_1 = __importDefault(require("./Statement"));
var IfStatement = /** @class */ (function (_super) {
    __extends(IfStatement, _super);
    function IfStatement(level, statementId, ifOperations) {
        var _this = _super.call(this, level) || this;
        _this.statementId = _this.generateId(statementId);
        _this.ifOperations = ifOperations;
        _this.init();
        return _this;
    }
    IfStatement.prototype.updateChildLevel = function () {
        if (this.ifOperations != undefined) {
            for (var i = 0; i < this.ifOperations.length; i++) {
                this.ifOperations[i].level = this.level;
                if (this.ifOperations[i] instanceof If_1.default)
                    this.ifOperations[i].updateChildLevel();
                else
                    this.ifOperations[i].updateChildLevel();
            }
        }
    };
    IfStatement.prototype.generateId = function (number) {
        return 'if-statement-' + number;
    };
    IfStatement.prototype.updateIfOperations = function (ifOperations) {
        this.ifOperations = ifOperations;
        this.init();
    };
    IfStatement.prototype.init = function () {
        if (this.ifOperations != undefined) {
            for (var i = 0; i < this.ifOperations.length; i++) {
                if (this.ifOperations[i] != undefined)
                    this.ifOperations[i].parent = this;
            }
        }
    };
    IfStatement.prototype.writeToCanvas = function (canvas) {
        if (this.ifOperations)
            for (var i = 0; i < this.ifOperations.length; i++) {
                if (i != this.ifOperations.length - 1)
                    this.ifOperations[i].writeToCanvas(canvas, false);
                else
                    this.ifOperations[i].writeToCanvas(canvas, true);
            }
    };
    IfStatement.prototype.callClickEvent = function (canvas, x, y) {
        var temp = this.option.clickOption(canvas, x, y);
        var tempChild = undefined;
        if (this.ifOperations != undefined)
            for (var i = 0; i < this.ifOperations.length; i++) {
                tempChild = this.ifOperations[i].callClickEvent(canvas, x, y);
                if (tempChild != undefined)
                    break;
            }
        return temp ? temp : tempChild;
    };
    IfStatement.prototype.findVariable = function (variable) {
        var temp = undefined;
        for (var i = 0; i < this.ifOperations.length; i++) {
            temp = this.ifOperations[i].findVariable(variable);
            if (temp != undefined)
                return temp;
        }
        return undefined;
    };
    IfStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        var statementFound = false;
        for (var i = 0; i < this.ifOperations.length; i++) {
            statementFound = this.ifOperations[i].findStatement(statement);
            if (statementFound)
                return true;
        }
        return false;
    };
    IfStatement.prototype.cloneStatement = function (statementCount) {
        var ifStatement = new IfStatement(this.level, statementCount++, undefined);
        var ifOperations = [];
        var returnClone = undefined;
        for (var i = 0; i < this.ifOperations.length; i++) {
            returnClone = this.ifOperations[i].cloneStatement(statementCount++);
            if (returnClone.result == false)
                return returnClone;
            ifOperations.push(returnClone.statement);
            ifStatement.updateIfOperations(ifOperations);
        }
        return new ReturnClone_1.default(ifStatement, true);
    };
    IfStatement.prototype.turnOffOption = function () {
        if (this.option != undefined)
            this.option.isSelectionActive = false;
        if (this.ifOperations != undefined) {
            for (var i = 0; i < this.ifOperations.length; i++)
                this.ifOperations[i].turnOffOption();
        }
    };
    IfStatement.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        for (var i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generateCSourceCode());
        return sourceCodeContainer;
    };
    IfStatement.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        for (var i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generateCppSourceCode());
        return sourceCodeContainer;
    };
    IfStatement.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        for (var i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generateJavaSourceCode());
        return sourceCodeContainer;
    };
    IfStatement.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        for (var i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generateCsSourceCode());
        return sourceCodeContainer;
    };
    IfStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        for (var i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generatePythonSourceCode());
        return sourceCodeContainer;
    };
    return IfStatement;
}(Statement_1.default));
exports.default = IfStatement;
