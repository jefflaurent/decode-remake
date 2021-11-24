import Canvas from "../canvas/Canvas"
import Option from "./helper/options/Option"

class Statement {

    statementId: string
    level: number
    parent: any
    option: Option | any

    constructor(level: number) {
        this.statementId = ''
        this.level = level
    }

    generateId(number: number) {}
    writeToCanvas(canvas: Canvas,  isClose?: boolean) {}
}

export default Statement