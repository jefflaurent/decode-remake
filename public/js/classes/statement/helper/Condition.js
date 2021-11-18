import Char from "../../variable/Char.js"
import String from "../../variable/String.js"

class Condition {

    constructor(firstVariable, operator, secondVariable, isCustomValue) {
        this.firstVariable = firstVariable
        this.operator = operator
        this.secondVariable = secondVariable
        this.isCustomValue = isCustomValue
    }

    generateBlockCodeText() {
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