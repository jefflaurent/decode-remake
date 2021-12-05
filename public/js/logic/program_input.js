"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Integer_1 = __importDefault(require("../classes/variable/Integer"));
var Long_1 = __importDefault(require("../classes/variable/Long"));
var Float_1 = __importDefault(require("../classes/variable/Float"));
var Double_1 = __importDefault(require("../classes/variable/Double"));
var Char_1 = __importDefault(require("../classes/variable/Char"));
var String_1 = __importDefault(require("../classes/variable/String"));
var DeclareStatement_1 = __importDefault(require("../classes/statement/DeclareStatement"));
var IfStatement_1 = __importDefault(require("../classes/statement/IfStatement"));
var If_1 = __importDefault(require("../classes/statement/helper/ifs/If"));
var Elif_1 = __importDefault(require("../classes/statement/helper/ifs/Elif"));
var Condition_1 = __importDefault(require("../classes/statement/helper/general/Condition"));
var Canvas_1 = __importDefault(require("../classes/canvas/Canvas"));
var ForStatement_1 = __importDefault(require("../classes/statement/ForStatement"));
$(document).ready(function () {
    // Before insert variable
    var declareVariableNameList;
    var declareVariableValueList;
    var variableIndex = 0;
    // All declared variable names
    var allVariableNames = {};
    // Declared variables
    var listInteger = [];
    var listFloat = [];
    var listLong = [];
    var listDouble = [];
    var listChar = [];
    var listString = [];
    // Statement
    var statementCount = 0;
    // Declared statements
    var listStatement = [];
    // Helper Functions
    function createHint(text, length) {
        var className = "col-sm-" + length;
        var className2 = 'col-xs-' + length;
        var strong = $('<strong></strong>').text(text);
        var div = $('<div></div>').addClass(className).addClass(className2).css('color', 'black');
        div.append(strong);
        return div;
    }
    function createInputField(inputType) {
        return $('<input></input>').attr({ type: inputType }).addClass('form-control');
    }
    function createCloseBtn() {
        return $('<button></button>').addClass('btn-close').addClass('rmDeclare');
    }
    function createWhiteSpace(length) {
        return $('<div></div>').addClass('col-sm-' + length).addClass('col-xs-' + length);
    }
    function createDeclareDataVariable(isRequired, isNumber) {
        var container = $('<div></div>').addClass('col-sm-12').addClass('col-xs-12');
        var hintContainer = $('<div></div>').addClass('col-sm-12').addClass('col-xs-12').addClass('mb-2').addClass('d-flex');
        hintContainer.append(createHint('Variable Name', 5));
        hintContainer.append(createWhiteSpace(1));
        hintContainer.append(createHint('Initial Value', 5));
        var inputContainer = $('<div></div>').addClass('col-sm-12').addClass('col-xs-12').addClass('mb-4').addClass('d-flex').addClass('align-items-center');
        var variableClassName = 'var-name-' + variableIndex;
        var inputClassName = 'input-val-' + variableIndex;
        var container1 = $('<div></div>').addClass('col-sm-5').addClass('col-xs-5');
        var container2 = $('<div></div>').addClass('col-sm-5').addClass('col-xs-5');
        var container3 = $('<div></div>').addClass('col-sm-1').addClass('col-xs-1').addClass('d-flex').addClass('justify-content-center');
        container1.append(createInputField('text').addClass(variableClassName));
        if (isNumber)
            container2.append(createInputField('number').addClass(inputClassName));
        else
            container2.append(createInputField('text').addClass(inputClassName));
        container3.append(createCloseBtn().data('value', variableIndex++));
        declareVariableNameList.push(variableClassName);
        declareVariableValueList.push(inputClassName);
        inputContainer.append(container1);
        inputContainer.append(createWhiteSpace(1));
        inputContainer.append(container2);
        if (!isRequired)
            inputContainer.append(container3);
        container.append(hintContainer);
        container.append(inputContainer);
        $('#pcInputContainer').append(container);
    }
    function clearError() {
        $('#pcInputErrorContainer').empty();
        for (var _i = 0, declareVariableNameList_1 = declareVariableNameList; _i < declareVariableNameList_1.length; _i++) {
            var varName = declareVariableNameList_1[_i];
            $('.' + varName).removeClass('input-error');
        }
        for (var _a = 0, declareVariableValueList_1 = declareVariableValueList; _a < declareVariableValueList_1.length; _a++) {
            var varValue = declareVariableValueList_1[_a];
            $('.' + varValue).removeClass('input-error');
        }
    }
    function initInputDeclare(title) {
        $('#pcInputErrorContainer').empty();
        $('#pcInputContainer').empty();
        $('#pcInputContainerLower').empty();
        $('#command-name').text(title);
        declareVariableNameList = [];
        declareVariableValueList = [];
        variableIndex = 0;
    }
    function createErrorMessage(message) {
        var container = $('<div></div>').addClass('col-xs-12').addClass('col-sm-12').addClass('alert').addClass('alert-danger').text(message);
        $('#pcInputErrorContainer').append(container);
    }
    function insertToVariableList() {
        for (var i = 0; i < declareVariableNameList.length; i++) {
            var variableName = void 0;
            variableName = $('.' + declareVariableNameList[i]).val();
            var variableValue = void 0;
            variableValue = $('.' + declareVariableValueList[i]).val();
            allVariableNames[variableName] = true;
            var variable = void 0;
            if ($('#createVariableBtn').data('value') == 'int') {
                variable = new Integer_1.default(variableName, variableValue);
                listInteger.push(variable);
            }
            else if ($('#createVariableBtn').data('value') == 'long') {
                variable = new Long_1.default(variableName, variableValue);
                listLong.push(variable);
            }
            else if ($('#createVariableBtn').data('value') == 'float') {
                variable = new Float_1.default(variableName, variableValue);
                listFloat.push(variable);
            }
            else if ($('#createVariableBtn').data('value') == 'double') {
                variable = new Double_1.default(variableName, variableValue);
                listDouble.push(variable);
            }
            else if ($('#createVariableBtn').data('value') == 'char') {
                variable = new Char_1.default(variableName, variableValue);
                listChar.push(variable);
            }
            else if ($('#createVariableBtn').data('value') == 'string') {
                variable = new String_1.default(variableName, variableValue);
                listString.push(variable);
            }
            listStatement.push(new DeclareStatement_1.default(statementCount++, 1, variable));
        }
    }
    // Declare Variable
    $(document).on('click', '.addVariableDeclareBtn', function () {
        console.log($(this).data('value'));
        if ($(this).data('value') == false)
            createDeclareDataVariable(false, false);
        else
            createDeclareDataVariable(false, true);
    });
    $(document).on('click', '.rmDeclare', function () {
        var varName = 'var-name-' + $(this).data('value');
        var varVal = 'input-val-' + $(this).data('value');
        declareVariableNameList.splice(declareVariableNameList.indexOf(varName), 1);
        declareVariableValueList.splice(declareVariableValueList.indexOf(varVal), 1);
        $(this).parent().parent().parent().remove();
    });
    $(document).on('click', '#createVariableBtn', function () {
        clearError();
        var variableName;
        var variableValue;
        var tempAllVariableNames = {};
        for (var i = 0; i < declareVariableNameList.length; i++) {
            variableName = $('.' + declareVariableNameList[i]).val();
            variableValue = $('.' + declareVariableValueList[i]).val();
            var variable = void 0;
            if ($('#createVariableBtn').data('value') == 'int')
                variable = new Integer_1.default(variableName, variableValue);
            else if ($('#createVariableBtn').data('value') == 'long')
                variable = new Long_1.default(variableName, variableValue);
            else if ($('#createVariableBtn').data('value') == 'float')
                variable = new Float_1.default(variableName, variableValue);
            else if ($('#createVariableBtn').data('value') == 'double')
                variable = new Double_1.default(variableName, variableValue);
            else if ($('#createVariableBtn').data('value') == 'char')
                variable = new Char_1.default(variableName, variableValue);
            else
                variable = new String_1.default(variableName, variableValue);
            var returnName = variable.validateName();
            var returnValue = variable.validateValue();
            var tempSameVariableName = tempAllVariableNames[variableName] ? true : false;
            var sameVariableName = allVariableNames[variableName] ? true : false;
            if (tempSameVariableName) {
                $('.' + declareVariableNameList[i]).addClass('input-error');
                createErrorMessage('Variable name must be unique');
                return;
            }
            else
                tempAllVariableNames[variableName] = true;
            if (!returnName.bool) {
                $('.' + declareVariableNameList[i]).addClass('input-error');
                createErrorMessage(returnName.message);
                return;
            }
            if (sameVariableName) {
                $('.' + declareVariableNameList[i]).addClass('input-error');
                createErrorMessage('Variable name has been declared before');
                return;
            }
            if (!returnValue.bool) {
                $('.' + declareVariableValueList[i]).addClass('input-error');
                createErrorMessage(returnValue.message);
                return;
            }
        }
        // Insert every declared variable and declare statement instance to list
        insertToVariableList();
        // Push statement to canvas
        drawCanvas();
    });
    $('.declareVariable').on('click', function () {
        var isNumericValue;
        if ($(this).data('value') == 'int')
            initInputDeclare('Declare Integer');
        else if ($(this).data('value') == 'long')
            initInputDeclare('Declare Long');
        else if ($(this).data('value') == 'float')
            initInputDeclare('Declare Float');
        else if ($(this).data('value') == 'double')
            initInputDeclare('Declare Double');
        else if ($(this).data('value') == 'char')
            initInputDeclare('Declare Char');
        else if ($(this).data('value') == 'string')
            initInputDeclare('Declare String');
        if ($(this).data('value') == 'string' || $(this).data('value') == 'char') {
            createDeclareDataVariable(true, false);
            isNumericValue = false;
        }
        else {
            createDeclareDataVariable(true, true);
            isNumericValue = true;
        }
        var btn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-3').
            addClass('col-xs-3').addClass('addVariableDeclareBtn').data('value', isNumericValue).text('Add Variable');
        var createBtn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-2').
            addClass('col-xs-2').attr('id', 'createVariableBtn').data('value', $(this).data('value')).text('Create');
        $('#pcInputContainerLower').append(btn);
        $('#pcInputContainerLower').append($('<div></div>').addClass('col-sm-7').addClass('col-xs-7'));
        $('#pcInputContainerLower').append(createBtn);
    });
    // Helper Functions
    function initInputVariable() {
        $('#pcInputErrorContainer').empty();
        $('#pcInputContainer').empty();
        $('#pcInputContainerLower').empty();
        $('#command-name').text('');
        declareVariableNameList = [];
        declareVariableValueList = [];
        variableIndex = 0;
    }
    // Input to Variable
    $(document).on('click', '.inputVariable', function () {
        if ($(this).data('value') == 'int') {
            initInputDeclare('Declare Integer');
            testing();
        }
        else if ($(this).data('value') == 'long') {
            initInputDeclare('Declare Long');
            testing2();
        }
        else if ($(this).data('value') == 'float') {
            initInputDeclare('Declare Float');
            testing3();
        }
        else if ($(this).data('value') == 'double')
            initInputDeclare('Declare Double');
        else if ($(this).data('value') == 'char')
            initInputDeclare('Declare Char');
        else if ($(this).data('value') == 'string')
            initInputDeclare('Declare String');
    });
    // Canvas logic
    initializeCanvas();
    var blockCanvasInstance; // instance of Class Canvas
    var canvas;
    // Variables to handle move and copy
    var originStatement;
    var clipboard = undefined;
    var lastSelectedOption = undefined;
    // Initialize Canvas
    function initializeCanvas() {
        canvas = document.getElementById('block-code-canvas');
        resizeCanvas();
        handleCanvasClick();
        blockCanvasInstance = new Canvas_1.default(canvas, canvas.getContext('2d'), 40, 30, 5);
        setTimeout(function () {
            blockCanvasInstance.createOption(30, 30);
            blockCanvasInstance.updateLastPosition();
        }, 50);
    }
    // Resize Canvas
    function resizeCanvas() {
        var cv;
        var con = $("#block-code-container");
        cv = $("#block-code-canvas")[0];
        var aspect = cv.height / cv.width;
        var width = con.width();
        var height = con.height();
        canvas.width = width;
        // canvas.height = Math.round(width * aspect);
        canvas.height = height * 10;
    }
    function drawCanvas() {
        blockCanvasInstance.clearCanvas();
        var statement;
        for (var i = 0; i < listStatement.length; i++) {
            statement = listStatement[i];
            statement.writeToCanvas(blockCanvasInstance);
        }
    }
    // Handle Event
    function handleCanvasClick() {
        canvas.addEventListener('click', function (event) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            var statement;
            var temp = undefined;
            var returnPaste;
            for (var i = 0; i < listStatement.length; i++) {
                statement = listStatement[i];
                temp = statement.callClickEvent(blockCanvasInstance, x, y);
                if (temp != undefined)
                    break;
            }
            if (temp != undefined) {
                console.log(temp.option.optionId);
                if (temp.option.optionName == 'ARR') {
                }
                else if (temp.option.optionName == 'ADD') {
                }
                else if (temp.option.optionName == 'PST') {
                    if (clipboard == undefined) {
                        alert('Clipboard is empty!');
                    }
                    else {
                        var splitted = temp.option.optionId.split('-');
                        var isInner = splitted[splitted.length - 1] == 'inner' ? true : false;
                        if (lastSelectedOption == 'MOV') {
                            returnPaste = temp.option.pasteMove(listStatement, clipboard, temp.statement, isInner);
                            listStatement = returnPaste.listStatement;
                            if (returnPaste.result == true) {
                                clipboard = undefined;
                                lastSelectedOption = 'PST';
                                restructureStatement();
                                drawCanvas();
                            }
                        }
                    }
                }
                else if (temp.option.optionName == 'MOV' || temp.option.optionName == 'CPY') {
                    clipboard = temp.statement;
                    lastSelectedOption = temp.option.optionName;
                }
                else if (temp.option.optionName == 'DEL') {
                }
                else if (temp.option.optionName == 'EDT') {
                }
            }
        });
    }
    function restructureStatement() {
        if (listStatement == undefined)
            return;
        for (var i = 0; i < listStatement.length; i++) {
            listStatement[i].moveToSurface();
            listStatement[i].updateChildLevel();
        }
    }
    function testing() {
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var ifs = [];
        var firstIf = new If_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt', 5), '==', new Integer_1.default('testInt2', 10), true), undefined, undefined, undefined);
        var child1 = new DeclareStatement_1.default(statementCount++, firstIf.level + 1, new Integer_1.default('myInteger', 10));
        var child2 = new DeclareStatement_1.default(statementCount++, firstIf.level + 1, new Integer_1.default('mySecondInteger', 25));
        var childStatements = [];
        childStatements.push(child1);
        childStatements.push(child2);
        firstIf.updateChildStatement(childStatements);
        var secondIf = new Elif_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt3', 10), '!=', new Integer_1.default('testInt4', 200), false), undefined, undefined, undefined);
        var thirdIf = new Elif_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt4', 10), '!=', new Integer_1.default('testInt6', 200), false), undefined, undefined, undefined);
        ifs.push(firstIf);
        ifs.push(secondIf);
        ifs.push(thirdIf);
        ifStatement.updateIfOperations(ifs);
        ifStatement.writeToCanvas(blockCanvasInstance);
        listStatement.push(ifStatement);
    }
    function testing2() {
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var ifs = [];
        var firstIf = new If_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt5', 5), '==', new Integer_1.default('testInt10', 10), true), undefined, undefined, undefined);
        var child1 = new DeclareStatement_1.default(statementCount++, firstIf.level + 1, new Integer_1.default('myInteger2', 10));
        var child2 = new DeclareStatement_1.default(statementCount++, firstIf.level + 1, new Integer_1.default('mySecondInteger2', 25));
        var childStatements = [];
        childStatements.push(child1);
        childStatements.push(child2);
        firstIf.updateChildStatement(childStatements);
        var secondIf = new Elif_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt6', 10), '!=', new Integer_1.default('testInt8', 200), false), undefined, undefined, undefined);
        var thirdIf = new Elif_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt7', 10), '!=', new Integer_1.default('testInt9', 200), false), undefined, undefined, undefined);
        ifs.push(firstIf);
        // ifs.push(secondIf)
        // ifs.push(thirdIf)
        ifStatement.updateIfOperations(ifs);
        ifStatement.writeToCanvas(blockCanvasInstance);
        listStatement.push(ifStatement);
    }
    function testing3() {
        var temp = [];
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var ifs = [];
        var firstIf = new If_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt', 5), '==', new Integer_1.default('testInt2', 10), true), undefined, undefined, undefined);
        var child1 = new DeclareStatement_1.default(statementCount++, firstIf.level + 1, new Integer_1.default('myInteger', 10));
        var child2 = new DeclareStatement_1.default(statementCount++, firstIf.level + 1, new Integer_1.default('mySecondInteger', 25));
        var childStatements = [];
        childStatements.push(child1);
        childStatements.push(child2);
        firstIf.updateChildStatement(childStatements);
        var secondIf = new Elif_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt3', 10), '!=', new Integer_1.default('testInt4', 200), false), undefined, undefined, undefined);
        var thirdIf = new Elif_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt4', 10), '!=', new Integer_1.default('testInt6', 200), false), undefined, undefined, undefined);
        ifs.push(firstIf);
        ifs.push(secondIf);
        ifs.push(thirdIf);
        ifStatement.updateIfOperations(ifs);
        temp.push(ifStatement);
        var forStatement = new ForStatement_1.default(1, statementCount++, undefined, new Integer_1.default('testInt', 5), true, true, 1, new Condition_1.default(new Integer_1.default('testInt', 5), '<', new Integer_1.default('testInt2', 10), true));
        forStatement.updateChildStatement(temp);
        forStatement.updateChildLevel();
        forStatement.writeToCanvas(blockCanvasInstance);
        listStatement.push(forStatement);
    }
});
