import Statement from "../statement/Statement";
import Language from "./Language";

class Cs extends Language {
    
    listStatement: Statement []
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
        this.sourceCode += 'using System;\n\n'
        this.sourceCode += 'public class Decode\n'
        this.sourceCode += '{\n'
        this.sourceCode += '\tpublic Decode()\n'
        this.sourceCode += '\t{\n'
    }

    generateBody() {
        let temp: string[] = []

        for(let i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generateCsSourceCode()
            temp = temp.flat(Infinity)

            for(let j = 0; j < temp.length; j++) {
                this.sourceCode += this.getIndentation(2) + temp[j]
            }
        }

        if(this.listStatement.length == 0) {
            this.sourceCode += '\n'
        }
    }
    
    generateFinishTemplate() {
        this.sourceCode += '\t}\n\n'
        this.sourceCode += '\tpublic static void Main(string[] args)\n'
        this.sourceCode += '\t{\n'
        this.sourceCode += '\t\tnew Decode();\n'
        this.sourceCode += '\t}\n'
        this.sourceCode += '}'
    }
}

export default Cs