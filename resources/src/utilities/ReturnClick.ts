import Statement from "../classes/statement/Statement";

class ReturnClick {

    statement: Statement | undefined
    optionType: string | undefined    

    constructor(statement: Statement | undefined, optionType: string | undefined) {
        this.statement = statement
        this.optionType = optionType
    }

}

export default ReturnClick