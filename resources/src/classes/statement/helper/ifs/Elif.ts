
import ReturnClone from "../../../../utilities/ReturnClone"
import Canvas from "../../../canvas/Canvas"
import Statement from "../../Statement"
import Condition from "../general/Condition"
import If from "./If"

class Elif extends If {
    
    constructor(level: number, statementId: number, firstCondition: Condition, logicalOperator?: string, secondCondition?: Condition, childStatement?: Statement[]) {
        super(level, statementId, firstCondition, logicalOperator, secondCondition, childStatement)
        this.statementId = this.generateId(statementId)
        this.init()
    }

    generateId(number: number): string  {
        return 'elif-' + number
    }

    writeToCanvas(canvas: Canvas, isClose: boolean): void {
        let upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE
        let text = 'ELSE IF'
        
        if(this.logicalOperator != undefined && this.secondCondition != undefined)
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' ' 
                    + this.secondCondition.generateBlockCodeText() + ' )'
        else
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' )' 

        // ELSE IF( condition )
        let coordinate = canvas.writeText(this.level, text, this.color)

        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT),  coordinate.y + canvas.SPACE)
        canvas.updateLastPosition()

        if(this.childStatement != null) 
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas)

        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION)

        if(isClose) 
            canvas.writeClosingBlock(this.level, text, 'END IF', this.color)
    }

    cloneStatement(statementCount: number): ReturnClone {
        let ifStatement: If
        let returnClone: ReturnClone
        let childStatement: Statement[] = []

        if(this.logicalOperator != undefined) {
            ifStatement =  new Elif(this.level, statementCount, 
                this.firstCondition.cloneCondition(), this.logicalOperator, this.secondCondition.cloneCondition())
        }
        else
            ifStatement = new Elif(this.level, statementCount, this.firstCondition.cloneCondition())

        if(this.childStatement) {
            for(let i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++)
                if(returnClone.result == false) 
                    return returnClone
                
                childStatement.push(returnClone.statement)
            }
            ifStatement.updateChildStatement(childStatement)
        }

        return new ReturnClone(ifStatement, true)
    }

    generateCSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let sourceCode = '' + this.getIndentation()
        let temp
        
        if(this.logicalOperator != undefined && this.secondCondition != undefined) {
            let symbol = this.logicalOperator == 'AND' ? '&&' : '||'

            sourceCode += 'else if(' + this.firstCondition.generateCSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateCSourceCode() + ')\n'
        }
        else {
            sourceCode += 'else if(' + this.firstCondition.generateCSourceCode() + ')\n' 
        }
        sourceCodeContainer.push(sourceCode)
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
}

export default Elif