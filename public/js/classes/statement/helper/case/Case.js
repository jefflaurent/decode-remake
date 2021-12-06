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
var Statement_1 = __importDefault(require("../../Statement"));
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
        if (!this.isDefault)
            text = 'CASE ' + this.condition.secondVariable.value + ':\t\t\t\t\t\t';
        else
            text = 'DEFAULT:' + '\t\t\t\t\t\t';
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
    return Case;
}(Statement_1.default));
exports.default = Case;
