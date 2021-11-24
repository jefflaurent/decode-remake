import Char from "../../variable/Char"
import String from "../../variable/String"
import Variable from "../../variable/Variable"

class Condition {

    firstVariable: Variable
    secondVariable: Variable
    operator: string
    isCustomValue: boolean

    constructor(firstVariable: Variable, operator: string, secondVariable: Variable, isCustomValue: boolean) {
        this.firstVariable = firstVariable
        this.operator = operator
        this.secondVariable = secondVariable
        this.isCustomValue = isCustomValue
    }

    generateBlockCodeText(): string {
        if(this.isCustomValue) {
            if(this.secondVariable instanceof Char)
                return this.firstVariable.name + ' ' + this.operator + ` '` + this.secondVariable.value + `'`
            else if(this.secondVariable instanceof String)
                return this.firstVariable.name + ' ' + this.operator + ` "` + this.secondVariable.value + `"`
            else 
                return this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value
        }
        else 
            return this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name
    }
    
}

export default Condition