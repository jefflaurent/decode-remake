import Statement from "../classes/statement/Statement"

class ReturnClone {
    
    statement: Statement | undefined = undefined
    result: boolean

    constructor(statement: Statement | undefined , result: boolean) {
        this.statement = statement
        this.result = result
    }

}

export default ReturnClone