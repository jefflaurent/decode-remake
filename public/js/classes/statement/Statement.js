"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Statement = /** @class */ (function () {
    function Statement(level) {
        this.statementId = '';
        this.level = level;
        this.childStatement = undefined;
    }
    Statement.prototype.updateChildLevel = function () {
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                this.childStatement[i].level = this.level + 1;
                this.childStatement[i].updateChildLevel();
            }
        }
    };
    Statement.prototype.generateId = function (number) { };
    Statement.prototype.writeToCanvas = function (canvas, isClose) { };
    Statement.prototype.updateChildStatement = function (childStatement) { };
    Statement.prototype.callClickEvent = function (canvas, x, y) { };
    return Statement;
}());
exports.default = Statement;
