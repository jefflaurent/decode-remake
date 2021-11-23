import Statement from "./Statement.js"

class IfStatement extends Statement {

    constructor(level, statementId, ifOperations) {
        super()
        this.level = level
        this.statementId = this.generateId(statementId)
        this.ifOperations = ifOperations
        this.init()
    }

    generateId(number) {
        return 'if-statement-' + number
    }

    updateIfOperations(ifOperations) {
        this.ifOperations = ifOperations
        this.init()
    }

    init() {
        if(this.ifOperations != null)
            for(let i = 0; i < this.ifOperations.length; i++)
                this.ifOperations[i].parent = this
    }

    writeToCanvas(canvas) {
        for(let i = 0; i < this.ifOperations.length; i++) {
            if(i != this.ifOperations.length - 1)
                this.ifOperations[i].writeToCanvas(canvas, false)
            else 
                this.ifOperations[i].writeToCanvas(canvas, true)
        }
    }

    callClickEvent(x, y) {
        this.option.clickOption(x, y)
        if(this.ifOperations != null)
            for(let i = 0; i < this.ifOperations.length; i++)
                this.ifOperations[i].callClickEvent(x, y)
    }
}

export default IfStatement