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
var Variable_1 = __importDefault(require("../variable/Variable"));
var Arithmetic_1 = __importDefault(require("./helper/assignment/Arithmetic"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var Statement_1 = __importDefault(require("./Statement"));
var AssignmentStatement = /** @class */ (function (_super) {
    __extends(AssignmentStatement, _super);
    function AssignmentStatement(statementId, level, type, targetVariable, listArithmetic, listOperator, listIsCustom, variable, isCustomValue, start, length) {
        var _this = _super.call(this, level) || this;
        _this.variable = undefined;
        _this.listArithmetic = undefined;
        _this.listOperator = undefined;
        _this.listIsCustom = undefined;
        _this.isCustomValue = false;
        _this.start = undefined;
        _this.length = undefined;
        _this.type = type;
        _this.statementId = _this.generateId(statementId);
        _this.targetVariable = targetVariable;
        _this.variable = variable;
        _this.listArithmetic = listArithmetic;
        _this.listOperator = listOperator;
        _this.listIsCustom = listIsCustom;
        _this.isCustomValue = isCustomValue;
        _this.start = start;
        _this.length = length;
        _this.color = '#f4be0b';
        return _this;
    }
    AssignmentStatement.prototype.generateId = function (number) {
        return 'assignment-statement-' + number;
    };
    AssignmentStatement.prototype.writeToCanvas = function (canvas) {
        var text = 'SET ' + this.targetVariable.name + ' = ' + this.generateBlockCodeText();
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT);
    };
    AssignmentStatement.prototype.generateBlockCodeText = function () {
        var text = '';
        if (this.type == 'arithmetic')
            text = this.generateArithmeticText();
        else if (this.type == 'variable')
            text = this.generateVariableText();
        else if (this.type == 'length')
            text = this.generateLengthText();
        else
            text = this.generateSubText();
        return text;
    };
    AssignmentStatement.prototype.generateArithmeticText = function () {
        var text = '';
        var opIdx = 0;
        var customIdx = 0;
        for (var i = 0; i < this.listArithmetic.length; i++) {
            if (this.listArithmetic[i] instanceof Variable_1.default) {
                if (this.listIsCustom != undefined) {
                    if (this.listIsCustom[customIdx])
                        text += ' ' + this.listArithmetic[i].value + ' ';
                    else
                        text += ' ' + this.listArithmetic[i].name + ' ';
                    customIdx++;
                }
            }
            else {
                text += this.listArithmetic[i].generateBlockCodeText();
            }
            if (this.listOperator != undefined) {
                if (opIdx < this.listOperator.length) {
                    text += ' ' + this.listOperator[opIdx] + ' ';
                    opIdx++;
                }
            }
        }
        return text;
    };
    AssignmentStatement.prototype.generateVariableText = function () {
        if (this.isCustomValue) {
            if (this.variable instanceof Char_1.default)
                return "'" + this.variable.value + "'";
            else
                return this.variable.value;
        }
        else
            return this.variable.name;
    };
    AssignmentStatement.prototype.generateLengthText = function () {
        return 'LENGTH OF ' + this.variable.name;
    };
    AssignmentStatement.prototype.generateSubText = function () {
        return this.variable.name + ' FROM ' + this.start + ' WITH LENGTH ' + this.length;
    };
    AssignmentStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.parent = this;
        this.option.draw(canvas);
    };
    AssignmentStatement.prototype.callClickEvent = function (canvas, x, y) {
        return this.option.clickOption(canvas, x, y);
    };
    AssignmentStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        return false;
    };
    AssignmentStatement.prototype.findVariable = function (variable) {
        if (this.type == 'variable')
            return this.findTypeVariable(variable);
        else if (this.type == 'arithmetic')
            return this.findTypeArithmetic(variable);
        else
            return this.findTypeString(variable);
    };
    AssignmentStatement.prototype.findTypeVariable = function (variable) {
        if (this.targetVariable.name == variable.name)
            return this;
        if (!this.isCustomValue) {
            if (this.variable.name == variable.name)
                return this;
        }
        return undefined;
    };
    AssignmentStatement.prototype.findTypeArithmetic = function (variable) {
        if (this.targetVariable.name == variable.name)
            return this;
        var temp = false;
        if (this.listArithmetic != undefined) {
            for (var i = 0; i < this.listArithmetic.length; i++) {
                console.log(this.listArithmetic[i]);
                console.log(this.listIsCustom[i]);
                if (this.listArithmetic[i] instanceof Variable_1.default) {
                    if (this.listIsCustom[i] == false) {
                        if (this.listArithmetic[i].name == variable.name)
                            return this;
                    }
                }
                else {
                    temp = this.listArithmetic[i].findVariable(variable);
                }
                if (temp)
                    return this;
            }
        }
        return undefined;
    };
    AssignmentStatement.prototype.findTypeString = function (variable) {
        if (this.targetVariable.name == variable.name)
            return this;
        else if (this.variable.name == variable.name)
            return this;
        return undefined;
    };
    AssignmentStatement.prototype.cloneStatement = function (statementCount) {
        var newStatement = new AssignmentStatement(statementCount, this.level, this.type, this.targetVariable, this.listArithmetic, this.listOperator, this.listIsCustom, this.variable, this.isCustomValue, this.start, this.length);
        return new ReturnClone_1.default(newStatement, true);
    };
    AssignmentStatement.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var prefix = this.getIndentation() + this.targetVariable.name + ' = ';
        if (this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + ';\n');
        }
        else if (this.type == 'variable') {
            if (this.isCustomValue) {
                if (this.variable instanceof Char_1.default)
                    sourceCodeContainer.push(prefix + "'" + this.variable.value + "';\n");
                else
                    sourceCodeContainer.push(prefix + this.variable.value + ';\n');
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + ';\n');
        }
        else if (this.type == 'length') {
            sourceCodeContainer.push(prefix + 'strlen(' + this.variable.name + ');\n');
        }
        else {
            var start = void 0;
            if (this.start == 1)
                start = this.variable.name;
            else
                start = this.variable.name + '+' + (this.start - 1);
            sourceCodeContainer.push(this.getIndentation() + 'strncpy(' + this.targetVariable.name + ', ' + start + ', ' + this.length + ');\n');
            sourceCodeContainer.push(this.targetVariable.name + '[' + (this.start - 1 + this.length) + '] = ' + "'\\0'" + ';\n');
        }
        return sourceCodeContainer;
    };
    AssignmentStatement.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var prefix = this.getIndentation() + this.targetVariable.name + ' = ';
        if (this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + ';\n');
        }
        else if (this.type == 'variable') {
            if (this.isCustomValue) {
                if (this.variable instanceof Char_1.default)
                    sourceCodeContainer.push(prefix + "'" + this.variable.value + "';\n");
                else
                    sourceCodeContainer.push(prefix + this.variable.value + ';\n');
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + ';\n');
        }
        else if (this.type == 'length') {
            sourceCodeContainer.push(prefix + 'strlen(' + this.variable.name + ');\n');
        }
        else {
            var start = void 0;
            if (this.start == 1)
                start = this.variable.name;
            else
                start = this.variable.name + '+' + (this.start - 1);
            sourceCodeContainer.push(this.getIndentation() + 'strncpy(' + this.targetVariable.name + ', ' + start + ', ' + this.length + ');\n');
            sourceCodeContainer.push(this.targetVariable.name + '[' + (this.start - 1 + this.length) + '] = ' + "'\\0'" + ';\n');
        }
        return sourceCodeContainer;
    };
    AssignmentStatement.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var prefix = this.getIndentation() + this.targetVariable.name + ' = ';
        if (this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + ';\n');
        }
        else if (this.type == 'variable') {
            if (this.isCustomValue) {
                if (this.variable instanceof Char_1.default)
                    sourceCodeContainer.push(prefix + "'" + this.variable.value + "';\n");
                else
                    sourceCodeContainer.push(prefix + this.variable.value + ';\n');
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + ';\n');
        }
        else if (this.type == 'length') {
            sourceCodeContainer.push(prefix + this.variable.name + '.length();\n');
        }
        else {
            var start = this.start - 1;
            var end = start + this.length;
            sourceCodeContainer.push(prefix + this.variable.name + '.substring(' + start + ', ' + end + ');\n');
        }
        return sourceCodeContainer;
    };
    AssignmentStatement.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var prefix = this.getIndentation() + this.targetVariable.name + ' = ';
        if (this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + ';\n');
        }
        else if (this.type == 'variable') {
            if (this.isCustomValue) {
                if (this.variable instanceof Char_1.default)
                    sourceCodeContainer.push(prefix + "'" + this.variable.value + "';\n");
                else
                    sourceCodeContainer.push(prefix + this.variable.value + ';\n');
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + ';\n');
        }
        else if (this.type == 'length') {
            sourceCodeContainer.push(prefix + this.variable.name + '.Length;\n');
        }
        else {
            var start = this.start - 1;
            sourceCodeContainer.push(prefix + this.variable.name + '.Substring(' + start + ', ' + this.length + ');\n');
        }
        return sourceCodeContainer;
    };
    AssignmentStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var prefix = this.getIndentation() + this.targetVariable.name + ' = ';
        if (this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + '\n');
        }
        else if (this.type == 'variable') {
            if (this.isCustomValue) {
                if (this.variable instanceof Char_1.default || this.variable instanceof String_1.default)
                    sourceCodeContainer.push(prefix + "\"" + this.variable.value + "\"\n");
                else
                    sourceCodeContainer.push(prefix + this.variable.value + '\n');
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + '\n');
        }
        else if (this.type == 'length') {
            sourceCodeContainer.push(prefix + 'len(' + this.variable.name + ')\n');
        }
        else {
            var start = this.start - 1;
            var end = start + this.length;
            sourceCodeContainer.push(prefix + this.variable.name + '[' + start + ':' + end + ']\n');
        }
        return sourceCodeContainer;
    };
    AssignmentStatement.prototype.toJSON = function () {
        return {
            statement: 'assignment',
            statementId: this.statementId,
            level: this.level,
            type: this.type,
            targetVariable: this.targetVariable,
            listArithmetic: this.listArithmetic,
            listOperator: this.listOperator,
            listIsCustom: this.listIsCustom,
            variable: this.variable,
            isCustomValue: this.isCustomValue,
            start: this.start,
            length: this.length
        };
    };
    AssignmentStatement.prototype.parseAttributes = function () {
        var targetVariable;
        if (this.targetVariable.type == 'int')
            targetVariable = Object.assign(new Integer_1.default(undefined, undefined), this.targetVariable);
        else if (this.targetVariable.type == 'double')
            targetVariable = Object.assign(new Double_1.default(undefined, undefined), this.targetVariable);
        else if (this.targetVariable.type == 'long')
            targetVariable = Object.assign(new Long_1.default(undefined, undefined), this.targetVariable);
        else if (this.targetVariable.type == 'float')
            targetVariable = Object.assign(new Float_1.default(undefined, undefined), this.targetVariable);
        else if (this.targetVariable.type == 'char')
            targetVariable = Object.assign(new Char_1.default(undefined, undefined), this.targetVariable);
        else
            targetVariable = Object.assign(new String_1.default(undefined, undefined), this.targetVariable);
        this.targetVariable = targetVariable;
        if (this.variable != undefined) {
            var variable = void 0;
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
        }
        if (this.listArithmetic != undefined) {
            var tempListArithmetic = [];
            var temp = void 0;
            for (var i = 0; i < this.listArithmetic.length; i++) {
                temp = this.listArithmetic[i];
                if (temp.type == 'int')
                    temp = Object.assign(new Integer_1.default(undefined, undefined), temp);
                else if (temp.type == 'double')
                    temp = Object.assign(new Double_1.default(undefined, undefined), temp);
                else if (temp.type == 'long')
                    temp = Object.assign(new Long_1.default(undefined, undefined), temp);
                else if (temp.type == 'float')
                    temp = Object.assign(new Float_1.default(undefined, undefined), temp);
                else if (temp.type == 'char')
                    temp = Object.assign(new Char_1.default(undefined, undefined), temp);
                else if (temp.type == 'string')
                    temp = Object.assign(new String_1.default(undefined, undefined), temp);
                else {
                    temp = Object.assign(new Arithmetic_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined), temp);
                    temp.parseAttributes();
                }
                tempListArithmetic.push(temp);
            }
            this.listArithmetic = tempListArithmetic;
        }
    };
    return AssignmentStatement;
}(Statement_1.default));
exports.default = AssignmentStatement;
