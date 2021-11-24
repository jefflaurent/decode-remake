import Return from "../../utilities/Return"
import Variable from "./Variable"

export default class Integer extends Variable {
    
    constructor(name: string, value: any) {
        super(name, value)
    }

    validateValue(): Return {
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
