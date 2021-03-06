import Char from '../variable/Char'
import Double from '../variable/Double'
import Float from '../variable/Float'
import Integer from '../variable/Integer'
import Long from '../variable/Long'
import String from '../variable/String'
import Statement from './Statement'
import Option from './helper/options/Option'
import Variable from '../variable/Variable'
import Canvas from '../canvas/Canvas'
import ReturnClick from '../../utilities/ReturnClick'
import ReturnFind from '../../utilities/ReturnFind'
import ReturnClone from '../../utilities/ReturnClone'

class DeclareStatement extends Statement {

    variable: Variable

    constructor(statementId: number, level: number, variable: Variable) {
        super(level)
        this.variable = variable
        this.statementId = this.generateId(statementId)
        this.color = '#f4be0b'
    }

    generateId(number: number): string {
        if(this.variable instanceof Integer)
            return 'declare-integer-' + number 
        else if(this.variable instanceof Long)
            return 'declare-long-' + number
        else if(this.variable instanceof Float) 
            return 'declare-float-' + number
        else if(this.variable instanceof Double)
            return 'declare-double-' + number
        else if(this.variable instanceof Char)
            return 'declare-char-' + number
        else 
            return 'declare-string-' + number
    }

    writeToCanvas(canvas: Canvas): void {
        let text = this.getDeclareStatementText(true)
        let coordinate = canvas.writeText(this.level, text, this.color)
        this.createOption(canvas, coordinate.x + canvas.SPACE,  coordinate.y - canvas.LINE_HEIGHT)
    }

    getDeclareStatementText(isDeclare: boolean): string {
        let text = ''

        if(isDeclare) {
            if(this.variable instanceof Integer)
                text = 'INTEGER ' + this.variable.name + ' = ' + this.variable.value
            else if(this.variable instanceof Long)
                text = 'LONG ' + this.variable.name + ' = ' + this.variable.value
            else if(this.variable instanceof Float)
                text = 'FLOAT ' + this.variable.name + ' = ' + this.variable.value
            else if(this.variable instanceof Double)
                text = 'DOUBLE ' + this.variable.name + ' = ' + this.variable.value
            else if(this.variable instanceof Char)
                text = 'CHAR ' + this.variable.name + ' = ' + "'" + this.variable.value + "'"
            else if(this.variable instanceof String)
                text = 'STRING ' + this.variable.name + ' = ' +  `"` + this.variable.value + `"`
        }
        else {
            if(this.variable instanceof Integer)
                text = this.variable.name + ' = ' + this.variable.value
            else if(this.variable instanceof Long)
                text = this.variable.name + ' = ' + this.variable.value
            else if(this.variable instanceof Float)
                text = this.variable.name + ' = ' + this.variable.value
            else if(this.variable instanceof Double)
                text = this.variable.name + ' = ' + this.variable.value
            else if(this.variable instanceof Char)
                text = this.variable.name + ' = ' + "'" + this.variable.value + "'"
            else if(this.variable instanceof String)
                text = this.variable.name + ' = ' +  `"` + this.variable.value + `"`
        }

        return text
    }

    createOption(canvas: Canvas, coorX: number, coorY: number): void {
        this.option = new Option(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this)
        this.option.parent = this
        this.option.draw(canvas)
    }
    
    callClickEvent(canvas: Canvas, x: number, y: number): ReturnClick | undefined {
        return this.option.clickOption(canvas, x, y)
    }

    findVariable(variable: Variable): Statement | undefined {
        return undefined
    }

    findStatement(statement: Statement): boolean {
        if(statement == this)
            return true
        return false
    }

    cloneStatement(statementCount: number): ReturnClone {
        return new ReturnClone(new DeclareStatement(statementCount, this.level, this.variable), true)
    }

