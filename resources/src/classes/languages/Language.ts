import Statement from "../statement/Statement";

class Language {
    
    listStatement: Statement []
    sourceCode: string
    
    constructor(listStatement: Statement[]) {
        this.listStatement = listStatement
        this.sourceCode = ''
    }

    generateSourceCode(): string { return '' }
    generateStartingTemplate() {}
    generateBody() {}
    generateFinishTemplate() {}

    getIndentation(level: number): string {
        let indentation = ''
        let tab = '\t'
        
        for(let i = 0; i < level; i++) 
            indentation += tab
        
        return indentation
    }
}

export default Language