import Char from '../variable/Char.js'
import Double from '../variable/Double.js'
import Float from '../variable/Float.js'
import Integer from '../variable/Integer.js'
import Long from '../variable/Long.js'
import String from '../variable/String.js'
import Statement from './Statement.js'
import Option from './helper/Option.js'

class DeclareStatement extends Statement {

    constructor(statementId, level, variable) {
        super()
        this.level = level
        this.variable = variable
        this.statementId = this.generateId(statementId)
        this.option = null
    }

    generateId(number) {
        if(this.variable instanceof Integer)
            return 'declare-integer-' + number 
        else if(this.variable instanceof Long)
            return 'declare-long-' + number
        else if(this.variable instanceof Float) 
            return 'declare-float-' + number
        else if(this.variable instanceof Double)
            return 'declare-double-' + number
        else if(this.variable instanceof Char)
            return 'declare-char-' + number
        else if(this.variable instanceof String)
            return 'declare-string-' + number
    }

    writeToCanvas(canvas) {
        let text = ''

        if(this.variable instanceof Integer)
            text = 'INTEGER ' + this.variable.name + ' = ' + this.variable.value
        else if(this.variable instanceof Long)
            text = 'LONG ' + this.variable.name + ' = ' + this.variable.value
        else if(this.variable instanceof Float)
            text = 'FLOAT ' + this.variable.name + ' = ' + this.variable.value
        else if(this.variable instanceof Double)
            text = 'DOUBLE ' + this.variable.name + ' = ' + this.variable.value
        else if(this.variable instanceof Char)
            text = 'CHAR ' + this.variable.name + ' = ' + "'" + this.variable.value + "'"
        else if(this.variable instanceof String)
            text = 'STRING ' + this.variable.name + ' = ' +  `"` + this.variable.value + `"`

        let coordinate = canvas.writeText(this.level, text)
        this.createOption(canvas, coordinate.x + canvas.SPACE,  coordinate.y - canvas.LINE_HEIGHT)
    }

    createOption(canvas, coorX, coorY) {
        this.option = new Option(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT)
        this.option.parent = this
        this.option.draw(canvas)
    }
    
    callClickEvent(x, y) {
        this.option.clickOption(x, y)
    }
}

export default DeclareStatement