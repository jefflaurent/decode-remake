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
var Statement_1 = __importDefault(require("./Statement"));
var AssignmentStatement = /** @class */ (function (_super) {
    __extends(AssignmentStatement, _super);
    function AssignmentStatement(level, firstVariable, secondVariable, isCustomValue) {
        var _this = _super.call(this, level) || this;
        _this.firstVariable = firstVariable;
        _this.secondVariable = secondVariable;
        _this.isCustomValue = isCustomValue;
        return _this;
    }
    AssignmentStatement.prototype.generateBlockCodeText = function () {
        return this.isCustomValue ? this.firstVariable.name + ' = ' + this.secondVariable.value :
            this.firstVariable.name + ' = ' + this.secondVariable.name;
    };
    return AssignmentStatement;
}(Statement_1.default));
exports.default = AssignmentStatement;
