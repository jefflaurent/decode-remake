import Canvas from "../../canvas/Canvas.js"
import Statement from "../Statement.js"

class If extends Statement {
    
    constructor(level, statementId, firstCondition, logicalOperator, secondCondition, childStatement) {
        super()
        this.level = level
        this.statementId = this.generateId(statementId)
        this.firstCondition = firstCondition
        this.logicalOperator = logicalOperator
        this.secondCondition = secondCondition
        this.childStatement = childStatement
    }

    generateId(number) {
        return 'if-' + number
    }

    writeToCanvas(canvas, isElif) {
        let text = ''
        let upper = 0
        let lower = 0 

        if(isElif)
            text = 'ELSE IF '
        else
            text = 'IF '
        
        if(this.logicalOperator != null)
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' ' 
                    + this.secondCondition.generateBlockCodeText() + ' )'
        else
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' )' 

        // IF( condition )
        upper = canvas.writeText(this.level, text, !isElif)
        // BODY
        if(this.childStatement != null) {
            
        }
        else {
            
        }
    }
}

export default If