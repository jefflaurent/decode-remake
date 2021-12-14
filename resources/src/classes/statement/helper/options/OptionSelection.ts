import ReturnClick from "../../../../utilities/ReturnClick"
import ReturnPaste from "../../../../utilities/ReturnPaste"
import Canvas from "../../../canvas/Canvas"
import Variable from "../../../variable/Variable"
import DeclareStatement from "../../DeclareStatement"
import ForStatement from "../../ForStatement"
import IfStatement from "../../IfStatement"
import InputStatement from "../../InputStatement"
import Statement from "../../Statement"
import SwitchStatement from "../../SwitchStatement"
import WhileStatement from "../../WhileStatement"
import Case from "../case/Case"
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

    addStatement(mainListStatement: Statement[], newStatement: Statement, targetStatement: Statement | undefined, optionId: string) : ReturnPaste {
        let splitted: string[] = optionId.split('-')
        let isInner: boolean = splitted[splitted.length-1] == 'inner' ? true : false

        // Declare statement is only allowed on level 1
        if(newStatement instanceof DeclareStatement) {
            if(!this.validateDeclarePlacement(targetStatement, isInner)) 
                return new ReturnPaste(false, mainListStatement)
        }
        
        // Statements must be added after declaration
        if(!this.validateMainListPlacement(mainListStatement, newStatement, targetStatement, isInner))
            return new ReturnPaste(false, mainListStatement)
            
        return this.paste(mainListStatement, newStatement, targetStatement, isInner)
    }

    validateDeclarePlacement(targetStatement: Statement | undefined, isInner: boolean): boolean {
        if(targetStatement != undefined) {
            if(targetStatement instanceof DeclareStatement || targetStatement instanceof IfStatement || targetStatement instanceof SwitchStatement
                || (targetStatement instanceof ForStatement && !isInner) || (targetStatement instanceof WhileStatement && !isInner)) {
                if(targetStatement.level > 1) 
                    return false
            }
            else if(targetStatement instanceof If || targetStatement instanceof Case || (targetStatement instanceof ForStatement && isInner) 
                || (targetStatement instanceof WhileStatement && isInner)) {
                return false
            }
        }

        return true
    }

    validateMainListPlacement(mainListStatement: Statement[] | undefined, clipboard: Statement, targetStatement: Statement | undefined, isInner: boolean): boolean {
        let returnPaste: ReturnPaste | undefined = undefined
        let mainListStatementClone: Statement[] | undefined = []

        if(mainListStatement != undefined)
            for(let i = 0; i < mainListStatement.length; i++) 
                mainListStatementClone[i] = mainListStatement[i]
        
        returnPaste = this.paste(mainListStatementClone, clipboard, targetStatement, isInner)
        if(returnPaste.result) {
            mainListStatementClone = returnPaste.listStatement
            let variableFound: boolean = false
            
            if(mainListStatementClone != undefined) {
                for(let i = 0 ; i < mainListStatementClone.length; i++) {
                    if(mainListStatementClone[i] instanceof DeclareStatement) {
                        variableFound = this.isVariableExist(mainListStatementClone, mainListStatementClone[i] as DeclareStatement, i)
                        if(variableFound)
                            return false
                    }
                }
            }
        }

        return true
    }

    isVariableExist(mainListStatementClone: Statement[] | undefined, declareStatement: DeclareStatement, index: number): boolean {
        let statement: Statement | undefined = undefined

        if(mainListStatementClone == undefined)
            return false
            
        for(let i = index; i >= 0; i--) {
            statement = mainListStatementClone[i].findVariable(declareStatement.variable)

            if(statement != undefined)
                return true
        }

        return false
    }

    handlePaste(mainListStatement: Statement[], clipboard: Statement, targetStatement: Statement, isInner: boolean): ReturnPaste {
        // Statements must be added after declaration
        if(!this.validateMainListPlacement(mainListStatement, clipboard, targetStatement, isInner))
            return new ReturnPaste(false, mainListStatement)

        // Removing statement
        if(clipboard.parent == undefined) 
            mainListStatement = this.removeSourceStatement(mainListStatement, clipboard)
        else 
            clipboard.parent.updateChildStatement(this.removeSourceStatement(clipboard.parent.childStatement, clipboard))
    
        return this.paste(mainListStatement, clipboard, targetStatement, isInner)
    }

    paste(mainListStatement: Statement[], clipboard: Statement, targetStatement: Statement | undefined, isInner: boolean): ReturnPaste { 
        /** List of possibilities:
          * - Paste after statement
          * -> Applies to DeclareStatement, IfStatement, ForStatement, SwitchStatement, InputStatement
          * - Paste inside a statement
          * -> Applies to If, Elif, Else, ForStatement, Case
        **/

        // Target is located on level 1
        if(targetStatement == undefined || targetStatement.parent == undefined) {
            if(targetStatement == undefined || (targetStatement instanceof DeclareStatement || targetStatement instanceof IfStatement || targetStatement instanceof SwitchStatement
                || targetStatement instanceof InputStatement || (targetStatement instanceof ForStatement && !isInner) || (targetStatement instanceof WhileStatement && !isInner))) {
                mainListStatement = this.pasteStatement(mainListStatement, targetStatement, clipboard)
            }
            else if(targetStatement instanceof If || targetStatement instanceof Case || (targetStatement instanceof ForStatement && isInner) 
                || (targetStatement instanceof WhileStatement && isInner)) {
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard))
            }
        }
        // Target is a child of another statement
        else {
            if(targetStatement instanceof DeclareStatement || targetStatement instanceof IfStatement ||  targetStatement instanceof SwitchStatement 
                || targetStatement instanceof InputStatement || (targetStatement instanceof ForStatement && !isInner) || (targetStatement instanceof WhileStatement && !isInner)) {
                targetStatement.parent.updateChildStatement(this.pasteStatement(targetStatement.parent.childStatement, targetStatement, clipboard)) 
            }
            else if(targetStatement instanceof If || targetStatement instanceof Case || (targetStatement instanceof ForStatement && isInner) 
                || (targetStatement instanceof WhileStatement && isInner)) {
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard))
            }
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