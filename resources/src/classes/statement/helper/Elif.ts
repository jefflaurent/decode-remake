
import Canvas from "../../canvas/Canvas"
import Statement from "../Statement"
import Condition from "./Condition"
import If from "./If"

class Elif extends If {
    
    constructor(level: number, statementId: number, firstCondition: Condition, logicalOperator?: string, secondCondition?: Condition, childStatement?: Statement[]) {
        super(level, statementId, firstCondition, logicalOperator, secondCondition, childStatement)
        this.statementId = this.generateId(statementId)
        this.init()
    }

    generateId(number: number): string  {
        return 'elif-' + number
    }

    writeToCanvas(canvas: Canvas, isClose: boolean): void {
        let upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE
        let text = 'ELSE IF'
        
        if(this.logicalOperator != undefined && this.secondCondition != undefined)
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' ' 
                    + this.secondCondition.generateBlockCodeText() + ' )'
        else
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' )' 

        // ELSE IF( condition )
        let coordinate = canvas.writeText(this.level, text)

        // Create option button
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT),  coordinate.y + canvas.SPACE)
        canvas.updateLastPosition()

        // Body
        if(this.childStatement != null) {
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas)
        }

        // Create bridge
        canvas.createBridge('#00A9E2', this.level, upper, canvas.LAST_POSITION)

        // Optional close block
        if(isClose) {
            let coorX = canvas.PADDING + canvas.LINE_HEIGHT * (this.level-1) + canvas.SPACE * (this.level-1)
            let coorY = canvas.LAST_POSITION + canvas.SPACE
            canvas.createBackground('#00A9E2', text, coorX, coorY)
        }
    }
}

export default Elif