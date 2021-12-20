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
var SwitchStatement_1 = __importDefault(require("../classes/statement/SwitchStatement"));
var Case_1 = __importDefault(require("../classes/statement/helper/case/Case"));
var WhileStatement_1 = __importDefault(require("../classes/statement/WhileStatement"));
var Option_1 = __importDefault(require("../classes/statement/helper/options/Option"));
var InputStatement_1 = __importDefault(require("../classes/statement/InputStatement"));
var OutputStatement_1 = __importDefault(require("../classes/statement/OutputStatement"));
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
        var div = $('<div></div>').addClass(className).addClass(className2).css('color', 'black').addClass('align-items-center');
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
    function createSelect(listVariable, length) {
        var className = 'col-sm-' + length;
        var className2 = 'col-xs-' + length;
        var container = $('<div></div>').addClass(className).addClass(className2);
        var select = $('<select></select>').addClass('form-select').addClass('col-sm-12').addClass('col-xs-12');
        var option;
        select.append($('<option></option>').val(null).text('Choose Variable'));
        for (var _i = 0, listVariable_1 = listVariable; _i < listVariable_1.length; _i++) {
            var variable = listVariable_1[_i];
            option = $('<option></option>').val(variable.name).text(variable.name);
            select.append(option);
        }
        container.append(select);
        return container;
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
        $('#chosenVariable').removeClass('input-error');
    }
    function initInput(title) {
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
            handleAdd(new DeclareStatement_1.default(statementCount++, 1, variable));
        }
    }
    function getVariable(listVariable, variableName) {
        for (var i = 0; i < listVariable.length; i++) {
            if (listVariable[i].name == variableName)
                return listVariable[i];
        }
        return undefined;
    }
    function cloneStatement(statement) {
        if (statement instanceof DeclareStatement_1.default) {
            alert('Could not copy declare statement!');
            return undefined;
        }
        else {
            var returnClone = void 0;
            returnClone = statement.cloneStatement(statementCount++);
            if (returnClone.result == false) {
                alert('Could not copy declare statement!');
                return undefined;
            }
            else
                return returnClone.statement;
        }
    }
    // Declare Variable
    $(document).on('click', '.addVariableDeclareBtn', function () {
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
    // Click declare variable button
    $('.declareVariable').on('click', function () {
        var isNumericValue;
        if ($(this).data('value') == 'int')
            initInput('Declare Integer');
        else if ($(this).data('value') == 'long')
            initInput('Declare Long');
        else if ($(this).data('value') == 'float')
            initInput('Declare Float');
        else if ($(this).data('value') == 'double')
            initInput('Declare Double');
        else if ($(this).data('value') == 'char')
            initInput('Declare Char');
        else if ($(this).data('value') == 'string')
            initInput('Declare String');
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
    // Click create variable button
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
        restructureStatement();
        drawCanvas();
    });
    // Click input variable button
    $(document).on('click', '.inputVariable', function () {
        var listVariable;
        if ($(this).data('value') == 'int') {
            initInput('Input Integer');
            listVariable = listInteger;
        }
        else if ($(this).data('value') == 'long') {
            initInput('Input Long');
            listVariable = listLong;
            testing2();
        }
        else if ($(this).data('value') == 'float') {
            initInput('Input Float');
            listVariable = listFloat;
            testing3();
        }
        else if ($(this).data('value') == 'double') {
            initInput('Input Double');
            listVariable = listDouble;
            testing4();
        }
        else if ($(this).data('value') == 'char') {
            initInput('Input Char');
            listVariable = listChar;
            testing5();
        }
        else if ($(this).data('value') == 'string') {
            initInput('Input String');
            listVariable = listString;
            testing6();
        }
        var container = $('<div></div>').addClass('d-flex').addClass('align-items-center');
        var select = createSelect(listVariable, 7).attr('id', 'chosenVariable');
        container.append(createHint('Variable Name', 5));
        container.append(select);
        container.addClass('mb-3');
        $('#pcInputContainer').append(container);
        var inputBtn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-2').
            addClass('col-xs-2').attr('id', 'inputVariableBtn').data('value', $(this).data('value')).text('Select');
        $('#pcInputContainerLower').append($('<div></div>').addClass('col-sm-10').addClass('col-xs-10'));
        $('#pcInputContainerLower').append(inputBtn);
    });
    // Click select input variable button
    $(document).on('click', '#inputVariableBtn', function () {
        clearError();
        if ($('#chosenVariable').find('option').filter(':selected').val() == '') {
            createErrorMessage('Please select a variable');
            $('#chosenVariable').addClass('input-error');
        }
        else {
            var variableName = $('#chosenVariable').find('option').filter(':selected').val();
            var variable = undefined;
            var statement = void 0;
            if ($('#inputVariableBtn').data('value') == 'int')
                variable = getVariable(listInteger, variableName);
            else if ($('#inputVariableBtn').data('value') == 'long')
                variable = getVariable(listLong, variableName);
            else if ($('#inputVariableBtn').data('value') == 'float')
                variable = getVariable(listFloat, variableName);
            else if ($('#inputVariableBtn').data('value') == 'double')
                variable = getVariable(listDouble, variableName);
            else if ($('#inputVariableBtn').data('value') == 'char')
                variable = getVariable(listChar, variableName);
            else
                variable = getVariable(listString, variableName);
            if (variable != undefined) {
                statement = new InputStatement_1.default(statementCount++, 1, variable);
                handleAdd(statement);
                restructureStatement();
                drawCanvas();
            }
        }
    });
    // Click template button
    $(document).on('click', '.generateTemplate', function () {
        if ($(this).data('value') == 'blank') {
            blankTemplate();
        }
        else if ($(this).data('value') == 'declare') {
            declareVariableTemplate();
        }
        else if ($(this).data('value') == 'print') {
            simplyPrintTemplate();
        }
        else if ($(this).data('value') == 'io') {
        }
        else if ($(this).data('value') == 'nestedif') {
        }
        else if ($(this).data('value') == 'nestedfor') {
        }
        else if ($(this).data('value') == 'menu') {
        }
        else if ($(this).data('value') == 'drawsquare') {
        }
        else if ($(this).data('value') == 'oddeven') {
        }
    });
    function deleteVariable(variable) {
        allVariableNames[variable.name] = false;
        if (variable instanceof Integer_1.default)
            listInteger.splice(listInteger.indexOf(variable), 1);
        else if (variable instanceof Long_1.default)
            listLong.splice(listLong.indexOf(variable), 1);
        else if (variable instanceof Float_1.default)
            listFloat.splice(listFloat.indexOf(variable), 1);
        else if (variable instanceof Double_1.default)
            listDouble.splice(listDouble.indexOf(variable), 1);
        else if (variable instanceof Char_1.default)
            listChar.splice(listChar.indexOf(variable), 1);
        else
            listString.splice(listString.indexOf(variable), 1);
    }
    // Click output
    $(document).on('click', '.output', function () {
        if ($(this).data('value') == 'variable') {
            testing3();
        }
    });
    // Canvas logic
    initializeCanvas();
    var blockCanvasInstance; // instance of Class Canvas
    var canvas;
    var option = undefined;
    // Variables to handle canvas interaction (add, mov, pst)
    var clipboard = undefined;
    var lastSelectedOption = undefined;
    var returnClick = undefined;
    // Initialize Canvas
    function initializeCanvas() {
        canvas = document.getElementById('block-code-canvas');
        resizeCanvas();
        handleCanvasClick();
        blockCanvasInstance = new Canvas_1.default(canvas, canvas.getContext('2d'), 40, 30, 5);
        setTimeout(function () {
            option = new Option_1.default('special', blockCanvasInstance.PADDING, blockCanvasInstance.PADDING, blockCanvasInstance.LINE_HEIGHT, blockCanvasInstance.LINE_HEIGHT, undefined);
            option.draw(blockCanvasInstance);
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
        option.draw(blockCanvasInstance);
        blockCanvasInstance.updateLastPosition();
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
            returnClick = option.clickOption(blockCanvasInstance, x, y);
            if (!returnClick) {
                for (var i = 0; i < listStatement.length; i++) {
                    statement = listStatement[i];
                    returnClick = statement.callClickEvent(blockCanvasInstance, x, y);
                    if (returnClick != undefined)
                        break;
                }
            }
            if (returnClick != undefined) {
                if (returnClick.isClose != undefined) {
                    finishAction();
                    return;
                }
                if (returnClick.option.optionName == 'ADD') {
                    clipboard = returnClick.statement;
                    lastSelectedOption = returnClick.option.optionName;
                }
                else if (returnClick.option.optionName == 'PST') {
                    handlePaste();
                }
                else if (returnClick.option.optionName == 'MOV') {
                    clipboard = returnClick.statement;
                    lastSelectedOption = returnClick.option.optionName;
                }
                else if (returnClick.option.optionName == 'CPY') {
                    if (returnClick.statement instanceof DeclareStatement_1.default) {
                        alert('Could not copy declare statement!');
                        finishAction();
                        restructureStatement();
                        drawCanvas();
                        return;
                    }
                    clipboard = cloneStatement(returnClick.statement);
                    lastSelectedOption = returnClick.option.optionName;
                }
                else if (returnClick.option.optionName == 'DEL') {
                    clipboard = returnClick.statement;
                    lastSelectedOption = returnClick.option.optionName;
                    handleDelete();
                }
                else if (returnClick.option.optionName == 'EDT') {
                    clipboard = returnClick.statement;
                    lastSelectedOption = returnClick.option.optionName;
                }
            }
        });
    }
    function handleAdd(statement) {
        var returnPaste;
        // Initialize
        if (lastSelectedOption == undefined && clipboard == undefined && returnClick == undefined) {
            listStatement.push(statement);
        }
        // Action taken, user chose ADD
        else if (lastSelectedOption == 'ADD' && returnClick != undefined) {
            returnPaste = returnClick.option.addStatement(listStatement, statement, clipboard, returnClick.option.optionId);
            if (returnPaste.result == true) {
                finishAction();
                listStatement = returnPaste.listStatement;
            }
            else {
                if (statement instanceof DeclareStatement_1.default)
                    deleteVariable(statement.variable);
                alert('Could not add statement here');
                finishAction();
            }
        }
    }
    function handlePaste() {
        var returnPaste;
        if (clipboard == undefined) {
            alert('Clipboard is empty!');
            return;
        }
        if (clipboard.findStatement(returnClick.statement)) {
            alert('Could not paste statement here!');
            return;
        }
        var splitted = returnClick.option.optionId.split('-');
        var isInner = splitted[splitted.length - 1] == 'inner' ? true : false;
        if (lastSelectedOption == 'MOV' || lastSelectedOption == 'CPY') {
            returnPaste = returnClick.option.handlePaste(listStatement, clipboard, returnClick.statement, isInner, lastSelectedOption);
            listStatement = returnPaste.listStatement;
            if (returnPaste.result == false) {
                alert('Could not paste statement here!');
            }
        }
        finishAction();
        restructureStatement();
        drawCanvas();
    }
    function handleDelete() {
        var returnPaste = undefined;
        returnPaste = returnClick.option.handleDelete(listStatement, clipboard);
        if (returnPaste.result == false) {
            alert('Variable is used on another statement!');
        }
        else {
            if (clipboard instanceof DeclareStatement_1.default) {
                deleteVariable(clipboard.variable);
            }
        }
        finishAction();
        restructureStatement();
        drawCanvas();
    }
    function finishAction() {
        returnClick = undefined;
        clipboard = undefined;
        lastSelectedOption = undefined;
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
    function testing4() {
        var temp = [];
        var switchStatement;
        temp.push(new Case_1.default(2, statementCount++, new Condition_1.default(new Integer_1.default('tempInt', 5), '==', new Integer_1.default('tempInt2', 10), true), undefined, false));
        temp.push(new Case_1.default(2, statementCount++, undefined, undefined, true));
        switchStatement = new SwitchStatement_1.default(1, statementCount++, new Integer_1.default('tempInt', 5), undefined);
        switchStatement.updateChildStatement(temp);
        switchStatement.writeToCanvas(blockCanvasInstance);
        listStatement.push(switchStatement);
    }
    function testing5() {
        var temp = [];
        var whileStatement;
        whileStatement = new WhileStatement_1.default(1, statementCount++, true, undefined, new Condition_1.default(new Long_1.default('testLong', '15'), '<', new Long_1.default('testLong2', '500'), false), 'OR', new Condition_1.default(new Double_1.default('testDouble', '15'), '<', new Double_1.default('testDouble2', '500'), true));
        whileStatement.writeToCanvas(blockCanvasInstance);
        listStatement.push(whileStatement);
    }
    function testing6() {
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var temp = statementCount - 1;
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
        ifStatement.updateIfOperations(ifs);
        ifStatement.writeToCanvas(blockCanvasInstance);
        listStatement.push(ifStatement);
    }
    // Create template
    function blankTemplate() {
        for (var i = 0; i < listStatement.length; i++) {
            if (listStatement[i] instanceof DeclareStatement_1.default)
                deleteVariable(listStatement[i].variable);
        }
        listStatement = [];
        finishAction();
        restructureStatement();
        drawCanvas();
    }
    function declareVariableTemplate() {
        var variableName = 'myNumber';
        var variable;
        allVariableNames[variableName] = true;
        variable = new Integer_1.default(variableName, 50);
        listInteger.push(variable);
        handleAdd(new DeclareStatement_1.default(statementCount++, 1, variable));
        finishAction();
        restructureStatement();
        drawCanvas();
    }
    function simplyPrintTemplate() {
        var outputStatement = new OutputStatement_1.default(statementCount++, 1, true, 'text');
        handleAdd(outputStatement);
        finishAction();
        restructureStatement();
        drawCanvas();
    }
});
