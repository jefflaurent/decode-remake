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
var Return_1 = __importDefault(require("../../utilities/Return"));
var Variable_1 = __importDefault(require("./Variable"));
var Char = /** @class */ (function (_super) {
    __extends(Char, _super);
    function Char(name, value) {
        return _super.call(this, name, value) || this;
    }
    Char.prototype.validateValue = function () {
        if (this.value.length > 1)
            return new Return_1.default(false, 'Character value cannot be more than 1 character!');
        else
            return new Return_1.default(true, '');
    };
    Char.prototype.toJSON = function () {
        return {
            type: 'char',
            name: this.name,
            value: this.value
        };
    };
    return Char;
}(Variable_1.default));
exports.default = Char;
