import Char from "../../../variable/Char";
import Double from "../../../variable/Double";
import Float from "../../../variable/Float";
import Integer from "../../../variable/Integer";
import Long from "../../../variable/Long";
import String from "../../../variable/String";
import Variable from "../../../variable/Variable";

class Arithmetic {

    firstChild: Arithmetic | undefined = undefined
    secondChild: Arithmetic | undefined = undefined
    firstVariable: Variable | undefined = undefined 
    secondVariable: Variable | undefined = undefined 
    operator: string
    isFirstCustom: boolean
    isSecondCustom: boolean

    constructor(firstVariable: Variable | undefined, secondVariable: Variable | undefined, 
        firstChild: Arithmetic | undefined, secondChild: Arithmetic | undefined, operator: string, isFirstCustom: boolean, isSecondCustom: boolean) {
        
        this.firstVariable = firstVariable
        this.secondVariable = secondVariable
        this.firstChild = firstChild
        this.secondChild = secondChild
        this.operator = operator
        this.isFirstCustom = isFirstCustom
        this.isSecondCustom = isSecondCustom
    } 

    generateBlockCodeText(): string {
        let text = '( '
        if(this.firstVariable != undefined) {
            if(this.isFirstCustom)
                text += this.firstVariable.value + ' '
            else
                text += this.firstVariable.name + ' '
        }
        else 
            text += this.firstChild.generateBlockCodeText() + ' '
        

        text += this.operator + ' '

        if(this.secondVariable != undefined) {
            if(this.isSecondCustom) 
                text += this.secondVariable.value + ' '
            else
                text += this.secondVariable.name + ' '
        }
        else 
            text += this.secondChild.generateBlockCodeText() + ' '    
        
        text += ' )'

        return text
    }

    findVariable(variable: Variable): boolean {
        let temp: boolean = false

        if(!this.isFirstCustom) {
            if(this.firstVariable.name == variable.name)
                return true
        }
        if(!this.isSecondCustom) {
            if(this.secondVariable.name == variable.name)
                return true
        }
        if(this.firstChild != undefined) {
            temp = this.firstChild.findVariable(variable)
            if(temp)
                return temp
        }
        if(this.secondChild != undefined) {
            temp = this.secondChild.findVariable(variable)
            if(temp)
                return temp
        }

        return false
    }
    
    toJSON() {
        return {
            statement: 'arithmetic',
            firstVariable: this.firstVariable, 
            secondVariable: this.secondVariable, 
            firstChild: this.firstChild,
            secondChild: this.secondChild, 
            operator: this.operator, 
            isFirstCustom: this.isFirstCustom, 
            isSecondCustom: this.isSecondCustom
        }
    }

    parseAttributes() {
        if(this.firstVariable != undefined) {
            let firstVariable: Variable
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

            this.firstVariable = firstVariable
        }

        if(this.secondVariable != undefined) {
            let secondVariable: Variable
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

            this.secondVariable = secondVariable
        }

        if(this.firstChild != undefined) {
            let firstChild = Object.assign(new Arithmetic(undefined, undefined, undefined, undefined, undefined, undefined, undefined), this.firstChild);
            (firstChild as Arithmetic).parseAttributes()
            this.firstChild = firstChild
        }

        if(this.secondChild != undefined) {
            let secondChild = Object.assign(new Arithmetic(undefined, undefined, undefined, undefined, undefined, undefined, undefined), this.secondChild);
            (secondChild as Arithmetic).parseAttributes()
            this.secondChild = secondChild
        }
    }
}   

export default Arithmetic