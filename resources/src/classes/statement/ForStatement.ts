import ReturnClick from "../../utilities/ReturnClick";
import ReturnClone from "../../utilities/ReturnClone";
import Canvas from "../canvas/Canvas";
import Double from "../variable/Double";
import Float from "../variable/Float";
import Integer from "../variable/Integer";
import Long from "../variable/Long";
import Variable from "../variable/Variable";
import DeclareStatement from "./DeclareStatement";
import Condition from "./helper/general/Condition";
import Option from "./helper/options/Option";
import Statement from "./Statement";

class ForStatement extends Statement {
    
    variable: Integer | Float | Double | Long
    childStatement: Statement[] | undefined
    variableIsNew: boolean
    isIncrement: boolean
    addValueBy: number
    condition: Condition
    option: Option[]

    constructor(level: number, statementId: number, childStatement: Statement[] | undefined, variable: Integer | Float | Double | Long, 
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
        let declareStatement: DeclareStatement = new DeclareStatement(-1, -1, this.variable)
        this.option = []

        text += declareStatement.getDeclareStatementText(this.variableIsNew) + '; '
        text += this.condition.generateBlockCodeText() + '; '
        if(this.isIncrement) {
            if(this.addValueBy == 1) 
                text += this.variable.name + '++ )'
            else
                text += this.variable.name + ' += ' + this.addValueBy + ' )'
        }
        else {
            if(this.addValueBy == 1) 
                text += this.variable.name + '-- )'
            else
                text += this.variable.name + ' -= ' + this.addValueBy + ' )'
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
}

export default ForStatement