import Canvas from "../canvas/Canvas"
import Statement from "./Statement"

class IfStatement extends Statement {

    ifOperations: any[] | undefined
 
    constructor(level: number, statementId: number, ifOperations: any[] | undefined) {
        super(level)
        this.statementId = this.generateId(statementId)
        this.ifOperations = ifOperations
        this.init()
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
        if(this.ifOperations) {
            for(let i = 0; i < this.ifOperations.length; i++) {
                if(i != this.ifOperations.length - 1)
                    this.ifOperations[i].writeToCanvas(canvas, false)
                else 
                    this.ifOperations[i].writeToCanvas(canvas, true)
            }
        }
    }

    callClickEvent(x: number, y: number): void {
        this.option.clickOption(x, y)
        if(this.ifOperations != null)
            for(let i = 0; i < this.ifOperations.length; i++)
                this.ifOperations[i].callClickEvent(x, y)
    }
}

export default IfStatement