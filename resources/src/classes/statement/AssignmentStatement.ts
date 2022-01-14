import ReturnClick from "../../utilities/ReturnClick";
import ReturnClone from "../../utilities/ReturnClone";
import Canvas from "../canvas/Canvas";
import Char from "../variable/Char";
import Double from "../variable/Double";
import Float from "../variable/Float";
import Integer from "../variable/Integer";
import Long from "../variable/Long";
import String from "../variable/String";
import Variable from "../variable/Variable";
import Arithmetic from "./helper/assignment/Arithmetic";
import Option from "./helper/options/Option";
import Statement from "./Statement";

class AssignmentStatement extends Statement {

    targetVariable: Variable
    variable: Variable | undefined = undefined
    type: string
    listArithmetic: any[] | undefined = undefined
    listOperator: string[] | undefined = undefined
    listIsCustom: boolean[] | undefined = undefined
    isCustomValue: boolean = false
    start: number | undefined = undefined
    length: number | undefined = undefined

    constructor(statementId: number, level: number, type: string, targetVariable: Variable, 
        listArithmetic: any[] | undefined, listOperator: string[] | undefined,
        listIsCustom: boolean[] | undefined, variable: Variable | undefined, isCustomValue: boolean | undefined,
        start: number | undefined, length: number | undefined) {
        super(level)
        this.type = type
        this.statementId = this.generateId(statementId)
        this.targetVariable = targetVariable
        this.variable = variable
        this.listArithmetic = listArithmetic
        this.listOperator = listOperator
        this.listIsCustom = listIsCustom
        this.isCustomValue = isCustomValue
        this.start = start
        this.length = length
        this.color = '#f4be0b'
    }

    generateId(number: number): string {
        return 'assignment-statement-' + number
    }

    writeToCanvas(canvas: Canvas): void {
        let text = 'SET ' + this.targetVariable.name + ' = ' + this.generateBlockCodeText()
        let coordinate = canvas.writeText(this.level, text, this.color)
        this.createOption(canvas, coordinate.x + canvas.SPACE,  coordinate.y - canvas.LINE_HEIGHT)
    }

    generateBlockCodeText(): string {
        let text: string = ''
        if(this.type == 'arithmetic') 
            text = this.generateArithmeticText()
        else if(this.type == 'variable') 
            text = this.generateVariableText()
        else if(this.type == 'length')
            text = this.generateLengthText()
        else
            text = this.generateSubText()
        
        return text
    }

    generateArithmeticText(): string {
        let text = ''
        let opIdx = 0
        let customIdx = 0

        for(let i = 0; i < this.listArithmetic.length; i++) {
            if(this.listArithmetic[i] instanceof Variable) {
                if(this.listIsCustom != undefined) {
                    if(this.listIsCustom[customIdx])
                        text += ' ' + (this.listArithmetic[i] as Variable).value + ' '
                    else
                        text += ' ' + (this.listArithmetic[i] as Variable).name + ' '
                    customIdx++
                }
            }
            else {
                text += (this.listArithmetic[i] as Arithmetic).generateBlockCodeText()
            }
            
            if(this.listOperator != undefined) {
                if(opIdx < this.listOperator.length) {
                    text += ' ' + this.listOperator[opIdx] + ' '
                    opIdx++
                }
            }
        }
        
        return text
    }

    generateVariableText(): string {
        if(this.isCustomValue) {
            if(this.variable instanceof Char)
                return "'" + this.variable.value + "'"
            else
                return this.variable.value
        }
        else
            return this.variable.name
    }

    generateLengthText(): string {
        return 'LENGTH OF ' + this.variable.name
    }

    generateSubText(): string {
        return this.variable.name + ' FROM ' + this.start + ' WITH LENGTH ' + this.length
    }

    createOption(canvas: Canvas, coorX: number, coorY: number): void {
        this.option = new Option(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this)
        this.option.parent = this
        this.option.draw(canvas)
    }
    
    callClickEvent(canvas: Canvas, x: number, y: number): ReturnClick | undefined {
        return this.option.clickOption(canvas, x, y)
    }

    findStatement(statement: Statement): boolean {
        if(statement == this)
            return true
        return false
    }

    findVariable(variable: Variable): Statement | undefined {
        if(this.type == 'variable') 
            return this.findTypeVariable(variable)
        else if(this.type == 'arithmetic')
            return this.findTypeArithmetic(variable)
        else
            return this.findTypeString(variable)
    }

    findTypeVariable(variable: Variable): Statement | undefined {
        if(this.targetVariable.name == variable.name) 
            return this
        if(!this.isCustomValue) {
            if(this.variable.name == variable.name)
                return this
        }

        return undefined
    }

