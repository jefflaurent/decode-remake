import ReturnClick from "../../utilities/ReturnClick";
import Canvas from "../canvas/Canvas";
import Variable from "../variable/Variable";
import Case from "./helper/case/Case";
import Option from "./helper/options/Option";
import Statement from "./Statement";

class SwitchStatement extends Statement {

    caseStatement: Statement[] | undefined
    variable: Variable

    constructor(level: number, statementId: number, variable: Variable, caseStatement: any[] | undefined) {
        super(level)
        this.statementId = this.generateId(statementId)
        this.caseStatement = caseStatement
        this.variable = variable
        this.color = '#2bea15'
        this.init()
    }

    updateChildLevel(): void {
        if(this.caseStatement != undefined)
            for(let i = 0; i < this.caseStatement.length; i++) {
                this.caseStatement[i].level = this.level + 1
                this.caseStatement[i].updateChildLevel()
            }
    }

    updateChildStatement(caseStatement: Statement[]): void {
        this.caseStatement = caseStatement
        this.init()
    }

    generateId(statementId: number): string {
        return 'switch-statement-' + statementId
    }

    init(): void {
        if(this.caseStatement != undefined)
            for(let i = 0; i < this.caseStatement.length; i++)
                this.caseStatement[i].parent = this
    }

    writeToCanvas(canvas: Canvas): void {
        let upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE
        let text = 'SWITCH (' + this.variable.name + ' )'
        let coordinate = canvas.writeText(this.level, text, this.color)
        this.option = new Option(this.statementId, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this)
        this.option.draw(canvas)

        for(let i = 0; i < this.caseStatement.length; i++) {   
            console.log(this.caseStatement[i])
            this.caseStatement[i].writeToCanvas(canvas)
        }

        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION)
        canvas.writeClosingBlock(this.level, text, 'END SWITCH', this.color)
    }

    callClickEvent(canvas: Canvas, x: number, y: number): ReturnClick | undefined {
        let temp = this.option.clickOption(canvas, x, y)
        let tempChild: any = undefined
        if(this.caseStatement != undefined)
            for(let i = 0; i < this.caseStatement.length; i++) {
                tempChild = this.caseStatement[i].callClickEvent(canvas, x, y)
                if(tempChild != undefined)
                    break
            }

        return temp ? temp : tempChild
    }
}

export default SwitchStatement