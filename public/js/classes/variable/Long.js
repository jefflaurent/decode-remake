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
var Long = /** @class */ (function (_super) {
    __extends(Long, _super);
    function Long(name, value) {
        return _super.call(this, name, value) || this;
    }
    Long.prototype.validateValue = function () {
        if (this.value == '')
            return new Return_1.default(false, 'Long value cannot be empty!');
        else if (parseInt(this.value) > 9223372036854775807)
            return new Return_1.default(false, 'Long value cannot exceeds 9223372036854775807!');
        else if (parseInt(this.value) < -9223372036854775807)
            return new Return_1.default(false, 'Long value cannot subceed -9223372036854775807!');
        else
            return new Return_1.default(true, '');
    };
    Long.prototype.toJSON = function () {
        return {
            type: 'long',
            name: this.name,
            value: this.value
        };
    };
    return Long;
}(Variable_1.default));
exports.default = Long;
