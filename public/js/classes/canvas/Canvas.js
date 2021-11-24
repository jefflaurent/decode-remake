"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Coordinate_1 = __importDefault(require("../statement/helper/Coordinate"));
var Canvas = /** @class */ (function () {
    function Canvas(canvas, ctx, LINE_HEIGHT, PADDING, SPACE) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.LINE_HEIGHT = LINE_HEIGHT;
        this.PADDING = PADDING;
        this.SPACE = SPACE;
        this.LAST_POSITION = PADDING;
    }
    Canvas.prototype.configureCanvas = function (LINE_HEIGHT, PADDING, SPACE) {
        this.LINE_HEIGHT = LINE_HEIGHT;
        this.PADDING = PADDING;
        this.SPACE = SPACE;
    };
    Canvas.prototype.clearCanvas = function () {
        this.LAST_POSITION = this.PADDING;
        this.ctx.fillStyle = '#C4C4C4';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Canvas.prototype.writeText = function (level, text) {
        var coorX = this.PADDING + this.LINE_HEIGHT * (level - 1) + this.SPACE * (level - 1);
        var coorY = this.LAST_POSITION + this.SPACE;
        var coor = this.createBackground('#00A9E2', text, coorX, coorY);
        this.ctx.font = '14px sans-serif';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText(text, coorX + this.LINE_HEIGHT / 3, coorY + this.LINE_HEIGHT / 1.7);
        return coor;
    };
    Canvas.prototype.createBackground = function (color, text, coorX, coorY) {
        var width = 0;
        width = this.ctx.measureText(text).width * 1.5;
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(coorX, coorY, width, this.LINE_HEIGHT);
        this.updateLastPosition();
        return new Coordinate_1.default(coorX + width, this.LAST_POSITION);
    };
    Canvas.prototype.createBridge = function (color, level, upper, lower) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(this.PADDING + this.SPACE * (level - 1) + this.LINE_HEIGHT * (level - 1), upper, this.LINE_HEIGHT, (lower - upper));
    };
    Canvas.prototype.createOption = function (coorX, coorY) {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#928A8A';
        this.ctx.fillRect(coorX, coorY, this.LINE_HEIGHT, this.LINE_HEIGHT);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText('>>', coorX + this.LINE_HEIGHT / 3, coorY + this.LINE_HEIGHT / 1.7);
    };
    Canvas.prototype.updateLastPosition = function () {
        this.LAST_POSITION += this.LINE_HEIGHT + this.SPACE;
    };
    return Canvas;
}());
exports.default = Canvas;
