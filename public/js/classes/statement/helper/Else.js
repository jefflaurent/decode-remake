import Statement from "../Statement.js"

class Else extends Statement {
    
    constructor(level, statementId, childStatement) {
        super()
        this.level = level
        this.statementId = this.generateId(statementId)
        this.childStatement = childStatement
    }

    generateId(number) {
        return 'else-' + number
    }
}

export default Else