import ReturnClick from "../../utilities/ReturnClick"
import ReturnClone from "../../utilities/ReturnClone"
import Canvas from "../canvas/Canvas"
import Char from "../variable/Char"
import Double from "../variable/Double"
import Float from "../variable/Float"
import Integer from "../variable/Integer"
import Long from "../variable/Long"
import Variable from "../variable/Variable"
import Option from "./helper/options/Option"
import Statement from "./Statement"

class InputStatement extends Statement {

    variable: Variable

    constructor(statementId: number, level: number, variable: Variable) {
        super(level)
        this.variable = variable
        this.statementId = this.generateId(statementId)
        this.color = '#f4be0b'
    }

    generateId(number: number): string {
        if(this.variable instanceof Integer)
            return 'input-integer-' + number 
        else if(this.variable instanceof Long)
            return 'input-long-' + number
        else if(this.variable instanceof Float) 
            return 'input-float-' + number
        else if(this.variable instanceof Double)
            return 'input-double-' + number
        else if(this.variable instanceof Char)
            return 'input-char-' + number
        else 
            return 'input-string-' + number
    }

    writeToCanvas(canvas: Canvas): void {
        let text = 'INPUT ' + this.variable.name
        let coordinate = canvas.writeText(this.level, text, this.color)
        this.createOption(canvas, coordinate.x + canvas.SPACE,  coordinate.y - canvas.LINE_HEIGHT)
    }

    createOption(canvas: Canvas, coorX: number, coorY: number): void {
        this.option = new Option(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this)
        this.option.parent = this
        this.option.draw(canvas)
    }
    
    callClickEvent(canvas: Canvas, x: number, y: number): ReturnClick | undefined {
        return this.option.clickOption(canvas, x, y)
    }

    findVariable(variable: Variable): Statement | undefined {
        if(this.variable.name == variable.name)
            return this

        return undefined
    }

    findStatement(statement: Statement): boolean {
        if(statement == this)
            return true
        
        return false
    }

    cloneStatement(statementCount: number): ReturnClone {
        return new ReturnClone(new InputStatement(statementCount, this.level, this.variable), true)
    }
}

export default InputStatement