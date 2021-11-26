import Statement from "../classes/statement/Statement"

export default class ReturnPaste {
    
    result: boolean
    listStatement: Statement[]

    constructor(result: boolean, listStatement: Statement[]) {
        this.result = result
        this.listStatement = listStatement
    }
}