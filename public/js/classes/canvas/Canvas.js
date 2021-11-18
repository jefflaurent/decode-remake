import Coordinate from "../statement/helper/Coordinate.js"

class Canvas {
    
    constructor(canvas, ctx, LINE_HEIGHT, PADDING, SPACE) {
        this.canvas = canvas
        this.ctx = ctx
        this.LINE_HEIGHT = LINE_HEIGHT
        this.PADDING = PADDING
        this.SPACE = SPACE
        this.LAST_POSITION = PADDING
    }

    configureCanvas(LINE_HEIGHT, PADDING, SPACE) {
        this.LINE_HEIGHT = LINE_HEIGHT
        this.PADDING = PADDING
        this.SPACE = SPACE
    }

    clearCanvas() {
        this.LAST_POSITION = this.PADDING
        this.ctx.fillStyle = '#C4C4C4'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    writeText(level, text) {
        let coorX = this.PADDING * level
        let coorY = this.LAST_POSITION + this.SPACE
        let coor = this.createBackground('#00A9E2', text, coorX, coorY)

        this.ctx.font = '14px sans-serif'   
        this.ctx.fillStyle = '#FFFFFF'
        this.ctx.fillText(text, coorX + this.LINE_HEIGHT / 3, coorY + this.LINE_HEIGHT / 1.7)

        return coor
    }

    createBackground(color, text, coorX, coorY) {
        let width = this.ctx.measureText(text).width * 2
        this.ctx.beginPath()
        this.ctx.fillStyle = color
        this.ctx.fillRect(coorX, coorY, width, this.LINE_HEIGHT)
        this.LAST_POSITION += this.LINE_HEIGHT + this.SPACE

        return new Coordinate(coorX + width, this.LAST_POSITION)
    }

    createBridge(color, level, upper, lower) {
        this.ctx.beginPath()
        this.ctx.fillStyle = color
        this.ctx.fillRect(this.PADDING, upper, this.LINE_HEIGHT, lower - upper)
    }

    createOption(coorX, coorY) {
        this.ctx.beginPath()
        this.ctx.fillStyle = '#928A8A'
        this.ctx.fillRect(coorX, coorY, this.LINE_HEIGHT, this.LINE_HEIGHT)
        this.ctx.fillStyle = '#FFFFFF'
        this.ctx.fillText('>>', coorX + this.LINE_HEIGHT / 3, coorY + this.LINE_HEIGHT / 1.7)
    }
}

export default Canvas