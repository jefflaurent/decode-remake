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
var C_1 = __importDefault(require("../classes/languages/C"));
var Java_1 = __importDefault(require("../classes/languages/Java"));
var Python_1 = __importDefault(require("../classes/languages/Python"));
var Cs_1 = __importDefault(require("../classes/languages/Cs"));
var Cpp_1 = __importDefault(require("../classes/languages/Cpp"));
var Pseudocode_1 = __importDefault(require("../classes/languages/Pseudocode"));
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
        var variableClassName = 'var-name-' + variableIndex;
        var inputClassName = 'input-val-' + variableIndex;
        var hintContainer = $('<div>', { class: 'col-sm-12 col-12 mb-2 d-flex' }).append(createHint('Variable Name', 5), createWhiteSpace(1), createHint('Initial Value', 5));
        var valueField = isNumber ? createInputField('number').addClass(inputClassName) : createInputField('text').addClass(inputClassName);
        var inputContainer = $('<div>', { class: 'col-sm-12 col-12 mb-4 d-flex align-items-center' }).append($('<div>', { class: 'col-sm-5 col-5' }).append(createInputField('text').addClass(variableClassName)), createWhiteSpace(1), $('<div>', { class: 'col-sm-5 col-5' }).append(valueField));
        var container3 = $('<div>', { class: 'col-sm-1 col-1 d-flex justify-content-center' }).append(createCloseBtn().data('value', variableIndex++));
        declareVariableNameList.push(variableClassName);
        declareVariableValueList.push(inputClassName);
        if (!isRequired)
            inputContainer.append(container3);
        $('#pcInputContainer').append($('<div>', { class: 'col-sm-12 col-12' }).append(hintContainer, inputContainer));
    }
    function createSelect(listVariable, length, isAllVariable) {
        var option;
        var className = 'col-sm-' + length;
        var className2 = 'col-' + length;
        var container = $('<div>', { class: className + ' ' + className2 });
        var select = $('<select>', { class: 'form-select col-sm-12 col-12' }).append($('<option>').val(null).text('Choose Variable'));
        for (var _i = 0, listVariable_1 = listVariable; _i < listVariable_1.length; _i++) {
            var variable = listVariable_1[_i];
            if (!isAllVariable)
                option = $('<option>').val(variable.name).text(variable.name);
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
                option = $('<option>').val(variable.name).text(variable.name + ' (' + dataType + ')');
            }
            select.append(option);
        }
        container.append(select);
        return container;
    }
    function clearError() {
        $('#pcInputErrorContainer').empty();
        $('#pjMessageContainer').empty();
        $('#resultErrorContainer').empty();
        if (declareVariableNameList != undefined) {
            for (var _i = 0, declareVariableNameList_1 = declareVariableNameList; _i < declareVariableNameList_1.length; _i++) {
                var varName = declareVariableNameList_1[_i];
                $('.' + varName).removeClass('input-error');
            }
        }
        if (declareVariableValueList != undefined) {
            for (var _a = 0, declareVariableValueList_1 = declareVariableValueList; _a < declareVariableValueList_1.length; _a++) {
                var varValue = declareVariableValueList_1[_a];
                $('.' + varValue).removeClass('input-error');
            }
        }
        if (caseToBeValidated != undefined) {
            for (var i = 0; i < caseToBeValidated.length; i++)
                $('.' + caseToBeValidated[i]).removeClass('input-error');
        }
        if (assignmentToBeValidated != undefined) {
            for (var i = 0; i < assignmentToBeValidated.length; i++) {
                $('.first-value-' + assignmentToBeValidated[i]).find('select').removeClass('input-error');
                $('.first-value-' + assignmentToBeValidated[i]).removeClass('input-error');
                $('.second-value-' + assignmentToBeValidated[i]).find('select').removeClass('input-error');
                $('.second-value-' + assignmentToBeValidated[i]).removeClass('input-error');
            }
        }
        $('#chosenVariable').removeClass('input-error');
        $('#chosenOutputVariable').removeClass('input-error');
        $('#chosenSwitchVariable').removeClass('input-error');
        $('#chosen-for-loop-variable').removeClass('input-error');
        $('#chosen-for-loop-value').removeClass('input-error');
        $('#update-value-for-loop').removeClass('input-error');
        $('#chosen-asg-variable').removeClass('input-error');
        $('.selected-target-variable-asg').removeClass('input-error');
        $('.first-asg-string-value').find('select').removeClass('input-error');
        $('.second-asg-string-value').find('select').removeClass('input-error');
        $('.begin-idx-string').removeClass('input-error');
        $('.length-idx-string').removeClass('input-error');
        $('input[name=project_name').removeClass('input-error');
        if (ifToBeValidated != undefined) {
            for (var i = 0; i < ifToBeValidated.length; i++) {
                $('#first-if-select-first-variable-' + ifToBeValidated[i]).removeClass('input-error');
                $('#first-if-input-second-variable-' + ifToBeValidated[i]).removeClass('input-error');
                $('#first-if-select-second-variable-' + ifToBeValidated[i]).removeClass('input-error');
                $('#second-if-select-first-variable-' + ifToBeValidated[i]).removeClass('input-error');
                $('#second-if-input-second-variable-' + ifToBeValidated[i]).removeClass('input-error');
                $('#second-if-select-second-variable-' + ifToBeValidated[i]).removeClass('input-error');
            }
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
        var container = $('<div>', { class: 'col-sm-12 col-12 alert alert-danger' }).text(message);
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
        $('#pcInputContainerLower').append(createGreenButton('Variable').addClass('col-sm-3 col-3 addVariableDeclareBtn').data('value', isNumericValue), $('<div>', { class: 'col-sm-7 col-7' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'createVariableBtn' }).data('value', $(this).data('value')).text('Create'));
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
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
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
        $('#pcInputContainer').append($('<div>', { class: 'd-flex align-items-center mb-3' }).append(createHint('Variable Name', 5), createSelect(listVariable, 7).attr('id', 'chosenVariable')));
        $('#pcInputContainerLower').append($('<div>', { class: 'col-sm-10 col-10' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'inputVariableBtn' }).data('value', $(this).data('value')).text('Select'));
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
                turnOffOptions();
                clearSourceCode();
                initInput('Program Input');
                drawCanvas();
            }
        }
    });
    // Click template button
    $(document).on('click', '.generateTemplate', function () {
        initInput('Program Input');
        clearError();
        clearVariableStatementData();
        clearSourceCode();
        blankTemplate();
        if ($(this).data('value') == 'declare')
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
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
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
            var inputBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'outputVariableBtn').data('value', $(this).data('value')).text('Select');
            var btmContainer = $('<div>', { class: 'col-sm-12 col-12 d-flex justify-content-evenly align-items-center' }).append($('<div>', { class: 'col-sm-5 col-5' }), $('<div>', { class: 'col-sm-5 col-5 d-flex align-items-center' }).append($('<input>', { class: 'form-check-input col-sm-1 col-1 d-flex align-items-center', type: 'checkbox', id: 'new-line-variable' }), $('<label>', { class: 'form-check-label col-sm-11 col-11 d-flex align-items-center ms-2', for: 'new-line-variable' }).text('Add new line')), inputBtn);
            $('#pcInputContainerLower').append(btmContainer);
        }
        else {
            initInput('Output Text');
            createOutputTextSelection();
        }
    });
    function createOutputTextSelection() {
        var leftSide = $('<div>', { class: 'col-sm-4 col-4 mb-2' }).append($('<div>', { class: 'list-group', id: 'list-tab' }).attr('role', 'tablist').append($('<a>', { class: 'list-group-item list-group-item-action active', id: 'list-home-list' }).attr('data-bs-toggle', 'list').attr('href', '#list-home').text('Text'), $('<a>', { class: 'list-group-item list-group-item-action', id: 'list-profile-list' }).attr('data-bs-toggle', 'list').attr('href', '#list-profile').text('ASCII Code'), $('<a>', { class: 'list-group-item list-group-item-action', id: 'list-messages-list' }).attr('data-bs-toggle', 'list').attr('href', '#list-messages').text('Escape Sequence')));
        var selectAscii = $('<select>', { class: 'form-select mt-2', id: 'select-ascii-code' });
        for (var i = 0; i <= 255; i++)
            selectAscii.append($('<option></option>').val(i).text(i));
        var selectEscape = $('<select>', { class: 'form-select mt-2', id: 'select-escape-seq' }).append($('<option>').val('a').text('\\a'), $('<option>').val('b').text('\\b'), $('<option>').val('f').text('\\f'), $('<option>').val('n').text('\\n'), $('<option>').val('r').text('\\r'), $('<option>').val('t').text('\\t'), $('<option>').val('v').text('\\v'), $('<option>').val('bs').text("\\\\"), $('<option>').val("tick").text("\\'"), $('<option>').val("dtick").text("\\\""), $('<option>').val("qmark").text("\\?"));
        var rightSide = $('<div>', { class: 'col-sm-8 col-8' }).append($('<div>', { class: 'tab-content', id: 'nav-tabContent' }).append($('<div>', { class: 'tab-pane fade show active', id: 'list-home' }).attr('id', 'list-home').attr('role', 'tabpanel').append($('<strong>').text('Input Text'), $('<input>', { type: 'text', class: 'form-control mt-2', id: 'output-text-box' }), $('<div>', { class: 'col-sm-12 col-12 d-flex' }).append($('<div>', { class: 'col-sm-8 col-8 d-flex align-items-center' }).append($('<div>').append($('<input>', { type: 'checkbox', class: 'form-check-input', id: 'new-line-text' }), $('<label>', { class: 'form-check-label ms-2', for: 'new-line-text' }).text('Add new line'))), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-end' }).append($('<button>', { class: 'btn btn-primary mt-2', id: 'btn-submit-output' }).data('value', 'text').text('Create')))), $('<div>', { class: 'tab-pane fade', id: 'list-profile' }).attr('role', 'tabpanel').append($('<strong>').text('ASCII Code'), selectAscii, $('<div>', { class: 'col-sm-12 col-12 d-flex' }).append($('<div>', { class: 'col-sm-8 col-8 d-flex align-items-center' }).append($('<div>').append($('<input>', { type: 'checkbox', class: 'form-check-input', id: 'new-line-ascii' }), $('<label>', { class: 'form-check-label ms-2', for: 'new-line-ascii' }).text('Add new line'))), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-end' }).append($('<button>', { class: 'btn btn-primary mt-2', id: 'btn-submit-output' }).data('value', 'ascii').text('Create')))), $('<div>', { class: 'tab-pane fade', id: 'list-messages' }).attr('role', 'tabpanel').append($('<strong>').text('Escape Sequence'), selectEscape, $('<div>', { class: 'col-sm-12 col-12 d-flex' }).append($('<div>', { class: 'col-sm-8 col-8 d-flex align-items-center' }), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-end' }).append($('<button>', { class: 'btn btn-primary mt-2', id: 'btn-submit-output' }).data('value', 'escape').text('Create'))))));
        $('#pcInputContainer').append($('<div>', { class: 'row' }).append(leftSide, rightSide));
    }
    var ifCount = 1;
    var ifToBeValidated = [];
    var isElsed = false;
    $(document).on('click', '.selection', function () {
        ifCount = 1;
        ifToBeValidated = [];
        isElsed = false;
        if ($(this).data('value') == 'if-else') {
            initInput('Selection Properties');
            createIfSelection();
            $('#pcInputContainerLower').append($('<div>', { class: 'd-flex justify-content-end p-2 col-sm-12 col-12' }).append($('<div>', { class: 'col-sm-10 col-10' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'createIfStatementButton' }).text('Create')));
        }
        else {
            createSwitchSelection('create');
        }
    });
    function createGreenButton(text) {
        var container = $('<div>', { class: 'btn d-flex align-items-center justify-content-center bg-success p-2 text-white bg-opacity-75 p-2 mt-2' }).append($('<i>', { class: 'fas fa-plus me-2' }), $('<div>').text(text));
        return container;
    }
    function createSwitchSelection(type) {
        if (type == 'create')
            initInput('Switch Properties');
        else
            initInput('Edit Switch Statement');
        $('.all-case-container').empty();
        caseToBeValidated = [];
        isDefaulted = false;
        caseCount = 1;
        var listVariable = [];
        listVariable = getSelectedVariables('switch');
        $('#pcInputContainer').append($('<div>', { class: 'd-flex align-items-center mb-3' }).append(createHint('Variable', 5), createSelect(listVariable, 7, true).attr('id', 'chosenSwitchVariable')), $('<div>', { class: 'all-case-container' }));
        if (type == 'update') {
            var variable = clipboard.variable;
            $('#chosenSwitchVariable').find('option[value="' + variable.name + '"]').prop('selected', true);
            createUpdateCase();
        }
        createAdditionalSwitchButton(type);
    }
    function createUpdateCase() {
        var len = clipboard.caseStatement.length;
        var temp = undefined;
        var variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val();
        var variable = findVariable(variableName);
        for (var i = 0; i < len; i++) {
            temp = clipboard.caseStatement[i];
            if (temp.isDefault)
                isDefaulted = true;
            createCaseStatementInput(true, temp.isDefault, variable);
        }
    }
    var caseToBeValidated = [];
    var caseCount = 1;
    var isDefaulted = false;
    $(document).on('click', '#createSwitchCaseBtn', function () {
        handleCreateSwitchButton('create');
    });
    $(document).on('click', '#updateSwitchCaseBtn', function () {
        handleCreateSwitchButton('update');
    });
    function handleCreateSwitchButton(type) {
        clearError();
        var variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val();
        if (variableName == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
        }
        else {
            var variable = findVariable(variableName);
            var statement = createCaseStatement(variable);
            if (statement != undefined) {
                if (type == 'create')
                    handleAdd(statement);
                else {
                    var oldCaseStatement = clipboard.caseStatement;
                    var caseStatement = statement.caseStatement;
                    var tempChildStatement = [];
                    if (returnClick.option.validateMainListStatement(listStatement, statement, clipboard, false)) {
                        for (var i = 0; i < oldCaseStatement.length; i++) {
                            tempChildStatement = [];
                            if (oldCaseStatement[i].childStatement != undefined) {
                                for (var j = 0; j < oldCaseStatement[i].childStatement.length; j++)
                                    tempChildStatement.push(oldCaseStatement[i].childStatement[j]);
                            }
                            caseStatement[i].updateChildStatement(tempChildStatement);
                        }
                        clipboard.updateCaseStatement(caseStatement);
                        clipboard.variable = statement.variable;
                    }
                    else {
                        createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
                    }
                }
                finishAction();
                restructureStatement();
                turnOffOptions();
                clearSourceCode();
                initInput('Program Input');
                drawCanvas();
            }
        }
    }
    function createCaseStatement(variable) {
        var value = '';
        var tempVariable = undefined;
        var caseStatement = [];
        var result;
        var className = '';
        for (var i = 0; i < caseToBeValidated.length; i++) {
            className = '.' + caseToBeValidated[i];
            value = $(className).val();
            if (value == undefined) {
                $(className).addClass('input-error');
                createErrorMessage('Field cannot be empty!', 'pcInputErrorContainer');
                return undefined;
            }
            tempVariable = createVariableFromValue(value);
            if (tempVariable instanceof String_1.default) {
                $(className).addClass('input-error');
                createErrorMessage('Could not compare with String data type', 'pcInputErrorContainer');
                return undefined;
            }
            result = tempVariable.validateValue();
            if (!result.bool) {
                $(className).addClass('input-error');
                createErrorMessage(result.message, 'pcInputErrorContainer');
                return undefined;
            }
            caseStatement.push(new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', tempVariable, true), undefined, false));
        }
        if (isDefaulted) {
            caseStatement.push(new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', variable, true), undefined, true));
        }
        var switchStatement = new SwitchStatement_1.default(1, statementCount++, variable, undefined);
        switchStatement.updateCaseStatement(caseStatement);
        return switchStatement;
    }
    $(document).on('change', '#chosenSwitchVariable', function () {
        clearError();
        changeChosenVariableSwitch();
    });
    function changeChosenVariableSwitch() {
        $('.all-case-container').empty();
        caseToBeValidated = [];
        isDefaulted = false;
        caseCount = 1;
        var variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val();
        if (variableName != '') {
            if (lastSelectedOption == 'EDT' && clipboard instanceof SwitchStatement_1.default) {
                createUpdateCase();
            }
            else {
                var variable = findVariable(variableName);
                createCaseStatementInput(true, false, variable);
            }
        }
    }
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
        var startContainer = $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-end' });
        var textField = $('<input>').attr('type', 'text').addClass('form-control ' + inputClassName);
        var endContainer = $('<div>', { class: 'col-sm-1 col-1 d-flex justify-content-center' });
        var buttonClose = $('<button>', { class: 'btn-close rmCase' }).data('value', caseCount++);
        if (!isDefault) {
            startContainer.append($('<strong>').text('Case:'));
            caseToBeValidated.push(inputClassName);
        }
        else {
            startContainer.append($('<strong>').text('Default:'));
            textField.attr('disabled', 'true');
        }
        if (!isRequired)
            endContainer.append(buttonClose);
        $('.all-case-container').append($('<div>', { class: 'col-sm-12 col-12 mb-2 d-flex justify-content-center align-items-center ' + className }).append(startContainer, $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-center' }).text(variable.name), $('<div>', { class: 'col-sm-1 col-1 d-flex align-items-center' }).text('=='), $('<div>', { class: 'col-sm-3 col-3' }).append(textField), endContainer));
    }
    function oldCreateCaseStatementInput(isRequired, isDefault, variable) {
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
    function createAdditionalSwitchButton(type) {
        var btnId = type == 'create' ? 'createSwitchCaseBtn' : 'updateSwitchCaseBtn';
        var text = type == 'create' ? 'Create' : 'Update';
        $('#pcInputContainerLower').append($('<div>', { class: 'col-sm-12 col-12 d-flex flex-column' }).append($('<div>', { class: 'col-sm-12 col-12' }).append(createGreenButton('Case').addClass('col-sm-3 col-3 add-additional-case-btn'), $('<div>', { class: 'col-sm-9 col-9' })), $('<div>', { class: 'col-sm-12 col-12 d-flex justify-content-center' }).append(createGreenButton('Default').addClass('col-sm-3 col-3 add-default-btn'), $('<div>', { class: 'col-sm-7 col-7' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).text(text))));
    }
    function createIfSelection() {
        var leftSide = $('<div>', { class: 'col-sm-4 col-4 mb-2' }).append($('<div>', { class: 'list-group', id: 'list-tab-if' }).attr('role', 'tablist').append($('<a>', { class: 'list-group-item list-group-item-action active', id: 'list-if-1' }).attr('data-bs-toggle', 'list').attr('href', '#list-1').text('If')), createGreenButton('Else If').addClass('additional-if').data('value', 'elif'), createGreenButton('Else').addClass('additional-if').data('value', 'else'));
        var rightSide = $('<div>', { class: 'col-sm-8 col-8 if-properties-container-' + ifCount }).append($('<div>', { class: 'tab-content', id: 'nav-tabContentIf' }).append(createNewIfTab().append(createIfPropertiesInput(true))));
        $('#pcInputContainer').append($('<div>', { class: 'row' }).append(leftSide, rightSide));
        ifToBeValidated.push(ifCount);
        ifCount++;
    }
    function createNewIfTab() {
        var id = 'list-' + ifCount;
        var tabPane = $('<div>', { class: 'tab-pane fade show', id: id }).attr('role', 'tabpanel');
        if (ifCount == 1)
            tabPane.addClass('active');
        return tabPane;
    }
    $(document).on('click', '.additional-if', function () {
        clearError();
        if ($(this).data('value') == 'elif')
            createAdditionalElif(true);
        else
            createElse(true);
    });
    function createAdditionalElif(isDeletable) {
        if (!isElsed) {
            ifToBeValidated.push(ifCount);
            $('#list-tab-if').append(createNewTab('Else If', isDeletable).data('value', 'elif'));
            var ifInputProperties = createIfPropertiesInput(true);
            var tabContent = createNewIfTab();
            tabContent.append(ifInputProperties);
            $('#nav-tabContentIf').append(tabContent);
            ifCount++;
        }
        else
            createErrorMessage('Could not add else if after else!', 'pcInputErrorContainer');
    }
    function createElse(isDeletable) {
        if (!isElsed) {
            $('#list-tab-if').append(createNewTab('Else', isDeletable).data('value', 'else'));
            isElsed = true;
        }
        else
            createErrorMessage('Could not add else after else!', 'pcInputErrorContainer');
    }
    function createNewTab(text, isDeletable) {
        var a = $('<a></a>').addClass('list-group-item list-group-item-action d-flex justify-content-between align-items-center').attr('data-bs-toggle', 'list').attr('id', 'list-if-' + ifCount).attr('href', '#list-' + ifCount);
        var word = $('<div></div>').text(text);
        var i = $('<i>', { class: 'fas fa-trash delete-if-stmnt' }).css('color', 'red').data('value', ifCount);
        a.append(word);
        if (isDeletable)
            a.append(i);
        return a;
    }
    $(document).on('click', '.delete-if-stmnt', function () {
        var targetId = $(this).data('value');
        if ($('#list-if-' + targetId).data('value') == 'else')
            isElsed = false;
        else if ($('#list-if-' + targetId).data('value') == 'elif') {
            var targetIdx = ifToBeValidated.indexOf(targetId);
            ifToBeValidated.splice(targetIdx, 1);
        }
        $('#list-' + targetId).remove();
        $('#list-if-' + targetId).remove();
        if ($('#list-1').hasClass('active') == true) {
            $("#list-tab-if a[href=\"#list-1\"]").tab('show');
        }
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
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
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
        var secondSelectId = isRequired ? 'first-if-select-second-variable-' + ifCount : 'second-if-select-second-variable-' + customIfCount;
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
        var variable = getSelectedOutputVariable();
        if (variable == undefined) {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $('#chosenOutputVariable').addClass('input-error');
        }
        else {
            var isNewLine = $('#new-line-variable').is(':checked');
            var statement = new OutputStatement_1.default(statementCount++, 1, isNewLine, 'variable', variable);
            handleAdd(statement);
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    function getSelectedOutputVariable() {
        if ($('#chosenOutputVariable').find('option').filter(':selected').val() == '')
            return undefined;
        var variableName = $('#chosenOutputVariable').find('option').filter(':selected').val();
        var text = $('#chosenOutputVariable').find('option').filter(':selected').text().split(' ')[1];
        var variable = undefined;
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
        return variable;
    }
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
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    // Repetition
    $(document).on('click', '.repetition', function () {
        createRepetitionInput('create', $(this).data('value'));
    });
    function createRepetitionInput(type, clicked) {
        var createBtn;
        var btnId;
        var text;
        if (type == 'create') {
            btnId = 'create-loop-button';
            text = 'Create';
        }
        else {
            btnId = 'update-loop-button';
            text = 'Update';
        }
        if (clicked == 'for') {
            if (type == 'create')
                initInput('For Loop Properties');
            else
                initInput('Edit For Statement');
            createForLoopCondition();
            createForLoopVariableUpdate();
            createBtn = $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).data('value', 'for').text(text);
        }
        else if (clicked == 'do-while') {
            if (type == 'create')
                initInput('Do-While Loop Properties');
            else
                initInput('Edit Do-While Statement');
            createForLoopCondition();
            createBtn = $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).data('value', 'do-while').text(text);
        }
        else if (clicked == 'while') {
            if (type == 'create')
                initInput('While Loop Properties');
            else
                initInput('Edit While Statement');
            createForLoopCondition();
            createBtn = $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).data('value', 'while').text(text);
        }
        $('#pcInputContainerLower').append($('<div>', { class: 'd-flex justify-content-end col-sm-12 col-12' }).append(createBtn));
    }
    function createForLoopCondition() {
        var listVariable = [];
        listVariable = getSelectedVariables('repetition');
        $('#pcInputContainer').append($('<div>', { class: 'p-2 border border-1 rounded bg-light mb-3' }).append($('<div>', { class: 'mb-3' }).append($('<strong>').text('Loop Condition')), $('<div>', { class: 'col-sm-12 col-12 d-flex mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Variable')), createSelect(listVariable, 7, true).attr('id', 'chosen-for-loop-variable')), $('<div>', { class: 'col-sm-12 col-12 d-flex mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Operator')), createOperatorRadioRepetition('op-for')), $('<div>', { class: 'col-sm-12 col-12 d-flex mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Value Type')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<select>', { class: 'form-select choose-for-loop-value-type' }).append($('<option>').val('variable').text('Variable'), $('<option>>').val('custom').text('Custom Value')))), $('<div>', { class: 'col-sm-12 col-12 d-flex mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Value')), $('<div>', { class: 'col-sm-7 col-7 value-container-for-loop' }).append(createSelect(listVariable, 12, true).attr('id', 'chosen-for-loop-value')))));
    }
    function createForLoopVariableUpdate() {
        $('#pcInputContainer').append($('<div>', { class: 'p-2 border border-1 rounded bg-light mb-3' }).append($('<div>', { class: 'mb-3' }).append($('<strong>').text('Variable Update')), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Update Type')), $('<div>', { class: 'col-sm-7 col-7 d-flex justify-content-center align-items-center' }).append($('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-evenly align-items-center' }).append($('<input>').attr('type', 'radio').attr('name', 'update-type-for-loop').attr('checked', 'true'), $('<div>').text('Increment')), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-evenly align-items-center' }).append($('<input>').attr('type', 'radio').attr('name', 'update-type-for-loop'), $('<div>').text('Decrement')), $('<div>', { class: 'col-sm-3 col-3' }))), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Update Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<input>', { class: 'form-control', type: 'number' }).attr('id', 'update-value-for-loop').attr('min', 1)))));
    }
    function createOperatorRadioRepetition(baseClassName) {
        var container = $('<div>', { class: 'col-sm-7 d-flex justify-content-center align-items-center' }).append($('<div>', { class: 'col-2 col-sm-2 d-flex align-items-center justify-content-evenly' }).append($('<input>', { type: 'radio', name: baseClassName }).attr('checked', 'true'), $('<div>').text('==')), $('<div>', { class: 'col-2 col-sm-2 d-flex align-items-center justify-content-evenly' }).append($('<input>', { type: 'radio', name: baseClassName }), $('<div>').text('!=')), $('<div>', { class: 'col-2 col-sm-2 d-flex align-items-center justify-content-evenly' }).append($('<input>', { type: 'radio', name: baseClassName }), $('<div>').text('<')), $('<div>', { class: 'col-2 col-sm-2 d-flex align-items-center justify-content-evenly' }).append($('<input>', { type: 'radio', name: baseClassName }), $('<div>').text('>')), $('<div>', { class: 'col-2 col-sm-2 d-flex align-items-center justify-content-evenly' }).append($('<input>', { type: 'radio', name: baseClassName }), $('<div>').text('<=')), $('<div>', { class: 'col-2 col-sm-2 d-flex align-items-center justify-content-evenly' }).append($('<input>', { type: 'radio', name: baseClassName }), $('<div>').text('>=')));
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
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
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
        var tempVariable;
        var result;
        if (variableName == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('#chosen-for-loop-variable').addClass('input-error');
            return false;
        }
        if ($('.choose-for-loop-value-type').find('option').filter(':selected').val() == 'custom') {
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
            var variableName_1 = $('#chosen-for-loop-value').find('option').filter(':selected').val();
            if (variableName_1 == '') {
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
                $('#chosen-for-loop-value').addClass('input-error');
                return false;
            }
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
    // Arithmetic Assignment
    var assignmentToBeValidated = [];
    var assignmentCount = 1;
    var assignmentStructure = {};
    $(document).on('click', '.assignment', function () {
        createAssignmentInput('create', $(this).data('value'));
    });
    function createAssignmentInput(type, clicked) {
        assignmentCount = 1;
        assignmentToBeValidated = [];
        var createBtn;
        var btnId;
        var text;
        if (type == 'create')
            text = 'Create';
        else
            text = 'Update';
        if (clicked == 'arithmetic') {
            if (type == 'create') {
                initInput('Arithmetic Assignment');
                btnId = 'create-asg-arithmetic-button';
            }
            else {
                initInput('Edit Arithmetic Assignment');
                btnId = 'update-asg-arithmetic-button';
            }
            createArithmeticAssignmentHeader();
            createArithmeticAssignmentInput();
            createBtn = $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).text(text);
        }
        else if (clicked == 'string') {
            if (type == 'create') {
                initInput('String Assignment');
                btnId = 'create-asg-string-button';
            }
            else {
                initInput('Edit String Assignment');
                btnId = 'update-asg-string-button';
            }
            createActionTypeChoice();
            createGetStringLengthInput();
            createBtn = $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).text(text);
        }
        else if (clicked == 'variable') {
            if (type == 'create') {
                initInput('Variable Assignment');
                btnId = 'create-asg-variable-button';
            }
            else {
                initInput('Edit Variable Assignment');
                btnId = 'update-asg-variable-button';
            }
            createVariableAssignmentInput();
            createBtn = $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).text(text);
        }
        $('#pcInputContainerLower').append($('<div>', { class: 'd-flex justify-content-end col-sm-12 col-12' }).append(createBtn));
    }
    // String Assignment
    $(document).on('click', '#create-asg-string-button', function () {
        clearError();
        var statement = undefined;
        if ($('.choose-action-type').find('option').filter(':selected').val() == 'length')
            statement = createStringAssignmentLength();
        else
            statement = createStringAssignmentSub();
        if (statement != undefined) {
            handleAdd(statement);
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    function createStringAssignmentLength() {
        var firstValue = $('.first-asg-string-value').find('select').find('option').filter(':selected').val();
        var secondValue = $('.second-asg-string-value').find('select').find('option').filter(':selected').val();
        var firstVariable;
        var secondVariable;
        if (firstValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('.first-asg-string-value').find('select').addClass('input-error');
            return undefined;
        }
        if (secondValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('.second-asg-string-value').find('select').addClass('input-error');
            return undefined;
        }
        firstVariable = findVariable(firstValue);
        secondVariable = findVariable(secondValue);
        var statement = new AssignmentStatement_1.default(statementCount++, 1, 'length', firstVariable, undefined, undefined, undefined, secondVariable, undefined, undefined, undefined);
        return statement;
    }
    function createStringAssignmentSub() {
        var firstValue = $('.first-asg-string-value').find('select').find('option').filter(':selected').val();
        var secondValue = $('.second-asg-string-value').find('select').find('option').filter(':selected').val();
        var firstVariable;
        var secondVariable;
        var start;
        var length;
        if (firstValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('.first-asg-string-value').find('select').addClass('input-error');
            return undefined;
        }
        if (secondValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('.second-asg-string-value').find('select').addClass('input-error');
            return undefined;
        }
        firstVariable = findVariable(firstValue);
        secondVariable = findVariable(secondValue);
        start = $('.begin-idx-string').val();
        if (start == '') {
            createErrorMessage('Input field cannot be empty', 'pcInputErrorContainer');
            $('.begin-idx-string').addClass('input-error');
            return undefined;
        }
        else if (parseInt(start) < 1) {
            createErrorMessage('Start position must be greater than 0', 'pcInputErrorContainer');
            $('.begin-idx-string').addClass('input-error');
            return undefined;
        }
        else if (parseInt(start) > secondVariable.value.length) {
            createErrorMessage('Start position must be less than String length', 'pcInputErrorContainer');
            $('.begin-idx-string').addClass('input-error');
            return undefined;
        }
        length = $('.length-idx-string').val();
        if (length == '') {
            createErrorMessage('Input field cannot be empty', 'pcInputErrorContainer');
            $('.length-idx-string').addClass('input-error');
            return undefined;
        }
        else if (parseInt(length) < 1) {
            createErrorMessage('Length must be greater than 0', 'pcInputErrorContainer');
            $('.length-idx-string').addClass('input-error');
            return undefined;
        }
        else if (parseInt(start) + (parseInt(length) - 1) > secondVariable.value.length) {
            createErrorMessage('String overflow', 'pcInputErrorContainer');
            $('.length-idx-string').addClass('input-error');
            return undefined;
        }
        var statement = new AssignmentStatement_1.default(statementCount++, 1, 'sub', firstVariable, undefined, undefined, undefined, secondVariable, undefined, parseInt(start), parseInt(length));
        return statement;
    }
    $(document).on('change', '.choose-action-type', function () {
        $('.action-select-container').remove();
        if ($(this).find('option').filter(':selected').val() == 'length') {
            createGetStringLengthInput();
        }
        else if ($(this).find('option').filter(':selected').val() == 'sub') {
            createSubstringInput();
        }
    });
    function createActionTypeChoice() {
        var container = $('<div>', { class: 'p-2 border border-1 rounded bg-light col-sm-12 col-12 mb-3' }).append($('<div>', { class: 'mb-3' }).append($('<strong>').text('Action Type')), $('<div>', { class: 'col-sm-12 col-12 mb-3 d-flex align-items-center' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Action')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<select>', { class: 'form-select choose-action-type' }).append($('<option>').val('length').text('Get String Length'), $('<option>').val('sub').text('Get Part of String')))));
        $('#pcInputContainer').append(container);
    }
    function createGetStringLengthInput() {
        var container = $('<div>', { class: 'p-2 border border-1 rounded bg-light col-sm-12 col-12 mb-3 action-select-container' }).append($('<div>', { class: 'mb-3' }).append($('<strong>').text('String Length')), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Target Variable (Integer)')), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Variable (String)')), $('<div>', { class: 'col-sm-1 col-1' })), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append(createSelect(listInteger, 12, false).addClass('first-asg-string-value')), $('<div>', { class: 'col-sm-1 col-1 d-flex justify-content-center' }).text('='), $('<div>', { class: 'col-sm-5 col-5' }).append(createSelect(listString, 12, false).addClass('second-asg-string-value')), $('<div>', { class: 'col-sm-1 col-1' })));
        $('#pcInputContainer').append(container);
    }
    function createSubstringInput() {
        var container = $('<div>', { class: 'p-2 border border-1 rounded bg-light col-sm-12 col-12 mb-3 action-select-container' }).append($('<div>', { class: 'mb-3' }).append($('<strong>').text('Part of String')), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Target Variable (String)')), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Variable (String)')), $('<div>', { class: 'col-sm-1 col-1' })), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append(createSelect(listString, 12, false).addClass('first-asg-string-value')), $('<div>', { class: 'col-sm-1 col-1 d-flex justify-content-center' }).text('='), $('<div>', { class: 'col-sm-5 col-5' }).append(createSelect(listString, 12, false).addClass('second-asg-string-value')), $('<div>', { class: 'col-sm-1 col-1' })), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Start Position')), $('<div>', { class: 'col-sm-1 col-1' })), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-5 col-5' }).append($('<input>', { type: 'number', class: 'form-control begin-idx-string' })), $('<div>', { class: 'col-sm-1 col-1' })), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Length')), $('<div>', { class: 'col-sm-1 col-1' })), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-5 col-5' }).append($('<input>', { type: 'number', class: 'form-control length-idx-string' })), $('<div>', { class: 'col-sm-1 col-1' })));
        $('#pcInputContainer').append(container);
    }
    // Arithmetic Assignment
    function createArithmeticAssignmentHeader() {
        var listVariable = getSelectedVariables('assignment');
        var container = $('<div>', { class: 'p-2 border border-1 rounded bg-light mb-3' }).append($('<div>', { class: 'mb-3' }).append($('<strong>').text('Target Variable')), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Variable')), $('<div>', { class: 'col-sm-7 col-7' }).append(createSelect(listVariable, 12, true).addClass('selected-target-variable-asg'))));
        $('#pcInputContainer').append(container);
    }
    function createArithmeticAssignmentInput() {
        var listVariable = getSelectedVariables('assignment');
        var firstValueTypeClassName = 'form-select first-select-value-type first-select-value-type-' + assignmentCount;
        var secondValueTypeClassName = 'form-select second-select-value-type second-select-value-type-' + assignmentCount;
        var firstValueContainerClassName = 'first-assignment-value-container first-assignment-value-container-' + assignmentCount;
        var secondValueContainerClassName = 'second-assignment-value-container second-assignment-value-container-' + assignmentCount;
        var container = $('<div>', { class: 'p-2 border border-1 rounded bg-light mb-3' }).append($('<input>', { type: 'hidden', name: 'arithmetic-asg-' + assignmentCount }), $('<div>', { class: 'mb-3' }).append($('<strong>').text('Arithmetic Operation ' + assignmentCount)), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Value Type')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<select>', { class: firstValueTypeClassName }).append($('<option>', { value: 'variable', text: 'Variable' }), $('<option>', { value: 'custom', text: 'Custom Value' }), $('<option>', { value: 'operation', text: 'Arithmetic Operation' })).data('value', assignmentCount))), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3 ' + firstValueContainerClassName }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('First Value')), $('<div>', { class: 'col-sm-7 col-7' }).append(createSelect(listVariable, 12, true).addClass('first-value-' + assignmentCount))).data('value', assignmentCount), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Operator')), $('<div>', { class: 'col-sm-7 col-7 d-flex justify-content-center align-items-center' }).append($('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount, checked: 'true' }), $('<div>').text('+')), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount }), $('<div>').text('-')), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount }), $('<div>').text('/')), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount }), $('<div>').text('*')), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount }), $('<div>').text('%')), $('<div>', { class: 'col-sm-1 col-1' }))), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Value Type')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<select>', { class: secondValueTypeClassName }).append($('<option>', { value: 'variable', text: 'Variable' }), $('<option>', { value: 'custom', text: 'Custom Value' }), $('<option>', { value: 'operation', text: 'Arithmetic Operation' })).data('value', assignmentCount))), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3 ' + secondValueContainerClassName }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Second Value')), $('<div>', { class: 'col-sm-7 col-7' }).append(createSelect(listVariable, 12, true).addClass('second-value-' + assignmentCount))).data('value', assignmentCount));
        assignmentToBeValidated.push(assignmentCount);
        assignmentCount++;
        $('#pcInputContainer').append(container);
    }
    $(document).on('change', '.first-select-value-type', function () {
        var targetId = $(this).data('value');
        var selectValue = $('.first-select-value-type-' + targetId).find('option').filter(':selected').val();
        $('.first-assignment-value-container-' + targetId).empty();
        if (selectValue != 'operation')
            deleteFirstChild(targetId);
        if (selectValue == 'custom') {
            $('.first-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('First Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<input>', { class: 'form-control', type: 'text' }).addClass('first-value-' + targetId)));
        }
        else if (selectValue == 'variable') {
            var listVariable = getSelectedVariables('assignment');
            $('.first-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('First Value')), $('<div>', { class: 'col-sm-7 col-7' }).append(createSelect(listVariable, 12, true).addClass('first-value-' + targetId)));
        }
        else {
            $('.first-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('First Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<strong>').text('Arithmetic Operation ' + assignmentCount)));
            assignmentStructure['first-value-' + targetId] = assignmentCount;
            createArithmeticAssignmentInput();
        }
    });
    $(document).on('change', '.second-select-value-type', function () {
        var targetId = $(this).data('value');
        var selectValue = $('.second-select-value-type-' + targetId).find('option').filter(':selected').val();
        $('.second-assignment-value-container-' + targetId).empty();
        if (selectValue != 'operation')
            deleteSecondChild(targetId);
        if (selectValue == 'custom') {
            $('.second-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Second Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<input>', { class: 'form-control', type: 'text' }).addClass('second-value-' + targetId)));
        }
        else if (selectValue == 'variable') {
            var listVariable = getSelectedVariables('assignment');
            $('.second-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Second Value')), $('<div>', { class: 'col-sm-7 col-7' }).append((createSelect(listVariable, 12, true)).addClass('second-value-' + targetId)));
        }
        else {
            $('.second-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Second Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<strong>').text('Arithmetic Operation ' + assignmentCount)));
            assignmentStructure['second-value-' + targetId] = assignmentCount;
            createArithmeticAssignmentInput();
        }
    });
    function deleteFirstChild(targetId) {
        var temp = undefined;
        var idx;
        temp = assignmentStructure['first-value-' + targetId];
        $("input[name='arithmetic-asg-" + temp + "']").parent().remove();
        assignmentStructure['first-value-' + targetId] = undefined;
        idx = assignmentToBeValidated.indexOf(parseInt(temp));
        if (idx != -1)
            assignmentToBeValidated.splice(idx, 1);
        deleteChildAssignment(temp);
    }
    function deleteSecondChild(targetId) {
        var temp = undefined;
        var idx;
        temp = assignmentStructure['second-value-' + targetId];
        $("input[name='arithmetic-asg-" + temp + "']").parent().remove();
        assignmentStructure['second-value-' + targetId] = undefined;
        idx = assignmentToBeValidated.indexOf(parseInt(temp));
        if (idx != -1)
            assignmentToBeValidated.splice(idx, 1);
        deleteChildAssignment(temp);
    }
    function deleteChildAssignment(targetId) {
        var temp = undefined;
        var idx;
        temp = assignmentStructure['first-value-' + targetId];
        if (temp != undefined) {
            $("input[name='arithmetic-asg-" + temp + "']").parent().remove();
            assignmentStructure['first-value-' + targetId] = undefined;
            idx = assignmentToBeValidated.indexOf(parseInt(temp));
            if (idx != -1)
                assignmentToBeValidated.splice(idx, 1);
            deleteChildAssignment(temp);
        }
        temp = assignmentStructure['second-value-' + targetId];
        if (temp != undefined) {
            $("input[name='arithmetic-asg-" + temp + "']").parent().remove();
            assignmentStructure['second-value-' + targetId] = undefined;
            idx = assignmentToBeValidated.indexOf(parseInt(temp));
            if (idx != -1)
                assignmentToBeValidated.splice(idx, 1);
            deleteChildAssignment(temp);
        }
    }
    $(document).on('click', '#create-asg-arithmetic-button', function () {
        clearError();
        var temp = true;
        var value;
        value = $('.selected-target-variable-asg').find('option').filter(':selected').val();
        if (value == '') {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $('.selected-target-variable-asg').addClass('input-error');
            return;
        }
        for (var i = 0; i < assignmentToBeValidated.length; i++) {
            temp = validateArithmeticAssignmentInput(assignmentToBeValidated[i]);
            if (!temp)
                return;
        }
        var assignmentStatement = createArithmeticStatement();
        handleAdd(assignmentStatement);
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    function validateArithmeticAssignmentInput(idx) {
        var firstValueType = $('.first-select-value-type-' + idx).find('option').filter(':selected').val();
        var secondValueType = $('.second-select-value-type-' + idx).find('option').filter(':selected').val();
        var firstVariable;
        var secondVariable;
        if (firstValueType != 'operation') {
            firstVariable = getValue(firstValueType, '.first-value-' + idx);
            if (firstVariable == undefined)
                return false;
        }
        if (secondValueType != 'operation') {
            secondVariable = getValue(secondValueType, '.second-value-' + idx);
            if (secondVariable == undefined)
                return false;
        }
        return true;
    }
    function getValue(valueType, className) {
        var variable;
        if (valueType == 'custom') {
            var value = $(className).val();
            var result = void 0;
            if (value == '') {
                createErrorMessage('Input field cannot be empty', 'pcInputErrorContainer');
                $(className).addClass('input-error');
                return undefined;
            }
            variable = createVariableFromValue(value);
            if (variable instanceof String_1.default) {
                createErrorMessage('Could not assign with String data type', 'pcInputErrorContainer');
                $(className).addClass('input-error');
                return undefined;
            }
            result = variable.validateValue();
            if (!result.bool) {
                createErrorMessage(result.message, 'pcInputErrorContainer');
                $(className).addClass('input-error');
                return undefined;
            }
        }
        else if (valueType == 'variable') {
            var variableName = void 0;
            variableName = $(className).find('select').find('option').filter(':selected').val();
            if (variableName == '') {
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
                $(className).find('select').addClass('input-error');
                return undefined;
            }
            variable = findVariable(variableName);
        }
        return variable;
    }
    function createArithmeticStatement() {
        var firstValueType = $('.first-select-value-type-1').find('option').filter(':selected').val();
        var secondValueType = $('.second-select-value-type-1').find('option').filter(':selected').val();
        var firstVariable = undefined;
        var secondVariable = undefined;
        var firstChild = undefined;
        var secondChild = undefined;
        var isFirstCustom = false;
        var isSecondCustom = false;
        var operators = ['+', '-', '/', '*', '%'];
        var radioClassName = 'op-asg-1';
        var value;
        var targetVariable;
        var listArithmetic = [];
        var listOperator = [];
        var listIsCustom = [];
        value = $('.selected-target-variable-asg').find('option').filter(':selected').val();
        targetVariable = findVariable(value);
        if (firstValueType == 'operation') {
            var temp = assignmentStructure['first-value-1'];
            firstChild = createArithmeticAssignment(temp);
            listArithmetic.push(firstChild);
        }
        else if (firstValueType == 'variable') {
            var variableName = void 0;
            variableName = $('.first-value-1').find('select').find('option').filter(':selected').val();
            firstVariable = findVariable(variableName);
            listArithmetic.push(firstVariable);
            listIsCustom.push(false);
        }
        else {
            isFirstCustom = true;
            var value_1 = $('.first-value-1').val();
            firstVariable = createVariableFromValue(value_1);
            listArithmetic.push(firstVariable);
            listIsCustom.push(true);
        }
        if (secondValueType == 'operation') {
            var temp = assignmentStructure['second-value-1'];
            secondChild = createArithmeticAssignment(temp);
            listArithmetic.push(secondChild);
        }
        else if (secondValueType == 'variable') {
            var variableName = void 0;
            variableName = $('.second-value-1').find('select').find('option').filter(':selected').val();
            secondVariable = findVariable(variableName);
            listArithmetic.push(secondVariable);
            listIsCustom.push(false);
        }
        else {
            isSecondCustom = true;
            var value_2 = $('.second-value-1').val();
            secondVariable = createVariableFromValue(value_2);
            listArithmetic.push(secondVariable);
            listIsCustom.push(true);
        }
        var radio = $("input[type='radio'][name='" + radioClassName + "']");
        var checkedIdx = -1;
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked == true) {
                checkedIdx = i;
                break;
            }
        }
        listOperator.push(operators[checkedIdx]);
        var assignmentStatement = new AssignmentStatement_1.default(statementCount++, 1, 'arithmetic', targetVariable, listArithmetic, listOperator, listIsCustom, undefined, undefined, undefined, undefined);
        return assignmentStatement;
    }
    function createArithmeticAssignment(idx) {
        var firstValueType = $('.first-select-value-type-' + idx).find('option').filter(':selected').val();
        var secondValueType = $('.second-select-value-type-' + idx).find('option').filter(':selected').val();
        var firstVariable = undefined;
        var secondVariable = undefined;
        var firstChild = undefined;
        var secondChild = undefined;
        var isFirstCustom = false;
        var isSecondCustom = false;
        var operators = ['+', '-', '/', '*', '%'];
        var radioClassName = 'op-asg-' + idx;
        if (firstValueType == 'operation') {
            var temp = assignmentStructure['first-value-' + idx];
            firstChild = createArithmeticAssignment(temp);
        }
        else if (firstValueType == 'variable') {
            var variableName = void 0;
            variableName = $('.first-value-' + idx).find('select').find('option').filter(':selected').val();
            firstVariable = findVariable(variableName);
        }
        else {
            isFirstCustom = true;
            var value = $('.first-value-' + idx).val();
            firstVariable = createVariableFromValue(value);
        }
        if (secondValueType == 'operation') {
            var temp = assignmentStructure['second-value-' + idx];
            secondChild = createArithmeticAssignment(temp);
        }
        else if (secondValueType == 'variable') {
            var variableName = void 0;
            variableName = $('.second-value-' + idx).find('select').find('option').filter(':selected').val();
            secondVariable = findVariable(variableName);
        }
        else {
            isSecondCustom = true;
            var value = $('.second-value-' + idx).val();
            secondVariable = createVariableFromValue(value);
        }
        var radio = $("input[type='radio'][name='" + radioClassName + "']");
        var checkedIdx = -1;
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked == true) {
                checkedIdx = i;
                break;
            }
        }
        return new Arithmetic_1.default(firstVariable, secondVariable, firstChild, secondChild, operators[checkedIdx], isFirstCustom, isSecondCustom);
    }
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
        var statement = createVariableAssignment();
        if (statement != undefined) {
            handleAdd(statement);
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    function createVariableAssignment() {
        var firstVariableName = $('#chosen-asg-variable').find('option').filter(':selected').val();
        var firstVariable;
        var secondVariable;
        var isCustom = false;
        var result;
        if (firstVariableName == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('#chosen-asg-variable').addClass('input-error');
            return undefined;
        }
        firstVariable = findVariable(firstVariableName);
        if ($('.choose-asg-value-type').find('option').filter(':selected').val() == 'custom') {
            isCustom = true;
            var value = $('#chosen-asg-value').val();
            if (value == '') {
                createErrorMessage('Input field cannot be empty', 'pcInputErrorContainer');
                $('#chosen-asg-value').addClass('input-error');
                return undefined;
            }
            secondVariable = createVariableFromValue(value);
            result = secondVariable.validateValue();
            if (!result.bool) {
                $('#chosen-asg-value').addClass('input-error');
                createErrorMessage(result.message, 'pcInputErrorContainer');
                return undefined;
            }
        }
        else {
            isCustom = false;
            var value = $('#chosen-asg-value').find('option').filter(':selected').val();
            if (value == '') {
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
                $('#chosen-asg-value').addClass('input-error');
                return undefined;
            }
            secondVariable = findVariable(value);
        }
        if (firstVariable instanceof String_1.default || secondVariable instanceof String_1.default) {
            if (firstVariable instanceof String_1.default && secondVariable instanceof String_1.default) { }
            else {
                $('#chosen-asg-value').addClass('input-error');
                createErrorMessage('Could not assign other data type with String data type', 'pcInputErrorContainer');
                return undefined;
            }
        }
        var statement = new AssignmentStatement_1.default(statementCount++, 1, 'variable', firstVariable, undefined, undefined, undefined, secondVariable, isCustom, undefined, undefined);
        return statement;
    }
    // Canvas logic
    initializeCanvas();
    var blockCanvasInstance; // instance of Class Canvas
    var canvas;
    var option = undefined;
    // Variables to handle canvas interaction (add, mov, pst, edt)
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
        width = width * 2;
        if (width < 1034) {
            width = 1034;
        }
        canvas.width = width;
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
    function turnOffOptions() {
        if (option != undefined)
            option.isSelectionActive = false;
        if (listStatement != undefined)
            for (var i = 0; i < listStatement.length; i++)
                listStatement[i].turnOffOption();
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
                        turnOffOptions();
                        clearSourceCode();
                        initInput('Program Input');
                        drawCanvas();
                        return;
                    }
                    clipboard = cloneStatement(returnClick.statement);
                    lastSelectedOption = returnClick.option.optionName;
                }
                else if (returnClick.option.optionName == 'EDT') {
                    $('html, body').animate({
                        scrollTop: $('#accordionProgramInput').offset().top
                    }, 300);
                    clipboard = returnClick.option.parent;
                    lastSelectedOption = returnClick.option.optionName;
                    handleEdit();
                }
                else if (returnClick.option.optionName == 'DEL') {
                    clipboard = returnClick.statement;
                    lastSelectedOption = returnClick.option.optionName;
                    handleDelete();
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
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
            return;
        }
        if (clipboard.findStatement(returnClick.statement)) {
            createErrorMessage('Could not paste statement here!', 'bcErrorContainer');
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
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
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    }
    function handleEdit() {
        if (clipboard instanceof DeclareStatement_1.default) {
            initInput('Edit Declare Statement');
            createEditDeclare();
        }
        else if (clipboard instanceof InputStatement_1.default) {
            initInput('Edit Input Statement');
            createEditInput();
        }
        else if (clipboard instanceof OutputStatement_1.default) {
            createEditOutput();
        }
        else if (clipboard instanceof IfStatement_1.default) {
            initInput('Edit If Statement');
            createEditIfElse();
        }
        else if (clipboard instanceof SwitchStatement_1.default) {
            initInput('Edit Switch Statement');
            createSwitchSelection('update');
        }
        else if (clipboard instanceof ForStatement_1.default) {
            createRepetitionInput('update', 'for');
        }
        else if (clipboard instanceof WhileStatement_1.default) {
            if (clipboard.isWhile)
                createRepetitionInput('update', 'while');
            else
                createRepetitionInput('update', 'do-while');
        }
        else if (clipboard instanceof AssignmentStatement_1.default) {
            if (clipboard.type == 'variable') {
                createAssignmentInput('update', 'variable');
            }
            else if (clipboard.type == 'arithmetic') {
                createAssignmentInput('update', 'arithmetic');
            }
            else {
                createAssignmentInput('update', 'string');
            }
        }
    }
    // Edit Declare Statement
    function createEditDeclare() {
        var targetVariable = clipboard.variable;
        var variableClassName = 'var-name-' + variableIndex;
        var inputClassName = 'input-val-' + variableIndex;
        var isNumber = false;
        if (targetVariable instanceof Char_1.default || targetVariable instanceof String_1.default)
            isNumber = false;
        else
            isNumber = true;
        var hintContainer = $('<div>', { class: 'col-sm-12 col-12 mb-2 d-flex' }).append(createHint('Variable Name', 5), createWhiteSpace(1), createHint('Initial Value', 5));
        var valueField = isNumber ? createInputField('number').addClass(inputClassName).val(targetVariable.value) : createInputField('text').addClass(inputClassName).val(targetVariable.value);
        var inputContainer = $('<div>', { class: 'col-sm-12 col-12 mb-4 d-flex align-items-center' }).append($('<div>', { class: 'col-sm-5 col-5' }).append(createInputField('text').addClass(variableClassName).val(targetVariable.name).attr('disabled', 'true')), createWhiteSpace(1), $('<div>', { class: 'col-sm-5 col-5' }).append(valueField));
        declareVariableNameList.push(variableClassName);
        declareVariableValueList.push(inputClassName);
        $('#pcInputContainer').append($('<div>', { class: 'col-sm-12 col-12' }).append(hintContainer, inputContainer));
        $('#pcInputContainerLower').append($('<div>', { class: 'col-sm-10 col-10' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'editDeclareVariableBtn' }).text('Update'));
    }
    // Update Declare Statement 
    $(document).on('click', '#editDeclareVariableBtn', function () {
        clearError();
        var targetVariable = clipboard.variable;
        var tempVariable;
        var val = $('.input-val-0').val();
        if (targetVariable instanceof Integer_1.default)
            tempVariable = new Integer_1.default('tmp', val);
        else if (targetVariable instanceof Long_1.default)
            tempVariable = new Long_1.default('tmp', val);
        else if (targetVariable instanceof Float_1.default)
            tempVariable = new Float_1.default('tmp', val);
        else if (targetVariable instanceof Double_1.default)
            tempVariable = new Double_1.default('tmp', val);
        else if (targetVariable instanceof String_1.default)
            tempVariable = new String_1.default('tmp', val);
        else if (targetVariable instanceof Char_1.default)
            tempVariable = new Char_1.default('tmp', val);
        var returnValue = tempVariable.validateValue();
        if (!returnValue.bool) {
            $('.input-val-0').addClass('input-error');
            createErrorMessage(returnValue.message, 'pcInputErrorContainer');
            return;
        }
        clipboard.variable.value = $('.input-val-0').val();
        finishAction();
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    // Edit Input Statement
    function createEditInput() {
        var targetVariable = clipboard.variable;
        var classType;
        var listVariable;
        if (targetVariable instanceof Integer_1.default) {
            listVariable = listInteger;
            classType = 'int';
        }
        else if (targetVariable instanceof Long_1.default) {
            listVariable = listLong;
            classType = 'long';
        }
        else if (targetVariable instanceof Float_1.default) {
            listVariable = listFloat;
            classType = 'float';
        }
        else if (targetVariable instanceof Double_1.default) {
            listVariable = listDouble;
            classType = 'double';
        }
        else if (targetVariable instanceof Char_1.default) {
            listVariable = listChar;
            classType = 'char';
        }
        else {
            listVariable = listString;
            classType = 'string';
        }
        $('#pcInputContainer').append($('<div>', { class: 'd-flex align-items-center mb-3' }).append(createHint('Variable Name', 5), createSelect(listVariable, 7).attr('id', 'chosenVariable')));
        $('#pcInputContainerLower').append($('<div>', { class: 'col-sm-10 col-10' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'editInputVariableBtn' }).data('value', classType).text('Update'));
    }
    // Update Input Statement
    $(document).on('click', '#editInputVariableBtn', function () {
        clearError();
        if ($('#chosenVariable').find('option').filter(':selected').val() == '') {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $('#chosenVariable').addClass('input-error');
        }
        else {
            var variableName = $('#chosenVariable').find('option').filter(':selected').val();
            var variable = undefined;
            var statement = void 0;
            if ($('#editInputVariableBtn').data('value') == 'int')
                variable = getVariable(listInteger, variableName);
            else if ($('#editInputVariableBtn').data('value') == 'long')
                variable = getVariable(listLong, variableName);
            else if ($('#editInputVariableBtn').data('value') == 'float')
                variable = getVariable(listFloat, variableName);
            else if ($('#editInputVariableBtn').data('value') == 'double')
                variable = getVariable(listDouble, variableName);
            else if ($('#editInputVariableBtn').data('value') == 'char')
                variable = getVariable(listChar, variableName);
            else
                variable = getVariable(listString, variableName);
            if (variable != undefined) {
                statement = new InputStatement_1.default(statementCount++, 1, variable);
                // validate chosen variable has been declared
                if (returnClick.option.validateMainListStatement(listStatement, statement, clipboard, false))
                    clipboard.variable = variable;
                else
                    createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
            }
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    // Edit Output Statement
    function createEditOutput() {
        var statement = clipboard;
        if (statement.type == 'variable')
            createEditOutputVariable();
        else
            createEditOutputText();
    }
    function createEditOutputVariable() {
        initInput('Edit Output Variable');
        var listVariable = getAllVariables();
        $('#pcInputContainer').append($('<div>', { class: 'd-flex align-items-center mb-3' }).append(createHint('Variable Name', 5), createSelect(listVariable, 7, true).attr('id', 'chosenOutputVariable')));
        $('#pcInputContainerLower').append($('<div>', { class: 'col-sm-12 col-12 d-flex justify-content-evenly align-items-center' }).append($('<div>', { class: 'col-sm-5 col-5' }), $('<div>', { class: 'col-sm-5 col-5 d-flex align-items-center' }).append($('<input>', { class: 'form-check-input col-sm-1 col-1 d-flex align-items-center', type: 'checkbox', id: 'new-line-variable' }), $('<label>', { class: 'form-check-label col-sm-11 col-11 d-flex align-items-center ms-2', for: 'new-line-variable' }).text('Add new line')), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'editOutputVariableBtn' }).text('Update')));
    }
    function createEditOutputText() {
        initInput('Edit Output Text');
        var leftSide = $('<div>', { class: 'col-sm-4 col-4 mb-2' }).append($('<div>', { class: 'list-group', id: 'list-tab' }).attr('role', 'tablist').append($('<a>', { class: 'list-group-item list-group-item-action active', id: 'list-home-list' }).attr('data-bs-toggle', 'list').attr('href', '#list-home').text('Text'), $('<a>', { class: 'list-group-item list-group-item-action', id: 'list-profile-list' }).attr('data-bs-toggle', 'list').attr('href', '#list-profile').text('ASCII Code'), $('<a>', { class: 'list-group-item list-group-item-action', id: 'list-messages-list' }).attr('data-bs-toggle', 'list').attr('href', '#list-messages').text('Escape Sequence')));
        var selectAscii = $('<select>', { class: 'form-select mt-2', id: 'select-ascii-code' });
        for (var i = 0; i <= 255; i++)
            selectAscii.append($('<option></option>').val(i).text(i));
        var selectEscape = $('<select>', { class: 'form-select mt-2', id: 'select-escape-seq' }).append($('<option>').val('a').text('\\a'), $('<option>').val('b').text('\\b'), $('<option>').val('f').text('\\f'), $('<option>').val('n').text('\\n'), $('<option>').val('r').text('\\r'), $('<option>').val('t').text('\\t'), $('<option>').val('v').text('\\v'), $('<option>').val('bs').text("\\\\"), $('<option>').val("tick").text("\\'"), $('<option>').val("dtick").text("\\\""), $('<option>').val("qmark").text("\\?"));
        var rightSide = $('<div>', { class: 'col-sm-8 col-8' }).append($('<div>', { class: 'tab-content', id: 'nav-tabContent' }).append($('<div>', { class: 'tab-pane fade show active', id: 'list-home' }).attr('id', 'list-home').attr('role', 'tabpanel').append($('<strong>').text('Input Text'), $('<input>', { type: 'text', class: 'form-control mt-2', id: 'output-text-box' }), $('<div>', { class: 'col-sm-12 col-12 d-flex' }).append($('<div>', { class: 'col-sm-8 col-8 d-flex align-items-center' }).append($('<div>').append($('<input>', { type: 'checkbox', class: 'form-check-input', id: 'new-line-text' }), $('<label>', { class: 'form-check-label ms-2', for: 'new-line-text' }).text('Add new line'))), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-end' }).append($('<button>', { class: 'btn btn-primary mt-2', id: 'btn-edit-output' }).data('value', 'text').text('Update')))), $('<div>', { class: 'tab-pane fade', id: 'list-profile' }).attr('role', 'tabpanel').append($('<strong>').text('ASCII Code'), selectAscii, $('<div>', { class: 'col-sm-12 col-12 d-flex' }).append($('<div>', { class: 'col-sm-8 col-8 d-flex align-items-center' }).append($('<div>').append($('<input>', { type: 'checkbox', class: 'form-check-input', id: 'new-line-ascii' }), $('<label>', { class: 'form-check-label ms-2', for: 'new-line-ascii' }).text('Add new line'))), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-end' }).append($('<button>', { class: 'btn btn-primary mt-2', id: 'btn-edit-output' }).data('value', 'ascii').text('Update')))), $('<div>', { class: 'tab-pane fade', id: 'list-messages' }).attr('role', 'tabpanel').append($('<strong>').text('Escape Sequence'), selectEscape, $('<div>', { class: 'col-sm-12 col-12 d-flex' }).append($('<div>', { class: 'col-sm-8 col-8 d-flex align-items-center' }), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-end' }).append($('<button>', { class: 'btn btn-primary mt-2', id: 'btn-edit-output' }).data('value', 'escape').text('Update'))))));
        $('#pcInputContainer').append($('<div>', { class: 'row' }).append(leftSide, rightSide));
    }
    // Update Output Variable
    $(document).on('click', '#editOutputVariableBtn', function () {
        clearError();
        var variable = getSelectedOutputVariable();
        if (variable == undefined) {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $('#chosenOutputVariable').addClass('input-error');
        }
        else {
            var isNewLine = $('#new-line-variable').is(':checked');
            var statement = new OutputStatement_1.default(statementCount++, 1, isNewLine, 'variable', variable);
            if (returnClick.option.validateMainListStatement(listStatement, statement, clipboard, false)) {
                clipboard.variable = variable;
                clipboard.isNewLine = isNewLine;
            }
            else {
                createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
            }
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    // Update Output Text
    $(document).on('click', '#btn-edit-output', function () {
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
        clipboard.isNewLine = output.isNewLine;
        clipboard.type = output.type;
        clipboard.text = output.text;
        clipboard.asciiCode = output.asciiCode;
        clipboard.escapeSequence = output.escapeSequence;
        finishAction();
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    // Edit If-Else
    function createEditIfElse() {
        ifCount = 1;
        ifToBeValidated = [];
        isElsed = false;
        initInput('Edit Selection Properties');
        var ifOperations = clipboard.ifOperations;
        createIfSelection();
        $('#pcInputContainerLower').append($('<div>', { class: 'd-flex justify-content-end p-2 col-sm-12 col-12' }).append($('<div>', { class: 'col-sm-10 col-10' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'updateIfStatementButton' }).text('Update')));
        for (var i = 1; i < ifOperations.length; i++) {
            if (ifOperations[i] instanceof Elif_1.default)
                createAdditionalElif(false);
            else
                createElse(false);
        }
    }
    // Update If-Else
    $(document).on('click', '#updateIfStatementButton', function () {
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
            var oldIfOperations = clipboard.ifOperations;
            var tempChildStatement = [];
            if (isElsed)
                ifStatements.push(new Else_1.default(1, statementCount));
            ifStatement.updateIfOperations(ifStatements);
            if (returnClick.option.validateMainListStatement(listStatement, ifStatement, clipboard, false)) {
                for (var i = 0; i < oldIfOperations.length; i++) {
                    tempChildStatement = [];
                    if (oldIfOperations[i] instanceof If_1.default) {
                        if (oldIfOperations[i].childStatement != undefined) {
                            for (var j = 0; j < oldIfOperations[i].childStatement.length; j++)
                                tempChildStatement.push(oldIfOperations[i].childStatement[j]);
                        }
                    }
                    else {
                        if (oldIfOperations[i].childStatement != undefined) {
                            for (var j = 0; j < oldIfOperations[i].childStatement.length; j++)
                                tempChildStatement.push(oldIfOperations[i].childStatement[j]);
                        }
                    }
                    ifStatements[i].updateChildStatement(tempChildStatement);
                }
                clipboard.updateIfOperations(ifStatements);
            }
            else
                createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    // Edit Switch Statement
    // Update Repetition Statement
    $(document).on('click', '#update-loop-button', function () {
        clearError();
        var statement = createRepetitionStatement($(this).data('value'));
        if (statement == undefined)
            return;
        // validate chosen variable has been declared
        if (returnClick.option.validateMainListStatement(listStatement, statement, clipboard, false)) {
            if ($(this).data('value') == 'for') {
                clipboard.variable = statement.variable;
                clipboard.isIncrement = statement.isIncrement;
                clipboard.addValueBy = statement.addValueBy;
                clipboard.condition = statement.condition;
            }
            else {
                clipboard.firstCondition = statement.firstCondition;
                clipboard.logicalOperator = statement.logicalOperator;
                clipboard.secondCondition = statement.secondCondition;
            }
        }
        else
            createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
        finishAction();
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    $(document).on('click', '#update-asg-arithmetic-button', function () {
        clearError();
        var temp = true;
        var value;
        value = $('.selected-target-variable-asg').find('option').filter(':selected').val();
        if (value == '') {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $('.selected-target-variable-asg').addClass('input-error');
            return;
        }
        for (var i = 0; i < assignmentToBeValidated.length; i++) {
            temp = validateArithmeticAssignmentInput(assignmentToBeValidated[i]);
            if (!temp)
                return;
        }
        var assignmentStatement = createArithmeticStatement();
        if (returnClick.option.validateMainListStatement(listStatement, assignmentStatement, clipboard, false)) {
            clipboard.targetVariable = assignmentStatement.targetVariable;
            clipboard.type = assignmentStatement.type;
            clipboard.listArithmetic = assignmentStatement.listArithmetic;
            clipboard.listOperator = assignmentStatement.listOperator;
            clipboard.listIsCustom = assignmentStatement.listIsCustom;
            clipboard.variable = assignmentStatement.variable;
            clipboard.isCustomValue = assignmentStatement.isCustomValue;
            clipboard.start = assignmentStatement.start;
            clipboard.length = assignmentStatement.length;
        }
        else
            createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
        finishAction();
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    $(document).on('click', '#update-asg-string-button', function () {
        clearError();
        var statement = undefined;
        if ($('.choose-action-type').find('option').filter(':selected').val() == 'length')
            statement = createStringAssignmentLength();
        else
            statement = createStringAssignmentSub();
        if (statement != undefined) {
            if (returnClick.option.validateMainListStatement(listStatement, statement, clipboard, false)) {
                clipboard.targetVariable = statement.targetVariable;
                clipboard.type = statement.type;
                clipboard.listArithmetic = statement.listArithmetic;
                clipboard.listOperator = statement.listOperator;
                clipboard.listIsCustom = statement.listIsCustom;
                clipboard.variable = statement.variable;
                clipboard.isCustomValue = statement.isCustomValue;
                clipboard.start = statement.start;
                clipboard.length = statement.length;
            }
            else {
                createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
            }
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    $(document).on('click', '#update-asg-variable-button', function () {
        clearError();
        var statement = createVariableAssignment();
        if (statement != undefined) {
            if (returnClick.option.validateMainListStatement(listStatement, statement, clipboard, false)) {
                clipboard.targetVariable = statement.targetVariable;
                clipboard.type = statement.type;
                clipboard.listArithmetic = statement.listArithmetic;
                clipboard.listOperator = statement.listOperator;
                clipboard.listIsCustom = statement.listIsCustom;
                clipboard.variable = statement.variable;
                clipboard.isCustomValue = statement.isCustomValue;
                clipboard.start = statement.start;
                clipboard.length = statement.length;
            }
            else {
                createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
            }
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
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
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
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
        allVariableNames['i'] = true;
        allVariableNames['j'] = true;
        listInteger.push(variable);
        listInteger.push(variable2);
        var declareStatement = new DeclareStatement_1.default(statementCount++, 1, variable);
        var declareStatement2 = new DeclareStatement_1.default(statementCount++, 1, variable2);
        var forStatement = new ForStatement_1.default(1, statementCount++, undefined, variable, true, true, 1, new Condition_1.default(variable, '<', new Integer_1.default('x', 2), true));
        var nestedForStatement = new ForStatement_1.default(1, statementCount++, undefined, variable2, true, true, 1, new Condition_1.default(variable2, '<', new Integer_1.default('x', 3), true));
        var temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'i: '));
        temp.push(new OutputStatement_1.default(statementCount++, 1, false, 'variable', variable));
        temp.push(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, ' j: '));
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'variable', variable2));
        nestedForStatement.updateChildStatement(temp);
        temp = [];
        temp.push(nestedForStatement);
        forStatement.updateChildStatement(temp);
        handleAdd(declareStatement);
        handleAdd(declareStatement2);
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
        var secondCase = new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 2), true), undefined, false);
        var thirdCase = new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 3), true), undefined, false);
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
        allVariableNames['i'] = true;
        allVariableNames['j'] = true;
        listInteger.push(i);
        listInteger.push(j);
        var declareStatement = new DeclareStatement_1.default(statementCount++, 1, variable);
        var declareI = new DeclareStatement_1.default(statementCount++, 1, i);
        var declareJ = new DeclareStatement_1.default(statementCount++, 1, j);
        var outputStatement = new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'Input square size: ', undefined, undefined);
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
        handleAdd(declareI);
        handleAdd(declareJ);
        handleAdd(declareStatement);
        handleAdd(outputStatement);
        handleAdd(inputStatement);
        handleAdd(forStatement);
    }
    function oddEvenTemplate() {
        var variable = new Integer_1.default('number', 0);
        allVariableNames['number'] = true;
        listInteger.push(variable);
        var outputStatement = new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'Please input a number: ', undefined, undefined);
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
        listArithmetic.push(new Arithmetic_1.default(variable, new Integer_1.default('x', 2), undefined, undefined, '%', false, true));
        var assignmentStatement = new AssignmentStatement_1.default(statementCount++, 1, 'arithmetic', variable, listArithmetic, undefined, undefined, undefined, undefined, undefined, undefined);
        handleAdd(new DeclareStatement_1.default(statementCount++, 1, variable));
        handleAdd(outputStatement);
        handleAdd(new InputStatement_1.default(statementCount++, 1, variable));
        handleAdd(assignmentStatement);
        handleAdd(ifStatement);
    }
    // Source Code Logic
    var lastChosenLang = '';
    function clearSourceCode() {
        $('#source-code-container').val('');
    }
    $(document).on('click', '#btn-generate-source-code', function () {
        var language = $('.selected-programming-language').find('option').filter(':selected').val();
        lastChosenLang = language;
        var lang;
        if (language == 'c') {
            lang = new C_1.default(listStatement);
        }
        else if (language == 'cpp') {
            lang = new Cpp_1.default(listStatement);
        }
        else if (language == 'cs') {
            lang = new Cs_1.default(listStatement);
        }
        else if (language == 'java') {
            lang = new Java_1.default(listStatement);
        }
        else if (language == 'python') {
            lang = new Python_1.default(listStatement);
        }
        else {
            lang = new Pseudocode_1.default(listStatement);
        }
        $('#source-code-container').val('');
        $('#source-code-container').val(lang.generateSourceCode());
    });
    var fontSize = 14;
    $(document).on('click', '.change-font-size', function () {
        if ($(this).data('value') == 'plus') {
            if (fontSize == 40)
                return;
            $('#source-code-container').css('font-size', ++fontSize + 'px');
        }
        else {
            if (fontSize == 1)
                return;
            $('#source-code-container').css('font-size', --fontSize + 'px');
        }
        $('#font-size-input').val(fontSize);
    });
    $(document).on('change', '#font-size-input', function () {
        var temp = $('#font-size-input').val();
        var tempFontSize = parseInt(temp);
        if (isNaN(tempFontSize) || tempFontSize < 1 || tempFontSize > 40) {
            fontSize = 14;
            $('#source-code-container').css('font-size', fontSize + 'px');
            $('#font-size-input').val(fontSize);
        }
        else {
            fontSize = tempFontSize;
            $('#source-code-container').css('font-size', fontSize + 'px');
            $('#font-size-input').val(fontSize);
        }
    });
    // Manage project logic
    function parseJSON(object) {
        var statement;
        if (object.statement == 'declare') {
            statement = Object.assign(new DeclareStatement_1.default(undefined, undefined, undefined), object);
            statement.parseAttributes();
        }
        else if (object.statement == 'input') {
            statement = Object.assign(new InputStatement_1.default(undefined, undefined, undefined), object);
            statement.parseAttributes();
        }
        else if (object.statement == 'output') {
            statement = Object.assign(new OutputStatement_1.default(undefined, undefined, undefined, undefined), object);
            statement.parseAttributes();
        }
        else if (object.statement == 'assignment') {
            statement = Object.assign(new AssignmentStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
            statement.parseAttributes();
        }
        else if (object.statement == 'ifstatement') {
            statement = Object.assign(new IfStatement_1.default(undefined, undefined, undefined), object);
            statement.parseChild();
        }
        else if (object.statement == 'for') {
            statement = Object.assign(new ForStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
            statement.parseChild();
            statement.parseAttributes();
        }
        else if (object.statement == 'while') {
            statement = Object.assign(new WhileStatement_1.default(undefined, undefined, undefined, undefined, undefined), object);
            statement.parseChild();
            statement.parseAttributes();
        }
        else if (object.statement == 'switch') {
            statement = Object.assign(new SwitchStatement_1.default(undefined, undefined, undefined, undefined), object);
            statement.parseChild();
            statement.parseAttributes();
        }
        return statement;
    }
    function loadVariable(object) {
        var variable;
        if (object.type == 'int') {
            variable = Object.assign(new Integer_1.default(undefined, undefined), object);
            listInteger.push(variable);
        }
        else if (object.type == 'double') {
            variable = Object.assign(new Double_1.default(undefined, undefined), object);
            listDouble.push(variable);
        }
        else if (object.type == 'long') {
            variable = Object.assign(new Long_1.default(undefined, undefined), object);
            listLong.push(variable);
        }
        else if (object.type == 'float') {
            variable = Object.assign(new Float_1.default(undefined, undefined), object);
            listFloat.push(variable);
        }
        else if (object.type == 'char') {
            variable = Object.assign(new Char_1.default(undefined, undefined), object);
            listChar.push(variable);
        }
        else {
            variable = Object.assign(new String_1.default(undefined, undefined), object);
            listString.push(variable);
        }
        statementCount++;
        allVariableNames[variable.name] = true;
    }
    function clearVariableStatementData() {
        allVariableNames = {};
        listInteger = [];
        listFloat = [];
        listLong = [];
        listDouble = [];
        listChar = [];
        listString = [];
        statementCount = 0;
        listStatement = [];
    }
    $(document).on('click', '#create-project', function () {
        clearError();
        if ($('input[name=project_name').val() == '') {
            var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-danger').text("Project name can't be empty!");
            $('#pjMessageContainer').append(container);
            $('input[name=project_name').addClass('input-error');
            return;
        }
        var allVariables = getAllVariables();
        if ((allVariables == undefined || allVariables.length == 0) && (listStatement == undefined || listStatement.length == 0)) {
            var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-danger').text("Project is still empty!");
            $('#pjMessageContainer').append(container);
            return;
        }
        var jsonStatements = JSON.stringify(listStatement);
        var jsonVariables = JSON.stringify(allVariables);
        $.ajax({
            type: 'POST',
            url: '/decode/create',
            data: {
                _token: $('input[name=_token]').val(),
                user_id: $('input[name=_user_id]').val(),
                project_name: $('input[name=project_name').val(),
                project_statements: jsonStatements,
                project_variable: jsonVariables
            },
            success: function (data) {
                var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-success').text("Project successfully created!");
                $('#pjMessageContainer').append(container);
                window.location.reload();
            }
        });
    });
    $(document).on('click', '#load-project', function () {
        clearError();
        var id = $(this).data('value');
        $.ajax({
            type: 'POST',
            url: '/decode/load',
            data: {
                _token: $('input[name=_token]').val(),
                project_id: id
            },
            success: function (data) {
                clearVariableStatementData();
                var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-success').text("Project successfully loaded");
                $('#pjMessageContainer').append(container);
                var jsonProjectStatements = JSON.parse(data.project_statements);
                var jsonProjectVariables = JSON.parse(data.project_variable);
                for (var i = 0; i < jsonProjectVariables.length; i++)
                    loadVariable(jsonProjectVariables[i]);
                for (var i = 0; i < jsonProjectStatements.length; i++)
                    listStatement.push(parseJSON(jsonProjectStatements[i]));
                restructureStatement();
                drawCanvas();
            }
        });
    });
    $(document).on('click', '#save-project', function () {
        clearError();
        var project_id = $(this).data('value');
        var allVariables = getAllVariables();
        if ((allVariables == undefined || allVariables.length == 0) && (listStatement == undefined || listStatement.length == 0)) {
            var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-danger').text("Nothing to save");
            $('#pjMessageContainer').append(container);
            return;
        }
        var jsonStatements = JSON.stringify(listStatement);
        var jsonVariables = JSON.stringify(allVariables);
        $.ajax({
            type: 'POST',
            url: '/decode/save',
            data: {
                _token: $('input[name=_token]').val(),
                project_id: project_id,
                project_statements: jsonStatements,
                project_variables: jsonVariables
            },
            success: function (data) {
                var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-success').text("Project saved!");
                $('#pjMessageContainer').append(container);
            }
        });
    });
    $(document).on('click', '.delete-project', function () {
        clearError();
        $('.modal-body').text($(this).parent().parent().find('td').text() + ' will be deleted. Do you want to proceed?');
        $('.confirm-delete-btn').data('value', $(this).data('value'));
    });
    $(document).on('click', '.confirm-delete-btn', function () {
        var project_id = $(this).data('value');
        $('.project-container-' + project_id).remove();
        $.ajax({
            type: 'POST',
            url: '/decode/delete',
            data: {
                _token: $('input[name=_token]').val(),
                project_id: project_id,
            },
            success: function (data) {
                var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-success').text("Project deleted");
                $('#pjMessageContainer').append(container);
                initInput('Program Input');
            }
        });
    });
    var path = window.location.href;
    // Download Source Code
    $(document).on('click', '#download-source-code', function () {
        clearError();
        var source_code = $('#source-code-container').val();
        if (source_code == '' || source_code == undefined || source_code.length == 0) {
            createErrorMessage('Source code is empty!', 'resultErrorContainer');
            return;
        }
        var flag = false;
        for (var i = 0; i < source_code.length; i++) {
            if (source_code[i] != ' ') {
                flag = true;
                break;
            }
        }
        if (!flag) {
            createErrorMessage('Source code is empty!', 'resultErrorContainer');
            return;
        }
        $.ajax({
            type: 'POST',
            url: '/decode/download',
            data: {
                _token: $('input[name=_token]').val(),
                source_code: source_code
            },
            success: function (data) {
                var container = $('<div></div>').addClass('col-12 col-sm-12 alert alert-success').text("Source code downloaded!");
                $('#resultErrorContainer').append(container);
                window.location.href = path + '/download/client/' + lastChosenLang;
            }
        });
    });
    $(document).on('click', '.generateTemplate', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $('#block-code-canvas').offset().top
        }, 300);
    });
    $(document).on('click', '#btn-generate-source-code', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $('#source-code-container').offset().top
        }, 300);
    });
});
