import ReturnClone from "../../utilities/ReturnClone"
import ReturnFind from "../../utilities/ReturnFind"
import Canvas from "../canvas/Canvas"
import Variable from "../variable/Variable"
import Option from "./helper/options/Option"

class Statement {
    
    statementId: string
    level: number
    parent: any
    option: Option | any
    childStatement: Statement[] | any
    color: string

    constructor(level: number) {
        this.statementId = ''
        this.level = level
        this.childStatement = undefined
        this.parent = undefined
    }

    updateChildLevel(): void {
        if(this.childStatement != undefined) {
            for(let i = 0; i < this.childStatement.length; i++) {
                this.childStatement[i].level = this.level + 1
                this.childStatement[i].updateChildLevel()
            }
        }
    }

    moveToSurface(): void {
        this.level = 1
        this.parent = undefined
    }

    getParent(): Statement | undefined {
        return this.parent
    }

    generateId(number: number) {}
    writeToCanvas(canvas: Canvas,  isClose?: boolean) {}
    updateChildStatement(childStatement: Statement[]): void {}
    callClickEvent(canvas: Canvas, x: number, y: number) {}
    findVariable(variable: Variable): Statement | undefined  { return undefined }
    cloneStatement(statementCount: number): ReturnClone { return new ReturnClone(this, false) }
    findStatement(statement: Statement): boolean { return false }
    generateCSourceCode(): string { return '' }
}

export default Statement