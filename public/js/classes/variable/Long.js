import Return from "../../utilities/Return.js"
import Variable from "./Variable.js"

class Long extends Variable {
    
    constructor(name, value) {
        super(name, value)
    }

    validateValue() {
        if(this.value == '') 
            return new Return(false, 'Long value cannot be empty!')
        else if(parseInt(this.value) > 9223372036854775807)
            return new Return(false, 'Long value cannot exceeds 9223372036854775807!')
        else if(parseInt(this.value) < -9223372036854775807) 
            return new Return(false, 'Long value cannot subceed -9223372036854775807!')
        else 
            return new Return(true, '')
    }

}

export default Long