import ReturnClick from "../../../../utilities/ReturnClick"
import Canvas from "../../../canvas/Canvas"

export default class OptionSelection {

    optionName: string
    optionColor: string
    currentX: number
    coorX: number
    coorY: number
    width: number
    height: number
    parent: any

    constructor(optionName: string, optionColor: string, coorX: number, currentX: number, coorY: number, width: number, height: number, parent: any) {
        this.optionName = optionName
        this.optionColor = optionColor
        this.coorX = coorX
        this.currentX = currentX
        this.coorY = coorY
        this.width = width
        this.height = height
        this.parent = parent
    }

    draw(canvas: Canvas) {
        canvas.createSelection(this.coorX, this.coorY, this.optionName, this.optionColor)
    }

    clickOption(x: number, y: number): ReturnClick | undefined {
        if(x <= this.coorX + this.width && x >= this.coorX && y <= this.coorY + this.height && y >= this.coorY) {
            return new ReturnClick(this.parent, this.optionName)
        }
        return undefined
    }

    showSelection() {    
        // console.log('start clearing')
        // console.log(canvas)
        // this.canvas.clearSelection(this.currentX, this.coorY)
        // console.log('stop clearing')
        // this.draw(this.canvas, this.currentX, this.coorY)

        // this.currentX += 1;

        // if(coorX + this.width <  this.coorX + this.width) {
        // requestAnimationFrame(this.showSelection.bind(this))
        // (window as any).requestAnimationFrame(this.showSelection.bind(this))
        // }
    }
}