import ReturnClick from "../../../../utilities/ReturnClick"
import ReturnClone from "../../../../utilities/ReturnClone"
import ReturnPaste from "../../../../utilities/ReturnPaste"
import Canvas from "../../../canvas/Canvas"
import Variable from "../../../variable/Variable"
import DeclareStatement from "../../DeclareStatement"
import ForStatement from "../../ForStatement"
import IfStatement from "../../IfStatement"
import InputStatement from "../../InputStatement"
import OutputStatement from "../../OutputStatement"
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
        if(!this.validateMainListStatement(mainListStatement, newStatement, targetStatement, isInner))
            return new ReturnPaste(false, mainListStatement)

        return this.paste(mainListStatement, newStatement, targetStatement, isInner)
    }

    handleDelete(mainListStatement: Statement[], clipboard: Statement): ReturnPaste {
        let parentStatement: Statement | undefined = clipboard.parent

        if(parentStatement == undefined) {
            if(clipboard instanceof DeclareStatement) {
                let clipboardIdx = mainListStatement.indexOf(clipboard)
                if(this.isVariableExist(mainListStatement, clipboard, clipboardIdx, false))
                    return new ReturnPaste(false, mainListStatement)
            }
            mainListStatement = this.removeSourceStatement(mainListStatement, clipboard)
        }
        else 
            parentStatement.updateChildStatement(this.removeSourceStatement(parentStatement.childStatement, clipboard))
        
        return new ReturnPaste(true, mainListStatement)
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

    validateMainListStatement(mainListStatement: Statement[] | undefined, clipboard: Statement, targetStatement: Statement | undefined, isInner: boolean): boolean {
        let returnPaste: ReturnPaste | undefined = undefined
        let result: boolean = true
        let parentStatement: Statement | undefined = undefined
        let pasteResult = []

        pasteResult = this.pasteTemp(mainListStatement, clipboard, targetStatement, isInner)
        returnPaste = pasteResult[0]
        parentStatement = pasteResult[1]
        mainListStatement = returnPaste.listStatement

        if(returnPaste.result) {
            mainListStatement = returnPaste.listStatement
            let variableFound: boolean = false
            
            if(mainListStatement != undefined) {
                for(let i = 0 ; i < mainListStatement.length; i++) {
                    if(mainListStatement[i] instanceof DeclareStatement) {
                        variableFound = this.isVariableExist(mainListStatement, mainListStatement[i] as DeclareStatement, i, true)
                        if(variableFound) {
                            result = false
                            break
                        }
                    }
                }
            }
        }

        if(parentStatement == undefined)
            this.removeSourceStatement(mainListStatement, clipboard)
        else 
            parentStatement.updateChildStatement(this.removeSourceStatement(parentStatement.childStatement, clipboard))
        
        return result
    }

    isVariableExist(mainListStatement: Statement[] | undefined, declareStatement: DeclareStatement, index: number, isBackward: boolean): boolean {
        let statement: Statement | undefined = undefined

        if(mainListStatement == undefined)
            return false
            
        if(isBackward) {
            for(let i = index; i >= 0; i--) {
                statement = mainListStatement[i].findVariable(declareStatement.variable)
    
                if(statement != undefined)
                    return true
            }
        }
        else {
            for(let i = index + 1; i < mainListStatement.length; i++) {
                statement = mainListStatement[i].findVariable(declareStatement.variable)
    
                if(statement != undefined)
                    return true
            }
        }

        return false
    }

    handlePaste(mainListStatement: Statement[], clipboard: Statement, targetStatement: Statement, isInner: boolean, lastSelectedOption: string): ReturnPaste {
        let returnClone: ReturnClone = clipboard.cloneStatement(Math.floor(Math.random() * 1000) + 10000)

        if(clipboard instanceof DeclareStatement) {
            if(!this.validateDeclarePlacement(targetStatement, isInner)) 
                return new ReturnPaste(false, mainListStatement)
        }
        
        // Statements must be added after declaration
        if(!this.validateMainListStatement(mainListStatement, returnClone.statement, targetStatement, isInner))
            return new ReturnPaste(false, mainListStatement)

        // Removing statement
        if(lastSelectedOption == 'MOV') {
            if(clipboard.parent == undefined)
                mainListStatement = this.removeSourceStatement(mainListStatement, clipboard)
            else 
                clipboard.parent.updateChildStatement(this.removeSourceStatement(clipboard.parent.childStatement, clipboard))
        }
    
        return this.paste(mainListStatement, clipboard, targetStatement, isInner)
    }

    pasteTemp(mainListStatement: Statement[], clipboard: Statement, targetStatement: Statement | undefined, isInner: boolean): [ReturnPaste, Statement | undefined] {
        let parentStatement: Statement | undefined = undefined 
        
        if(targetStatement == undefined || targetStatement.parent == undefined) {
            if(targetStatement == undefined || (targetStatement instanceof DeclareStatement || targetStatement instanceof IfStatement || targetStatement instanceof SwitchStatement
                || targetStatement instanceof OutputStatement || targetStatement instanceof InputStatement || (targetStatement instanceof ForStatement && !isInner) || (targetStatement instanceof WhileStatement && !isInner))) {
                mainListStatement = this.pasteStatement(mainListStatement, targetStatement, clipboard)
            }
            else if(targetStatement instanceof If || targetStatement instanceof Case || (targetStatement instanceof ForStatement && isInner) 
                || (targetStatement instanceof WhileStatement && isInner)) {
                parentStatement = targetStatement
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard))
            }
        }
        else {
            if(targetStatement instanceof DeclareStatement || targetStatement instanceof IfStatement ||  targetStatement instanceof SwitchStatement 
                || targetStatement instanceof OutputStatement || targetStatement instanceof InputStatement || (targetStatement instanceof ForStatement && !isInner) || (targetStatement instanceof WhileStatement && !isInner)) {
                parentStatement = targetStatement.parent
                targetStatement.parent.updateChildStatement(this.pasteStatement(targetStatement.parent.childStatement, targetStatement, clipboard)) 
            }
            else if(targetStatement instanceof If || targetStatement instanceof Case || (targetStatement instanceof ForStatement && isInner) 
                || (targetStatement instanceof WhileStatement && isInner)) {
                parentStatement = targetStatement
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard))
            }
        }

        return [new ReturnPaste(true, mainListStatement), parentStatement]
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
                || targetStatement instanceof OutputStatement || targetStatement instanceof InputStatement || (targetStatement instanceof ForStatement && !isInner) || (targetStatement instanceof WhileStatement && !isInner))) {
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
                || targetStatement instanceof OutputStatement || targetStatement instanceof InputStatement || (targetStatement instanceof ForStatement && !isInner) || (targetStatement instanceof WhileStatement && !isInner)) {
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

    pasteStatement(listTargetStatement: Statement[] | undefined, targetStatement: Statement | undefined, clipboard: Statement): Statement[] {
        let tempChildStatement: Statement[] = []

        if(listTargetStatement != undefined) 
            tempChildStatement = listTargetStatement
        
        if(targetStatement)
            tempChildStatement.splice(tempChildStatement.indexOf(targetStatement)+1, 0, clipboard)
        else 
            tempChildStatement.unshift(clipboard)
        
        return tempChildStatement
    }

    purge(mainListStatement: Statement[] | undefined) {
        if(mainListStatement == undefined || mainListStatement.length == 0)
            return

        let statement: Statement = mainListStatement[0]
        while(mainListStatement.length != 0) {
            this.removeSourceStatement(mainListStatement, mainListStatement[0])
        }
    }
}