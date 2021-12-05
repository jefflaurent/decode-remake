"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Comparison = /** @class */ (function () {
    function Comparison(firstVariable, operator, secondVariable, isCustomValue) {
        this.firstVariable = firstVariable;
        this.secondVariable = secondVariable;
        this.isCustomValue = isCustomValue;
        this.operator = operator;
    }
    Comparison.prototype.generateBlockCodeText = function () {
        return this.isCustomValue ? this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value :
            this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name;
    };
    return Comparison;
}());
exports.default = Comparison;
