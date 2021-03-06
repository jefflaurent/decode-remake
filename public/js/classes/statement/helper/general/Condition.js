"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Char_1 = __importDefault(require("../../../variable/Char"));
var Double_1 = __importDefault(require("../../../variable/Double"));
var Float_1 = __importDefault(require("../../../variable/Float"));
var Integer_1 = __importDefault(require("../../../variable/Integer"));
var Long_1 = __importDefault(require("../../../variable/Long"));
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
                sourceCode = 'strcmp(' + this.firstVariable.name + ", \"" + this.secondVariable.value + "\") " + this.operator + ' 0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value;
        }
        else {
            if (this.secondVariable instanceof String_1.default)
                sourceCode = 'strcmp(' + this.firstVariable.name + ", " + this.secondVariable.name + ") " + this.operator + ' 0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name;
        }
        return sourceCode;
    };
    Condition.prototype.generateJavaSourceCode = function () {
        var sourceCode = '';
        if (this.isCustomValue) {
            if (this.secondVariable instanceof Char_1.default)
                sourceCode = this.firstVariable.name + ' ' + this.operator + " '" + this.secondVariable.value + "'";
            else if (this.secondVariable instanceof String_1.default)
                sourceCode = this.firstVariable.name + ".compareTo(\"" + this.secondVariable.value + "\") " + this.operator + ' 0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value;
        }
        else {
            if (this.secondVariable instanceof String_1.default)
                sourceCode = this.firstVariable.name + ".compareTo(\"" + this.secondVariable.name + "\") " + this.operator + ' 0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name;
        }
        return sourceCode;
    };
    Condition.prototype.generateCsSourceCode = function () {
        var sourceCode = '';
        if (this.isCustomValue) {
            if (this.secondVariable instanceof Char_1.default)
                sourceCode = this.firstVariable.name + ' ' + this.operator + " '" + this.secondVariable.value + "'";
            else if (this.secondVariable instanceof String_1.default)
                sourceCode = this.firstVariable.name + ".Compare(\"" + this.secondVariable.value + "\") " + this.operator + ' 0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value;
        }
        else {
            if (this.secondVariable instanceof String_1.default)
                sourceCode = this.firstVariable.name + ".Compare(\"" + this.secondVariable.name + "\") " + this.operator + ' 0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name;
        }
        return sourceCode;
    };
    Condition.prototype.generatePythonSourceCode = function () {
        var sourceCode = '';
        if (this.isCustomValue) {
            if (this.firstVariable instanceof Char_1.default || this.secondVariable instanceof Char_1.default) {
                if (this.firstVariable instanceof Char_1.default) {
                    if (this.secondVariable instanceof Integer_1.default || this.secondVariable instanceof Float_1.default
                        || this.secondVariable instanceof Long_1.default || this.secondVariable instanceof Double_1.default) {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + ' chr(' + this.secondVariable.value + ')';
                    }
                    else {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + " '" + this.secondVariable.value + "'";
                    }
                }
                else if (this.secondVariable instanceof Char_1.default) {
                    if (this.firstVariable instanceof Integer_1.default || this.firstVariable instanceof Float_1.default
                        || this.firstVariable instanceof Long_1.default || this.firstVariable instanceof Double_1.default) {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + " ord('" + this.secondVariable.value + "')";
                    }
                    else {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + " '" + this.secondVariable.value + "'";
                    }
                }
            }
            else {
                if (this.firstVariable instanceof String_1.default)
                    sourceCode = this.firstVariable.name + ' ' + this.operator + " \"" + this.secondVariable.value + "\"";
                else
                    sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value;
            }
        }
        else {
            if (this.firstVariable instanceof Char_1.default || this.secondVariable instanceof Char_1.default) {
                if (this.firstVariable instanceof Char_1.default) {
                    if (this.secondVariable instanceof Integer_1.default || this.secondVariable instanceof Float_1.default
                        || this.secondVariable instanceof Long_1.default || this.secondVariable instanceof Double_1.default) {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + ' chr(' + this.secondVariable.name + ')';
                    }
                    else {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + " " + this.secondVariable.name;
                    }
                }
                else if (this.secondVariable instanceof Char_1.default) {
                    if (this.firstVariable instanceof Integer_1.default || this.firstVariable instanceof Float_1.default
                        || this.firstVariable instanceof Long_1.default || this.firstVariable instanceof Double_1.default) {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + " ord(" + this.secondVariable.name + ")";
                    }
                    else {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + " " + this.secondVariable.name;
                    }
                }
            }
            else {
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name;
            }
        }
        return sourceCode;
    };
    Condition.prototype.parseAttributes = function () {
        var firstVariable;
        var secondVariable;
        if (this.firstVariable.type == 'int')
            firstVariable = Object.assign(new Integer_1.default(undefined, undefined), this.firstVariable);
        else if (this.firstVariable.type == 'double')
            firstVariable = Object.assign(new Double_1.default(undefined, undefined), this.firstVariable);
        else if (this.firstVariable.type == 'long')
            firstVariable = Object.assign(new Long_1.default(undefined, undefined), this.firstVariable);
        else if (this.firstVariable.type == 'float')
            firstVariable = Object.assign(new Float_1.default(undefined, undefined), this.firstVariable);
        else if (this.firstVariable.type == 'char')
            firstVariable = Object.assign(new Char_1.default(undefined, undefined), this.firstVariable);
        else
            firstVariable = Object.assign(new String_1.default(undefined, undefined), this.firstVariable);
        if (this.secondVariable.type == 'int')
            secondVariable = Object.assign(new Integer_1.default(undefined, undefined), this.secondVariable);
        else if (this.secondVariable.type == 'double')
            secondVariable = Object.assign(new Double_1.default(undefined, undefined), this.secondVariable);
        else if (this.secondVariable.type == 'long')
            secondVariable = Object.assign(new Long_1.default(undefined, undefined), this.secondVariable);
        else if (this.secondVariable.type == 'float')
            secondVariable = Object.assign(new Float_1.default(undefined, undefined), this.secondVariable);
        else if (this.secondVariable.type == 'char')
            secondVariable = Object.assign(new Char_1.default(undefined, undefined), this.secondVariable);
        else
            secondVariable = Object.assign(new String_1.default(undefined, undefined), this.secondVariable);
        this.firstVariable = firstVariable;
        this.secondVariable = secondVariable;
    };
    return Condition;
}());
exports.default = Condition;
