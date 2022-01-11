import Integer from '../classes/variable/Integer'
import Long from '../classes/variable/Long'
import Float from '../classes/variable/Float'
import Double from '../classes/variable/Double'
import Char from '../classes/variable/Char'
import String from '../classes/variable/String'
import DeclareStatement from '../classes/statement/DeclareStatement'
import IfStatement from '../classes/statement/IfStatement'
import If from '../classes/statement/helper/ifs/If'
import Elif from '../classes/statement/helper/ifs/Elif'
import Condition from '../classes/statement/helper/general/Condition'
import Canvas from '../classes/canvas/Canvas'
import ReturnClick from '../utilities/ReturnClick'
import Statement from '../classes/statement/Statement'
import Else from '../classes/statement/helper/ifs/Else'
import ReturnPaste from '../utilities/ReturnPaste'
import ForStatement from '../classes/statement/ForStatement'
import SwitchStatement from '../classes/statement/SwitchStatement'
import Case from '../classes/statement/helper/case/Case'
import WhileStatement from '../classes/statement/WhileStatement'
import Option from '../classes/statement/helper/options/Option'
import Variable from '../classes/variable/Variable'
import InputStatement from '../classes/statement/InputStatement'
import ReturnClone from '../utilities/ReturnClone'
import OutputStatement from '../classes/statement/OutputStatement'
import AssignmentStatement from '../classes/statement/AssignmentStatement'
import Return from '../utilities/Return'
import Arithmetic from '../classes/statement/helper/assignment/Arithmetic'
import C from '../classes/languages/C'
import Java from '../classes/languages/Java'
import Python from '../classes/languages/Python'
import Cs from '../classes/languages/Cs'
import Cpp from '../classes/languages/Cpp'
import Language from '../classes/languages/Language'
declare var bootstrap: any

