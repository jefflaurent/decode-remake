import Return from "../../utilities/Return"
import Variable from "./Variable"

export default class Double extends Variable {
    
    constructor(name: string, value: string) {
        super(name, value)
    }

    validateValue(): Return {
        if(this.value == '') 
            return new Return(false, 'Double value cannot be empty!')
        else if(this.value.includes('.')) {
            if(this.value.split('.')[1].length > 15)
                return new Return(false, 'Double value cannot store more than 15 decimal digits!')  
            else 
                return new Return(true, '')     
        }
        else 
            return new Return(true, '')
    }
}