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

    function createSelect(listVariable: Variable[], length: number) {
        let className = 'col-sm-' + length
        let className2 = 'col-xs-' + length
        let container = $('<div></div>').addClass(className).addClass(className2)
        let select = $('<select></select>').addClass('form-select').addClass('col-sm-12').addClass('col-xs-12')
        let option

        select.append($('<option></option>').val(null).text('Choose Variable'))

        for(let variable of listVariable) {
            option = $('<option></option>').val(variable.name).text(variable.name)
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

    function createErrorMessage(message: string) {
        let container = $('<div></div>').addClass('col-xs-12').addClass('col-sm-12').addClass('alert').addClass('alert-danger').text(message)
        $('#pcInputErrorContainer').append(container)
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
            alert('Could not copy declare statement!')
            return undefined 
        }
        else {
            let returnClone: ReturnClone
            returnClone = statement.cloneStatement(statementCount++)
            if(returnClone.result == false) {
                alert('Could not copy declare statement!')
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
                createErrorMessage('Variable name must be unique')
                return
            }
            else
                tempAllVariableNames[variableName] = true

            if(!returnName.bool) {
                $('.' + declareVariableNameList[i]).addClass('input-error')
                createErrorMessage(returnName.message)
                return
            }

            if(sameVariableName) {
                $('.' + declareVariableNameList[i]).addClass('input-error')
                createErrorMessage('Variable name has been declared before')
                return
            }

            if(!returnValue.bool) {
                $('.' + declareVariableValueList[i]).addClass('input-error')
                createErrorMessage(returnValue.message)
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
            testing2()
        }
        else if($(this).data('value') == 'float') {
            initInput('Input Float')
            listVariable = listFloat
            testing3()
        }
        else if($(this).data('value') == 'double') {
            initInput('Input Double')
            listVariable = listDouble
            testing4()
        }
        else if($(this).data('value') == 'char') {
            initInput('Input Char')
            listVariable = listChar
            testing5()
        }
        else if($(this).data('value') == 'string') {
            initInput('Input String')
            listVariable = listString
            testing6()
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
            createErrorMessage('Please select a variable')
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
        if($(this).data('value') == 'blank') {
            blankTemplate()
        }
        else if($(this).data('value') == 'declare') {
            declareVariableTemplate()
        }
        else if($(this).data('value') == 'print') {
            simplyPrintTemplate()
        }
        else if($(this).data('value') == 'io') {

        }
        else if($(this).data('value') == 'nestedif') {

        }
        else if($(this).data('value') == 'nestedfor') {

        }
        else if($(this).data('value') == 'menu') {

        }
        else if($(this).data('value') == 'drawsquare') {

        }
        else if($(this).data('value') == 'oddeven') {

        }
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
            testing3()
        }
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
                        alert('Could not copy declare statement!')
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
                alert('Could not add statement here')
                finishAction()
            }
        }
    }

    function handlePaste(): void {
        let returnPaste: ReturnPaste

        if(clipboard == undefined) {
            alert('Clipboard is empty!')
            return
        }
        
        if(clipboard.findStatement(returnClick.statement)) {
            alert('Could not paste statement here!')
            return
        }
        
        let splitted: string[] = returnClick.option.optionId.split('-')
        let isInner: boolean = splitted[splitted.length-1] == 'inner' ? true : false

        if(lastSelectedOption == 'MOV' || lastSelectedOption == 'CPY') {
            returnPaste = returnClick.option.handlePaste(listStatement, clipboard, returnClick.statement, isInner, lastSelectedOption)
            listStatement = returnPaste.listStatement

            if(returnPaste.result == false) {
                alert('Could not paste statement here!')
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
            alert('Variable is used on another statement!')
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

    function testing() {
        let ifStatement = new IfStatement(1, statementCount++, undefined)
        let ifs = []
        let firstIf = new If(ifStatement.level, statementCount++, new Condition(new Integer('testInt', 5), '==', new Integer('testInt2', 10), true), undefined, undefined, undefined)
        let child1 = new DeclareStatement(statementCount++, firstIf.level + 1, new Integer('myInteger', 10))
        let child2 = new DeclareStatement(statementCount++, firstIf.level + 1, new Integer('mySecondInteger', 25))
        let childStatements = []
        childStatements.push(child1)
        childStatements.push(child2)
        firstIf.updateChildStatement(childStatements)

        let secondIf = new Elif(ifStatement.level, statementCount++, new Condition(new Integer('testInt3', 10), '!=', new Integer('testInt4', 200), false), undefined, undefined, undefined)
        let thirdIf = new Elif(ifStatement.level, statementCount++, new Condition(new Integer('testInt4', 10), '!=', new Integer('testInt6', 200), false), undefined, undefined, undefined)

        ifs.push(firstIf)
        ifs.push(secondIf)
        ifs.push(thirdIf)
        
        ifStatement.updateIfOperations(ifs)
        ifStatement.writeToCanvas(blockCanvasInstance)

        listStatement.push(ifStatement)
    }

    function testing2() {
        let ifStatement = new IfStatement(1, statementCount++, undefined)
        let ifs = []
        let firstIf = new If(ifStatement.level, statementCount++, new Condition(new Integer('testInt5', 5), '==', new Integer('testInt10', 10), true), undefined, undefined, undefined)
        let child1 = new DeclareStatement(statementCount++, firstIf.level + 1, new Integer('myInteger2', 10))
        let child2 = new DeclareStatement(statementCount++, firstIf.level + 1, new Integer('mySecondInteger2', 25))
        let childStatements = []
        childStatements.push(child1)
        childStatements.push(child2)
        firstIf.updateChildStatement(childStatements)

        let secondIf = new Elif(ifStatement.level, statementCount++, new Condition(new Integer('testInt6', 10), '!=', new Integer('testInt8', 200), false), undefined, undefined, undefined)
        let thirdIf = new Elif(ifStatement.level, statementCount++, new Condition(new Integer('testInt7', 10), '!=', new Integer('testInt9', 200), false), undefined, undefined, undefined)

        ifs.push(firstIf)
        
        ifStatement.updateIfOperations(ifs)

        ifStatement.writeToCanvas(blockCanvasInstance)

        listStatement.push(ifStatement)
    }

    function testing3() {
        let temp: Statement[] = []
        let ifStatement = new IfStatement(1, statementCount++, undefined)
        let ifs = []
        let firstIf = new If(ifStatement.level, statementCount++, new Condition(new Integer('testInt', 5), '==', new Integer('testInt2', 10), true), undefined, undefined, undefined)
        let child1 = new DeclareStatement(statementCount++, firstIf.level + 1, new Integer('myInteger', 10))
        let child2 = new DeclareStatement(statementCount++, firstIf.level + 1, new Integer('mySecondInteger', 25))
        let childStatements = []
        childStatements.push(child1)
        childStatements.push(child2)
        firstIf.updateChildStatement(childStatements)

        let secondIf = new Elif(ifStatement.level, statementCount++, new Condition(new Integer('testInt3', 10), '!=', new Integer('testInt4', 200), false), undefined, undefined, undefined)
        let thirdIf = new Elif(ifStatement.level, statementCount++, new Condition(new Integer('testInt4', 10), '!=', new Integer('testInt6', 200), false), undefined, undefined, undefined)

        ifs.push(firstIf)
        ifs.push(secondIf)
        ifs.push(thirdIf)
        
        ifStatement.updateIfOperations(ifs)
        temp.push(ifStatement)

        let forStatement = new ForStatement(1, statementCount++, undefined, 
            new Integer('testInt', 5), true, true, 1, new Condition(new Integer('testInt', 5), '<', new Integer('testInt2', 10), true))
        
        forStatement.updateChildStatement(temp)
        forStatement.updateChildLevel()

        forStatement.writeToCanvas(blockCanvasInstance)
        listStatement.push(forStatement)
    }

    function testing4() {
        let temp: Statement[] = []

        let switchStatement: SwitchStatement
        temp.push(new Case(2, statementCount++, new Condition(new Integer('tempInt', 5), '==', new Integer('tempInt2', 10), true), undefined, false))
        temp.push(new Case(2, statementCount++, undefined, undefined, true))
        switchStatement = new SwitchStatement(1, statementCount++, new Integer('tempInt', 5), undefined)
        switchStatement.updateChildStatement(temp)

        switchStatement.writeToCanvas(blockCanvasInstance)
        listStatement.push(switchStatement)
    }

    function testing5() {
        let temp: Statement[] = []  
        let whileStatement: WhileStatement

        whileStatement = new WhileStatement(1, statementCount++, true, undefined, new Condition(new Long('testLong', '15'), '<', new Long('testLong2', '500'), false), 'OR', new Condition(new Double('testDouble', '15'), '<', new Double('testDouble2', '500'), true))
        whileStatement.writeToCanvas(blockCanvasInstance)
        listStatement.push(whileStatement)
    }

    function testing6() {
        let ifStatement = new IfStatement(1, statementCount++, undefined)
        let temp = statementCount - 1
        let ifs = []
        let firstIf = new If(ifStatement.level, statementCount++, new Condition(new Integer('testInt5', 5), '==', new Integer('testInt10', 10), true), undefined, undefined, undefined)
        let child1 = new DeclareStatement(statementCount++, firstIf.level + 1, new Integer('myInteger2', 10))
        let child2 = new DeclareStatement(statementCount++, firstIf.level + 1, new Integer('mySecondInteger2', 25))
        let childStatements = []
        childStatements.push(child1)
        childStatements.push(child2)
        firstIf.updateChildStatement(childStatements)

        let secondIf = new Elif(ifStatement.level, statementCount++, new Condition(new Integer('testInt6', 10), '!=', new Integer('testInt8', 200), false), undefined, undefined, undefined)
        let thirdIf = new Elif(ifStatement.level, statementCount++, new Condition(new Integer('testInt7', 10), '!=', new Integer('testInt9', 200), false), undefined, undefined, undefined)

        ifs.push(firstIf)
        ifStatement.updateIfOperations(ifs)
        ifStatement.writeToCanvas(blockCanvasInstance)

        listStatement.push(ifStatement)
    }

    // Create template
    function blankTemplate(): void {
        for(let i = 0; i < listStatement.length; i++) {
            if(listStatement[i] instanceof DeclareStatement) 
                deleteVariable((listStatement[i] as DeclareStatement).variable)
        }
        listStatement = []

        finishAction()
        restructureStatement()
        drawCanvas()
    }

    function declareVariableTemplate(): void {
        let variableName = 'myNumber'
        let variable: any

        allVariableNames[variableName] = true
        variable = new Integer(variableName, 50)
        listInteger.push(variable)
            
        handleAdd(new DeclareStatement(statementCount++, 1, variable))

        finishAction()
        restructureStatement()
        drawCanvas()
    }

    function simplyPrintTemplate(): void {
        let outputStatement = new OutputStatement(statementCount++, 1, true, 'text')
        handleAdd(outputStatement)
        finishAction()
        restructureStatement()
        drawCanvas()
    }
})