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
var InputStatement = /** @class */ (function (_super) {
    __extends(InputStatement, _super);
    function InputStatement(statementId, level, variable) {
        var _this = _super.call(this, level) || this;
        _this.variable = variable;
        _this.statementId = _this.generateId(statementId);
        _this.color = '#f4be0b';
        return _this;
    }
    InputStatement.prototype.generateId = function (number) {
        if (this.variable instanceof Integer_1.default)
            return 'input-integer-' + number;
        else if (this.variable instanceof Long_1.default)
            return 'input-long-' + number;
        else if (this.variable instanceof Float_1.default)
            return 'input-float-' + number;
        else if (this.variable instanceof Double_1.default)
            return 'input-double-' + number;
        else if (this.variable instanceof Char_1.default)
            return 'input-char-' + number;
        else
            return 'input-string-' + number;
    };
    InputStatement.prototype.writeToCanvas = function (canvas) {
        var text = 'INPUT ' + this.variable.name;
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT);
    };
    InputStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.parent = this;
        this.option.draw(canvas);
    };
    InputStatement.prototype.callClickEvent = function (canvas, x, y) {
        return this.option.clickOption(canvas, x, y);
    };
    InputStatement.prototype.findVariable = function (variable) {
        if (this.variable.name == variable.name)
            return this;
        return undefined;
    };
    InputStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        return false;
    };
    InputStatement.prototype.cloneStatement = function (statementCount) {
        return new ReturnClone_1.default(new InputStatement(statementCount, this.level, this.variable), true);
    };
    InputStatement.prototype.generateCSourceCode = function () {
        var sourceCode = '' + this.getIndentation();
        if (this.variable instanceof Integer_1.default)
            sourceCode += "scanf(\"%d\", &" + this.variable.name + ');';
        else if (this.variable instanceof Long_1.default)
            sourceCode += "scanf(\"%lld\", &" + this.variable.name + ');';
        else if (this.variable instanceof Float_1.default)
            sourceCode += "scanf(\"%f\", &" + this.variable.name + ');';
        else if (this.variable instanceof Double_1.default)
            sourceCode += "scanf(\"%lf\", &" + this.variable.name + ');';
        else if (this.variable instanceof Char_1.default)
            sourceCode += "scanf(\"%c\", &" + this.variable.name + ');';
        else if (this.variable instanceof String_1.default)
            sourceCode += "scanf(\"%s\", " + this.variable.name + ');';
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    InputStatement.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        sourceCode += 'cin >> ' + this.variable.name + ';' + '\n';
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    InputStatement.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        if (this.variable instanceof Integer_1.default) {
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = scan.nextInt();\n');
            sourceCodeContainer.push(this.getIndentation() + 'scan.nextLine();\n');
        }
        else if (this.variable instanceof Long_1.default) {
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = scan.nextLong();\n');
            sourceCodeContainer.push(this.getIndentation() + 'scan.nextLine();\n');
        }
        else if (this.variable instanceof Float_1.default) {
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = scan.nextFloat();\n');
            sourceCodeContainer.push(this.getIndentation() + 'scan.nextLine();\n');
        }
        else if (this.variable instanceof Double_1.default) {
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = scan.nextDouble();\n');
            sourceCodeContainer.push(this.getIndentation() + 'scan.nextLine();\n');
        }
        else {
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = scan.nextLine();\n');
        }
        return sourceCodeContainer;
    };
    InputStatement.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        if (this.variable instanceof Integer_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = Convert.ToInt32(Console.ReadLine());\n');
        else if (this.variable instanceof Long_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = Convert.ToInt64(Console.ReadLine());\n');
        else if (this.variable instanceof Float_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = float.Parse(Console.ReadLine());\n');
        else if (this.variable instanceof Double_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = Convert.ToDouble(Console.ReadLine());\n');
        else if (this.variable instanceof Char_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = Convert.ToChar(Console.ReadLine());\n');
        else
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = Console.ReadLine();\n');
        return sourceCodeContainer;
    };
    InputStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        if (this.variable instanceof Integer_1.default || this.variable instanceof Long_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = int(input())\n');
        else if (this.variable instanceof Float_1.default || this.variable instanceof Double_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = float(input())\n');
        else
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = input()\n');
        return sourceCodeContainer;
    };
    InputStatement.prototype.toJSON = function () {
        return {
            statement: 'input',
            statementId: this.statementId,
            level: this.level,
            variable: this.variable
        };
    };
    InputStatement.prototype.parseAttributes = function () {
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
    return InputStatement;
}(Statement_1.default));
exports.default = InputStatement;
