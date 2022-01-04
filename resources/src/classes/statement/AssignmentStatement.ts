import ReturnClick from "../../utilities/ReturnClick";
import ReturnClone from "../../utilities/ReturnClone";
import Canvas from "../canvas/Canvas";
import Char from "../variable/Char";
import Variable from "../variable/Variable";
import Arithmetic from "./helper/assignment/Arithmetic";
import Option from "./helper/options/Option";
import Statement from "./Statement";

class AssignmentStatement extends Statement {

    targetVariable: Variable
    variable: Variable | undefined = undefined
    type: string
    listArithmetic: any[] | undefined = undefined
    listOperator: string[] | undefined = undefined
    listIsCustom: boolean[] | undefined = undefined
    isCustomValue: boolean = false
    start: number | undefined = undefined
    length: number | undefined = undefined

    constructor(statementId: number, level: number, type: string, targetVariable: Variable, 
        listArithmetic: any[] | undefined, listOperator: string[] | undefined,
        listIsCustom: boolean[] | undefined, variable: Variable | undefined, isCustomValue: boolean | undefined,
        start: number | undefined, length: number | undefined) {
        super(level)
        this.type = type
        this.statementId = this.generateId(statementId)
        this.targetVariable = targetVariable
        this.variable = variable
        this.listArithmetic = listArithmetic
        this.listOperator = listOperator
        this.listIsCustom = listIsCustom
        this.isCustomValue = isCustomValue
        this.start = start
        this.length = length
        this.color = '#f4be0b'
    }

    generateId(number: number): string {
        return 'assignment-statement-' + number
    }

    writeToCanvas(canvas: Canvas): void {
        let text = 'SET ' + this.targetVariable.name + ' = ' + this.generateBlockCodeText()
        let coordinate = canvas.writeText(this.level, text, this.color)
        this.createOption(canvas, coordinate.x + canvas.SPACE,  coordinate.y - canvas.LINE_HEIGHT)
    }

    generateBlockCodeText(): string {
        let text: string = ''
        if(this.type == 'arithmetic') 
            text = this.generateArithmeticText()
        else if(this.type == 'variable') 
            text = this.generateVariableText()
        else if(this.type == 'length')
            text = this.generateLengthText()
        else
            text = this.generateSubText()
        
        return text
    }

    generateArithmeticText(): string {
        let text = ''
        let opIdx = 0
        let customIdx = 0

        for(let i = 0; i < this.listArithmetic.length; i++) {
            if(this.listArithmetic[i] instanceof Variable) {
                if(this.listIsCustom != undefined) {
                    if(this.listIsCustom[customIdx])
                        text += ' ' + (this.listArithmetic[i] as Variable).value + ' '
                    else
                        text += ' ' + (this.listArithmetic[i] as Variable).name + ' '
                    customIdx++
                }
            }
            else {
                text += (this.listArithmetic[i] as Arithmetic).generateBlockCodeText()
            }
            
            if(this.listOperator != undefined) {
                if(opIdx < this.listOperator.length) {
                    text += ' ' + this.listOperator[opIdx] + ' '
                    opIdx++
                }
            }
        }
        
        return text
    }

    generateVariableText(): string {
        if(this.isCustomValue) {
            if(this.variable instanceof Char)
                return "'" + this.variable.value + "'"
            else
                return this.variable.value
        }
        else
            return this.variable.name
    }

    generateLengthText(): string {
        return 'LENGTH OF ' + this.variable.name
    }

    generateSubText(): string {
        return this.variable.name + ' FROM ' + this.start + ' WITH LENGTH ' + this.length
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
        if(this.type == 'variable') 
            return this.findTypeVariable(variable)
        else if(this.type == 'arithmetic')
            return this.findTypeArithmetic(variable)
        else
            return this.findTypeString(variable)
    }

    findTypeVariable(variable: Variable): Statement | undefined {
        if(this.targetVariable.name == variable.name) 
            return this
        if(!this.isCustomValue) {
            if(this.variable.name == variable.name)
                return this
        }

        return undefined
    }

    findTypeArithmetic(variable: Variable): Statement | undefined {
        let temp: boolean = false
        
        if(this.listArithmetic != undefined) {
            for(let i = 0; i < this.listArithmetic.length; i++) {
                temp = this.listArithmetic[i].findVariable(variable)
                if(temp)
                    return this
            }
        }

        return undefined
    }

    findTypeString(variable: Variable): Statement | undefined {
        if(this.targetVariable.name == variable.name)
            return this
        else if(this.variable.name == variable.name)
            return this
        
        return undefined
    }

    cloneStatement(statementCount: number): ReturnClone {
        let newStatement = new AssignmentStatement(statementCount, this.level, this.type, this.targetVariable, 
            this.listArithmetic, this.listOperator, this.listIsCustom, this.variable, this.isCustomValue, this.start, this.length)
        return new ReturnClone(newStatement, true)
    }
}

export default AssignmentStatement