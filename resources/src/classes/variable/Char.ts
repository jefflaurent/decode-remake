import Return from "../../utilities/Return"
import Variable from "./Variable"

export default class Char extends Variable {
    
    constructor(name: string, value: string) {
        super(name, value)
    }

    validateValue(): Return {
        if(this.value.length > 1) 
            return new Return(false, 'Character value cannot be more than 1 character!')
        else
            return new Return(true, '')
    }
}