    findTypeArithmetic(variable: Variable): Statement | undefined {
        if(this.targetVariable.name == variable.name) 
            return this

        let temp: boolean = false
        
        if(this.listArithmetic != undefined) {
            for(let i = 0; i < this.listArithmetic.length; i++) {
                console.log(this.listArithmetic[i])
                console.log(this.listIsCustom[i])
                if(this.listArithmetic[i] instanceof Variable) {
                    if(this.listIsCustom[i] == false) {
                        if(this.listArithmetic[i].name == variable.name)
                            return this
                    }
                }
                else {
                    temp = this.listArithmetic[i].findVariable(variable)
                }
                if(temp)
                    return this
            }
        }

        return undefined
    }

    findTypeString(variable: Variable): Statement | undefined {
        if(this.targetVariable.name == variable.name)
            return this
        else if(this.variable.name == variable.name)
            return this
        
        return undefined
    }

    cloneStatement(statementCount: number): ReturnClone {
        let newStatement = new AssignmentStatement(statementCount, this.level, this.type, this.targetVariable, 
            this.listArithmetic, this.listOperator, this.listIsCustom, this.variable, this.isCustomValue, this.start, this.length)
        return new ReturnClone(newStatement, true)
    }

    generateCSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let prefix = this.getIndentation() + this.targetVariable.name + ' = '

