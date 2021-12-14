import ReturnClick from "../../utilities/ReturnClick"
import Canvas from "../canvas/Canvas"
import Variable from "../variable/Variable"
import Statement from "./Statement"

class IfStatement extends Statement {

    ifOperations: any[] | undefined
 
    constructor(level: number, statementId: number, ifOperations: any[] | undefined) {
        super(level)
        this.statementId = this.generateId(statementId)
        this.ifOperations = ifOperations
        this.init()
    }

    updateChildLevel(): void {
        if(this.ifOperations != undefined)
            for(let i = 0; i < this.ifOperations.length; i++) {
                this.ifOperations[i].level = this.level
                this.ifOperations[i].updateChildLevel()
            }
    }

    generateId(number: number): string {
        return 'if-statement-' + number
    }

    updateIfOperations(ifOperations: any[]): void {
        this.ifOperations = ifOperations
        this.init()
    }

    init(): void {
        if(this.ifOperations != undefined)
            for(let i = 0; i < this.ifOperations.length; i++)
                this.ifOperations[i].parent = this
    }

    writeToCanvas(canvas: Canvas): void {
        if(this.ifOperations)
            for(let i = 0; i < this.ifOperations.length; i++) {
                if(i != this.ifOperations.length - 1)
                    this.ifOperations[i].writeToCanvas(canvas, false)
                else 
                    this.ifOperations[i].writeToCanvas(canvas, true)
            }
    }

    callClickEvent(canvas: Canvas, x: number, y: number): ReturnClick | undefined {
        let temp = this.option.clickOption(canvas, x, y)
        let tempChild: any = undefined
        if(this.ifOperations != undefined)
            for(let i = 0; i < this.ifOperations.length; i++) {
                tempChild = this.ifOperations[i].callClickEvent(canvas, x, y)
                if(tempChild != undefined)
                    break
            }

        return temp ? temp : tempChild
    }

    findVariable(variable: Variable): Statement | undefined {
        let temp: Statement | undefined  = undefined

        for(let i = 0; i < this.ifOperations.length; i++) {
            temp = this.ifOperations[i].findVariable(variable)

            if(temp != undefined)
                return temp
        }

        return undefined
    }
}

export default IfStatement