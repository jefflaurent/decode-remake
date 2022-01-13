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
var AssignmentStatement_1 = __importDefault(require("./AssignmentStatement"));
var DeclareStatement_1 = __importDefault(require("./DeclareStatement"));
var ForStatement_1 = __importDefault(require("./ForStatement"));
var Condition_1 = __importDefault(require("./helper/general/Condition"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var IfStatement_1 = __importDefault(require("./IfStatement"));
var InputStatement_1 = __importDefault(require("./InputStatement"));
var OutputStatement_1 = __importDefault(require("./OutputStatement"));
var Statement_1 = __importDefault(require("./Statement"));
var SwitchStatement_1 = __importDefault(require("./SwitchStatement"));
var WhileStatement = /** @class */ (function (_super) {
    __extends(WhileStatement, _super);
    function WhileStatement(level, statementId, isWhile, childStatement, firstCondition, logicalOperator, secondCondition) {
        var _this = _super.call(this, level) || this;
        _this.logicalOperator = undefined;
        _this.secondCondition = undefined;
        _this.isWhile = isWhile;
        _this.statementId = _this.generateId(statementId);
        _this.childStatement = childStatement;
        _this.firstCondition = firstCondition;
        _this.logicalOperator = logicalOperator;
        _this.secondCondition = secondCondition;
        _this.color = '#00A9E2';
        _this.option = [];
        _this.init();
        return _this;
    }
    WhileStatement.prototype.generateId = function (statementId) {
        return this.isWhile ? 'while-statement-' + statementId : 'do-while-statement-' + statementId;
    };
    WhileStatement.prototype.init = function () {
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this;
    };
    WhileStatement.prototype.updateChildStatement = function (childStatement) {
        this.childStatement = childStatement;
        this.init();
    };
    WhileStatement.prototype.writeToCanvas = function (canvas) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = '';
        var conditionText = this.generateConditionText();
        var coordinate;
        this.option = [];
        if (this.isWhile)
            text = conditionText;
        else
            text = 'DO\t\t\t\t';
        if (this.isWhile)
            coordinate = canvas.writeText(this.level, text, this.color);
        else
            coordinate = canvas.writeClosingBlock(this.level, conditionText, text, this.color);
        this.option.push(new Option_1.default(this.statementId + '-outer', coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this));
        this.option[0].draw(canvas);
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE);
        canvas.updateLastPosition();
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas);
        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION);
        if (this.isWhile)
            canvas.writeClosingBlock(this.level, text, 'END WHILE', this.color);
        else
            canvas.writeText(this.level, conditionText, this.color);
    };
    WhileStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option.push(new Option_1.default(this.statementId + '-inner', coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this));
        this.option[1].draw(canvas);
    };
    WhileStatement.prototype.generateConditionText = function () {
        return this.secondCondition ? 'WHILE ( ' + this.firstCondition.generateBlockCodeText() + ' '
            + this.logicalOperator + ' ' + this.secondCondition.generateBlockCodeText() + ' )' :
            'WHILE ( ' + this.firstCondition.generateBlockCodeText() + ' )';
    };
    WhileStatement.prototype.callClickEvent = function (canvas, x, y) {
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
    WhileStatement.prototype.findVariable = function (variable) {
        var temp = undefined;
        if (this.firstCondition.findVariable(variable))
            return this;
        if (this.secondCondition)
            if (this.secondCondition.findVariable(variable))
                return this;
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                temp = this.childStatement[i].findVariable(variable);
                if (temp != undefined)
                    return temp;
            }
        }
        return undefined;
    };
    WhileStatement.prototype.findStatement = function (statement) {
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
    WhileStatement.prototype.cloneStatement = function (statementCount) {
        var whileStatement;
        var returnClone;
        var childStatement = [];
        if (this.logicalOperator != undefined)
            whileStatement = new WhileStatement(this.level, statementCount++, this.isWhile, undefined, this.firstCondition.cloneCondition(), this.logicalOperator, this.secondCondition.cloneCondition());
        else
            whileStatement = new WhileStatement(this.level, statementCount++, this.isWhile, undefined, this.firstCondition.cloneCondition());
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++);
                if (returnClone.result == false)
                    return returnClone;
                childStatement.push(returnClone.statement);
            }
            whileStatement.updateChildStatement(childStatement);
        }
        return new ReturnClone_1.default(whileStatement, true);
    };
    WhileStatement.prototype.turnOffOption = function () {
        if (this.option[0] != undefined)
            this.option[0].isSelectionActive = false;
        if (this.option[1] != undefined)
            this.option[1].isSelectionActive = false;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].turnOffOption();
        }
    };
    WhileStatement.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCSourceCode() + ')\n');
        else
            sourceCodeContainer.push(this.getIndentation() + 'do\n');
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
        if (!this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCSourceCode() + ');\n');
        return sourceCodeContainer;
    };
    WhileStatement.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCSourceCode() + ')\n');
        else
            sourceCodeContainer.push(this.getIndentation() + 'do\n');
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
        if (!this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCSourceCode() + ');\n');
        return sourceCodeContainer;
    };
    WhileStatement.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateJavaSourceCode() + ')\n');
        else
            sourceCodeContainer.push(this.getIndentation() + 'do\n');
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
        if (!this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateJavaSourceCode() + ');\n');
        return sourceCodeContainer;
    };
    WhileStatement.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCsSourceCode() + ')\n');
        else
            sourceCodeContainer.push(this.getIndentation() + 'do\n');
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
        if (!this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCsSourceCode() + ');\n');
        return sourceCodeContainer;
    };
    WhileStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'while ' + this.firstCondition.generatePythonSourceCode() + ':\n');
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
    WhileStatement.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'WHILE ' + this.firstCondition.generateBlockCodeText() + ' \n');
        else
            sourceCodeContainer.push(this.getIndentation() + 'DO\n');
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
        if (!this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'WHILE ' + this.firstCondition.generateBlockCodeText() + ' \n');
        return sourceCodeContainer;
    };
    WhileStatement.prototype.toJSON = function () {
        return {
            statement: 'while',
            level: this.level,
            statementId: this.statementId,
            isWhile: this.isWhile,
            childStatement: this.childStatement,
            firstCondition: this.firstCondition,
            logicalOperator: this.logicalOperator,
            secondCondition: this.secondCondition
        };
    };
    WhileStatement.prototype.parseChild = function () {
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
                    tempChild = Object.assign(new WhileStatement(undefined, undefined, undefined, undefined, undefined), object);
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
    WhileStatement.prototype.parseAttributes = function () {
        var firstCondition = Object.assign(new Condition_1.default(undefined, undefined, undefined, undefined), this.firstCondition);
        firstCondition.parseAttributes();
        this.firstCondition = firstCondition;
        if (this.secondCondition != undefined) {
            var secondCondition = Object.assign(new Condition_1.default(undefined, undefined, undefined, undefined), this.secondCondition);
            secondCondition.parseAttributes();
            this.secondCondition = secondCondition;
        }
    };
    return WhileStatement;
}(Statement_1.default));
exports.default = WhileStatement;
