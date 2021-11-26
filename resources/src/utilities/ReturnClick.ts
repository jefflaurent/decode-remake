import OptionSelection from "../classes/statement/helper/options/OptionSelection";
import Statement from "../classes/statement/Statement";

class ReturnClick {

    statement: Statement | undefined
    option: OptionSelection | undefined

    constructor(statement: Statement | undefined, option: OptionSelection | undefined) {
        this.statement = statement
        this.option = option
    }

}

export default ReturnClick