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
var Char_1 = __importDefault(require("../variable/Char"));
var Double_1 = __importDefault(require("../variable/Double"));
var Float_1 = __importDefault(require("../variable/Float"));
var Integer_1 = __importDefault(require("../variable/Integer"));
var Long_1 = __importDefault(require("../variable/Long"));
var String_1 = __importDefault(require("../variable/String"));
var Statement_1 = __importDefault(require("./Statement"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var ReturnClone_1 = __importDefault(require("../../utilities/ReturnClone"));
var DeclareStatement = /** @class */ (function (_super) {
    __extends(DeclareStatement, _super);
    function DeclareStatement(statementId, level, variable) {
        var _this = _super.call(this, level) || this;
        _this.variable = variable;
        _this.statementId = _this.generateId(statementId);
        _this.color = '#f4be0b';
        return _this;
    }
    DeclareStatement.prototype.generateId = function (number) {
        if (this.variable instanceof Integer_1.default)
            return 'declare-integer-' + number;
        else if (this.variable instanceof Long_1.default)
            return 'declare-long-' + number;
        else if (this.variable instanceof Float_1.default)
            return 'declare-float-' + number;
        else if (this.variable instanceof Double_1.default)
            return 'declare-double-' + number;
        else if (this.variable instanceof Char_1.default)
            return 'declare-char-' + number;
        else
            return 'declare-string-' + number;
    };
    DeclareStatement.prototype.writeToCanvas = function (canvas) {
        var text = this.getDeclareStatementText(true);
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT);
    };
    DeclareStatement.prototype.getDeclareStatementText = function (isDeclare) {
        var text = '';
        if (isDeclare) {
            if (this.variable instanceof Integer_1.default)
                text = 'INTEGER ' + this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Long_1.default)
                text = 'LONG ' + this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Float_1.default)
                text = 'FLOAT ' + this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Double_1.default)
                text = 'DOUBLE ' + this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Char_1.default)
                text = 'CHAR ' + this.variable.name + ' = ' + "'" + this.variable.value + "'";
            else if (this.variable instanceof String_1.default)
                text = 'STRING ' + this.variable.name + ' = ' + "\"" + this.variable.value + "\"";
        }
        else {
            if (this.variable instanceof Integer_1.default)
                text = this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Long_1.default)
                text = this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Float_1.default)
                text = this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Double_1.default)
                text = this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Char_1.default)
                text = this.variable.name + ' = ' + "'" + this.variable.value + "'";
            else if (this.variable instanceof String_1.default)
                text = this.variable.name + ' = ' + "\"" + this.variable.value + "\"";
        }
        return text;
    };
    DeclareStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.parent = this;
        this.option.draw(canvas);
    };
    DeclareStatement.prototype.callClickEvent = function (canvas, x, y) {
        return this.option.clickOption(canvas, x, y);
    };
    DeclareStatement.prototype.findVariable = function (variable) {
        return undefined;
    };
    DeclareStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        return false;
    };
    DeclareStatement.prototype.cloneStatement = function (statementCount) {
        return new ReturnClone_1.default(new DeclareStatement(statementCount, this.level, this.variable), true);
    };
    DeclareStatement.prototype.generateCSourceCode = function () {
        var sourceCode = '';
        sourceCode += this.getIndentation();
        if (this.variable instanceof Integer_1.default)
            sourceCode += 'int ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Long_1.default)
            sourceCode += 'long long int ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Float_1.default)
            sourceCode += 'float ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Double_1.default)
            sourceCode += 'double ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Char_1.default)
            sourceCode += 'char ' + this.variable.name + ' = ' + "'" + this.variable.value + "';";
        else if (this.variable instanceof String_1.default)
            sourceCode += 'char ' + this.variable.name + '[' + (this.variable.value.length + 1) + ']' + ' = ' + "\"" + this.variable.value + "\";";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    DeclareStatement.prototype.generateCppSourceCode = function () {
        var sourceCode = '';
        sourceCode += this.getIndentation();
        if (this.variable instanceof Integer_1.default)
            sourceCode += 'int ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Long_1.default)
            sourceCode += 'long long int ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Float_1.default)
            sourceCode += 'float ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Double_1.default)
            sourceCode += 'double ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Char_1.default)
            sourceCode += 'char ' + this.variable.name + ' = ' + "'" + this.variable.value + "';";
        else if (this.variable instanceof String_1.default)
            sourceCode += 'string ' + this.variable.name + ' = ' + "\"" + this.variable.value + "\";";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    DeclareStatement.prototype.generateJavaSourceCode = function () {
        var sourceCode = '';
        sourceCode += this.getIndentation();
        if (this.variable instanceof Integer_1.default)
            sourceCode += 'Integer ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Long_1.default)
            sourceCode += 'Long ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Float_1.default)
            sourceCode += 'Float ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Double_1.default)
            sourceCode += 'Double ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Char_1.default)
            sourceCode += 'Character ' + this.variable.name + ' = ' + "'" + this.variable.value + "';";
        else if (this.variable instanceof String_1.default)
            sourceCode += 'String ' + this.variable.name + ' = ' + "\"" + this.variable.value + "\";";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    DeclareStatement.prototype.generateCsSourceCode = function () {
        var sourceCode = '';
        sourceCode += this.getIndentation();
        if (this.variable instanceof Integer_1.default)
            sourceCode += 'int ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Long_1.default)
            sourceCode += 'long ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Float_1.default)
            sourceCode += 'float ' + this.variable.name + ' = ' + this.variable.value + 'f;';
        else if (this.variable instanceof Double_1.default)
            sourceCode += 'double ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Char_1.default)
            sourceCode += 'char ' + this.variable.name + ' = ' + "'" + this.variable.value + "';";
        else if (this.variable instanceof String_1.default)
            sourceCode += 'string ' + this.variable.name + ' = ' + "\"" + this.variable.value + "\";";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    DeclareStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        if (this.variable instanceof String_1.default || this.variable instanceof Char_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + " = '" + this.variable.value + "'\n");
        else
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + " = " + this.variable.value + "\n");
        return sourceCodeContainer;
    };
    DeclareStatement.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        if (this.variable instanceof String_1.default || this.variable instanceof Char_1.default)
            sourceCodeContainer.push(this.getIndentation() + 'INITIALIZE ' + this.variable.name + " = '" + this.variable.value + "'\n");
        else
            sourceCodeContainer.push(this.getIndentation() + 'INITIALIZE ' + this.variable.name + " = " + this.variable.value + "\n");
        return sourceCodeContainer;
    };
    DeclareStatement.prototype.toJSON = function () {
        return {
            statement: 'declare',
            statementId: this.statementId,
            level: this.level,
            variable: this.variable
        };
    };
    DeclareStatement.prototype.parseAttributes = function () {
        var variable;
        if (this.variable.type == 'int')
            variable = Object.assign(new Integer_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'double')
            variable = Object.assign(new Double_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'long')
            variable = Object.assign(new Long_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'float')
            variable = Object.assign(new Float_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'char')
            variable = Object.assign(new Char_1.default(undefined, undefined), this.variable);
        else
            variable = Object.assign(new String_1.default(undefined, undefined), this.variable);
        this.variable = variable;
    };
    return DeclareStatement;
}(Statement_1.default));
exports.default = DeclareStatement;
