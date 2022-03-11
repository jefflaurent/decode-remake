import ReturnClick from "../../utilities/ReturnClick"
import ReturnClone from "../../utilities/ReturnClone"
import Canvas from "../canvas/Canvas"
import Variable from "../variable/Variable"
import Elif from "./helper/ifs/Elif"
import Else from "./helper/ifs/Else"
import If from "./helper/ifs/If"
import Statement from "./Statement"

class IfStatement extends Statement {

    ifOperations: any[] | undefined
 
    constructor(level: number, statementId: number, ifOperations: Statement[] | undefined) {
        super(level)
        this.statementId = this.generateId(statementId)
        this.ifOperations = ifOperations
        this.init()
    }

    updateChildLevel(): void {
        if(this.ifOperations != undefined) {
            for(let i = 0; i < this.ifOperations.length; i++) {
                this.ifOperations[i].level = this.level
                if(this.ifOperations[i] instanceof If)
                    (this.ifOperations[i] as If).updateChildLevel()
                else
                    (this.ifOperations[i] as Else).updateChildLevel()
            }
        }
    }

    generateId(number: number): string {
        return 'if-statement-' + number
    }

    updateIfOperations(ifOperations: Statement[]): void {
        this.ifOperations = ifOperations
        this.init()
    }

    init(): void {
        if(this.ifOperations != undefined) {
            for(let i = 0; i < this.ifOperations.length; i++) {
                if(this.ifOperations[i] != undefined)
                    this.ifOperations[i].parent = this
            }
        }
    }

    writeToCanvas(canvas: Canvas): void {
        if(this.ifOperations)
            for(let i = 0; i < this.ifOperations.length; i++) {
                if(i != this.ifOperations.length - 1)
                    this.ifOperations[i].writeToCanvas(canvas, false)
                else 
                    this.ifOperations[i].writeToCanvas(canvas, true)
            }
    }

    callClickEvent(canvas: Canvas, x: number, y: number): ReturnClick | undefined {
        let temp = this.option.clickOption(canvas, x, y)
        let tempChild: any = undefined
        if(this.ifOperations != undefined)
            for(let i = 0; i < this.ifOperations.length; i++) {
                tempChild = this.ifOperations[i].callClickEvent(canvas, x, y)
                if(tempChild != undefined)
                    break
            }

        return temp ? temp : tempChild
    }

    findVariable(variable: Variable): Statement | undefined {
        let temp: Statement | undefined  = undefined

        for(let i = 0; i < this.ifOperations.length; i++) {
            temp = this.ifOperations[i].findVariable(variable)

            if(temp != undefined)
                return temp
        }

        return undefined
    }

    findStatement(statement: Statement): boolean {
        if(statement == this)
            return true

        let statementFound: boolean = false
    
        for(let i = 0; i < this.ifOperations.length; i++) {
            statementFound = this.ifOperations[i].findStatement(statement)
            if(statementFound)
                return true
        }

        return false
    }

    cloneStatement(statementCount: number): ReturnClone {
        let ifStatement: IfStatement = new IfStatement(this.level, statementCount++, undefined)
        let ifOperations: any[] = []
        let returnClone: ReturnClone | undefined = undefined

        for(let i = 0; i < this.ifOperations.length; i++) {
            returnClone = this.ifOperations[i].cloneStatement(statementCount++)
            if(returnClone.result == false)
                return returnClone

            ifOperations.push(returnClone.statement)
            ifStatement.updateIfOperations(ifOperations)
        }

        return new ReturnClone(ifStatement, true)
    }

    turnOffOption(): void {
        if(this.option != undefined)
            this.option.isSelectionActive = false

        if(this.ifOperations != undefined) {
            for(let i = 0; i < this.ifOperations.length; i++)
                this.ifOperations[i].turnOffOption()
        }
    }

    generateCSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        
        for(let i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generateCSourceCode())

        return sourceCodeContainer
    }

    generateCppSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        
        for(let i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generateCppSourceCode())

        return sourceCodeContainer
    }

    generateJavaSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        
        for(let i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generateJavaSourceCode())

        return sourceCodeContainer
    }

    generateCsSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        
        for(let i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generateCsSourceCode())

        return sourceCodeContainer
    }

    generatePythonSourceCode(): string[] {
        let sourceCodeContainer: string[] = []
        
        for(let i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generatePythonSourceCode())

        return sourceCodeContainer
    }

    generatePseudocode(): string[] {
        let sourceCodeContainer: string[] = []
        
        for(let i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generatePseudocode())

        return sourceCodeContainer
    }

    toJSON() {
        return {
            statement: 'ifstatement',
            level: this.level,
            statementId: this.statementId,
            ifOperations: this.ifOperations
        }
    }

    parseChild() {
        let newIfOperations: Statement[] = []
        let tempIf: Statement = undefined
        let object: any = undefined

        for(let i = 0; i < this.ifOperations.length; i++) {
            object = this.ifOperations[i]
            if(object.statement == 'if') {
                tempIf = Object.assign(new If(undefined, undefined, undefined), object);
                (tempIf as If).parseChild();
                (tempIf as If).parseAttributes();
            }
            else if(object.statement == 'elif') {
                tempIf = Object.assign(new Elif(undefined, undefined, undefined), object);
                (tempIf as Elif).parseChild();
                (tempIf as Elif).parseAttributes();
            }
            else if(object.statement == 'else') {
                tempIf = Object.assign(new Else(undefined, undefined, undefined), object);
                (tempIf as Else).parseChild();
            }

            newIfOperations.push(tempIf)
        }

        this.updateIfOperations(newIfOperations)
    }
}

export default IfStatement