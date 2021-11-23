
import Statement from "../Statement.js"
import Option from "./Option.js"

class Elif extends Statement {
    
    constructor(level, statementId, firstCondition, logicalOperator, secondCondition, childStatement) {
        super()
        this.level = level
        this.statementId = this.generateId(statementId)
        this.firstCondition = firstCondition
        this.logicalOperator = logicalOperator
        this.secondCondition = secondCondition
        this.childStatement = childStatement
        this.option = null
        this.init()
    }

    generateId(number) {
        return 'elif-' + number
    }

    init() {
        if(this.childStatement != null)
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this
    }

    updateChildStatement(childStatement) {
        this.childStatement = childStatement
        this.init()
    }

    writeToCanvas(canvas, isClose) {
        let upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE
        let text = 'ELSE IF'
        
        if(this.logicalOperator != null)
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' ' 
                    + this.secondCondition.generateBlockCodeText() + ' )'
        else
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' )' 

        // ELSE IF( condition )
        let coordinate = canvas.writeText(this.level, text)

        // Create option button
        this.option = new Option(this.statementId, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT)
        this.option.draw(canvas)
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

    callClickEvent(x, y) {
        this.option.clickOption(x, y)
        if(this.childStatement != null)
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].option.clickOption(x, y)
    }
}

export default Elif