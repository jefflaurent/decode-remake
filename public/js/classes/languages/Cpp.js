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
var Cpp = /** @class */ (function (_super) {
    __extends(Cpp, _super);
    function Cpp(listStatement) {
        return _super.call(this, listStatement) || this;
    }
    Cpp.prototype.generateSourceCode = function () {
        this.generateStartingTemplate();
        this.generateBody();
        this.generateFinishTemplate();
        return this.sourceCode;
    };
    Cpp.prototype.generateStartingTemplate = function () {
        this.sourceCode = '';
        this.sourceCode += '#include<iostream>\n';
        this.sourceCode += '#include<string.h>\n';
        this.sourceCode += 'using namespace std;\n\n';
        this.sourceCode += 'int main()\n';
        this.sourceCode += '{\n';
    };
    Cpp.prototype.generateBody = function () {
        var temp = [];
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generateCppSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++) {
                this.sourceCode += this.getIndentation(1) + temp[j];
            }
        }
    };
    Cpp.prototype.generateFinishTemplate = function () {
        this.sourceCode += '\n';
        this.sourceCode += '\treturn 0;\n';
        this.sourceCode += '}';
    };
    return Cpp;
}(Language_1.default));
exports.default = Cpp;
