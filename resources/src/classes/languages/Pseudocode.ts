import Statement from "../statement/Statement"
import Language from "./Language"

class Pseudocode extends Language{

    listStatement: Statement[] 
    sourceCode: string

    constructor(listStatement: Statement[]) {
        super(listStatement)
    }  

    generateSourceCode(): string {
        this.generateStartingTemplate()
        this.generateBody()
        this.generateFinishTemplate()

        return this.sourceCode
    }
    generateStartingTemplate() {
        this.sourceCode = ''
        this.sourceCode += 'BEGIN\n'
    }

    generateBody() {
        let temp: string[] = []

        for(let i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generatePseudocode()
            temp = temp.flat(Infinity)

            for(let j = 0; j < temp.length; j++) {
                this.sourceCode += this.getIndentation(1) + temp[j]
            }
        }
    }

    generateFinishTemplate() {
        this.sourceCode += 'END\n'
    }
}

export default Pseudocode