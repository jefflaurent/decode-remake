import Return from "../../utilities/Return.js"
import Variable from "./Variable.js"

class Integer extends Variable {
    
    constructor(name, value) {
        super(name, value)
    }

    validateValue() {
        if(this.value == '') 
            return new Return(false, 'Integer value cannot be empty!')
        else if(this.value.includes('.'))
            return new Return(false, 'Integer value cannot be floating points!')
        else if(parseInt(this.value) > 2147483647)
            return new Return(false, 'Integer value cannot exceeds 2147483647!')
        else if(parseInt(this.value) < -2147483647) 
            return new Return(false, 'Integer value cannot subceed -2147483647!')
        else 
            return new Return(true, '')
    }

}

export default Integer