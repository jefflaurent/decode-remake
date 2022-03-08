import ReturnClick from "../../utilities/ReturnClick";
import ReturnClone from "../../utilities/ReturnClone";
import Canvas from "../canvas/Canvas";
import Double from "../variable/Double";
import Float from "../variable/Float";
import Integer from "../variable/Integer";
import Long from "../variable/Long";
import Variable from "../variable/Variable";
import AssignmentStatement from "./AssignmentStatement";
import DeclareStatement from "./DeclareStatement";
import Condition from "./helper/general/Condition";
import Option from "./helper/options/Option";
import IfStatement from "./IfStatement";
import InputStatement from "./InputStatement";
import OutputStatement from "./OutputStatement";
import Statement from "./Statement";
import SwitchStatement from "./SwitchStatement";
import WhileStatement from "./WhileStatement";

class ForStatement extends Statement {
    
    variable: Variable
    childStatement: Statement[] | undefined
    variableIsNew: boolean
    isIncrement: boolean
    addValueBy: number
    condition: Condition
    option: Option[]

    constructor(level: number, statementId: number, childStatement: Statement[] | undefined, variable: Variable, 
        variableIsNew: boolean, isIncrement: boolean, addValueBy: number, condition: Condition) {
        super(level)
        this.statementId = this.generateId(statementId)
        this.childStatement = childStatement
        this.variable = variable
        this.variableIsNew = variableIsNew
        this.isIncrement = isIncrement
        this.addValueBy = addValueBy
        this.condition = condition
        this.color = '#00A9E2'
        this.option = []
    }

