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
var Char_1 = __importDefault(require("../variable/Char"));
var Variable_1 = __importDefault(require("../variable/Variable"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var Statement_1 = __importDefault(require("./Statement"));
var AssignmentStatement = /** @class */ (function (_super) {
    __extends(AssignmentStatement, _super);
    function AssignmentStatement(statementId, level, type, targetVariable, listArithmetic, listOperator, listIsCustom, variable, isCustomValue, start, length) {
        var _this = _super.call(this, level) || this;
        _this.variable = undefined;
        _this.listArithmetic = undefined;
        _this.listOperator = undefined;
        _this.listIsCustom = undefined;
        _this.isCustomValue = false;
        _this.start = undefined;
        _this.length = undefined;
        _this.type = type;
        _this.statementId = _this.generateId(statementId);
        _this.targetVariable = targetVariable;
        _this.variable = variable;
        _this.listArithmetic = listArithmetic;
        _this.listOperator = listOperator;
        _this.listIsCustom = listIsCustom;
        _this.isCustomValue = isCustomValue;
        _this.start = start;
        _this.length = length;
        _this.color = '#f4be0b';
        return _this;
    }
    AssignmentStatement.prototype.generateId = function (number) {
        return 'assignment-statement-' + number;
    };
    AssignmentStatement.prototype.writeToCanvas = function (canvas) {
        var text = 'SET ' + this.targetVariable.name + ' = ' + this.generateBlockCodeText();
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT);
    };
    AssignmentStatement.prototype.generateBlockCodeText = function () {
        var text = '';
        if (this.type == 'arithmetic')
            text = this.generateArithmeticText();
        else if (this.type == 'variable')
            text = this.generateVariableText();
        else if (this.type == 'length')
            text = this.generateLengthText();
        else
            text = this.generateSubText();
        return text;
    };
    AssignmentStatement.prototype.generateArithmeticText = function () {
        var text = '';
        var opIdx = 0;
        var customIdx = 0;
        for (var i = 0; i < this.listArithmetic.length; i++) {
            if (this.listArithmetic[i] instanceof Variable_1.default) {
                if (this.listIsCustom != undefined) {
                    if (this.listIsCustom[customIdx])
                        text += ' ' + this.listArithmetic[i].value + ' ';
                    else
                        text += ' ' + this.listArithmetic[i].name + ' ';
                    customIdx++;
                }
            }
            else {
                text += this.listArithmetic[i].generateBlockCodeText();
            }
            if (this.listOperator != undefined) {
                if (opIdx < this.listOperator.length) {
                    text += ' ' + this.listOperator[opIdx] + ' ';
                    opIdx++;
                }
            }
        }
        return text;
    };
    AssignmentStatement.prototype.generateVariableText = function () {
        if (this.isCustomValue) {
            if (this.variable instanceof Char_1.default)
                return "'" + this.variable.value + "'";
            else
                return this.variable.value;
        }
        else
            return this.variable.name;
    };
    AssignmentStatement.prototype.generateLengthText = function () {
        return 'LENGTH OF ' + this.variable.name;
    };
    AssignmentStatement.prototype.generateSubText = function () {
        return this.variable.name + ' FROM ' + this.start + ' WITH LENGTH ' + this.length;
    };
    AssignmentStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.parent = this;
        this.option.draw(canvas);
    };
    AssignmentStatement.prototype.callClickEvent = function (canvas, x, y) {
        return this.option.clickOption(canvas, x, y);
    };
    AssignmentStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        return false;
    };
    AssignmentStatement.prototype.findVariable = function (variable) {
        if (this.type == 'variable')
            return this.findTypeVariable(variable);
        else if (this.type == 'arithmetic')
            return this.findTypeArithmetic(variable);
        else
            return this.findTypeString(variable);
    };
    AssignmentStatement.prototype.findTypeVariable = function (variable) {
        if (this.targetVariable.name == variable.name)
            return this;
        if (!this.isCustomValue) {
            if (this.variable.name == variable.name)
                return this;
        }
        return undefined;
    };
    AssignmentStatement.prototype.findTypeArithmetic = function (variable) {
        var temp = false;
        if (this.listArithmetic != undefined) {
            for (var i = 0; i < this.listArithmetic.length; i++) {
                temp = this.listArithmetic[i].findVariable(variable);
                if (temp)
                    return this;
            }
        }
        return undefined;
    };
    AssignmentStatement.prototype.findTypeString = function (variable) {
        if (this.targetVariable.name == variable.name)
            return this;
        else if (this.variable.name == variable.name)
            return this;
        return undefined;
    };
    AssignmentStatement.prototype.cloneStatement = function (statementCount) {
        var newStatement = new AssignmentStatement(statementCount, this.level, this.type, this.targetVariable, this.listArithmetic, this.listOperator, this.listIsCustom, this.variable, this.isCustomValue, this.start, this.length);
        return new ReturnClone_1.default(newStatement, true);
    };
    return AssignmentStatement;
}(Statement_1.default));
exports.default = AssignmentStatement;
