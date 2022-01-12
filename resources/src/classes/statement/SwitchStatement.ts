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
import Case from "./helper/case/Case";
import Condition from "./helper/general/Condition";
import Elif from "./helper/ifs/Elif";
import Else from "./helper/ifs/Else";
import If from "./helper/ifs/If";
import Option from "./helper/options/Option";
import IfStatement from "./IfStatement";
import Statement from "./Statement";

class SwitchStatement extends Statement {

    caseStatement: Statement[] | undefined
    variable: Variable

    constructor(level: number, statementId: number, variable: Variable, caseStatement: any[] | undefined) {
        super(level)
        this.statementId = this.generateId(statementId)
        this.caseStatement = caseStatement
        this.variable = variable
        this.color = '#2bea15'
        this.init()
    }

    updateCaseStatement(caseStatement: Statement[] | undefined): void {
        this.caseStatement = caseStatement
        this.init()
    }

    updateChildLevel(): void {
        if(this.caseStatement != undefined)
            for(let i = 0; i < this.caseStatement.length; i++) {
                this.caseStatement[i].level = this.level + 1
                this.caseStatement[i].updateChildLevel()
            }
    }

    updateChildStatement(caseStatement: Statement[]): void {
        this.caseStatement = caseStatement
        this.init()
    }

    generateId(statementId: number): string {
        return 'switch-statement-' + statementId
    }

    init(): void {
        if(this.caseStatement != undefined)
            for(let i = 0; i < this.caseStatement.length; i++) {
                this.caseStatement[i].parent = this
                this.caseStatement[i].level = this.level + 1
            }
    }

