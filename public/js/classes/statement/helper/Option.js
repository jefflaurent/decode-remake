"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DeclareStatement_1 = __importDefault(require("../DeclareStatement"));
var Option = /** @class */ (function () {
    function Option(optionId, coorX, coorY, width, height) {
        this.optionId = this.generateId(optionId);
        this.coorX = coorX;
        this.coorY = coorY;
        this.width = width;
        this.height = height;
        this.isSelectionActive = false;
    }
    Option.prototype.generateId = function (optionId) {
        return 'opt-' + optionId;
    };
    Option.prototype.draw = function (canvas) {
        canvas.createOption(this.coorX, this.coorY);
    };
    Option.prototype.clickOption = function (canvas, x, y) {
        if (x <= this.coorX + this.width && x >= this.coorX && y <= this.coorY + this.height && y >= this.coorY) {
            if (!this.isSelectionActive) {
                if (this.parent instanceof DeclareStatement_1.default) {
                    this.createSelection(canvas);
                    this.isSelectionActive = !this.isSelectionActive;
                }
            }
            else {
                if (this.parent instanceof DeclareStatement_1.default) {
                    this.clearSelection(canvas, 2);
                    this.isSelectionActive = !this.isSelectionActive;
                }
            }
        }
    };
    Option.prototype.clearSelection = function (canvas, length) {
        canvas.clearSelection(this.coorX + canvas.LINE_HEIGHT, this.coorY, length);
    };
    Option.prototype.createSelection = function (canvas) {
        var texts = ['ADD', 'PST'];
        var colors = ['#9e2020', '#e65010'];
        for (var i = 1; i <= texts.length; i++)
            canvas.createSelection(this.coorX + (canvas.LINE_HEIGHT * i) + (canvas.SPACE * i), this.coorY, texts[i - 1], colors[i - 1]);
    };
    return Option;
}());
exports.default = Option;
