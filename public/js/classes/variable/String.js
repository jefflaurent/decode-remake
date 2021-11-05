import Return from "../../utilities/Return.js";
import Variable from "./Variable.js";

class String extends Variable {
    
    constructor(name, value) {
        super(name, value)
    }

    validateValue() {
        return new Return(true, '')
    }

}

export default String