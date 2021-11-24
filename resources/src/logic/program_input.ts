import Integer from '../classes/variable/Integer'
import Long from '../classes/variable/Long'
import Float from '../classes/variable/Float'
import Double from '../classes/variable/Double'
import Char from '../classes/variable/Char'
import String from '../classes/variable/String'
import DeclareStatement from '../classes/statement/DeclareStatement'
import IfStatement from '../classes/statement/IfStatement'
import If from '../classes/statement/helper/If'
import Elif from '../classes/statement/helper/Elif'
import Condition from '../classes/statement/helper/Condition'
import Canvas from '../classes/canvas/Canvas'

$(document).ready(function() {

    // Before insert variable
    var declareVariableNameList: any[]
    var declareVariableValueList: any[]
    var variableIndex = 0

    // All declared variable names
    var allVariableNames: {[index: string]:any} = {}

    // Declared variables
    var listInteger = []
    var listFloat = []
    var listLong = []
    var listDouble = []
    var listChar = []
    var listString = []

    // Statement
    var statementCount = 0

    // Declared statements
    var listStatement: any[] = []

    // Helper Functions

    function createHint(text: string, length: number) {
        let className = "col-sm-" + length 
        let className2 = 'col-xs-' + length
        let strong = $('<strong></strong>').text(text)
        let div = $('<div></div>').addClass(className).addClass(className2).css('color', 'black')
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

    function clearError() {
        $('#pcInputErrorContainer').empty()

        for(let varName of declareVariableNameList)
            $('.' + varName).removeClass('input-error')

        for(let varValue of declareVariableValueList)
            $('.' + varValue).removeClass('input-error')
    }

    function initInputDeclare(title: string) {
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
            
            listStatement.push(new DeclareStatement(statementCount++, 1, variable))
        }
    }

    // Declare Variable

    $(document).on('click', '.addVariableDeclareBtn', function() { 
        console.log($(this).data('value'))
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
        pushStatement()
    })

    $('.declareVariable').on('click', function() {
        let isNumericValue

        if($(this).data('value') == 'int')
            initInputDeclare('Declare Integer')
        else if($(this).data('value') == 'long')
            initInputDeclare('Declare Long')
        else if($(this).data('value') == 'float')
            initInputDeclare('Declare Float')
        else if($(this).data('value') == 'double')
            initInputDeclare('Declare Double')
        else if($(this).data('value') == 'char')
            initInputDeclare('Declare Char')
        else if($(this).data('value') == 'string')
            initInputDeclare('Declare String')
        
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

    // Helper Functions

    function initInputVariable() {
        $('#pcInputErrorContainer').empty()
        $('#pcInputContainer').empty()
        $('#pcInputContainerLower').empty()
        $('#command-name').text('')

        declareVariableNameList = []
        declareVariableValueList = []
        variableIndex = 0
    }

    // Input to Variable
    $(document).on('click', '.inputVariable', function() {
        if($(this).data('value') == 'int') {
            initInputDeclare('Declare Integer')
            testing()
        }
        else if($(this).data('value') == 'long')
            initInputDeclare('Declare Long')
        else if($(this).data('value') == 'float')
            initInputDeclare('Declare Float')
        else if($(this).data('value') == 'double')
            initInputDeclare('Declare Double')
        else if($(this).data('value') == 'char')
            initInputDeclare('Declare Char')
        else if($(this).data('value') == 'string')
            initInputDeclare('Declare String')
    })


    // Canvas logic
    initializeCanvas()

    var blockCanvasInstance: Canvas // instance of Class Canvas
    var canvas: any

    // Initialize Canvas
    function initializeCanvas() {
        canvas = document.getElementById('block-code-canvas')
        resizeCanvas()
        handleCanvasClick()
        blockCanvasInstance = new Canvas(canvas, canvas.getContext('2d'), 40, 30, 5)
        
        setTimeout(function() {
            blockCanvasInstance.createOption(30, 30)
            blockCanvasInstance.updateLastPosition()
        }, 50)
    }

    // Resize Canvas
    function resizeCanvas(){
        let cv: any
        let con = $("#block-code-container")
        cv = $("#block-code-canvas")[0]
        let aspect = cv.height / cv.width
        let width = con.width() as number
        let height = con.height()
    
        canvas.width = width;
        canvas.height = Math.round(width * aspect);
    }

    // Handle Event
    function handleCanvasClick() {
        canvas.addEventListener('click', (event: any) => {
            const rect = canvas.getBoundingClientRect()
            let x = event.clientX - rect.left
            let y = event.clientY - rect.top
            let statement 
            let temp: any = undefined

            for(let i = 0; i < listStatement.length; i++) {
                statement = listStatement[i]
                temp = statement.callClickEvent(blockCanvasInstance, x, y)
                if(temp != undefined)
                    break
            }
            console.log(temp)
        })
    }

    function pushStatement() {
        blockCanvasInstance.clearCanvas()
        let statement

        for(let i = 0 ; i < listStatement.length; i++) {
            statement = listStatement[i]
            statement.writeToCanvas(blockCanvasInstance)
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
})