import ReturnClick from "../../../../utilities/ReturnClick"
import ReturnPaste from "../../../../utilities/ReturnPaste"
import Canvas from "../../../canvas/Canvas"
import DeclareStatement from "../../DeclareStatement"
import ForStatement from "../../ForStatement"
import IfStatement from "../../IfStatement"
import Statement from "../../Statement"
import Elif from "../ifs/Elif"
import Else from "../ifs/Else"
import If from "../ifs/If"

export default class OptionSelection {

    optionId: string
    optionName: string
    optionColor: string
    currentX: number
    coorX: number
    coorY: number
    width: number
    height: number
    parent: any

    constructor(optionId: string, optionName: string, optionColor: string, coorX: number, currentX: number, coorY: number, width: number, height: number, parent: any) {
        this.optionId = optionId
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
        if(x <= this.coorX + this.width && x >= this.coorX && y <= this.coorY + this.height && y >= this.coorY) 
            return new ReturnClick(this.parent, this)
        return undefined
    }

    pasteMove(mainListStatement: Statement[], clipboard: Statement, targetStatement: Statement, isInner: boolean): ReturnPaste {
        // Removing statement
        if(clipboard.parent == undefined) 
            mainListStatement = this.removeSourceStatement(mainListStatement, clipboard)
        else 
            clipboard.parent.updateChildStatement(this.removeSourceStatement(clipboard.parent.childStatement, clipboard))
        
        /** List of possibilities:
          * - Paste after statement
          * -> Applies to DeclareStatement, IfStatement, ForStatement
          * - Paste inside a statement
          * -> Applies to If, Elif, Else, ForStatement
        **/

        // Target is located on level 1
        if(targetStatement.parent == undefined) {
            if(targetStatement instanceof DeclareStatement || targetStatement instanceof IfStatement || (targetStatement instanceof ForStatement && !isInner))
                mainListStatement = this.pasteStatement(mainListStatement, targetStatement, clipboard)
            else if(targetStatement instanceof If || (targetStatement instanceof ForStatement && isInner))
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard))
        }
        // Target is a child of another statement
        else {
            if(targetStatement instanceof DeclareStatement || targetStatement instanceof IfStatement || (targetStatement instanceof ForStatement && !isInner))
                targetStatement.parent.updateChildStatement(this.pasteStatement(targetStatement.parent.childStatement, targetStatement, clipboard)) 
            else if(targetStatement instanceof If || (targetStatement instanceof ForStatement && isInner))
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard))
        }

        return new ReturnPaste(true, mainListStatement)
    }

    removeSourceStatement(listSourceStatement: Statement[], clipboard: Statement): Statement[] {
        let sourceStatementIdx: number = -1

        sourceStatementIdx = listSourceStatement.indexOf(clipboard)
        if(sourceStatementIdx == -1)
            return listSourceStatement

        listSourceStatement.splice(sourceStatementIdx, 1)

        return listSourceStatement
    }

    pasteStatement(listTargetStatement: Statement[] | undefined, targetStatement: Statement | undefined, 
        clipboard: Statement): Statement[] {
        let tempChildStatement: Statement[] = []
        if(listTargetStatement != undefined)
            tempChildStatement = listTargetStatement

        if(targetStatement)
            tempChildStatement.splice(tempChildStatement.indexOf(targetStatement)+1, 0, clipboard)
        else 
            tempChildStatement.unshift(clipboard)
        
        return tempChildStatement
    }
}