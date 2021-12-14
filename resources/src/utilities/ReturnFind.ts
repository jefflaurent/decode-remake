import Statement from "../classes/statement/Statement";

class ReturnFind {
    
    statement: Statement | undefined
    result: boolean

    constructor(statement: Statement | undefined, result: boolean) {
        this.statement = statement
        this.result = result
    }
}

export default ReturnFind