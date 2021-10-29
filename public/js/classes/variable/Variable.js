import Return from "../../utilities/Return"

class Variable {

    constructor(name, value) {
        this.name = name
        this.value = value
    }

    validateVariableName() {
        if(this.name.length == 0)
            return new Return(false, "Variable name cannot be empty!")
        else if(this.name.includes(' '))
            return new Return(false, "Variable name cannot contain space!")
        else if(this.name.charCodeAt(0) >= 48 && this.name.charCodeAt(0) <= 57)
            return new Return(false, "Variable name cannot start with numbers!")
    }

}

export default Variable