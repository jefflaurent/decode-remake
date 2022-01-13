import ReturnClick from "../../../../utilities/ReturnClick"
import ReturnClone from "../../../../utilities/ReturnClone"
import ReturnFind from "../../../../utilities/ReturnFind"
import Canvas from "../../../canvas/Canvas"
import Variable from "../../../variable/Variable"
import AssignmentStatement from "../../AssignmentStatement"
import DeclareStatement from "../../DeclareStatement"
import ForStatement from "../../ForStatement"
import IfStatement from "../../IfStatement"
import InputStatement from "../../InputStatement"
import OutputStatement from "../../OutputStatement"
import Statement from "../../Statement"
import SwitchStatement from "../../SwitchStatement"
import WhileStatement from "../../WhileStatement"
import Condition from "../general/Condition"
import Option from "../options/Option"

class If extends Statement {
    
    logicalOperator: string | undefined = undefined
    firstCondition: Condition
    secondCondition: Condition | undefined
    childStatement: Statement[] | undefined

    constructor(level: number, statementId: number, firstCondition: Condition, 
        logicalOperator?: string, secondCondition?: Condition, childStatement?: Statement[]) {
        
        super(level)
        this.statementId = this.generateId(statementId)
        this.firstCondition = firstCondition
        this.logicalOperator = logicalOperator
        this.secondCondition = secondCondition
        this.childStatement = childStatement
        this.color = '#2bea15'
        this.option = undefined
        this.init()
        this.updateChildLevel()
    }

    generateId(number: number): string {
        return 'if-' + number
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
        let text = 'IF '
        
        if(this.logicalOperator != undefined && this.secondCondition != undefined)
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' ' 
                    + this.secondCondition.generateBlockCodeText() + ' )'
        else
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' )' 

        // IF( condition )
        let coordinate = canvas.writeText(this.level, text, this.color)
        // Create option button for IfStatement
        this.parent.option = new Option(this.parent.statementId, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this.parent)
        this.parent.option.draw(canvas)

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

        if(this.firstCondition.findVariable(variable))
            return this
        
        if(this.secondCondition) {
            if(this.secondCondition.findVariable(variable))
                return this
        }
        
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
        let ifStatement: If
        let returnClone: ReturnClone
        let childStatement: Statement[] = []

        if(this.logicalOperator != undefined) {
            ifStatement =  new If(this.level, statementCount, 
                this.firstCondition.cloneCondition(), this.logicalOperator, this.secondCondition.cloneCondition())
        }
        else
            ifStatement = new If(this.level, statementCount, this.firstCondition.cloneCondition())

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

            sourceCode += 'if(' + this.firstCondition.generateCSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateCSourceCode() + ')\n'
        }
        else {
            sourceCode += 'if(' + this.firstCondition.generateCSourceCode() + ')\n' 
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

    generateCppSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let sourceCode = '' + this.getIndentation()
        let temp
        
        if(this.logicalOperator != undefined && this.secondCondition != undefined) {
            let symbol = this.logicalOperator == 'AND' ? '&&' : '||'

            sourceCode += 'if(' + this.firstCondition.generateCSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateCSourceCode() + ')\n'
        }
        else {
            sourceCode += 'if(' + this.firstCondition.generateCSourceCode() + ')\n' 
        }
        sourceCodeContainer.push(sourceCode)
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
        let sourceCode = '' + this.getIndentation()
        let temp
        
        if(this.logicalOperator != undefined && this.secondCondition != undefined) {
            let symbol = this.logicalOperator == 'AND' ? '&&' : '||'

            sourceCode += 'if(' + this.firstCondition.generateJavaSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateJavaSourceCode() + ')\n'
        }
        else {
            sourceCode += 'if(' + this.firstCondition.generateJavaSourceCode() + ')\n' 
        }
        sourceCodeContainer.push(sourceCode)
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
        let sourceCode = '' + this.getIndentation()
        let temp
        
        if(this.logicalOperator != undefined && this.secondCondition != undefined) {
            let symbol = this.logicalOperator == 'AND' ? '&&' : '||'

            sourceCode += 'if(' + this.firstCondition.generateCsSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateCsSourceCode() + ')\n'
        }
        else {
            sourceCode += 'if(' + this.firstCondition.generateCsSourceCode() + ')\n' 
        }
        sourceCodeContainer.push(sourceCode)
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
        
        if(this.logicalOperator != undefined && this.secondCondition != undefined) {
            let symbol = this.logicalOperator == 'AND' ? 'and' : 'or'

            sourceCode += 'if ' + this.firstCondition.generatePythonSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generatePythonSourceCode() + ':\n'
        }
        else {
            sourceCode += 'if ' + this.firstCondition.generatePythonSourceCode() + ':\n' 
        }
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

    generatePseudocode(): string[] {
        let sourceCodeContainer: string[] = []
        let sourceCode = '' + this.getIndentation()
        let temp
        
        if(this.logicalOperator != undefined && this.secondCondition != undefined) {
            sourceCode += 'IF ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' '
                + this.secondCondition.generateBlockCodeText() + '\n'
        }
        else {
            sourceCode += 'IF ' + this.firstCondition.generateBlockCodeText() + '\n' 
        }
        sourceCodeContainer.push(sourceCode)
        sourceCodeContainer.push(this.getIndentation() + 'BEGIN\n')

        if(this.childStatement != undefined) {
            if(this.childStatement.length == 0)
                sourceCodeContainer.push('\n')
            else {
                for(let i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePseudocode()
                    temp = temp.flat(Infinity)
    
                    for(let j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j])
                }
            }
        }
        else {
            sourceCodeContainer.push('\n')
        }

        sourceCodeContainer.push(this.getIndentation() + 'END\n')

        return sourceCodeContainer
    }

