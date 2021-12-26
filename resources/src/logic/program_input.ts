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
        let className2 = 'col-xs-' + length
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
        return $('<div></div>').addClass('col-sm-' + length).addClass('col-xs-' + length)
    }

    function createDeclareDataVariable(isRequired: boolean, isNumber: boolean) {
        let container = $('<div></div>').addClass('col-sm-12').addClass('col-xs-12')
        let hintContainer = $('<div></div>').addClass('col-sm-12').addClass('col-xs-12').addClass('mb-2').addClass('d-flex')
        hintContainer.append(createHint('Variable Name', 5))
        hintContainer.append(createWhiteSpace(1))
        hintContainer.append(createHint('Initial Value', 5))
        
        let inputContainer = $('<div></div>').addClass('col-sm-12').addClass('col-xs-12').addClass('mb-4').addClass('d-flex').addClass('align-items-center')
        let variableClassName = 'var-name-' + variableIndex
        let inputClassName = 'input-val-' + variableIndex
        let container1 = $('<div></div>').addClass('col-sm-5').addClass('col-xs-5')
        let container2 = $('<div></div>').addClass('col-sm-5').addClass('col-xs-5')
        let container3 = $('<div></div>').addClass('col-sm-1').addClass('col-xs-1').addClass('d-flex').addClass('justify-content-center')
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
        let className2 = 'col-xs-' + length
        let container = $('<div></div>').addClass(className).addClass(className2)
        let select = $('<select></select>').addClass('form-select').addClass('col-sm-12').addClass('col-xs-12')
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

        $('#chosenVariable').removeClass('input-error')
        $('#chosenOutputVariable').removeClass('input-error')
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
        let container = $('<div></div>').addClass('col-xs-12').addClass('col-sm-12').addClass('alert').addClass('alert-danger').text(message)
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

        let btn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-3').
                    addClass('col-xs-3').addClass('addVariableDeclareBtn').data('value', isNumericValue).text('Add Variable')
        let createBtn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-2').
                            addClass('col-xs-2').attr('id', 'createVariableBtn').data('value', $(this).data('value')).text('Create')

        $('#pcInputContainerLower').append(btn)
        $('#pcInputContainerLower').append($('<div></div>').addClass('col-sm-7').addClass('col-xs-7'))
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
                            addClass('col-xs-2').attr('id', 'inputVariableBtn').data('value', $(this).data('value')).text('Select')

        $('#pcInputContainerLower').append($('<div></div>').addClass('col-sm-10').addClass('col-xs-10'))
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
                drawCanvas()
            }
        }
    })

    // Click template button
    $(document).on('click', '.generateTemplate', function() {
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

            let inputBtn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-2').
                                addClass('col-xs-2').attr('id', 'outputVariableBtn').data('value', $(this).data('value')).text('Select')

            $('#pcInputContainerLower').append($('<div></div>').addClass('col-sm-10').addClass('col-xs-10'))
            $('#pcInputContainerLower').append(inputBtn)
        }
        else {
            initInput('Output Text')
            createOutputTextSelection()
        }
    })

    function createOutputTextSelection(): void {
        let row = $('<div></div>').addClass('row')
        let leftSide = $('<div></div>').addClass('col-sm-4').addClass('col-xs-4').addClass('mb-2')
        let rightSide = $('<div></div>').addClass('col-sm-8').addClass('col-xs-8')
        let listGroup = $('<div></div>').addClass('list-group').attr('id', 'list-tab').attr('role', 'tablist')
        let listGroupItem1 = $('<a></a>').addClass('list-group-item').addClass('list-group-item-action').addClass('active').attr('id', 'list-home-list').attr('data-bs-toggle', 'list').attr('href', '#list-home').text('Text')
        let listGroupItem2 = $('<a></a>').addClass('list-group-item').addClass('list-group-item-action').attr('id', 'list-profile-list').attr('data-bs-toggle', 'list').attr('href', '#list-profile').text('ASCII Code')
        let listGroupItem3 = $('<a></a>').addClass('list-group-item').addClass('list-group-item-action').attr('id', 'list-messages-list').attr('data-bs-toggle', 'list').attr('href', '#list-messages').text('Escape Sequence')

        listGroup.append(listGroupItem1)
        listGroup.append(listGroupItem2)
        listGroup.append(listGroupItem3)
        leftSide.append(listGroup)

        let tabContent = $('<div></div>').addClass('tab-content').attr('id', 'nav-tabContent')
        let tabPane1 = $('<div></div>').addClass('tab-pane').addClass('fade').addClass('show').addClass('active').attr('id', 'list-home').attr('role', 'tabpanel')
        let tabPane2 = $('<div></div>').addClass('tab-pane').addClass('fade').attr('id', 'list-profile').attr('role', 'tabpanel')
        let tabPane3 = $('<div></div>').addClass('tab-pane').addClass('fade').attr('id', 'list-messages').attr('role', 'tabpanel')

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
        
        let container1 = $('<div></div>').addClass('col-sm-12').addClass('col-xs-12').addClass('d-flex')
        let container2 = $('<div></div>').addClass('col-sm-12').addClass('col-xs-12').addClass('d-flex')
        let container3 = $('<div></div>').addClass('col-sm-12').addClass('col-xs-12').addClass('d-flex')

        let leftContainer1 = $('<div></div>').addClass('col-sm-8').addClass('col-xs-8').addClass('d-flex').addClass('align-items-center')
        let placeholder1 = $('<div></div>')
        let cb1 = $('<input>').attr('type', 'checkbox').addClass('form-check-input').attr('id', 'new-line-text')
        let lbl1 = $('<label></label>').addClass('form-check-label').addClass('ms-2').attr('for', 'new-line-text').text('Add new line')

        let leftContainer2 = $('<div></div>').addClass('col-sm-8').addClass('col-xs-8').addClass('d-flex').addClass('align-items-center')
        let placeholder2 = $('<div></div>')
        let cb2 = $('<input>').attr('type', 'checkbox').addClass('form-check-input').attr('id', 'new-line-ascii')
        let lbl2 = $('<label></label>').addClass('form-check-label').addClass('ms-2').attr('for', 'new-line-ascii').text('Add new line')

        let innerContainer1 = $('<div></div>').addClass('col-sm-4').addClass('col-xs-4').addClass('d-flex').addClass('justify-content-end')
        let innerContainer2 = $('<div></div>').addClass('col-sm-4').addClass('col-xs-4').addClass('d-flex').addClass('justify-content-end')
        let innerContainer3 = $('<div></div>').addClass('col-sm-4').addClass('col-xs-4').addClass('d-flex').addClass('justify-content-end')

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
        container3.append($('<div></div>').addClass('col-sm-8').addClass('col-xs-8'))
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
                statement = new OutputStatement(statementCount++, 1, true, 'variable', variable)
                handleAdd(statement)
                restructureStatement()
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
                else if(returnClick.option.optionName == 'EDT') {
                    clipboard = returnClick.statement
                    lastSelectedOption = returnClick.option.optionName
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
            return
        }

        console.log(clipboard)
        console.log(returnClick.statement)
        
        if(clipboard.findStatement(returnClick.statement)) {
            createErrorMessage('Could not paste statement here!', 'bcErrorContainer')
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

        let forStatement = new ForStatement(1, statementCount++, undefined, variable, true, true, 1, new Condition(variable, '<', new Integer('x', 2), true))
        let nestedForStatement = new ForStatement(1, statementCount++, undefined, variable2, true, true, 1, new Condition(variable2, '<', new Integer('x', 3), true))
        let temp = []

        temp.push(new OutputStatement(statementCount++, 1, false, 'text', undefined, 'i: '))
        temp.push(new OutputStatement(statementCount++, 1, true, 'variable', variable))
        temp.push(new OutputStatement(statementCount++, 1, false, 'text', undefined, 'j: '))
        temp.push(new OutputStatement(statementCount++, 1, true, 'variable', variable2))
        nestedForStatement.updateChildStatement(temp)

        temp = []
        temp.push(nestedForStatement)   
        forStatement.updateChildStatement(temp)

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
        let secondCase = new Case(1, statementCount++, new Condition(variable, '==', new Integer('x', 1), true), undefined, false)
        let thirdCase = new Case(1, statementCount++, new Condition(variable, '==', new Integer('x', 1), true), undefined, false)
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

        handleAdd(declareStatement)
        handleAdd(inputStatement)
        handleAdd(forStatement)
    }

    function oddEvenTemplate() { 
        let variable = new Integer('number', 0)
        allVariableNames['number'] = true
        listInteger.push(variable)

        let ifStatement = new IfStatement(1, statementCount++, undefined)
        let firstIf = new If(1, statementCount++, new Condition(variable, '==', new Integer('x', 0), true))
        let secondIf = new If(1, statementCount++, new Condition(variable, '==', new Integer('x', 1), true))
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

        handleAdd(new DeclareStatement(statementCount++, 1, variable))
        handleAdd(new InputStatement(statementCount++, 1, variable))
        handleAdd(new AssignmentStatement(statementCount++, 1, variable, new Integer('x', 2), '%', true))
        handleAdd(ifStatement)
    }
})