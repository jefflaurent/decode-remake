import Canvas from "../../canvas/Canvas"

class Option {

    optionId: string
    coorX: number
    coorY: number
    width: number
    height: number
    parent: any

    constructor(optionId: string, coorX: number, coorY: number, width: number, height: number) {
        this.optionId = this.generateId(optionId)
        this.coorX = coorX
        this.coorY = coorY
        this.width = width
        this.height = height
    }

    generateId(optionId: string): string {
        return 'opt-' + optionId
    }

    draw(canvas: Canvas): void {
        canvas.createOption(this.coorX, this.coorY)
    }

    clickOption(x: number, y: number): void {
        if(x <= this.coorX + this.width && x >= this.coorX && y <= this.coorY + this.height && y >= this.coorY) {
            console.log(this.optionId)
        }
    }

    createSelection() {

    }
}

export default Option