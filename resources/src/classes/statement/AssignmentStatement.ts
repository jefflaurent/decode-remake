import ReturnClick from "../../utilities/ReturnClick";
import ReturnClone from "../../utilities/ReturnClone";
import Canvas from "../canvas/Canvas";
import Variable from "../variable/Variable";
import Option from "./helper/options/Option";
import Statement from "./Statement";

class AssignmentStatement extends Statement {

    firstVariable: Variable
    secondVariable: Variable
    isCustomValue: boolean
    operator: string

    constructor(statementId: number, level: number, firstVariable: Variable, secondVariable: Variable, operator: string, isCustomValue: boolean) {
        super(level)
        this.statementId = this.generateId(statementId)
        this.firstVariable = firstVariable
        this.secondVariable = secondVariable
        this.operator = operator
        this.isCustomValue = isCustomValue
        this.color = '#f4be0b'
    }

    generateId(number: number): string {
        return 'assignment-statement-' + number
    }

    writeToCanvas(canvas: Canvas): void {
        let text = 'SET ' + this.firstVariable.name + ' = ' + this.generateBlockCodeText()
        let coordinate = canvas.writeText(this.level, text, this.color)
        this.createOption(canvas, coordinate.x + canvas.SPACE,  coordinate.y - canvas.LINE_HEIGHT)
    }

    generateBlockCodeText(): string {
        return this.isCustomValue ? this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value : 
            this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name 
    }

    createOption(canvas: Canvas, coorX: number, coorY: number): void {
        this.option = new Option(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this)
        this.option.parent = this
        this.option.draw(canvas)
    }
    
    callClickEvent(canvas: Canvas, x: number, y: number): ReturnClick | undefined {
        return this.option.clickOption(canvas, x, y)
    }

    findStatement(statement: Statement): boolean {
        if(statement == this)
            return true
        return false
    }

    findVariable(variable: Variable): Statement | undefined {
        if(variable.name == this.firstVariable.name)
            return this
        if(!this.isCustomValue) {
            if(variable.name == this.secondVariable.name)
                return this
        }
        
        return undefined
    }

    cloneStatement(statementCount: number): ReturnClone {
        return new ReturnClone(new AssignmentStatement(statementCount, this.level, this.firstVariable, this.secondVariable, this.operator, this.isCustomValue), true)
    }
}

export default AssignmentStatement