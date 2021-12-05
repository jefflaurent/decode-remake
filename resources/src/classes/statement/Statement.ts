import ReturnClick from "../../utilities/ReturnClick"
import Canvas from "../canvas/Canvas"
import Option from "./helper/options/Option"

class Statement {

    statementId: string
    level: number
    parent: any
    option: Option | any
    childStatement: Statement[] | any

    constructor(level: number) {
        this.statementId = ''
        this.level = level
        this.childStatement = undefined
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

    generateId(number: number) {}
    writeToCanvas(canvas: Canvas,  isClose?: boolean) {}
    updateChildStatement(childStatement: Statement[]): void {}
    callClickEvent(canvas: Canvas, x: number, y: number) {}
}

export default Statement