"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Arithmetic = /** @class */ (function () {
    function Arithmetic(firstVariable, secondVariable, firstChild, secondChild, operator, isCustom) {
        this.firstChild = undefined;
        this.secondChild = undefined;
        this.firstVariable = undefined;
        this.secondVariable = undefined;
        this.firstVariable = firstVariable;
        this.secondVariable = secondVariable;
        this.firstChild = firstChild;
        this.secondChild = secondChild;
        this.operator = operator;
        this.isCustom = isCustom;
    }
    Arithmetic.prototype.generateBlockCodeText = function () {
        var text = '( ';
        if (this.firstVariable != undefined)
            text += this.firstVariable.name + ' ';
        else
            text += this.firstChild.generateBlockCodeText() + ' ';
        text += this.operator + ' ';
        if (this.secondVariable != undefined) {
            if (this.isCustom)
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
        if (this.firstVariable.name == variable.name)
            return true;
        if (!this.isCustom) {
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
    return Arithmetic;
}());
exports.default = Arithmetic;
