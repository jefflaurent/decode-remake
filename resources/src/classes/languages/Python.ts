import Statement from "../statement/Statement"

class Python {

    listStatement: Statement[] 
    sourceCode: string

    constructor(listStatement: Statement[]) {
        this.listStatement = listStatement
        this.sourceCode = ''
    }  

    generateSourceCode(): string {
        this.generateBody()

        return this.sourceCode
    }

    generateBody() {
        let temp: string[] = []

        for(let i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generatePythonSourceCode()
            temp = temp.flat(Infinity)

            for(let j = 0; j < temp.length; j++) {
                this.sourceCode += temp[j]
            }
        }
    }
}

export default Python