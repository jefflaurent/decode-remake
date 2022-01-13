import ReturnClick from "../../../../utilities/ReturnClick";
import ReturnClone from "../../../../utilities/ReturnClone";
import Canvas from "../../../canvas/Canvas";
import Char from "../../../variable/Char";
import Variable from "../../../variable/Variable";
import AssignmentStatement from "../../AssignmentStatement";
import DeclareStatement from "../../DeclareStatement";
import ForStatement from "../../ForStatement";
import IfStatement from "../../IfStatement";
import InputStatement from "../../InputStatement";
import OutputStatement from "../../OutputStatement";
import Statement from "../../Statement";
import SwitchStatement from "../../SwitchStatement";
import WhileStatement from "../../WhileStatement";
import Condition from "../general/Condition";
import Option from "../options/Option";

class Case extends Statement {

    condition: Condition
    isDefault: boolean

    constructor(level: number, statementId: number, condition: Condition, childStatement: Statement[] | undefined, isDefault: boolean) {
        super(level)
        this.childStatement = childStatement
        this.condition = condition
        this.color = '#2bea15'
        this.statementId = this.generateId(statementId)
        this.isDefault = isDefault
    }

    init(): void {
        if(this.childStatement != undefined)
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this
    }

    generateId(statementId: number): string {
        return 'case-statement-' + statementId
    }

    updateChildLevel(): void {
        if(this.childStatement != undefined)
            for(let i = 0; i < this.childStatement.length; i++) {
                this.childStatement[i].level = this.level + 1
                this.childStatement[i].updateChildLevel()
            }
    }

    updateChildStatement(childStatement: Statement[]): void {
        this.childStatement = childStatement
        this.init()
    }

    writeToCanvas(canvas: Canvas): void {
        let upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE
        let text = ''

        if(!this.isDefault) {
            if(this.condition.secondVariable instanceof Char)
                text = `CASE '` + this.condition.secondVariable.value + `':\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t`
            else
                text = 'CASE ' + this.condition.secondVariable.value + ':\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'
        }   
        else
            text = 'DEFAULT:' + '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'
            
        let coordinate = canvas.writeText(this.level, text, this.color)
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE)
        canvas.updateLastPosition()

        if(this.childStatement) {
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas)
        }

        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION)
        canvas.writeClosingBlock(this.level, text, 'END CASE\t\t\t\t\t\t', this.color)
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
        let caseStatement: Case
        let returnClone: ReturnClone
        let childStatement: Statement[] = []

        if(this.isDefault)
            caseStatement = new Case(this.level, statementCount++, undefined, undefined, true)
        else
            caseStatement = new Case(this.level, statementCount++, this.condition.cloneCondition(), undefined, this.isDefault)
        
        if(this.childStatement) {
            for(let i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++)
                if(returnClone.result == false) 
                    return returnClone

                childStatement.push(returnClone.statement)
             }
        }
        caseStatement.updateChildStatement(childStatement)
        
        return new ReturnClone(caseStatement, true)
    }

    turnOffOption(): void {
        if(this.option != undefined)
            this.option.isSelectionActive = false

        if(this.childStatement != undefined) {
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].turnOffOption()
        }
    }

    generateCSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        if(!this.isDefault) {
            if(this.condition.secondVariable instanceof Char)
                sourceCodeContainer.push(this.getIndentation() + `case '` + this.condition.secondVariable.value + `':\n`) 
            else
                sourceCodeContainer.push(this.getIndentation() + `case ` + this.condition.secondVariable.value + `:\n`) 
        }
        else 
            sourceCodeContainer.push(this.getIndentation() + `default:\n`)

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
    
        sourceCodeContainer.push(this.getIndentation() + '\tbreak;\n')

        return sourceCodeContainer;
    }

    generateCppSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        if(!this.isDefault) {
            if(this.condition.secondVariable instanceof Char)
                sourceCodeContainer.push(this.getIndentation() + `case '` + this.condition.secondVariable.value + `':\n`) 
            else
                sourceCodeContainer.push(this.getIndentation() + `case ` + this.condition.secondVariable.value + `:\n`) 
        }
        else 
            sourceCodeContainer.push(this.getIndentation() + `default:\n`)

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
    
        sourceCodeContainer.push(this.getIndentation() + '\tbreak;\n')

        return sourceCodeContainer
    }

    generateJavaSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        if(!this.isDefault) {
            if(this.condition.secondVariable instanceof Char)
                sourceCodeContainer.push(this.getIndentation() + `case '` + this.condition.secondVariable.value + `':\n`) 
            else
                sourceCodeContainer.push(this.getIndentation() + `case ` + this.condition.secondVariable.value + `:\n`) 
        }
        else 
            sourceCodeContainer.push(this.getIndentation() + `default:\n`)

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
    
        sourceCodeContainer.push(this.getIndentation() + '\tbreak;\n')

        return sourceCodeContainer;
    }

    generateCsSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        if(!this.isDefault) {
            if(this.condition.secondVariable instanceof Char)
                sourceCodeContainer.push(this.getIndentation() + `case '` + this.condition.secondVariable.value + `':\n`) 
            else
                sourceCodeContainer.push(this.getIndentation() + `case ` + this.condition.secondVariable.value + `:\n`) 
        }
        else 
            sourceCodeContainer.push(this.getIndentation() + `default:\n`)

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
    
        sourceCodeContainer.push(this.getIndentation() + '\tbreak;\n')

        return sourceCodeContainer;
    }

    generatePseudocode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        if(!this.isDefault) {
            if(this.condition.secondVariable instanceof Char)
                sourceCodeContainer.push(this.getIndentation() + `CASE '` + this.condition.secondVariable.value + `'\n`) 
            else
                sourceCodeContainer.push(this.getIndentation() + `CASE ` + this.condition.secondVariable.value + `\n`) 
        }
        else 
            sourceCodeContainer.push(this.getIndentation() + `DEFAULT\n`)

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
    
        sourceCodeContainer.push(this.getIndentation() + '\tBREAK\n')

        return sourceCodeContainer;
    }

    toJSON() {
        return {
            statement: 'case',
            level: this.level, 
            statementId: this.statementId, 
            condition: this.condition, 
            childStatement: this.childStatement, 
            isDefault: this.isDefault
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
        let condition: Condition
        condition = Object.assign(new Condition(undefined, undefined, undefined, undefined), this.condition)
        condition.parseAttributes()

        this.condition = condition
    }
}

export default Case