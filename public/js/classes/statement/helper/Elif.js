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
var If_1 = __importDefault(require("./If"));
var Elif = /** @class */ (function (_super) {
    __extends(Elif, _super);
    function Elif(level, statementId, firstCondition, logicalOperator, secondCondition, childStatement) {
        var _this = _super.call(this, level, statementId, firstCondition, logicalOperator, secondCondition, childStatement) || this;
        _this.statementId = _this.generateId(statementId);
        _this.init();
        return _this;
    }
    Elif.prototype.generateId = function (number) {
        return 'elif-' + number;
    };
    Elif.prototype.writeToCanvas = function (canvas, isClose) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = 'ELSE IF';
        if (this.logicalOperator != undefined && this.secondCondition != undefined)
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' '
                + this.secondCondition.generateBlockCodeText() + ' )';
        else
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' )';
        // ELSE IF( condition )
        var coordinate = canvas.writeText(this.level, text);
        // Create option button
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
            var coorX = canvas.PADDING + canvas.LINE_HEIGHT * (this.level - 1) + canvas.SPACE * (this.level - 1);
            var coorY = canvas.LAST_POSITION + canvas.SPACE;
            canvas.createBackground('#00A9E2', text, coorX, coorY);
        }
    };
    return Elif;
}(If_1.default));
exports.default = Elif;
