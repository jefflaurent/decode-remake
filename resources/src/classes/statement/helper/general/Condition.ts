import Char from "../../../variable/Char"
import String from "../../../variable/String"
import Variable from "../../../variable/Variable"

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

    findVariable(variable: Variable): boolean {
        if(this.firstVariable.name == variable.name)
            return true
        
        if(!this.isCustomValue) {
            if(this.secondVariable.name == variable.name)
                return true
        }

        return false
    } 

    cloneCondition(): Condition {
        return new Condition(this.firstVariable, this.operator, this.secondVariable, this.isCustomValue)
    }

    generateCSourceCode(): string {
        let sourceCode = ''

        if(this.isCustomValue) {
            if(this.secondVariable instanceof Char)
                sourceCode = this.firstVariable.name + ' ' + this.operator + ` '` + this.secondVariable.value + `'`
            else if(this.secondVariable instanceof String) 
                sourceCode = 'strcmp(' + this.firstVariable.name + `, "` + this.secondVariable.value + `") ` + this.operator + '0'
            else 
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value
        }
        else {
            if(this.secondVariable instanceof String) 
                sourceCode = 'strcmp(' + this.firstVariable.name + `, ` + this.secondVariable.name + `) ` + this.operator + '0'
            else 
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name
        }

        return sourceCode
    }
}

export default Condition