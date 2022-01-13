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
var ReturnClone_1 = __importDefault(require("../../utilities/ReturnClone"));
var Char_1 = __importDefault(require("../variable/Char"));
var Double_1 = __importDefault(require("../variable/Double"));
var Float_1 = __importDefault(require("../variable/Float"));
var Integer_1 = __importDefault(require("../variable/Integer"));
var Long_1 = __importDefault(require("../variable/Long"));
var String_1 = __importDefault(require("../variable/String"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var Statement_1 = __importDefault(require("./Statement"));
var OutputStatement = /** @class */ (function (_super) {
    __extends(OutputStatement, _super);
    function OutputStatement(statementId, level, isNewLine, type, variable, text, asciiCode, escapeSequence) {
        var _this = _super.call(this, level) || this;
        _this.variable = undefined;
        _this.text = undefined;
        _this.variable = variable;
        _this.statementId = _this.generateId(statementId);
        _this.isNewLine = isNewLine;
        _this.type = type;
        _this.text = text;
        _this.asciiCode = asciiCode;
        _this.escapeSequence = escapeSequence;
        _this.color = '#f4be0b';
        return _this;
    }
    OutputStatement.prototype.generateId = function (number) {
        return 'output-' + number;
    };
    OutputStatement.prototype.writeToCanvas = function (canvas) {
        var text = this.generateBlockCodeText();
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT);
    };
    OutputStatement.prototype.generateBlockCodeText = function () {
        var text = 'PRINT ';
        if (this.type == 'variable') {
            text += this.variable.name;
        }
        else if (this.type == 'text') {
            text += "\"" + this.text + "\"";
        }
        else if (this.type == 'ascii') {
            text += "ASCII CODE " + this.asciiCode;
        }
        else {
            text += "ESCAPE SEQUENCE " + "\"" + this.escapeSequence + "\"";
        }
        if (this.isNewLine == true)
            text += '\t[ENTER]';
        return text;
    };
    OutputStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.parent = this;
        this.option.draw(canvas);
    };
    OutputStatement.prototype.callClickEvent = function (canvas, x, y) {
        return this.option.clickOption(canvas, x, y);
    };
    OutputStatement.prototype.findVariable = function (variable) {
        if (this.variable) {
            if (this.variable.name == variable.name)
                return this;
        }
        return undefined;
    };
    OutputStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        return false;
    };
    OutputStatement.prototype.cloneStatement = function (statementCount) {
        if (this.type == 'variable')
            return new ReturnClone_1.default(new OutputStatement(statementCount, this.level, this.isNewLine, this.type, this.variable), true);
        else
            return new ReturnClone_1.default(new OutputStatement(statementCount, this.level, this.isNewLine, this.type, undefined, this.text), true);
    };
    OutputStatement.prototype.generateCSourceCode = function () {
        var sourceCode = '' + this.getIndentation();
        var newLine = this.isNewLine ? '\\n' : '';
        if (this.type == 'variable') {
            if (this.variable instanceof Integer_1.default)
                sourceCode += "printf(\"%d" + newLine + "\", " + this.variable.name + ');';
            else if (this.variable instanceof Long_1.default)
                sourceCode += "printf(\"%lld" + newLine + "\", " + this.variable.name + ');';
            else if (this.variable instanceof Float_1.default)
                sourceCode += "printf(\"%f" + newLine + "\", " + this.variable.name + ');';
            else if (this.variable instanceof Double_1.default)
                sourceCode += "printf(\"%lf" + newLine + "\", " + this.variable.name + ');';
            else if (this.variable instanceof Char_1.default)
                sourceCode += "printf(\"%c" + newLine + "\", " + this.variable.name + ');';
            else if (this.variable instanceof String_1.default)
                sourceCode += "printf(\"%s" + newLine + "\", " + this.variable.name + ');';
        }
        else if (this.type == 'text')
            sourceCode += "printf(\"" + this.text + newLine + "\");";
        else if (this.type == 'ascii')
            sourceCode += "printf(\"%c" + newLine + "\", " + this.asciiCode + ");";
        else
            sourceCode += "printf(\"" + this.escapeSequence + "\");";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    OutputStatement.prototype.generateCppSourceCode = function () {
        var sourceCode = '' + this.getIndentation();
        if (this.type == 'variable') {
            if (this.isNewLine)
                sourceCode += 'cout << ' + this.variable.name + " << \"\\n\";";
            else
                sourceCode += 'cout << ' + this.variable.name + ';';
        }
        else if (this.type == 'text') {
            if (this.isNewLine)
                sourceCode += "cout << \"" + this.text + "\" << \"\\n\";";
            else
                sourceCode += "cout << \"" + this.text + "\";";
        }
        else if (this.type == 'ascii')
            if (this.isNewLine)
                sourceCode += "cout << \"" + this.text + "\" << \"\\n\";";
            else
                sourceCode += "cout << \"" + this.text + "\";";
        else
            sourceCode += "cout << \"" + this.escapeSequence + "\";";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    OutputStatement.prototype.generateJavaSourceCode = function () {
        var sourceCode = '';
        sourceCode += this.getIndentation();
        var prefix = this.isNewLine ? 'System.out.println(' : 'System.out.print(';
        if (this.type == 'variable')
            sourceCode += prefix + this.variable.name + ');';
        else if (this.type == 'text')
            sourceCode += prefix + "\"" + this.text + "\");";
        else if (this.type == 'ascii') {
            if (this.isNewLine)
                sourceCode += "System.out.printf(\"%c\\n\", " + this.asciiCode + ');';
            else
                sourceCode += "System.out.printf(\"%c\", " + this.asciiCode + ');';
        }
        else
            sourceCode += "System.out.printf(\"" + this.escapeSequence + "\");";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    OutputStatement.prototype.generateCsSourceCode = function () {
        var sourceCode = '';
        sourceCode += this.getIndentation();
        var prefix = this.isNewLine ? 'Console.WriteLine(' : 'Console.Write(';
        if (this.type == 'variable')
            sourceCode += prefix + this.variable.name + ');';
        else if (this.type == 'text')
            sourceCode += prefix + "\"" + this.text + "\");";
        else if (this.type == 'ascii')
            sourceCode += prefix + '(char)' + this.asciiCode + '));';
        else
            sourceCode += prefix + "\"" + this.escapeSequence + "\");";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    OutputStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        if (this.type == 'variable') {
            if (this.isNewLine)
                sourceCode += 'print(' + this.variable.name + ')';
            else
                sourceCode += 'print(' + this.variable.name + ", end='')";
        }
        else if (this.type == 'text') {
            if (this.isNewLine)
                sourceCode += "print(\"" + this.text + "\")";
            else
                sourceCode += "print(\"" + this.text + "\", end='')";
        }
        else if (this.type == 'ascii') {
            if (this.isNewLine)
                sourceCode += "print(chr(" + this.asciiCode + "))";
            else
                sourceCode += "print(chr(" + this.asciiCode + "), end='')";
        }
        else
            sourceCode += "print(\"" + this.escapeSequence + "\")";
        sourceCode += '\n';
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    OutputStatement.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var text = '' + this.getIndentation() + 'PRINT ';
        if (this.type == 'variable') {
            text += this.variable.name;
        }
        else if (this.type == 'text') {
            text += "\"" + this.text + "\"";
        }
        else if (this.type == 'ascii') {
            text += "ASCII CODE " + this.asciiCode;
        }
        else {
            text += "ESCAPE SEQUENCE " + "\"" + this.escapeSequence + "\"";
        }
        if (this.isNewLine == true)
            text += ' [ENTER]';
        text += '\n';
        sourceCodeContainer.push(text);
        return sourceCodeContainer;
    };
    OutputStatement.prototype.toJSON = function () {
        return {
            statement: 'output',
            statementId: this.statementId,
            level: this.level,
            isNewLine: this.isNewLine,
            type: this.type,
            variable: this.variable,
            text: this.text,
            asciiCode: this.asciiCode,
            escapeSequence: this.escapeSequence
        };
    };
    OutputStatement.prototype.parseAttributes = function () {
        var variable;
        if (this.variable == undefined)
            return;
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
    return OutputStatement;
}(Statement_1.default));
exports.default = OutputStatement;
