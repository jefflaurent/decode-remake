"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Char_1 = __importDefault(require("../../../variable/Char"));
var String_1 = __importDefault(require("../../../variable/String"));
var Condition = /** @class */ (function () {
    function Condition(firstVariable, operator, secondVariable, isCustomValue) {
        this.firstVariable = firstVariable;
        this.operator = operator;
        this.secondVariable = secondVariable;
        this.isCustomValue = isCustomValue;
    }
    Condition.prototype.generateBlockCodeText = function () {
        if (this.isCustomValue) {
            if (this.secondVariable instanceof Char_1.default)
                return this.firstVariable.name + ' ' + this.operator + " '" + this.secondVariable.value + "'";
            else if (this.secondVariable instanceof String_1.default)
                return this.firstVariable.name + ' ' + this.operator + " \"" + this.secondVariable.value + "\"";
            else
                return this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value;
        }
        else
            return this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name;
    };
    Condition.prototype.findVariable = function (variable) {
        if (this.firstVariable.name == variable.name)
            return true;
        if (!this.isCustomValue) {
            if (this.secondVariable.name == variable.name)
                return true;
        }
        return false;
    };
    Condition.prototype.cloneCondition = function () {
        return new Condition(this.firstVariable, this.operator, this.secondVariable, this.isCustomValue);
    };
    Condition.prototype.generateCSourceCode = function () {
        var sourceCode = '';
        if (this.isCustomValue) {
            if (this.secondVariable instanceof Char_1.default)
                sourceCode = this.firstVariable.name + ' ' + this.operator + " '" + this.secondVariable.value + "'";
            else if (this.secondVariable instanceof String_1.default)
                sourceCode = 'strcmp(' + this.firstVariable.name + ", \"" + this.secondVariable.value + "\") " + this.operator + '0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value;
        }
        else {
            if (this.secondVariable instanceof String_1.default)
                sourceCode = 'strcmp(' + this.firstVariable.name + ", " + this.secondVariable.name + ") " + this.operator + '0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name;
        }
        return sourceCode;
    };
    return Condition;
}());
exports.default = Condition;
