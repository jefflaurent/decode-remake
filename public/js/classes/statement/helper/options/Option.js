"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DeclareStatement_1 = __importDefault(require("../../DeclareStatement"));
var IfStatement_1 = __importDefault(require("../../IfStatement"));
var OptionSelection_1 = __importDefault(require("./OptionSelection"));
var Option = /** @class */ (function () {
    function Option(optionId, coorX, coorY, width, height, parent) {
        this.optionId = this.generateId(optionId);
        this.coorX = coorX;
        this.coorY = coorY;
        this.width = width;
        this.height = height;
        this.isSelectionActive = false;
        this.parent = parent;
        this.optionSelection = this.generateOptions();
    }
    Option.prototype.generateId = function (optionId) {
        return 'opt-' + optionId;
    };
    Option.prototype.generateOptions = function () {
        var temp = [];
        if (this.parent instanceof DeclareStatement_1.default || this.parent instanceof IfStatement_1.default) {
            temp.push(new OptionSelection_1.default('ADD', '#2948e3', this.coorX + 45, this.coorX, this.coorY, 40, 40, this.parent));
            temp.push(new OptionSelection_1.default('PST', '#e65010', this.coorX + 90, this.coorX, this.coorY, 40, 40, this.parent));
            temp.push(new OptionSelection_1.default('MOV', '#186e2b', this.coorX + 135, this.coorX, this.coorY, 40, 40, this.parent));
            temp.push(new OptionSelection_1.default('CPY', '#4b1363', this.coorX + 180, this.coorX, this.coorY, 40, 40, this.parent));
            temp.push(new OptionSelection_1.default('DEL', '#ad0e0e', this.coorX + 225, this.coorX, this.coorY, 40, 40, this.parent));
            temp.push(new OptionSelection_1.default('EDT', '#e3e029', this.coorX + 270, this.coorX, this.coorY, 40, 40, this.parent));
        }
        else {
            temp.push(new OptionSelection_1.default('ADD', '#2948e3', this.coorX + 45, this.coorX, this.coorY, 40, 40, this.parent));
            temp.push(new OptionSelection_1.default('PST', '#e65010', this.coorX + 90, this.coorX, this.coorY, 40, 40, this.parent));
        }
        return temp;
    };
    Option.prototype.draw = function (canvas) {
        canvas.createOption(this.coorX, this.coorY);
    };
    Option.prototype.clickOption = function (canvas, x, y) {
        var temp = undefined;
        if (x <= this.coorX + this.width && x >= this.coorX && y <= this.coorY + this.height && y >= this.coorY) {
            if (!this.isSelectionActive) {
                this.showOptionSelections(canvas);
            }
            else {
                this.clearSelection(canvas, this.optionSelection.length + 1);
                this.findChildOptionClick(x, y);
            }
            this.isSelectionActive = !this.isSelectionActive;
        }
        else if (this.isSelectionActive) {
            temp = this.findChildOptionClick(x, y);
        }
        return temp;
    };
    Option.prototype.clearSelection = function (canvas, length) {
        canvas.clearOptions(this.coorX + canvas.LINE_HEIGHT, this.coorY, length);
    };
    Option.prototype.findChildOptionClick = function (x, y) {
        var temp = undefined;
        for (var i = 0; i < this.optionSelection.length; i++) {
            temp = this.optionSelection[i].clickOption(x, y);
            if (temp != undefined)
                break;
        }
        return temp;
    };
    Option.prototype.showOptionSelections = function (canvas) {
        for (var i = 0; i < this.optionSelection.length; i++) {
            this.optionSelection[i].draw(canvas);
        }
    };
    return Option;
}());
exports.default = Option;
