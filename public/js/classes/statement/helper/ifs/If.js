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
var ReturnClone_1 = __importDefault(require("../../../../utilities/ReturnClone"));
var AssignmentStatement_1 = __importDefault(require("../../AssignmentStatement"));
var DeclareStatement_1 = __importDefault(require("../../DeclareStatement"));
var ForStatement_1 = __importDefault(require("../../ForStatement"));
var IfStatement_1 = __importDefault(require("../../IfStatement"));
var InputStatement_1 = __importDefault(require("../../InputStatement"));
var OutputStatement_1 = __importDefault(require("../../OutputStatement"));
var Statement_1 = __importDefault(require("../../Statement"));
var SwitchStatement_1 = __importDefault(require("../../SwitchStatement"));
var WhileStatement_1 = __importDefault(require("../../WhileStatement"));
var Condition_1 = __importDefault(require("../general/Condition"));
var Option_1 = __importDefault(require("../options/Option"));
var If = /** @class */ (function (_super) {
    __extends(If, _super);
    function If(level, statementId, firstCondition, logicalOperator, secondCondition, childStatement) {
        var _this = _super.call(this, level) || this;
        _this.logicalOperator = undefined;
        _this.statementId = _this.generateId(statementId);
        _this.firstCondition = firstCondition;
        _this.logicalOperator = logicalOperator;
        _this.secondCondition = secondCondition;
        _this.childStatement = childStatement;
        _this.color = '#2bea15';
        _this.option = undefined;
        _this.init();
        _this.updateChildLevel();
        return _this;
    }
    If.prototype.generateId = function (number) {
        return 'if-' + number;
    };
    If.prototype.init = function () {
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this;
    };
    If.prototype.updateChildStatement = function (childStatement) {
        this.childStatement = childStatement;
        this.init();
    };
    If.prototype.writeToCanvas = function (canvas, isClose) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = 'IF ';
        if (this.logicalOperator != undefined && this.secondCondition != undefined)
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' '
                + this.secondCondition.generateBlockCodeText() + ' )';
        else
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' )';
        // IF( condition )
        var coordinate = canvas.writeText(this.level, text, this.color);
        // Create option button for IfStatement
        this.parent.option = new Option_1.default(this.parent.statementId, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this.parent);
        this.parent.option.draw(canvas);
        // Create option button for If
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE);
        canvas.updateLastPosition();
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas);
        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION);
        if (isClose)
            canvas.writeClosingBlock(this.level, text, 'END IF', this.color);
    };
    If.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.draw(canvas);
    };
    If.prototype.callClickEvent = function (canvas, x, y) {
        var temp = this.option.clickOption(canvas, x, y);
        var tempChild = undefined;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                tempChild = this.childStatement[i].callClickEvent(canvas, x, y);
                if (tempChild != undefined)
                    break;
            }
        }
        return temp ? temp : tempChild;
    };
    If.prototype.findVariable = function (variable) {
        var temp = undefined;
        if (this.firstCondition.findVariable(variable))
            return this;
        if (this.secondCondition) {
            if (this.secondCondition.findVariable(variable))
                return this;
        }
        if (this.childStatement == undefined)
            return undefined;
        for (var i = 0; i < this.childStatement.length; i++) {
            temp = this.childStatement[i].findVariable(variable);
            if (temp != undefined)
                return temp;
        }
        return undefined;
    };
    If.prototype.findStatement = function (statement) {
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
    If.prototype.cloneStatement = function (statementCount) {
        var ifStatement;
        var returnClone;
        var childStatement = [];
        if (this.logicalOperator != undefined) {
            ifStatement = new If(this.level, statementCount, this.firstCondition.cloneCondition(), this.logicalOperator, this.secondCondition.cloneCondition());
        }
        else
            ifStatement = new If(this.level, statementCount, this.firstCondition.cloneCondition());
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++);
                if (returnClone.result == false)
                    return returnClone;
                childStatement.push(returnClone.statement);
            }
            ifStatement.updateChildStatement(childStatement);
        }
        return new ReturnClone_1.default(ifStatement, true);
    };
    If.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? '&&' : '||';
            sourceCode += 'if(' + this.firstCondition.generateCSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateCSourceCode() + ')\n';
        }
        else {
            sourceCode += 'if(' + this.firstCondition.generateCSourceCode() + ')\n';
        }
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
    If.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? '&&' : '||';
            sourceCode += 'if(' + this.firstCondition.generateCSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateCSourceCode() + ')\n';
        }
        else {
            sourceCode += 'if(' + this.firstCondition.generateCSourceCode() + ')\n';
        }
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
    If.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? '&&' : '||';
            sourceCode += 'if(' + this.firstCondition.generateJavaSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateJavaSourceCode() + ')\n';
        }
        else {
            sourceCode += 'if(' + this.firstCondition.generateJavaSourceCode() + ')\n';
        }
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
    If.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? '&&' : '||';
            sourceCode += 'if(' + this.firstCondition.generateCsSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateCsSourceCode() + ')\n';
        }
        else {
            sourceCode += 'if(' + this.firstCondition.generateCsSourceCode() + ')\n';
        }
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
    If.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? 'and' : 'or';
            sourceCode += 'if ' + this.firstCondition.generatePythonSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generatePythonSourceCode() + ':\n';
        }
        else {
            sourceCode += 'if ' + this.firstCondition.generatePythonSourceCode() + ':\n';
        }
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
    If.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            sourceCode += 'IF ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' '
                + this.secondCondition.generateBlockCodeText() + '\n';
        }
        else {
            sourceCode += 'IF ' + this.firstCondition.generateBlockCodeText() + '\n';
        }
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + 'BEGIN\n');
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
    If.prototype.toJSON = function () {
        return {
            statement: 'if',
            level: this.level,
            statementId: this.statementId,
            firstCondition: this.firstCondition,
            logicalOperator: this.logicalOperator,
            secondCondition: this.secondCondition,
            childStatement: this.childStatement
        };
    };
    If.prototype.parseChild = function () {
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
                    tempChild = Object.assign(new ForStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
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
    If.prototype.parseAttributes = function () {
        var firstCondition = Object.assign(new Condition_1.default(undefined, undefined, undefined, undefined), this.firstCondition);
        firstCondition.parseAttributes();
        this.firstCondition = firstCondition;
        if (this.secondCondition != undefined) {
            var secondCondition = Object.assign(new Condition_1.default(undefined, undefined, undefined, undefined), this.secondCondition);
            secondCondition.parseAttributes();
            this.secondCondition = secondCondition;
        }
    };
    return If;
}(Statement_1.default));
exports.default = If;
