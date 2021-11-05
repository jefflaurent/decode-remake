import Return from "../../utilities/Return.js";
import Variable from "./Variable.js";

class Char extends Variable {
    
    constructor(name, value) {
        super(name, value)
    }

    validateValue() {
        if(this.value.length > 1) 
            return new Return(false, 'Character value cannot be more than 1 character!')
        else
            return new Return(true, '')
    }

}

export default Char