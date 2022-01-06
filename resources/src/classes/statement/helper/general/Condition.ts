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
}

export default Condition