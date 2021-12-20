"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClick_1 = __importDefault(require("../../../../utilities/ReturnClick"));
var ReturnPaste_1 = __importDefault(require("../../../../utilities/ReturnPaste"));
var DeclareStatement_1 = __importDefault(require("../../DeclareStatement"));
var ForStatement_1 = __importDefault(require("../../ForStatement"));
var IfStatement_1 = __importDefault(require("../../IfStatement"));
var InputStatement_1 = __importDefault(require("../../InputStatement"));
var OutputStatement_1 = __importDefault(require("../../OutputStatement"));
var SwitchStatement_1 = __importDefault(require("../../SwitchStatement"));
var WhileStatement_1 = __importDefault(require("../../WhileStatement"));
var Case_1 = __importDefault(require("../case/Case"));
var If_1 = __importDefault(require("../ifs/If"));
var OptionSelection = /** @class */ (function () {
    function OptionSelection(optionId, optionName, optionColor, coorX, currentX, coorY, width, height, parent) {
        this.optionId = optionId;
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
        if (x <= this.coorX + this.width && x >= this.coorX && y <= this.coorY + this.height && y >= this.coorY)
            return new ReturnClick_1.default(this.parent, this);
        return undefined;
    };
    OptionSelection.prototype.addStatement = function (mainListStatement, newStatement, targetStatement, optionId) {
        var splitted = optionId.split('-');
        var isInner = splitted[splitted.length - 1] == 'inner' ? true : false;
        // Declare statement is only allowed on level 1
        if (newStatement instanceof DeclareStatement_1.default) {
            if (!this.validateDeclarePlacement(targetStatement, isInner))
                return new ReturnPaste_1.default(false, mainListStatement);
        }
        // Statements must be added after declaration
        if (!this.validateMainListStatement(mainListStatement, newStatement, targetStatement, isInner))
            return new ReturnPaste_1.default(false, mainListStatement);
        return this.paste(mainListStatement, newStatement, targetStatement, isInner);
    };
    OptionSelection.prototype.handleDelete = function (mainListStatement, clipboard) {
        var parentStatement = clipboard.parent;
        if (parentStatement == undefined) {
            if (clipboard instanceof DeclareStatement_1.default) {
                var clipboardIdx = mainListStatement.indexOf(clipboard);
                if (this.isVariableExist(mainListStatement, clipboard, clipboardIdx, false))
                    return new ReturnPaste_1.default(false, mainListStatement);
            }
            mainListStatement = this.removeSourceStatement(mainListStatement, clipboard);
        }
        else
            parentStatement.updateChildStatement(this.removeSourceStatement(parentStatement.childStatement, clipboard));
        return new ReturnPaste_1.default(true, mainListStatement);
    };
    OptionSelection.prototype.validateDeclarePlacement = function (targetStatement, isInner) {
        if (targetStatement != undefined) {
            if (targetStatement instanceof DeclareStatement_1.default || targetStatement instanceof IfStatement_1.default || targetStatement instanceof SwitchStatement_1.default
                || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner)) {
                if (targetStatement.level > 1)
                    return false;
            }
            else if (targetStatement instanceof If_1.default || targetStatement instanceof Case_1.default || (targetStatement instanceof ForStatement_1.default && isInner)
                || (targetStatement instanceof WhileStatement_1.default && isInner)) {
                return false;
            }
        }
        return true;
    };
    OptionSelection.prototype.validateMainListStatement = function (mainListStatement, clipboard, targetStatement, isInner) {
        var returnPaste = undefined;
        var result = true;
        var parentStatement = undefined;
        var pasteResult = [];
        pasteResult = this.pasteTemp(mainListStatement, clipboard, targetStatement, isInner);
        returnPaste = pasteResult[0];
        parentStatement = pasteResult[1];
        mainListStatement = returnPaste.listStatement;
        if (returnPaste.result) {
            mainListStatement = returnPaste.listStatement;
            var variableFound = false;
            if (mainListStatement != undefined) {
                for (var i = 0; i < mainListStatement.length; i++) {
                    if (mainListStatement[i] instanceof DeclareStatement_1.default) {
                        variableFound = this.isVariableExist(mainListStatement, mainListStatement[i], i, true);
                        if (variableFound) {
                            result = false;
                            break;
                        }
                    }
                }
            }
        }
        if (parentStatement == undefined)
            this.removeSourceStatement(mainListStatement, clipboard);
        else
            parentStatement.updateChildStatement(this.removeSourceStatement(parentStatement.childStatement, clipboard));
        return result;
    };
    OptionSelection.prototype.isVariableExist = function (mainListStatement, declareStatement, index, isBackward) {
        var statement = undefined;
        if (mainListStatement == undefined)
            return false;
        if (isBackward) {
            for (var i = index; i >= 0; i--) {
                statement = mainListStatement[i].findVariable(declareStatement.variable);
                if (statement != undefined)
                    return true;
            }
        }
        else {
            for (var i = index + 1; i < mainListStatement.length; i++) {
                statement = mainListStatement[i].findVariable(declareStatement.variable);
                if (statement != undefined)
                    return true;
            }
        }
        return false;
    };
    OptionSelection.prototype.handlePaste = function (mainListStatement, clipboard, targetStatement, isInner, lastSelectedOption) {
        var returnClone = clipboard.cloneStatement(Math.floor(Math.random() * 1000) + 10000);
        if (clipboard instanceof DeclareStatement_1.default) {
            if (!this.validateDeclarePlacement(targetStatement, isInner))
                return new ReturnPaste_1.default(false, mainListStatement);
        }
        // Statements must be added after declaration
        if (!this.validateMainListStatement(mainListStatement, returnClone.statement, targetStatement, isInner))
            return new ReturnPaste_1.default(false, mainListStatement);
        // Removing statement
        if (lastSelectedOption == 'MOV') {
            if (clipboard.parent == undefined)
                mainListStatement = this.removeSourceStatement(mainListStatement, clipboard);
            else
                clipboard.parent.updateChildStatement(this.removeSourceStatement(clipboard.parent.childStatement, clipboard));
        }
        return this.paste(mainListStatement, clipboard, targetStatement, isInner);
    };
    OptionSelection.prototype.pasteTemp = function (mainListStatement, clipboard, targetStatement, isInner) {
        var parentStatement = undefined;
        if (targetStatement == undefined || targetStatement.parent == undefined) {
            if (targetStatement == undefined || (targetStatement instanceof DeclareStatement_1.default || targetStatement instanceof IfStatement_1.default || targetStatement instanceof SwitchStatement_1.default
                || targetStatement instanceof OutputStatement_1.default || targetStatement instanceof InputStatement_1.default || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner))) {
                mainListStatement = this.pasteStatement(mainListStatement, targetStatement, clipboard);
            }
            else if (targetStatement instanceof If_1.default || targetStatement instanceof Case_1.default || (targetStatement instanceof ForStatement_1.default && isInner)
                || (targetStatement instanceof WhileStatement_1.default && isInner)) {
                parentStatement = targetStatement;
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard));
            }
        }
        else {
            if (targetStatement instanceof DeclareStatement_1.default || targetStatement instanceof IfStatement_1.default || targetStatement instanceof SwitchStatement_1.default
                || targetStatement instanceof OutputStatement_1.default || targetStatement instanceof InputStatement_1.default || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner)) {
                parentStatement = targetStatement.parent;
                targetStatement.parent.updateChildStatement(this.pasteStatement(targetStatement.parent.childStatement, targetStatement, clipboard));
            }
            else if (targetStatement instanceof If_1.default || targetStatement instanceof Case_1.default || (targetStatement instanceof ForStatement_1.default && isInner)
                || (targetStatement instanceof WhileStatement_1.default && isInner)) {
                parentStatement = targetStatement;
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard));
            }
        }
        return [new ReturnPaste_1.default(true, mainListStatement), parentStatement];
    };
    OptionSelection.prototype.paste = function (mainListStatement, clipboard, targetStatement, isInner) {
        /** List of possibilities:
          * - Paste after statement
          * -> Applies to DeclareStatement, IfStatement, ForStatement, SwitchStatement, InputStatement
          * - Paste inside a statement
          * -> Applies to If, Elif, Else, ForStatement, Case
        **/
        // Target is located on level 1
        if (targetStatement == undefined || targetStatement.parent == undefined) {
            if (targetStatement == undefined || (targetStatement instanceof DeclareStatement_1.default || targetStatement instanceof IfStatement_1.default || targetStatement instanceof SwitchStatement_1.default
                || targetStatement instanceof OutputStatement_1.default || targetStatement instanceof InputStatement_1.default || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner))) {
                mainListStatement = this.pasteStatement(mainListStatement, targetStatement, clipboard);
            }
            else if (targetStatement instanceof If_1.default || targetStatement instanceof Case_1.default || (targetStatement instanceof ForStatement_1.default && isInner)
                || (targetStatement instanceof WhileStatement_1.default && isInner)) {
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard));
            }
        }
        // Target is a child of another statement
        else {
            if (targetStatement instanceof DeclareStatement_1.default || targetStatement instanceof IfStatement_1.default || targetStatement instanceof SwitchStatement_1.default
                || targetStatement instanceof OutputStatement_1.default || targetStatement instanceof InputStatement_1.default || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner)) {
                targetStatement.parent.updateChildStatement(this.pasteStatement(targetStatement.parent.childStatement, targetStatement, clipboard));
            }
            else if (targetStatement instanceof If_1.default || targetStatement instanceof Case_1.default || (targetStatement instanceof ForStatement_1.default && isInner)
                || (targetStatement instanceof WhileStatement_1.default && isInner)) {
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard));
            }
        }
        return new ReturnPaste_1.default(true, mainListStatement);
    };
    OptionSelection.prototype.removeSourceStatement = function (listSourceStatement, clipboard) {
        var sourceStatementIdx = -1;
        sourceStatementIdx = listSourceStatement.indexOf(clipboard);
        if (sourceStatementIdx == -1)
            return listSourceStatement;
        listSourceStatement.splice(sourceStatementIdx, 1);
        return listSourceStatement;
    };
    OptionSelection.prototype.pasteStatement = function (listTargetStatement, targetStatement, clipboard) {
        var tempChildStatement = [];
        if (listTargetStatement != undefined)
            tempChildStatement = listTargetStatement;
        if (targetStatement)
            tempChildStatement.splice(tempChildStatement.indexOf(targetStatement) + 1, 0, clipboard);
        else
            tempChildStatement.unshift(clipboard);
        return tempChildStatement;
    };
    OptionSelection.prototype.purge = function (mainListStatement) {
        if (mainListStatement == undefined || mainListStatement.length == 0)
            return;
        var statement = mainListStatement[0];
        while (mainListStatement.length != 0) {
            this.removeSourceStatement(mainListStatement, mainListStatement[0]);
        }
    };
    return OptionSelection;
}());
exports.default = OptionSelection;
