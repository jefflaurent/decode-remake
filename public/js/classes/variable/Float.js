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
var Float = /** @class */ (function (_super) {
    __extends(Float, _super);
    function Float(name, value) {
        return _super.call(this, name, value) || this;
    }
    Float.prototype.validateValue = function () {
        if (this.value == '')
            return new Return_1.default(false, 'Float value cannot be empty!');
        else if (this.value.includes('.')) {
            if (this.value.split('.')[1].length > 7)
                return new Return_1.default(false, 'Float value cannot store more than 7 decimal digits!');
            else
                return new Return_1.default(true, '');
        }
        else
            return new Return_1.default(true, '');
    };
    return Float;
}(Variable_1.default));
exports.default = Float;
