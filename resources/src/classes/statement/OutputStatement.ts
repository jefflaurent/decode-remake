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
import Option from "./helper/options/Option";
import Statement from "./Statement";

class OutputStatement extends Statement { 

    variable: Variable | undefined = undefined
    text: string | undefined = undefined
    isNewLine: boolean
    type: string
    asciiCode: number
    escapeSequence: string

    constructor(statementId: number, level: number, isNewLine: boolean, type: string, 
        variable?: Variable, text?: string, asciiCode?: number, escapeSequence?: string) {
        super(level)
        this.variable = variable
        this.statementId = this.generateId(statementId)
        this.isNewLine = isNewLine
        this.type = type
        this.text = text
        this.asciiCode = asciiCode
        this.escapeSequence = escapeSequence
        this.color = '#f4be0b'
    }

    generateId(number: number): string {
        return 'output-' + number
    }

    writeToCanvas(canvas: Canvas): void {
        let text = this.generateBlockCodeText()
        
        let coordinate = canvas.writeText(this.level, text, this.color)
        this.createOption(canvas, coordinate.x + canvas.SPACE,  coordinate.y - canvas.LINE_HEIGHT)
    }

    generateBlockCodeText(): string {
        let text: string = 'PRINT '
        if(this.type == 'variable') {
            text += this.variable.name
        }
        else if(this.type == 'text') {
            text += `"` + this.text + `"`
        }
        else if(this.type == 'ascii') {
            text += "ASCII CODE " + this.asciiCode
        }
        else {
            text += "ESCAPE SEQUENCE " + `"` + this.escapeSequence + `"`
        }

        if(this.isNewLine == true)
            text += '\t[ENTER]'
        
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
        if(this.variable) {
            if(this.variable.name == variable.name)
                return this
        }

        return undefined
    }

    findStatement(statement: Statement): boolean {
        if(statement == this)
            return true
        
        return false
    }

    cloneStatement(statementCount: number): ReturnClone {
        if(this.type == 'variable')
            return new ReturnClone(new OutputStatement(statementCount, this.level, this.isNewLine, this.type, this.variable), true)
        else
            return new ReturnClone(new OutputStatement(statementCount, this.level, this.isNewLine, this.type, undefined, this.text), true)
    }

    generateCSourceCode(): string[] {
        let sourceCode = '' + this.getIndentation()
        let newLine = this.isNewLine ? '\\n' : ''
        
        if(this.type == 'variable') {
            if(this.variable instanceof Integer)
                sourceCode += `printf("%d` + newLine + `", ` + this.variable.name + ');'
            else if(this.variable instanceof Long)
                sourceCode += `printf("%lld` + newLine + `", ` + this.variable.name + ');'
            else if(this.variable instanceof Float)
                sourceCode += `printf("%f` + newLine + `", ` + this.variable.name + ');'
            else if(this.variable instanceof Double)
                sourceCode += `printf("%lf` + newLine + `", ` + this.variable.name + ');'
            else if(this.variable instanceof Char)
                sourceCode += `printf("%c` + newLine + `", ` + this.variable.name + ');'
            else if(this.variable instanceof String)
                sourceCode += `printf("%s` + newLine + `", ` + this.variable.name + ');'
        }
        else if(this.type == 'text')
            sourceCode += `printf("` + this.text + newLine + `");`
        else if(this.type == 'ascii')
            sourceCode += `printf("%c` + newLine + `", ` + this.asciiCode + ");"
        else
            sourceCode += `printf("` + this.escapeSequence + `");`

        sourceCode += '\n'

        let sourceCodeContainer: string[] = []
        sourceCodeContainer.push(sourceCode)

        return sourceCodeContainer
    }

    generateCppSourceCode(): string[] {
        let sourceCode = '' + this.getIndentation()

        if(this.type == 'variable') {
            if(this.isNewLine) 
                sourceCode += 'cout << ' + this.variable.name + ` << "\\n";`
            else
                sourceCode += 'cout << ' + this.variable.name + ';'
        }
        else if(this.type == 'text') {
            if(this.isNewLine) 
                sourceCode += `cout << "` + this.text + `" << "\\n";`
            else
                sourceCode += `cout << "` + this.text + `";`
        }
        else if(this.type == 'ascii')
            if(this.isNewLine) 
                sourceCode += `cout << "` + this.text + `" << "\\n";`
            else
                sourceCode += `cout << "` + this.text + `";`
        else
            sourceCode += `cout << "` + this.escapeSequence + `";`

        sourceCode += '\n'

        let sourceCodeContainer: string[] = []
        sourceCodeContainer.push(sourceCode)

        return sourceCodeContainer
    }

