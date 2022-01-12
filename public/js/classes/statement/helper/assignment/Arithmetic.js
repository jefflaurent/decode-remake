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
var Arithmetic = /** @class */ (function () {
    function Arithmetic(firstVariable, secondVariable, firstChild, secondChild, operator, isFirstCustom, isSecondCustom) {
        this.firstChild = undefined;
        this.secondChild = undefined;
        this.firstVariable = undefined;
        this.secondVariable = undefined;
        this.firstVariable = firstVariable;
        this.secondVariable = secondVariable;
        this.firstChild = firstChild;
        this.secondChild = secondChild;
        this.operator = operator;
        this.isFirstCustom = isFirstCustom;
        this.isSecondCustom = isSecondCustom;
    }
    Arithmetic.prototype.generateBlockCodeText = function () {
        var text = '( ';
        if (this.firstVariable != undefined) {
            if (this.isFirstCustom)
                text += this.firstVariable.value + ' ';
            else
                text += this.firstVariable.name + ' ';
        }
        else
            text += this.firstChild.generateBlockCodeText() + ' ';
        text += this.operator + ' ';
        if (this.secondVariable != undefined) {
            if (this.isSecondCustom)
                text += this.secondVariable.value + ' ';
            else
                text += this.secondVariable.name + ' ';
        }
        else
            text += this.secondChild.generateBlockCodeText() + ' ';
        text += ' )';
        return text;
    };
    Arithmetic.prototype.findVariable = function (variable) {
        var temp = false;
        if (!this.isFirstCustom) {
            if (this.firstVariable.name == variable.name)
                return true;
        }
        if (!this.isSecondCustom) {
            if (this.secondVariable.name == variable.name)
                return true;
        }
        if (this.firstChild != undefined) {
            temp = this.firstChild.findVariable(variable);
            if (temp)
                return temp;
        }
        if (this.secondChild != undefined) {
            temp = this.secondChild.findVariable(variable);
            if (temp)
                return temp;
        }
        return false;
    };
    Arithmetic.prototype.toJSON = function () {
        return {
            statement: 'arithmetic',
            firstVariable: this.firstVariable,
            secondVariable: this.secondVariable,
            firstChild: this.firstChild,
            secondChild: this.secondChild,
            operator: this.operator,
            isFirstCustom: this.isFirstCustom,
            isSecondCustom: this.isSecondCustom
        };
    };
    Arithmetic.prototype.parseAttributes = function () {
        if (this.firstVariable != undefined) {
            var firstVariable = void 0;
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
            this.firstVariable = firstVariable;
        }
        if (this.secondVariable != undefined) {
            var secondVariable = void 0;
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
            this.secondVariable = secondVariable;
        }
        if (this.firstChild != undefined) {
            var firstChild = Object.assign(new Arithmetic(undefined, undefined, undefined, undefined, undefined, undefined, undefined), this.firstChild);
            firstChild.parseAttributes();
            this.firstChild = firstChild;
        }
        if (this.secondChild != undefined) {
            var secondChild = Object.assign(new Arithmetic(undefined, undefined, undefined, undefined, undefined, undefined, undefined), this.secondChild);
            secondChild.parseAttributes();
            this.secondChild = secondChild;
        }
    };
    return Arithmetic;
}());
exports.default = Arithmetic;
