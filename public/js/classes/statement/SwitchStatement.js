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
            for (var i = 0; i < this.caseStatement.length; i++)
                this.caseStatement[i].parent = this;
    };
    SwitchStatement.prototype.writeToCanvas = function (canvas) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = 'SWITCH (' + this.variable.name + ' )';
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.option = new Option_1.default(this.statementId, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.draw(canvas);
        for (var i = 0; i < this.caseStatement.length; i++) {
            console.log(this.caseStatement[i]);
            this.caseStatement[i].writeToCanvas(canvas);
        }
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
    return SwitchStatement;
}(Statement_1.default));
exports.default = SwitchStatement;