    generateJavaSourceCode(): string[] {
        let sourceCode: string = ''
        sourceCode += this.getIndentation()
        let prefix = this.isNewLine ? 'System.out.println(' : 'System.out.print('
        
        if(this.type == 'variable') 
            sourceCode += prefix + this.variable.name + ');'
        else if(this.type == 'text')
            sourceCode += prefix + `"` + this.text + `");`
        else if(this.type == 'ascii') {
            if(this.isNewLine)
                sourceCode += `System.out.printf("%c\\n", ` + this.asciiCode + ');' 
            else
                sourceCode += `System.out.printf("%c", ` + this.asciiCode + ');' 
        }
        else
            sourceCode += `System.out.printf("` + this.escapeSequence + `");`

        sourceCode += '\n'

        let sourceCodeContainer: string[] = []
        sourceCodeContainer.push(sourceCode)

        return sourceCodeContainer
    }

    generateCsSourceCode(): string[] {
        let sourceCode: string = ''
        sourceCode += this.getIndentation()
        let prefix = this.isNewLine ? 'Console.WriteLine(' : 'Console.Write('
        
        if(this.type == 'variable') 
            sourceCode += prefix + this.variable.name + ');'
        else if(this.type == 'text')
            sourceCode += prefix + `"` + this.text + `");`
        else if(this.type == 'ascii')
            sourceCode += prefix + '(char)' + this.asciiCode + '));'
        else
            sourceCode += prefix + `"` + this.escapeSequence + `");`

        sourceCode += '\n'

        let sourceCodeContainer: string[] = []
        sourceCodeContainer.push(sourceCode)

        return sourceCodeContainer
    }

    generatePythonSourceCode(): string[] {
        let sourceCodeContainer: string[] = [] 
        let sourceCode: string = '' + this.getIndentation()
    
        if(this.type == 'variable') {
            if(this.isNewLine)
                sourceCode += 'print(' + this.variable.name + ')'
            else
                sourceCode += 'print(' + this.variable.name + `, end='')`
        }
        else if(this.type == 'text') {
            if(this.isNewLine)
                sourceCode += `print("` + this.text + `")`
            else
                sourceCode += `print("` + this.text + `", end='')`
        }
        else if(this.type == 'ascii') {
            if(this.isNewLine)
                sourceCode += `print(chr(` + this.asciiCode + `))`
            else
                sourceCode += `print(chr(` + this.asciiCode + `), end='')`
        }
        else
            sourceCode += `print("` + this.escapeSequence + `")`

        sourceCode += '\n'
        sourceCodeContainer.push(sourceCode)

        return sourceCodeContainer
    }

    generatePseudocode(): string[] {
        let sourceCodeContainer: string[] = [] 

        let text: string = '' + this.getIndentation() + 'PRINT '
        if(this.type == 'variable') {
            text += this.variable.name
        }
        else if(this.type == 'text') {
            text += `"` + this.text + `"`
        }
        else if(this.type == 'ascii') {
            text += "ASCII CODE " + this.asciiCode
        }
        else {
            text += "ESCAPE SEQUENCE " + `"` + this.escapeSequence + `"`
        }

        if(this.isNewLine == true)
            text += ' [ENTER]'

        text += '\n'

        sourceCodeContainer.push(text)

        return sourceCodeContainer
    }

    toJSON() {
        return {
            statement: 'output',
            statementId: this.statementId, 
            level: this.level, 
            isNewLine: this.isNewLine, 
            type: this.type, 
            variable: this.variable, 
            text: this.text, 
            asciiCode: this.asciiCode, 
            escapeSequence: this.escapeSequence
        }
    }

    parseAttributes() {
        let variable: Variable

        if(this.variable == undefined)
            return
        
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

export default OutputStatement