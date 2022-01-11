import ReturnClick from "../../../../utilities/ReturnClick"
import ReturnClone from "../../../../utilities/ReturnClone"
import Canvas from "../../../canvas/Canvas"
import Variable from "../../../variable/Variable"
import Statement from "../../Statement"
import Option from "../options/Option"

class Else extends Statement {

    childStatement: Statement[]
    
    constructor(level: number, statementId: number, childStatement?: Statement[]) {
        super(level)
        this.statementId = this.generateId(statementId)
        this.childStatement = childStatement
        this.color = '#2bea15'
        this.option = undefined
        this.init()
        this.updateChildLevel()
    }

    generateId(number: number): string {
        return 'else-' + number
    }

    init(): void {
        if(this.childStatement != undefined)
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this
    }

    updateChildStatement(childStatement: Statement[]): void {
        this.childStatement = childStatement
        this.init()
    }

    writeToCanvas(canvas: Canvas, isClose: boolean): void {
        let upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE
        let text = 'ELSE\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'
        
        // ELSE
        let coordinate = canvas.writeText(this.level, text, this.color)

        // Create option button for If
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE)
        canvas.updateLastPosition()

        if(this.childStatement != undefined)
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas)

        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION)

        if(isClose) 
            canvas.writeClosingBlock(this.level, text, 'END IF', this.color)
    }

    createOption(canvas: Canvas, coorX: number, coorY: number) {
        this.option = new Option(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this)
        this.option.draw(canvas)
    }

    callClickEvent(canvas: Canvas, x: number, y: number): ReturnClick | undefined {
        let temp = this.option.clickOption(canvas, x, y)
        let tempChild: any = undefined
        if(this.childStatement != undefined) {
            for(let i = 0; i < this.childStatement.length; i++) {
                tempChild = this.childStatement[i].callClickEvent(canvas, x, y)
                if(tempChild != undefined)
                    break
            }
        }

        return temp ? temp : tempChild
    }

    findVariable(variable: Variable): Statement | undefined {
        let temp: Statement | undefined = undefined
        
        if(this.childStatement == undefined)
            return undefined

        for(let i = 0; i < this.childStatement.length; i++) {
            temp = this.childStatement[i].findVariable(variable)
            if(temp != undefined)
                return temp
        }

        return undefined
    }

    findStatement(statement: Statement): boolean {
        if(statement == this)
            return true
        
        let statementFound: boolean = false
        
        if(this.childStatement != undefined) {
            for(let i = 0; i < this.childStatement.length; i++) {
                statementFound = this.childStatement[i].findStatement(statement)
                if(statementFound)
                    return true
            }
        }

        return false
    }

    cloneStatement(statementCount: number): ReturnClone {
        let elseStatement: Else
        let returnClone: ReturnClone
        let childStatement: Statement[] = []

        elseStatement = new Else(this.level, statementCount++)
        if(this.childStatement) {
            for(let i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++)
                if(returnClone.result == false)
                    return returnClone

                childStatement.push(returnClone.statement)
            }
            elseStatement.updateChildStatement(childStatement)
        }

        return new ReturnClone(elseStatement, true)
    }

    generateCSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        sourceCodeContainer.push(this.getIndentation() + 'else\n')
        sourceCodeContainer.push(this.getIndentation() + '{\n')

        if(this.childStatement != undefined) {
            if(this.childStatement.length == 0) 
                sourceCodeContainer.push('\n')
            else {
                for(let i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCSourceCode()
                    temp = temp.flat(Infinity)
    
                    for(let j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j])
                }
            }
        }
        else {
            sourceCodeContainer.push('\n')
        }

        sourceCodeContainer.push(this.getIndentation() + '}\n')

        return sourceCodeContainer
    }

    generateCppSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        sourceCodeContainer.push(this.getIndentation() + 'else\n')
        sourceCodeContainer.push(this.getIndentation() + '{\n')

        if(this.childStatement != undefined) {
            if(this.childStatement.length == 0)
                sourceCodeContainer.push('\n')
            else {
                for(let i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCppSourceCode()
                    temp = temp.flat(Infinity)
    
                    for(let j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j])
                }
            }
        }
        else {
            sourceCodeContainer.push('\n')
        }

        sourceCodeContainer.push(this.getIndentation() + '}\n')

        return sourceCodeContainer
    }

    generateJavaSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        sourceCodeContainer.push(this.getIndentation() + 'else\n')
        sourceCodeContainer.push(this.getIndentation() + '{\n')

        if(this.childStatement != undefined) {
            if(this.childStatement.length == 0)
                sourceCodeContainer.push('\n')
            else {
                for(let i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateJavaSourceCode()
                    temp = temp.flat(Infinity)
    
                    for(let j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j])
                }
            }
        }
        else {
            sourceCodeContainer.push('\n')
        }

        sourceCodeContainer.push(this.getIndentation() + '}\n')

        return sourceCodeContainer
    }

    generateCsSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        sourceCodeContainer.push(this.getIndentation() + 'else\n')
        sourceCodeContainer.push(this.getIndentation() + '{\n')

        if(this.childStatement != undefined) {
            if(this.childStatement.length == 0)
                sourceCodeContainer.push('\n')
            else {
                for(let i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCsSourceCode()
                    temp = temp.flat(Infinity)
    
                    for(let j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j])
                }
            }
        }
        else {
            sourceCodeContainer.push('\n')
        }

        sourceCodeContainer.push(this.getIndentation() + '}\n')

        return sourceCodeContainer
    }

    generatePythonSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let sourceCode = '' + this.getIndentation()
        let temp
        
        sourceCode += 'else:\n'
        sourceCodeContainer.push(sourceCode)

        if(this.childStatement != undefined) {
            if(this.childStatement.length == 0) {
                let tempPrint = '' + this.getIndentation() + '\t' + `print('')` + '\n'
                sourceCodeContainer.push(tempPrint)
            }
            else {
                for(let i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePythonSourceCode()
                    temp = temp.flat(Infinity)
    
                    for(let j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j])
                }
            }
        }
        else {
            let tempPrint = '' + this.getIndentation() + '\t' + `print('')` + '\n'
            sourceCodeContainer.push(tempPrint)
        }

        return sourceCodeContainer
    }
}

export default Else