$(document).ready(function() {

    // Before insert variable
    var declareVariableNameList: any[]
    var declareVariableValueList: any[]
    var variableIndex = 0

    // All declared variable names
    var allVariableNames: {[index: string]: any} = {}

    // Declared variables
    var listInteger: Variable[] = []
    var listFloat: Variable[] = []
    var listLong: Variable[] = []
    var listDouble: Variable[] = []
    var listChar: Variable[] = []
    var listString: Variable[] = []

    // Statement
    var statementCount = 0

    // Declared statements
    var listStatement: any[] = []

    // Helper Functions
    function createHint(text: string, length: number) {
        let className = "col-sm-" + length 
        let className2 = 'col-' + length
        let strong = $('<strong></strong>').text(text)
        let div = $('<div></div>').addClass(className).addClass(className2).css('color', 'black').addClass('align-items-center')
        div.append(strong)

        return div
    }

    function createInputField(inputType: string) {
        return $('<input></input>').attr({ type: inputType }).addClass('form-control')
    }

    function createCloseBtn() {
        return $('<button></button>').addClass('btn-close').addClass('rmDeclare')
    }

    function createWhiteSpace(length: number) { 
        return $('<div></div>').addClass('col-sm-' + length).addClass('col-' + length)
    }

    function createDeclareDataVariable(isRequired: boolean, isNumber: boolean) {
        let container = $('<div></div>').addClass('col-sm-12').addClass('col-12')
        let hintContainer = $('<div></div>').addClass('col-sm-12').addClass('col-12').addClass('mb-2').addClass('d-flex')
        hintContainer.append(createHint('Variable Name', 5))
        hintContainer.append(createWhiteSpace(1))
        hintContainer.append(createHint('Initial Value', 5))
        
        let inputContainer = $('<div></div>').addClass('col-sm-12').addClass('col-12').addClass('mb-4').addClass('d-flex').addClass('align-items-center')
        let variableClassName = 'var-name-' + variableIndex
        let inputClassName = 'input-val-' + variableIndex
        let container1 = $('<div></div>').addClass('col-sm-5').addClass('col-5')
        let container2 = $('<div></div>').addClass('col-sm-5').addClass('col-5')
        let container3 = $('<div></div>').addClass('col-sm-1').addClass('col-1').addClass('d-flex').addClass('justify-content-center')
        container1.append(createInputField('text').addClass(variableClassName))
        if(isNumber)
            container2.append(createInputField('number').addClass(inputClassName))
        else
            container2.append(createInputField('text').addClass(inputClassName))
        container3.append(createCloseBtn().data('value', variableIndex++))

        declareVariableNameList.push(variableClassName)
        declareVariableValueList.push(inputClassName)

        inputContainer.append(container1)
        inputContainer.append(createWhiteSpace(1))
        inputContainer.append(container2)
        if(!isRequired)
            inputContainer.append(container3)

        container.append(hintContainer)
        container.append(inputContainer)

        $('#pcInputContainer').append(container)
    }

    function createSelect(listVariable: Variable[], length: number, isAllVariable?: boolean) {
        let className = 'col-sm-' + length
        let className2 = 'col-' + length
        let container = $('<div></div>').addClass(className).addClass(className2)
        let select = $('<select></select>').addClass('form-select').addClass('col-sm-12').addClass('col-12')
        let option

        select.append($('<option></option>').val(null).text('Choose Variable'))

        for(let variable of listVariable) {
            if(!isAllVariable)
                option = $('<option></option>').val(variable.name).text(variable.name)
            else {
                let dataType: string
                if(variable instanceof Integer)
                    dataType = 'Integer'
                else if(variable instanceof Long)
                    dataType = 'Long'
                else if(variable instanceof Float)
                    dataType = 'Float'
                else if(variable instanceof Double)
                    dataType = 'Double'
                else if(variable instanceof Char)
                    dataType = 'Char'
                else
                    dataType = 'String'
                option = $('<option></option>').val(variable.name).text(variable.name + ' (' + dataType + ')')
            }
                
            select.append(option)
        }

        container.append(select)

        return container
    }

    function clearError() {
        $('#pcInputErrorContainer').empty()

        for(let varName of declareVariableNameList)
            $('.' + varName).removeClass('input-error')

        for(let varValue of declareVariableValueList)
            $('.' + varValue).removeClass('input-error')

        for(let i = 0; i < caseToBeValidated.length; i++) 
            $('.' + caseToBeValidated[i]).removeClass('input-error')

        for(let i = 0; i < assignmentToBeValidated.length; i++) {
            $('.first-value-' + assignmentToBeValidated[i]).find('select').removeClass('input-error')
            $('.first-value-' + assignmentToBeValidated[i]).removeClass('input-error')
            $('.second-value-' + assignmentToBeValidated[i]).find('select').removeClass('input-error')
            $('.second-value-' + assignmentToBeValidated[i]).removeClass('input-error')
        }

        $('#chosenVariable').removeClass('input-error')
        $('#chosenOutputVariable').removeClass('input-error')
        $('#chosenSwitchVariable').removeClass('input-error')
        $('#chosen-for-loop-variable').removeClass('input-error')
        $('#chosen-for-loop-value').removeClass('input-error')
        $('#update-value-for-loop').removeClass('input-error')
        $('#chosen-asg-variable').removeClass('input-error')
        $('.selected-target-variable-asg').removeClass('input-error')
        $('.first-asg-string-value').find('select').removeClass('input-error')
        $('.second-asg-string-value').find('select').removeClass('input-error')
        $('.begin-idx-string').removeClass('input-error')
        $('.length-idx-string').removeClass('input-error')

        for(let i = 0; i < ifToBeValidated.length; i++) {
            $('#first-if-select-first-variable-' + ifToBeValidated[i]).removeClass('input-error')
            $('#first-if-input-second-variable-' + ifToBeValidated[i]).removeClass('input-error')
            $('#first-if-select-second-variable-' + ifToBeValidated[i]).removeClass('input-error')
            $('#second-if-select-first-variable-' + ifToBeValidated[i]).removeClass('input-error')
            $('#second-if-input-second-variable-' + ifToBeValidated[i]).removeClass('input-error')
            $('#second-if-select-second-variable-' + ifToBeValidated[i]).removeClass('input-error')
        }
    }

    function initInput(title: string) {
        $('#pcInputErrorContainer').empty()
        $('#pcInputContainer').empty()
        $('#pcInputContainerLower').empty()
        $('#command-name').text(title)

        declareVariableNameList = []
        declareVariableValueList = []
        variableIndex = 0
    }

    function createErrorMessage(message: string, targetClass: string) {
        let container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-danger').text(message)
        targetClass = '#' + targetClass
        $(targetClass).append(container)
    }

    function insertToVariableList() {
        for(let i = 0; i < declareVariableNameList.length; i++) {
            let variableName: string
            variableName = $('.' + declareVariableNameList[i]).val() as string
            let variableValue: string
            variableValue = $('.' + declareVariableValueList[i]).val() as string

            allVariableNames[variableName] = true
            let variable: any

            if($('#createVariableBtn').data('value') == 'int') {
                variable = new Integer(variableName, variableValue)
                listInteger.push(variable)
            }
            else if($('#createVariableBtn').data('value') == 'long') {
                variable = new Long(variableName, variableValue)
                listLong.push(variable)
            }
            else if($('#createVariableBtn').data('value') == 'float') {
                variable = new Float(variableName, variableValue)
                listFloat.push(variable)
            }
            else if($('#createVariableBtn').data('value') == 'double') {
                variable = new Double(variableName, variableValue)
                listDouble.push(variable)
            }
            else if($('#createVariableBtn').data('value') == 'char') {
                variable = new Char(variableName, variableValue)
                listChar.push(variable)
            }
            else if($('#createVariableBtn').data('value') == 'string') {
                variable = new String(variableName, variableValue)
                listString.push(variable)
            }
            
            handleAdd(new DeclareStatement(statementCount++, 1, variable))
        }
    }

    function getVariable(listVariable: Variable[], variableName: string): Variable | undefined {
        for(let i = 0 ; i < listVariable.length; i++) {
            if(listVariable[i].name == variableName)
                return listVariable[i]
        }

        return undefined
    }

    function cloneStatement(statement: Statement): Statement | undefined {       
        if(statement instanceof DeclareStatement) {
            createErrorMessage('Could not copy declare statement!', 'bcErrorContainer')
            return undefined 
        }
        else {
            let returnClone: ReturnClone
            returnClone = statement.cloneStatement(statementCount++)
            if(returnClone.result == false) {
                createErrorMessage('Could not copy declare statement!', 'bcErrorContainer')
                return undefined
            }
            else
                return returnClone.statement
        }
    }

    // Declare Variable
    $(document).on('click', '.addVariableDeclareBtn', function() { 
        if($(this).data('value') == false)
            createDeclareDataVariable(false, false)
        else
            createDeclareDataVariable(false, true)
    })

    $(document).on('click', '.rmDeclare', function() {
        var varName = 'var-name-' + $(this).data('value')
        var varVal = 'input-val-' + $(this).data('value')
        
        declareVariableNameList.splice(declareVariableNameList.indexOf(varName), 1)
        declareVariableValueList.splice(declareVariableValueList.indexOf(varVal), 1)

        $(this).parent().parent().parent().remove()
    })

    // Click declare variable button
    $('.declareVariable').on('click', function() {
        let isNumericValue

        if($(this).data('value') == 'int')
            initInput('Declare Integer')
        else if($(this).data('value') == 'long')
            initInput('Declare Long')
        else if($(this).data('value') == 'float')
            initInput('Declare Float')
        else if($(this).data('value') == 'double')
            initInput('Declare Double')
        else if($(this).data('value') == 'char')
            initInput('Declare Char')
        else if($(this).data('value') == 'string')
            initInput('Declare String')
        
        if($(this).data('value') == 'string' || $(this).data('value') == 'char') {
            createDeclareDataVariable(true, false)
            isNumericValue = false
        }
        else {
            createDeclareDataVariable(true, true)
            isNumericValue = true
        }

        let btn = createGreenButton('Variable').addClass('col-sm-3 col-3 addVariableDeclareBtn').data('value', isNumericValue)
        let createBtn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-2').
                            addClass('col-2').attr('id', 'createVariableBtn').data('value', $(this).data('value')).text('Create')

        $('#pcInputContainerLower').append(btn)
        $('#pcInputContainerLower').append($('<div></div>').addClass('col-sm-7').addClass('col-7'))
        $('#pcInputContainerLower').append(createBtn)
    })

    // Click create variable button
    $(document).on('click', '#createVariableBtn', function() {
        clearError()
        let variableName: any
        let variableValue: any
        let tempAllVariableNames: {[index: string]:any} = {}

        for(let i = 0; i < declareVariableNameList.length; i++) { 
            variableName = $('.' + declareVariableNameList[i]).val()
            variableValue = $('.' + declareVariableValueList[i]).val()

            let variable
            if($('#createVariableBtn').data('value') == 'int')
                variable = new Integer(variableName, variableValue)
            else if($('#createVariableBtn').data('value') == 'long')
                variable = new Long(variableName, variableValue)
            else if($('#createVariableBtn').data('value') == 'float')
                variable = new Float(variableName, variableValue)
            else if($('#createVariableBtn').data('value') == 'double')
                variable = new Double(variableName, variableValue)
            else if($('#createVariableBtn').data('value') == 'char')
                variable = new Char(variableName, variableValue)
            else 
                variable = new String(variableName, variableValue)

            let returnName = variable.validateName()
            let returnValue = variable.validateValue()
            let tempSameVariableName = tempAllVariableNames[variableName] ? true : false
            let sameVariableName = allVariableNames[variableName] ? true : false

            if(tempSameVariableName) {
                $('.' + declareVariableNameList[i]).addClass('input-error')
                createErrorMessage('Variable name must be unique', 'pcInputErrorContainer')
                return
            }
            else
                tempAllVariableNames[variableName] = true

            if(!returnName.bool) {
                $('.' + declareVariableNameList[i]).addClass('input-error')
                createErrorMessage(returnName.message, 'pcInputErrorContainer')
                return
            }

            if(sameVariableName) {
                $('.' + declareVariableNameList[i]).addClass('input-error')
                createErrorMessage('Variable name has been declared before', 'pcInputErrorContainer')
                return
            }

            if(!returnValue.bool) {
                $('.' + declareVariableValueList[i]).addClass('input-error')
                createErrorMessage(returnValue.message, 'pcInputErrorContainer')
                return
            }
        }
        
        // Insert every declared variable and declare statement instance to list
        insertToVariableList()
        // Push statement to canvas
        restructureStatement()
        turnOffOptions()
        clearSourceCode()
        initInput('Program Input')
        drawCanvas()
    })

    // Click input variable button
    $(document).on('click', '.inputVariable', function() {
        let listVariable: Variable[]

        if($(this).data('value') == 'int') {
            initInput('Input Integer')
            listVariable = listInteger
        }
        else if($(this).data('value') == 'long') {
            initInput('Input Long')
            listVariable = listLong
        }
        else if($(this).data('value') == 'float') {
            initInput('Input Float')
            listVariable = listFloat
        }
        else if($(this).data('value') == 'double') {
            initInput('Input Double')
            listVariable = listDouble
        }
        else if($(this).data('value') == 'char') {
            initInput('Input Char')
            listVariable = listChar
        }
        else if($(this).data('value') == 'string') {
            initInput('Input String')
            listVariable = listString
        }

        let container = $('<div></div>').addClass('d-flex').addClass('align-items-center')
        let select = createSelect(listVariable, 7).attr('id', 'chosenVariable')

        container.append(createHint('Variable Name', 5))
        container.append(select)
        container.addClass('mb-3')
        $('#pcInputContainer').append(container)

        let inputBtn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-2').
                            addClass('col-2').attr('id', 'inputVariableBtn').data('value', $(this).data('value')).text('Select')

        $('#pcInputContainerLower').append($('<div></div>').addClass('col-sm-10').addClass('col-10'))
        $('#pcInputContainerLower').append(inputBtn)
    })

    // Click select input variable button
    $(document).on('click', '#inputVariableBtn', function() {
        clearError()

        if($('#chosenVariable').find('option').filter(':selected').val() == '') {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer')
            $('#chosenVariable').addClass('input-error')
        }
        else {
            let variableName = $('#chosenVariable').find('option').filter(':selected').val() as string
            let variable: Variable | undefined = undefined
            let statement: Statement

            if($('#inputVariableBtn').data('value') == 'int') 
                variable = getVariable(listInteger, variableName)
            else if($('#inputVariableBtn').data('value') == 'long')
                variable = getVariable(listLong, variableName)
            else if($('#inputVariableBtn').data('value') == 'float') 
                variable = getVariable(listFloat, variableName)
            else if($('#inputVariableBtn').data('value') == 'double') 
                variable = getVariable(listDouble, variableName)
            else if($('#inputVariableBtn').data('value') == 'char') 
                variable = getVariable(listChar, variableName)
            else 
                variable = getVariable(listString, variableName)
            
            if(variable != undefined) {
                statement = new InputStatement(statementCount++, 1, variable)
                handleAdd(statement)
                restructureStatement()
                turnOffOptions()
                clearSourceCode()
                initInput('Program Input')
                drawCanvas()
            }
        }
    })

    // Click template button
    $(document).on('click', '.generateTemplate', function() {
        initInput('Program Input')
        clearSourceCode()
        blankTemplate()
        if($(this).data('value') == 'blank')
            blankTemplate()
        else if($(this).data('value') == 'declare')
            declareVariableTemplate()
        else if($(this).data('value') == 'print')
            simplyPrintTemplate()
        else if($(this).data('value') == 'io')
            inputOutputTemplate() 
        else if($(this).data('value') == 'nestedif')
            nestedIfTemplate()
        else if($(this).data('value') == 'nestedfor')
            nestedForTemplate()
        else if($(this).data('value') == 'menu')
            menuTemplate()
        else if($(this).data('value') == 'drawsquare')
            drawSquareTemplate()
        else if($(this).data('value') == 'oddeven')
            oddEvenTemplate()

        finishAction()
        restructureStatement()
        turnOffOptions()
        clearSourceCode()
        initInput('Program Input')
        drawCanvas()
    })

    function deleteVariable(variable: Variable): void {
        allVariableNames[variable.name] = false
        if(variable instanceof Integer)
            listInteger.splice(listInteger.indexOf(variable), 1)
        else if(variable instanceof Long) 
            listLong.splice(listLong.indexOf(variable), 1)
        else if(variable instanceof Float) 
            listFloat.splice(listFloat.indexOf(variable), 1)
        else if(variable instanceof Double) 
            listDouble.splice(listDouble.indexOf(variable), 1)
        else if(variable instanceof Char) 
            listChar.splice(listChar.indexOf(variable), 1)
        else 
            listString.splice(listString.indexOf(variable), 1)
    }

    function findVariable(variableName: string): Variable | undefined {
        let tempList = getAllVariables()
        for(let i = 0; i < tempList.length; i++)
            if(tempList[i].name == variableName)
                return tempList[i]
        
        return undefined
    }

    // Click output
    $(document).on('click', '.output', function() {
        if($(this).data('value') == 'variable') {
            initInput('Output Variable')
            let listVariable: Variable[] = getAllVariables()
            let container = $('<div></div>').addClass('d-flex').addClass('align-items-center')
            let select = createSelect(listVariable, 7, true).attr('id', 'chosenOutputVariable')

            container.append(createHint('Variable Name', 5))
            container.append(select)
            container.addClass('mb-3')
            $('#pcInputContainer').append(container)

            let inputBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'outputVariableBtn').data('value', $(this).data('value')).text('Select')
            let btmContainer = 
            $('<div>', {class: 'col-sm-12 col-12 d-flex justify-content-evenly align-items-center'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}),
                $('<div>', {class: 'col-sm-5 col-5 d-flex align-items-center'}).append(
                    $('<input>', {class: 'form-check-input col-sm-1 col-1 d-flex align-items-center', type: 'checkbox', id: 'new-line-variable'}),
                    $('<label>', {class: 'form-check-label col-sm-11 col-11 d-flex align-items-center ms-2', for: 'new-line-variable'}).text('Add new line')
                ),
                inputBtn
            )
            $('#pcInputContainerLower').append(btmContainer)

        }
        else {
            initInput('Output Text')
            createOutputTextSelection()
        }
    })

    function createOutputTextSelection(): void {
        let row = $('<div></div>').addClass('row')
        let leftSide = $('<div></div>').addClass('col-sm-4').addClass('col-4').addClass('mb-2')
        let rightSide = $('<div></div>').addClass('col-sm-8').addClass('col-8')
        let listGroup = $('<div></div>').addClass('list-group').attr('id', 'list-tab').attr('role', 'tablist')
        let listGroupItem1 = $('<a></a>').addClass('list-group-item').addClass('list-group-item-action').addClass('active').attr('id', 'list-home-list').attr('data-bs-toggle', 'list').attr('href', '#list-home').text('Text')
        let listGroupItem2 = $('<a></a>').addClass('list-group-item').addClass('list-group-item-action').attr('id', 'list-profile-list').attr('data-bs-toggle', 'list').attr('href', '#list-profile').text('ASCII Code')
        let listGroupItem3 = $('<a></a>').addClass('list-group-item').addClass('list-group-item-action').attr('id', 'list-messages-list').attr('data-bs-toggle', 'list').attr('href', '#list-messages').text('Escape Sequence')

        listGroup.append(listGroupItem1)
        listGroup.append(listGroupItem2)
        listGroup.append(listGroupItem3)
        leftSide.append(listGroup)

        let tabContent = $('<div></div>').addClass('tab-content').attr('id', 'nav-tabContent')
        let tabPane1 = $('<div></div>').addClass('tab-pane fade show active').attr('id', 'list-home').attr('role', 'tabpanel')
        let tabPane2 = $('<div></div>').addClass('tab-pane fade').attr('id', 'list-profile').attr('role', 'tabpanel')
        let tabPane3 = $('<div></div>').addClass('tab-pane fade').attr('id', 'list-messages').attr('role', 'tabpanel')

        let desc1 = $('<strong></strong>').text('Input Text')
        let desc2 = $('<strong></strong>').text('ASCII Code')
        let desc3 = $('<strong></strong>').text('Escape Sequence')

        let inputText = $('<input>').attr('type', 'text').addClass('form-control').addClass('mt-2').attr('id', 'output-text-box')
        let selectEscape = $('<select></select>').addClass('form-select').addClass('mt-2').attr('id', 'select-escape-seq')
        selectEscape.append($('<option></option>').val('a').text('\\a'))
        selectEscape.append($('<option></option>').val('b').text('\\b'))
        selectEscape.append($('<option></option>').val('f').text('\\f'))
        selectEscape.append($('<option></option>').val('n').text('\\n'))
        selectEscape.append($('<option></option>').val('r').text('\\r'))
        selectEscape.append($('<option></option>').val('t').text('\\t'))
        selectEscape.append($('<option></option>').val('v').text('\\v'))
        selectEscape.append($('<option></option>').val('bs').text(`\\\\`))
        selectEscape.append($('<option></option>').val(`tick`).text(`\\'`))
        selectEscape.append($('<option></option>').val(`dtick`).text(`\\"`))
        selectEscape.append($('<option></option>').val(`qmark`).text(`\\?`))

        let selectAscii = $('<select></select>').addClass('form-select').addClass('mt-2').attr('id', 'select-ascii-code')
        for(let i = 0; i <= 255; i++) 
            selectAscii.append($('<option></option>').val(i).text(i))
        
        let container1 = $('<div></div>').addClass('col-sm-12').addClass('col-12').addClass('d-flex')
        let container2 = $('<div></div>').addClass('col-sm-12').addClass('col-12').addClass('d-flex')
        let container3 = $('<div></div>').addClass('col-sm-12').addClass('col-12').addClass('d-flex')

        let leftContainer1 = $('<div></div>').addClass('col-sm-8').addClass('col-8').addClass('d-flex').addClass('align-items-center')
        let placeholder1 = $('<div></div>')
        let cb1 = $('<input>').attr('type', 'checkbox').addClass('form-check-input').attr('id', 'new-line-text')
        let lbl1 = $('<label></label>').addClass('form-check-label').addClass('ms-2').attr('for', 'new-line-text').text('Add new line')

        let leftContainer2 = $('<div></div>').addClass('col-sm-8').addClass('col-8').addClass('d-flex').addClass('align-items-center')
        let placeholder2 = $('<div></div>')
        let cb2 = $('<input>').attr('type', 'checkbox').addClass('form-check-input').attr('id', 'new-line-ascii')
        let lbl2 = $('<label></label>').addClass('form-check-label').addClass('ms-2').attr('for', 'new-line-ascii').text('Add new line')

        let innerContainer1 = $('<div></div>').addClass('col-sm-4').addClass('col-4').addClass('d-flex').addClass('justify-content-end')
        let innerContainer2 = $('<div></div>').addClass('col-sm-4').addClass('col-4').addClass('d-flex').addClass('justify-content-end')
        let innerContainer3 = $('<div></div>').addClass('col-sm-4').addClass('col-4').addClass('d-flex').addClass('justify-content-end')

        let btn1 = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('mt-2').text('Create').attr('id', 'btn-submit-output').data('value', 'text')
        let btn2 = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('mt-2').text('Create').attr('id', 'btn-submit-output').data('value', 'ascii')
        let btn3 = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('mt-2').text('Create').attr('id', 'btn-submit-output').data('value', 'escape')

        innerContainer1.append(btn1)
        placeholder1.append(cb1)
        placeholder1.append(lbl1)
        leftContainer1.append(placeholder1)
        container1.append(leftContainer1)
        container1.append(innerContainer1)
        tabPane1.append(desc1)
        tabPane1.append(inputText)
        tabPane1.append(container1)

        innerContainer2.append(btn2)
        placeholder2.append(cb2)
        placeholder2.append(lbl2)
        leftContainer2.append(placeholder2)
        container2.append(leftContainer2)
        container2.append(innerContainer2)
        tabPane2.append(desc2)
        tabPane2.append(selectAscii)
        tabPane2.append(container2)

        innerContainer3.append(btn3)
        container3.append($('<div></div>').addClass('col-sm-8').addClass('col-8'))
        container3.append(innerContainer3)
        tabPane3.append(desc3)
        tabPane3.append(selectEscape)
        tabPane3.append(container3)

        tabContent.append(tabPane1)
        tabContent.append(tabPane2)
        tabContent.append(tabPane3)
        rightSide.append(tabContent)

        row.append(leftSide)
        row.append(rightSide)
        $('#pcInputContainer').append(row)
    }

    let ifCount: number = 1
    let ifToBeValidated: number[] = []
    let isElsed: boolean = false

    $(document).on('click', '.selection', function() {
        ifCount = 1 
        if($(this).data('value') == 'if-else') {
            initInput('Selection Properties')
            createIfSelection()
        }
        else {
            initInput('Switch Properties')
            createSwitchSelection()
        }
    })

    function createGreenButton(text: string) {
        let container = $('<div></div>').addClass('btn d-flex align-items-center justify-content-center bg-success p-2 text-white bg-opacity-75 p-2 mt-2')
        let icon = $('<i></i>').addClass('fas fa-plus me-2')
        let word = $('<div></div>').text(text)

        container.append(icon)
        container.append(word)
        
        return container
    }

    function createSwitchSelection() {
        let listVariable: Variable[] = []
        listVariable = getSelectedVariables('switch')

        let container = $('<div></div>').addClass('d-flex').addClass('align-items-center')
        let select = createSelect(listVariable, 7, true).attr('id', 'chosenSwitchVariable')

        container.append(createHint('Variable', 5))
        container.append(select)
        container.addClass('mb-3')

        let allCaseContainer = $('<div></div>').addClass('all-case-container')
        $('#pcInputContainer').append(container)
        $('#pcInputContainer').append(allCaseContainer)

        createAdditionalSwitchButton()
    }

    let caseToBeValidated: string[] = []
    let caseCount: number = 1
    let isDefaulted: boolean = false

    $(document).on('click', '#createSwitchCaseBtn', function() {
        clearError()
        let variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val() as string
        if(variableName == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer')
        }
        else {
            let variable = findVariable(variableName)
            createCaseStatement(variable)
        }
    })

    function createCaseStatement(variable: Variable) {
        let value: string = ''
        let tempVariable: Variable | undefined = undefined
        let proceed: boolean = true
        let caseStatement: Statement[] = []
        let result: Return
        let className: string = ''
        
        for(let i = 0 ; i < caseToBeValidated.length; i++) {
            className = '.' + caseToBeValidated[i]
            value = $(className).val() as string
            if(value == undefined) {
                $(className).addClass('input-error')
                createErrorMessage('Field cannot be empty!', 'pcInputErrorContainer')
                proceed = false
                break
            }

            tempVariable = createVariableFromValue(value)
            
            if(tempVariable instanceof String) {
                $(className).addClass('input-error')
                createErrorMessage('Could not compare with String data type', 'pcInputErrorContainer')
                proceed = false
                break
            }

            result = tempVariable.validateValue()
            if(!result.bool) {
                $(className).addClass('input-error')
                createErrorMessage(result.message, 'pcInputErrorContainer')
                proceed = false
                break
            }

            caseStatement.push(new Case(1, statementCount++, new Condition(variable, '==', tempVariable, true), undefined, false))
        }

        if(proceed) {
            if(isDefaulted) {
                caseStatement.push(new Case(1, statementCount++, new Condition(variable, '==', variable, true), undefined, true))
            }
            let switchStatement = new SwitchStatement(1, statementCount++, variable, undefined)
            switchStatement.updateCaseStatement(caseStatement)
            handleAdd(switchStatement)
            restructureStatement()
            turnOffOptions()
            clearSourceCode()
            initInput('Program Input')
            drawCanvas()
        }
    }

    $(document).on('change', '#chosenSwitchVariable', function() {
        clearError()
        $('.all-case-container').empty()
        caseToBeValidated = []
        isDefaulted = false
        caseCount = 1

        let variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val() as string
        if(variableName != '') {
            let variable = findVariable(variableName)
            createCaseStatementInput(true, false, variable)
        }
    })

    $(document).on('click', '.add-additional-case-btn', function() {
        clearError()
        if(!isDefaulted) {
            let variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val() as string
            if(variableName == '') {
                $('#chosenSwitchVariable').addClass('input-error')
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer')
            }
            else {
                let variable = findVariable(variableName)
                createCaseStatementInput(false, false, variable)
            }
        }
        else {
            createErrorMessage('Could not add Case after Default' ,'pcInputErrorContainer')
        }
    })

    $(document).on('click', '.add-default-btn', function() {
        clearError()
        if(!isDefaulted) {
            let variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val() as string
            if(variableName == '') {
                $('#chosenSwitchVariable').addClass('input-error')
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer')
            }
            else {
                let variable = findVariable(variableName)
                createCaseStatementInput(false, true, variable)
                isDefaulted = true
            }
        }
        else {
            createErrorMessage('Could not add more Default' ,'pcInputErrorContainer')
        }
    })

    $(document).on('click', '.rmCase', function() {
        clearError()
        let targetId = $(this).data('value')
        let targetClass = '.additional-case-container-' + targetId
        let idx = caseToBeValidated.indexOf('case-input-' + targetId)
        caseToBeValidated.splice(idx, 1)
        if($(targetClass).find('div').find('strong').text() == 'Default:')
            isDefaulted = false
        $(targetClass).remove()
    })

    function createCaseStatementInput(isRequired: boolean, isDefault: boolean, variable: Variable) {
        let className = 'additional-case-container-' + caseCount
        let inputClassName = 'case-input-' + caseCount
        let container = $('<div></div>').addClass('col-sm-12 col-12 mb-2 d-flex justify-content-center align-items-center ' + className)
        let startContainer = $('<div></div>').addClass('col-sm-2 col-2 d-flex justify-content-end')
        let leftContainer = $('<div></div>').addClass('col-sm-4 col-4 d-flex justify-content-center').text(variable.name)
        let mid = $('<div></div>').addClass('col-sm-1 col-1 d-flex align-items-center').text('==')
        let rightContainer = $('<div></div>').addClass('col-sm-3 col-3')
        let textField = $('<input>').attr('type', 'text').addClass('form-control ' + inputClassName)
        let endContainer = $('<div></div>').addClass('col-sm-1 col-1 d-flex justify-content-center')
        let buttonClose = $('<button></button>').addClass('btn-close rmCase').data('value', caseCount++)

        if(!isDefault) {
            startContainer.append($('<strong></strong>').text('Case:'))
            caseToBeValidated.push(inputClassName)
        }
        else {
            startContainer.append($('<strong></strong>').text('Default:'))
            textField.attr('disabled', 'true')
        }
        if(!isRequired)
            endContainer.append(buttonClose)

        rightContainer.append(textField)
        container.append(startContainer)
        container.append(leftContainer)
        container.append(mid)
        container.append(rightContainer)
        container.append(endContainer)

        $('.all-case-container').append(container)
    }

    function createAdditionalSwitchButton() {
        let addCaseBtn = createGreenButton('Case').addClass('col-sm-3 col-3 add-additional-case-btn')
        let addDefault = createGreenButton('Default').addClass('col-sm-3 col-3 add-default-btn')
        let inputBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2')
                            .attr('id', 'createSwitchCaseBtn').text('Create')
        
        let upperContainer = $('<div></div>').addClass('col-sm-12 col-12')
        upperContainer.append(addCaseBtn)
        upperContainer.append($('<div></div>').addClass('col-sm-9 col-9'))

        let lowerContainer = $('<div></div>').addClass('col-sm-12 col-12 d-flex justify-content-center')
        lowerContainer.append(addDefault)
        lowerContainer.append($('<div></div>').addClass('col-sm-7 col-7'))
        lowerContainer.append(inputBtn)

        let bothContainer = $('<div></div>').addClass('col-sm-12 col-12 d-flex flex-column')
        bothContainer.append(upperContainer)
        bothContainer.append(lowerContainer)

        $('#pcInputContainerLower').append(bothContainer)
    }

    function createIfSelection() {
        let row = $('<div></div>').addClass('row')
        let leftSide = $('<div></div>').addClass('col-sm-4 col-4 mb-2')
        let rightSide = $('<div></div>').addClass('col-sm-8 col-8 if-properties-container-' + ifCount)
        let listGroup = $('<div></div>').addClass('list-group').attr('id', 'list-tab-if').attr('role', 'tablist')
        let listGroupItem1 = $('<a></a>').addClass('list-group-item').addClass('list-group-item-action').addClass('active').attr('id', 'list-if-1').attr('data-bs-toggle', 'list').attr('href', '#list-1').text('If')
        let addElseIfBtn = createGreenButton('Else If').addClass('additional-if').data('value', 'elif')
        let addElseBtn = createGreenButton('Else').addClass('additional-if').data('value', 'else')
        let tab = $('<div></div>').addClass('tab-content').attr('id', 'nav-tabContentIf')
        let tabContent = createNewIfTab()

        listGroup.append(listGroupItem1)
        leftSide.append(listGroup)
        leftSide.append(addElseIfBtn)
        leftSide.append(addElseBtn)

        tabContent.append(createIfPropertiesInput(true))
        tab.append(tabContent)
        rightSide.append(tab)

        let createBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'createIfStatementButton').text('Create')
        let container = $('<div></div>').addClass('d-flex justify-content-end p-2 col-sm-12 col-12')
        container.append($('<div></div>').addClass('col-sm-10 col-10'))
        container.append(createBtn)

        row.append(leftSide)
        row.append(rightSide)
        $('#pcInputContainer').append(row)
        $('#pcInputContainerLower').append(container)

        ifToBeValidated.push(ifCount)
        ifCount++
    }

    function createNewIfTab() {
        let id = 'list-' + ifCount
        let tabPane = $('<div></div>').addClass('tab-pane fade show').attr('id', id).attr('role', 'tabpanel') 
        if(ifCount == 1)
            tabPane.addClass('active')

        return tabPane
    }

    $(document).on('click', '.additional-if', function() {
        clearError()
        if($(this).data('value') == 'elif') {
            if(!isElsed) {
                ifToBeValidated.push(ifCount)
                $('#list-tab-if').append(createNewTab('Else If').data('value', 'elif'))
                let ifInputProperties = createIfPropertiesInput(true)
                let tabContent = createNewIfTab()
                tabContent.append(ifInputProperties)
                $('#nav-tabContentIf').append(tabContent)
                ifCount++
            }
            else
                createErrorMessage('Could not add else if after else!', 'pcInputErrorContainer')
        }
        else {
            if(!isElsed) {
                $('#list-tab-if').append(createNewTab('Else').data('value', 'else'))
                isElsed = true
            }
            else 
                createErrorMessage('Could not add else after else!', 'pcInputErrorContainer')
        }
    })

    function createNewTab(text: string) {
        let a = $('<a></a>').addClass('list-group-item list-group-item-action d-flex justify-content-between align-items-center').attr('data-bs-toggle', 'list').attr('id', 'list-if-' + ifCount).attr('href', '#list-' + ifCount)
        let word = $('<div></div>').text(text)
        let i = $('<i></i>').addClass('fas fa-trash delete-if-stmnt').css('color', 'red').data('value', ifCount)
        a.append(word)
        a.append(i)

        return a
    }

    $(document).on('click', '.delete-if-stmnt', function() {
        let targetId = $(this).data('value')

        if($('#list-if-' + targetId).data('value') == 'else')
            isElsed = false
        else if($('#list-if-' + targetId).data('value') == 'elif') {
            let targetIdx = ifToBeValidated.indexOf(targetId)
            ifToBeValidated.splice(targetIdx, 1)
        }

        $('#list-' + targetId).remove();
        $('#list-if-' + targetId).remove();

        if($('#list-1').hasClass('active') == true) {
            ($(`#list-tab-if a[href="#list-1"]`) as any).tab('show');
        }
    })

    $(document).on('click', '.delete-additional-condition', function() {
        let targetId = $(this).data('value')
        
        $('#first-if-input-box-' + targetId).append(createGreenButton('Condition').addClass('p-2 px-3 mt-2 mb-2 add-if-condition-btn').data('value', targetId))
        $('#second-if-input-box-' + targetId).remove()
    })

    $(document).on('click', '#createIfStatementButton', function() {
        clearError()
        let ifStatements: Statement[] = []
        let tempStatement: Statement | undefined = undefined
        let proceed: boolean = true
        
        for(let i = 0; i < ifToBeValidated.length; i++) {
            tempStatement = handleIfStatementValidation(ifToBeValidated[i])
            if(tempStatement != undefined) {
                ifStatements.push(tempStatement)
                tempStatement = undefined
            }
            else {
                proceed = false
                break
            }
        }

        if(proceed == true) {
            let ifStatement = new IfStatement(1, statementCount++, undefined)
            if(isElsed)
                ifStatements.push(new Else(1, statementCount))
            
            ifStatement.updateIfOperations(ifStatements)

            handleAdd(ifStatement)
            restructureStatement()
            turnOffOptions()
            clearSourceCode()
            initInput('Program Input')
            drawCanvas()
        }
    })

    function handleIfStatementValidation(index: number): Statement | undefined {
        let logicalOperatorClassName = 'lo-if-' + index
        let isAdditionalCondition = $("input[type='radio'][name='" + logicalOperatorClassName + "']:checked").val() == undefined ? false : true
        let operators = ['==', '!=', '<', '>', '<=', '>=']
        let logicalOperators = ['AND', 'OR']
        
        let firstVariableId1 = '#first-if-select-first-variable-' + index
        let firstOperatorClassName = 'op-first-' + index
        let isFirstVariable = $('#first-if-input-second-variable-' + index).val() == undefined ? true : false
        let secondVariableId1

        if(isFirstVariable)
            secondVariableId1 = '#first-if-select-second-variable-'+ index
        else
            secondVariableId1 = '#first-if-input-second-variable-'+ index

        let firstTemp = validateIfStatementInput(firstVariableId1, secondVariableId1, isFirstVariable)

        if(firstTemp == undefined)
            return undefined

        let firstRadio = $("input[type='radio'][name='" + firstOperatorClassName + "']")
        let firstCheckedIdx = -1
        for(let i = 0; i < firstRadio.length; i++) {
            if((firstRadio[i] as any).checked == true) {
                firstCheckedIdx = i 
                break
            }
        }

        if(!isAdditionalCondition) {
            if(index == 1)
                return new If(1, statementCount++, new Condition(firstTemp[0], operators[firstCheckedIdx], firstTemp[1], !isFirstVariable))
            else 
                return new Elif(1, statementCount++, new Condition(firstTemp[0], operators[firstCheckedIdx], firstTemp[1], !isFirstVariable))
        }

        let firstVariableId2 = '#second-if-select-first-variable-' + index
        let secondOperatorClassName = 'op-second-' + index
        let isSecondVariable = $('#second-if-input-second-variable-' + index).val() == undefined ? true : false
        let secondVariableId2

        if(isSecondVariable)
            secondVariableId2 = '#second-if-select-second-variable-'+ index
        else
            secondVariableId2 = '#second-if-input-second-variable-'+ index

        let secondTemp = validateIfStatementInput(firstVariableId2, secondVariableId2, isSecondVariable)

        if(secondTemp == undefined)
            return undefined

        let logicalRadio = $("input[type='radio'][name='" + logicalOperatorClassName + "']")
        let logicalCheckedIdx = -1
        for(let i = 0; i < logicalRadio.length; i++) {
            if((logicalRadio[i] as any).checked == true) {
                logicalCheckedIdx = i 
                break
            }
        }

        let secondRadio = $("input[type='radio'][name='" + secondOperatorClassName + "']")
        let secondCheckedIdx = -1
        for(let i = 0; i < secondRadio.length; i++) {
            if((secondRadio[i] as any).checked == true) {
                secondCheckedIdx = i 
                break
            }
        }

        if(index == 1)
            return new If(1, statementCount++, new Condition(firstTemp[0], operators[firstCheckedIdx], firstTemp[1], !isFirstVariable), logicalOperators[logicalCheckedIdx], new Condition(secondTemp[0], operators[secondCheckedIdx], secondTemp[1], !isSecondVariable))
        else 
            return new Elif(1, statementCount++, new Condition(firstTemp[0], operators[firstCheckedIdx], firstTemp[1], !isFirstVariable), logicalOperators[logicalCheckedIdx], new Condition(secondTemp[0], operators[secondCheckedIdx], secondTemp[1], !isSecondVariable))
    }

    function validateIfStatementInput(firstValue: string, secondValue: string, isVariable: boolean): Variable[] | undefined {         
        let firstVariable = findVariable($(firstValue).find('option').filter(':selected').val() as string)
        let secondVariable = undefined
        let listVariable = [] 

        if(firstVariable == undefined) {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer')
            $(firstValue).addClass('input-error')
            return undefined 
        }
        
        if(isVariable) {
            secondVariable = findVariable($(secondValue).find('option').filter(':selected').val() as string)
            if(secondVariable == undefined) {
                createErrorMessage('Please select a variable', 'pcInputErrorContainer')
                $(secondValue).addClass('input-error')
                return undefined 
            }
        }
        else {
            secondVariable = createVariableFromValue($(secondValue).val() as string)

            let res: Return
            res = secondVariable.validateValue()

            if(!res.bool) {
                createErrorMessage(res.message, 'pcInputErrorContainer')
                $(secondValue).addClass('input-error')
                return undefined 
            }
        }

        if((firstVariable instanceof String && !(secondVariable instanceof String)) 
            || (secondVariable instanceof String && !(firstVariable instanceof String))) {
            if(firstVariable instanceof String)
                $(firstValue).addClass('input-error')
            else
                $(secondValue).addClass('input-error')

            createErrorMessage('Could not compare other data type with String', 'pcInputErrorContainer')
            
            return undefined
        }

        listVariable.push(firstVariable)
        listVariable.push(secondVariable)

        return listVariable
    }

    function createVariableFromValue(value: string): Variable {
        let isNumeric = $.isNumeric(value)

        if(isNumeric) {
            if(value.includes('.'))
                return new Double('placeholder', value)
            else
                return new Long('placeholder', value)
        }
        else {
            if(value.length == 1)
                return new Char('placeholder', value)
            else
                return new String('placeholder', value)
        }
    }

    function createIfPropertiesInput(isRequired: boolean, customIfCount?: number) {
        let boxId = isRequired ? 'first-if-input-box-' + ifCount : 'second-if-input-box-' + customIfCount
        let dataValue = isRequired ? ifCount : customIfCount
        let divContainer 
        if(isRequired)
            divContainer = $('<div></div>').addClass('p-2').attr('id', boxId)
        else
            divContainer = $('<div></div>').addClass('p-2 border border-1 rounded bg-light').attr('id', boxId)
        
        let heading1 = $('<strong></strong>').text('Variable')
        let listVariable: Variable[] = getAllVariables()
        let firstSelectId = isRequired ? 'first-if-select-first-variable-' + ifCount : 'second-if-select-first-variable-' + customIfCount
        let firstSelect = createSelect(listVariable, 12, true).addClass('mb-2').attr('id', firstSelectId)
        
        let heading2 = $('<strong></strong>').text('Operator')
        let firstRadioSelection = createOperatorRadioSelection(isRequired, dataValue)

        let heading3 = $('<strong></strong>').text('Value Type')
        let valueTypeSelectClassName = isRequired ? 'first-value-type-select' : 'second-value-type-select'
        
        let valueTypeSelect = $('<select></select>').addClass('form-select mb-2').addClass(valueTypeSelectClassName).data('value', dataValue)
        valueTypeSelect.append($('<option></option>').val('variable').text('Variable'))
        valueTypeSelect.append($('<option></option>').val('custom').text('Custom Value'))

        let heading4 = $('<strong></strong>').text('Value')
        let secondSelectContainerClassName = isRequired ? 'first-second-value-container-' + ifCount : 'second-second-value-container-' + customIfCount
        let secondSelectContainer = $('<div></div>').addClass(secondSelectContainerClassName)
        
        let secondSelectId = isRequired ? 'first-if-select-second-variable-' + ifCount : 'second-if-select-second-variable-' + customIfCount
        let secondSelect = createSelect(listVariable, 12, true).addClass('mb-2').attr('id', secondSelectId)
        secondSelectContainer.append(secondSelect)

        if(!isRequired) {
            divContainer.append(createLogicalOperatorHeader(dataValue))
            divContainer.append(createLogicalOperatorSelection(dataValue))
        }
        divContainer.append(heading1)
        divContainer.append(firstSelect)
        divContainer.append(heading2)
        divContainer.append(firstRadioSelection)
        divContainer.append(heading3)
        divContainer.append(valueTypeSelect)
        divContainer.append(heading4)
        divContainer.append(secondSelectContainer)

        if(isRequired) {
            divContainer.append(createGreenButton('Condition').addClass('p-2 px-3 mt-2 mb-2 add-if-condition-btn').data('value', ifCount))
        }
        
        return divContainer
    }

    function createLogicalOperatorHeader(dataValue: number) {
        let container = $('<div></div>').addClass('d-flex justify-content-between align-items-center')
        let strong = $('<strong></strong>').text('Logical Operator')
        let i = $('<i></i>').addClass('fas fa-trash delete-additional-condition').css('color', 'red').data('value', dataValue)
        container.append(strong)
        container.append(i)

        return container
    }

    function createLogicalOperatorSelection(dataValue: number) {
        let container = $('<div></div>').addClass('col-12 col-sm-12 d-flex align-items-center mb-4 mt-2')
        let firstRadioContainer = $('<div></div>').addClass('col-4 col-sm-4 d-flex align-items-center justify-content-start')
        let secondRadioContainer = $('<div></div>').addClass('col-4 col-sm-4 d-flex align-items-center justify-content-start')
        let radioName = 'lo-if-' + dataValue
        let firstRadio = $('<input>').addClass('me-2').attr('name', radioName).attr('type', 'radio').attr('checked', 'true')
        let firstRadioDesc = $('<strong></strong>').text('AND')
        let secondRadio = $('<input>').addClass('me-2').attr('name', radioName).attr('type', 'radio')
        let secondRadioDesc = $('<strong></strong>').text('OR')
        let separator1 = $('<div></div>').addClass('col-1 col-sm-1')
        let separator2 = $('<div></div>').addClass('col-3 col-sm-3')

        firstRadioContainer.append(firstRadio)
        firstRadioContainer.append(firstRadioDesc)
        secondRadioContainer.append(secondRadio)
        secondRadioContainer.append(secondRadioDesc)
        
        container.append(firstRadioContainer)
        container.append(separator1)
        container.append(secondRadioContainer)
        container.append(separator2)

        return container
    }

    function createOperatorRadioSelection(isRequired: boolean, customIfCount?: number) {
        let dataValue = isRequired ? ifCount : customIfCount

        let container = $('<div></div>').addClass('col-12 col-sm-12 d-flex align-items-center mb-2 mt-2')
        let radioContainer1 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly')
        let radioContainer2 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly')
        let radioContainer3 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly')
        let radioContainer4 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly')
        let radioContainer5 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly')
        let radioContainer6 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly')
        let word1 = $('<div></div>').text('==')
        let word2 = $('<div></div>').text('!=')
        let word3 = $('<div></div>').text('<')
        let word4 = $('<div></div>').text('>')
        let word5 = $('<div></div>').text('<=')
        let word6 = $('<div></div>').text('>=')

        let className: string
        if(isRequired)
            className = 'op-first-' + dataValue
        else
            className = 'op-second-' + dataValue

        radioContainer1.append($('<input>').attr('type', 'radio').attr('name', className).attr('checked', 'true'))
        radioContainer1.append(word1)
        radioContainer2.append($('<input>').attr('type', 'radio').attr('name', className))
        radioContainer2.append(word2)
        radioContainer3.append($('<input>').attr('type', 'radio').attr('name', className))
        radioContainer3.append(word3)
        radioContainer4.append($('<input>').attr('type', 'radio').attr('name', className))
        radioContainer4.append(word4)
        radioContainer5.append($('<input>').attr('type', 'radio').attr('name', className))
        radioContainer5.append(word5)
        radioContainer6.append($('<input>').attr('type', 'radio').attr('name', className))
        radioContainer6.append(word6)

        container.append(radioContainer1)
        container.append(radioContainer2)
        container.append(radioContainer3)
        container.append(radioContainer4)
        container.append(radioContainer5)
        container.append(radioContainer6)

        return container
    }

    $(document).on('click', '.add-if-condition-btn', function() {
        let targetId = $(this).data('value')
        let targetContainerClass = '#list-' + targetId
        
        $('#first-if-input-box-' + targetId).children().last().remove()
        $(targetContainerClass).append(createIfPropertiesInput(false, targetId))
    })

    $(document).on('change', '.first-value-type-select', function() {
        let targetId = $(this).data('value')
        $('.first-second-value-container-' + targetId).empty()
        let type = $(this).find('option').filter(':selected').val()

        if(type == 'custom') {
            let input = createInputField('text').addClass('mb-2').attr('id', 'first-if-input-second-variable-' + targetId)
            $('.first-second-value-container-' + targetId).append(input)
        }
        else {
            let listVariable = getAllVariables()
            let select = createSelect(listVariable, 12, true).addClass('mb-2').attr('id', 'first-if-select-second-variable-' + targetId)
            $('.first-second-value-container-' + targetId).append(select)
        }
    })

    $(document).on('change', '.second-value-type-select', function() {
        let targetId = $(this).data('value')
        $('.second-second-value-container-' + targetId).empty()
        let type = $(this).find('option').filter(':selected').val()

        if(type == 'custom') {
            let input = createInputField('text').addClass('mb-2').attr('id', 'second-if-input-second-variable-' + targetId)
            $('.second-second-value-container-' + targetId).append(input)
        }
        else {
            let listVariable = getAllVariables()
            let select = createSelect(listVariable, 12, true).addClass('mb-2').attr('id', 'second-if-select-second-variable-' + targetId)
            $('.second-second-value-container-' + targetId).append(select)
        }
    })

    function getAllVariables(): Variable[] {
        let allVariables: Variable[] = []

        for(let i = 0; i < listInteger.length; i++)
            allVariables.push(listInteger[i])
        for(let i = 0; i < listLong.length; i++)
            allVariables.push(listLong[i])
        for(let i = 0; i < listFloat.length; i++)
            allVariables.push(listFloat[i])
        for(let i = 0; i < listDouble.length; i++)
            allVariables.push(listDouble[i])
        for(let i = 0; i < listChar.length; i++)
            allVariables.push(listChar[i])
        for(let i = 0; i < listString.length; i++)
            allVariables.push(listString[i])
        
        return allVariables
    }

    function getSelectedVariables(type: string): Variable[] {
        let allVariables: Variable[] = []
        for(let i = 0; i < listInteger.length; i++)
            allVariables.push(listInteger[i])
        for(let i = 0; i < listLong.length; i++)
            allVariables.push(listLong[i])
        
        if(type == 'switch') {
            for(let i = 0; i < listChar.length; i++)
                allVariables.push(listChar[i])
        }
        else if(type == 'repetition') {
            for(let i = 0; i < listFloat.length; i++)
                allVariables.push(listFloat[i])
            for(let i = 0; i < listDouble.length; i++)
                allVariables.push(listDouble[i])
        }
        else if(type == 'assignment') {
            for(let i = 0; i < listChar.length; i++)
                allVariables.push(listChar[i])
            for(let i = 0; i < listFloat.length; i++)
                allVariables.push(listFloat[i])
            for(let i = 0; i < listDouble.length; i++)
                allVariables.push(listDouble[i])
        }

        return allVariables
    }

    $(document).on('click', '#outputVariableBtn', function() {
        clearError()

        if($('#chosenOutputVariable').find('option').filter(':selected').val() == '') {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer')
            $('#chosenOutputVariable').addClass('input-error')
        }
        else {
            let variableName = $('#chosenOutputVariable').find('option').filter(':selected').val() as string
            let text = $('#chosenOutputVariable').find('option').filter(':selected').text().split(' ')[1] as string
            let variable: Variable | undefined = undefined
            let statement: Statement
            let isNewLine: boolean = $('#new-line-variable').is(':checked')

            if(text == '(Integer)') 
                variable = getVariable(listInteger, variableName)
            else if(text == '(Long)')
                variable = getVariable(listLong, variableName)
            else if(text == '(Float)') 
                variable = getVariable(listFloat, variableName)
            else if(text == '(Double)') 
                variable = getVariable(listDouble, variableName)
            else if(text == '(Char)') 
                variable = getVariable(listChar, variableName)
            else 
                variable = getVariable(listString, variableName)
            
            if(variable != undefined) {
                statement = new OutputStatement(statementCount++, 1, isNewLine, 'variable', variable)
                handleAdd(statement)
                restructureStatement()
                turnOffOptions()
                clearSourceCode()
                initInput('Program Input')
                drawCanvas()
            }
        }
    })

    $(document).on('click', '#btn-submit-output', function() {
        let output
        if($(this).data('value') == 'text') {
            let text = $('#output-text-box').val() as string
            let newLine: boolean = $('#new-line-text').is(':checked')
            output = new OutputStatement(statementCount++, 1, newLine, 'text', undefined, text)
        }
        else if($(this).data('value') == 'ascii') {
            let num =  $('#select-ascii-code').find('option').filter(':selected').val() as number
            let newLine: boolean = $('#new-line-ascii').is(':checked')
            output = new OutputStatement(statementCount++, 1, newLine, 'ascii', undefined, undefined, num, undefined)
        }
        else {
            let text = $('#select-escape-seq').find('option').filter(':selected').text()
            output = new OutputStatement(statementCount++, 1, false, 'escapeseq', undefined, undefined, undefined, text)
        }
        
        handleAdd(output)
        restructureStatement()
        turnOffOptions()
        clearSourceCode()
        initInput('Program Input')
        drawCanvas()
    })

    // Repetition

    $(document).on('click', '.repetition', function() {
        let createBtn: any
        if($(this).data('value') == 'for') {
            initInput('For Loop Properties')
            createForLoopCondition()
            createForLoopVariableUpdate()
            createBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'create-loop-button').data('value', 'for').text('Create')
        }
        else if($(this).data('value') == 'do-while') {
            initInput('Do-While Loop Properties')
            createForLoopCondition()
            createBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'create-loop-button').data('value', 'do-while').text('Create')
        }
        else if($(this).data('value') == 'while') {
            initInput('While Loop Properties')
            createForLoopCondition()
            createBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'create-loop-button').data('value', 'while').text('Create')
        }

        let container = $('<div></div>').addClass('d-flex justify-content-end col-sm-12 col-12')
        container.append(createBtn)
        $('#pcInputContainerLower').append(container)
    })

    function createForLoopCondition() {
        let listVariable: Variable[] = []
        
        listVariable = getSelectedVariables('repetition')
        
        let loopConditionContainer = $('<div></div>').addClass('p-2 border border-1 rounded bg-light mb-3')
        let loopTitle = $('<div></div>').append($('<strong></strong>').text('Loop Condition')).addClass('mb-3')
        
        let container1 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3')
        let variableTitle = $('<div></div>').append($('<strong></strong>').text('Variable')).addClass('col-sm-5 col-5')
        let variableSelect = createSelect(listVariable, 7, true).attr('id', 'chosen-for-loop-variable')
        
        let container2 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3')
        let operatorTitle = $('<div></div>').append($('<strong></strong>').text('Operator')).addClass('col-sm-5 col-5')
        let operators = createOperatorRadioRepetition('op-for')

        let container3 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3')
        let valueTypeTitle = $('<div></div>').append($('<strong></strong>').text('Value Type')).addClass('col-sm-5 col-5')
        let valueTypeContainer = $('<div></div>').addClass('col-sm-7 col-7')
        let valueTypeSelect = $('<select></select>').addClass('form-select choose-for-loop-value-type')
        valueTypeSelect.append($('<option></option>').val('variable').text('Variable'))
        valueTypeSelect.append($('<option></option>').val('custom').text('Custom Value'))

        let container4 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3')
        let valueTitle = $('<div></div>').append($('<strong></strong>').text('Value')).addClass('col-sm-5 col-5')
        let valueContainer = $('<div></div>').addClass('col-sm-7 col-7 value-container-for-loop')
        let valueSelect = createSelect(listVariable, 12, true).attr('id', 'chosen-for-loop-value')

        container1.append(variableTitle)
        container1.append(variableSelect)

        container2.append(operatorTitle)
        container2.append(operators)

        container3.append(valueTypeTitle)
        valueTypeContainer.append(valueTypeSelect)
        container3.append(valueTypeContainer)

        container4.append(valueTitle)
        valueContainer.append(valueSelect)
        container4.append(valueContainer)

        loopConditionContainer.append(loopTitle)
        loopConditionContainer.append(container1)
        loopConditionContainer.append(container2)
        loopConditionContainer.append(container3)
        loopConditionContainer.append(container4)

        $('#pcInputContainer').append(loopConditionContainer)
    }

    function createForLoopVariableUpdate() {
        let loopVariableUpdateContainer = $('<div></div>').addClass('p-2 border border-1 rounded bg-light mb-3')
        let variableUpdate = $('<div></div>').append($('<strong></strong>').text('Variable Update')).addClass('mb-3')

        let container1 = $('<div></div>').addClass('col-sm-12 col-12 d-flex align-items-center mb-3')
        let updateType = $('<div></div>').append($('<strong></strong>').text('Update Type')).addClass('col-sm-5 col-5')
        let innerContainer = $('<div></div>').addClass('col-sm-7 col-7 d-flex justify-content-center align-items-center')
        let radioContainer1 = $('<div></div>').addClass('col-sm-4 col-4 d-flex justify-content-evenly align-items-center')
        let radio1 = $('<input>').attr('type', 'radio').attr('name', 'update-type-for-loop').attr('checked', 'true')
        let radioDesc1 = $('<div></div>').text('Increment')

        let radioContainer2 = $('<div></div>').addClass('col-sm-4 col-4 d-flex justify-content-evenly align-items-center')
        let radio2 = $('<input>').attr('type', 'radio').attr('name', 'update-type-for-loop')
        let radioDesc2 = $('<div></div>').text('Decrement')

        radioContainer1.append(radio1)
        radioContainer1.append(radioDesc1)

        radioContainer2.append(radio2)
        radioContainer2.append(radioDesc2)

        innerContainer.append(radioContainer1)
        innerContainer.append($('<div></div>').addClass('col-sm-1 col-1'))
        innerContainer.append(radioContainer2)
        innerContainer.append($('<div></div>').addClass('col-sm-3 col-3'))

        container1.append(updateType)
        container1.append(innerContainer)

        let container2 = $('<div></div>').addClass('col-sm-12 col-12 d-flex align-items-center mb-3')
        let updateValue = $('<div></div>').append($('<strong></strong>').text('Update Value')).addClass('col-sm-5 col-5')
        let valueContainer =  $('<div></div>').addClass('col-sm-7 col-7')
        let valueInput = $('<input></input>').addClass('form-control').attr('id', 'update-value-for-loop').attr('type', 'number').attr('min', 1)

        valueContainer.append(valueInput)
        container2.append(updateValue)
        container2.append(valueContainer)

        loopVariableUpdateContainer.append(variableUpdate)
        loopVariableUpdateContainer.append(container1)
        loopVariableUpdateContainer.append(container2)

        $('#pcInputContainer').append(loopVariableUpdateContainer)
    }

    function createOperatorRadioRepetition(baseClassName: string) {
        let container = $('<div></div>').addClass('col-sm-7 d-flex justify-content-center align-items-center')
        let radioContainer1 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly')
        let radioContainer2 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly')
        let radioContainer3 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly')
        let radioContainer4 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly')
        let radioContainer5 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly')
        let radioContainer6 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly')
        let word1 = $('<div></div>').text('==')
        let word2 = $('<div></div>').text('!=')
        let word3 = $('<div></div>').text('<')
        let word4 = $('<div></div>').text('>')
        let word5 = $('<div></div>').text('<=')
        let word6 = $('<div></div>').text('>=')

        radioContainer1.append($('<input>').attr('type', 'radio').attr('name', baseClassName).attr('checked', 'true'))
        radioContainer1.append(word1)
        radioContainer2.append($('<input>').attr('type', 'radio').attr('name', baseClassName))
        radioContainer2.append(word2)
        radioContainer3.append($('<input>').attr('type', 'radio').attr('name', baseClassName))
        radioContainer3.append(word3)
        radioContainer4.append($('<input>').attr('type', 'radio').attr('name', baseClassName))
        radioContainer4.append(word4)
        radioContainer5.append($('<input>').attr('type', 'radio').attr('name', baseClassName))
        radioContainer5.append(word5)
        radioContainer6.append($('<input>').attr('type', 'radio').attr('name', baseClassName))
        radioContainer6.append(word6)

        container.append(radioContainer1)
        container.append(radioContainer2)
        container.append(radioContainer3)
        container.append(radioContainer4)
        container.append(radioContainer5)
        container.append(radioContainer6)

        return container
    }

    $(document).on('change', '.choose-for-loop-value-type', function() {
        $('.value-container-for-loop').empty()
        let type = $(this).find('option').filter(':selected').val()

        if(type == 'custom') {
            let input = createInputField('text').addClass('form-control').attr('id', 'chosen-for-loop-value')
            $('.value-container-for-loop').append(input)
        }
        else {
            let listVariable = getSelectedVariables('repetition')
            let select = createSelect(listVariable, 12, true).attr('id', 'chosen-for-loop-value')
            $('.value-container-for-loop').append(select)
        }
    })

    $(document).on('click', '#create-loop-button', function() {
        clearError()
        let statement = createRepetitionStatement($(this).data('value'))
        if(statement == undefined) 
            return
            
        handleAdd(statement)
        restructureStatement()
        turnOffOptions()
        clearSourceCode()
        initInput('Program Input')
        drawCanvas()
    })

    function createRepetitionStatement(statementType: string): Statement | undefined{
        let statement: Statement
        let loopInput: boolean = false
        let updateValueInput: boolean = false
        let isCustom: boolean = false
        let updateValue: string

        loopInput = validateRepetitionInput()
        if(!loopInput)
            return undefined

        let variable = findVariable($('#chosen-for-loop-variable').find('option').filter(':selected').val() as string)
        let tempVariable: Variable

        if($('.choose-for-loop-value-type').find('option').filter(':selected').val() == 'custom') {
            isCustom = true
            tempVariable = createVariableFromValue($('#chosen-for-loop-value').val() as string)
        }
        else {
            isCustom = false
            tempVariable = findVariable($('#chosen-for-loop-value').find('option').filter(':selected').val() as string)
        }

        let operators = ['==', '!=', '<', '>', '<=', '>=']

        let firstRadio = $("input[type='radio'][name='op-for']")
        let firstCheckedIdx = -1
        for(let i = 0; i < firstRadio.length; i++) {
            if((firstRadio[i] as any).checked == true) {
                firstCheckedIdx = i 
                break
            }
        }

        if(statementType == 'for') {
            updateValueInput = validateRepetitionUpdate()
            if(!updateValueInput)
                return undefined

            updateValue = $('#update-value-for-loop').val() as string
            let secondRadio = $("input[type='radio'][name='update-type-for-loop']")
            let secondCheckedIdx = -1
            for(let i = 0; i < secondRadio.length; i++) {
                if((secondRadio[i] as any).checked == true) {
                    secondCheckedIdx = i 
                    break
                }
            }
            let isIncrement = secondCheckedIdx == 0 ? true : false
            statement = new ForStatement(1, statementCount++, undefined, variable, false, isIncrement, parseInt(updateValue), new Condition(variable, operators[firstCheckedIdx], tempVariable, isCustom))
        }        
        else if(statementType == 'do-while') {
            statement = new WhileStatement(1, statementCount++, false, undefined, new Condition(variable, operators[firstCheckedIdx], tempVariable, isCustom))
        }
        else {
            statement = new WhileStatement(1, statementCount++, true, undefined, new Condition(variable, operators[firstCheckedIdx], tempVariable, isCustom))
        }

        return statement
    }

    function validateRepetitionInput(): boolean {
        let variableName = $('#chosen-for-loop-variable').find('option').filter(':selected').val() as string
        let tempVariable: Variable
        let result: Return

        if(variableName == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer')
            $('#chosen-for-loop-variable').addClass('input-error')
            return false
        }

        if($('.choose-for-loop-value-type').find('option').filter(':selected').val() == 'custom') {
            let value = $('#chosen-for-loop-value').val() as string
            tempVariable = createVariableFromValue(value)
            
            if(tempVariable instanceof String) {
                $('#chosen-for-loop-value').addClass('input-error')
                createErrorMessage('Could not compare with String data type', 'pcInputErrorContainer')
                return false
            }

            result = tempVariable.validateValue()
            if(!result.bool) {
                $('#chosen-for-loop-value').addClass('input-error')
                createErrorMessage(result.message, 'pcInputErrorContainer')
                return false
            }
        }
        else {
            let variableName = $('#chosen-for-loop-value').find('option').filter(':selected').val() as string
            if(variableName == '') {
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer')
                $('#chosen-for-loop-value').addClass('input-error')
                return false
            }
        }

        return true
    }

    function validateRepetitionUpdate(): boolean {
        let updateValue = $('#update-value-for-loop').val() as string
        if(updateValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer')
            $('#update-value-for-loop').addClass('input-error')
            return false
        }     

        return true
    }

    // Arithmetic Assignment

    let assignmentToBeValidated: number[] = []
    let assignmentCount = 1
    let assignmentStructure: {[index: string]: any} = {}

    $(document).on('click', '.assignment', function() {
        assignmentCount = 1
        assignmentToBeValidated = []
        let createBtn: any
        let container = $('<div></div>').addClass('d-flex justify-content-end col-sm-12 col-12')

        if($(this).data('value') == 'arithmetic') {
            initInput('Arithmetic Assignment')
            createArithmeticAssignmentHeader()
            createArithmeticAssignmentInput()
            createBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'create-asg-arithmetic-button').text('Create')
        }
        else if($(this).data('value') == 'string') {
            initInput('String Assignment')
            createActionTypeChoice()
            createGetStringLengthInput()
            createBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'create-asg-string-button').text('Create')
        }
        else if($(this).data('value') == 'variable') {
            initInput('Variable Assignment')
            createVariableAssignmentInput()
            createBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'create-asg-variable-button').text('Create')
        }

        container.append(createBtn)
        $('#pcInputContainerLower').append(container)  
    })

    // String Assignment

    $(document).on('click', '#create-asg-string-button', function() {
        clearError()
        
        if($('.choose-action-type').find('option').filter(':selected').val() == 'length')
            createStringAssignmentLength()
        else 
            createStringAssignmentSub()
    })

    function createStringAssignmentLength() {
        let firstValue = $('.first-asg-string-value').find('select').find('option').filter(':selected').val() as string
        let secondValue = $('.second-asg-string-value').find('select').find('option').filter(':selected').val() as string
        let firstVariable: Variable
        let secondVariable: Variable

        if(firstValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer')
            $('.first-asg-string-value').find('select').addClass('input-error')
            return
        }

        if(secondValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer')
            $('.second-asg-string-value').find('select').addClass('input-error')
            return
        }

        firstVariable = findVariable(firstValue)
        secondVariable = findVariable(secondValue)

        let statement = new AssignmentStatement(statementCount++, 1, 'length', firstVariable,
            undefined, undefined, undefined, secondVariable, undefined, undefined, undefined)
        
        handleAdd(statement)
        restructureStatement()
        turnOffOptions()
        clearSourceCode()
        initInput('Program Input')
        drawCanvas()
    }

    function createStringAssignmentSub() {
        let firstValue = $('.first-asg-string-value').find('select').find('option').filter(':selected').val() as string
        let secondValue = $('.second-asg-string-value').find('select').find('option').filter(':selected').val() as string
        let firstVariable: Variable
        let secondVariable: Variable
        let start: string
        let length: string

        if(firstValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer')
            $('.first-asg-string-value').find('select').addClass('input-error')
            return
        }

        if(secondValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer')
            $('.second-asg-string-value').find('select').addClass('input-error')
            return
        }

        firstVariable = findVariable(firstValue)
        secondVariable = findVariable(secondValue)

        start = $('.begin-idx-string').val() as string
        if(start == '') {
            createErrorMessage('Input field cannot be empty', 'pcInputErrorContainer')
            $('.begin-idx-string').addClass('input-error')
            return
        }
        else if(parseInt(start) < 1) {
            createErrorMessage('Start position must be greater than 0', 'pcInputErrorContainer')
            $('.begin-idx-string').addClass('input-error')
            return
        }
        else if(parseInt(start) > secondVariable.value.length) {
            createErrorMessage('Start position must be less than String length', 'pcInputErrorContainer')
            $('.begin-idx-string').addClass('input-error')
            return
        }
        
        length = $('.length-idx-string').val() as string
        if(length == '') {
            createErrorMessage('Input field cannot be empty', 'pcInputErrorContainer')
            $('.length-idx-string').addClass('input-error')
            return
        }
        else if(parseInt(length) < 1) {
            createErrorMessage('Length must be greater than 0', 'pcInputErrorContainer')
            $('.length-idx-string').addClass('input-error')
            return
        }
        else if(parseInt(start) + (parseInt(length)-1) > secondVariable.value.length) {
            createErrorMessage('String overflow', 'pcInputErrorContainer')
            $('.length-idx-string').addClass('input-error')
            return
        }

        let statement = new AssignmentStatement(statementCount++, 1, 'sub', firstVariable, 
            undefined, undefined, undefined, secondVariable, undefined, parseInt(start), parseInt(length))

        handleAdd(statement)
        restructureStatement()
        turnOffOptions()
        clearSourceCode()
        initInput('Program Input')
        drawCanvas()
    }

    $(document).on('change', '.choose-action-type', function() {
        $('.action-select-container').remove()
        
        if($(this).find('option').filter(':selected').val() == 'length') {
            createGetStringLengthInput()
        }
        else if($(this).find('option').filter(':selected').val() == 'sub') {
            createSubstringInput()
        }
    })

    function createActionTypeChoice() {
        let container = 
        $('<div>', {class: 'p-2 border border-1 rounded bg-light col-sm-12 col-12 mb-3'}).append(
            $('<div>', {class: 'mb-3'}).append($('<strong>').text('Action Type')),
            $('<div>', {class: 'col-sm-12 col-12 mb-3 d-flex align-items-center'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Action')),
                $('<div>', {class: 'col-sm-7 col-7'}).append(
                    $('<select>', {class: 'form-select choose-action-type'}).append(
                        $('<option>').val('length').text('Get String Length'),
                        $('<option>').val('sub').text('Get Part of String'),
                    )
                )
            )
        )

        $('#pcInputContainer').append(container)
    }

    function createGetStringLengthInput() {
        let container = 
        $('<div>', {class: 'p-2 border border-1 rounded bg-light col-sm-12 col-12 mb-3 action-select-container'}).append(
            $('<div>', {class: 'mb-3'}).append($('<strong>').text('String Length')),
            $('<div>', {class: 'col-12 col-sm-12 d-flex align-items-center mb-3'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Target Variable (Integer)')),
                $('<div>', {class: 'col-sm-1 col-1'}),
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Variable (String)')),
                $('<div>', {class: 'col-sm-1 col-1'})
            ),
            $('<div>', {class: 'col-12 col-sm-12 d-flex align-items-center mb-3'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append(createSelect(listInteger, 12, false).addClass('first-asg-string-value')),
                $('<div>', {class: 'col-sm-1 col-1 d-flex justify-content-center'}).text('='),
                $('<div>', {class: 'col-sm-5 col-5'}).append(createSelect(listString, 12, false).addClass('second-asg-string-value')),
                $('<div>', {class: 'col-sm-1 col-1'})
            )
        )

        $('#pcInputContainer').append(container)
    }

    function createSubstringInput() {
        let container = 
        $('<div>', {class: 'p-2 border border-1 rounded bg-light col-sm-12 col-12 mb-3 action-select-container'}).append(
            $('<div>', {class: 'mb-3'}).append($('<strong>').text('Part of String')),
            $('<div>', {class: 'col-12 col-sm-12 d-flex align-items-center mb-3'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Target Variable (String)')),
                $('<div>', {class: 'col-sm-1 col-1'}),
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Variable (String)')),
                $('<div>', {class: 'col-sm-1 col-1'})
            ),
            $('<div>', {class: 'col-12 col-sm-12 d-flex align-items-center mb-3'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append(createSelect(listString, 12, false).addClass('first-asg-string-value')),
                $('<div>', {class: 'col-sm-1 col-1 d-flex justify-content-center'}).text('='),
                $('<div>', {class: 'col-sm-5 col-5'}).append(createSelect(listString, 12, false).addClass('second-asg-string-value')),
                $('<div>', {class: 'col-sm-1 col-1'})
            ),
            $('<div>', {class: 'col-12 col-sm-12 d-flex align-items-center mb-3'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}),
                $('<div>', {class: 'col-sm-1 col-1'}),
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Start Position')),
                $('<div>', {class: 'col-sm-1 col-1'})
            ),
            $('<div>', {class: 'col-12 col-sm-12 d-flex align-items-center mb-3'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}),
                $('<div>', {class: 'col-sm-1 col-1'}),
                $('<div>', {class: 'col-sm-5 col-5'}).append(
                    $('<input>', {type: 'number', class: 'form-control begin-idx-string'})
                ),
                $('<div>', {class: 'col-sm-1 col-1'})
            ),
            $('<div>', {class: 'col-12 col-sm-12 d-flex align-items-center mb-3'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}),
                $('<div>', {class: 'col-sm-1 col-1'}),
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Length')),
                $('<div>', {class: 'col-sm-1 col-1'})
            ),
            $('<div>', {class: 'col-12 col-sm-12 d-flex align-items-center mb-3'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}),
                $('<div>', {class: 'col-sm-1 col-1'}),
                $('<div>', {class: 'col-sm-5 col-5'}).append(
                    $('<input>', {type: 'number', class: 'form-control length-idx-string'})
                ),
                $('<div>', {class: 'col-sm-1 col-1'})
            )
        )

        $('#pcInputContainer').append(container)
    }

    // Arithmetic Assignment

    function createArithmeticAssignmentHeader() {
        let listVariable: Variable[] = getSelectedVariables('assignment')

        let container = 
        $('<div>', {class:'p-2 border border-1 rounded bg-light mb-3'}).append(
            $('<div>', {class: 'mb-3'}).append($('<strong>').text('Target Variable')),
            $('<div>', {class: 'col-sm-12 col-12 d-flex align-items-center mb-3'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Variable')),
                $('<div>', {class: 'col-sm-7 col-7'}).append(
                    createSelect(listVariable, 12, true).addClass('selected-target-variable-asg')
                )
            )
        )

        $('#pcInputContainer').append(container) 
    }

    function createArithmeticAssignmentInput() { 
        let listVariable: Variable[] = getSelectedVariables('assignment')
        let firstValueTypeClassName = 'form-select first-select-value-type first-select-value-type-' + assignmentCount
        let secondValueTypeClassName = 'form-select second-select-value-type second-select-value-type-' + assignmentCount
        let firstValueContainerClassName = 'first-assignment-value-container first-assignment-value-container-' + assignmentCount
        let secondValueContainerClassName = 'second-assignment-value-container second-assignment-value-container-' + assignmentCount
        
        let container =
        $('<div>', {class: 'p-2 border border-1 rounded bg-light mb-3'}).append(
            $('<input>', {type: 'hidden', name: 'arithmetic-asg-' + assignmentCount}),
            $('<div>', {class: 'mb-3'}).append($('<strong>').text('Arithmetic Operation ' + assignmentCount)),
            $('<div>', {class: 'col-sm-12 col-12 d-flex align-items-center mb-3'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Value Type')),
                $('<div>', {class: 'col-sm-7 col-7'}).append(
                    $('<select>', {class: firstValueTypeClassName}).append(
                        $('<option>', {value: 'variable', text: 'Variable'}),
                        $('<option>', {value: 'custom', text: 'Custom Value'}),
                        $('<option>', {value: 'operation', text: 'Arithmetic Operation'})
                    ).data('value', assignmentCount)
                )
            ),
            $('<div>', {class: 'col-sm-12 col-12 d-flex align-items-center mb-3 ' + firstValueContainerClassName}).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('First Value')),
                $('<div>', {class: 'col-sm-7 col-7'}).append(createSelect(listVariable, 12, true).addClass('first-value-' + assignmentCount))
            ).data('value', assignmentCount),
            $('<div>', {class: 'col-sm-12 col-12 d-flex align-items-center mb-3'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Operator')),
                $('<div>', {class: 'col-sm-7 col-7 d-flex justify-content-center align-items-center'}).append(
                    $('<div>', {class: 'col-sm-1 col-1'}),
                    $('<div>', {class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center'}).append(
                        $('<input>', {type: 'radio', name: 'op-asg-' + assignmentCount, checked: 'true'}),
                        $('<div>').text('+')
                    ),
                    $('<div>', {class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center'}).append(
                        $('<input>', {type: 'radio', name: 'op-asg-' + assignmentCount}),
                        $('<div>').text('-')
                    ),
                    $('<div>', {class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center'}).append(
                        $('<input>', {type: 'radio', name: 'op-asg-' + assignmentCount}),
                        $('<div>').text('/')
                    ),
                    $('<div>', {class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center'}).append(
                        $('<input>', {type: 'radio', name: 'op-asg-' + assignmentCount}),
                        $('<div>').text('*')
                    ),
                    $('<div>', {class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center'}).append(
                        $('<input>', {type: 'radio', name: 'op-asg-' + assignmentCount}),
                        $('<div>').text('%')
                    ),
                    $('<div>', {class: 'col-sm-1 col-1'})
                )
            ),
            $('<div>', {class: 'col-sm-12 col-12 d-flex align-items-center mb-3'}).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Value Type')),
                $('<div>', {class: 'col-sm-7 col-7'}).append(
                    $('<select>', {class: secondValueTypeClassName}).append(
                        $('<option>', {value: 'variable', text: 'Variable'}),
                        $('<option>', {value: 'custom', text: 'Custom Value'}),
                        $('<option>', {value: 'operation', text: 'Arithmetic Operation'})
                    ).data('value', assignmentCount)
                )
            ),
            $('<div>', {class: 'col-sm-12 col-12 d-flex align-items-center mb-3 ' + secondValueContainerClassName}).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Second Value')),
                $('<div>', {class: 'col-sm-7 col-7'}).append(createSelect(listVariable, 12, true).addClass('second-value-' + assignmentCount))
            ).data('value', assignmentCount)
        )

        assignmentToBeValidated.push(assignmentCount)
        assignmentCount++
        $('#pcInputContainer').append(container)
    }

    $(document).on('change', '.first-select-value-type', function() {
        let targetId = $(this).data('value')
        let selectValue = $('.first-select-value-type-' + targetId).find('option').filter(':selected').val() as string

        $('.first-assignment-value-container-' + targetId).empty()
        if(selectValue != 'operation')
            deleteFirstChild(targetId)
        
        if(selectValue == 'custom') {
            $('.first-assignment-value-container-' + targetId).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('First Value')),
                $('<div>', {class: 'col-sm-7 col-7'}).append(
                    $('<input>', {class: 'form-control', type: 'text'}).addClass('first-value-' + targetId)
                )
            )
        }
        else if(selectValue == 'variable') {
            let listVariable = getSelectedVariables('assignment')

            $('.first-assignment-value-container-' + targetId).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('First Value')),
                $('<div>', {class: 'col-sm-7 col-7'}).append(createSelect(listVariable, 12, true).addClass('first-value-' + targetId))
            )
        }
        else {
            $('.first-assignment-value-container-' + targetId).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('First Value')),
                $('<div>', {class: 'col-sm-7 col-7'}).append($('<strong>').text('Arithmetic Operation ' + assignmentCount))
            )
            assignmentStructure['first-value-' + targetId] = assignmentCount
            createArithmeticAssignmentInput()
        }
    })

    $(document).on('change', '.second-select-value-type', function() {
        let targetId = $(this).data('value')
        let selectValue = $('.second-select-value-type-' + targetId).find('option').filter(':selected').val() as string

        $('.second-assignment-value-container-' + targetId).empty()
        if(selectValue != 'operation')
            deleteSecondChild(targetId)

        if(selectValue == 'custom') {
            $('.second-assignment-value-container-' + targetId).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Second Value')),
                $('<div>', {class: 'col-sm-7 col-7'}).append(
                    $('<input>', {class: 'form-control', type: 'text'}).addClass('second-value-' + targetId)
                )
            )
        }
        else if(selectValue == 'variable') {
            let listVariable = getSelectedVariables('assignment')

            $('.second-assignment-value-container-' + targetId).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Second Value')),
                $('<div>', {class: 'col-sm-7 col-7'}).append((createSelect(listVariable, 12, true)).addClass('second-value-' + targetId))
            )
        }
        else {
            $('.second-assignment-value-container-' + targetId).append(
                $('<div>', {class: 'col-sm-5 col-5'}).append($('<strong>').text('Second Value')),
                $('<div>', {class: 'col-sm-7 col-7'}).append($('<strong>').text('Arithmetic Operation ' + assignmentCount))
            )
            assignmentStructure['second-value-' + targetId] = assignmentCount
            createArithmeticAssignmentInput()
        }
    })

    function deleteFirstChild(targetId: string) {
        let temp: string | undefined = undefined
        let idx: number

        temp = assignmentStructure['first-value-' + targetId]
        $("input[name='arithmetic-asg-" + temp + "']").parent().remove()
        assignmentStructure['first-value-' + targetId] = undefined
        idx = assignmentToBeValidated.indexOf(parseInt(temp))
        if(idx != -1)
            assignmentToBeValidated.splice(idx, 1)

        deleteChildAssignment(temp)
    }

    function deleteSecondChild(targetId: string) {
        let temp: string | undefined = undefined
        let idx: number

        temp = assignmentStructure['second-value-' + targetId]
        $("input[name='arithmetic-asg-" + temp + "']").parent().remove()
        assignmentStructure['second-value-' + targetId] = undefined
        idx = assignmentToBeValidated.indexOf(parseInt(temp))
        if(idx != -1)
            assignmentToBeValidated.splice(idx, 1)

        deleteChildAssignment(temp)
    }

    function deleteChildAssignment(targetId: string) {
        let temp: string | undefined = undefined
        let idx: number

        temp = assignmentStructure['first-value-' + targetId]
        if(temp != undefined) {
            $("input[name='arithmetic-asg-" + temp + "']").parent().remove()
            assignmentStructure['first-value-' + targetId] = undefined
            idx = assignmentToBeValidated.indexOf(parseInt(temp))
            if(idx != -1)
                assignmentToBeValidated.splice(idx, 1)

            deleteChildAssignment(temp)
        }

        temp = assignmentStructure['second-value-' + targetId]
        if(temp != undefined) {
            $("input[name='arithmetic-asg-" + temp + "']").parent().remove()
            assignmentStructure['second-value-' + targetId] = undefined
            idx = assignmentToBeValidated.indexOf(parseInt(temp))
            if(idx != -1)
                assignmentToBeValidated.splice(idx, 1)

            deleteChildAssignment(temp)
        }
    }

    $(document).on('click', '#create-asg-arithmetic-button', function() {
        clearError()
        let temp: boolean = true
        let value: string

        value = $('.selected-target-variable-asg').find('option').filter(':selected').val() as string
        if(value == '') {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer')
            $('.selected-target-variable-asg').addClass('input-error')
            return
        }
        
        for(let i = 0; i < assignmentToBeValidated.length; i++) {
            temp = validateArithmeticAssignmentInput(assignmentToBeValidated[i])
            if(!temp)
                return
        }

        createArithmeticStatement()
    })

    function validateArithmeticAssignmentInput(idx: number): boolean {
        let firstValueType = $('.first-select-value-type-' + idx).find('option').filter(':selected').val() as string
        let secondValueType = $('.second-select-value-type-' + idx).find('option').filter(':selected').val() as string
        let firstVariable
        let secondVariable

        if(firstValueType != 'operation') {
            firstVariable = getValue(firstValueType, '.first-value-' + idx)
            if(firstVariable == undefined)
                return false
        }

        if(secondValueType != 'operation') {
            secondVariable = getValue(secondValueType, '.second-value-' + idx)
            if(secondVariable == undefined) 
                return false
        }
        
        return true
    }

    function getValue(valueType: string, className: string): Variable | undefined {
        let variable: Variable

        if(valueType == 'custom') {
            let value = $(className).val() as string
            let result: Return

            if(value == '') {
                createErrorMessage('Input field cannot be empty', 'pcInputErrorContainer')
                $(className).addClass('input-error')
                return undefined
            }

            variable = createVariableFromValue(value)
            if(variable instanceof String) {
                createErrorMessage('Could not assign with String data type', 'pcInputErrorContainer')
                $(className).addClass('input-error')
                return undefined
            }

            result = variable.validateValue()
            if(!result.bool) {
                createErrorMessage(result.message, 'pcInputErrorContainer')
                $(className).addClass('input-error')
                return undefined
            }
        }
        else if(valueType == 'variable') {
            let variableName: string

            variableName = $(className).find('select').find('option').filter(':selected').val() as string
            if(variableName == '') {
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer')
                $(className).find('select').addClass('input-error')
                return undefined
            }

            variable = findVariable(variableName)
        }

        return variable
    }

    function createArithmeticStatement() {
        let firstValueType = $('.first-select-value-type-1').find('option').filter(':selected').val() as string
        let secondValueType = $('.second-select-value-type-1').find('option').filter(':selected').val() as string
        let firstVariable: Variable | undefined = undefined
        let secondVariable: Variable | undefined = undefined
        let firstChild: Arithmetic | undefined = undefined
        let secondChild: Arithmetic | undefined = undefined
        let isFirstCustom: boolean = false
        let isSecondCustom: boolean = false
        let operators = ['+', '-', '/', '*', '%']
        let radioClassName = 'op-asg-1'
        let value: string
        let targetVariable: Variable 
        let listArithmetic = []
        let listOperator = []
        let listIsCustom = []
        
        value = $('.selected-target-variable-asg').find('option').filter(':selected').val() as string
        targetVariable = findVariable(value)

        if(firstValueType == 'operation') {
            let temp = assignmentStructure['first-value-1']
            firstChild = createArithmeticAssignment(temp)
            listArithmetic.push(firstChild)
        }
        else if(firstValueType == 'variable') { 
            let variableName: string
            variableName = $('.first-value-1').find('select').find('option').filter(':selected').val() as string
            firstVariable = findVariable(variableName)
            listArithmetic.push(firstVariable)
            listIsCustom.push(false)
        }
        else {
            isFirstCustom = true
            let value = $('.first-value-1').val() as string
            firstVariable = createVariableFromValue(value)
            listArithmetic.push(firstVariable)
            listIsCustom.push(true)
        }

        if(secondValueType == 'operation') {
            let temp = assignmentStructure['second-value-1']
            secondChild = createArithmeticAssignment(temp)
            listArithmetic.push(secondChild)
        }
        else if(secondValueType == 'variable') { 
            let variableName: string
            variableName = $('.second-value-1').find('select').find('option').filter(':selected').val() as string
            secondVariable = findVariable(variableName)
            listArithmetic.push(secondVariable)
            listIsCustom.push(false)
        }
        else {
            isSecondCustom = true
            let value = $('.second-value-1').val() as string
            secondVariable = createVariableFromValue(value)
            listArithmetic.push(secondVariable)
            listIsCustom.push(true)
        }

        let radio = $("input[type='radio'][name='" + radioClassName + "']")
        let checkedIdx = -1
        for(let i = 0; i < radio.length; i++) {
            if((radio[i] as any).checked == true) {
                checkedIdx = i 
                break
            }
        }

        listOperator.push(operators[checkedIdx])

        let assignmentStatement = new AssignmentStatement(statementCount++, 1, 'arithmetic', 
            targetVariable, listArithmetic, listOperator, listIsCustom, undefined, undefined, undefined, undefined)
    
        handleAdd(assignmentStatement)
        restructureStatement()
        turnOffOptions()
        clearSourceCode()
        initInput('Program Input')
        drawCanvas()
    }

    function createArithmeticAssignment(idx: number): Arithmetic {
        let firstValueType = $('.first-select-value-type-' + idx).find('option').filter(':selected').val() as string
        let secondValueType = $('.second-select-value-type-' + idx).find('option').filter(':selected').val() as string
        let firstVariable: Variable | undefined = undefined
        let secondVariable: Variable | undefined = undefined
        let firstChild: Arithmetic | undefined = undefined
        let secondChild: Arithmetic | undefined = undefined
        let isFirstCustom: boolean = false
        let isSecondCustom: boolean = false
        let operators = ['+', '-', '/', '*', '%']
        let radioClassName = 'op-asg-' + idx

        if(firstValueType == 'operation') {
            let temp = assignmentStructure['first-value-' + idx]
            firstChild = createArithmeticAssignment(temp)
        }
        else if(firstValueType == 'variable') { 
            let variableName: string
            variableName = $('.first-value-' + idx).find('select').find('option').filter(':selected').val() as string
            firstVariable = findVariable(variableName)
        }
        else {
            isFirstCustom = true
            let value = $('.first-value-' + idx).val() as string
            firstVariable = createVariableFromValue(value)
        }

        if(secondValueType == 'operation') {
            let temp = assignmentStructure['second-value-' + idx]
            secondChild = createArithmeticAssignment(temp)
        }
        else if(secondValueType == 'variable') { 
            let variableName: string
            variableName = $('.second-value-' + idx).find('select').find('option').filter(':selected').val() as string
            secondVariable = findVariable(variableName)
        }
        else {
            isSecondCustom = true
            let value = $('.second-value-' + idx).val() as string
            secondVariable = createVariableFromValue(value)
        }

        let radio = $("input[type='radio'][name='" + radioClassName + "']")
        let checkedIdx = -1
        for(let i = 0; i < radio.length; i++) {
            if((radio[i] as any).checked == true) {
                checkedIdx = i 
                break
            }
        }

        return new Arithmetic(firstVariable, secondVariable, firstChild, secondChild, operators[checkedIdx], isFirstCustom, isSecondCustom)
    }

    // Assignment Variable

    function createVariableAssignmentInput() {
        let listVariable: Variable[] = getAllVariables()

        let container = $('<div></div>')
        let container1 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3 mt-2')
        let variableTitle = $('<div></div>').append($('<strong></strong>').text('Variable')).addClass('col-sm-5 col-5')
        let variableSelect = createSelect(listVariable, 7, true).attr('id', 'chosen-asg-variable')

        let container2 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3')
        let valueTypeTitle = $('<div></div>').append($('<strong></strong>').text('Value Type')).addClass('col-sm-5 col-5')
        let valueTypeContainer = $('<div></div>').addClass('col-sm-7 col-7')
        let valueTypeSelect = $('<select></select>').addClass('form-select choose-asg-value-type')
        valueTypeSelect.append($('<option></option>').val('variable').text('Variable'))
        valueTypeSelect.append($('<option></option>').val('custom').text('Custom Value'))

        let container3 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3')
        let valueTitle = $('<div></div>').append($('<strong></strong>').text('Value')).addClass('col-sm-5 col-5')
        let valueContainer = $('<div></div>').addClass('col-sm-7 col-7 value-container-asg')
        let valueSelect = createSelect(listVariable, 12, true).attr('id', 'chosen-asg-value')

        container1.append(variableTitle)
        container1.append(variableSelect)

        container2.append(valueTypeTitle)
        valueTypeContainer.append(valueTypeSelect)
        container2.append(valueTypeContainer)
        
        container3.append(valueTitle)
        valueContainer.append(valueSelect)
        container3.append(valueContainer)

        container.append(container1)
        container.append(container2)
        container.append(container3)
        
        $('#pcInputContainer').append(container)
    }

    $(document).on('change', '.choose-asg-value-type', function() {
        $('.value-container-asg').empty()
        let input: any

        if($(this).find('option').filter(':selected').val() == 'custom') {
            input = $('<input>').attr('type', 'text').addClass('form-control').attr('id', 'chosen-asg-value')
        }
        else {
            let listVariable = getAllVariables()
            input = createSelect(listVariable, 12, true).attr('id', 'chosen-asg-value')
        }

        $('.value-container-asg').append(input)
    })

    $(document).on('click', '#create-asg-variable-button', function() {
        clearError()
        let firstVariableName = $('#chosen-asg-variable').find('option').filter(':selected').val()
        let firstVariable: Variable
        let secondVariable: Variable
        let isCustom: boolean = false
        let result: Return

        if(firstVariableName == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer')
            $('#chosen-asg-variable').addClass('input-error')
            return
        }
        firstVariable = findVariable(firstVariableName as string)

        if($('.choose-asg-value-type').find('option').filter(':selected').val() == 'custom') {
            isCustom = true
            let value = $('#chosen-asg-value').val() as string
            if(value == '') {
                createErrorMessage('Input field cannot be empty', 'pcInputErrorContainer')
                $('#chosen-asg-value').addClass('input-error')
                return
            }

            secondVariable = createVariableFromValue(value)          

            result = secondVariable.validateValue()
            if(!result.bool) {
                $('#chosen-asg-value').addClass('input-error')
                createErrorMessage(result.message, 'pcInputErrorContainer')
                return
            }
        }
        else {
            isCustom = false
            let value = $('#chosen-asg-value').find('option').filter(':selected').val() as string
            if(value == '') {
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer')
                $('#chosen-asg-value').addClass('input-error')
                return
            }
            secondVariable = findVariable(value)
        }

        if(firstVariable instanceof String || secondVariable instanceof String) {
            if(firstVariable instanceof String && secondVariable instanceof String) { }
            else {
                $('#chosen-asg-value').addClass('input-error')
                createErrorMessage('Could not assign other data type with String data type', 'pcInputErrorContainer')
                return
            }
        }
        let statement = new AssignmentStatement(statementCount++, 1, 'variable', 
            firstVariable, undefined, undefined, undefined, secondVariable, isCustom, undefined, undefined)

        handleAdd(statement)
        restructureStatement()
        turnOffOptions()
        clearSourceCode()
        initInput('Program Input')
        drawCanvas()
    })

    // Canvas logic
    initializeCanvas()

    var blockCanvasInstance: Canvas // instance of Class Canvas
    var canvas: any
    var option: Option | undefined = undefined

    // Variables to handle canvas interaction (add, mov, pst)
    var clipboard: Statement | undefined = undefined
    var lastSelectedOption: string | undefined = undefined 
    var returnClick: ReturnClick | undefined = undefined

    // Initialize Canvas
    function initializeCanvas() {
        canvas = document.getElementById('block-code-canvas')
        resizeCanvas()
        handleCanvasClick()
        blockCanvasInstance = new Canvas(canvas, canvas.getContext('2d'), 40, 30, 5)
        
        setTimeout(function() {
            option = new Option('special', blockCanvasInstance.PADDING, blockCanvasInstance.PADDING, 
                blockCanvasInstance.LINE_HEIGHT, blockCanvasInstance.LINE_HEIGHT, undefined);
            option.draw(blockCanvasInstance)
            blockCanvasInstance.updateLastPosition()
        }, 50)
    }

    // Resize Canvas
    function resizeCanvas(): void {
        let cv: any
        let con = $("#block-code-container")
        cv = $("#block-code-canvas")[0]
        let aspect = cv.height / cv.width
        let width = con.width() as number
        let height = con.height()
    
        canvas.width = width;
        // canvas.height = Math.round(width * aspect);
        canvas.height = height * 10
    }

    function drawCanvas(): void {
        blockCanvasInstance.clearCanvas()
        let statement

        option.draw(blockCanvasInstance)
        blockCanvasInstance.updateLastPosition()

        for(let i = 0 ; i < listStatement.length; i++) {
            statement = listStatement[i]
            statement.writeToCanvas(blockCanvasInstance)
        }
    }

    function turnOffOptions() {
        if(option != undefined)
            option.isSelectionActive = false

        if(listStatement != undefined)
            for(let i = 0; i < listStatement.length; i++) 
                (listStatement[i] as Statement).turnOffOption()
    }

    // Handle Event
    function handleCanvasClick() {
        canvas.addEventListener('click', (event: any) => {
            $('#bcErrorContainer').empty()
            const rect = canvas.getBoundingClientRect()
            let x = event.clientX - rect.left
            let y = event.clientY - rect.top
            let statement 

            returnClick = option.clickOption(blockCanvasInstance, x, y)

            if(!returnClick) {
                for(let i = 0; i < listStatement.length; i++) {
                    statement = listStatement[i]
                    returnClick = statement.callClickEvent(blockCanvasInstance, x, y)
                    if(returnClick != undefined)
                        break
                }
            }

            if(returnClick != undefined) {
                if(returnClick.isClose != undefined) {
                    finishAction()
                    return
                }

                if(returnClick.option.optionName == 'ADD') {
                    clipboard = returnClick.statement
                    lastSelectedOption = returnClick.option.optionName
                }
                else if(returnClick.option.optionName == 'PST') {
                    handlePaste()
                }
                else if(returnClick.option.optionName == 'MOV') {
                    clipboard = returnClick.statement
                    lastSelectedOption = returnClick.option.optionName
                }
                else if(returnClick.option.optionName == 'CPY') {
                    if(returnClick.statement instanceof DeclareStatement) {
                        createErrorMessage('Could not copy declare statement!', 'bcErrorContainer')
                        finishAction()
                        restructureStatement()
                        turnOffOptions()
                        clearSourceCode()
                        initInput('Program Input')
                        drawCanvas()
                        return
                    }
                    clipboard = cloneStatement(returnClick.statement)
                    lastSelectedOption = returnClick.option.optionName
                }
                else if(returnClick.option.optionName == 'DEL') {
                    clipboard = returnClick.statement
                    lastSelectedOption = returnClick.option.optionName
                    handleDelete()
                }
            }
        })
    }

    function handleAdd(statement: Statement): void {
        let returnPaste: ReturnPaste

        // Initialize
        if(lastSelectedOption == undefined && clipboard == undefined && returnClick == undefined) {
            listStatement.push(statement)
        }
        // Action taken, user chose ADD
        else if(lastSelectedOption == 'ADD' && returnClick != undefined) {
            returnPaste = returnClick.option.addStatement(listStatement, statement, clipboard, returnClick.option.optionId)
            
            if(returnPaste.result == true) {
                finishAction()
                listStatement = returnPaste.listStatement
            }
            else {
                if(statement instanceof DeclareStatement) 
                    deleteVariable(statement.variable)
                createErrorMessage('Could not add statement here', 'bcErrorContainer')
                finishAction()
            }
        }
    }

    function handlePaste(): void {
        let returnPaste: ReturnPaste

        if(clipboard == undefined) {
            createErrorMessage('Clipboard is empty!', 'bcErrorContainer')
            finishAction()
            restructureStatement()
            turnOffOptions()
            clearSourceCode()
            initInput('Program Input')
            drawCanvas()
            return
        }
        
        if(clipboard.findStatement(returnClick.statement)) {
            createErrorMessage('Could not paste statement here!', 'bcErrorContainer')
            finishAction()
            restructureStatement()
            turnOffOptions()
            clearSourceCode()
            initInput('Program Input')
            drawCanvas()
            return
        }
        
        let splitted: string[] = returnClick.option.optionId.split('-')
        let isInner: boolean = splitted[splitted.length-1] == 'inner' ? true : false

        if(lastSelectedOption == 'MOV' || lastSelectedOption == 'CPY') {
            returnPaste = returnClick.option.handlePaste(listStatement, clipboard, returnClick.statement, isInner, lastSelectedOption)
            listStatement = returnPaste.listStatement

            if(returnPaste.result == false) {
                createErrorMessage('Could not paste statement here!', 'bcErrorContainer')
            }    
        }

        finishAction()
        restructureStatement()
        turnOffOptions()
        clearSourceCode()
        initInput('Program Input')
        drawCanvas()
    }

    function handleDelete(): void {
        let returnPaste: ReturnPaste | undefined = undefined

        returnPaste = returnClick.option.handleDelete(listStatement, clipboard)
        if(returnPaste.result == false) {
            createErrorMessage('Variable is used on another statement!', 'bcErrorContainer')
        }
        else {
            if(clipboard instanceof DeclareStatement) {
                deleteVariable((clipboard as DeclareStatement).variable)
            }
        }

        finishAction()
        restructureStatement()
        turnOffOptions()
        clearSourceCode()
        initInput('Program Input')
        drawCanvas()
    }

    function finishAction(): void {
        returnClick = undefined
        clipboard = undefined
        lastSelectedOption = undefined
    }

    function restructureStatement(): void {
        if(listStatement == undefined)
            return
        
        for(let i = 0; i < listStatement.length; i++) {
            listStatement[i].moveToSurface()
            listStatement[i].updateChildLevel()
        }
    }

    // Create template
    function blankTemplate(): void {
        for(let i = 0; i < listStatement.length; i++) {
            if(listStatement[i] instanceof DeclareStatement) 
                deleteVariable((listStatement[i] as DeclareStatement).variable)
        }
        listStatement = []
    }

    function declareVariableTemplate(): void {
        let variableName = 'myNumber'
        let variable: any

        allVariableNames[variableName] = true
        variable = new Integer(variableName, 50)
        listInteger.push(variable)
            
        handleAdd(new DeclareStatement(statementCount++, 1, variable))
    }

    function simplyPrintTemplate(): void {
        let outputStatement = new OutputStatement(statementCount++, 1, true, 'text', undefined, "Hello World!")
        handleAdd(outputStatement)
    }

    function inputOutputTemplate(): void {
        let variableName = 'myNumber'
        let variable: any

        allVariableNames[variableName] = true
        variable = new Integer(variableName, 0)
        listInteger.push(variable)

        handleAdd(new DeclareStatement(statementCount++, 1, variable))
        handleAdd(new OutputStatement(statementCount++, 1, false, 'text', undefined, 'Input number: '))
        handleAdd(new InputStatement(statementCount++, 1, variable))
        handleAdd(new OutputStatement(statementCount++, 1, false, 'text', undefined, 'The number is: '))
        handleAdd(new OutputStatement(statementCount++, 1, true, 'variable', variable))
    }

    function nestedIfTemplate(): void {
        let variableName = 'myScore'
        let variable: any

        allVariableNames[variableName] = true
        variable = new Integer(variableName, 0)
        listInteger.push(variable)
        handleAdd(new DeclareStatement(statementCount++, 1, variable))
        handleAdd(new OutputStatement(statementCount++, 1, false, 'text', undefined, 'Input score: '))
        handleAdd(new InputStatement(statementCount++, 1, variable))

        let ifStatement = new IfStatement(1, statementCount++, undefined)
        let firstIf = new If(1, statementCount++, new Condition(variable, '<', new Integer('x', 65), true))
        let secondIf = new Else(1, statementCount++, undefined)
        let failInnerIf: Statement
        let successInnerIf: Statement
        let temp = []

        failInnerIf = createIf(variable, 30, 45, ['F', 'E', 'D'])
        temp.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, 'You failed'))
        temp.push(failInnerIf)
        firstIf.updateChildStatement(temp)

        successInnerIf = createIf(variable, 75, 85, ['C', 'B', 'A'])
        temp = []
        temp.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, 'You passed!'))
        temp.push(successInnerIf)
        secondIf.updateChildStatement(temp)

        let ifOperations = []
        ifOperations.push(firstIf)
        ifOperations.push(secondIf)
        ifStatement.updateIfOperations(ifOperations)

        handleAdd(ifStatement)
    }

    function createIf(variable: Variable, lower: number, upper: number, grades: string[]): Statement {
        let ifStatement = new IfStatement(1, statementCount++, undefined)
        let firstIf = new If(1, statementCount++, new Condition(variable, '<', new Integer('x', lower), true))
        let secondIf = new Elif(1, statementCount++, new Condition(variable, '>=', new Integer('x', lower), true), 'AND', new Condition(variable, '<', new Integer('x', upper), true))
        let thirdIf = new Else(1, statementCount, undefined)

        let statements = []
        statements.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, 'Your grade is ' + grades[0]))
        firstIf.updateChildStatement(statements)

        statements = []
        statements.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, 'Your grade is ' + grades[1]))
        secondIf.updateChildStatement(statements)

        statements = []
        statements.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, 'Your grade is ' + grades[2]))
        thirdIf.updateChildStatement(statements)

        let ifOperations = []
        ifOperations.push(firstIf)
        ifOperations.push(secondIf)
        ifOperations.push(thirdIf)

        ifStatement.updateIfOperations(ifOperations)

        return ifStatement
    }

    function nestedForTemplate() {
        let variable = new Integer('i', 0)
        let variable2 = new Integer('j', 0)

        let declareStatement = new DeclareStatement(statementCount++, 1, variable)
        let declareStatement2 = new DeclareStatement(statementCount++, 1, variable2)

        let forStatement = new ForStatement(1, statementCount++, undefined, variable, true, true, 1, new Condition(variable, '<', new Integer('x', 2), true))
        let nestedForStatement = new ForStatement(1, statementCount++, undefined, variable2, true, true, 1, new Condition(variable2, '<', new Integer('x', 3), true))
        let temp = []

        temp.push(new OutputStatement(statementCount++, 1, false, 'text', undefined, 'i: '))
        temp.push(new OutputStatement(statementCount++, 1, false, 'variable', variable))
        temp.push(new OutputStatement(statementCount++, 1, false, 'text', undefined, ' j: '))
        temp.push(new OutputStatement(statementCount++, 1, true, 'variable', variable2))
        nestedForStatement.updateChildStatement(temp)

        temp = []
        temp.push(nestedForStatement)   
        forStatement.updateChildStatement(temp)

        handleAdd(declareStatement)
        handleAdd(declareStatement2)
        handleAdd(forStatement)
    }

    function menuTemplate(): void {
        let variable = new Integer('choice', 0)
        allVariableNames['choice'] = true
        listInteger.push(variable)

        let declareStatement = new DeclareStatement(statementCount++, 1, variable)
        let whileStatement = new WhileStatement(1, statementCount, false, undefined, new Condition(variable, '!=', new Integer('x', 4), true))
        let temp = []
        temp.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, "1. Print 'Hello'"))
        temp.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, "2. Print 'World'"))
        temp.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, "3. Print 'Lorem'"))
        temp.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, "4. Exit"))
        temp.push(new OutputStatement(statementCount++, 1, false, 'text', undefined, "Choice: "))
        temp.push(new InputStatement(statementCount++, 1, variable))
        temp.push(createSwitchStatement(variable))
        whileStatement.updateChildStatement(temp)

        handleAdd(declareStatement)
        handleAdd(whileStatement)
    }

    function createSwitchStatement(variable: Variable): Statement {
        let switchStatement = new SwitchStatement(1, statementCount++, variable, undefined)
        let temp = []
        let caseStatements = []
        let firstCase = new Case(1, statementCount++, new Condition(variable, '==', new Integer('x', 1), true), undefined, false)
        let secondCase = new Case(1, statementCount++, new Condition(variable, '==', new Integer('x', 2), true), undefined, false)
        let thirdCase = new Case(1, statementCount++, new Condition(variable, '==', new Integer('x', 3), true), undefined, false)
        temp.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, "Hello"))
        firstCase.updateChildStatement(temp)
        temp = []

        temp.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, "World"))
        secondCase.updateChildStatement(temp)
        temp = []

        temp.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, "Lorem"))
        thirdCase.updateChildStatement(temp)
        temp = []
        
        caseStatements.push(firstCase)
        caseStatements.push(secondCase)
        caseStatements.push(thirdCase)

        switchStatement.updateCaseStatement(caseStatements)
        
        return switchStatement
    }

    function drawSquareTemplate() {
        let variable = new Integer('count', 0)
        allVariableNames['count'] = true
        listInteger.push(variable)

        let i = new Integer('i', 0)
        let j = new Integer('j', 0)

        let declareStatement = new DeclareStatement(statementCount++, 1, variable)
        let declareI = new DeclareStatement(statementCount++, 1, i)
        let declareJ = new DeclareStatement(statementCount++, 1, j)
        let outputStatement = new OutputStatement(statementCount++, 1, false, 'text', undefined, 'Input square size: ', undefined, undefined)
        let inputStatement = new InputStatement(statementCount++, 1, variable)

        let forStatement = new ForStatement(1, statementCount++, undefined, i, true, true, 1, new Condition(i, '<', variable, false))
        let nestedForStatement = new ForStatement(1, statementCount++, undefined, j, true, true, 1, new Condition(j, '<', variable, false))
        let temp = []

        temp.push(new OutputStatement(statementCount++, 1, false, 'text', undefined, '*'))
        nestedForStatement.updateChildStatement(temp)

        temp = []
        temp.push(nestedForStatement)
        temp.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, ''))
        forStatement.updateChildStatement(temp)


        handleAdd(declareI)
        handleAdd(declareJ)
        handleAdd(declareStatement)
        handleAdd(outputStatement)
        handleAdd(inputStatement)
        handleAdd(forStatement)
    }

    function oddEvenTemplate() { 
        let variable = new Integer('number', 0)
        allVariableNames['number'] = true
        listInteger.push(variable)

        let outputStatement = new OutputStatement(statementCount++, 1, false, 'text', undefined, 'Please input a number: ', undefined, undefined)
        let ifStatement = new IfStatement(1, statementCount++, undefined)
        let firstIf = new If(1, statementCount++, new Condition(variable, '==', new Integer('x', 0), true))
        let secondIf = new Elif(1, statementCount++, new Condition(variable, '==', new Integer('x', 1), true))
        let ifOperations = []
        let temp = []

        temp.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, 'The number is an even number'))
        firstIf.updateChildStatement(temp)

        temp = []
        temp.push(new OutputStatement(statementCount++, 1, true, 'text', undefined, 'The number is an odd number'))
        secondIf.updateChildStatement(temp)

        ifOperations.push(firstIf)
        ifOperations.push(secondIf)
        ifStatement.updateIfOperations(ifOperations)

        let listArithmetic = []
        listArithmetic.push(new Arithmetic(variable, new Integer('x', 2), undefined, undefined, '%', false, true))
        let assignmentStatement = new AssignmentStatement(statementCount++, 1, 'arithmetic', 
            variable, listArithmetic, undefined, undefined, undefined, undefined, undefined, undefined)

        handleAdd(new DeclareStatement(statementCount++, 1, variable))
        handleAdd(outputStatement)
        handleAdd(new InputStatement(statementCount++, 1, variable))
        handleAdd(assignmentStatement)
        handleAdd(ifStatement)
    }

    // Source Code Logic

    function clearSourceCode(): void {
        $('#source-code-container').val('')
    }

    $(document).on('click', '#btn-generate-source-code', function() {
        let language = $('.selected-programming-language').find('option').filter(':selected').val() as string
        let lang: Language

        if(language == 'c') {
            lang = new C(listStatement)
        }
        else if(language == 'cpp') {
            lang = new Cpp(listStatement)
        }
        else if(language == 'cs') {
            lang = new Cs(listStatement)
        }
        else if(language == 'java') {
            lang = new Java(listStatement)
        }
        else if(language == 'python') {
            lang = new Python(listStatement)
        }
        
        $('#source-code-container').val('')
        $('#source-code-container').val(lang.generateSourceCode())
    })

    let fontSize = 14

    $(document).on('click', '.change-font-size', function() {
        if($(this).data('value') == 'plus')
            $('#source-code-container').css('font-size', ++fontSize + 'px')
        else 
            $('#source-code-container').css('font-size', --fontSize + 'px')

        $('#font-size-input').val(fontSize)
    })

    $(document).on('change', '#font-size-input',  function() {
        let temp = $('#font-size-input').val() as string
        let tempFontSize = parseInt(temp)

        if(isNaN(tempFontSize) || tempFontSize < 1 || tempFontSize > 40) {
            fontSize = 14
            $('#source-code-container').css('font-size', fontSize + 'px')
            $('#font-size-input').val(fontSize)
        }
        else {
            fontSize = tempFontSize
            $('#source-code-container').css('font-size', fontSize + 'px')
            $('#font-size-input').val(fontSize)
        }
    })
})