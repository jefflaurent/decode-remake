import ReturnClone from "../../utilities/ReturnClone";
import Variable from "../variable/Variable";
import Statement from "./Statement";

class AssignmentStatement extends Statement {

    firstVariable: Variable
    secondVariable: Variable
    isCustomValue: boolean

    constructor(statementId: number, level: number, firstVariable: Variable, secondVariable: Variable, isCustomValue: boolean) {
        super(level)
        this.statementId = this.generateId(statementId)
        this.firstVariable = firstVariable
        this.secondVariable = secondVariable
        this.isCustomValue = isCustomValue
    }

    generateId(number: number): string {
        return 'assignment-statement-' + number
    }

    generateBlockCodeText(): string {
        return this.isCustomValue ? this.firstVariable.name + ' = ' + this.secondVariable.value : 
            this.firstVariable.name + ' = ' + this.secondVariable.name 
    }

    findVariable(variable: Variable): Statement | undefined {
        if(variable.name == this.firstVariable.name)
            return this
        if(!this.isCustomValue) {
            if(variable.name == this.secondVariable.name)
                return this
        }
        
        return undefined
    }

    cloneStatement(statementCount: number): ReturnClone {
        return new ReturnClone(new AssignmentStatement(statementCount, this.level, this.firstVariable, this.secondVariable, this.isCustomValue), false)
    }

    findStatement(statement: Statement): boolean {
        if(statement == this)
            return true
        return false
    }
}

export default AssignmentStatement