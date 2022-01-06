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
var Statement_1 = __importDefault(require("../../Statement"));
var Option_1 = __importDefault(require("../options/Option"));
var Else = /** @class */ (function (_super) {
    __extends(Else, _super);
    function Else(level, statementId, childStatement) {
        var _this = _super.call(this, level) || this;
        _this.statementId = _this.generateId(statementId);
        _this.childStatement = childStatement;
        _this.color = '#2bea15';
        _this.option = undefined;
        _this.init();
        return _this;
    }
    Else.prototype.generateId = function (number) {
        return 'else-' + number;
    };
    Else.prototype.init = function () {
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this;
    };
    Else.prototype.updateChildStatement = function (childStatement) {
        this.childStatement = childStatement;
        this.init();
    };
    Else.prototype.writeToCanvas = function (canvas, isClose) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = 'ELSE\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t';
        // ELSE
        var coordinate = canvas.writeText(this.level, text, this.color);
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
    Else.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.draw(canvas);
    };
    Else.prototype.callClickEvent = function (canvas, x, y) {
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
    Else.prototype.findVariable = function (variable) {
        var temp = undefined;
        if (this.childStatement == undefined)
            return undefined;
        for (var i = 0; i < this.childStatement.length; i++) {
            temp = this.childStatement[i].findVariable(variable);
            if (temp != undefined)
                return temp;
        }
        return undefined;
    };
    Else.prototype.findStatement = function (statement) {
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
    Else.prototype.cloneStatement = function (statementCount) {
        var elseStatement;
        var returnClone;
        var childStatement = [];
        elseStatement = new Else(this.level, statementCount++);
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++);
                if (returnClone.result == false)
                    return returnClone;
                childStatement.push(returnClone.statement);
            }
            elseStatement.updateChildStatement(childStatement);
        }
        return new ReturnClone_1.default(elseStatement, true);
    };
    Else.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'else\n');
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
    Else.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'else\n');
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
    Else.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'else\n');
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
    Else.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'else\n');
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
    Else.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        sourceCode += 'else:\n';
        sourceCodeContainer.push(sourceCode);
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
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
            sourceCodeContainer.push('\n');
        }
        return sourceCodeContainer;
    };
    return Else;
}(Statement_1.default));
exports.default = Else;
