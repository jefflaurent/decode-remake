import ReturnClick from "../../../../utilities/ReturnClick"
import ReturnPaste from "../../../../utilities/ReturnPaste"
import Canvas from "../../../canvas/Canvas"
import DeclareStatement from "../../DeclareStatement"
import IfStatement from "../../IfStatement"
import Statement from "../../Statement"
import Elif from "../Elif"
import Else from "../Else"
import If from "../If"

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
            return new ReturnClick(this.parent, this)
        }
        return undefined
    }

    handlePaste(destinationStatement: Statement, clipboard: Statement | undefined, 
        originStatement: Statement | undefined, listStatement: Statement[], lastSelectedOption: string): ReturnPaste {
        
        if(lastSelectedOption != 'MOV' && lastSelectedOption != 'CPY') {
            alert('Clipboard is empty!')
            return new ReturnPaste(false, listStatement)
        }

        let targetStatementIdx: number = -1
        let toBeMovedStatementIdx: number = -1

        if(lastSelectedOption == 'CPY' && clipboard instanceof DeclareStatement) {
            alert('Could not copy declare statement!')
            return new ReturnPaste(false, listStatement)
        }

        // Paste after statement
        if(destinationStatement instanceof DeclareStatement || destinationStatement instanceof IfStatement) {
            let parentStatement: Statement | undefined  = destinationStatement.level == 1 ? undefined : destinationStatement.parent

            // Statement is located on level 1
            if(parentStatement == undefined) {
                targetStatementIdx = listStatement.indexOf(destinationStatement)

                if(targetStatementIdx != -1) {
                    listStatement.splice(targetStatementIdx+1, 0, clipboard)

                    if(lastSelectedOption == 'MOV') {
                        if(originStatement != undefined) {
                            toBeMovedStatementIdx = originStatement.childStatement.indexOf(clipboard, 0)
                            originStatement.childStatement.splice(toBeMovedStatementIdx, 1)
                        }
                        else {
                            toBeMovedStatementIdx = listStatement.indexOf(clipboard, 0)
                            listStatement.splice(toBeMovedStatementIdx, 1)
                        }
                    }
                    return new ReturnPaste(true, listStatement)
                }
            }
            // Statement is a child of another statement
            else {
                if(parentStatement instanceof If || parentStatement instanceof Elif  || parentStatement instanceof Else) {
                    let targetChildStatementList: Statement[] | undefined  = parentStatement.childStatement
                    targetStatementIdx = targetChildStatementList.indexOf(destinationStatement, 0)

                    if(targetStatementIdx != -1) {
                        targetChildStatementList.splice(targetStatementIdx+1, 0, clipboard)

                        if(lastSelectedOption == 'MOV') {
                            if(originStatement != undefined) {
                                toBeMovedStatementIdx = originStatement.childStatement.indexOf(clipboard, 0)
                                originStatement.childStatement.splice(toBeMovedStatementIdx, 1)
                                originStatement.updateChildStatement(originStatement.childStatement)
                            }
                            else {
                                toBeMovedStatementIdx = listStatement.indexOf(clipboard, 0)
                                listStatement.splice(toBeMovedStatementIdx, 1)
                            }
                        }
                        parentStatement.updateChildStatement(targetChildStatementList)
                        parentStatement.updateChildLevel()
                        
                        return new ReturnPaste(true, listStatement)
                    }
                }
            }
        }
        // Paste inside statement
        else if(destinationStatement instanceof If || destinationStatement instanceof Elif || destinationStatement instanceof Else) {
            let childStatement: Statement[] | undefined = destinationStatement.childStatement
            console.log('masuk ke sini')

            if(childStatement == undefined) {
                let tempChildStatement: Statement[] = []
                tempChildStatement.push(clipboard)
                childStatement = tempChildStatement
            }
            else {
                childStatement.unshift(clipboard)
            }
            destinationStatement.updateChildStatement(childStatement)
            destinationStatement.updateChildLevel()
            
            if(lastSelectedOption == 'MOV') {
                if(originStatement != undefined) {
                    toBeMovedStatementIdx = originStatement.childStatement.indexOf(clipboard, 0)
                    originStatement.childStatement.splice(toBeMovedStatementIdx, 1)
                    originStatement.updateChildStatement(originStatement.childStatement)
                }
                else {
                    toBeMovedStatementIdx = listStatement.indexOf(clipboard, 0)
                    listStatement.splice(toBeMovedStatementIdx, 1)
                }
            }
            
            return new ReturnPaste(true, listStatement)
        }
    }
}