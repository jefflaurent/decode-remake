import ReturnClick from "../../../../utilities/ReturnClick"
import Canvas from "../../../canvas/Canvas"
import DeclareStatement from "../../DeclareStatement"
import ForStatement from "../../ForStatement"
import IfStatement from "../../IfStatement"
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

        let splitted: string[] = optionId.split('-')
        if(this.parent instanceof IfStatement || this.parent instanceof DeclareStatement || (this.parent instanceof ForStatement && splitted[splitted.length-1] == 'outer'))
            this.optionSelection = this.generateCompleteOptions()
        else
            this.optionSelection = this.generateOptions()
    }

    generateId(optionId: string): string {
        return 'opt-' + optionId
    }

    generateOptions() {
        let temp: OptionSelection[] = []

        temp.push(new OptionSelection(this.optionId, 'ADD', '#2948e3', this.coorX + 45, this.coorX, this.coorY, 40, 40, this.parent))
        temp.push(new OptionSelection(this.optionId, 'PST', '#e65010', this.coorX + 90, this.coorX, this.coorY, 40, 40, this.parent))
        
        return temp
    }

    generateCompleteOptions() {
        let temp: OptionSelection[] = []

        temp.push(new OptionSelection(this.optionId, 'ADD', '#2948e3', this.coorX + 45, this.coorX, this.coorY, 40, 40, this.parent))
        temp.push(new OptionSelection(this.optionId, 'PST', '#e65010', this.coorX + 90, this.coorX, this.coorY, 40, 40, this.parent))
        temp.push(new OptionSelection(this.optionId, 'MOV', '#186e2b', this.coorX + 135, this.coorX, this.coorY, 40, 40, this.parent))
        temp.push(new OptionSelection(this.optionId, 'CPY', '#4b1363', this.coorX + 180, this.coorX, this.coorY, 40, 40, this.parent))
        temp.push(new OptionSelection(this.optionId, 'DEL', '#ad0e0e', this.coorX + 225, this.coorX, this.coorY, 40, 40, this.parent))
        temp.push(new OptionSelection(this.optionId, 'EDT', '#e3e029', this.coorX + 270, this.coorX, this.coorY, 40, 40, this.parent))
        
        return temp
    }

    draw(canvas: Canvas): void {
        canvas.createOption(this.coorX, this.coorY)
    }

    clickOption(canvas: Canvas, x: number, y: number): ReturnClick | undefined {
        let temp: any = undefined
        
        if(x <= this.coorX + this.width && x >= this.coorX && y <= this.coorY + this.height && y >= this.coorY) {
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
        for(let i = 0; i < this.optionSelection.length; i++)
            this.optionSelection[i].draw(canvas)
    }
}

export default Option