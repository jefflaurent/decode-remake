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
var Char_1 = __importDefault(require("../../../variable/Char"));
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
var Case = /** @class */ (function (_super) {
    __extends(Case, _super);
    function Case(level, statementId, condition, childStatement, isDefault) {
        var _this = _super.call(this, level) || this;
        _this.childStatement = childStatement;
        _this.condition = condition;
        _this.color = '#2bea15';
        _this.statementId = _this.generateId(statementId);
        _this.isDefault = isDefault;
        return _this;
    }
    Case.prototype.init = function () {
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this;
    };
    Case.prototype.generateId = function (statementId) {
        return 'case-statement-' + statementId;
    };
    Case.prototype.updateChildLevel = function () {
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++) {
                this.childStatement[i].level = this.level + 1;
                this.childStatement[i].updateChildLevel();
            }
    };
    Case.prototype.updateChildStatement = function (childStatement) {
        this.childStatement = childStatement;
        this.init();
    };
    Case.prototype.writeToCanvas = function (canvas) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = '';
        if (!this.isDefault) {
            if (this.condition.secondVariable instanceof Char_1.default)
                text = "CASE '" + this.condition.secondVariable.value + "':\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
            else
                text = 'CASE ' + this.condition.secondVariable.value + ':\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t';
        }
        else
            text = 'DEFAULT:' + '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t';
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE);
        canvas.updateLastPosition();
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas);
        }
        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION);
        canvas.writeClosingBlock(this.level, text, 'END CASE\t\t\t\t\t\t', this.color);
    };
    Case.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.draw(canvas);
    };
    Case.prototype.callClickEvent = function (canvas, x, y) {
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
    Case.prototype.findVariable = function (variable) {
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
    Case.prototype.findStatement = function (statement) {
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
    Case.prototype.cloneStatement = function (statementCount) {
        var caseStatement;
        var returnClone;
        var childStatement = [];
        if (this.isDefault)
            caseStatement = new Case(this.level, statementCount++, undefined, undefined, true);
        else
            caseStatement = new Case(this.level, statementCount++, this.condition.cloneCondition(), undefined, this.isDefault);
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++);
                if (returnClone.result == false)
                    return returnClone;
                childStatement.push(returnClone.statement);
            }
        }
        caseStatement.updateChildStatement(childStatement);
        return new ReturnClone_1.default(caseStatement, true);
    };
    Case.prototype.turnOffOption = function () {
        if (this.option != undefined)
            this.option.isSelectionActive = false;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].turnOffOption();
        }
    };
    Case.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (!this.isDefault) {
            if (this.condition.secondVariable instanceof Char_1.default)
                sourceCodeContainer.push(this.getIndentation() + "case '" + this.condition.secondVariable.value + "':\n");
            else
                sourceCodeContainer.push(this.getIndentation() + "case " + this.condition.secondVariable.value + ":\n");
        }
        else
            sourceCodeContainer.push(this.getIndentation() + "default:\n");
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
        sourceCodeContainer.push(this.getIndentation() + '\tbreak;\n');
        return sourceCodeContainer;
    };
    Case.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (!this.isDefault) {
            if (this.condition.secondVariable instanceof Char_1.default)
                sourceCodeContainer.push(this.getIndentation() + "case '" + this.condition.secondVariable.value + "':\n");
            else
                sourceCodeContainer.push(this.getIndentation() + "case " + this.condition.secondVariable.value + ":\n");
        }
        else
            sourceCodeContainer.push(this.getIndentation() + "default:\n");
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
        sourceCodeContainer.push(this.getIndentation() + '\tbreak;\n');
        return sourceCodeContainer;
    };
    Case.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (!this.isDefault) {
            if (this.condition.secondVariable instanceof Char_1.default)
                sourceCodeContainer.push(this.getIndentation() + "case '" + this.condition.secondVariable.value + "':\n");
            else
                sourceCodeContainer.push(this.getIndentation() + "case " + this.condition.secondVariable.value + ":\n");
        }
        else
            sourceCodeContainer.push(this.getIndentation() + "default:\n");
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
        sourceCodeContainer.push(this.getIndentation() + '\tbreak;\n');
        return sourceCodeContainer;
    };
    Case.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (!this.isDefault) {
            if (this.condition.secondVariable instanceof Char_1.default)
                sourceCodeContainer.push(this.getIndentation() + "case '" + this.condition.secondVariable.value + "':\n");
            else
                sourceCodeContainer.push(this.getIndentation() + "case " + this.condition.secondVariable.value + ":\n");
        }
        else
            sourceCodeContainer.push(this.getIndentation() + "default:\n");
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
        sourceCodeContainer.push(this.getIndentation() + '\tbreak;\n');
        return sourceCodeContainer;
    };
    Case.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (!this.isDefault) {
            if (this.condition.secondVariable instanceof Char_1.default)
                sourceCodeContainer.push(this.getIndentation() + "CASE '" + this.condition.secondVariable.value + "'\n");
            else
                sourceCodeContainer.push(this.getIndentation() + "CASE " + this.condition.secondVariable.value + "\n");
        }
        else
            sourceCodeContainer.push(this.getIndentation() + "DEFAULT\n");
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
        sourceCodeContainer.push(this.getIndentation() + '\tBREAK\n');
        return sourceCodeContainer;
    };
    Case.prototype.toJSON = function () {
        return {
            statement: 'case',
            level: this.level,
            statementId: this.statementId,
            condition: this.condition,
            childStatement: this.childStatement,
            isDefault: this.isDefault
        };
    };
    Case.prototype.parseChild = function () {
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
    Case.prototype.parseAttributes = function () {
        var condition;
        condition = Object.assign(new Condition_1.default(undefined, undefined, undefined, undefined), this.condition);
        condition.parseAttributes();
        this.condition = condition;
    };
    return Case;
}(Statement_1.default));
exports.default = Case;
