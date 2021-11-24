import Return from "../../utilities/Return"
import Variable from "./Variable"

export default class Float extends Variable {
    
    constructor(name: string, value: string) {
        super(name, value)
    }

    validateValue(): Return {
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