import Variable from "../../../variable/Variable";

class Arithmetic {

    firstChild: Arithmetic | undefined = undefined
    secondChild: Arithmetic | undefined = undefined
    firstVariable: Variable | undefined = undefined 
    secondVariable: Variable | undefined = undefined 
    operator: string
    isCustom: boolean

    constructor(firstVariable: Variable | undefined, secondVariable: Variable | undefined, 
        firstChild: Arithmetic | undefined, secondChild: Arithmetic | undefined, operator: string, isCustom?: boolean) {
        
        this.firstVariable = firstVariable
        this.secondVariable = secondVariable
        this.firstChild = firstChild
        this.secondChild = secondChild
        this.operator = operator
        this.isCustom = isCustom
    } 

    generateBlockCodeText(): string {
        let text = '( '
        if(this.firstVariable != undefined)
            text += this.firstVariable.name + ' '
        else 
            text += this.firstChild.generateBlockCodeText() + ' '
        

        text += this.operator + ' '

        if(this.secondVariable != undefined) {
            if(this.isCustom) 
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

        if(this.firstVariable.name == variable.name)
            return true
        if(!this.isCustom) {
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