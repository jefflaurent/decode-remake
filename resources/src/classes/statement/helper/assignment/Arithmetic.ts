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
}   

export default Arithmetic