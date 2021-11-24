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
var Char_1 = __importDefault(require("../variable/Char"));
var Double_1 = __importDefault(require("../variable/Double"));
var Float_1 = __importDefault(require("../variable/Float"));
var Integer_1 = __importDefault(require("../variable/Integer"));
var Long_1 = __importDefault(require("../variable/Long"));
var String_1 = __importDefault(require("../variable/String"));
var Statement_1 = __importDefault(require("./Statement"));
var Option_1 = __importDefault(require("./helper/Option"));
var DeclareStatement = /** @class */ (function (_super) {
    __extends(DeclareStatement, _super);
    function DeclareStatement(statementId, level, variable) {
        var _this = _super.call(this, level) || this;
        _this.variable = variable;
        _this.statementId = _this.generateId(statementId);
        _this.option = undefined;
        return _this;
    }
    DeclareStatement.prototype.generateId = function (number) {
        if (this.variable instanceof Integer_1.default)
            return 'declare-integer-' + number;
        else if (this.variable instanceof Long_1.default)
            return 'declare-long-' + number;
        else if (this.variable instanceof Float_1.default)
            return 'declare-float-' + number;
        else if (this.variable instanceof Double_1.default)
            return 'declare-double-' + number;
        else if (this.variable instanceof Char_1.default)
            return 'declare-char-' + number;
        else
            return 'declare-string-' + number;
    };
    DeclareStatement.prototype.writeToCanvas = function (canvas) {
        var text = '';
        if (this.variable instanceof Integer_1.default)
            text = 'INTEGER ' + this.variable.name + ' = ' + this.variable.value;
        else if (this.variable instanceof Long_1.default)
            text = 'LONG ' + this.variable.name + ' = ' + this.variable.value;
        else if (this.variable instanceof Float_1.default)
            text = 'FLOAT ' + this.variable.name + ' = ' + this.variable.value;
        else if (this.variable instanceof Double_1.default)
            text = 'DOUBLE ' + this.variable.name + ' = ' + this.variable.value;
        else if (this.variable instanceof Char_1.default)
            text = 'CHAR ' + this.variable.name + ' = ' + "'" + this.variable.value + "'";
        else if (this.variable instanceof String_1.default)
            text = 'STRING ' + this.variable.name + ' = ' + "\"" + this.variable.value + "\"";
        var coordinate = canvas.writeText(this.level, text);
        this.createOption(canvas, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT);
    };
    DeclareStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT);
        this.option.parent = this;
        this.option.draw(canvas);
    };
    DeclareStatement.prototype.callClickEvent = function (x, y) {
        this.option.clickOption(x, y);
        console.log('im here');
    };
    return DeclareStatement;
}(Statement_1.default));
exports.default = DeclareStatement;
