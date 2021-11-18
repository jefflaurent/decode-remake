import Return from "../../utilities/Return.js"
import Variable from "./Variable.js"

class Float extends Variable {
    
    constructor(name, value) {
        super(name, value)
    }

    validateValue() {
        if(this.value == '') 
            return new Return(false, 'Float value cannot be empty!')
        else if(this.value.includes('.')) {
            if(this.value.split('.')[1].length > 7)
                return new Return(false, 'Float value cannot store more than 7 decimal digits!')     
            else
                return new Return(true, '')
        }
        else 
            return new Return(true, '')
    }
}

export default Float