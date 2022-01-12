import ReturnClick from "../../utilities/ReturnClick";
import ReturnClone from "../../utilities/ReturnClone";
import Canvas from "../canvas/Canvas";
import Variable from "../variable/Variable";
import AssignmentStatement from "./AssignmentStatement";
import DeclareStatement from "./DeclareStatement";
import ForStatement from "./ForStatement";
import Condition from "./helper/general/Condition";
import Option from "./helper/options/Option";
import IfStatement from "./IfStatement";
import InputStatement from "./InputStatement";
import OutputStatement from "./OutputStatement";
import Statement from "./Statement";
import SwitchStatement from "./SwitchStatement";

class WhileStatement extends Statement {

    option: Option[]
    isWhile: boolean
    firstCondition: Condition
    logicalOperator: string | undefined = undefined
    secondCondition: Condition | undefined = undefined

    constructor(level: number, statementId: number, isWhile: boolean, childStatement: Statement[] | undefined, firstCondition: Condition, logicalOperator?: string, secondCondition?: Condition) {
        super(level)
        this.isWhile = isWhile
        this.statementId = this.generateId(statementId)
        this.childStatement = childStatement
        this.firstCondition = firstCondition
        this.logicalOperator = logicalOperator
        this.secondCondition = secondCondition
        this.color = '#00A9E2'
        this.option = []
        this.init()
    }

    generateId(statementId: number): string {
        return this.isWhile ? 'while-statement-' + statementId : 'do-while-statement-' + statementId
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

    writeToCanvas(canvas: Canvas) {
        let upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE
        let text = ''
        let conditionText = this.generateConditionText()
        let coordinate 
        this.option = []

        if(this.isWhile)
            text = conditionText
        else
            text = 'DO\t\t\t\t'

        if(this.isWhile)
            coordinate = canvas.writeText(this.level, text, this.color)
        else
            coordinate = canvas.writeClosingBlock(this.level, conditionText, text, this.color)

        this.option.push(new Option(this.statementId + '-outer', coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this))
        this.option[0].draw(canvas)

        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE)
        canvas.updateLastPosition()

        if(this.childStatement != undefined)
            for(let i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas)

        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION)

        if(this.isWhile)
            canvas.writeClosingBlock(this.level, text, 'END WHILE', this.color)
        else
            canvas.writeText(this.level, conditionText, this.color)
    }

    createOption(canvas: Canvas, coorX: number, coorY: number) {
        this.option.push(new Option(this.statementId + '-inner', coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this))
        this.option[1].draw(canvas)
    }

    generateConditionText(): string {
        return this.secondCondition ? 'WHILE ( ' + this.firstCondition.generateBlockCodeText() + ' '
            + this.logicalOperator + ' ' + this.secondCondition.generateBlockCodeText() + ' )' : 
            'WHILE ( ' + this.firstCondition.generateBlockCodeText() + ' )'
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
        let temp: Statement | undefined = undefined

        if(this.firstCondition.findVariable(variable))
            return this
        
        if(this.secondCondition) 
            if(this.secondCondition.findVariable(variable))
                return this
        
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
        let whileStatement: WhileStatement
        let returnClone: ReturnClone
        let childStatement: Statement[] = []

        if(this.logicalOperator != undefined)
            whileStatement = new WhileStatement(this.level, statementCount++, this.isWhile, undefined, this.firstCondition.cloneCondition(), this.logicalOperator, this.secondCondition.cloneCondition())
        else
            whileStatement =  new WhileStatement(this.level, statementCount++, this.isWhile, undefined, this.firstCondition.cloneCondition())    
    
        if(this.childStatement) {
             for(let i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++)
                if(returnClone.result == false) 
                    return returnClone

                childStatement.push(returnClone.statement)
             }
             whileStatement.updateChildStatement(childStatement)
        }
        
        return new ReturnClone(whileStatement, true)
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
        let temp

        if(this.isWhile) 
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCSourceCode() + ')\n')
        else 
            sourceCodeContainer.push(this.getIndentation() + 'do\n')

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

        if(!this.isWhile) 
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCSourceCode() + ');\n')
        
        return sourceCodeContainer
    }

    generateCppSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        if(this.isWhile) 
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCSourceCode() + ')\n')
        else 
            sourceCodeContainer.push(this.getIndentation() + 'do\n')

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

        if(!this.isWhile) 
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCSourceCode() + ');\n')
        
        return sourceCodeContainer
    }

    generateJavaSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        if(this.isWhile) 
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateJavaSourceCode() + ')\n')
        else 
            sourceCodeContainer.push(this.getIndentation() + 'do\n')

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

        if(!this.isWhile) 
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateJavaSourceCode() + ');\n')
        
        return sourceCodeContainer
    }

    generateCsSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        if(this.isWhile) 
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCsSourceCode() + ')\n')
        else 
            sourceCodeContainer.push(this.getIndentation() + 'do\n')

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

        if(!this.isWhile) 
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCsSourceCode() + ');\n')
        
        return sourceCodeContainer
    }

    generatePythonSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        sourceCodeContainer.push(this.getIndentation() + 'while ' + this.firstCondition.generatePythonSourceCode() + ':\n')

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

    toJSON() {
        return {
            statement: 'while',
            level: this.level, 
            statementId: this.statementId, 
            isWhile: this.isWhile, 
            childStatement: this.childStatement, 
            firstCondition: this.firstCondition, 
            logicalOperator: this.logicalOperator, 
            secondCondition: this.secondCondition
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

export default WhileStatement