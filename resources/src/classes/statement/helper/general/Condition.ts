import { timers } from "jquery"
import Char from "../../../variable/Char"
import Double from "../../../variable/Double"
import Float from "../../../variable/Float"
import Integer from "../../../variable/Integer"
import Long from "../../../variable/Long"
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
                sourceCode = 'strcmp(' + this.firstVariable.name + `, "` + this.secondVariable.value + `") ` + this.operator + ' 0'
            else 
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value
        }
        else {
            if(this.secondVariable instanceof String) 
                sourceCode = 'strcmp(' + this.firstVariable.name + `, ` + this.secondVariable.name + `) ` + this.operator + ' 0'
            else 
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name
        }

        return sourceCode
    }

    generateJavaSourceCode(): string {
        let sourceCode = ''

        if(this.isCustomValue) {
            if(this.secondVariable instanceof Char)
                sourceCode = this.firstVariable.name + ' ' + this.operator + ` '` + this.secondVariable.value + `'`
            else if(this.secondVariable instanceof String) 
                sourceCode = this.firstVariable.name + `.compareTo("` + this.secondVariable.value + `") ` + this.operator + ' 0'
            else 
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value
        }
        else {
            if(this.secondVariable instanceof String) 
                sourceCode = this.firstVariable.name + `.compareTo("` + this.secondVariable.name + `") ` + this.operator + ' 0'
            else 
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name
        }

        return sourceCode
    }

    generateCsSourceCode(): string {
        let sourceCode = ''

        if(this.isCustomValue) {
            if(this.secondVariable instanceof Char)
                sourceCode = this.firstVariable.name + ' ' + this.operator + ` '` + this.secondVariable.value + `'`
            else if(this.secondVariable instanceof String) 
                sourceCode = this.firstVariable.name + `.Compare("` + this.secondVariable.value + `") ` + this.operator + ' 0'
            else 
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value
        }
        else {
            if(this.secondVariable instanceof String) 
                sourceCode = this.firstVariable.name + `.Compare("` + this.secondVariable.name + `") ` + this.operator + ' 0'
            else 
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name
        }

        return sourceCode
    }

    generatePythonSourceCode(): string {
        let sourceCode = ''

        if(this.isCustomValue) {
            if(this.firstVariable instanceof Char || this.secondVariable instanceof Char) {
                if(this.firstVariable instanceof Char) {
                    if(this.secondVariable instanceof Integer || this.secondVariable instanceof Float
                        || this.secondVariable instanceof Long || this.secondVariable instanceof Double) {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + ' chr(' + this.secondVariable.value + ')'
                    }
                    else {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + ` '` + this.secondVariable.value + `'`
                    }
                }
                else if(this.secondVariable instanceof Char) {
                    if(this.firstVariable instanceof Integer || this.firstVariable instanceof Float
                        || this.firstVariable instanceof Long || this.firstVariable instanceof Double) {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + ` ord('` + this.secondVariable.value + `')`
                    }
                    else {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + ` '` + this.secondVariable.value + `'`
                    }
                }
            }
            else {
                if(this.firstVariable instanceof String)
                    sourceCode = this.firstVariable.name + ' ' + this.operator + ` "` + this.secondVariable.value + `"`
                else 
                    sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value
            }
        }
        else {
            if(this.firstVariable instanceof Char || this.secondVariable instanceof Char) {
                if(this.firstVariable instanceof Char) {
                    if(this.secondVariable instanceof Integer || this.secondVariable instanceof Float
                        || this.secondVariable instanceof Long || this.secondVariable instanceof Double) {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + ' chr(' + this.secondVariable.name + ')'
                    }
                    else {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + ` ` + this.secondVariable.name
                    }
                }
                else if(this.secondVariable instanceof Char) {
                    if(this.firstVariable instanceof Integer || this.firstVariable instanceof Float
                        || this.firstVariable instanceof Long || this.firstVariable instanceof Double) {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + ` ord(` + this.secondVariable.name + `)`
                    }
                    else {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + ` ` + this.secondVariable.name
                    }
                }
            }
            else {
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name
            }
        }

        return sourceCode
    }

    parseAttributes() {
        let firstVariable: Variable 
        let secondVariable: Variable

        if((this.firstVariable as any).type  == 'int') 
            firstVariable = Object.assign(new Integer(undefined, undefined), this.firstVariable)
        else if((this.firstVariable as any).type  == 'double') 
            firstVariable = Object.assign(new Double(undefined, undefined), this.firstVariable)
        else if((this.firstVariable as any).type  == 'long') 
            firstVariable = Object.assign(new Long(undefined, undefined), this.firstVariable)
        else if((this.firstVariable as any).type  == 'float') 
            firstVariable = Object.assign(new Float(undefined, undefined), this.firstVariable)
        else if((this.firstVariable as any).type  == 'char') 
            firstVariable = Object.assign(new Char(undefined, undefined), this.firstVariable)
        else 
            firstVariable = Object.assign(new String(undefined, undefined), this.firstVariable)

        if((this.secondVariable as any).type  == 'int') 
            secondVariable = Object.assign(new Integer(undefined, undefined), this.secondVariable)
        else if((this.secondVariable as any).type  == 'double') 
            secondVariable = Object.assign(new Double(undefined, undefined), this.secondVariable)
        else if((this.secondVariable as any).type  == 'long') 
            secondVariable = Object.assign(new Long(undefined, undefined), this.secondVariable)
        else if((this.secondVariable as any).type  == 'float') 
            secondVariable = Object.assign(new Float(undefined, undefined), this.secondVariable)
        else if((this.secondVariable as any).type  == 'char') 
            secondVariable = Object.assign(new Char(undefined, undefined), this.secondVariable)
        else 
            secondVariable = Object.assign(new String(undefined, undefined), this.secondVariable)

        this.firstVariable = firstVariable
        this.secondVariable = secondVariable
    }
}

export default Condition