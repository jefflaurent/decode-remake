import ReturnClick from "../../../../utilities/ReturnClick"
import Canvas from "../../../canvas/Canvas"
import Statement from "../../Statement"
import Condition from "../general/Condition"
import Option from "../options/Option"

class If extends Statement {
    
    logicalOperator: string | undefined
    firstCondition: Condition
    secondCondition: Condition | undefined
    childStatement: Statement[] | undefined

    constructor(level: number, statementId: number, firstCondition: Condition, 
        logicalOperator?: string, secondCondition?: Condition, childStatement?: Statement[]) {
        
        super(level)
        this.statementId = this.generateId(statementId)
        this.firstCondition = firstCondition
        this.logicalOperator = logicalOperator
        this.secondCondition = secondCondition
        this.childStatement = childStatement
        this.color = '#2bea15'
        this.option = undefined
        this.init()
    }

    generateId(number: number): string {
        return 'if-' + number
    }

    init(): void {
        if(this.childStatement != undefined)
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this
    }

    updateChildStatement(childStatement: Statement[]): void {
        this.childStatement = childStatement
        this.init()
    }

    writeToCanvas(canvas: Canvas, isClose: boolean): void {
        let upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE
        let text = 'IF '
        
        if(this.logicalOperator != undefined && this.secondCondition != undefined)
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' ' 
                    + this.secondCondition.generateBlockCodeText() + ' )'
        else
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' )' 

        // IF( condition )
        let coordinate = canvas.writeText(this.level, text, this.color)
        // Create option button for IfStatement
        this.parent.option = new Option(this.parent.statementId, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this.parent)
        this.parent.option.draw(canvas)

        // Create option button for If
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE)
        canvas.updateLastPosition()

        if(this.childStatement != undefined)
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas)

        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION)

        if(isClose) 
            canvas.writeClosingBlock(this.level, text, 'END IF', this.color)
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
}

export default If