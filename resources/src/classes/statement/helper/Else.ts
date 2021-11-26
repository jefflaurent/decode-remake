import Statement from "../Statement"

class Else extends Statement {

    childStatement: Statement[]
    
    constructor(level: number, statementId: number, childStatement?: Statement[]) {
        super(level)
        this.statementId = this.generateId(statementId)
        this.childStatement = childStatement
    }

    updateChildStatement(childStatement: Statement[]) {
        
    }

    generateId(number: number): string {
        return 'else-' + number
    }
}

export default Else