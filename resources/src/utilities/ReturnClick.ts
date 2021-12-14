import OptionSelection from "../classes/statement/helper/options/OptionSelection";
import Statement from "../classes/statement/Statement";

class ReturnClick {

    statement: Statement | undefined
    option: OptionSelection | undefined
    isClose: boolean | undefined = undefined

    constructor(statement: Statement | undefined, option: OptionSelection | undefined, isClose?: boolean | undefined) {
        this.statement = statement
        this.option = option
        this.isClose = isClose
    }

}

export default ReturnClick