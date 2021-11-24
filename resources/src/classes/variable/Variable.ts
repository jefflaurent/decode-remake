import Return from "../../utilities/Return"

export default class Variable {

    name: string
    value: any

    constructor(name: string, value: number | string) {
        this.name = name
        this.value = value
    }

    validateName(): Return {
        if(this.name.length == 0)
            return new Return(false, "Variable name cannot be empty!")
        else if(this.name.includes(' '))
            return new Return(false, "Variable name cannot contain space!")
        else if(this.name.charCodeAt(0) >= 48 && this.name.charCodeAt(0) <= 57)
            return new Return(false, "Variable name cannot start with numbers!")
        else if(!(this.name.charCodeAt(0) >= 65 && this.name.charCodeAt(0) <= 90) && !(this.name.charCodeAt(0) >= 97 && this.name.charCodeAt(0) <= 122))
            return new Return(false, "Variable name cannot start with symbols!")
        else 
            return new Return(true, '')
    }

    validateValue() {}

}