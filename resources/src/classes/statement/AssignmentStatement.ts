import Variable from "../variable/Variable";
import Statement from "./Statement";

class AssignmentStatement extends Statement {

    firstVariable: Variable
    secondVariable: Variable
    isCustomValue: boolean

    constructor(level: number, firstVariable: Variable, secondVariable: Variable, isCustomValue: boolean) {
        super(level)
        this.firstVariable = firstVariable
        this.secondVariable = secondVariable
        this.isCustomValue = isCustomValue
    }

    generateBlockCodeText(): string {
        return this.isCustomValue ? this.firstVariable.name + ' = ' + this.secondVariable.value : 
            this.firstVariable.name + ' = ' + this.secondVariable.name 
    }
}

export default AssignmentStatement