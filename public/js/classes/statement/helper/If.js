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
var Statement_1 = __importDefault(require("../Statement"));
var Option_1 = __importDefault(require("./options/Option"));
var If = /** @class */ (function (_super) {
    __extends(If, _super);
    function If(level, statementId, firstCondition, logicalOperator, secondCondition, childStatement) {
        var _this = _super.call(this, level) || this;
        _this.statementId = _this.generateId(statementId);
        _this.firstCondition = firstCondition;
        _this.logicalOperator = logicalOperator;
        _this.secondCondition = secondCondition;
        _this.childStatement = childStatement;
        _this.option = undefined;
        _this.init();
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
        var coordinate = canvas.writeText(this.level, text);
        // Create option button for IfStatement
        this.parent.option = new Option_1.default(this.parent.statementId, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this.parent);
        this.parent.option.draw(canvas);
        // Create option button for If
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE);
        canvas.updateLastPosition();
        // Body
        if (this.childStatement != null) {
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas);
        }
        // Create bridge 
        canvas.createBridge('#00A9E2', this.level, upper, canvas.LAST_POSITION);
        // Optional close block
        if (isClose) {
            var coorX = canvas.PADDING + canvas.LINE_HEIGHT * (this.level - 1) + canvas.SPACE;
            var coorY = canvas.LAST_POSITION + canvas.SPACE;
            canvas.createBackground('#00A9E2', text, coorX, coorY);
        }
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
                tempChild = this.childStatement[i].option.clickOption(canvas, x, y);
                if (tempChild != undefined)
                    break;
            }
        }
        return temp ? temp : tempChild;
    };
    return If;
}(Statement_1.default));
exports.default = If;
