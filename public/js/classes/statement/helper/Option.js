
class Option {

    constructor(optionId, coorX, coorY, width, height) {
        this.optionId = this.generateId(optionId)
        this.coorX = coorX 
        this.coorY = coorY
        this.width = width
        this.height = height
    }

    generateId(optionId) {
        return 'opt-' + optionId
    }

    draw(canvas) {
        canvas.createOption(this.coorX, this.coorY, this.width, this.height)
    }

    clickOption(x, y) {
        if(x <= this.coorX + this.width && x >= this.coorX && y <= this.coorY + this.height && y >= this.coorY) {
            console.log(this.optionId)
        }
        else {
            console.log('out of bounds')
        }
    }
}

export default Option