import DeclareStatement from "../statement/DeclareStatement";
import InputStatement from "../statement/InputStatement";
import OutputStatement from "../statement/OutputStatement";
import Statement from "../statement/Statement";

class C {
    
    listStatement: Statement[] 
    sourceCode: string

    constructor(listStatement: Statement[]) {
        this.listStatement = listStatement
    }  

    generateSourceCode(): string {
        this.generateStartingTemplate()
        this.generateBody()
        this.generateFinishTemplate()

        return this.sourceCode
    }

    generateStartingTemplate() {
        this.sourceCode = ''
        this.sourceCode += '#include<stdio.h>\n'
        this.sourceCode += '#include<string.h>\n\n'
        this.sourceCode += 'int main()\n'
        this.sourceCode += '{\n'
    }

    generateBody() {
        let temp: string[] = []

        for(let i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generateCSourceCode()
            temp = temp.flat(Infinity)

            for(let j = 0; j < temp.length; j++) {
                this.sourceCode += this.getIndentation(1) + temp[j]
            }
        }
    }
    
    generateFinishTemplate() {
        this.sourceCode += '\n'
        this.sourceCode += '\treturn 0;\n'
        this.sourceCode += '}'
    }

    getIndentation(level: number): string {
        let indentation = ''
        let tab = '\t'
        
        for(let i = 0; i < level; i++) 
            indentation += tab
        
        return indentation
    }
}

export default C