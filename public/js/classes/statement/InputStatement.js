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
var Option_1 = __importDefault(require("./helper/options/Option"));
var Statement_1 = __importDefault(require("./Statement"));
var InputStatement = /** @class */ (function (_super) {
    __extends(InputStatement, _super);
    function InputStatement(statementId, level, variable) {
        var _this = _super.call(this, level) || this;
        _this.variable = variable;
        _this.statementId = _this.generateId(statementId);
        _this.color = '#f4be0b';
        return _this;
    }
    InputStatement.prototype.generateId = function (number) {
        if (this.variable instanceof Integer_1.default)
            return 'input-integer-' + number;
        else if (this.variable instanceof Long_1.default)
            return 'input-long-' + number;
        else if (this.variable instanceof Float_1.default)
            return 'input-float-' + number;
        else if (this.variable instanceof Double_1.default)
            return 'input-double-' + number;
        else if (this.variable instanceof Char_1.default)
            return 'input-char-' + number;
        else
            return 'input-string-' + number;
    };
    InputStatement.prototype.writeToCanvas = function (canvas) {
        var text = 'INPUT ' + this.variable.name;
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT);
    };
    InputStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.parent = this;
        this.option.draw(canvas);
    };
    InputStatement.prototype.callClickEvent = function (canvas, x, y) {
        return this.option.clickOption(canvas, x, y);
    };
    InputStatement.prototype.findVariable = function (variable) {
        if (this.variable.name == variable.name)
            return this;
        return undefined;
    };
    InputStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        return false;
    };
    InputStatement.prototype.cloneStatement = function (statementCount) {
        return new ReturnClone_1.default(new InputStatement(statementCount, this.level, this.variable), true);
    };
    return InputStatement;
}(Statement_1.default));
exports.default = InputStatement;
