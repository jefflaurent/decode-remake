import Coordinate from "../statement/helper/Coordinate"

class Canvas {
    
    canvas: any
    ctx: any
    LINE_HEIGHT: number
    PADDING: number
    SPACE: number
    LAST_POSITION: number

    constructor(canvas: any, ctx: any, LINE_HEIGHT: number, PADDING: number, SPACE: number) {
        this.canvas = canvas
        this.ctx = ctx
        this.LINE_HEIGHT = LINE_HEIGHT
        this.PADDING = PADDING
        this.SPACE = SPACE
        this.LAST_POSITION = PADDING
    }

    configureCanvas(LINE_HEIGHT: number, PADDING: number, SPACE: number): void {
        this.LINE_HEIGHT = LINE_HEIGHT
        this.PADDING = PADDING
        this.SPACE = SPACE
    }

    clearCanvas(): void {
        this.LAST_POSITION = this.PADDING
        this.ctx.fillStyle = '#C4C4C4'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    writeText(level: number, text: string): Coordinate {
        let coorX = this.PADDING + this.LINE_HEIGHT * (level-1) + this.SPACE * (level-1)
        let coorY = this.LAST_POSITION + this.SPACE
        let coor = this.createBackground('#00A9E2', text, coorX, coorY)

        this.ctx.font = '14px sans-serif'   
        this.ctx.fillStyle = '#FFFFFF'
        this.ctx.fillText(text, coorX + this.LINE_HEIGHT / 3, coorY + this.LINE_HEIGHT / 1.7)

        return coor
    }

    createBackground(color: string, text: string, coorX: number, coorY: number): Coordinate {
        let width = 0
        width = this.ctx.measureText(text).width * 1.5
        this.ctx.beginPath()
        this.ctx.fillStyle = color
        this.ctx.fillRect(coorX, coorY, width, this.LINE_HEIGHT)
        this.updateLastPosition()

        return new Coordinate(coorX + width, this.LAST_POSITION)
    }

    createBridge(color: string, level: number, upper: number, lower: number): void {
        this.ctx.beginPath()
        this.ctx.fillStyle = color
        this.ctx.fillRect(this.PADDING + this.SPACE * (level-1) + this.LINE_HEIGHT * (level-1), upper, this.LINE_HEIGHT, (lower - upper)) 
    }

    createOption(coorX: number, coorY: number): void {
        this.ctx.beginPath()
        this.ctx.fillStyle = '#928A8A'
        this.ctx.fillRect(coorX, coorY, this.LINE_HEIGHT, this.LINE_HEIGHT)
        this.ctx.fillStyle = '#FFFFFF'
        this.ctx.fillText('>>', coorX + this.LINE_HEIGHT / 3, coorY + this.LINE_HEIGHT / 1.7)
    }

    createSelection(coorX: number, coorY: number, text: string, color: string): void {
        this.ctx.beginPath()
        this.ctx.fillStyle = color
        this.ctx.fillRect(coorX, coorY, this.LINE_HEIGHT, this.LINE_HEIGHT)
        this.ctx.fillStyle = '#FFFFFF'
        this.ctx.fillText(text, coorX + this.LINE_HEIGHT / 6, coorY + this.LINE_HEIGHT / 1.7)
    }

    clearOptions(coorX: number, coorY: number, length: number) {
        this.ctx.beginPath()
        this.ctx.clearRect(coorX, coorY, length * this.LINE_HEIGHT + length * this.SPACE, this.LINE_HEIGHT)
    }

    clearSelection(coorX: number, coorY: number) {
        this.ctx.beginPath()
        this.ctx.clearRect(coorX, coorY, this.LINE_HEIGHT, this.LINE_HEIGHT)
    }

    updateLastPosition(): void {
        this.LAST_POSITION += this.LINE_HEIGHT + this.SPACE
    }
}

export default Canvas