    toJSON() {
        return {
            statement: 'if',
            level: this.level,
            statementId: this.statementId,
            firstCondition: this.firstCondition,
            logicalOperator: this.logicalOperator,
            secondCondition: this.secondCondition,
            childStatement: this.childStatement
        }
    }

    parseChild() {
        let newChildStatement: Statement[] = []
        let tempChild: Statement = undefined
        let object: any = undefined

        if(this.childStatement != undefined) {
            for(let i = 0; i < this.childStatement.length; i++) {
                object = this.childStatement[i]
                if(object.statement == 'declare') {
                    tempChild = Object.assign(new DeclareStatement(undefined, undefined, undefined), object);
                    (tempChild as DeclareStatement).parseAttributes();
                }
                else if(object.statement == 'input') {
                    tempChild = Object.assign(new InputStatement(undefined, undefined, undefined), object);
                    (tempChild as InputStatement).parseAttributes();
                }
                else if(object.statement == 'output') {
                    tempChild = Object.assign(new OutputStatement(undefined, undefined, undefined, undefined), object);
                    (tempChild as OutputStatement).parseAttributes();
                }
                else if(object.statement == 'assignment') {
                    tempChild = Object.assign(new AssignmentStatement(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    (tempChild as AssignmentStatement).parseAttributes();
                }
                else if(object.statement == 'ifstatement') {
                    tempChild = Object.assign(new IfStatement(undefined, undefined, undefined), object);
                    (tempChild as IfStatement).parseChild();
                }
                else if(object.statement == 'for') {
                    tempChild = Object.assign(new ForStatement(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    (tempChild as ForStatement).parseChild();
                    (tempChild as ForStatement).parseAttributes();
                }
                else if(object.statement == 'while') {
                    tempChild = Object.assign(new WhileStatement(undefined, undefined, undefined, undefined, undefined), object);
                    (tempChild as WhileStatement).parseChild();
                    (tempChild as WhileStatement).parseAttributes();
                }
                else if(object.statement == 'switch') {
                    tempChild = Object.assign(new SwitchStatement(undefined, undefined, undefined, undefined), object);
                    (tempChild as SwitchStatement).parseChild();
                    (tempChild as SwitchStatement).parseAttributes();
                }
                newChildStatement.push(tempChild)
            }
    
            this.updateChildStatement(newChildStatement)
        }
    }

    parseAttributes() {
        let firstCondition = Object.assign(new Condition(undefined, undefined, undefined, undefined), this.firstCondition)
        firstCondition.parseAttributes()
        this.firstCondition = firstCondition

        if(this.secondCondition != undefined) {
            let secondCondition = Object.assign(new Condition(undefined, undefined, undefined, undefined), this.secondCondition)
            secondCondition.parseAttributes()
            this.secondCondition = secondCondition
        }
    }
}

export default If