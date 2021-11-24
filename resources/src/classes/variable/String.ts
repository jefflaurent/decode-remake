import Return from "../../utilities/Return";
import Variable from "./Variable";

export default class String extends Variable {
    
    constructor(name: string, value: string) {
        super(name, value)
    }

    validateValue(): Return {
        return new Return(true, '')
    }
}