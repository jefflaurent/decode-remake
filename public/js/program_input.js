import Variable from './classes/variable/Variable'

$(document).ready(function() {

    var declareVariableNameList = []
    var declareVariableValueList = []
    
    function createHint(text, length) {
        let className = "col-lg-" + length 
        let strong = $('<strong></strong>').text(text)
        let div = $('<div></div>').addClass(className).css('color', 'black')
        div.append(strong)

        return div
    }

    function createInputField(inputType, length) {
        let variableName = 'var' + variableIndex++
        let className = "col-lg-" + length 

        return $('<input></input>').attr({ type: inputType, name: variableName}).addClass(className).addClass('form-control')
    }

    function createDeclareInteger(required) {
        let container = $('<div></div>').addClass('col-lg-12').addClass('row').addClass('mb-2')
        container.append(createHint('Variable Name', 5))
        container.append(createHint('Initial Value', 5))
        
        let inputContainer = $('<div></div>').addClass('col-lg-12').addClass('row').addClass('mb-4')
        let variableClassName = 'var-name-' + declareVariableNameList.length
        let inputClassName = 'input-name-' + declareVariableValueList.length
        let container1 = $('<div></div>').addClass('col-lg-5')
        let container2 = $('<div></div>').addClass('col-lg-5')
        container1.append(createInputField('text', 12).addClass(variableClassName))
        container2.append(createInputField('number', 12).addClass(inputClassName))

        inputContainer.append(container1)
        inputContainer.append(container2)
        inputContainer.append($('<div></div>').addClass('col-lg-2'))

        $('#pcInputContainer').append(container)
        $('#pcInputContainer').append(inputContainer)
    }

    // Declare int
    $('#declareInt').click(function() {
        $('#pcInputContainer').empty()
        $('#pcInputContainerLower').empty()
        createDeclareInteger(true)

        let btn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-lg-3').
                    addClass('addVariableDeclareBtn').text('Add Variable')
        let createBtn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-lg-2').text('Create')

        $('#pcInputContainerLower').append(btn)
        $('#pcInputContainerLower').append($('<div></div>').addClass('col-lg-7'))
        $('#pcInputContainerLower').append(createBtn)
    })

    // Add variable declare button
    $(document).on('click', '.addVariableDeclareBtn', function() { 
        createDeclareInteger(false)
        var v = new Variable('asd', 5)
    })
})