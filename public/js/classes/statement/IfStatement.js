import If from "./helper/If.js"
import Else from './helper/Else.js'
import Statement from "./Statement.js"

class IfStatement extends Statement {

    constructor(level, statementId, ifOperations) {
        super()
        this.level = level
        this.statementId = this.generateId(statementId)
        this.ifOperations = ifOperations
    }

    generateId(number) {
        return 'if-statement-' + number
    }

    writeToCanvas(canvas) {
        for(let i = 0; i < this.ifOperations.length; i++) {
            let ifOperation = this.ifOperations[i]
            
            if(ifOperation instanceof If) {
                if(i == 0) ifOperation.writeToCanvas(canvas, false)
                else ifOperation.writeToCanvas(canvas, true)
            }
            else if(ifOperation instanceof Else)
                console.log(this.ifOperations[i].statementId)
        }
    }

}

export default IfStatement