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
var Option_1 = __importDefault(require("./helper/options/Option"));
var Statement_1 = __importDefault(require("./Statement"));
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
    return WhileStatement;
}(Statement_1.default));
exports.default = WhileStatement;