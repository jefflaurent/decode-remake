import ReturnClick from "../../../../utilities/ReturnClick"
import Canvas from "../../../canvas/Canvas"
import DeclareStatement from "../../DeclareStatement"
import Statement from "../../Statement"
import OptionSelection from "./OptionSelection"

class Option {

    optionId: string
    coorX: number
    coorY: number
    width: number
    height: number
    parent: any
    isSelectionActive: boolean
    optionSelection: OptionSelection[]

    constructor(optionId: string, coorX: number, coorY: number, width: number, height: number, parent: any) {
        this.optionId = this.generateId(optionId)
        this.coorX = coorX
        this.coorY = coorY
        this.width = width
        this.height = height
        this.isSelectionActive = false
        this.parent = parent
        this.optionSelection = this.generateOptions()
    }

    generateId(optionId: string): string {
        return 'opt-' + optionId
    }

    generateOptions() {
        let temp: OptionSelection[] = []

        if(this.parent instanceof DeclareStatement) {
            temp.push(new OptionSelection('ADD', '#2948e3', this.coorX + 45, this.coorX, this.coorY, 40, 40, this.parent))
            temp.push(new OptionSelection('PST', '#e65010', this.coorX + 90, this.coorX, this.coorY, 40, 40, this.parent))
            temp.push(new OptionSelection('MOV', '#186e2b', this.coorX + 135, this.coorX, this.coorY, 40, 40, this.parent))
            temp.push(new OptionSelection('CPY', '#4b1363', this.coorX + 180, this.coorX, this.coorY, 40, 40, this.parent))
            temp.push(new OptionSelection('DEL', '#ad0e0e', this.coorX + 225, this.coorX, this.coorY, 40, 40, this.parent))
            temp.push(new OptionSelection('EDT', '#e3e029', this.coorX + 270, this.coorX, this.coorY, 40, 40, this.parent))
        }
        else {
            temp.push(new OptionSelection('ADD', '#2948e3', this.coorX + 45, this.coorX, this.coorY, 40, 40, this.parent))
            temp.push(new OptionSelection('PST', '#e65010', this.coorX + 90, this.coorX, this.coorY, 40, 40, this.parent))
        }
        
        return temp
    }

    draw(canvas: Canvas): void {
        canvas.createOption(this.coorX, this.coorY)
    }

    clickOption(canvas: Canvas, x: number, y: number): ReturnClick | undefined {
        let temp: any = undefined
        
        if(x <= this.coorX + this.width && x >= this.coorX && y <= this.coorY + this.height && y >= this.coorY) {
            temp = new ReturnClick(this.parent, 'ARR')
            if(!this.isSelectionActive) {
                this.showOptionSelections(canvas)
            }
            else {
                this.clearSelection(canvas, this.optionSelection.length + 1)
                this.findChildOptionClick(x, y)
            }
            this.isSelectionActive = !this.isSelectionActive
        }
        else if(this.isSelectionActive){
            temp = this.findChildOptionClick(x, y)
        }

        return temp
    }

    clearSelection(canvas: Canvas, length: number): void {
        canvas.clearOptions(this.coorX + canvas.LINE_HEIGHT, this.coorY, length)
    }

    findChildOptionClick(x: number, y: number): ReturnClick | undefined {
        let temp: any = undefined

        for(let i = 0; i < this.optionSelection.length; i++) {
            temp = this.optionSelection[i].clickOption(x, y)
            if(temp != undefined)
                break
        }

        return temp
    }

    showOptionSelections(canvas: Canvas): void {
        for(let i = 0; i < this.optionSelection.length; i++) {
            this.optionSelection[i].draw(canvas)
        }
    }
}

export default Option