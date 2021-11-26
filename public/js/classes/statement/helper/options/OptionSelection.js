"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClick_1 = __importDefault(require("../../../../utilities/ReturnClick"));
var ReturnPaste_1 = __importDefault(require("../../../../utilities/ReturnPaste"));
var DeclareStatement_1 = __importDefault(require("../../DeclareStatement"));
var IfStatement_1 = __importDefault(require("../../IfStatement"));
var Elif_1 = __importDefault(require("../Elif"));
var Else_1 = __importDefault(require("../Else"));
var If_1 = __importDefault(require("../If"));
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
            return new ReturnClick_1.default(this.parent, this);
        }
        return undefined;
    };
    OptionSelection.prototype.handlePaste = function (destinationStatement, clipboard, originStatement, listStatement, lastSelectedOption) {
        if (lastSelectedOption != 'MOV' && lastSelectedOption != 'CPY') {
            alert('Clipboard is empty!');
            return new ReturnPaste_1.default(false, listStatement);
        }
        var targetStatementIdx = -1;
        var toBeMovedStatementIdx = -1;
        if (lastSelectedOption == 'CPY' && clipboard instanceof DeclareStatement_1.default) {
            alert('Could not copy declare statement!');
            return new ReturnPaste_1.default(false, listStatement);
        }
        // Paste after statement
        if (destinationStatement instanceof DeclareStatement_1.default || destinationStatement instanceof IfStatement_1.default) {
            var parentStatement = destinationStatement.level == 1 ? undefined : destinationStatement.parent;
            // Statement is located on level 1
            if (parentStatement == undefined) {
                targetStatementIdx = listStatement.indexOf(destinationStatement);
                if (targetStatementIdx != -1) {
                    listStatement.splice(targetStatementIdx + 1, 0, clipboard);
                    if (lastSelectedOption == 'MOV') {
                        if (originStatement != undefined) {
                            toBeMovedStatementIdx = originStatement.childStatement.indexOf(clipboard, 0);
                            originStatement.childStatement.splice(toBeMovedStatementIdx, 1);
                        }
                        else {
                            toBeMovedStatementIdx = listStatement.indexOf(clipboard, 0);
                            listStatement.splice(toBeMovedStatementIdx, 1);
                        }
                    }
                    return new ReturnPaste_1.default(true, listStatement);
                }
            }
            // Statement is a child of another statement
            else {
                if (parentStatement instanceof If_1.default || parentStatement instanceof Elif_1.default || parentStatement instanceof Else_1.default) {
                    var targetChildStatementList = parentStatement.childStatement;
                    targetStatementIdx = targetChildStatementList.indexOf(destinationStatement, 0);
                    if (targetStatementIdx != -1) {
                        targetChildStatementList.splice(targetStatementIdx + 1, 0, clipboard);
                        if (lastSelectedOption == 'MOV') {
                            if (originStatement != undefined) {
                                toBeMovedStatementIdx = originStatement.childStatement.indexOf(clipboard, 0);
                                originStatement.childStatement.splice(toBeMovedStatementIdx, 1);
                                originStatement.updateChildStatement(originStatement.childStatement);
                            }
                            else {
                                toBeMovedStatementIdx = listStatement.indexOf(clipboard, 0);
                                listStatement.splice(toBeMovedStatementIdx, 1);
                            }
                        }
                        parentStatement.updateChildStatement(targetChildStatementList);
                        parentStatement.updateChildLevel();
                        return new ReturnPaste_1.default(true, listStatement);
                    }
                }
            }
        }
        // Paste inside statement
        else if (destinationStatement instanceof If_1.default || destinationStatement instanceof Elif_1.default || destinationStatement instanceof Else_1.default) {
            var childStatement = destinationStatement.childStatement;
            console.log('masuk ke sini');
            if (childStatement == undefined) {
                var tempChildStatement = [];
                tempChildStatement.push(clipboard);
                childStatement = tempChildStatement;
            }
            else {
                childStatement.unshift(clipboard);
            }
            destinationStatement.updateChildStatement(childStatement);
            destinationStatement.updateChildLevel();
            if (lastSelectedOption == 'MOV') {
                if (originStatement != undefined) {
                    toBeMovedStatementIdx = originStatement.childStatement.indexOf(clipboard, 0);
                    originStatement.childStatement.splice(toBeMovedStatementIdx, 1);
                    originStatement.updateChildStatement(originStatement.childStatement);
                }
                else {
                    toBeMovedStatementIdx = listStatement.indexOf(clipboard, 0);
                    listStatement.splice(toBeMovedStatementIdx, 1);
                }
            }
            return new ReturnPaste_1.default(true, listStatement);
        }
    };
    return OptionSelection;
}());
exports.default = OptionSelection;
