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
var Double_1 = __importDefault(require("../variable/Double"));
var Float_1 = __importDefault(require("../variable/Float"));
var Integer_1 = __importDefault(require("../variable/Integer"));
var Long_1 = __importDefault(require("../variable/Long"));
var AssignmentStatement_1 = __importDefault(require("./AssignmentStatement"));
var DeclareStatement_1 = __importDefault(require("./DeclareStatement"));
var Condition_1 = __importDefault(require("./helper/general/Condition"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var IfStatement_1 = __importDefault(require("./IfStatement"));
var InputStatement_1 = __importDefault(require("./InputStatement"));
var OutputStatement_1 = __importDefault(require("./OutputStatement"));
var Statement_1 = __importDefault(require("./Statement"));
var SwitchStatement_1 = __importDefault(require("./SwitchStatement"));
var WhileStatement_1 = __importDefault(require("./WhileStatement"));
var ForStatement = /** @class */ (function (_super) {
    __extends(ForStatement, _super);
    function ForStatement(level, statementId, childStatement, variable, variableIsNew, isIncrement, addValueBy, condition) {
        var _this = _super.call(this, level) || this;
        _this.statementId = _this.generateId(statementId);
        _this.childStatement = childStatement;
        _this.variable = variable;
        _this.variableIsNew = variableIsNew;
        _this.isIncrement = isIncrement;
        _this.addValueBy = addValueBy;
        _this.condition = condition;
        _this.color = '#00A9E2';
        _this.option = [];
        return _this;
    }
    ForStatement.prototype.generateId = function (number) {
        return 'for-statement-' + number;
    };
    ForStatement.prototype.init = function () {
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this;
    };
    ForStatement.prototype.updateChildStatement = function (childStatement) {
        this.childStatement = childStatement;
        this.init();
    };
    ForStatement.prototype.writeToCanvas = function (canvas) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = 'FOR ( ';
        this.option = [];
        text += this.variable.name + ' = 0; ';
        text += this.condition.generateBlockCodeText() + '; ';
        if (this.isIncrement) {
            if (this.addValueBy == 1)
                text += this.variable.name + '++ )';
            else
                text += this.variable.name + ' += ' + this.addValueBy + ' )';
        }
        else {
            if (this.addValueBy == 1)
                text += this.variable.name + '-- )';
            else
                text += this.variable.name + ' -= ' + this.addValueBy + ' )';
        }
        // FOR ( ; ; )
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.option.push(new Option_1.default(this.statementId + '-outer', coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this));
        this.option[0].draw(canvas);
        // Create option button for IfStatement
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE);
        canvas.updateLastPosition();
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas);
        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION);
        canvas.writeClosingBlock(this.level, text, 'END FOR', this.color);
    };
    ForStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option.push(new Option_1.default(this.statementId + '-inner', coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this));
        this.option[1].draw(canvas);
    };
    ForStatement.prototype.callClickEvent = function (canvas, x, y) {
        var tempOption = undefined;
        var tempChild = undefined;
        for (var i = 0; i < this.option.length; i++) {
            tempOption = this.option[i].clickOption(canvas, x, y);
            if (tempOption != undefined)
                break;
        }
        if (tempOption == undefined)
            if (this.childStatement != undefined)
                for (var i = 0; i < this.childStatement.length; i++) {
                    tempChild = this.childStatement[i].callClickEvent(canvas, x, y);
                    if (tempChild != undefined)
                        break;
                }
        return tempOption ? tempOption : tempChild;
    };
    ForStatement.prototype.findVariable = function (variable) {
        if (!this.variableIsNew) {
            if (this.variable.name == variable.name)
                return this;
        }
        if (this.condition.findVariable(variable))
            return this;
        var temp = undefined;
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                temp = this.childStatement[i].findVariable(variable);
                if (temp != undefined)
                    return temp;
            }
        }
        return undefined;
    };
    ForStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        var statementFound = false;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                statementFound = this.childStatement[i].findStatement(statement);
                if (statementFound)
                    return true;
            }
        }
        return false;
    };
    ForStatement.prototype.cloneStatement = function (statementCount) {
        var forStatement = new ForStatement(this.level, statementCount++, undefined, this.variable, this.variableIsNew, this.isIncrement, this.addValueBy, this.condition.cloneCondition());
        var childStatement = [];
        var returnClone;
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++);
                if (returnClone.result == false)
                    return returnClone;
                childStatement.push(returnClone.statement);
            }
            forStatement.updateChildStatement(childStatement);
        }
        return new ReturnClone_1.default(forStatement, true);
    };
    ForStatement.prototype.turnOffOption = function () {
        if (this.option[0] != undefined)
            this.option[0].isSelectionActive = false;
        if (this.option[1] != undefined)
            this.option[1].isSelectionActive = false;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].turnOffOption();
        }
    };
    ForStatement.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        sourceCode += 'for(' + this.variable.name + ' = 0; ';
        sourceCode += this.condition.generateCSourceCode();
        sourceCode += '; ';
        if (this.isIncrement) {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '++)';
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ')';
        }
        else {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '--)';
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ')';
        }
        sourceCode += '\n';
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    ForStatement.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        sourceCode += 'for(' + this.variable.name + ' = 0; ';
        sourceCode += this.condition.generateCSourceCode();
        sourceCode += '; ';
        if (this.isIncrement) {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '++)';
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ')';
        }
        else {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '--)';
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ')';
        }
        sourceCode += '\n';
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCppSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    ForStatement.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        sourceCode += 'for(' + this.variable.name + ' = 0; ';
        sourceCode += this.condition.generateJavaSourceCode();
        sourceCode += '; ';
        if (this.isIncrement) {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '++)';
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ')';
        }
        else {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '--)';
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ')';
        }
        sourceCode += '\n';
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateJavaSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    ForStatement.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        sourceCode += 'for(' + this.variable.name + ' = 0; ';
        sourceCode += this.condition.generateCsSourceCode();
        sourceCode += '; ';
        if (this.isIncrement) {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '++)';
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ')';
        }
        else {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '--)';
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ')';
        }
        sourceCode += '\n';
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCsSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    ForStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        var condition = '';
        var updateValue = '';
        if (this.condition.isCustomValue)
            condition = this.condition.secondVariable.value;
        else
            condition = this.condition.secondVariable.name;
        if (this.isIncrement)
            updateValue = this.addValueBy + '';
        else
            updateValue = '-' + this.addValueBy;
        sourceCode += 'for ' + this.variable.name + ' in range(0, ' + condition + ', ' + updateValue + '):\n';
        sourceCodeContainer.push(sourceCode);
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0) {
                var tempPrint = '' + this.getIndentation() + '\t' + "print('')" + '\n';
                sourceCodeContainer.push(tempPrint);
            }
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePythonSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            var tempPrint = '' + this.getIndentation() + '\t' + "print('')" + '\n';
            sourceCodeContainer.push(tempPrint);
        }
        return sourceCodeContainer;
    };
    ForStatement.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        sourceCode += 'FOR ';
        sourceCode += this.variable.name + ' = 0; ';
        sourceCode += this.condition.generateBlockCodeText() + '; ';
        if (this.isIncrement) {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '++ ';
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ' ';
        }
        else {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '-- ';
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ' ';
        }
        sourceCode += '\n';
        sourceCodeContainer.push(sourceCode);
        sourceCode = '' + this.getIndentation() + 'BEGIN\n';
        sourceCodeContainer.push(sourceCode);
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePseudocode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + 'END\n');
        return sourceCodeContainer;
    };
    ForStatement.prototype.toJSON = function () {
        return {
            statement: 'for',
            statementId: this.statementId,
            level: this.level,
            childStatement: this.childStatement,
            variable: this.variable,
            variableIsNew: this.variableIsNew,
            isIncrement: this.isIncrement,
            addValueBy: this.addValueBy,
            condition: this.condition
        };
    };
    ForStatement.prototype.parseChild = function () {
        var newChildStatement = [];
        var tempChild = undefined;
        var object = undefined;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                object = this.childStatement[i];
                if (object.statement == 'declare') {
                    tempChild = Object.assign(new DeclareStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'input') {
                    tempChild = Object.assign(new InputStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'output') {
                    tempChild = Object.assign(new OutputStatement_1.default(undefined, undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'assignment') {
                    tempChild = Object.assign(new AssignmentStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'ifstatement') {
                    tempChild = Object.assign(new IfStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseChild();
                }
                else if (object.statement == 'for') {
                    tempChild = Object.assign(new ForStatement(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'while') {
                    tempChild = Object.assign(new WhileStatement_1.default(undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'switch') {
                    tempChild = Object.assign(new SwitchStatement_1.default(undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                newChildStatement.push(tempChild);
            }
            this.updateChildStatement(newChildStatement);
        }
    };
    ForStatement.prototype.parseAttributes = function () {
        var variable;
        var condition;
        if (this.variable.type == 'int')
            variable = Object.assign(new Integer_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'double')
            variable = Object.assign(new Double_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'long')
            variable = Object.assign(new Long_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'float')
            variable = Object.assign(new Float_1.default(undefined, undefined), this.variable);
        condition = Object.assign(new Condition_1.default(undefined, undefined, undefined, undefined), this.condition);
        condition.parseAttributes();
        this.variable = variable;
        this.condition = condition;
    };
    return ForStatement;
}(Statement_1.default));
exports.default = ForStatement;
