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
var Option_1 = __importDefault(require("./helper/options/Option"));
var Statement_1 = __importDefault(require("./Statement"));
var OutputStatement = /** @class */ (function (_super) {
    __extends(OutputStatement, _super);
    function OutputStatement(statementId, level, isNewLine, type, variable) {
        var _this = _super.call(this, level) || this;
        _this.variable = undefined;
        _this.variable = variable;
        _this.statementId = _this.generateId(statementId);
        _this.isNewLine = isNewLine;
        _this.type = type;
        _this.color = '#f4be0b';
        return _this;
    }
    OutputStatement.prototype.generateId = function (number) {
        return 'output-' + number;
    };
    OutputStatement.prototype.writeToCanvas = function (canvas) {
        var text = this.generateBlockCodeText();
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT);
    };
    OutputStatement.prototype.generateBlockCodeText = function () {
        var text = 'PRINT ';
        if (this.type == 'variable') {
            text += this.variable.name;
        }
        else if (this.type == 'text') {
            text += "\"Hello World!\"";
        }
        if (this.isNewLine)
            text += ' \n';
        return text;
    };
    OutputStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.parent = this;
        this.option.draw(canvas);
    };
    OutputStatement.prototype.callClickEvent = function (canvas, x, y) {
        return this.option.clickOption(canvas, x, y);
    };
    OutputStatement.prototype.findVariable = function (variable) {
        if (this.variable) {
            if (this.variable.name == variable.name)
                return this;
        }
        return undefined;
    };
    OutputStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        return false;
    };
    OutputStatement.prototype.cloneStatement = function (statementCount) {
        if (this.type == 'variable')
            return new ReturnClone_1.default(new OutputStatement(statementCount, this.level, this.isNewLine, this.type, this.variable), true);
        else
            return new ReturnClone_1.default(new OutputStatement(statementCount, this.level, this.isNewLine, this.type), true);
    };
    return OutputStatement;
}(Statement_1.default));
exports.default = OutputStatement;
