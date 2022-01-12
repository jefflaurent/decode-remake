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
var String = /** @class */ (function (_super) {
    __extends(String, _super);
    function String(name, value) {
        return _super.call(this, name, value) || this;
    }
    String.prototype.validateValue = function () {
        return new Return_1.default(true, '');
    };
    String.prototype.toJSON = function () {
        return {
            type: 'string',
            name: this.name,
            value: this.value
        };
    };
    return String;
}(Variable_1.default));
exports.default = String;