    writeToCanvas(canvas: Canvas): void {
        let upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE
        let text = 'SWITCH ( ' + this.variable.name + ' )'
        let coordinate = canvas.writeText(this.level, text, this.color)
        this.option = new Option(this.statementId, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this)
        this.option.draw(canvas)

        for(let i = 0; i < this.caseStatement.length; i++)    
            this.caseStatement[i].writeToCanvas(canvas)

        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION)
        canvas.writeClosingBlock(this.level, text, 'END SWITCH', this.color)
    }

    callClickEvent(canvas: Canvas, x: number, y: number): ReturnClick | undefined {
        let temp = this.option.clickOption(canvas, x, y)
        let tempChild: any = undefined
        if(this.caseStatement != undefined)
            for(let i = 0; i < this.caseStatement.length; i++) {
                tempChild = this.caseStatement[i].callClickEvent(canvas, x, y)
                if(tempChild != undefined)
                    break
            }

        return temp ? temp : tempChild
    }

    findVariable(variable: Variable): Statement | undefined {
        let temp: Statement | undefined = undefined
        if(this.variable.name == variable.name)
            return this
        
        for(let i = 0; i < this.caseStatement.length; i++) {      
            temp = this.caseStatement[i].findVariable(variable)
            
            if(temp != undefined)
                return temp
        }

        return undefined
    }

    findStatement(statement: Statement): boolean {
        if(statement == this)
            return true

        let statementFound: boolean = false
    
        for(let i = 0; i < this.caseStatement.length; i++) {
            statementFound = this.caseStatement[i].findStatement(statement)
            if(statementFound)
                return true
        }

        return false
    }

    cloneStatement(statementCount: number): ReturnClone {
        let switchStatement: SwitchStatement = new SwitchStatement(this.level, statementCount++, this.variable, undefined)
        let caseStatement: Statement[] = []
        let returnClone: ReturnClone

        for(let i = 0; i < this.caseStatement.length; i++) {
            returnClone = this.caseStatement[i].cloneStatement(statementCount++)
            if(returnClone.result == false)
                return returnClone
                
            caseStatement.push(returnClone.statement)
            switchStatement.updateChildStatement(caseStatement)
        }

        return new ReturnClone(switchStatement, true)
    }

    turnOffOption(): void {
        if(this.option != undefined)
            this.option.isSelectionActive = false

        if(this.caseStatement != undefined) {
            for(let i = 0; i < this.caseStatement.length; i++)
                (this.caseStatement[i] as unknown as Case).turnOffOption()
        }
    }

    generateCSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        sourceCodeContainer.push(this.getIndentation() + 'switch(' + this.variable.name + ')\n')
        sourceCodeContainer.push(this.getIndentation() + '{\n')
        
        for(let i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generateCSourceCode()
            temp = temp.flat(Infinity)

            for(let j =0 ; j < temp.length; j++) 
                sourceCodeContainer.push(temp[j])
        }

        sourceCodeContainer.push(this.getIndentation() + '}\n')

        return sourceCodeContainer
    }

    generateCppSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        sourceCodeContainer.push(this.getIndentation() + 'switch(' + this.variable.name + ')\n')
        sourceCodeContainer.push(this.getIndentation() + '{\n')
        
        for(let i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generateCppSourceCode()
            temp = temp.flat(Infinity)

            for(let j =0 ; j < temp.length; j++) 
                sourceCodeContainer.push(temp[j])
        }

        sourceCodeContainer.push(this.getIndentation() + '}\n')

        return sourceCodeContainer
    }

    generateJavaSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        sourceCodeContainer.push(this.getIndentation() + 'switch(' + this.variable.name + ')\n')
        sourceCodeContainer.push(this.getIndentation() + '{\n')
        
        for(let i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generateJavaSourceCode()
            temp = temp.flat(Infinity)

            for(let j =0 ; j < temp.length; j++) 
                sourceCodeContainer.push(temp[j])
        }

        sourceCodeContainer.push(this.getIndentation() + '}\n')

        return sourceCodeContainer
    }

    generateCsSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let temp

        sourceCodeContainer.push(this.getIndentation() + 'switch(' + this.variable.name + ')\n')
        sourceCodeContainer.push(this.getIndentation() + '{\n')
        
        for(let i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generateCsSourceCode()
            temp = temp.flat(Infinity)

            for(let j =0 ; j < temp.length; j++) 
                sourceCodeContainer.push(temp[j])
        }

        sourceCodeContainer.push(this.getIndentation() + '}\n')

        return sourceCodeContainer
    }

    generatePythonSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        let ifStatement = new IfStatement(this.level, 0, undefined)
        let ifOperations = []
        let tempCondition: Condition | undefined  = undefined
        let tempChildStatement: Statement[] | undefined = undefined 
        let temp

        for(let i = 0; i < this.caseStatement.length; i++) { 
            tempCondition = (this.caseStatement[i] as unknown as Case).condition
            tempChildStatement = this.caseStatement[i].childStatement
            
            if(i == 0) 
                ifOperations.push(new If(this.level, 0, tempCondition, undefined, undefined, tempChildStatement))
            else {
                if((this.caseStatement[i] as unknown as Case).isDefault)
                    ifOperations.push(new Else(this.level, 0, tempChildStatement)) 
                else 
                    ifOperations.push(new Elif(this.level, 0, tempCondition, undefined, undefined, tempChildStatement))
            }
        }

        ifStatement.updateIfOperations(ifOperations)
        temp = ifStatement.generatePythonSourceCode()
        temp = temp.flat(Infinity)

        for(let j =0 ; j < temp.length; j++) 
            sourceCodeContainer.push(temp[j])

        return sourceCodeContainer
    }

    toJSON() {
        return {
            statement: 'switch',
            level: this.level, 
            statementId: this.statementId, 
            variable: this.variable, 
            caseStatement: this.caseStatement
        }
    }

    parseChild() {
        let newCaseStatement: Statement[] = []
        let tempCase: Statement = undefined
        let object: any = undefined

        for(let i = 0; i < this.caseStatement.length; i++) {
            object = this.caseStatement[i]
            
            tempCase = Object.assign(new Case(undefined, undefined, undefined, undefined, undefined), object);
            (tempCase as Case).parseChild();
            (tempCase as Case).parseAttributes();

            newCaseStatement.push(tempCase)
        }

        this.updateCaseStatement(newCaseStatement)
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

export default SwitchStatement