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
var Case_1 = __importDefault(require("./helper/case/Case"));
var Elif_1 = __importDefault(require("./helper/ifs/Elif"));
var Else_1 = __importDefault(require("./helper/ifs/Else"));
var If_1 = __importDefault(require("./helper/ifs/If"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var IfStatement_1 = __importDefault(require("./IfStatement"));
var Statement_1 = __importDefault(require("./Statement"));
var SwitchStatement = /** @class */ (function (_super) {
    __extends(SwitchStatement, _super);
    function SwitchStatement(level, statementId, variable, caseStatement) {
        var _this = _super.call(this, level) || this;
        _this.statementId = _this.generateId(statementId);
        _this.caseStatement = caseStatement;
        _this.variable = variable;
        _this.color = '#2bea15';
        _this.init();
        return _this;
    }
    SwitchStatement.prototype.updateCaseStatement = function (caseStatement) {
        this.caseStatement = caseStatement;
        this.init();
    };
    SwitchStatement.prototype.updateChildLevel = function () {
        if (this.caseStatement != undefined)
            for (var i = 0; i < this.caseStatement.length; i++) {
                this.caseStatement[i].level = this.level + 1;
                this.caseStatement[i].updateChildLevel();
            }
    };
    SwitchStatement.prototype.updateChildStatement = function (caseStatement) {
        this.caseStatement = caseStatement;
        this.init();
    };
    SwitchStatement.prototype.generateId = function (statementId) {
        return 'switch-statement-' + statementId;
    };
    SwitchStatement.prototype.init = function () {
        if (this.caseStatement != undefined)
            for (var i = 0; i < this.caseStatement.length; i++) {
                this.caseStatement[i].parent = this;
                this.caseStatement[i].level = this.level + 1;
            }
    };
    SwitchStatement.prototype.writeToCanvas = function (canvas) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = 'SWITCH ( ' + this.variable.name + ' )';
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.option = new Option_1.default(this.statementId, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.draw(canvas);
        for (var i = 0; i < this.caseStatement.length; i++)
            this.caseStatement[i].writeToCanvas(canvas);
        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION);
        canvas.writeClosingBlock(this.level, text, 'END SWITCH', this.color);
    };
    SwitchStatement.prototype.callClickEvent = function (canvas, x, y) {
        var temp = this.option.clickOption(canvas, x, y);
        var tempChild = undefined;
        if (this.caseStatement != undefined)
            for (var i = 0; i < this.caseStatement.length; i++) {
                tempChild = this.caseStatement[i].callClickEvent(canvas, x, y);
                if (tempChild != undefined)
                    break;
            }
        return temp ? temp : tempChild;
    };
    SwitchStatement.prototype.findVariable = function (variable) {
        var temp = undefined;
        if (this.variable.name == variable.name)
            return this;
        for (var i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].findVariable(variable);
            if (temp != undefined)
                return temp;
        }
        return undefined;
    };
    SwitchStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        var statementFound = false;
        for (var i = 0; i < this.caseStatement.length; i++) {
            statementFound = this.caseStatement[i].findStatement(statement);
            if (statementFound)
                return true;
        }
        return false;
    };
    SwitchStatement.prototype.cloneStatement = function (statementCount) {
        var switchStatement = new SwitchStatement(this.level, statementCount++, this.variable, undefined);
        var caseStatement = [];
        var returnClone;
        for (var i = 0; i < this.caseStatement.length; i++) {
            returnClone = this.caseStatement[i].cloneStatement(statementCount++);
            if (returnClone.result == false)
                return returnClone;
            caseStatement.push(returnClone.statement);
            switchStatement.updateChildStatement(caseStatement);
        }
        return new ReturnClone_1.default(switchStatement, true);
    };
    SwitchStatement.prototype.turnOffOption = function () {
        if (this.option != undefined)
            this.option.isSelectionActive = false;
        if (this.caseStatement != undefined) {
            for (var i = 0; i < this.caseStatement.length; i++)
                this.caseStatement[i].turnOffOption();
        }
    };
    SwitchStatement.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'switch(' + this.variable.name + ')\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        for (var i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generateCSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++)
                sourceCodeContainer.push(temp[j]);
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    SwitchStatement.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'switch(' + this.variable.name + ')\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        for (var i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generateCppSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++)
                sourceCodeContainer.push(temp[j]);
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    SwitchStatement.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'switch(' + this.variable.name + ')\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        for (var i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generateJavaSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++)
                sourceCodeContainer.push(temp[j]);
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    SwitchStatement.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'switch(' + this.variable.name + ')\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        for (var i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generateCsSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++)
                sourceCodeContainer.push(temp[j]);
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    SwitchStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var ifStatement = new IfStatement_1.default(this.level, 0, undefined);
        var ifOperations = [];
        var tempCondition = undefined;
        var tempChildStatement = undefined;
        var temp;
        for (var i = 0; i < this.caseStatement.length; i++) {
            tempCondition = this.caseStatement[i].condition;
            tempChildStatement = this.caseStatement[i].childStatement;
            if (i == 0)
                ifOperations.push(new If_1.default(this.level, 0, tempCondition, undefined, undefined, tempChildStatement));
            else {
                if (this.caseStatement[i].isDefault)
                    ifOperations.push(new Else_1.default(this.level, 0, tempChildStatement));
                else
                    ifOperations.push(new Elif_1.default(this.level, 0, tempCondition, undefined, undefined, tempChildStatement));
            }
        }
        ifStatement.updateIfOperations(ifOperations);
        temp = ifStatement.generatePythonSourceCode();
        temp = temp.flat(Infinity);
        for (var j = 0; j < temp.length; j++)
            sourceCodeContainer.push(temp[j]);
        return sourceCodeContainer;
    };
    SwitchStatement.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'SWITCH ' + this.variable.name + '\n');
        sourceCodeContainer.push(this.getIndentation() + 'BEGIN\n');
        for (var i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generatePseudocode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++)
                sourceCodeContainer.push(temp[j]);
        }
        sourceCodeContainer.push(this.getIndentation() + 'END\n');
        return sourceCodeContainer;
    };
    SwitchStatement.prototype.toJSON = function () {
        return {
            statement: 'switch',
            level: this.level,
            statementId: this.statementId,
            variable: this.variable,
            caseStatement: this.caseStatement
        };
    };
    SwitchStatement.prototype.parseChild = function () {
        var newCaseStatement = [];
        var tempCase = undefined;
        var object = undefined;
        for (var i = 0; i < this.caseStatement.length; i++) {
            object = this.caseStatement[i];
            tempCase = Object.assign(new Case_1.default(undefined, undefined, undefined, undefined, undefined), object);
            tempCase.parseChild();
            tempCase.parseAttributes();
            newCaseStatement.push(tempCase);
        }
        this.updateCaseStatement(newCaseStatement);
    };
    SwitchStatement.prototype.parseAttributes = function () {
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
    return SwitchStatement;
}(Statement_1.default));
exports.default = SwitchStatement;