    generateId(number: number): string {
        return 'for-statement-' + number
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

    writeToCanvas(canvas: Canvas): void {
        let upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE
        let text = 'FOR ( '
        this.option = []

        text += this.variable.name + ' = 0; '
        text += this.condition.generateBlockCodeText() + '; '
        if(this.isIncrement) {
            if(this.addValueBy == 1) 
                text += this.variable.name + '++ )'
            else
                text += this.variable.name  + ' += ' + this.addValueBy + ' )'
        }
        else {
            if(this.addValueBy == 1) 
                text += this.variable.name  + '-- )'
            else
                text += this.variable.name  + ' -= ' + this.addValueBy + ' )'
        }

        // FOR ( ; ; )
        let coordinate = canvas.writeText(this.level, text, this.color)
        this.option.push(new Option(this.statementId + '-outer', coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this))
        this.option[0].draw(canvas)

        // Create option button for IfStatement
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE)
        canvas.updateLastPosition()

        if(this.childStatement != undefined)
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas)

        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION)
        canvas.writeClosingBlock(this.level, text, 'END FOR', this.color)
    }

    createOption(canvas: Canvas, coorX: number, coorY: number) {
        this.option.push(new Option(this.statementId + '-inner', coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this))
        this.option[1].draw(canvas)
    }

    callClickEvent(canvas: Canvas, x: number, y: number): ReturnClick | undefined {
        let tempOption: any = undefined
        let tempChild: any = undefined
        for(let i = 0; i < this.option.length; i++) {
            tempOption = this.option[i].clickOption(canvas, x, y)
            if(tempOption != undefined)
                break;
        }
        
        if(tempOption == undefined)
            if(this.childStatement != undefined)
                for(let i = 0; i < this.childStatement.length; i++) {
                    tempChild = this.childStatement[i].callClickEvent(canvas, x, y)
                    if(tempChild != undefined)
                        break
                }

        return tempOption ? tempOption : tempChild
    }

    findVariable(variable: Variable): Statement | undefined {
        if(!this.variableIsNew) {
            if(this.variable.name == variable.name)
                return this
        }

        if(this.condition.findVariable(variable))
            return this

        let temp: Statement | undefined = undefined

        if(this.childStatement) {
            for(let i = 0; i < this.childStatement.length; i++) {                
                temp = this.childStatement[i].findVariable(variable)
                if(temp != undefined)
                    return temp
            }
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
        let forStatement = new ForStatement(this.level, statementCount++, undefined, 
            this.variable, this.variableIsNew, this.isIncrement, this.addValueBy, this.condition.cloneCondition())
        
        let childStatement = []
        let returnClone: ReturnClone | undefined

        if(this.childStatement) {
            for(let i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++)
                if(returnClone.result == false) 
                    return returnClone

                childStatement.push(returnClone.statement)
            }
            forStatement.updateChildStatement(childStatement)
        }

        return new ReturnClone(forStatement, true)
    }

    turnOffOption(): void {
        if(this.option[0] != undefined)
            this.option[0].isSelectionActive = false
        if(this.option[1] != undefined)
            this.option[1].isSelectionActive = false

        if(this.childStatement != undefined) {
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].turnOffOption()
        }
    }

    generateCSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let sourceCode = '' + this.getIndentation()
        let temp

        sourceCode += 'for(' + this.variable.name + ' = 0; ' 
        sourceCode += this.condition.generateCSourceCode()
        sourceCode += '; '
        if(this.isIncrement) {
            if(this.addValueBy == 1) 
                sourceCode += this.variable.name + '++)'
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ')'
        }
        else {
            if(this.addValueBy == 1) 
                sourceCode += this.variable.name + '--)'
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ')'
        }
        sourceCode += '\n'

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

        sourceCode += 'for(' + this.variable.name + ' = 0; ' 
        sourceCode += this.condition.generateCSourceCode()
        sourceCode += '; '
        if(this.isIncrement) {
            if(this.addValueBy == 1) 
                sourceCode += this.variable.name + '++)'
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ')'
        }
        else {
            if(this.addValueBy == 1) 
                sourceCode += this.variable.name + '--)'
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ')'
        }
        sourceCode += '\n'

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

        sourceCode += 'for(' + this.variable.name + ' = 0; ' 
        sourceCode += this.condition.generateJavaSourceCode()
        sourceCode += '; '
        if(this.isIncrement) {
            if(this.addValueBy == 1) 
                sourceCode += this.variable.name + '++)'
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ')'
        }
        else {
            if(this.addValueBy == 1) 
                sourceCode += this.variable.name + '--)'
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ')'
        }
        sourceCode += '\n'

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

        sourceCode += 'for(' + this.variable.name + ' = 0; ' 
        sourceCode += this.condition.generateCsSourceCode()
        sourceCode += '; '
        if(this.isIncrement) {
            if(this.addValueBy == 1) 
                sourceCode += this.variable.name + '++)'
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ')'
        }
        else {
            if(this.addValueBy == 1) 
                sourceCode += this.variable.name + '--)'
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ')'
        }
        sourceCode += '\n'

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
        let condition = ''
        let updateValue = ''
        if(this.condition.isCustomValue)
            condition = this.condition.secondVariable.value
        else
            condition = this.condition.secondVariable.name

        if(this.isIncrement)
            updateValue = this.addValueBy + ''
        else
            updateValue = '-' + this.addValueBy

        sourceCode += 'for ' + this.variable.name + ' in range(0, ' + condition + ', ' + updateValue + '):\n'

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
        sourceCode += 'FOR '

        sourceCode += this.variable.name + ' = 0; '
        sourceCode += this.condition.generateBlockCodeText() + '; '
        if(this.isIncrement) {
            if(this.addValueBy == 1) 
                sourceCode += this.variable.name + '++ '
            else
                sourceCode += this.variable.name  + ' += ' + this.addValueBy + ' '
        }
        else {
            if(this.addValueBy == 1) 
                sourceCode += this.variable.name  + '-- '
            else
                sourceCode += this.variable.name  + ' -= ' + this.addValueBy + ' '
        }
        
        sourceCode += '\n'
        sourceCodeContainer.push(sourceCode)
        sourceCode = '' + this.getIndentation() + 'BEGIN\n'
        sourceCodeContainer.push(sourceCode)

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
            statement: 'for',
            statementId: this.statementId,
            level: this.level,
            childStatement: this.childStatement,
            variable: this.variable,
            variableIsNew: this.variableIsNew,
            isIncrement: this.isIncrement,
            addValueBy: this.addValueBy,
            condition: this.condition
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
        let variable: Variable
        let condition: Condition

        if((this.variable as any).type  == 'int') 
            variable = Object.assign(new Integer(undefined, undefined), this.variable)
        else if((this.variable as any).type  == 'double') 
            variable = Object.assign(new Double(undefined, undefined), this.variable)
        else if((this.variable as any).type  == 'long') 
            variable = Object.assign(new Long(undefined, undefined), this.variable)
        else if((this.variable as any).type  == 'float') 
            variable = Object.assign(new Float(undefined, undefined), this.variable)

        condition = Object.assign(new Condition(undefined, undefined, undefined, undefined), this.condition)
        condition.parseAttributes()

        this.variable = variable
        this.condition = condition
    }
}

export default ForStatement