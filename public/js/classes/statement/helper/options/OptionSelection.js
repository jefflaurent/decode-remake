"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClick_1 = __importDefault(require("../../../../utilities/ReturnClick"));
var OptionSelection = /** @class */ (function () {
    function OptionSelection(optionName, optionColor, coorX, currentX, coorY, width, height, parent) {
        this.optionName = optionName;
        this.optionColor = optionColor;
        this.coorX = coorX;
        this.currentX = currentX;
        this.coorY = coorY;
        this.width = width;
        this.height = height;
        this.parent = parent;
    }
    OptionSelection.prototype.draw = function (canvas) {
        canvas.createSelection(this.coorX, this.coorY, this.optionName, this.optionColor);
    };
    OptionSelection.prototype.clickOption = function (x, y) {
        if (x <= this.coorX + this.width && x >= this.coorX && y <= this.coorY + this.height && y >= this.coorY) {
            return new ReturnClick_1.default(this.parent, this.optionName);
        }
        return undefined;
    };
    OptionSelection.prototype.showSelection = function () {
        // console.log('start clearing')
        // console.log(canvas)
        // this.canvas.clearSelection(this.currentX, this.coorY)
        // console.log('stop clearing')
        // this.draw(this.canvas, this.currentX, this.coorY)
        // this.currentX += 1;
        // if(coorX + this.width <  this.coorX + this.width) {
        // requestAnimationFrame(this.showSelection.bind(this))
        // (window as any).requestAnimationFrame(this.showSelection.bind(this))
        // }
    };
    return OptionSelection;
}());
exports.default = OptionSelection;
