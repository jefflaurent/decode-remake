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
var Cs = /** @class */ (function (_super) {
    __extends(Cs, _super);
    function Cs(listStatement) {
        return _super.call(this, listStatement) || this;
    }
    Cs.prototype.generateSourceCode = function () {
        this.generateStartingTemplate();
        this.generateBody();
        this.generateFinishTemplate();
        return this.sourceCode;
    };
    Cs.prototype.generateStartingTemplate = function () {
        this.sourceCode = '';
        this.sourceCode += 'using System;\n\n';
        this.sourceCode += 'public class Decode\n';
        this.sourceCode += '{\n';
        this.sourceCode += '\tpublic Decode()\n';
        this.sourceCode += '\t{\n';
    };
    Cs.prototype.generateBody = function () {
        var temp = [];
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generateCsSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++) {
                this.sourceCode += this.getIndentation(2) + temp[j];
            }
        }
        if (this.listStatement.length == 0) {
            this.sourceCode += '\n';
        }
    };
    Cs.prototype.generateFinishTemplate = function () {
        this.sourceCode += '\t}\n\n';
        this.sourceCode += '\tpublic static void Main(string[] args)\n';
        this.sourceCode += '\t{\n';
        this.sourceCode += '\t\tnew Decode();\n';
        this.sourceCode += '\t}\n';
        this.sourceCode += '}';
    };
    return Cs;
}(Language_1.default));
exports.default = Cs;
