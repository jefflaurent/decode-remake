import ReturnClick from "../../../../utilities/ReturnClick";
import Canvas from "../../../canvas/Canvas";
import Variable from "../../../variable/Variable";
import Statement from "../../Statement";
import Condition from "../general/Condition";
import Option from "../options/Option";

class Case extends Statement {

    condition: Condition
    isDefault: boolean

    constructor(level: number, statementId: number, condition: Condition | undefined, childStatement: any[] | undefined, isDefault: boolean) {
        super(level)
        this.childStatement = childStatement
        this.condition = condition
        this.color = '#2bea15'
        this.statementId = this.generateId(statementId)
        this.isDefault = isDefault
    }

    init(): void {
        if(this.childStatement != undefined)
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this
    }

    generateId(statementId: number): string {
        return 'case-statement-' + statementId
    }

    updateChildLevel(): void {
        if(this.childStatement != undefined)
            for(let i = 0; i < this.childStatement.length; i++) {
                this.childStatement[i].level = this.level + 1
                this.childStatement[i].updateChildLevel()
            }
    }

    updateChildStatement(childStatement: Statement[]): void {
        this.childStatement = childStatement
        this.init()
    }

    writeToCanvas(canvas: Canvas): void {
        let upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE
        let text = ''

        if(!this.isDefault)
            text = 'CASE ' + this.condition.secondVariable.value + ':\t\t\t\t\t\t'
        else
            text = 'DEFAULT:' + '\t\t\t\t\t\t'
        let coordinate = canvas.writeText(this.level, text, this.color)
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE)
        canvas.updateLastPosition()

        if(this.childStatement) {
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas)
        }

        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION)
        canvas.writeClosingBlock(this.level, text, 'END CASE\t\t\t\t\t\t', this.color)
    }

    createOption(canvas: Canvas, coorX: number, coorY: number) {
        this.option = new Option(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this)
        this.option.draw(canvas)
    }

    callClickEvent(canvas: Canvas, x: number, y: number): ReturnClick | undefined {
        let temp = this.option.clickOption(canvas, x, y)
        let tempChild: any = undefined
        if(this.childStatement != undefined) {
            for(let i = 0; i < this.childStatement.length; i++) {
                tempChild = this.childStatement[i].callClickEvent(canvas, x, y)
                if(tempChild != undefined)
                    break
            }
        }

        return temp ? temp : tempChild
    }

    findVariable(variable: Variable): Statement | undefined {
        let temp: Statement | undefined = undefined

        if(this.childStatement) {
            for(let i = 0; i < this.childStatement.length; i++) {
                temp = this.childStatement[i].findVariable(variable)

                if(temp != undefined)
                    return temp
            }
        }

        return undefined
    }
}

export default Case