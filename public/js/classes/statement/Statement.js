"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Statement = /** @class */ (function () {
    function Statement(level) {
        this.statementId = '';
        this.level = level;
    }
    Statement.prototype.generateId = function (number) { };
    Statement.prototype.writeToCanvas = function (canvas, isClose) { };
    return Statement;
}());
exports.default = Statement;