    generateCSourceCode(): string[] {
        let sourceCode = ''
        sourceCode += this.getIndentation()
        
        if(this.variable instanceof Integer)
            sourceCode += 'int ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Long)
            sourceCode += 'long long int ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Float)
            sourceCode += 'float ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Double)
            sourceCode += 'double ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Char)
            sourceCode += 'char ' + this.variable.name + ' = ' + "'" + this.variable.value + "';"
        else if(this.variable instanceof String)
            sourceCode += 'char '  + this.variable.name + '[' + (this.variable.value.length + 1) +']' + ' = ' +  `"` + this.variable.value + `";`
    
        sourceCode += '\n'

        let sourceCodeContainer: string[] = []
        sourceCodeContainer.push(sourceCode)

        return sourceCodeContainer
    }

    generateCppSourceCode(): string[] {
        let sourceCode = ''
        sourceCode += this.getIndentation()
        
        if(this.variable instanceof Integer)
            sourceCode += 'int ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Long)
            sourceCode += 'long long int ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Float)
            sourceCode += 'float ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Double)
            sourceCode += 'double ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Char)
            sourceCode += 'char ' + this.variable.name + ' = ' + "'" + this.variable.value + "';"
        else if(this.variable instanceof String)
            sourceCode += 'string ' + this.variable.name + ' = ' +  `"` + this.variable.value + `";`
    
        sourceCode += '\n'

        let sourceCodeContainer: string[] = []
        sourceCodeContainer.push(sourceCode)

        return sourceCodeContainer
    }

    generateJavaSourceCode(): string[] {
        let sourceCode = ''
        sourceCode += this.getIndentation()
        
        if(this.variable instanceof Integer)
            sourceCode += 'Integer ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Long)
            sourceCode += 'Long ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Float)
            sourceCode += 'Float ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Double)
            sourceCode += 'Double ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Char)
            sourceCode += 'Character ' + this.variable.name + ' = ' + "'" + this.variable.value + "';"
        else if(this.variable instanceof String)
            sourceCode += 'String ' + this.variable.name + ' = ' + `"` + this.variable.value + `";`   

        sourceCode += '\n'

        let sourceCodeContainer: string[] = []
        sourceCodeContainer.push(sourceCode)

        return sourceCodeContainer
    }

    generateCsSourceCode(): string[] {
        let sourceCode = ''
        sourceCode += this.getIndentation()
        
        if(this.variable instanceof Integer)
            sourceCode += 'int ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Long)
            sourceCode += 'long ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Float)
            sourceCode += 'float ' + this.variable.name + ' = ' + this.variable.value + 'f;'
        else if(this.variable instanceof Double)
            sourceCode += 'double ' + this.variable.name + ' = ' + this.variable.value + ';'
        else if(this.variable instanceof Char)
            sourceCode += 'char ' + this.variable.name + ' = ' + "'" + this.variable.value + "';"
        else if(this.variable instanceof String)
            sourceCode += 'string ' + this.variable.name + ' = ' + `"` + this.variable.value + `";`   

        sourceCode += '\n'

        let sourceCodeContainer: string[] = []
        sourceCodeContainer.push(sourceCode)

        return sourceCodeContainer
    }

    generatePythonSourceCode(): string[] {
        let sourceCodeContainer: string[] = []

        if(this.variable instanceof String || this.variable instanceof Char)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ` = '` + this.variable.value + `'\n`)
        else
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ` = ` + this.variable.value + `\n`)

        return sourceCodeContainer
    }

    generatePseudocode(): string[] {
        let sourceCodeContainer: string[] = []
        if(this.variable instanceof String || this.variable instanceof Char)
            sourceCodeContainer.push(this.getIndentation() + 'INITIALIZE '+ this.variable.name + ` = '` + this.variable.value + `'\n`)
        else
            sourceCodeContainer.push(this.getIndentation() + 'INITIALIZE '+ this.variable.name + ` = ` + this.variable.value + `\n`)
    
        return sourceCodeContainer
    }

    toJSON() {
        return {
            statement: 'declare',
            statementId: this.statementId,
            level: this.level,
            variable: this.variable
        }
    }

    parseAttributes() {
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
}

export default DeclareStatement