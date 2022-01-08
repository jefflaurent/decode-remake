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
var Language_1 = __importDefault(require("./Language"));
var Python = /** @class */ (function (_super) {
    __extends(Python, _super);
    function Python(listStatement) {
        return _super.call(this, listStatement) || this;
    }
    Python.prototype.generateSourceCode = function () {
        this.generateBody();
        return this.sourceCode;
    };
    Python.prototype.generateBody = function () {
        var temp = [];
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generatePythonSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++) {
                this.sourceCode += temp[j];
            }
        }
    };
    return Python;
}(Language_1.default));
exports.default = Python;
