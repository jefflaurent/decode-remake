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
var Else_1 = __importDefault(require("../classes/statement/helper/ifs/Else"));
var ForStatement_1 = __importDefault(require("../classes/statement/ForStatement"));
var SwitchStatement_1 = __importDefault(require("../classes/statement/SwitchStatement"));
var Case_1 = __importDefault(require("../classes/statement/helper/case/Case"));
var WhileStatement_1 = __importDefault(require("../classes/statement/WhileStatement"));
var Option_1 = __importDefault(require("../classes/statement/helper/options/Option"));
var InputStatement_1 = __importDefault(require("../classes/statement/InputStatement"));
var OutputStatement_1 = __importDefault(require("../classes/statement/OutputStatement"));
var AssignmentStatement_1 = __importDefault(require("../classes/statement/AssignmentStatement"));
var Arithmetic_1 = __importDefault(require("../classes/statement/helper/assignment/Arithmetic"));
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
        var className2 = 'col-' + length;
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
        return $('<div></div>').addClass('col-sm-' + length).addClass('col-' + length);
    }
    function createDeclareDataVariable(isRequired, isNumber) {
        var container = $('<div></div>').addClass('col-sm-12').addClass('col-12');
        var hintContainer = $('<div></div>').addClass('col-sm-12').addClass('col-12').addClass('mb-2').addClass('d-flex');
        hintContainer.append(createHint('Variable Name', 5));
        hintContainer.append(createWhiteSpace(1));
        hintContainer.append(createHint('Initial Value', 5));
        var inputContainer = $('<div></div>').addClass('col-sm-12').addClass('col-12').addClass('mb-4').addClass('d-flex').addClass('align-items-center');
        var variableClassName = 'var-name-' + variableIndex;
        var inputClassName = 'input-val-' + variableIndex;
        var container1 = $('<div></div>').addClass('col-sm-5').addClass('col-5');
        var container2 = $('<div></div>').addClass('col-sm-5').addClass('col-5');
        var container3 = $('<div></div>').addClass('col-sm-1').addClass('col-1').addClass('d-flex').addClass('justify-content-center');
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
    function createSelect(listVariable, length, isAllVariable) {
        var className = 'col-sm-' + length;
        var className2 = 'col-' + length;
        var container = $('<div></div>').addClass(className).addClass(className2);
        var select = $('<select></select>').addClass('form-select').addClass('col-sm-12').addClass('col-12');
        var option;
        select.append($('<option></option>').val(null).text('Choose Variable'));
        for (var _i = 0, listVariable_1 = listVariable; _i < listVariable_1.length; _i++) {
            var variable = listVariable_1[_i];
            if (!isAllVariable)
                option = $('<option></option>').val(variable.name).text(variable.name);
            else {
                var dataType = void 0;
                if (variable instanceof Integer_1.default)
                    dataType = 'Integer';
                else if (variable instanceof Long_1.default)
                    dataType = 'Long';
                else if (variable instanceof Float_1.default)
                    dataType = 'Float';
                else if (variable instanceof Double_1.default)
                    dataType = 'Double';
                else if (variable instanceof Char_1.default)
                    dataType = 'Char';
                else
                    dataType = 'String';
                option = $('<option></option>').val(variable.name).text(variable.name + ' (' + dataType + ')');
            }
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
        for (var i = 0; i < caseToBeValidated.length; i++)
            $('.' + caseToBeValidated[i]).removeClass('input-error');
        $('#chosenVariable').removeClass('input-error');
        $('#chosenOutputVariable').removeClass('input-error');
        $('#chosenSwitchVariable').removeClass('input-error');
        $('#chosen-for-loop-variable').removeClass('input-error');
        $('#chosen-for-loop-value').removeClass('input-error');
        $('#update-value-for-loop').removeClass('input-error');
        $('#chosen-asg-variable').removeClass('input-error');
        for (var i = 0; i < ifToBeValidated.length; i++) {
            $('#first-if-select-first-variable-' + ifToBeValidated[i]).removeClass('input-error');
            $('#first-if-input-second-variable-' + ifToBeValidated[i]).removeClass('input-error');
            $('#first-if-select-second-variable-' + ifToBeValidated[i]).removeClass('input-error');
            $('#second-if-select-first-variable-' + ifToBeValidated[i]).removeClass('input-error');
            $('#second-if-input-second-variable-' + ifToBeValidated[i]).removeClass('input-error');
            $('#second-if-select-second-variable-' + ifToBeValidated[i]).removeClass('input-error');
        }
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
    function createErrorMessage(message, targetClass) {
        var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-danger').text(message);
        targetClass = '#' + targetClass;
        $(targetClass).append(container);
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
            createErrorMessage('Could not copy declare statement!', 'bcErrorContainer');
            return undefined;
        }
        else {
            var returnClone = void 0;
            returnClone = statement.cloneStatement(statementCount++);
            if (returnClone.result == false) {
                createErrorMessage('Could not copy declare statement!', 'bcErrorContainer');
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
            addClass('col-3').addClass('addVariableDeclareBtn').data('value', isNumericValue).text('Add Variable');
        var createBtn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-2').
            addClass('col-2').attr('id', 'createVariableBtn').data('value', $(this).data('value')).text('Create');
        $('#pcInputContainerLower').append(btn);
        $('#pcInputContainerLower').append($('<div></div>').addClass('col-sm-7').addClass('col-7'));
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
                createErrorMessage('Variable name must be unique', 'pcInputErrorContainer');
                return;
            }
            else
                tempAllVariableNames[variableName] = true;
            if (!returnName.bool) {
                $('.' + declareVariableNameList[i]).addClass('input-error');
                createErrorMessage(returnName.message, 'pcInputErrorContainer');
                return;
            }
            if (sameVariableName) {
                $('.' + declareVariableNameList[i]).addClass('input-error');
                createErrorMessage('Variable name has been declared before', 'pcInputErrorContainer');
                return;
            }
            if (!returnValue.bool) {
                $('.' + declareVariableValueList[i]).addClass('input-error');
                createErrorMessage(returnValue.message, 'pcInputErrorContainer');
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
        }
        else if ($(this).data('value') == 'float') {
            initInput('Input Float');
            listVariable = listFloat;
        }
        else if ($(this).data('value') == 'double') {
            initInput('Input Double');
            listVariable = listDouble;
        }
        else if ($(this).data('value') == 'char') {
            initInput('Input Char');
            listVariable = listChar;
        }
        else if ($(this).data('value') == 'string') {
            initInput('Input String');
            listVariable = listString;
        }
        var container = $('<div></div>').addClass('d-flex').addClass('align-items-center');
        var select = createSelect(listVariable, 7).attr('id', 'chosenVariable');
        container.append(createHint('Variable Name', 5));
        container.append(select);
        container.addClass('mb-3');
        $('#pcInputContainer').append(container);
        var inputBtn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-2').
            addClass('col-2').attr('id', 'inputVariableBtn').data('value', $(this).data('value')).text('Select');
        $('#pcInputContainerLower').append($('<div></div>').addClass('col-sm-10').addClass('col-10'));
        $('#pcInputContainerLower').append(inputBtn);
    });
    // Click select input variable button
    $(document).on('click', '#inputVariableBtn', function () {
        clearError();
        if ($('#chosenVariable').find('option').filter(':selected').val() == '') {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
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
        if ($(this).data('value') == 'blank')
            blankTemplate();
        else if ($(this).data('value') == 'declare')
            declareVariableTemplate();
        else if ($(this).data('value') == 'print')
            simplyPrintTemplate();
        else if ($(this).data('value') == 'io')
            inputOutputTemplate();
        else if ($(this).data('value') == 'nestedif')
            nestedIfTemplate();
        else if ($(this).data('value') == 'nestedfor')
            nestedForTemplate();
        else if ($(this).data('value') == 'menu')
            menuTemplate();
        else if ($(this).data('value') == 'drawsquare')
            drawSquareTemplate();
        else if ($(this).data('value') == 'oddeven')
            oddEvenTemplate();
        finishAction();
        restructureStatement();
        drawCanvas();
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
    function findVariable(variableName) {
        var tempList = getAllVariables();
        for (var i = 0; i < tempList.length; i++)
            if (tempList[i].name == variableName)
                return tempList[i];
        return undefined;
    }
    // Click output
    $(document).on('click', '.output', function () {
        if ($(this).data('value') == 'variable') {
            initInput('Output Variable');
            var listVariable = getAllVariables();
            var container = $('<div></div>').addClass('d-flex').addClass('align-items-center');
            var select = createSelect(listVariable, 7, true).attr('id', 'chosenOutputVariable');
            container.append(createHint('Variable Name', 5));
            container.append(select);
            container.addClass('mb-3');
            $('#pcInputContainer').append(container);
            var inputBtn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-2').
                addClass('col-2').attr('id', 'outputVariableBtn').data('value', $(this).data('value')).text('Select');
            $('#pcInputContainerLower').append($('<div></div>').addClass('col-sm-10').addClass('col-10'));
            $('#pcInputContainerLower').append(inputBtn);
        }
        else {
            initInput('Output Text');
            createOutputTextSelection();
        }
    });
    function createOutputTextSelection() {
        var row = $('<div></div>').addClass('row');
        var leftSide = $('<div></div>').addClass('col-sm-4').addClass('col-4').addClass('mb-2');
        var rightSide = $('<div></div>').addClass('col-sm-8').addClass('col-8');
        var listGroup = $('<div></div>').addClass('list-group').attr('id', 'list-tab').attr('role', 'tablist');
        var listGroupItem1 = $('<a></a>').addClass('list-group-item').addClass('list-group-item-action').addClass('active').attr('id', 'list-home-list').attr('data-bs-toggle', 'list').attr('href', '#list-home').text('Text');
        var listGroupItem2 = $('<a></a>').addClass('list-group-item').addClass('list-group-item-action').attr('id', 'list-profile-list').attr('data-bs-toggle', 'list').attr('href', '#list-profile').text('ASCII Code');
        var listGroupItem3 = $('<a></a>').addClass('list-group-item').addClass('list-group-item-action').attr('id', 'list-messages-list').attr('data-bs-toggle', 'list').attr('href', '#list-messages').text('Escape Sequence');
        listGroup.append(listGroupItem1);
        listGroup.append(listGroupItem2);
        listGroup.append(listGroupItem3);
        leftSide.append(listGroup);
        var tabContent = $('<div></div>').addClass('tab-content').attr('id', 'nav-tabContent');
        var tabPane1 = $('<div></div>').addClass('tab-pane fade show active').attr('id', 'list-home').attr('role', 'tabpanel');
        var tabPane2 = $('<div></div>').addClass('tab-pane fade').attr('id', 'list-profile').attr('role', 'tabpanel');
        var tabPane3 = $('<div></div>').addClass('tab-pane fade').attr('id', 'list-messages').attr('role', 'tabpanel');
        var desc1 = $('<strong></strong>').text('Input Text');
        var desc2 = $('<strong></strong>').text('ASCII Code');
        var desc3 = $('<strong></strong>').text('Escape Sequence');
        var inputText = $('<input>').attr('type', 'text').addClass('form-control').addClass('mt-2').attr('id', 'output-text-box');
        var selectEscape = $('<select></select>').addClass('form-select').addClass('mt-2').attr('id', 'select-escape-seq');
        selectEscape.append($('<option></option>').val('a').text('\\a'));
        selectEscape.append($('<option></option>').val('b').text('\\b'));
        selectEscape.append($('<option></option>').val('f').text('\\f'));
        selectEscape.append($('<option></option>').val('n').text('\\n'));
        selectEscape.append($('<option></option>').val('r').text('\\r'));
        selectEscape.append($('<option></option>').val('t').text('\\t'));
        selectEscape.append($('<option></option>').val('v').text('\\v'));
        selectEscape.append($('<option></option>').val('bs').text("\\\\"));
        selectEscape.append($('<option></option>').val("tick").text("\\'"));
        selectEscape.append($('<option></option>').val("dtick").text("\\\""));
        selectEscape.append($('<option></option>').val("qmark").text("\\?"));
        var selectAscii = $('<select></select>').addClass('form-select').addClass('mt-2').attr('id', 'select-ascii-code');
        for (var i = 0; i <= 255; i++)
            selectAscii.append($('<option></option>').val(i).text(i));
        var container1 = $('<div></div>').addClass('col-sm-12').addClass('col-12').addClass('d-flex');
        var container2 = $('<div></div>').addClass('col-sm-12').addClass('col-12').addClass('d-flex');
        var container3 = $('<div></div>').addClass('col-sm-12').addClass('col-12').addClass('d-flex');
        var leftContainer1 = $('<div></div>').addClass('col-sm-8').addClass('col-8').addClass('d-flex').addClass('align-items-center');
        var placeholder1 = $('<div></div>');
        var cb1 = $('<input>').attr('type', 'checkbox').addClass('form-check-input').attr('id', 'new-line-text');
        var lbl1 = $('<label></label>').addClass('form-check-label').addClass('ms-2').attr('for', 'new-line-text').text('Add new line');
        var leftContainer2 = $('<div></div>').addClass('col-sm-8').addClass('col-8').addClass('d-flex').addClass('align-items-center');
        var placeholder2 = $('<div></div>');
        var cb2 = $('<input>').attr('type', 'checkbox').addClass('form-check-input').attr('id', 'new-line-ascii');
        var lbl2 = $('<label></label>').addClass('form-check-label').addClass('ms-2').attr('for', 'new-line-ascii').text('Add new line');
        var innerContainer1 = $('<div></div>').addClass('col-sm-4').addClass('col-4').addClass('d-flex').addClass('justify-content-end');
        var innerContainer2 = $('<div></div>').addClass('col-sm-4').addClass('col-4').addClass('d-flex').addClass('justify-content-end');
        var innerContainer3 = $('<div></div>').addClass('col-sm-4').addClass('col-4').addClass('d-flex').addClass('justify-content-end');
        var btn1 = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('mt-2').text('Create').attr('id', 'btn-submit-output').data('value', 'text');
        var btn2 = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('mt-2').text('Create').attr('id', 'btn-submit-output').data('value', 'ascii');
        var btn3 = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('mt-2').text('Create').attr('id', 'btn-submit-output').data('value', 'escape');
        innerContainer1.append(btn1);
        placeholder1.append(cb1);
        placeholder1.append(lbl1);
        leftContainer1.append(placeholder1);
        container1.append(leftContainer1);
        container1.append(innerContainer1);
        tabPane1.append(desc1);
        tabPane1.append(inputText);
        tabPane1.append(container1);
        innerContainer2.append(btn2);
        placeholder2.append(cb2);
        placeholder2.append(lbl2);
        leftContainer2.append(placeholder2);
        container2.append(leftContainer2);
        container2.append(innerContainer2);
        tabPane2.append(desc2);
        tabPane2.append(selectAscii);
        tabPane2.append(container2);
        innerContainer3.append(btn3);
        container3.append($('<div></div>').addClass('col-sm-8').addClass('col-8'));
        container3.append(innerContainer3);
        tabPane3.append(desc3);
        tabPane3.append(selectEscape);
        tabPane3.append(container3);
        tabContent.append(tabPane1);
        tabContent.append(tabPane2);
        tabContent.append(tabPane3);
        rightSide.append(tabContent);
        row.append(leftSide);
        row.append(rightSide);
        $('#pcInputContainer').append(row);
    }
    var ifCount = 1;
    var ifToBeValidated = [];
    var isElsed = false;
    $(document).on('click', '.selection', function () {
        if ($(this).data('value') == 'if-else') {
            initInput('Selection Properties');
            createIfSelection();
        }
        else {
            initInput('Switch Properties');
            createSwitchSelection();
        }
    });
    function createGreenButton(text) {
        var container = $('<div></div>').addClass('btn d-flex align-items-center justify-content-center bg-success p-2 text-white bg-opacity-75 p-2 mt-2');
        var icon = $('<i></i>').addClass('fas fa-plus me-2');
        var word = $('<div></div>').text(text);
        container.append(icon);
        container.append(word);
        return container;
    }
    function createSwitchSelection() {
        var listVariable = [];
        listVariable = getSelectedVariables('switch');
        var container = $('<div></div>').addClass('d-flex').addClass('align-items-center');
        var select = createSelect(listVariable, 7, true).attr('id', 'chosenSwitchVariable');
        container.append(createHint('Variable', 5));
        container.append(select);
        container.addClass('mb-3');
        var allCaseContainer = $('<div></div>').addClass('all-case-container');
        $('#pcInputContainer').append(container);
        $('#pcInputContainer').append(allCaseContainer);
        createAdditionalSwitchButton();
    }
    var caseToBeValidated = [];
    var caseCount = 1;
    var isDefaulted = false;
    $(document).on('click', '#createSwitchCaseBtn', function () {
        clearError();
        var variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val();
        if (variableName == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
        }
        else {
            var variable = findVariable(variableName);
            createCaseStatement(variable);
        }
    });
    function createCaseStatement(variable) {
        var value = '';
        var tempVariable = undefined;
        var proceed = true;
        var caseStatement = [];
        var result;
        var className = '';
        for (var i = 0; i < caseToBeValidated.length; i++) {
            className = '.' + caseToBeValidated[i];
            value = $(className).val();
            console.log(className);
            console.log(value);
            if (value == undefined) {
                $(className).addClass('input-error');
                createErrorMessage('Field cannot be empty!', 'pcInputErrorContainer');
                proceed = false;
                break;
            }
            tempVariable = createVariableFromValue(value);
            if (tempVariable instanceof String_1.default) {
                $(className).addClass('input-error');
                createErrorMessage('Could not compare with String data type', 'pcInputErrorContainer');
                proceed = false;
                break;
            }
            result = tempVariable.validateValue();
            if (!result.bool) {
                $(className).addClass('input-error');
                createErrorMessage(result.message, 'pcInputErrorContainer');
                proceed = false;
                break;
            }
            caseStatement.push(new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', tempVariable, true), undefined, false));
        }
        if (proceed) {
            if (isDefaulted) {
                caseStatement.push(new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', variable, true), undefined, true));
            }
            var switchStatement = new SwitchStatement_1.default(1, statementCount++, variable, undefined);
            switchStatement.updateCaseStatement(caseStatement);
            handleAdd(switchStatement);
            drawCanvas();
        }
    }
    $(document).on('change', '#chosenSwitchVariable', function () {
        clearError();
        $('.all-case-container').empty();
        caseToBeValidated = [];
        isDefaulted = false;
        caseCount = 1;
        var variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val();
        if (variableName != '') {
            var variable = findVariable(variableName);
            createCaseStatementInput(true, false, variable);
        }
    });
    $(document).on('click', '.add-additional-case-btn', function () {
        clearError();
        if (!isDefaulted) {
            var variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val();
            if (variableName == '') {
                $('#chosenSwitchVariable').addClass('input-error');
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            }
            else {
                var variable = findVariable(variableName);
                createCaseStatementInput(false, false, variable);
            }
        }
        else {
            createErrorMessage('Could not add Case after Default', 'pcInputErrorContainer');
        }
    });
    $(document).on('click', '.add-default-btn', function () {
        clearError();
        if (!isDefaulted) {
            var variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val();
            if (variableName == '') {
                $('#chosenSwitchVariable').addClass('input-error');
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            }
            else {
                var variable = findVariable(variableName);
                createCaseStatementInput(false, true, variable);
                isDefaulted = true;
            }
        }
        else {
            createErrorMessage('Could not add more Default', 'pcInputErrorContainer');
        }
    });
    $(document).on('click', '.rmCase', function () {
        clearError();
        var targetId = $(this).data('value');
        var targetClass = '.additional-case-container-' + targetId;
        var idx = caseToBeValidated.indexOf('case-input-' + targetId);
        caseToBeValidated.splice(idx, 1);
        if ($(targetClass).find('div').find('strong').text() == 'Default:')
            isDefaulted = false;
        $(targetClass).remove();
    });
    function createCaseStatementInput(isRequired, isDefault, variable) {
        var className = 'additional-case-container-' + caseCount;
        var inputClassName = 'case-input-' + caseCount;
        var container = $('<div></div>').addClass('col-sm-12 col-12 mb-2 d-flex justify-content-center align-items-center ' + className);
        var startContainer = $('<div></div>').addClass('col-sm-2 col-2 d-flex justify-content-end');
        var leftContainer = $('<div></div>').addClass('col-sm-4 col-4 d-flex justify-content-center').text(variable.name);
        var mid = $('<div></div>').addClass('col-sm-1 col-1 d-flex align-items-center').text('==');
        var rightContainer = $('<div></div>').addClass('col-sm-3 col-3');
        var textField = $('<input>').attr('type', 'text').addClass('form-control ' + inputClassName);
        var endContainer = $('<div></div>').addClass('col-sm-1 col-1 d-flex justify-content-center');
        var buttonClose = $('<button></button>').addClass('btn-close rmCase').data('value', caseCount++);
        if (!isDefault) {
            startContainer.append($('<strong></strong>').text('Case:'));
            caseToBeValidated.push(inputClassName);
        }
        else {
            startContainer.append($('<strong></strong>').text('Default:'));
            textField.attr('disabled', 'true');
        }
        if (!isRequired)
            endContainer.append(buttonClose);
        rightContainer.append(textField);
        container.append(startContainer);
        container.append(leftContainer);
        container.append(mid);
        container.append(rightContainer);
        container.append(endContainer);
        $('.all-case-container').append(container);
    }
    function createAdditionalSwitchButton() {
        var addCaseBtn = createGreenButton('Case').addClass('col-sm-3 col-3 add-additional-case-btn');
        var addDefault = createGreenButton('Default').addClass('col-sm-3 col-3 add-default-btn');
        var inputBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2')
            .attr('id', 'createSwitchCaseBtn').text('Create');
        var upperContainer = $('<div></div>').addClass('col-sm-12 col-12');
        upperContainer.append(addCaseBtn);
        upperContainer.append($('<div></div>').addClass('col-sm-9 col-9'));
        var lowerContainer = $('<div></div>').addClass('col-sm-12 col-12 d-flex justify-content-center');
        lowerContainer.append(addDefault);
        lowerContainer.append($('<div></div>').addClass('col-sm-7 col-7'));
        lowerContainer.append(inputBtn);
        var bothContainer = $('<div></div>').addClass('col-sm-12 col-12 d-flex flex-column');
        bothContainer.append(upperContainer);
        bothContainer.append(lowerContainer);
        $('#pcInputContainerLower').append(bothContainer);
    }
    function createIfSelection() {
        var row = $('<div></div>').addClass('row');
        var leftSide = $('<div></div>').addClass('col-sm-4 col-4 mb-2');
        var rightSide = $('<div></div>').addClass('col-sm-8 col-8 if-properties-container-' + ifCount);
        var listGroup = $('<div></div>').addClass('list-group').attr('id', 'list-tab-if').attr('role', 'tablist');
        var listGroupItem1 = $('<a></a>').addClass('list-group-item').addClass('list-group-item-action').addClass('active').attr('id', 'list-if-1').attr('data-bs-toggle', 'list').attr('href', '#list-1').text('If');
        var addElseIfBtn = createGreenButton('Else If').addClass('additional-if').data('value', 'elif');
        var addElseBtn = createGreenButton('Else').addClass('additional-if').data('value', 'else');
        var tab = $('<div></div>').addClass('tab-content').attr('id', 'nav-tabContentIf');
        var tabContent = createNewIfTab();
        listGroup.append(listGroupItem1);
        leftSide.append(listGroup);
        leftSide.append(addElseIfBtn);
        leftSide.append(addElseBtn);
        tabContent.append(createIfPropertiesInput(true));
        tab.append(tabContent);
        rightSide.append(tab);
        var createBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'createIfStatementButton').text('Create');
        var container = $('<div></div>').addClass('d-flex justify-content-end p-2 col-sm-12 col-12');
        container.append($('<div></div>').addClass('col-sm-10 col-10'));
        container.append(createBtn);
        row.append(leftSide);
        row.append(rightSide);
        $('#pcInputContainer').append(row);
        $('#pcInputContainerLower').append(container);
        ifToBeValidated.push(ifCount);
        ifCount++;
    }
    function createNewIfTab() {
        var id = 'list-' + ifCount;
        var tabPane = $('<div></div>').addClass('tab-pane fade show').attr('id', id).attr('role', 'tabpanel');
        if (ifCount == 1)
            tabPane.addClass('active');
        return tabPane;
    }
    $(document).on('click', '.additional-if', function () {
        clearError();
        if ($(this).data('value') == 'elif') {
            if (!isElsed) {
                ifToBeValidated.push(ifCount);
                $('#list-tab-if').append(createNewTab('Else If').data('value', 'elif'));
                var ifInputProperties = createIfPropertiesInput(true);
                var tabContent = createNewIfTab();
                tabContent.append(ifInputProperties);
                $('#nav-tabContentIf').append(tabContent);
                ifCount++;
            }
            else
                createErrorMessage('Could not add else if after else!', 'pcInputErrorContainer');
        }
        else {
            if (!isElsed) {
                $('#list-tab-if').append(createNewTab('Else').data('value', 'else'));
                isElsed = true;
            }
            else
                createErrorMessage('Could not add else after else!', 'pcInputErrorContainer');
        }
    });
    function createNewTab(text) {
        var a = $('<a></a>').addClass('list-group-item list-group-item-action d-flex justify-content-between align-items-center').attr('data-bs-toggle', 'list').attr('id', 'list-if-' + ifCount).attr('href', '#list-' + ifCount);
        var word = $('<div></div>').text(text);
        var i = $('<i></i>').addClass('fas fa-trash delete-if-stmnt').css('color', 'red').data('value', ifCount);
        a.append(word);
        a.append(i);
        return a;
    }
    $(document).on('click', '.delete-if-stmnt', function () {
        var targetId = $(this).data('value');
        if ($('#list-if-' + targetId).data('value') == 'else')
            isElsed = false;
        $('#list-' + targetId).remove();
        $('#list-if-' + targetId).remove();
        if ($('#list-1').hasClass('active') == true) {
            $("#list-tab-if a[href=\"#list-1\"]").tab('show');
        }
        var targetIdx = ifToBeValidated.indexOf(targetId);
        ifToBeValidated.splice(targetIdx, 1);
    });
    $(document).on('click', '.delete-additional-condition', function () {
        var targetId = $(this).data('value');
        $('#first-if-input-box-' + targetId).append(createGreenButton('Condition').addClass('p-2 px-3 mt-2 mb-2 add-if-condition-btn').data('value', targetId));
        $('#second-if-input-box-' + targetId).remove();
    });
    $(document).on('click', '#createIfStatementButton', function () {
        clearError();
        var ifStatements = [];
        var tempStatement = undefined;
        var proceed = true;
        for (var i = 0; i < ifToBeValidated.length; i++) {
            tempStatement = handleIfStatementValidation(ifToBeValidated[i]);
            if (tempStatement != undefined) {
                ifStatements.push(tempStatement);
                tempStatement = undefined;
            }
            else {
                proceed = false;
                break;
            }
        }
        if (proceed == true) {
            var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
            if (isElsed)
                ifStatements.push(new Else_1.default(1, statementCount));
            ifStatement.updateIfOperations(ifStatements);
            handleAdd(ifStatement);
            drawCanvas();
        }
    });
    function handleIfStatementValidation(index) {
        var logicalOperatorClassName = 'lo-if-' + index;
        var isAdditionalCondition = $("input[type='radio'][name='" + logicalOperatorClassName + "']:checked").val() == undefined ? false : true;
        var operators = ['==', '!=', '<', '>', '<=', '>='];
        var logicalOperators = ['AND', 'OR'];
        var firstVariableId1 = '#first-if-select-first-variable-' + index;
        var firstOperatorClassName = 'op-first-' + index;
        var isFirstVariable = $('#first-if-input-second-variable-' + index).val() == undefined ? true : false;
        var secondVariableId1;
        if (isFirstVariable)
            secondVariableId1 = '#first-if-select-second-variable-' + index;
        else
            secondVariableId1 = '#first-if-input-second-variable-' + index;
        var firstTemp = validateIfStatementInput(firstVariableId1, secondVariableId1, isFirstVariable);
        if (firstTemp == undefined)
            return undefined;
        var firstRadio = $("input[type='radio'][name='" + firstOperatorClassName + "']");
        var firstCheckedIdx = -1;
        for (var i = 0; i < firstRadio.length; i++) {
            if (firstRadio[i].checked == true) {
                firstCheckedIdx = i;
                break;
            }
        }
        if (!isAdditionalCondition) {
            if (index == 1)
                return new If_1.default(1, statementCount++, new Condition_1.default(firstTemp[0], operators[firstCheckedIdx], firstTemp[1], !isFirstVariable));
            else
                return new Elif_1.default(1, statementCount++, new Condition_1.default(firstTemp[0], operators[firstCheckedIdx], firstTemp[1], !isFirstVariable));
        }
        var firstVariableId2 = '#second-if-select-first-variable-' + index;
        var secondOperatorClassName = 'op-second-' + index;
        var isSecondVariable = $('#second-if-input-second-variable-' + index).val() == undefined ? true : false;
        var secondVariableId2;
        if (isSecondVariable)
            secondVariableId2 = '#second-if-select-second-variable-' + index;
        else
            secondVariableId2 = '#second-if-input-second-variable-' + index;
        var secondTemp = validateIfStatementInput(firstVariableId2, secondVariableId2, isSecondVariable);
        if (secondTemp == undefined)
            return undefined;
        var logicalRadio = $("input[type='radio'][name='" + logicalOperatorClassName + "']");
        var logicalCheckedIdx = -1;
        for (var i = 0; i < logicalRadio.length; i++) {
            if (logicalRadio[i].checked == true) {
                logicalCheckedIdx = i;
                break;
            }
        }
        var secondRadio = $("input[type='radio'][name='" + secondOperatorClassName + "']");
        var secondCheckedIdx = -1;
        for (var i = 0; i < secondRadio.length; i++) {
            if (secondRadio[i].checked == true) {
                secondCheckedIdx = i;
                break;
            }
        }
        if (index == 1)
            return new If_1.default(1, statementCount++, new Condition_1.default(firstTemp[0], operators[firstCheckedIdx], firstTemp[1], !isFirstVariable), logicalOperators[logicalCheckedIdx], new Condition_1.default(secondTemp[0], operators[secondCheckedIdx], secondTemp[1], !isSecondVariable));
        else
            return new Elif_1.default(1, statementCount++, new Condition_1.default(firstTemp[0], operators[firstCheckedIdx], firstTemp[1], !isFirstVariable), logicalOperators[logicalCheckedIdx], new Condition_1.default(secondTemp[0], operators[secondCheckedIdx], secondTemp[1], !isSecondVariable));
    }
    function validateIfStatementInput(firstValue, secondValue, isVariable) {
        var firstVariable = findVariable($(firstValue).find('option').filter(':selected').val());
        var secondVariable = undefined;
        var listVariable = [];
        if (firstVariable == undefined) {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $(firstValue).addClass('input-error');
            return undefined;
        }
        if (isVariable) {
            secondVariable = findVariable($(secondValue).find('option').filter(':selected').val());
            if (secondVariable == undefined) {
                createErrorMessage('Please select a variable', 'pcInputErrorContainer');
                $(secondValue).addClass('input-error');
                return undefined;
            }
        }
        else {
            secondVariable = createVariableFromValue($(secondValue).val());
            var res = void 0;
            res = secondVariable.validateValue();
            if (!res.bool) {
                createErrorMessage(res.message, 'pcInputErrorContainer');
                $(secondValue).addClass('input-error');
                return undefined;
            }
        }
        if ((firstVariable instanceof String_1.default && !(secondVariable instanceof String_1.default))
            || (secondVariable instanceof String_1.default && !(firstVariable instanceof String_1.default))) {
            if (firstVariable instanceof String_1.default)
                $(firstValue).addClass('input-error');
            else
                $(secondValue).addClass('input-error');
            createErrorMessage('Could not compare other data type with String', 'pcInputErrorContainer');
            return undefined;
        }
        listVariable.push(firstVariable);
        listVariable.push(secondVariable);
        return listVariable;
    }
    function createVariableFromValue(value) {
        var isNumeric = $.isNumeric(value);
        if (isNumeric) {
            if (value.includes('.'))
                return new Double_1.default('placeholder', value);
            else
                return new Long_1.default('placeholder', value);
        }
        else {
            if (value.length == 1)
                return new Char_1.default('placeholder', value);
            else
                return new String_1.default('placeholder', value);
        }
    }
    function createIfPropertiesInput(isRequired, customIfCount) {
        var boxId = isRequired ? 'first-if-input-box-' + ifCount : 'second-if-input-box-' + customIfCount;
        var dataValue = isRequired ? ifCount : customIfCount;
        var divContainer;
        if (isRequired)
            divContainer = $('<div></div>').addClass('p-2').attr('id', boxId);
        else
            divContainer = $('<div></div>').addClass('p-2 border border-1 rounded bg-light').attr('id', boxId);
        var heading1 = $('<strong></strong>').text('Variable');
        var listVariable = getAllVariables();
        var firstSelectId = isRequired ? 'first-if-select-first-variable-' + ifCount : 'second-if-select-first-variable-' + customIfCount;
        var firstSelect = createSelect(listVariable, 12, true).addClass('mb-2').attr('id', firstSelectId);
        var heading2 = $('<strong></strong>').text('Operator');
        var firstRadioSelection = createOperatorRadioSelection(isRequired, dataValue);
        var heading3 = $('<strong></strong>').text('Value Type');
        var valueTypeSelectClassName = isRequired ? 'first-value-type-select' : 'second-value-type-select';
        var valueTypeSelect = $('<select></select>').addClass('form-select mb-2').addClass(valueTypeSelectClassName).data('value', dataValue);
        valueTypeSelect.append($('<option></option>').val('variable').text('Variable'));
        valueTypeSelect.append($('<option></option>').val('custom').text('Custom Value'));
        var heading4 = $('<strong></strong>').text('Value');
        var secondSelectContainerClassName = isRequired ? 'first-second-value-container-' + ifCount : 'second-second-value-container-' + customIfCount;
        var secondSelectContainer = $('<div></div>').addClass(secondSelectContainerClassName);
        var secondSelectId = isRequired ? 'first-if-select-second-variable-' + ifCount : 'second-if-select-second-variable-' + ifCount;
        var secondSelect = createSelect(listVariable, 12, true).addClass('mb-2').attr('id', secondSelectId);
        secondSelectContainer.append(secondSelect);
        if (!isRequired) {
            divContainer.append(createLogicalOperatorHeader(dataValue));
            divContainer.append(createLogicalOperatorSelection(dataValue));
        }
        divContainer.append(heading1);
        divContainer.append(firstSelect);
        divContainer.append(heading2);
        divContainer.append(firstRadioSelection);
        divContainer.append(heading3);
        divContainer.append(valueTypeSelect);
        divContainer.append(heading4);
        divContainer.append(secondSelectContainer);
        if (isRequired) {
            divContainer.append(createGreenButton('Condition').addClass('p-2 px-3 mt-2 mb-2 add-if-condition-btn').data('value', ifCount));
        }
        return divContainer;
    }
    function createLogicalOperatorHeader(dataValue) {
        var container = $('<div></div>').addClass('d-flex justify-content-between align-items-center');
        var strong = $('<strong></strong>').text('Logical Operator');
        var i = $('<i></i>').addClass('fas fa-trash delete-additional-condition').css('color', 'red').data('value', dataValue);
        container.append(strong);
        container.append(i);
        return container;
    }
    function createLogicalOperatorSelection(dataValue) {
        var container = $('<div></div>').addClass('col-12 col-sm-12 d-flex align-items-center mb-4 mt-2');
        var firstRadioContainer = $('<div></div>').addClass('col-4 col-sm-4 d-flex align-items-center justify-content-start');
        var secondRadioContainer = $('<div></div>').addClass('col-4 col-sm-4 d-flex align-items-center justify-content-start');
        var radioName = 'lo-if-' + dataValue;
        var firstRadio = $('<input>').addClass('me-2').attr('name', radioName).attr('type', 'radio').attr('checked', 'true');
        var firstRadioDesc = $('<strong></strong>').text('AND');
        var secondRadio = $('<input>').addClass('me-2').attr('name', radioName).attr('type', 'radio');
        var secondRadioDesc = $('<strong></strong>').text('OR');
        var separator1 = $('<div></div>').addClass('col-1 col-sm-1');
        var separator2 = $('<div></div>').addClass('col-3 col-sm-3');
        firstRadioContainer.append(firstRadio);
        firstRadioContainer.append(firstRadioDesc);
        secondRadioContainer.append(secondRadio);
        secondRadioContainer.append(secondRadioDesc);
        container.append(firstRadioContainer);
        container.append(separator1);
        container.append(secondRadioContainer);
        container.append(separator2);
        return container;
    }
    function createOperatorRadioSelection(isRequired, customIfCount) {
        var dataValue = isRequired ? ifCount : customIfCount;
        var container = $('<div></div>').addClass('col-12 col-sm-12 d-flex align-items-center mb-2 mt-2');
        var radioContainer1 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer2 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer3 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer4 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer5 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer6 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var word1 = $('<div></div>').text('==');
        var word2 = $('<div></div>').text('!=');
        var word3 = $('<div></div>').text('<');
        var word4 = $('<div></div>').text('>');
        var word5 = $('<div></div>').text('<=');
        var word6 = $('<div></div>').text('>=');
        var className;
        if (isRequired)
            className = 'op-first-' + dataValue;
        else
            className = 'op-second-' + dataValue;
        radioContainer1.append($('<input>').attr('type', 'radio').attr('name', className).attr('checked', 'true'));
        radioContainer1.append(word1);
        radioContainer2.append($('<input>').attr('type', 'radio').attr('name', className));
        radioContainer2.append(word2);
        radioContainer3.append($('<input>').attr('type', 'radio').attr('name', className));
        radioContainer3.append(word3);
        radioContainer4.append($('<input>').attr('type', 'radio').attr('name', className));
        radioContainer4.append(word4);
        radioContainer5.append($('<input>').attr('type', 'radio').attr('name', className));
        radioContainer5.append(word5);
        radioContainer6.append($('<input>').attr('type', 'radio').attr('name', className));
        radioContainer6.append(word6);
        container.append(radioContainer1);
        container.append(radioContainer2);
        container.append(radioContainer3);
        container.append(radioContainer4);
        container.append(radioContainer5);
        container.append(radioContainer6);
        return container;
    }
    $(document).on('click', '.add-if-condition-btn', function () {
        var targetId = $(this).data('value');
        var targetContainerClass = '#list-' + targetId;
        $('#first-if-input-box-' + targetId).children().last().remove();
        $(targetContainerClass).append(createIfPropertiesInput(false, targetId));
    });
    $(document).on('change', '.first-value-type-select', function () {
        var targetId = $(this).data('value');
        $('.first-second-value-container-' + targetId).empty();
        var type = $(this).find('option').filter(':selected').val();
        if (type == 'custom') {
            var input = createInputField('text').addClass('mb-2').attr('id', 'first-if-input-second-variable-' + targetId);
            $('.first-second-value-container-' + targetId).append(input);
        }
        else {
            var listVariable = getAllVariables();
            var select = createSelect(listVariable, 12, true).addClass('mb-2').attr('id', 'first-if-select-second-variable-' + targetId);
            $('.first-second-value-container-' + targetId).append(select);
        }
    });
    $(document).on('change', '.second-value-type-select', function () {
        var targetId = $(this).data('value');
        $('.second-second-value-container-' + targetId).empty();
        var type = $(this).find('option').filter(':selected').val();
        if (type == 'custom') {
            var input = createInputField('text').addClass('mb-2').attr('id', 'second-if-input-second-variable-' + targetId);
            $('.second-second-value-container-' + targetId).append(input);
        }
        else {
            var listVariable = getAllVariables();
            var select = createSelect(listVariable, 12, true).addClass('mb-2').attr('id', 'second-if-select-second-variable-' + targetId);
            $('.second-second-value-container-' + targetId).append(select);
        }
    });
    function getAllVariables() {
        var allVariables = [];
        for (var i = 0; i < listInteger.length; i++)
            allVariables.push(listInteger[i]);
        for (var i = 0; i < listLong.length; i++)
            allVariables.push(listLong[i]);
        for (var i = 0; i < listFloat.length; i++)
            allVariables.push(listFloat[i]);
        for (var i = 0; i < listDouble.length; i++)
            allVariables.push(listDouble[i]);
        for (var i = 0; i < listChar.length; i++)
            allVariables.push(listChar[i]);
        for (var i = 0; i < listString.length; i++)
            allVariables.push(listString[i]);
        return allVariables;
    }
    function getSelectedVariables(type) {
        var allVariables = [];
        for (var i = 0; i < listInteger.length; i++)
            allVariables.push(listInteger[i]);
        for (var i = 0; i < listLong.length; i++)
            allVariables.push(listLong[i]);
        if (type == 'switch') {
            for (var i = 0; i < listChar.length; i++)
                allVariables.push(listChar[i]);
        }
        else if (type == 'repetition') {
            for (var i = 0; i < listFloat.length; i++)
                allVariables.push(listFloat[i]);
            for (var i = 0; i < listDouble.length; i++)
                allVariables.push(listDouble[i]);
        }
        else if (type == 'assignment') {
            for (var i = 0; i < listChar.length; i++)
                allVariables.push(listChar[i]);
            for (var i = 0; i < listFloat.length; i++)
                allVariables.push(listFloat[i]);
            for (var i = 0; i < listDouble.length; i++)
                allVariables.push(listDouble[i]);
        }
        return allVariables;
    }
    $(document).on('click', '#outputVariableBtn', function () {
        clearError();
        if ($('#chosenOutputVariable').find('option').filter(':selected').val() == '') {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $('#chosenOutputVariable').addClass('input-error');
        }
        else {
            var variableName = $('#chosenOutputVariable').find('option').filter(':selected').val();
            var text = $('#chosenOutputVariable').find('option').filter(':selected').text().split(' ')[1];
            var variable = undefined;
            var statement = void 0;
            if (text == '(Integer)')
                variable = getVariable(listInteger, variableName);
            else if (text == '(Long)')
                variable = getVariable(listLong, variableName);
            else if (text == '(Float)')
                variable = getVariable(listFloat, variableName);
            else if (text == '(Double)')
                variable = getVariable(listDouble, variableName);
            else if (text == '(Char)')
                variable = getVariable(listChar, variableName);
            else
                variable = getVariable(listString, variableName);
            if (variable != undefined) {
                statement = new OutputStatement_1.default(statementCount++, 1, true, 'variable', variable);
                handleAdd(statement);
                restructureStatement();
                drawCanvas();
            }
        }
    });
    $(document).on('click', '#btn-submit-output', function () {
        var output;
        if ($(this).data('value') == 'text') {
            var text = $('#output-text-box').val();
            var newLine = $('#new-line-text').is(':checked');
            output = new OutputStatement_1.default(statementCount++, 1, newLine, 'text', undefined, text);
        }
        else if ($(this).data('value') == 'ascii') {
            var num = $('#select-ascii-code').find('option').filter(':selected').val();
            var newLine = $('#new-line-ascii').is(':checked');
            output = new OutputStatement_1.default(statementCount++, 1, newLine, 'ascii', undefined, undefined, num, undefined);
        }
        else {
            var text = $('#select-escape-seq').find('option').filter(':selected').text();
            output = new OutputStatement_1.default(statementCount++, 1, false, 'escapeseq', undefined, undefined, undefined, text);
        }
        handleAdd(output);
        restructureStatement();
        drawCanvas();
    });
    $(document).on('click', '.repetition', function () {
        var createBtn;
        if ($(this).data('value') == 'for') {
            initInput('For Loop Properties');
            createForLoopCondition();
            createForLoopVariableUpdate();
            createBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'create-loop-button').data('value', 'for').text('Create');
        }
        else if ($(this).data('value') == 'do-while') {
            initInput('Do-While Loop Properties');
            createForLoopCondition();
            createBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'create-loop-button').data('value', 'do-while').text('Create');
        }
        else if ($(this).data('value') == 'while') {
            initInput('While Loop Properties');
            createForLoopCondition();
            createBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'create-loop-button').data('value', 'while').text('Create');
        }
        var container = $('<div></div>').addClass('d-flex justify-content-end col-sm-12 col-12');
        container.append(createBtn);
        $('#pcInputContainerLower').append(container);
    });
    function createForLoopCondition() {
        var listVariable = [];
        listVariable = getSelectedVariables('repetition');
        var loopConditionContainer = $('<div></div>').addClass('p-2 border border-1 rounded bg-light mb-3');
        var loopTitle = $('<div></div>').append($('<strong></strong>').text('Loop Condition')).addClass('mb-3');
        var container1 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3');
        var variableTitle = $('<div></div>').append($('<strong></strong>').text('Variable')).addClass('col-sm-5 col-5');
        var variableSelect = createSelect(listVariable, 7, true).attr('id', 'chosen-for-loop-variable');
        var container2 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3');
        var operatorTitle = $('<div></div>').append($('<strong></strong>').text('Operator')).addClass('col-sm-5 col-5');
        var operators = createOperatorRadioRepetition('op-for');
        var container3 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3');
        var valueTypeTitle = $('<div></div>').append($('<strong></strong>').text('Value Type')).addClass('col-sm-5 col-5');
        var valueTypeContainer = $('<div></div>').addClass('col-sm-7 col-7');
        var valueTypeSelect = $('<select></select>').addClass('form-select choose-for-loop-value-type');
        valueTypeSelect.append($('<option></option>').val('variable').text('Variable'));
        valueTypeSelect.append($('<option></option>').val('custom').text('Custom Value'));
        var container4 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3');
        var valueTitle = $('<div></div>').append($('<strong></strong>').text('Value')).addClass('col-sm-5 col-5');
        var valueContainer = $('<div></div>').addClass('col-sm-7 col-7 value-container-for-loop');
        var valueSelect = createSelect(listVariable, 12, true).attr('id', 'chosen-for-loop-value');
        container1.append(variableTitle);
        container1.append(variableSelect);
        container2.append(operatorTitle);
        container2.append(operators);
        container3.append(valueTypeTitle);
        valueTypeContainer.append(valueTypeSelect);
        container3.append(valueTypeContainer);
        container4.append(valueTitle);
        valueContainer.append(valueSelect);
        container4.append(valueContainer);
        loopConditionContainer.append(loopTitle);
        loopConditionContainer.append(container1);
        loopConditionContainer.append(container2);
        loopConditionContainer.append(container3);
        loopConditionContainer.append(container4);
        $('#pcInputContainer').append(loopConditionContainer);
    }
    function createForLoopVariableUpdate() {
        var loopVariableUpdateContainer = $('<div></div>').addClass('p-2 border border-1 rounded bg-light mb-3');
        var variableUpdate = $('<div></div>').append($('<strong></strong>').text('Variable Update')).addClass('mb-3');
        var container1 = $('<div></div>').addClass('col-sm-12 col-12 d-flex align-items-center mb-3');
        var updateType = $('<div></div>').append($('<strong></strong>').text('Update Type')).addClass('col-sm-5 col-5');
        var innerContainer = $('<div></div>').addClass('col-sm-7 col-7 d-flex justify-content-center align-items-center');
        var radioContainer1 = $('<div></div>').addClass('col-sm-4 col-4 d-flex justify-content-evenly align-items-center');
        var radio1 = $('<input>').attr('type', 'radio').attr('name', 'update-type-for-loop').attr('checked', 'true');
        var radioDesc1 = $('<div></div>').text('Increment');
        var radioContainer2 = $('<div></div>').addClass('col-sm-4 col-4 d-flex justify-content-evenly align-items-center');
        var radio2 = $('<input>').attr('type', 'radio').attr('name', 'update-type-for-loop');
        var radioDesc2 = $('<div></div>').text('Decrement');
        radioContainer1.append(radio1);
        radioContainer1.append(radioDesc1);
        radioContainer2.append(radio2);
        radioContainer2.append(radioDesc2);
        innerContainer.append(radioContainer1);
        innerContainer.append($('<div></div>').addClass('col-sm-1 col-1'));
        innerContainer.append(radioContainer2);
        innerContainer.append($('<div></div>').addClass('col-sm-3 col-3'));
        container1.append(updateType);
        container1.append(innerContainer);
        var container2 = $('<div></div>').addClass('col-sm-12 col-12 d-flex align-items-center mb-3');
        var updateValue = $('<div></div>').append($('<strong></strong>').text('Update Value')).addClass('col-sm-5 col-5');
        var valueContainer = $('<div></div>').addClass('col-sm-7 col-7');
        var valueInput = $('<input></input>').addClass('form-control').attr('id', 'update-value-for-loop').attr('type', 'number').attr('min', 1);
        valueContainer.append(valueInput);
        container2.append(updateValue);
        container2.append(valueContainer);
        loopVariableUpdateContainer.append(variableUpdate);
        loopVariableUpdateContainer.append(container1);
        loopVariableUpdateContainer.append(container2);
        $('#pcInputContainer').append(loopVariableUpdateContainer);
    }
    function createOperatorRadioRepetition(baseClassName) {
        var container = $('<div></div>').addClass('col-sm-7 d-flex justify-content-center align-items-center');
        var radioContainer1 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer2 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer3 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer4 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer5 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer6 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var word1 = $('<div></div>').text('==');
        var word2 = $('<div></div>').text('!=');
        var word3 = $('<div></div>').text('<');
        var word4 = $('<div></div>').text('>');
        var word5 = $('<div></div>').text('<=');
        var word6 = $('<div></div>').text('>=');
        radioContainer1.append($('<input>').attr('type', 'radio').attr('name', baseClassName).attr('checked', 'true'));
        radioContainer1.append(word1);
        radioContainer2.append($('<input>').attr('type', 'radio').attr('name', baseClassName));
        radioContainer2.append(word2);
        radioContainer3.append($('<input>').attr('type', 'radio').attr('name', baseClassName));
        radioContainer3.append(word3);
        radioContainer4.append($('<input>').attr('type', 'radio').attr('name', baseClassName));
        radioContainer4.append(word4);
        radioContainer5.append($('<input>').attr('type', 'radio').attr('name', baseClassName));
        radioContainer5.append(word5);
        radioContainer6.append($('<input>').attr('type', 'radio').attr('name', baseClassName));
        radioContainer6.append(word6);
        container.append(radioContainer1);
        container.append(radioContainer2);
        container.append(radioContainer3);
        container.append(radioContainer4);
        container.append(radioContainer5);
        container.append(radioContainer6);
        return container;
    }
    $(document).on('change', '.choose-for-loop-value-type', function () {
        $('.value-container-for-loop').empty();
        var type = $(this).find('option').filter(':selected').val();
        if (type == 'custom') {
            var input = createInputField('text').addClass('form-control').attr('id', 'chosen-for-loop-value');
            $('.value-container-for-loop').append(input);
        }
        else {
            var listVariable = getSelectedVariables('repetition');
            var select = createSelect(listVariable, 12, true).attr('id', 'chosen-for-loop-value');
            $('.value-container-for-loop').append(select);
        }
    });
    $(document).on('click', '#create-loop-button', function () {
        clearError();
        var statement = createRepetitionStatement($(this).data('value'));
        if (statement == undefined)
            return;
        handleAdd(statement);
        restructureStatement();
        drawCanvas();
    });
    function createRepetitionStatement(statementType) {
        var statement;
        var loopInput = false;
        var updateValueInput = false;
        var isCustom = false;
        var updateValue;
        loopInput = validateRepetitionInput();
        if (!loopInput)
            return undefined;
        var variable = findVariable($('#chosen-for-loop-variable').find('option').filter(':selected').val());
        var tempVariable;
        if ($('.choose-for-loop-value-type').find('option').filter(':selected').val() == 'custom') {
            isCustom = true;
            tempVariable = createVariableFromValue($('#chosen-for-loop-value').val());
        }
        else {
            isCustom = false;
            tempVariable = findVariable($('#chosen-for-loop-value').find('option').filter(':selected').val());
        }
        var operators = ['==', '!=', '<', '>', '<=', '>='];
        var firstRadio = $("input[type='radio'][name='op-for']");
        var firstCheckedIdx = -1;
        for (var i = 0; i < firstRadio.length; i++) {
            if (firstRadio[i].checked == true) {
                firstCheckedIdx = i;
                break;
            }
        }
        if (statementType == 'for') {
            updateValueInput = validateRepetitionUpdate();
            if (!updateValueInput)
                return undefined;
            updateValue = $('#update-value-for-loop').val();
            var secondRadio = $("input[type='radio'][name='update-type-for-loop']");
            var secondCheckedIdx = -1;
            for (var i = 0; i < secondRadio.length; i++) {
                if (secondRadio[i].checked == true) {
                    secondCheckedIdx = i;
                    break;
                }
            }
            var isIncrement = secondCheckedIdx == 0 ? true : false;
            statement = new ForStatement_1.default(1, statementCount++, undefined, variable, false, isIncrement, parseInt(updateValue), new Condition_1.default(variable, operators[firstCheckedIdx], tempVariable, isCustom));
        }
        else if (statementType == 'do-while') {
            statement = new WhileStatement_1.default(1, statementCount++, false, undefined, new Condition_1.default(variable, operators[firstCheckedIdx], tempVariable, isCustom));
        }
        else {
            statement = new WhileStatement_1.default(1, statementCount++, true, undefined, new Condition_1.default(variable, operators[firstCheckedIdx], tempVariable, isCustom));
        }
        return statement;
    }
    function validateRepetitionInput() {
        var variableName = $('#chosen-for-loop-variable').find('option').filter(':selected').val();
        var variable;
        var tempVariable;
        var result;
        var isCustom = false;
        if (variableName == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('#chosen-for-loop-variable').addClass('input-error');
            return false;
        }
        variable = findVariable(variableName);
        if ($('.choose-for-loop-value-type').find('option').filter(':selected').val() == 'custom') {
            isCustom = true;
            var value = $('#chosen-for-loop-value').val();
            tempVariable = createVariableFromValue(value);
            if (tempVariable instanceof String_1.default) {
                $('#chosen-for-loop-value').addClass('input-error');
                createErrorMessage('Could not compare with String data type', 'pcInputErrorContainer');
                return false;
            }
            result = tempVariable.validateValue();
            if (!result.bool) {
                $('#chosen-for-loop-value').addClass('input-error');
                createErrorMessage(result.message, 'pcInputErrorContainer');
                return false;
            }
        }
        else {
            isCustom = false;
            var variableName_1 = $('#chosen-for-loop-value').find('option').filter(':selected').val();
            if (variableName_1 == '') {
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
                $('#chosen-for-loop-value').addClass('input-error');
                return false;
            }
            tempVariable = findVariable(variableName_1);
        }
        return true;
    }
    function validateRepetitionUpdate() {
        var updateValue = $('#update-value-for-loop').val();
        if (updateValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('#update-value-for-loop').addClass('input-error');
            return false;
        }
        return true;
    }
    var assignmentToBeValidated = [];
    var assignmentCount = 1;
    $(document).on('click', '.assignment', function () {
        assignmentCount = 1;
        assignmentToBeValidated = [];
        var createBtn;
        var container = $('<div></div>').addClass('d-flex justify-content-end col-sm-12 col-12');
        if ($(this).data('value') == 'arithmetic') {
            initInput('Arithmetic Assignment');
            createArithmeticAssignmentHeader();
            createArithmeticAssignmentInput(undefined);
            createBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'create-asg-arithmetic-button').text('Create');
        }
        else if ($(this).data('value') == 'string') {
        }
        else if ($(this).data('value') == 'variable') {
            initInput('Variable Assignment');
            createVariableAssignmentInput();
            createBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'create-asg-variable-button').text('Create');
        }
        container.append(createBtn);
        $('#pcInputContainerLower').append(container);
    });
    function createArithmeticAssignmentHeader() {
        var container = $('<div>', { class: 'p-2 border border-1 rounded bg-light mb-3' }).append($('<div>', { class: 'mb-3' }).append($('<strong>').text('Target Variable')), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Variable')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<select>', { class: 'form-select' }).append($('<option>').text('Choose Variable')))));
        $('#pcInputContainer').append(container);
    }
    function createArithmeticAssignmentInput(parent) {
        var listVariable = getSelectedVariables('assignment');
        var firstValueTypeClassName = 'form-select first-select-value-type first-select-value-type-' + assignmentCount;
        var secondValueTypeClassName = 'form-select second-select-value-type second-select-value-type-' + assignmentCount;
        var firstValueContainerClassName = 'first-assignment-value-container first-assignment-value-container-' + assignmentCount;
        var secondValueContainerClassName = 'second-assignment-value-container second-assignment-value-container-' + assignmentCount;
        var container = $('<div>', { class: 'p-2 border border-1 rounded bg-light mb-3' }).append($('<input>', { type: 'hidden', name: parent }), $('<div>', { class: 'mb-3' }).append($('<strong>').text('Arithmetic Operation ' + assignmentCount)), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Value Type')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<select>', { class: firstValueTypeClassName }).append($('<option>', { value: 'variable', text: 'Variable' }), $('<option>', { value: 'custom', text: 'Custom Value' }), $('<option>', { value: 'operation', text: 'Arithmetic Operation' })).data('value', assignmentCount))), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3 ' + firstValueContainerClassName }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('First Value')), $('<div>', { class: 'col-sm-7 col-7' }).append(createSelect(listVariable, 12, true).addClass('first-value-' + assignmentCount))).data('value', assignmentCount), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Operator')), $('<div>', { class: 'col-sm-7 col-7 d-flex justify-content-center align-items-center' }).append($('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount, checked: 'true' }), $('<div>').text('+')), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount }), $('<div>').text('-')), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount }), $('<div>').text('/')), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount }), $('<div>').text('*')), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount }), $('<div>').text('%')), $('<div>', { class: 'col-sm-1 col-1' }))), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Value Type')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<select>', { class: secondValueTypeClassName }).append($('<option>', { value: 'variable', text: 'Variable' }), $('<option>', { value: 'custom', text: 'Custom Value' }), $('<option>', { value: 'operation', text: 'Arithmetic Operation' })).data('value', assignmentCount))), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3 ' + secondValueContainerClassName }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Second Value')), $('<div>', { class: 'col-sm-7 col-7' }).append(createSelect(listVariable, 12, true).addClass('second-value-' + assignmentCount))).data('value', assignmentCount));
        assignmentToBeValidated.push(assignmentCount);
        assignmentCount++;
        $('#pcInputContainer').append(container);
    }
    $(document).on('change', '.first-select-value-type', function () {
        var targetId = $(this).data('value');
        var selectValue = $('.first-select-value-type-' + targetId).find('option').filter(':selected').val();
        $('.first-assignment-value-container-' + targetId).empty();
        $("input[name='" + 'first-value-' + targetId + "']").parent().remove();
        console.log($("input[name='" + 'first-value-' + targetId + "']").parent());
        if (selectValue == 'custom') {
            $('.first-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('First Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<input>', { class: 'form-control', type: 'text' }).addClass('first-value-' + targetId)));
        }
        else if (selectValue == 'variable') {
            var listVariable = getSelectedVariables('assignment');
            $('.first-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('First Value')), $('<div>', { class: 'col-sm-7 col-7' }).append(createSelect(listVariable, 12, true).addClass('first-value-' + targetId)));
        }
        else {
            $('.first-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('First Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<strong>').text('Arithmetic Operation ' + assignmentCount)));
            createArithmeticAssignmentInput('first-value-' + targetId);
        }
    });
    $(document).on('change', '.second-select-value-type', function () {
        var targetId = $(this).data('value');
        var selectValue = $('.second-select-value-type-' + targetId).find('option').filter(':selected').val();
        $('.second-assignment-value-container-' + targetId).empty();
        $("input[name='" + 'second-value-' + targetId + "']").parent().remove();
        if (selectValue == 'custom') {
            $('.second-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Second Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<input>', { class: 'form-control', type: 'text' }).addClass('second-value-' + targetId)));
        }
        else if (selectValue == 'variable') {
            var listVariable = getSelectedVariables('assignment');
            $('.second-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Second Value')), $('<div>', { class: 'col-sm-7 col-7' }).append(createSelect(listVariable, 12, true).addClass('second-value-' + targetId)));
        }
        else {
            $('.second-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Second Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<strong>').text('Arithmetic Operation ' + assignmentCount)));
            createArithmeticAssignmentInput('second-value-' + targetId);
        }
    });
    // Assignment Variable
    function createVariableAssignmentInput() {
        var listVariable = getAllVariables();
        var container = $('<div></div>');
        var container1 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3 mt-2');
        var variableTitle = $('<div></div>').append($('<strong></strong>').text('Variable')).addClass('col-sm-5 col-5');
        var variableSelect = createSelect(listVariable, 7, true).attr('id', 'chosen-asg-variable');
        var container2 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3');
        var valueTypeTitle = $('<div></div>').append($('<strong></strong>').text('Value Type')).addClass('col-sm-5 col-5');
        var valueTypeContainer = $('<div></div>').addClass('col-sm-7 col-7');
        var valueTypeSelect = $('<select></select>').addClass('form-select choose-asg-value-type');
        valueTypeSelect.append($('<option></option>').val('variable').text('Variable'));
        valueTypeSelect.append($('<option></option>').val('custom').text('Custom Value'));
        var container3 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3');
        var valueTitle = $('<div></div>').append($('<strong></strong>').text('Value')).addClass('col-sm-5 col-5');
        var valueContainer = $('<div></div>').addClass('col-sm-7 col-7 value-container-asg');
        var valueSelect = createSelect(listVariable, 12, true).attr('id', 'chosen-asg-value');
        container1.append(variableTitle);
        container1.append(variableSelect);
        container2.append(valueTypeTitle);
        valueTypeContainer.append(valueTypeSelect);
        container2.append(valueTypeContainer);
        container3.append(valueTitle);
        valueContainer.append(valueSelect);
        container3.append(valueContainer);
        container.append(container1);
        container.append(container2);
        container.append(container3);
        $('#pcInputContainer').append(container);
    }
    $(document).on('change', '.choose-asg-value-type', function () {
        $('.value-container-asg').empty();
        var input;
        if ($(this).find('option').filter(':selected').val() == 'custom') {
            input = $('<input>').attr('type', 'text').addClass('form-control').attr('id', 'chosen-asg-value');
        }
        else {
            var listVariable = getAllVariables();
            input = createSelect(listVariable, 12, true).attr('id', 'chosen-asg-value');
        }
        $('.value-container-asg').append(input);
    });
    $(document).on('click', '#create-asg-variable-button', function () {
        clearError();
        var firstVariableName = $('#chosen-asg-variable').find('option').filter(':selected').val();
        var firstVariable;
        var secondVariable;
        var isCustom = false;
        var result;
        if (firstVariableName == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('#chosen-asg-variable').addClass('input-error');
            return;
        }
        firstVariable = findVariable(firstVariableName);
        if ($('.choose-asg-value-type').find('option').filter(':selected').val() == 'custom') {
            isCustom = true;
            var value = $('#chosen-asg-value').val();
            if (value == '') {
                createErrorMessage('Input field cannot be empty', 'pcInputErrorContainer');
                $('#chosen-asg-value').addClass('input-error');
                return;
            }
            secondVariable = createVariableFromValue(value);
            result = secondVariable.validateValue();
            if (!result.bool) {
                $('#chosen-asg-value').addClass('input-error');
                createErrorMessage(result.message, 'pcInputErrorContainer');
                return;
            }
        }
        else {
            isCustom = false;
            var value = $('#chosen-asg-value').find('option').filter(':selected').val();
            if (value == '') {
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
                $('#chosen-asg-value').addClass('input-error');
                return;
            }
            secondVariable = findVariable(value);
        }
        if (firstVariable instanceof String_1.default || secondVariable instanceof String_1.default) {
            if (firstVariable instanceof String_1.default && secondVariable instanceof String_1.default) { }
            else {
                $('#chosen-asg-value').addClass('input-error');
                createErrorMessage('Could not assign other data type with String data type', 'pcInputErrorContainer');
                return;
            }
        }
        var statement = new AssignmentStatement_1.default(statementCount++, 1, 'variable', firstVariable, undefined, undefined, secondVariable, isCustom);
        handleAdd(statement);
        restructureStatement();
        drawCanvas();
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
            $('#bcErrorContainer').empty();
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
                        createErrorMessage('Could not copy declare statement!', 'bcErrorContainer');
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
                createErrorMessage('Could not add statement here', 'bcErrorContainer');
                finishAction();
            }
        }
    }
    function handlePaste() {
        var returnPaste;
        if (clipboard == undefined) {
            createErrorMessage('Clipboard is empty!', 'bcErrorContainer');
            return;
        }
        if (clipboard.findStatement(returnClick.statement)) {
            createErrorMessage('Could not paste statement here!', 'bcErrorContainer');
            return;
        }
        var splitted = returnClick.option.optionId.split('-');
        var isInner = splitted[splitted.length - 1] == 'inner' ? true : false;
        if (lastSelectedOption == 'MOV' || lastSelectedOption == 'CPY') {
            returnPaste = returnClick.option.handlePaste(listStatement, clipboard, returnClick.statement, isInner, lastSelectedOption);
            listStatement = returnPaste.listStatement;
            if (returnPaste.result == false) {
                createErrorMessage('Could not paste statement here!', 'bcErrorContainer');
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
            createErrorMessage('Variable is used on another statement!', 'bcErrorContainer');
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
    // Create template
    function blankTemplate() {
        for (var i = 0; i < listStatement.length; i++) {
            if (listStatement[i] instanceof DeclareStatement_1.default)
                deleteVariable(listStatement[i].variable);
        }
        listStatement = [];
    }
    function declareVariableTemplate() {
        var variableName = 'myNumber';
        var variable;
        allVariableNames[variableName] = true;
        variable = new Integer_1.default(variableName, 50);
        listInteger.push(variable);
        handleAdd(new DeclareStatement_1.default(statementCount++, 1, variable));
    }
    function simplyPrintTemplate() {
        var outputStatement = new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "Hello World!");
        handleAdd(outputStatement);
    }
    function inputOutputTemplate() {
        var variableName = 'myNumber';
        var variable;
        allVariableNames[variableName] = true;
        variable = new Integer_1.default(variableName, 0);
        listInteger.push(variable);
        handleAdd(new DeclareStatement_1.default(statementCount++, 1, variable));
        handleAdd(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'Input number: '));
        handleAdd(new InputStatement_1.default(statementCount++, 1, variable));
        handleAdd(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'The number is: '));
        handleAdd(new OutputStatement_1.default(statementCount++, 1, true, 'variable', variable));
    }
    function nestedIfTemplate() {
        var variableName = 'myScore';
        var variable;
        allVariableNames[variableName] = true;
        variable = new Integer_1.default(variableName, 0);
        listInteger.push(variable);
        handleAdd(new DeclareStatement_1.default(statementCount++, 1, variable));
        handleAdd(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'Input score: '));
        handleAdd(new InputStatement_1.default(statementCount++, 1, variable));
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var firstIf = new If_1.default(1, statementCount++, new Condition_1.default(variable, '<', new Integer_1.default('x', 65), true));
        var secondIf = new Else_1.default(1, statementCount++, undefined);
        var failInnerIf;
        var successInnerIf;
        var temp = [];
        failInnerIf = createIf(variable, 30, 45, ['F', 'E', 'D']);
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'You failed'));
        temp.push(failInnerIf);
        firstIf.updateChildStatement(temp);
        successInnerIf = createIf(variable, 75, 85, ['C', 'B', 'A']);
        temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'You passed!'));
        temp.push(successInnerIf);
        secondIf.updateChildStatement(temp);
        var ifOperations = [];
        ifOperations.push(firstIf);
        ifOperations.push(secondIf);
        ifStatement.updateIfOperations(ifOperations);
        handleAdd(ifStatement);
    }
    function createIf(variable, lower, upper, grades) {
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var firstIf = new If_1.default(1, statementCount++, new Condition_1.default(variable, '<', new Integer_1.default('x', lower), true));
        var secondIf = new Elif_1.default(1, statementCount++, new Condition_1.default(variable, '>=', new Integer_1.default('x', lower), true), 'AND', new Condition_1.default(variable, '<', new Integer_1.default('x', upper), true));
        var thirdIf = new Else_1.default(1, statementCount, undefined);
        var statements = [];
        statements.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'Your grade is ' + grades[0]));
        firstIf.updateChildStatement(statements);
        statements = [];
        statements.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'Your grade is ' + grades[1]));
        secondIf.updateChildStatement(statements);
        statements = [];
        statements.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'Your grade is ' + grades[2]));
        thirdIf.updateChildStatement(statements);
        var ifOperations = [];
        ifOperations.push(firstIf);
        ifOperations.push(secondIf);
        ifOperations.push(thirdIf);
        ifStatement.updateIfOperations(ifOperations);
        return ifStatement;
    }
    function nestedForTemplate() {
        var variable = new Integer_1.default('i', 0);
        var variable2 = new Integer_1.default('j', 0);
        var forStatement = new ForStatement_1.default(1, statementCount++, undefined, variable, true, true, 1, new Condition_1.default(variable, '<', new Integer_1.default('x', 2), true));
        var nestedForStatement = new ForStatement_1.default(1, statementCount++, undefined, variable2, true, true, 1, new Condition_1.default(variable2, '<', new Integer_1.default('x', 3), true));
        var temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'i: '));
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'variable', variable));
        temp.push(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'j: '));
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'variable', variable2));
        nestedForStatement.updateChildStatement(temp);
        temp = [];
        temp.push(nestedForStatement);
        forStatement.updateChildStatement(temp);
        handleAdd(forStatement);
    }
    function menuTemplate() {
        var variable = new Integer_1.default('choice', 0);
        allVariableNames['choice'] = true;
        listInteger.push(variable);
        var declareStatement = new DeclareStatement_1.default(statementCount++, 1, variable);
        var whileStatement = new WhileStatement_1.default(1, statementCount, false, undefined, new Condition_1.default(variable, '!=', new Integer_1.default('x', 4), true));
        var temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "1. Print 'Hello'"));
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "2. Print 'World'"));
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "3. Print 'Lorem'"));
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "4. Exit"));
        temp.push(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, "Choice: "));
        temp.push(new InputStatement_1.default(statementCount++, 1, variable));
        temp.push(createSwitchStatement(variable));
        whileStatement.updateChildStatement(temp);
        handleAdd(declareStatement);
        handleAdd(whileStatement);
    }
    function createSwitchStatement(variable) {
        var switchStatement = new SwitchStatement_1.default(1, statementCount++, variable, undefined);
        var temp = [];
        var caseStatements = [];
        var firstCase = new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 1), true), undefined, false);
        var secondCase = new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 1), true), undefined, false);
        var thirdCase = new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 1), true), undefined, false);
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "Hello"));
        firstCase.updateChildStatement(temp);
        temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "World"));
        secondCase.updateChildStatement(temp);
        temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "Lorem"));
        thirdCase.updateChildStatement(temp);
        temp = [];
        caseStatements.push(firstCase);
        caseStatements.push(secondCase);
        caseStatements.push(thirdCase);
        switchStatement.updateCaseStatement(caseStatements);
        return switchStatement;
    }
    function drawSquareTemplate() {
        var variable = new Integer_1.default('count', 0);
        allVariableNames['count'] = true;
        listInteger.push(variable);
        var i = new Integer_1.default('i', 0);
        var j = new Integer_1.default('j', 0);
        var declareStatement = new DeclareStatement_1.default(statementCount++, 1, variable);
        var inputStatement = new InputStatement_1.default(statementCount++, 1, variable);
        var forStatement = new ForStatement_1.default(1, statementCount++, undefined, i, true, true, 1, new Condition_1.default(i, '<', variable, false));
        var nestedForStatement = new ForStatement_1.default(1, statementCount++, undefined, j, true, true, 1, new Condition_1.default(j, '<', variable, false));
        var temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, '*'));
        nestedForStatement.updateChildStatement(temp);
        temp = [];
        temp.push(nestedForStatement);
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, ''));
        forStatement.updateChildStatement(temp);
        handleAdd(declareStatement);
        handleAdd(inputStatement);
        handleAdd(forStatement);
    }
    function oddEvenTemplate() {
        var variable = new Integer_1.default('number', 0);
        allVariableNames['number'] = true;
        listInteger.push(variable);
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var firstIf = new If_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 0), true));
        var secondIf = new Elif_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 1), true));
        var ifOperations = [];
        var temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'The number is an even number'));
        firstIf.updateChildStatement(temp);
        temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'The number is an odd number'));
        secondIf.updateChildStatement(temp);
        ifOperations.push(firstIf);
        ifOperations.push(secondIf);
        ifStatement.updateIfOperations(ifOperations);
        var listArithmetic = [];
        listArithmetic.push(new Arithmetic_1.default(variable, new Integer_1.default('x', 2), undefined, undefined, '%', true));
        var assignmentStatement = new AssignmentStatement_1.default(statementCount++, 1, 'arithmetic', variable, listArithmetic, undefined, undefined, undefined);
        handleAdd(new DeclareStatement_1.default(statementCount++, 1, variable));
        handleAdd(new InputStatement_1.default(statementCount++, 1, variable));
        handleAdd(assignmentStatement);
        handleAdd(ifStatement);
    }
});