        if(this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + ';\n')
        }   
        else if(this.type == 'variable') {
            if(this.isCustomValue) {
                if(this.variable instanceof Char)
                    sourceCodeContainer.push(prefix + "'" + this.variable.value + "';\n")
                else
                    sourceCodeContainer.push(prefix + this.variable.value + ';\n')
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + ';\n')
        }
        else if(this.type == 'length') {
            sourceCodeContainer.push(prefix + 'strlen(' + this.variable.name + ');\n')
        }
        else {
            let start
            if(this.start == 1)
                start = this.variable.name
            else 
                start = this.variable.name + '+' + (this.start - 1)

            sourceCodeContainer.push(this.getIndentation() + 'strncpy(' + this.targetVariable.name + ', ' + start + ', ' + this.length + ');\n')
            sourceCodeContainer.push(this.targetVariable.name + '[' + (this.start-1 + this.length) + '] = ' + `'\\0'` + ';\n')
        }

        return sourceCodeContainer
    }

    generateCppSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let prefix = this.getIndentation() + this.targetVariable.name + ' = '

        if(this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + ';\n')
        }   
        else if(this.type == 'variable') {
            if(this.isCustomValue) {
                if(this.variable instanceof Char)
                    sourceCodeContainer.push(prefix + "'" + this.variable.value + "';\n")
                else
                    sourceCodeContainer.push(prefix + this.variable.value + ';\n')
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + ';\n')
        }
        else if(this.type == 'length') {
            sourceCodeContainer.push(prefix + 'strlen(' + this.variable.name + ');\n')
        }
        else {
            let start
            if(this.start == 1)
                start = this.variable.name
            else 
                start = this.variable.name + '+' + (this.start - 1)

            sourceCodeContainer.push(this.getIndentation() + 'strncpy(' + this.targetVariable.name + ', ' + start + ', ' + this.length + ');\n')
            sourceCodeContainer.push(this.targetVariable.name + '[' + (this.start-1 + this.length) + '] = ' + `'\\0'` + ';\n')
        }

        return sourceCodeContainer
    }

    generateJavaSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let prefix = this.getIndentation() + this.targetVariable.name + ' = '

        if(this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + ';\n')
        }   
        else if(this.type == 'variable') {
            if(this.isCustomValue) {
                if(this.variable instanceof Char)
                    sourceCodeContainer.push(prefix + "'" + this.variable.value + "';\n")
                else
                    sourceCodeContainer.push(prefix + this.variable.value + ';\n')
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + ';\n')
        }
        else if(this.type == 'length') {
            sourceCodeContainer.push(prefix + this.variable.name + '.length();\n')
        }
        else {
            let start = this.start - 1
            let end =  start + this.length
            
            sourceCodeContainer.push(prefix + this.variable.name + '.substring(' + start + ', ' + end + ');\n')
        }

        return sourceCodeContainer
    }

    generateCsSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let prefix = this.getIndentation() + this.targetVariable.name + ' = '

        if(this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + ';\n')
        }   
        else if(this.type == 'variable') {
            if(this.isCustomValue) {
                if(this.variable instanceof Char)
                    sourceCodeContainer.push(prefix + "'" + this.variable.value + "';\n")
                else
                    sourceCodeContainer.push(prefix + this.variable.value + ';\n')
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + ';\n')
        }
        else if(this.type == 'length') {
            sourceCodeContainer.push(prefix + this.variable.name + '.Length;\n')
        }
        else {
            let start = this.start - 1
            
            sourceCodeContainer.push(prefix + this.variable.name + '.Substring(' + start + ', ' + this.length + ');\n')
        }

        return sourceCodeContainer
    }

    generatePythonSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let prefix = this.getIndentation() + this.targetVariable.name + ' = '

        if(this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + '\n')
        }   
        else if(this.type == 'variable') {
            if(this.isCustomValue) {
                if(this.variable instanceof Char || this.variable instanceof String)
                    sourceCodeContainer.push(prefix + `"` + this.variable.value + `"\n`)
                else
                    sourceCodeContainer.push(prefix + this.variable.value + '\n')
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + '\n')
        }
        else if(this.type == 'length') {
            sourceCodeContainer.push(prefix + 'len(' + this.variable.name + ')\n')
        }
        else {
            let start = this.start - 1
            let end =  start + this.length
            
            sourceCodeContainer.push(prefix + this.variable.name + '[' + start + ':' + end + ']\n')
        }

        return sourceCodeContainer
    }

    generatePseudocode(): string[] {
        let sourceCodeContainer: string[] = []
        let code = '' + this.getIndentation()
        code += 'SET ' + this.targetVariable.name + ' = ' + this.generateBlockCodeText() + '\n'
        
        sourceCodeContainer.push(code)

        return sourceCodeContainer
    }

    toJSON() {
        return {
            statement: 'assignment',
            statementId: this.statementId, 
            level: this.level, 
            type: this.type, 
            targetVariable: this.targetVariable, 
            listArithmetic: this.listArithmetic, 
            listOperator: this.listOperator,
            listIsCustom: this.listIsCustom, 
            variable: this.variable, 
            isCustomValue: this.isCustomValue,
            start: this.start,
            length: this.length
        }
    }

    parseAttributes() {
        let targetVariable: Variable

        if((this.targetVariable as any).type  == 'int') 
            targetVariable = Object.assign(new Integer(undefined, undefined), this.targetVariable)
        else if((this.targetVariable as any).type  == 'double') 
            targetVariable = Object.assign(new Double(undefined, undefined), this.targetVariable)
        else if((this.targetVariable as any).type  == 'long') 
            targetVariable = Object.assign(new Long(undefined, undefined), this.targetVariable)
        else if((this.targetVariable as any).type  == 'float') 
            targetVariable = Object.assign(new Float(undefined, undefined), this.targetVariable)
        else if((this.targetVariable as any).type  == 'char') 
            targetVariable = Object.assign(new Char(undefined, undefined), this.targetVariable)
        else 
            targetVariable = Object.assign(new String(undefined, undefined), this.targetVariable)

        this.targetVariable = targetVariable

        if(this.variable != undefined) {
            let variable: Variable

            if((this.variable as any).type  == 'int') 
                variable = Object.assign(new Integer(undefined, undefined), this.variable)
            else if((this.variable as any).type  == 'double') 
                variable = Object.assign(new Double(undefined, undefined), this.variable)
            else if((this.variable as any).type  == 'long') 
                variable = Object.assign(new Long(undefined, undefined), this.variable)
            else if((this.variable as any).type  == 'float') 
                variable = Object.assign(new Float(undefined, undefined), this.variable)
            else if((this.variable as any).type  == 'char') 
                variable = Object.assign(new Char(undefined, undefined), this.variable)
            else 
                variable = Object.assign(new String(undefined, undefined), this.variable)
    
            this.variable = variable
        }

        if(this.listArithmetic != undefined) {
            let tempListArithmetic: any[] = []
            let temp: any

            for(let i = 0; i < this.listArithmetic.length; i++) {
                temp = this.listArithmetic[i]

                if((temp as any).type  == 'int') 
                    temp = Object.assign(new Integer(undefined, undefined), temp)
                else if((temp as any).type  == 'double') 
                    temp = Object.assign(new Double(undefined, undefined), temp)
                else if((temp as any).type  == 'long') 
                    temp = Object.assign(new Long(undefined, undefined), temp)
                else if((temp as any).type  == 'float') 
                    temp = Object.assign(new Float(undefined, undefined), temp)
                else if((temp as any).type  == 'char') 
                    temp = Object.assign(new Char(undefined, undefined), temp)
                else if((temp as any).type  == 'string') 
                    temp = Object.assign(new String(undefined, undefined), temp)
                else {
                    temp = Object.assign(new Arithmetic(undefined, undefined, undefined, undefined, undefined, undefined, undefined ), temp);
                    (temp as Arithmetic).parseAttributes()
                }
                tempListArithmetic.push(temp)
            }

            this.listArithmetic = tempListArithmetic
        }
    }
}

export default AssignmentStatement