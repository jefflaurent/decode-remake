(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Coordinate_1 = __importDefault(require("../statement/helper/general/Coordinate"));
var Canvas = /** @class */ (function () {
    function Canvas(canvas, ctx, LINE_HEIGHT, PADDING, SPACE) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.LINE_HEIGHT = LINE_HEIGHT;
        this.PADDING = PADDING;
        this.SPACE = SPACE;
        this.LAST_POSITION = PADDING;
    }
    Canvas.prototype.configureCanvas = function (LINE_HEIGHT, PADDING, SPACE) {
        this.LINE_HEIGHT = LINE_HEIGHT;
        this.PADDING = PADDING;
        this.SPACE = SPACE;
    };
    Canvas.prototype.clearCanvas = function () {
        this.LAST_POSITION = this.PADDING;
        this.ctx.fillStyle = '#C4C4C4';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Canvas.prototype.writeText = function (level, text, color) {
        var coorX = this.PADDING + this.LINE_HEIGHT * (level - 1) + this.SPACE * (level - 1);
        var coorY = this.LAST_POSITION + this.SPACE;
        var coor = this.createBackground(color, text, coorX, coorY);
        this.ctx.font = '14px sans-serif';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText(text, coorX + this.LINE_HEIGHT / 3, coorY + this.LINE_HEIGHT / 1.7);
        return coor;
    };
    Canvas.prototype.writeClosingBlock = function (level, text, writtenText, color) {
        var coorX = this.PADDING + this.LINE_HEIGHT * (level - 1) + this.SPACE * (level - 1);
        var coorY = this.LAST_POSITION + this.SPACE;
        var coor = this.createBackground(color, text, coorX, coorY);
        this.ctx.font = '14px sans-serif';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText(writtenText, coorX + this.LINE_HEIGHT / 3, coorY + this.LINE_HEIGHT / 1.7);
        return coor;
    };
    Canvas.prototype.createBackground = function (color, text, coorX, coorY) {
        var width = 0;
        width = this.ctx.measureText(text).width * 1.5;
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(coorX, coorY, width, this.LINE_HEIGHT);
        this.updateLastPosition();
        return new Coordinate_1.default(coorX + width, this.LAST_POSITION);
    };
    Canvas.prototype.createBridge = function (color, level, upper, lower) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(this.PADDING + this.SPACE * (level - 1) + this.LINE_HEIGHT * (level - 1), upper, this.LINE_HEIGHT, (lower - upper));
    };
    Canvas.prototype.createOption = function (coorX, coorY) {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#928A8A';
        this.ctx.fillRect(coorX, coorY, this.LINE_HEIGHT, this.LINE_HEIGHT);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText('>>', coorX + this.LINE_HEIGHT / 3, coorY + this.LINE_HEIGHT / 1.7);
    };
    Canvas.prototype.createSelection = function (coorX, coorY, text, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(coorX, coorY, this.LINE_HEIGHT, this.LINE_HEIGHT);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText(text, coorX + this.LINE_HEIGHT / 6, coorY + this.LINE_HEIGHT / 1.7);
    };
    Canvas.prototype.clearOptions = function (coorX, coorY, length) {
        this.ctx.beginPath();
        this.ctx.clearRect(coorX, coorY, length * this.LINE_HEIGHT + length * this.SPACE, this.LINE_HEIGHT);
    };
    Canvas.prototype.clearSelection = function (coorX, coorY) {
        this.ctx.beginPath();
        this.ctx.clearRect(coorX, coorY, this.LINE_HEIGHT, this.LINE_HEIGHT);
    };
    Canvas.prototype.updateLastPosition = function () {
        this.LAST_POSITION += this.LINE_HEIGHT + this.SPACE;
    };
    return Canvas;
}());
exports.default = Canvas;

},{"../statement/helper/general/Coordinate":21}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Language_1 = __importDefault(require("./Language"));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C(listStatement) {
        return _super.call(this, listStatement) || this;
    }
    C.prototype.generateSourceCode = function () {
        this.generateStartingTemplate();
        this.generateBody();
        this.generateFinishTemplate();
        return this.sourceCode;
    };
    C.prototype.generateStartingTemplate = function () {
        this.sourceCode = '';
        this.sourceCode += '#include<stdio.h>\n';
        this.sourceCode += '#include<string.h>\n\n';
        this.sourceCode += 'int main()\n';
        this.sourceCode += '{\n';
    };
    C.prototype.generateBody = function () {
        var temp = [];
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generateCSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++) {
                this.sourceCode += this.getIndentation(1) + temp[j];
            }
        }
    };
    C.prototype.generateFinishTemplate = function () {
        this.sourceCode += '\n';
        this.sourceCode += '\treturn 0;\n';
        this.sourceCode += '}';
    };
    return C;
}(Language_1.default));
exports.default = C;

},{"./Language":6}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Language_1 = __importDefault(require("./Language"));
var Cpp = /** @class */ (function (_super) {
    __extends(Cpp, _super);
    function Cpp(listStatement) {
        return _super.call(this, listStatement) || this;
    }
    Cpp.prototype.generateSourceCode = function () {
        this.generateStartingTemplate();
        this.generateBody();
        this.generateFinishTemplate();
        return this.sourceCode;
    };
    Cpp.prototype.generateStartingTemplate = function () {
        this.sourceCode = '';
        this.sourceCode += '#include<iostream>\n';
        this.sourceCode += '#include<string.h>\n';
        this.sourceCode += 'using namespace std;\n\n';
        this.sourceCode += 'int main()\n';
        this.sourceCode += '{\n';
    };
    Cpp.prototype.generateBody = function () {
        var temp = [];
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generateCppSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++) {
                this.sourceCode += this.getIndentation(1) + temp[j];
            }
        }
    };
    Cpp.prototype.generateFinishTemplate = function () {
        this.sourceCode += '\n';
        this.sourceCode += '\treturn 0;\n';
        this.sourceCode += '}';
    };
    return Cpp;
}(Language_1.default));
exports.default = Cpp;

},{"./Language":6}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Language_1 = __importDefault(require("./Language"));
var Cs = /** @class */ (function (_super) {
    __extends(Cs, _super);
    function Cs(listStatement) {
        return _super.call(this, listStatement) || this;
    }
    Cs.prototype.generateSourceCode = function () {
        this.generateStartingTemplate();
        this.generateBody();
        this.generateFinishTemplate();
        return this.sourceCode;
    };
    Cs.prototype.generateStartingTemplate = function () {
        this.sourceCode = '';
        this.sourceCode += 'using System;\n\n';
        this.sourceCode += 'public class Decode\n';
        this.sourceCode += '{\n';
        this.sourceCode += '\tpublic Decode()\n';
        this.sourceCode += '\t{\n';
    };
    Cs.prototype.generateBody = function () {
        var temp = [];
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generateCsSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++) {
                this.sourceCode += this.getIndentation(2) + temp[j];
            }
        }
        if (this.listStatement.length == 0) {
            this.sourceCode += '\n';
        }
    };
    Cs.prototype.generateFinishTemplate = function () {
        this.sourceCode += '\t}\n\n';
        this.sourceCode += '\tpublic static void Main(string[] args)\n';
        this.sourceCode += '\t{\n';
        this.sourceCode += '\t\tnew Decode();\n';
        this.sourceCode += '\t}\n';
        this.sourceCode += '}';
    };
    return Cs;
}(Language_1.default));
exports.default = Cs;

},{"./Language":6}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Language_1 = __importDefault(require("./Language"));
var Java = /** @class */ (function (_super) {
    __extends(Java, _super);
    function Java(listStatement) {
        return _super.call(this, listStatement) || this;
    }
    Java.prototype.generateSourceCode = function () {
        this.generateStartingTemplate();
        this.generateBody();
        this.generateFinishTemplate();
        return this.sourceCode;
    };
    Java.prototype.generateStartingTemplate = function () {
        this.sourceCode = '';
        this.sourceCode += 'import java.util.Scanner;\n\n';
        this.sourceCode += 'public class Decode\n';
        this.sourceCode += '{\n';
        this.sourceCode += '\tScanner scan = new Scanner(System.in);\n\n';
        this.sourceCode += '\tpublic Decode()\n';
        this.sourceCode += '\t{\n';
    };
    Java.prototype.generateBody = function () {
        var temp = [];
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generateJavaSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++) {
                this.sourceCode += this.getIndentation(2) + temp[j];
            }
        }
        if (this.listStatement.length == 0) {
            this.sourceCode += '\n';
        }
    };
    Java.prototype.generateFinishTemplate = function () {
        this.sourceCode += '\t}\n\n';
        this.sourceCode += '\tpublic static void main(String[] args)\n';
        this.sourceCode += '\t{\n';
        this.sourceCode += '\t\tnew Decode();\n';
        this.sourceCode += '\t}\n';
        this.sourceCode += '}';
    };
    return Java;
}(Language_1.default));
exports.default = Java;

},{"./Language":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Language = /** @class */ (function () {
    function Language(listStatement) {
        this.listStatement = listStatement;
        this.sourceCode = '';
    }
    Language.prototype.generateSourceCode = function () { return ''; };
    Language.prototype.generateStartingTemplate = function () { };
    Language.prototype.generateBody = function () { };
    Language.prototype.generateFinishTemplate = function () { };
    Language.prototype.getIndentation = function (level) {
        var indentation = '';
        var tab = '\t';
        for (var i = 0; i < level; i++)
            indentation += tab;
        return indentation;
    };
    return Language;
}());
exports.default = Language;

},{}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Language_1 = __importDefault(require("./Language"));
var Pseudocode = /** @class */ (function (_super) {
    __extends(Pseudocode, _super);
    function Pseudocode(listStatement) {
        return _super.call(this, listStatement) || this;
    }
    Pseudocode.prototype.generateSourceCode = function () {
        this.generateStartingTemplate();
        this.generateBody();
        this.generateFinishTemplate();
        return this.sourceCode;
    };
    Pseudocode.prototype.generateStartingTemplate = function () {
        this.sourceCode = '';
        this.sourceCode += 'BEGIN\n';
    };
    Pseudocode.prototype.generateBody = function () {
        var temp = [];
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generatePseudocode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++) {
                this.sourceCode += this.getIndentation(1) + temp[j];
            }
        }
    };
    Pseudocode.prototype.generateFinishTemplate = function () {
        this.sourceCode += 'END\n';
    };
    return Pseudocode;
}(Language_1.default));
exports.default = Pseudocode;

},{"./Language":6}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Language_1 = __importDefault(require("./Language"));
var Python = /** @class */ (function (_super) {
    __extends(Python, _super);
    function Python(listStatement) {
        return _super.call(this, listStatement) || this;
    }
    Python.prototype.generateSourceCode = function () {
        this.generateBody();
        return this.sourceCode;
    };
    Python.prototype.generateBody = function () {
        var temp = [];
        for (var i = 0; i < this.listStatement.length; i++) {
            temp = this.listStatement[i].generatePythonSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++) {
                this.sourceCode += temp[j];
            }
        }
    };
    return Python;
}(Language_1.default));
exports.default = Python;

},{"./Language":6}],9:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../utilities/ReturnClone"));
var Char_1 = __importDefault(require("../variable/Char"));
var Double_1 = __importDefault(require("../variable/Double"));
var Float_1 = __importDefault(require("../variable/Float"));
var Integer_1 = __importDefault(require("../variable/Integer"));
var Long_1 = __importDefault(require("../variable/Long"));
var String_1 = __importDefault(require("../variable/String"));
var Variable_1 = __importDefault(require("../variable/Variable"));
var Arithmetic_1 = __importDefault(require("./helper/assignment/Arithmetic"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var Statement_1 = __importDefault(require("./Statement"));
var AssignmentStatement = /** @class */ (function (_super) {
    __extends(AssignmentStatement, _super);
    function AssignmentStatement(statementId, level, type, targetVariable, listArithmetic, listOperator, listIsCustom, variable, isCustomValue, start, length) {
        var _this = _super.call(this, level) || this;
        _this.variable = undefined;
        _this.listArithmetic = undefined;
        _this.listOperator = undefined;
        _this.listIsCustom = undefined;
        _this.isCustomValue = false;
        _this.start = undefined;
        _this.length = undefined;
        _this.type = type;
        _this.statementId = _this.generateId(statementId);
        _this.targetVariable = targetVariable;
        _this.variable = variable;
        _this.listArithmetic = listArithmetic;
        _this.listOperator = listOperator;
        _this.listIsCustom = listIsCustom;
        _this.isCustomValue = isCustomValue;
        _this.start = start;
        _this.length = length;
        _this.color = '#f4be0b';
        return _this;
    }
    AssignmentStatement.prototype.generateId = function (number) {
        return 'assignment-statement-' + number;
    };
    AssignmentStatement.prototype.writeToCanvas = function (canvas) {
        var text = 'SET ' + this.targetVariable.name + ' = ' + this.generateBlockCodeText();
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT);
    };
    AssignmentStatement.prototype.generateBlockCodeText = function () {
        var text = '';
        if (this.type == 'arithmetic')
            text = this.generateArithmeticText();
        else if (this.type == 'variable')
            text = this.generateVariableText();
        else if (this.type == 'length')
            text = this.generateLengthText();
        else
            text = this.generateSubText();
        return text;
    };
    AssignmentStatement.prototype.generateArithmeticText = function () {
        var text = '';
        var opIdx = 0;
        var customIdx = 0;
        for (var i = 0; i < this.listArithmetic.length; i++) {
            if (this.listArithmetic[i] instanceof Variable_1.default) {
                if (this.listIsCustom != undefined) {
                    if (this.listIsCustom[customIdx])
                        text += ' ' + this.listArithmetic[i].value + ' ';
                    else
                        text += ' ' + this.listArithmetic[i].name + ' ';
                    customIdx++;
                }
            }
            else {
                text += this.listArithmetic[i].generateBlockCodeText();
            }
            if (this.listOperator != undefined) {
                if (opIdx < this.listOperator.length) {
                    text += ' ' + this.listOperator[opIdx] + ' ';
                    opIdx++;
                }
            }
        }
        return text;
    };
    AssignmentStatement.prototype.generateVariableText = function () {
        if (this.isCustomValue) {
            if (this.variable instanceof Char_1.default)
                return "'" + this.variable.value + "'";
            else
                return this.variable.value;
        }
        else
            return this.variable.name;
    };
    AssignmentStatement.prototype.generateLengthText = function () {
        return 'LENGTH OF ' + this.variable.name;
    };
    AssignmentStatement.prototype.generateSubText = function () {
        return this.variable.name + ' FROM ' + this.start + ' WITH LENGTH ' + this.length;
    };
    AssignmentStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.parent = this;
        this.option.draw(canvas);
    };
    AssignmentStatement.prototype.callClickEvent = function (canvas, x, y) {
        return this.option.clickOption(canvas, x, y);
    };
    AssignmentStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        return false;
    };
    AssignmentStatement.prototype.findVariable = function (variable) {
        if (this.type == 'variable')
            return this.findTypeVariable(variable);
        else if (this.type == 'arithmetic')
            return this.findTypeArithmetic(variable);
        else
            return this.findTypeString(variable);
    };
    AssignmentStatement.prototype.findTypeVariable = function (variable) {
        if (this.targetVariable.name == variable.name)
            return this;
        if (!this.isCustomValue) {
            if (this.variable.name == variable.name)
                return this;
        }
        return undefined;
    };
    AssignmentStatement.prototype.findTypeArithmetic = function (variable) {
        if (this.targetVariable.name == variable.name)
            return this;
        var temp = false;
        if (this.listArithmetic != undefined) {
            for (var i = 0; i < this.listArithmetic.length; i++) {
                console.log(this.listArithmetic[i]);
                console.log(this.listIsCustom[i]);
                if (this.listArithmetic[i] instanceof Variable_1.default) {
                    if (this.listIsCustom[i] == false) {
                        if (this.listArithmetic[i].name == variable.name)
                            return this;
                    }
                }
                else {
                    temp = this.listArithmetic[i].findVariable(variable);
                }
                if (temp)
                    return this;
            }
        }
        return undefined;
    };
    AssignmentStatement.prototype.findTypeString = function (variable) {
        if (this.targetVariable.name == variable.name)
            return this;
        else if (this.variable.name == variable.name)
            return this;
        return undefined;
    };
    AssignmentStatement.prototype.cloneStatement = function (statementCount) {
        var newStatement = new AssignmentStatement(statementCount, this.level, this.type, this.targetVariable, this.listArithmetic, this.listOperator, this.listIsCustom, this.variable, this.isCustomValue, this.start, this.length);
        return new ReturnClone_1.default(newStatement, true);
    };
    AssignmentStatement.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var prefix = this.getIndentation() + this.targetVariable.name + ' = ';
        if (this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + ';\n');
        }
        else if (this.type == 'variable') {
            if (this.isCustomValue) {
                if (this.variable instanceof Char_1.default)
                    sourceCodeContainer.push(prefix + "'" + this.variable.value + "';\n");
                else
                    sourceCodeContainer.push(prefix + this.variable.value + ';\n');
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + ';\n');
        }
        else if (this.type == 'length') {
            sourceCodeContainer.push(prefix + 'strlen(' + this.variable.name + ');\n');
        }
        else {
            var start = void 0;
            if (this.start == 1)
                start = this.variable.name;
            else
                start = this.variable.name + '+' + (this.start - 1);
            sourceCodeContainer.push(this.getIndentation() + 'strncpy(' + this.targetVariable.name + ', ' + start + ', ' + this.length + ');\n');
            sourceCodeContainer.push(this.targetVariable.name + '[' + (this.start - 1 + this.length) + '] = ' + "'\\0'" + ';\n');
        }
        return sourceCodeContainer;
    };
    AssignmentStatement.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var prefix = this.getIndentation() + this.targetVariable.name + ' = ';
        if (this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + ';\n');
        }
        else if (this.type == 'variable') {
            if (this.isCustomValue) {
                if (this.variable instanceof Char_1.default)
                    sourceCodeContainer.push(prefix + "'" + this.variable.value + "';\n");
                else
                    sourceCodeContainer.push(prefix + this.variable.value + ';\n');
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + ';\n');
        }
        else if (this.type == 'length') {
            sourceCodeContainer.push(prefix + 'strlen(' + this.variable.name + ');\n');
        }
        else {
            var start = void 0;
            if (this.start == 1)
                start = this.variable.name;
            else
                start = this.variable.name + '+' + (this.start - 1);
            sourceCodeContainer.push(this.getIndentation() + 'strncpy(' + this.targetVariable.name + ', ' + start + ', ' + this.length + ');\n');
            sourceCodeContainer.push(this.targetVariable.name + '[' + (this.start - 1 + this.length) + '] = ' + "'\\0'" + ';\n');
        }
        return sourceCodeContainer;
    };
    AssignmentStatement.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var prefix = this.getIndentation() + this.targetVariable.name + ' = ';
        if (this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + ';\n');
        }
        else if (this.type == 'variable') {
            if (this.isCustomValue) {
                if (this.variable instanceof Char_1.default)
                    sourceCodeContainer.push(prefix + "'" + this.variable.value + "';\n");
                else
                    sourceCodeContainer.push(prefix + this.variable.value + ';\n');
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + ';\n');
        }
        else if (this.type == 'length') {
            sourceCodeContainer.push(prefix + this.variable.name + '.length();\n');
        }
        else {
            var start = this.start - 1;
            var end = start + this.length;
            sourceCodeContainer.push(prefix + this.variable.name + '.substring(' + start + ', ' + end + ');\n');
        }
        return sourceCodeContainer;
    };
    AssignmentStatement.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var prefix = this.getIndentation() + this.targetVariable.name + ' = ';
        if (this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + ';\n');
        }
        else if (this.type == 'variable') {
            if (this.isCustomValue) {
                if (this.variable instanceof Char_1.default)
                    sourceCodeContainer.push(prefix + "'" + this.variable.value + "';\n");
                else
                    sourceCodeContainer.push(prefix + this.variable.value + ';\n');
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + ';\n');
        }
        else if (this.type == 'length') {
            sourceCodeContainer.push(prefix + this.variable.name + '.Length;\n');
        }
        else {
            var start = this.start - 1;
            sourceCodeContainer.push(prefix + this.variable.name + '.Substring(' + start + ', ' + this.length + ');\n');
        }
        return sourceCodeContainer;
    };
    AssignmentStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var prefix = this.getIndentation() + this.targetVariable.name + ' = ';
        if (this.type == 'arithmetic') {
            sourceCodeContainer.push(prefix + this.generateArithmeticText() + '\n');
        }
        else if (this.type == 'variable') {
            if (this.isCustomValue) {
                if (this.variable instanceof Char_1.default || this.variable instanceof String_1.default)
                    sourceCodeContainer.push(prefix + "\"" + this.variable.value + "\"\n");
                else
                    sourceCodeContainer.push(prefix + this.variable.value + '\n');
            }
            else
                sourceCodeContainer.push(prefix + this.variable.name + '\n');
        }
        else if (this.type == 'length') {
            sourceCodeContainer.push(prefix + 'len(' + this.variable.name + ')\n');
        }
        else {
            var start = this.start - 1;
            var end = start + this.length;
            sourceCodeContainer.push(prefix + this.variable.name + '[' + start + ':' + end + ']\n');
        }
        return sourceCodeContainer;
    };
    AssignmentStatement.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var code = '' + this.getIndentation();
        code += 'SET ' + this.targetVariable.name + ' = ' + this.generateBlockCodeText() + '\n';
        sourceCodeContainer.push(code);
        return sourceCodeContainer;
    };
    AssignmentStatement.prototype.toJSON = function () {
        return {
            statement: 'assignment',
            statementId: this.statementId,
            level: this.level,
            type: this.type,
            targetVariable: this.targetVariable,
            listArithmetic: this.listArithmetic,
            listOperator: this.listOperator,
            listIsCustom: this.listIsCustom,
            variable: this.variable,
            isCustomValue: this.isCustomValue,
            start: this.start,
            length: this.length
        };
    };
    AssignmentStatement.prototype.parseAttributes = function () {
        var targetVariable;
        if (this.targetVariable.type == 'int')
            targetVariable = Object.assign(new Integer_1.default(undefined, undefined), this.targetVariable);
        else if (this.targetVariable.type == 'double')
            targetVariable = Object.assign(new Double_1.default(undefined, undefined), this.targetVariable);
        else if (this.targetVariable.type == 'long')
            targetVariable = Object.assign(new Long_1.default(undefined, undefined), this.targetVariable);
        else if (this.targetVariable.type == 'float')
            targetVariable = Object.assign(new Float_1.default(undefined, undefined), this.targetVariable);
        else if (this.targetVariable.type == 'char')
            targetVariable = Object.assign(new Char_1.default(undefined, undefined), this.targetVariable);
        else
            targetVariable = Object.assign(new String_1.default(undefined, undefined), this.targetVariable);
        this.targetVariable = targetVariable;
        if (this.variable != undefined) {
            var variable = void 0;
            if (this.variable.type == 'int')
                variable = Object.assign(new Integer_1.default(undefined, undefined), this.variable);
            else if (this.variable.type == 'double')
                variable = Object.assign(new Double_1.default(undefined, undefined), this.variable);
            else if (this.variable.type == 'long')
                variable = Object.assign(new Long_1.default(undefined, undefined), this.variable);
            else if (this.variable.type == 'float')
                variable = Object.assign(new Float_1.default(undefined, undefined), this.variable);
            else if (this.variable.type == 'char')
                variable = Object.assign(new Char_1.default(undefined, undefined), this.variable);
            else
                variable = Object.assign(new String_1.default(undefined, undefined), this.variable);
            this.variable = variable;
        }
        if (this.listArithmetic != undefined) {
            var tempListArithmetic = [];
            var temp = void 0;
            for (var i = 0; i < this.listArithmetic.length; i++) {
                temp = this.listArithmetic[i];
                if (temp.type == 'int')
                    temp = Object.assign(new Integer_1.default(undefined, undefined), temp);
                else if (temp.type == 'double')
                    temp = Object.assign(new Double_1.default(undefined, undefined), temp);
                else if (temp.type == 'long')
                    temp = Object.assign(new Long_1.default(undefined, undefined), temp);
                else if (temp.type == 'float')
                    temp = Object.assign(new Float_1.default(undefined, undefined), temp);
                else if (temp.type == 'char')
                    temp = Object.assign(new Char_1.default(undefined, undefined), temp);
                else if (temp.type == 'string')
                    temp = Object.assign(new String_1.default(undefined, undefined), temp);
                else {
                    temp = Object.assign(new Arithmetic_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined), temp);
                    temp.parseAttributes();
                }
                tempListArithmetic.push(temp);
            }
            this.listArithmetic = tempListArithmetic;
        }
    };
    return AssignmentStatement;
}(Statement_1.default));
exports.default = AssignmentStatement;

},{"../../utilities/ReturnClone":37,"../variable/Char":27,"../variable/Double":28,"../variable/Float":29,"../variable/Integer":30,"../variable/Long":31,"../variable/String":32,"../variable/Variable":33,"./Statement":15,"./helper/assignment/Arithmetic":18,"./helper/options/Option":25}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Char_1 = __importDefault(require("../variable/Char"));
var Double_1 = __importDefault(require("../variable/Double"));
var Float_1 = __importDefault(require("../variable/Float"));
var Integer_1 = __importDefault(require("../variable/Integer"));
var Long_1 = __importDefault(require("../variable/Long"));
var String_1 = __importDefault(require("../variable/String"));
var Statement_1 = __importDefault(require("./Statement"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var ReturnClone_1 = __importDefault(require("../../utilities/ReturnClone"));
var DeclareStatement = /** @class */ (function (_super) {
    __extends(DeclareStatement, _super);
    function DeclareStatement(statementId, level, variable) {
        var _this = _super.call(this, level) || this;
        _this.variable = variable;
        _this.statementId = _this.generateId(statementId);
        _this.color = '#f4be0b';
        return _this;
    }
    DeclareStatement.prototype.generateId = function (number) {
        if (this.variable instanceof Integer_1.default)
            return 'declare-integer-' + number;
        else if (this.variable instanceof Long_1.default)
            return 'declare-long-' + number;
        else if (this.variable instanceof Float_1.default)
            return 'declare-float-' + number;
        else if (this.variable instanceof Double_1.default)
            return 'declare-double-' + number;
        else if (this.variable instanceof Char_1.default)
            return 'declare-char-' + number;
        else
            return 'declare-string-' + number;
    };
    DeclareStatement.prototype.writeToCanvas = function (canvas) {
        var text = this.getDeclareStatementText(true);
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT);
    };
    DeclareStatement.prototype.getDeclareStatementText = function (isDeclare) {
        var text = '';
        if (isDeclare) {
            if (this.variable instanceof Integer_1.default)
                text = 'INTEGER ' + this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Long_1.default)
                text = 'LONG ' + this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Float_1.default)
                text = 'FLOAT ' + this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Double_1.default)
                text = 'DOUBLE ' + this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Char_1.default)
                text = 'CHAR ' + this.variable.name + ' = ' + "'" + this.variable.value + "'";
            else if (this.variable instanceof String_1.default)
                text = 'STRING ' + this.variable.name + ' = ' + "\"" + this.variable.value + "\"";
        }
        else {
            if (this.variable instanceof Integer_1.default)
                text = this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Long_1.default)
                text = this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Float_1.default)
                text = this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Double_1.default)
                text = this.variable.name + ' = ' + this.variable.value;
            else if (this.variable instanceof Char_1.default)
                text = this.variable.name + ' = ' + "'" + this.variable.value + "'";
            else if (this.variable instanceof String_1.default)
                text = this.variable.name + ' = ' + "\"" + this.variable.value + "\"";
        }
        return text;
    };
    DeclareStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.parent = this;
        this.option.draw(canvas);
    };
    DeclareStatement.prototype.callClickEvent = function (canvas, x, y) {
        return this.option.clickOption(canvas, x, y);
    };
    DeclareStatement.prototype.findVariable = function (variable) {
        return undefined;
    };
    DeclareStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        return false;
    };
    DeclareStatement.prototype.cloneStatement = function (statementCount) {
        return new ReturnClone_1.default(new DeclareStatement(statementCount, this.level, this.variable), true);
    };
    DeclareStatement.prototype.generateCSourceCode = function () {
        var sourceCode = '';
        sourceCode += this.getIndentation();
        if (this.variable instanceof Integer_1.default)
            sourceCode += 'int ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Long_1.default)
            sourceCode += 'long long int ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Float_1.default)
            sourceCode += 'float ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Double_1.default)
            sourceCode += 'double ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Char_1.default)
            sourceCode += 'char ' + this.variable.name + ' = ' + "'" + this.variable.value + "';";
        else if (this.variable instanceof String_1.default)
            sourceCode += 'char ' + this.variable.name + '[' + (this.variable.value.length + 1) + ']' + ' = ' + "\"" + this.variable.value + "\";";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    DeclareStatement.prototype.generateCppSourceCode = function () {
        var sourceCode = '';
        sourceCode += this.getIndentation();
        if (this.variable instanceof Integer_1.default)
            sourceCode += 'int ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Long_1.default)
            sourceCode += 'long long int ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Float_1.default)
            sourceCode += 'float ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Double_1.default)
            sourceCode += 'double ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Char_1.default)
            sourceCode += 'char ' + this.variable.name + ' = ' + "'" + this.variable.value + "';";
        else if (this.variable instanceof String_1.default)
            sourceCode += 'string ' + this.variable.name + ' = ' + "\"" + this.variable.value + "\";";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    DeclareStatement.prototype.generateJavaSourceCode = function () {
        var sourceCode = '';
        sourceCode += this.getIndentation();
        if (this.variable instanceof Integer_1.default)
            sourceCode += 'Integer ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Long_1.default)
            sourceCode += 'Long ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Float_1.default)
            sourceCode += 'Float ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Double_1.default)
            sourceCode += 'Double ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Char_1.default)
            sourceCode += 'Character ' + this.variable.name + ' = ' + "'" + this.variable.value + "';";
        else if (this.variable instanceof String_1.default)
            sourceCode += 'String ' + this.variable.name + ' = ' + "\"" + this.variable.value + "\";";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    DeclareStatement.prototype.generateCsSourceCode = function () {
        var sourceCode = '';
        sourceCode += this.getIndentation();
        if (this.variable instanceof Integer_1.default)
            sourceCode += 'int ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Long_1.default)
            sourceCode += 'long ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Float_1.default)
            sourceCode += 'float ' + this.variable.name + ' = ' + this.variable.value + 'f;';
        else if (this.variable instanceof Double_1.default)
            sourceCode += 'double ' + this.variable.name + ' = ' + this.variable.value + ';';
        else if (this.variable instanceof Char_1.default)
            sourceCode += 'char ' + this.variable.name + ' = ' + "'" + this.variable.value + "';";
        else if (this.variable instanceof String_1.default)
            sourceCode += 'string ' + this.variable.name + ' = ' + "\"" + this.variable.value + "\";";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    DeclareStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        if (this.variable instanceof String_1.default || this.variable instanceof Char_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + " = '" + this.variable.value + "'\n");
        else
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + " = " + this.variable.value + "\n");
        return sourceCodeContainer;
    };
    DeclareStatement.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        if (this.variable instanceof String_1.default || this.variable instanceof Char_1.default)
            sourceCodeContainer.push(this.getIndentation() + 'INITIALIZE ' + this.variable.name + " = '" + this.variable.value + "'\n");
        else
            sourceCodeContainer.push(this.getIndentation() + 'INITIALIZE ' + this.variable.name + " = " + this.variable.value + "\n");
        return sourceCodeContainer;
    };
    DeclareStatement.prototype.toJSON = function () {
        return {
            statement: 'declare',
            statementId: this.statementId,
            level: this.level,
            variable: this.variable
        };
    };
    DeclareStatement.prototype.parseAttributes = function () {
        var variable;
        if (this.variable.type == 'int')
            variable = Object.assign(new Integer_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'double')
            variable = Object.assign(new Double_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'long')
            variable = Object.assign(new Long_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'float')
            variable = Object.assign(new Float_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'char')
            variable = Object.assign(new Char_1.default(undefined, undefined), this.variable);
        else
            variable = Object.assign(new String_1.default(undefined, undefined), this.variable);
        this.variable = variable;
    };
    return DeclareStatement;
}(Statement_1.default));
exports.default = DeclareStatement;

},{"../../utilities/ReturnClone":37,"../variable/Char":27,"../variable/Double":28,"../variable/Float":29,"../variable/Integer":30,"../variable/Long":31,"../variable/String":32,"./Statement":15,"./helper/options/Option":25}],11:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../utilities/ReturnClone"));
var Double_1 = __importDefault(require("../variable/Double"));
var Float_1 = __importDefault(require("../variable/Float"));
var Integer_1 = __importDefault(require("../variable/Integer"));
var Long_1 = __importDefault(require("../variable/Long"));
var AssignmentStatement_1 = __importDefault(require("./AssignmentStatement"));
var DeclareStatement_1 = __importDefault(require("./DeclareStatement"));
var Condition_1 = __importDefault(require("./helper/general/Condition"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var IfStatement_1 = __importDefault(require("./IfStatement"));
var InputStatement_1 = __importDefault(require("./InputStatement"));
var OutputStatement_1 = __importDefault(require("./OutputStatement"));
var Statement_1 = __importDefault(require("./Statement"));
var SwitchStatement_1 = __importDefault(require("./SwitchStatement"));
var WhileStatement_1 = __importDefault(require("./WhileStatement"));
var ForStatement = /** @class */ (function (_super) {
    __extends(ForStatement, _super);
    function ForStatement(level, statementId, childStatement, variable, variableIsNew, isIncrement, addValueBy, condition) {
        var _this = _super.call(this, level) || this;
        _this.statementId = _this.generateId(statementId);
        _this.childStatement = childStatement;
        _this.variable = variable;
        _this.variableIsNew = variableIsNew;
        _this.isIncrement = isIncrement;
        _this.addValueBy = addValueBy;
        _this.condition = condition;
        _this.color = '#00A9E2';
        _this.option = [];
        return _this;
    }
    ForStatement.prototype.generateId = function (number) {
        return 'for-statement-' + number;
    };
    ForStatement.prototype.init = function () {
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this;
    };
    ForStatement.prototype.updateChildStatement = function (childStatement) {
        this.childStatement = childStatement;
        this.init();
    };
    ForStatement.prototype.writeToCanvas = function (canvas) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = 'FOR ( ';
        this.option = [];
        text += this.variable.name + ' = 0; ';
        text += this.condition.generateBlockCodeText() + '; ';
        if (this.isIncrement) {
            if (this.addValueBy == 1)
                text += this.variable.name + '++ )';
            else
                text += this.variable.name + ' += ' + this.addValueBy + ' )';
        }
        else {
            if (this.addValueBy == 1)
                text += this.variable.name + '-- )';
            else
                text += this.variable.name + ' -= ' + this.addValueBy + ' )';
        }
        // FOR ( ; ; )
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.option.push(new Option_1.default(this.statementId + '-outer', coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this));
        this.option[0].draw(canvas);
        // Create option button for IfStatement
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE);
        canvas.updateLastPosition();
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas);
        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION);
        canvas.writeClosingBlock(this.level, text, 'END FOR', this.color);
    };
    ForStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option.push(new Option_1.default(this.statementId + '-inner', coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this));
        this.option[1].draw(canvas);
    };
    ForStatement.prototype.callClickEvent = function (canvas, x, y) {
        var tempOption = undefined;
        var tempChild = undefined;
        for (var i = 0; i < this.option.length; i++) {
            tempOption = this.option[i].clickOption(canvas, x, y);
            if (tempOption != undefined)
                break;
        }
        if (tempOption == undefined)
            if (this.childStatement != undefined)
                for (var i = 0; i < this.childStatement.length; i++) {
                    tempChild = this.childStatement[i].callClickEvent(canvas, x, y);
                    if (tempChild != undefined)
                        break;
                }
        return tempOption ? tempOption : tempChild;
    };
    ForStatement.prototype.findVariable = function (variable) {
        if (!this.variableIsNew) {
            if (this.variable.name == variable.name)
                return this;
        }
        if (this.condition.findVariable(variable))
            return this;
        var temp = undefined;
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                temp = this.childStatement[i].findVariable(variable);
                if (temp != undefined)
                    return temp;
            }
        }
        return undefined;
    };
    ForStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        var statementFound = false;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                statementFound = this.childStatement[i].findStatement(statement);
                if (statementFound)
                    return true;
            }
        }
        return false;
    };
    ForStatement.prototype.cloneStatement = function (statementCount) {
        var forStatement = new ForStatement(this.level, statementCount++, undefined, this.variable, this.variableIsNew, this.isIncrement, this.addValueBy, this.condition.cloneCondition());
        var childStatement = [];
        var returnClone;
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++);
                if (returnClone.result == false)
                    return returnClone;
                childStatement.push(returnClone.statement);
            }
            forStatement.updateChildStatement(childStatement);
        }
        return new ReturnClone_1.default(forStatement, true);
    };
    ForStatement.prototype.turnOffOption = function () {
        if (this.option[0] != undefined)
            this.option[0].isSelectionActive = false;
        if (this.option[1] != undefined)
            this.option[1].isSelectionActive = false;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].turnOffOption();
        }
    };
    ForStatement.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        sourceCode += 'for(' + this.variable.name + ' = 0; ';
        sourceCode += this.condition.generateCSourceCode();
        sourceCode += '; ';
        if (this.isIncrement) {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '++)';
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ')';
        }
        else {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '--)';
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ')';
        }
        sourceCode += '\n';
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    ForStatement.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        sourceCode += 'for(' + this.variable.name + ' = 0; ';
        sourceCode += this.condition.generateCSourceCode();
        sourceCode += '; ';
        if (this.isIncrement) {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '++)';
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ')';
        }
        else {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '--)';
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ')';
        }
        sourceCode += '\n';
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCppSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    ForStatement.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        sourceCode += 'for(' + this.variable.name + ' = 0; ';
        sourceCode += this.condition.generateJavaSourceCode();
        sourceCode += '; ';
        if (this.isIncrement) {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '++)';
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ')';
        }
        else {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '--)';
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ')';
        }
        sourceCode += '\n';
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateJavaSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    ForStatement.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        sourceCode += 'for(' + this.variable.name + ' = 0; ';
        sourceCode += this.condition.generateCsSourceCode();
        sourceCode += '; ';
        if (this.isIncrement) {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '++)';
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ')';
        }
        else {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '--)';
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ')';
        }
        sourceCode += '\n';
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCsSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    ForStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        var condition = '';
        var updateValue = '';
        if (this.condition.isCustomValue)
            condition = this.condition.secondVariable.value;
        else
            condition = this.condition.secondVariable.name;
        if (this.isIncrement)
            updateValue = this.addValueBy + '';
        else
            updateValue = '-' + this.addValueBy;
        sourceCode += 'for ' + this.variable.name + ' in range(0, ' + condition + ', ' + updateValue + '):\n';
        sourceCodeContainer.push(sourceCode);
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0) {
                var tempPrint = '' + this.getIndentation() + '\t' + "print('')" + '\n';
                sourceCodeContainer.push(tempPrint);
            }
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePythonSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            var tempPrint = '' + this.getIndentation() + '\t' + "print('')" + '\n';
            sourceCodeContainer.push(tempPrint);
        }
        return sourceCodeContainer;
    };
    ForStatement.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        sourceCode += 'FOR ';
        sourceCode += this.variable.name + ' = 0; ';
        sourceCode += this.condition.generateBlockCodeText() + '; ';
        if (this.isIncrement) {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '++ ';
            else
                sourceCode += this.variable.name + ' += ' + this.addValueBy + ' ';
        }
        else {
            if (this.addValueBy == 1)
                sourceCode += this.variable.name + '-- ';
            else
                sourceCode += this.variable.name + ' -= ' + this.addValueBy + ' ';
        }
        sourceCode += '\n';
        sourceCodeContainer.push(sourceCode);
        sourceCode = '' + this.getIndentation() + 'BEGIN\n';
        sourceCodeContainer.push(sourceCode);
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePseudocode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + 'END\n');
        return sourceCodeContainer;
    };
    ForStatement.prototype.toJSON = function () {
        return {
            statement: 'for',
            statementId: this.statementId,
            level: this.level,
            childStatement: this.childStatement,
            variable: this.variable,
            variableIsNew: this.variableIsNew,
            isIncrement: this.isIncrement,
            addValueBy: this.addValueBy,
            condition: this.condition
        };
    };
    ForStatement.prototype.parseChild = function () {
        var newChildStatement = [];
        var tempChild = undefined;
        var object = undefined;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                object = this.childStatement[i];
                if (object.statement == 'declare') {
                    tempChild = Object.assign(new DeclareStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'input') {
                    tempChild = Object.assign(new InputStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'output') {
                    tempChild = Object.assign(new OutputStatement_1.default(undefined, undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'assignment') {
                    tempChild = Object.assign(new AssignmentStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'ifstatement') {
                    tempChild = Object.assign(new IfStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseChild();
                }
                else if (object.statement == 'for') {
                    tempChild = Object.assign(new ForStatement(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'while') {
                    tempChild = Object.assign(new WhileStatement_1.default(undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'switch') {
                    tempChild = Object.assign(new SwitchStatement_1.default(undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                newChildStatement.push(tempChild);
            }
            this.updateChildStatement(newChildStatement);
        }
    };
    ForStatement.prototype.parseAttributes = function () {
        var variable;
        var condition;
        if (this.variable.type == 'int')
            variable = Object.assign(new Integer_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'double')
            variable = Object.assign(new Double_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'long')
            variable = Object.assign(new Long_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'float')
            variable = Object.assign(new Float_1.default(undefined, undefined), this.variable);
        condition = Object.assign(new Condition_1.default(undefined, undefined, undefined, undefined), this.condition);
        condition.parseAttributes();
        this.variable = variable;
        this.condition = condition;
    };
    return ForStatement;
}(Statement_1.default));
exports.default = ForStatement;

},{"../../utilities/ReturnClone":37,"../variable/Double":28,"../variable/Float":29,"../variable/Integer":30,"../variable/Long":31,"./AssignmentStatement":9,"./DeclareStatement":10,"./IfStatement":12,"./InputStatement":13,"./OutputStatement":14,"./Statement":15,"./SwitchStatement":16,"./WhileStatement":17,"./helper/general/Condition":20,"./helper/options/Option":25}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../utilities/ReturnClone"));
var Elif_1 = __importDefault(require("./helper/ifs/Elif"));
var Else_1 = __importDefault(require("./helper/ifs/Else"));
var If_1 = __importDefault(require("./helper/ifs/If"));
var Statement_1 = __importDefault(require("./Statement"));
var IfStatement = /** @class */ (function (_super) {
    __extends(IfStatement, _super);
    function IfStatement(level, statementId, ifOperations) {
        var _this = _super.call(this, level) || this;
        _this.statementId = _this.generateId(statementId);
        _this.ifOperations = ifOperations;
        _this.init();
        return _this;
    }
    IfStatement.prototype.updateChildLevel = function () {
        if (this.ifOperations != undefined) {
            for (var i = 0; i < this.ifOperations.length; i++) {
                this.ifOperations[i].level = this.level;
                if (this.ifOperations[i] instanceof If_1.default)
                    this.ifOperations[i].updateChildLevel();
                else
                    this.ifOperations[i].updateChildLevel();
            }
        }
    };
    IfStatement.prototype.generateId = function (number) {
        return 'if-statement-' + number;
    };
    IfStatement.prototype.updateIfOperations = function (ifOperations) {
        this.ifOperations = ifOperations;
        this.init();
    };
    IfStatement.prototype.init = function () {
        if (this.ifOperations != undefined) {
            for (var i = 0; i < this.ifOperations.length; i++) {
                if (this.ifOperations[i] != undefined)
                    this.ifOperations[i].parent = this;
            }
        }
    };
    IfStatement.prototype.writeToCanvas = function (canvas) {
        if (this.ifOperations)
            for (var i = 0; i < this.ifOperations.length; i++) {
                if (i != this.ifOperations.length - 1)
                    this.ifOperations[i].writeToCanvas(canvas, false);
                else
                    this.ifOperations[i].writeToCanvas(canvas, true);
            }
    };
    IfStatement.prototype.callClickEvent = function (canvas, x, y) {
        var temp = this.option.clickOption(canvas, x, y);
        var tempChild = undefined;
        if (this.ifOperations != undefined)
            for (var i = 0; i < this.ifOperations.length; i++) {
                tempChild = this.ifOperations[i].callClickEvent(canvas, x, y);
                if (tempChild != undefined)
                    break;
            }
        return temp ? temp : tempChild;
    };
    IfStatement.prototype.findVariable = function (variable) {
        var temp = undefined;
        for (var i = 0; i < this.ifOperations.length; i++) {
            temp = this.ifOperations[i].findVariable(variable);
            if (temp != undefined)
                return temp;
        }
        return undefined;
    };
    IfStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        var statementFound = false;
        for (var i = 0; i < this.ifOperations.length; i++) {
            statementFound = this.ifOperations[i].findStatement(statement);
            if (statementFound)
                return true;
        }
        return false;
    };
    IfStatement.prototype.cloneStatement = function (statementCount) {
        var ifStatement = new IfStatement(this.level, statementCount++, undefined);
        var ifOperations = [];
        var returnClone = undefined;
        for (var i = 0; i < this.ifOperations.length; i++) {
            returnClone = this.ifOperations[i].cloneStatement(statementCount++);
            if (returnClone.result == false)
                return returnClone;
            ifOperations.push(returnClone.statement);
            ifStatement.updateIfOperations(ifOperations);
        }
        return new ReturnClone_1.default(ifStatement, true);
    };
    IfStatement.prototype.turnOffOption = function () {
        if (this.option != undefined)
            this.option.isSelectionActive = false;
        if (this.ifOperations != undefined) {
            for (var i = 0; i < this.ifOperations.length; i++)
                this.ifOperations[i].turnOffOption();
        }
    };
    IfStatement.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        for (var i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generateCSourceCode());
        return sourceCodeContainer;
    };
    IfStatement.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        for (var i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generateCppSourceCode());
        return sourceCodeContainer;
    };
    IfStatement.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        for (var i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generateJavaSourceCode());
        return sourceCodeContainer;
    };
    IfStatement.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        for (var i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generateCsSourceCode());
        return sourceCodeContainer;
    };
    IfStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        for (var i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generatePythonSourceCode());
        return sourceCodeContainer;
    };
    IfStatement.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        for (var i = 0; i < this.ifOperations.length; i++)
            sourceCodeContainer.push(this.ifOperations[i].generatePseudocode());
        return sourceCodeContainer;
    };
    IfStatement.prototype.toJSON = function () {
        return {
            statement: 'ifstatement',
            level: this.level,
            statementId: this.statementId,
            ifOperations: this.ifOperations
        };
    };
    IfStatement.prototype.parseChild = function () {
        var newIfOperations = [];
        var tempIf = undefined;
        var object = undefined;
        for (var i = 0; i < this.ifOperations.length; i++) {
            object = this.ifOperations[i];
            if (object.statement == 'if') {
                tempIf = Object.assign(new If_1.default(undefined, undefined, undefined), object);
                tempIf.parseChild();
                tempIf.parseAttributes();
            }
            else if (object.statement == 'elif') {
                tempIf = Object.assign(new Elif_1.default(undefined, undefined, undefined), object);
                tempIf.parseChild();
                tempIf.parseAttributes();
            }
            else if (object.statement == 'else') {
                tempIf = Object.assign(new Else_1.default(undefined, undefined, undefined), object);
                tempIf.parseChild();
            }
            newIfOperations.push(tempIf);
        }
        this.updateIfOperations(newIfOperations);
    };
    return IfStatement;
}(Statement_1.default));
exports.default = IfStatement;

},{"../../utilities/ReturnClone":37,"./Statement":15,"./helper/ifs/Elif":22,"./helper/ifs/Else":23,"./helper/ifs/If":24}],13:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../utilities/ReturnClone"));
var Char_1 = __importDefault(require("../variable/Char"));
var Double_1 = __importDefault(require("../variable/Double"));
var Float_1 = __importDefault(require("../variable/Float"));
var Integer_1 = __importDefault(require("../variable/Integer"));
var Long_1 = __importDefault(require("../variable/Long"));
var String_1 = __importDefault(require("../variable/String"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var Statement_1 = __importDefault(require("./Statement"));
var InputStatement = /** @class */ (function (_super) {
    __extends(InputStatement, _super);
    function InputStatement(statementId, level, variable) {
        var _this = _super.call(this, level) || this;
        _this.variable = variable;
        _this.statementId = _this.generateId(statementId);
        _this.color = '#f4be0b';
        return _this;
    }
    InputStatement.prototype.generateId = function (number) {
        if (this.variable instanceof Integer_1.default)
            return 'input-integer-' + number;
        else if (this.variable instanceof Long_1.default)
            return 'input-long-' + number;
        else if (this.variable instanceof Float_1.default)
            return 'input-float-' + number;
        else if (this.variable instanceof Double_1.default)
            return 'input-double-' + number;
        else if (this.variable instanceof Char_1.default)
            return 'input-char-' + number;
        else
            return 'input-string-' + number;
    };
    InputStatement.prototype.writeToCanvas = function (canvas) {
        var text = 'INPUT ' + this.variable.name;
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT);
    };
    InputStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.parent = this;
        this.option.draw(canvas);
    };
    InputStatement.prototype.callClickEvent = function (canvas, x, y) {
        return this.option.clickOption(canvas, x, y);
    };
    InputStatement.prototype.findVariable = function (variable) {
        if (this.variable.name == variable.name)
            return this;
        return undefined;
    };
    InputStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        return false;
    };
    InputStatement.prototype.cloneStatement = function (statementCount) {
        return new ReturnClone_1.default(new InputStatement(statementCount, this.level, this.variable), true);
    };
    InputStatement.prototype.generateCSourceCode = function () {
        var sourceCode = '' + this.getIndentation();
        if (this.variable instanceof Integer_1.default)
            sourceCode += "scanf(\"%d\", &" + this.variable.name + ');';
        else if (this.variable instanceof Long_1.default)
            sourceCode += "scanf(\"%lld\", &" + this.variable.name + ');';
        else if (this.variable instanceof Float_1.default)
            sourceCode += "scanf(\"%f\", &" + this.variable.name + ');';
        else if (this.variable instanceof Double_1.default)
            sourceCode += "scanf(\"%lf\", &" + this.variable.name + ');';
        else if (this.variable instanceof Char_1.default)
            sourceCode += "scanf(\"%c\", &" + this.variable.name + ');';
        else if (this.variable instanceof String_1.default)
            sourceCode += "scanf(\"%s\", " + this.variable.name + ');';
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    InputStatement.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        sourceCode += 'cin >> ' + this.variable.name + ';' + '\n';
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    InputStatement.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        if (this.variable instanceof Integer_1.default) {
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = scan.nextInt();\n');
            sourceCodeContainer.push(this.getIndentation() + 'scan.nextLine();\n');
        }
        else if (this.variable instanceof Long_1.default) {
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = scan.nextLong();\n');
            sourceCodeContainer.push(this.getIndentation() + 'scan.nextLine();\n');
        }
        else if (this.variable instanceof Float_1.default) {
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = scan.nextFloat();\n');
            sourceCodeContainer.push(this.getIndentation() + 'scan.nextLine();\n');
        }
        else if (this.variable instanceof Double_1.default) {
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = scan.nextDouble();\n');
            sourceCodeContainer.push(this.getIndentation() + 'scan.nextLine();\n');
        }
        else {
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = scan.nextLine();\n');
        }
        return sourceCodeContainer;
    };
    InputStatement.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        if (this.variable instanceof Integer_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = Convert.ToInt32(Console.ReadLine());\n');
        else if (this.variable instanceof Long_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = Convert.ToInt64(Console.ReadLine());\n');
        else if (this.variable instanceof Float_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = float.Parse(Console.ReadLine());\n');
        else if (this.variable instanceof Double_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = Convert.ToDouble(Console.ReadLine());\n');
        else if (this.variable instanceof Char_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = Convert.ToChar(Console.ReadLine());\n');
        else
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = Console.ReadLine();\n');
        return sourceCodeContainer;
    };
    InputStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        if (this.variable instanceof Integer_1.default || this.variable instanceof Long_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = int(input())\n');
        else if (this.variable instanceof Float_1.default || this.variable instanceof Double_1.default)
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = float(input())\n');
        else
            sourceCodeContainer.push(this.getIndentation() + this.variable.name + ' = input()\n');
        return sourceCodeContainer;
    };
    InputStatement.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        sourceCode += 'INPUT ' + this.variable.name + '\n';
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    InputStatement.prototype.toJSON = function () {
        return {
            statement: 'input',
            statementId: this.statementId,
            level: this.level,
            variable: this.variable
        };
    };
    InputStatement.prototype.parseAttributes = function () {
        var variable;
        if (this.variable.type == 'int')
            variable = Object.assign(new Integer_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'double')
            variable = Object.assign(new Double_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'long')
            variable = Object.assign(new Long_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'float')
            variable = Object.assign(new Float_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'char')
            variable = Object.assign(new Char_1.default(undefined, undefined), this.variable);
        else
            variable = Object.assign(new String_1.default(undefined, undefined), this.variable);
        this.variable = variable;
    };
    return InputStatement;
}(Statement_1.default));
exports.default = InputStatement;

},{"../../utilities/ReturnClone":37,"../variable/Char":27,"../variable/Double":28,"../variable/Float":29,"../variable/Integer":30,"../variable/Long":31,"../variable/String":32,"./Statement":15,"./helper/options/Option":25}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../utilities/ReturnClone"));
var Char_1 = __importDefault(require("../variable/Char"));
var Double_1 = __importDefault(require("../variable/Double"));
var Float_1 = __importDefault(require("../variable/Float"));
var Integer_1 = __importDefault(require("../variable/Integer"));
var Long_1 = __importDefault(require("../variable/Long"));
var String_1 = __importDefault(require("../variable/String"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var Statement_1 = __importDefault(require("./Statement"));
var OutputStatement = /** @class */ (function (_super) {
    __extends(OutputStatement, _super);
    function OutputStatement(statementId, level, isNewLine, type, variable, text, asciiCode, escapeSequence) {
        var _this = _super.call(this, level) || this;
        _this.variable = undefined;
        _this.text = undefined;
        _this.variable = variable;
        _this.statementId = _this.generateId(statementId);
        _this.isNewLine = isNewLine;
        _this.type = type;
        _this.text = text;
        _this.asciiCode = asciiCode;
        _this.escapeSequence = escapeSequence;
        _this.color = '#f4be0b';
        return _this;
    }
    OutputStatement.prototype.generateId = function (number) {
        return 'output-' + number;
    };
    OutputStatement.prototype.writeToCanvas = function (canvas) {
        var text = this.generateBlockCodeText();
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT);
    };
    OutputStatement.prototype.generateBlockCodeText = function () {
        var text = 'PRINT ';
        if (this.type == 'variable') {
            text += this.variable.name;
        }
        else if (this.type == 'text') {
            text += "\"" + this.text + "\"";
        }
        else if (this.type == 'ascii') {
            text += "ASCII CODE " + this.asciiCode;
        }
        else {
            text += "ESCAPE SEQUENCE " + "\"" + this.escapeSequence + "\"";
        }
        if (this.isNewLine == true)
            text += '\t[ENTER]';
        return text;
    };
    OutputStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.parent = this;
        this.option.draw(canvas);
    };
    OutputStatement.prototype.callClickEvent = function (canvas, x, y) {
        return this.option.clickOption(canvas, x, y);
    };
    OutputStatement.prototype.findVariable = function (variable) {
        if (this.variable) {
            if (this.variable.name == variable.name)
                return this;
        }
        return undefined;
    };
    OutputStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        return false;
    };
    OutputStatement.prototype.cloneStatement = function (statementCount) {
        if (this.type == 'variable')
            return new ReturnClone_1.default(new OutputStatement(statementCount, this.level, this.isNewLine, this.type, this.variable), true);
        else
            return new ReturnClone_1.default(new OutputStatement(statementCount, this.level, this.isNewLine, this.type, undefined, this.text), true);
    };
    OutputStatement.prototype.generateCSourceCode = function () {
        var sourceCode = '' + this.getIndentation();
        var newLine = this.isNewLine ? '\\n' : '';
        if (this.type == 'variable') {
            if (this.variable instanceof Integer_1.default)
                sourceCode += "printf(\"%d" + newLine + "\", " + this.variable.name + ');';
            else if (this.variable instanceof Long_1.default)
                sourceCode += "printf(\"%lld" + newLine + "\", " + this.variable.name + ');';
            else if (this.variable instanceof Float_1.default)
                sourceCode += "printf(\"%f" + newLine + "\", " + this.variable.name + ');';
            else if (this.variable instanceof Double_1.default)
                sourceCode += "printf(\"%lf" + newLine + "\", " + this.variable.name + ');';
            else if (this.variable instanceof Char_1.default)
                sourceCode += "printf(\"%c" + newLine + "\", " + this.variable.name + ');';
            else if (this.variable instanceof String_1.default)
                sourceCode += "printf(\"%s" + newLine + "\", " + this.variable.name + ');';
        }
        else if (this.type == 'text')
            sourceCode += "printf(\"" + this.text + newLine + "\");";
        else if (this.type == 'ascii')
            sourceCode += "printf(\"%c" + newLine + "\", " + this.asciiCode + ");";
        else
            sourceCode += "printf(\"" + this.escapeSequence + "\");";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    OutputStatement.prototype.generateCppSourceCode = function () {
        var sourceCode = '' + this.getIndentation();
        if (this.type == 'variable') {
            if (this.isNewLine)
                sourceCode += 'cout << ' + this.variable.name + " << \"\\n\";";
            else
                sourceCode += 'cout << ' + this.variable.name + ';';
        }
        else if (this.type == 'text') {
            if (this.isNewLine)
                sourceCode += "cout << \"" + this.text + "\" << \"\\n\";";
            else
                sourceCode += "cout << \"" + this.text + "\";";
        }
        else if (this.type == 'ascii')
            if (this.isNewLine)
                sourceCode += "cout << \"" + this.text + "\" << \"\\n\";";
            else
                sourceCode += "cout << \"" + this.text + "\";";
        else
            sourceCode += "cout << \"" + this.escapeSequence + "\";";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    OutputStatement.prototype.generateJavaSourceCode = function () {
        var sourceCode = '';
        sourceCode += this.getIndentation();
        var prefix = this.isNewLine ? 'System.out.println(' : 'System.out.print(';
        if (this.type == 'variable')
            sourceCode += prefix + this.variable.name + ');';
        else if (this.type == 'text')
            sourceCode += prefix + "\"" + this.text + "\");";
        else if (this.type == 'ascii') {
            if (this.isNewLine)
                sourceCode += "System.out.printf(\"%c\\n\", " + this.asciiCode + ');';
            else
                sourceCode += "System.out.printf(\"%c\", " + this.asciiCode + ');';
        }
        else
            sourceCode += "System.out.printf(\"" + this.escapeSequence + "\");";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    OutputStatement.prototype.generateCsSourceCode = function () {
        var sourceCode = '';
        sourceCode += this.getIndentation();
        var prefix = this.isNewLine ? 'Console.WriteLine(' : 'Console.Write(';
        if (this.type == 'variable')
            sourceCode += prefix + this.variable.name + ');';
        else if (this.type == 'text')
            sourceCode += prefix + "\"" + this.text + "\");";
        else if (this.type == 'ascii')
            sourceCode += prefix + '(char)' + this.asciiCode + '));';
        else
            sourceCode += prefix + "\"" + this.escapeSequence + "\");";
        sourceCode += '\n';
        var sourceCodeContainer = [];
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    OutputStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        if (this.type == 'variable') {
            if (this.isNewLine)
                sourceCode += 'print(' + this.variable.name + ')';
            else
                sourceCode += 'print(' + this.variable.name + ", end='')";
        }
        else if (this.type == 'text') {
            if (this.isNewLine)
                sourceCode += "print(\"" + this.text + "\")";
            else
                sourceCode += "print(\"" + this.text + "\", end='')";
        }
        else if (this.type == 'ascii') {
            if (this.isNewLine)
                sourceCode += "print(chr(" + this.asciiCode + "))";
            else
                sourceCode += "print(chr(" + this.asciiCode + "), end='')";
        }
        else
            sourceCode += "print(\"" + this.escapeSequence + "\")";
        sourceCode += '\n';
        sourceCodeContainer.push(sourceCode);
        return sourceCodeContainer;
    };
    OutputStatement.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var text = '' + this.getIndentation() + 'PRINT ';
        if (this.type == 'variable') {
            text += this.variable.name;
        }
        else if (this.type == 'text') {
            text += "\"" + this.text + "\"";
        }
        else if (this.type == 'ascii') {
            text += "ASCII CODE " + this.asciiCode;
        }
        else {
            text += "ESCAPE SEQUENCE " + "\"" + this.escapeSequence + "\"";
        }
        if (this.isNewLine == true)
            text += ' [ENTER]';
        text += '\n';
        sourceCodeContainer.push(text);
        return sourceCodeContainer;
    };
    OutputStatement.prototype.toJSON = function () {
        return {
            statement: 'output',
            statementId: this.statementId,
            level: this.level,
            isNewLine: this.isNewLine,
            type: this.type,
            variable: this.variable,
            text: this.text,
            asciiCode: this.asciiCode,
            escapeSequence: this.escapeSequence
        };
    };
    OutputStatement.prototype.parseAttributes = function () {
        var variable;
        if (this.variable == undefined)
            return;
        if (this.variable.type == 'int')
            variable = Object.assign(new Integer_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'double')
            variable = Object.assign(new Double_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'long')
            variable = Object.assign(new Long_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'float')
            variable = Object.assign(new Float_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'char')
            variable = Object.assign(new Char_1.default(undefined, undefined), this.variable);
        else
            variable = Object.assign(new String_1.default(undefined, undefined), this.variable);
        this.variable = variable;
    };
    return OutputStatement;
}(Statement_1.default));
exports.default = OutputStatement;

},{"../../utilities/ReturnClone":37,"../variable/Char":27,"../variable/Double":28,"../variable/Float":29,"../variable/Integer":30,"../variable/Long":31,"../variable/String":32,"./Statement":15,"./helper/options/Option":25}],15:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../utilities/ReturnClone"));
var Statement = /** @class */ (function () {
    function Statement(level) {
        this.statementId = '';
        this.level = level;
        this.childStatement = undefined;
        this.parent = undefined;
    }
    Statement.prototype.updateChildLevel = function () {
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                this.childStatement[i].level = this.level + 1;
                this.childStatement[i].updateChildLevel();
            }
        }
    };
    Statement.prototype.turnOffOption = function () {
        if (this.option != undefined)
            this.option.isSelectionActive = false;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].turnOffOption();
        }
    };
    Statement.prototype.moveToSurface = function () {
        this.level = 1;
        this.parent = undefined;
    };
    Statement.prototype.getParent = function () {
        return this.parent;
    };
    Statement.prototype.getIndentation = function () {
        var indentation = '';
        var tab = '\t';
        for (var i = 1; i < this.level; i++)
            indentation += tab;
        return indentation;
    };
    Statement.prototype.generateId = function (number) { };
    Statement.prototype.writeToCanvas = function (canvas, isClose) { };
    Statement.prototype.updateChildStatement = function (childStatement) { };
    Statement.prototype.callClickEvent = function (canvas, x, y) { };
    Statement.prototype.findVariable = function (variable) { return undefined; };
    Statement.prototype.cloneStatement = function (statementCount) { return new ReturnClone_1.default(this, false); };
    Statement.prototype.findStatement = function (statement) { return false; };
    Statement.prototype.generateCSourceCode = function () { return []; };
    Statement.prototype.generateCppSourceCode = function () { return []; };
    Statement.prototype.generateJavaSourceCode = function () { return []; };
    Statement.prototype.generatePythonSourceCode = function () { return []; };
    Statement.prototype.generateCsSourceCode = function () { return []; };
    Statement.prototype.generatePseudocode = function () { return []; };
    return Statement;
}());
exports.default = Statement;

},{"../../utilities/ReturnClone":37}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../utilities/ReturnClone"));
var Char_1 = __importDefault(require("../variable/Char"));
var Double_1 = __importDefault(require("../variable/Double"));
var Float_1 = __importDefault(require("../variable/Float"));
var Integer_1 = __importDefault(require("../variable/Integer"));
var Long_1 = __importDefault(require("../variable/Long"));
var String_1 = __importDefault(require("../variable/String"));
var Case_1 = __importDefault(require("./helper/case/Case"));
var Elif_1 = __importDefault(require("./helper/ifs/Elif"));
var Else_1 = __importDefault(require("./helper/ifs/Else"));
var If_1 = __importDefault(require("./helper/ifs/If"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var IfStatement_1 = __importDefault(require("./IfStatement"));
var Statement_1 = __importDefault(require("./Statement"));
var SwitchStatement = /** @class */ (function (_super) {
    __extends(SwitchStatement, _super);
    function SwitchStatement(level, statementId, variable, caseStatement) {
        var _this = _super.call(this, level) || this;
        _this.statementId = _this.generateId(statementId);
        _this.caseStatement = caseStatement;
        _this.variable = variable;
        _this.color = '#2bea15';
        _this.init();
        return _this;
    }
    SwitchStatement.prototype.updateCaseStatement = function (caseStatement) {
        this.caseStatement = caseStatement;
        this.init();
    };
    SwitchStatement.prototype.updateChildLevel = function () {
        if (this.caseStatement != undefined)
            for (var i = 0; i < this.caseStatement.length; i++) {
                this.caseStatement[i].level = this.level + 1;
                this.caseStatement[i].updateChildLevel();
            }
    };
    SwitchStatement.prototype.updateChildStatement = function (caseStatement) {
        this.caseStatement = caseStatement;
        this.init();
    };
    SwitchStatement.prototype.generateId = function (statementId) {
        return 'switch-statement-' + statementId;
    };
    SwitchStatement.prototype.init = function () {
        if (this.caseStatement != undefined)
            for (var i = 0; i < this.caseStatement.length; i++) {
                this.caseStatement[i].parent = this;
                this.caseStatement[i].level = this.level + 1;
            }
    };
    SwitchStatement.prototype.writeToCanvas = function (canvas) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = 'SWITCH ( ' + this.variable.name + ' )';
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.option = new Option_1.default(this.statementId, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.draw(canvas);
        for (var i = 0; i < this.caseStatement.length; i++)
            this.caseStatement[i].writeToCanvas(canvas);
        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION);
        canvas.writeClosingBlock(this.level, text, 'END SWITCH', this.color);
    };
    SwitchStatement.prototype.callClickEvent = function (canvas, x, y) {
        var temp = this.option.clickOption(canvas, x, y);
        var tempChild = undefined;
        if (this.caseStatement != undefined)
            for (var i = 0; i < this.caseStatement.length; i++) {
                tempChild = this.caseStatement[i].callClickEvent(canvas, x, y);
                if (tempChild != undefined)
                    break;
            }
        return temp ? temp : tempChild;
    };
    SwitchStatement.prototype.findVariable = function (variable) {
        var temp = undefined;
        if (this.variable.name == variable.name)
            return this;
        for (var i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].findVariable(variable);
            if (temp != undefined)
                return temp;
        }
        return undefined;
    };
    SwitchStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        var statementFound = false;
        for (var i = 0; i < this.caseStatement.length; i++) {
            statementFound = this.caseStatement[i].findStatement(statement);
            if (statementFound)
                return true;
        }
        return false;
    };
    SwitchStatement.prototype.cloneStatement = function (statementCount) {
        var switchStatement = new SwitchStatement(this.level, statementCount++, this.variable, undefined);
        var caseStatement = [];
        var returnClone;
        for (var i = 0; i < this.caseStatement.length; i++) {
            returnClone = this.caseStatement[i].cloneStatement(statementCount++);
            if (returnClone.result == false)
                return returnClone;
            caseStatement.push(returnClone.statement);
            switchStatement.updateChildStatement(caseStatement);
        }
        return new ReturnClone_1.default(switchStatement, true);
    };
    SwitchStatement.prototype.turnOffOption = function () {
        if (this.option != undefined)
            this.option.isSelectionActive = false;
        if (this.caseStatement != undefined) {
            for (var i = 0; i < this.caseStatement.length; i++)
                this.caseStatement[i].turnOffOption();
        }
    };
    SwitchStatement.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'switch(' + this.variable.name + ')\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        for (var i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generateCSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++)
                sourceCodeContainer.push(temp[j]);
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    SwitchStatement.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'switch(' + this.variable.name + ')\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        for (var i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generateCppSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++)
                sourceCodeContainer.push(temp[j]);
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    SwitchStatement.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'switch(' + this.variable.name + ')\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        for (var i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generateJavaSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++)
                sourceCodeContainer.push(temp[j]);
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    SwitchStatement.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'switch(' + this.variable.name + ')\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        for (var i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generateCsSourceCode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++)
                sourceCodeContainer.push(temp[j]);
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    SwitchStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var ifStatement = new IfStatement_1.default(this.level, 0, undefined);
        var ifOperations = [];
        var tempCondition = undefined;
        var tempChildStatement = undefined;
        var temp;
        for (var i = 0; i < this.caseStatement.length; i++) {
            tempCondition = this.caseStatement[i].condition;
            tempChildStatement = this.caseStatement[i].childStatement;
            if (i == 0)
                ifOperations.push(new If_1.default(this.level, 0, tempCondition, undefined, undefined, tempChildStatement));
            else {
                if (this.caseStatement[i].isDefault)
                    ifOperations.push(new Else_1.default(this.level, 0, tempChildStatement));
                else
                    ifOperations.push(new Elif_1.default(this.level, 0, tempCondition, undefined, undefined, tempChildStatement));
            }
        }
        ifStatement.updateIfOperations(ifOperations);
        temp = ifStatement.generatePythonSourceCode();
        temp = temp.flat(Infinity);
        for (var j = 0; j < temp.length; j++)
            sourceCodeContainer.push(temp[j]);
        return sourceCodeContainer;
    };
    SwitchStatement.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'SWITCH ' + this.variable.name + '\n');
        sourceCodeContainer.push(this.getIndentation() + 'BEGIN\n');
        for (var i = 0; i < this.caseStatement.length; i++) {
            temp = this.caseStatement[i].generatePseudocode();
            temp = temp.flat(Infinity);
            for (var j = 0; j < temp.length; j++)
                sourceCodeContainer.push(temp[j]);
        }
        sourceCodeContainer.push(this.getIndentation() + 'END\n');
        return sourceCodeContainer;
    };
    SwitchStatement.prototype.toJSON = function () {
        return {
            statement: 'switch',
            level: this.level,
            statementId: this.statementId,
            variable: this.variable,
            caseStatement: this.caseStatement
        };
    };
    SwitchStatement.prototype.parseChild = function () {
        var newCaseStatement = [];
        var tempCase = undefined;
        var object = undefined;
        for (var i = 0; i < this.caseStatement.length; i++) {
            object = this.caseStatement[i];
            tempCase = Object.assign(new Case_1.default(undefined, undefined, undefined, undefined, undefined), object);
            tempCase.parseChild();
            tempCase.parseAttributes();
            newCaseStatement.push(tempCase);
        }
        this.updateCaseStatement(newCaseStatement);
    };
    SwitchStatement.prototype.parseAttributes = function () {
        var variable;
        if (this.variable.type == 'int')
            variable = Object.assign(new Integer_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'double')
            variable = Object.assign(new Double_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'long')
            variable = Object.assign(new Long_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'float')
            variable = Object.assign(new Float_1.default(undefined, undefined), this.variable);
        else if (this.variable.type == 'char')
            variable = Object.assign(new Char_1.default(undefined, undefined), this.variable);
        else
            variable = Object.assign(new String_1.default(undefined, undefined), this.variable);
        this.variable = variable;
    };
    return SwitchStatement;
}(Statement_1.default));
exports.default = SwitchStatement;

},{"../../utilities/ReturnClone":37,"../variable/Char":27,"../variable/Double":28,"../variable/Float":29,"../variable/Integer":30,"../variable/Long":31,"../variable/String":32,"./IfStatement":12,"./Statement":15,"./helper/case/Case":19,"./helper/ifs/Elif":22,"./helper/ifs/Else":23,"./helper/ifs/If":24,"./helper/options/Option":25}],17:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../utilities/ReturnClone"));
var AssignmentStatement_1 = __importDefault(require("./AssignmentStatement"));
var DeclareStatement_1 = __importDefault(require("./DeclareStatement"));
var ForStatement_1 = __importDefault(require("./ForStatement"));
var Condition_1 = __importDefault(require("./helper/general/Condition"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var IfStatement_1 = __importDefault(require("./IfStatement"));
var InputStatement_1 = __importDefault(require("./InputStatement"));
var OutputStatement_1 = __importDefault(require("./OutputStatement"));
var Statement_1 = __importDefault(require("./Statement"));
var SwitchStatement_1 = __importDefault(require("./SwitchStatement"));
var WhileStatement = /** @class */ (function (_super) {
    __extends(WhileStatement, _super);
    function WhileStatement(level, statementId, isWhile, childStatement, firstCondition, logicalOperator, secondCondition) {
        var _this = _super.call(this, level) || this;
        _this.logicalOperator = undefined;
        _this.secondCondition = undefined;
        _this.isWhile = isWhile;
        _this.statementId = _this.generateId(statementId);
        _this.childStatement = childStatement;
        _this.firstCondition = firstCondition;
        _this.logicalOperator = logicalOperator;
        _this.secondCondition = secondCondition;
        _this.color = '#00A9E2';
        _this.option = [];
        _this.init();
        return _this;
    }
    WhileStatement.prototype.generateId = function (statementId) {
        return this.isWhile ? 'while-statement-' + statementId : 'do-while-statement-' + statementId;
    };
    WhileStatement.prototype.init = function () {
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this;
    };
    WhileStatement.prototype.updateChildStatement = function (childStatement) {
        this.childStatement = childStatement;
        this.init();
    };
    WhileStatement.prototype.writeToCanvas = function (canvas) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = '';
        var conditionText = this.generateConditionText();
        var coordinate;
        this.option = [];
        if (this.isWhile)
            text = conditionText;
        else
            text = 'DO\t\t\t\t';
        if (this.isWhile)
            coordinate = canvas.writeText(this.level, text, this.color);
        else
            coordinate = canvas.writeClosingBlock(this.level, conditionText, text, this.color);
        this.option.push(new Option_1.default(this.statementId + '-outer', coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this));
        this.option[0].draw(canvas);
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE);
        canvas.updateLastPosition();
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas);
        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION);
        if (this.isWhile)
            canvas.writeClosingBlock(this.level, text, 'END WHILE', this.color);
        else
            canvas.writeText(this.level, conditionText, this.color);
    };
    WhileStatement.prototype.createOption = function (canvas, coorX, coorY) {
        this.option.push(new Option_1.default(this.statementId + '-inner', coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this));
        this.option[1].draw(canvas);
    };
    WhileStatement.prototype.generateConditionText = function () {
        return this.secondCondition ? 'WHILE ( ' + this.firstCondition.generateBlockCodeText() + ' '
            + this.logicalOperator + ' ' + this.secondCondition.generateBlockCodeText() + ' )' :
            'WHILE ( ' + this.firstCondition.generateBlockCodeText() + ' )';
    };
    WhileStatement.prototype.callClickEvent = function (canvas, x, y) {
        var tempOption = undefined;
        var tempChild = undefined;
        for (var i = 0; i < this.option.length; i++) {
            tempOption = this.option[i].clickOption(canvas, x, y);
            if (tempOption != undefined)
                break;
        }
        if (tempOption == undefined)
            if (this.childStatement != undefined)
                for (var i = 0; i < this.childStatement.length; i++) {
                    tempChild = this.childStatement[i].callClickEvent(canvas, x, y);
                    if (tempChild != undefined)
                        break;
                }
        return tempOption ? tempOption : tempChild;
    };
    WhileStatement.prototype.findVariable = function (variable) {
        var temp = undefined;
        if (this.firstCondition.findVariable(variable))
            return this;
        if (this.secondCondition)
            if (this.secondCondition.findVariable(variable))
                return this;
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                temp = this.childStatement[i].findVariable(variable);
                if (temp != undefined)
                    return temp;
            }
        }
        return undefined;
    };
    WhileStatement.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        var statementFound = false;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                statementFound = this.childStatement[i].findStatement(statement);
                if (statementFound)
                    return true;
            }
        }
        return false;
    };
    WhileStatement.prototype.cloneStatement = function (statementCount) {
        var whileStatement;
        var returnClone;
        var childStatement = [];
        if (this.logicalOperator != undefined)
            whileStatement = new WhileStatement(this.level, statementCount++, this.isWhile, undefined, this.firstCondition.cloneCondition(), this.logicalOperator, this.secondCondition.cloneCondition());
        else
            whileStatement = new WhileStatement(this.level, statementCount++, this.isWhile, undefined, this.firstCondition.cloneCondition());
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++);
                if (returnClone.result == false)
                    return returnClone;
                childStatement.push(returnClone.statement);
            }
            whileStatement.updateChildStatement(childStatement);
        }
        return new ReturnClone_1.default(whileStatement, true);
    };
    WhileStatement.prototype.turnOffOption = function () {
        if (this.option[0] != undefined)
            this.option[0].isSelectionActive = false;
        if (this.option[1] != undefined)
            this.option[1].isSelectionActive = false;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].turnOffOption();
        }
    };
    WhileStatement.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCSourceCode() + ')\n');
        else
            sourceCodeContainer.push(this.getIndentation() + 'do\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        if (!this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCSourceCode() + ');\n');
        return sourceCodeContainer;
    };
    WhileStatement.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCSourceCode() + ')\n');
        else
            sourceCodeContainer.push(this.getIndentation() + 'do\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCppSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        if (!this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCSourceCode() + ');\n');
        return sourceCodeContainer;
    };
    WhileStatement.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateJavaSourceCode() + ')\n');
        else
            sourceCodeContainer.push(this.getIndentation() + 'do\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateJavaSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        if (!this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateJavaSourceCode() + ');\n');
        return sourceCodeContainer;
    };
    WhileStatement.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCsSourceCode() + ')\n');
        else
            sourceCodeContainer.push(this.getIndentation() + 'do\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCsSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        if (!this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'while(' + this.firstCondition.generateCsSourceCode() + ');\n');
        return sourceCodeContainer;
    };
    WhileStatement.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'while ' + this.firstCondition.generatePythonSourceCode() + ':\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0) {
                var tempPrint = '' + this.getIndentation() + '\t' + "print('')" + '\n';
                sourceCodeContainer.push(tempPrint);
            }
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePythonSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            var tempPrint = '' + this.getIndentation() + '\t' + "print('')" + '\n';
            sourceCodeContainer.push(tempPrint);
        }
        return sourceCodeContainer;
    };
    WhileStatement.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'WHILE ' + this.firstCondition.generateBlockCodeText() + ' \n');
        else
            sourceCodeContainer.push(this.getIndentation() + 'DO\n');
        sourceCodeContainer.push(this.getIndentation() + 'BEGIN\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePseudocode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + 'END\n');
        if (!this.isWhile)
            sourceCodeContainer.push(this.getIndentation() + 'WHILE ' + this.firstCondition.generateBlockCodeText() + ' \n');
        return sourceCodeContainer;
    };
    WhileStatement.prototype.toJSON = function () {
        return {
            statement: 'while',
            level: this.level,
            statementId: this.statementId,
            isWhile: this.isWhile,
            childStatement: this.childStatement,
            firstCondition: this.firstCondition,
            logicalOperator: this.logicalOperator,
            secondCondition: this.secondCondition
        };
    };
    WhileStatement.prototype.parseChild = function () {
        var newChildStatement = [];
        var tempChild = undefined;
        var object = undefined;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                object = this.childStatement[i];
                if (object.statement == 'declare') {
                    tempChild = Object.assign(new DeclareStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'input') {
                    tempChild = Object.assign(new InputStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'output') {
                    tempChild = Object.assign(new OutputStatement_1.default(undefined, undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'assignment') {
                    tempChild = Object.assign(new AssignmentStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'ifstatement') {
                    tempChild = Object.assign(new IfStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseChild();
                }
                else if (object.statement == 'for') {
                    tempChild = Object.assign(new ForStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'while') {
                    tempChild = Object.assign(new WhileStatement(undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'switch') {
                    tempChild = Object.assign(new SwitchStatement_1.default(undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                newChildStatement.push(tempChild);
            }
            this.updateChildStatement(newChildStatement);
        }
    };
    WhileStatement.prototype.parseAttributes = function () {
        var firstCondition = Object.assign(new Condition_1.default(undefined, undefined, undefined, undefined), this.firstCondition);
        firstCondition.parseAttributes();
        this.firstCondition = firstCondition;
        if (this.secondCondition != undefined) {
            var secondCondition = Object.assign(new Condition_1.default(undefined, undefined, undefined, undefined), this.secondCondition);
            secondCondition.parseAttributes();
            this.secondCondition = secondCondition;
        }
    };
    return WhileStatement;
}(Statement_1.default));
exports.default = WhileStatement;

},{"../../utilities/ReturnClone":37,"./AssignmentStatement":9,"./DeclareStatement":10,"./ForStatement":11,"./IfStatement":12,"./InputStatement":13,"./OutputStatement":14,"./Statement":15,"./SwitchStatement":16,"./helper/general/Condition":20,"./helper/options/Option":25}],18:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Char_1 = __importDefault(require("../../../variable/Char"));
var Double_1 = __importDefault(require("../../../variable/Double"));
var Float_1 = __importDefault(require("../../../variable/Float"));
var Integer_1 = __importDefault(require("../../../variable/Integer"));
var Long_1 = __importDefault(require("../../../variable/Long"));
var String_1 = __importDefault(require("../../../variable/String"));
var Arithmetic = /** @class */ (function () {
    function Arithmetic(firstVariable, secondVariable, firstChild, secondChild, operator, isFirstCustom, isSecondCustom) {
        this.firstChild = undefined;
        this.secondChild = undefined;
        this.firstVariable = undefined;
        this.secondVariable = undefined;
        this.firstVariable = firstVariable;
        this.secondVariable = secondVariable;
        this.firstChild = firstChild;
        this.secondChild = secondChild;
        this.operator = operator;
        this.isFirstCustom = isFirstCustom;
        this.isSecondCustom = isSecondCustom;
    }
    Arithmetic.prototype.generateBlockCodeText = function () {
        var text = '( ';
        if (this.firstVariable != undefined) {
            if (this.isFirstCustom)
                text += this.firstVariable.value + ' ';
            else
                text += this.firstVariable.name + ' ';
        }
        else
            text += this.firstChild.generateBlockCodeText() + ' ';
        text += this.operator + ' ';
        if (this.secondVariable != undefined) {
            if (this.isSecondCustom)
                text += this.secondVariable.value + ' ';
            else
                text += this.secondVariable.name + ' ';
        }
        else
            text += this.secondChild.generateBlockCodeText() + ' ';
        text += ' )';
        return text;
    };
    Arithmetic.prototype.findVariable = function (variable) {
        var temp = false;
        if (!this.isFirstCustom) {
            if (this.firstVariable.name == variable.name)
                return true;
        }
        if (!this.isSecondCustom) {
            if (this.secondVariable.name == variable.name)
                return true;
        }
        if (this.firstChild != undefined) {
            temp = this.firstChild.findVariable(variable);
            if (temp)
                return temp;
        }
        if (this.secondChild != undefined) {
            temp = this.secondChild.findVariable(variable);
            if (temp)
                return temp;
        }
        return false;
    };
    Arithmetic.prototype.toJSON = function () {
        return {
            statement: 'arithmetic',
            firstVariable: this.firstVariable,
            secondVariable: this.secondVariable,
            firstChild: this.firstChild,
            secondChild: this.secondChild,
            operator: this.operator,
            isFirstCustom: this.isFirstCustom,
            isSecondCustom: this.isSecondCustom
        };
    };
    Arithmetic.prototype.parseAttributes = function () {
        if (this.firstVariable != undefined) {
            var firstVariable = void 0;
            if (this.firstVariable.type == 'int')
                firstVariable = Object.assign(new Integer_1.default(undefined, undefined), this.firstVariable);
            else if (this.firstVariable.type == 'double')
                firstVariable = Object.assign(new Double_1.default(undefined, undefined), this.firstVariable);
            else if (this.firstVariable.type == 'long')
                firstVariable = Object.assign(new Long_1.default(undefined, undefined), this.firstVariable);
            else if (this.firstVariable.type == 'float')
                firstVariable = Object.assign(new Float_1.default(undefined, undefined), this.firstVariable);
            else if (this.firstVariable.type == 'char')
                firstVariable = Object.assign(new Char_1.default(undefined, undefined), this.firstVariable);
            else
                firstVariable = Object.assign(new String_1.default(undefined, undefined), this.firstVariable);
            this.firstVariable = firstVariable;
        }
        if (this.secondVariable != undefined) {
            var secondVariable = void 0;
            if (this.secondVariable.type == 'int')
                secondVariable = Object.assign(new Integer_1.default(undefined, undefined), this.secondVariable);
            else if (this.secondVariable.type == 'double')
                secondVariable = Object.assign(new Double_1.default(undefined, undefined), this.secondVariable);
            else if (this.secondVariable.type == 'long')
                secondVariable = Object.assign(new Long_1.default(undefined, undefined), this.secondVariable);
            else if (this.secondVariable.type == 'float')
                secondVariable = Object.assign(new Float_1.default(undefined, undefined), this.secondVariable);
            else if (this.secondVariable.type == 'char')
                secondVariable = Object.assign(new Char_1.default(undefined, undefined), this.secondVariable);
            else
                secondVariable = Object.assign(new String_1.default(undefined, undefined), this.secondVariable);
            this.secondVariable = secondVariable;
        }
        if (this.firstChild != undefined) {
            var firstChild = Object.assign(new Arithmetic(undefined, undefined, undefined, undefined, undefined, undefined, undefined), this.firstChild);
            firstChild.parseAttributes();
            this.firstChild = firstChild;
        }
        if (this.secondChild != undefined) {
            var secondChild = Object.assign(new Arithmetic(undefined, undefined, undefined, undefined, undefined, undefined, undefined), this.secondChild);
            secondChild.parseAttributes();
            this.secondChild = secondChild;
        }
    };
    return Arithmetic;
}());
exports.default = Arithmetic;

},{"../../../variable/Char":27,"../../../variable/Double":28,"../../../variable/Float":29,"../../../variable/Integer":30,"../../../variable/Long":31,"../../../variable/String":32}],19:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../../../utilities/ReturnClone"));
var Char_1 = __importDefault(require("../../../variable/Char"));
var AssignmentStatement_1 = __importDefault(require("../../AssignmentStatement"));
var DeclareStatement_1 = __importDefault(require("../../DeclareStatement"));
var ForStatement_1 = __importDefault(require("../../ForStatement"));
var IfStatement_1 = __importDefault(require("../../IfStatement"));
var InputStatement_1 = __importDefault(require("../../InputStatement"));
var OutputStatement_1 = __importDefault(require("../../OutputStatement"));
var Statement_1 = __importDefault(require("../../Statement"));
var SwitchStatement_1 = __importDefault(require("../../SwitchStatement"));
var WhileStatement_1 = __importDefault(require("../../WhileStatement"));
var Condition_1 = __importDefault(require("../general/Condition"));
var Option_1 = __importDefault(require("../options/Option"));
var Case = /** @class */ (function (_super) {
    __extends(Case, _super);
    function Case(level, statementId, condition, childStatement, isDefault) {
        var _this = _super.call(this, level) || this;
        _this.childStatement = childStatement;
        _this.condition = condition;
        _this.color = '#2bea15';
        _this.statementId = _this.generateId(statementId);
        _this.isDefault = isDefault;
        return _this;
    }
    Case.prototype.init = function () {
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this;
    };
    Case.prototype.generateId = function (statementId) {
        return 'case-statement-' + statementId;
    };
    Case.prototype.updateChildLevel = function () {
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++) {
                this.childStatement[i].level = this.level + 1;
                this.childStatement[i].updateChildLevel();
            }
    };
    Case.prototype.updateChildStatement = function (childStatement) {
        this.childStatement = childStatement;
        this.init();
    };
    Case.prototype.writeToCanvas = function (canvas) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = '';
        if (!this.isDefault) {
            if (this.condition.secondVariable instanceof Char_1.default)
                text = "CASE '" + this.condition.secondVariable.value + "':\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
            else
                text = 'CASE ' + this.condition.secondVariable.value + ':\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t';
        }
        else
            text = 'DEFAULT:' + '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t';
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE);
        canvas.updateLastPosition();
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas);
        }
        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION);
        canvas.writeClosingBlock(this.level, text, 'END CASE\t\t\t\t\t\t', this.color);
    };
    Case.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.draw(canvas);
    };
    Case.prototype.callClickEvent = function (canvas, x, y) {
        var temp = this.option.clickOption(canvas, x, y);
        var tempChild = undefined;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                tempChild = this.childStatement[i].callClickEvent(canvas, x, y);
                if (tempChild != undefined)
                    break;
            }
        }
        return temp ? temp : tempChild;
    };
    Case.prototype.findVariable = function (variable) {
        var temp = undefined;
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                temp = this.childStatement[i].findVariable(variable);
                if (temp != undefined)
                    return temp;
            }
        }
        return undefined;
    };
    Case.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        var statementFound = false;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                statementFound = this.childStatement[i].findStatement(statement);
                if (statementFound)
                    return true;
            }
        }
        return false;
    };
    Case.prototype.cloneStatement = function (statementCount) {
        var caseStatement;
        var returnClone;
        var childStatement = [];
        if (this.isDefault)
            caseStatement = new Case(this.level, statementCount++, undefined, undefined, true);
        else
            caseStatement = new Case(this.level, statementCount++, this.condition.cloneCondition(), undefined, this.isDefault);
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++);
                if (returnClone.result == false)
                    return returnClone;
                childStatement.push(returnClone.statement);
            }
        }
        caseStatement.updateChildStatement(childStatement);
        return new ReturnClone_1.default(caseStatement, true);
    };
    Case.prototype.turnOffOption = function () {
        if (this.option != undefined)
            this.option.isSelectionActive = false;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].turnOffOption();
        }
    };
    Case.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (!this.isDefault) {
            if (this.condition.secondVariable instanceof Char_1.default)
                sourceCodeContainer.push(this.getIndentation() + "case '" + this.condition.secondVariable.value + "':\n");
            else
                sourceCodeContainer.push(this.getIndentation() + "case " + this.condition.secondVariable.value + ":\n");
        }
        else
            sourceCodeContainer.push(this.getIndentation() + "default:\n");
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '\tbreak;\n');
        return sourceCodeContainer;
    };
    Case.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (!this.isDefault) {
            if (this.condition.secondVariable instanceof Char_1.default)
                sourceCodeContainer.push(this.getIndentation() + "case '" + this.condition.secondVariable.value + "':\n");
            else
                sourceCodeContainer.push(this.getIndentation() + "case " + this.condition.secondVariable.value + ":\n");
        }
        else
            sourceCodeContainer.push(this.getIndentation() + "default:\n");
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCppSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '\tbreak;\n');
        return sourceCodeContainer;
    };
    Case.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (!this.isDefault) {
            if (this.condition.secondVariable instanceof Char_1.default)
                sourceCodeContainer.push(this.getIndentation() + "case '" + this.condition.secondVariable.value + "':\n");
            else
                sourceCodeContainer.push(this.getIndentation() + "case " + this.condition.secondVariable.value + ":\n");
        }
        else
            sourceCodeContainer.push(this.getIndentation() + "default:\n");
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateJavaSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '\tbreak;\n');
        return sourceCodeContainer;
    };
    Case.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (!this.isDefault) {
            if (this.condition.secondVariable instanceof Char_1.default)
                sourceCodeContainer.push(this.getIndentation() + "case '" + this.condition.secondVariable.value + "':\n");
            else
                sourceCodeContainer.push(this.getIndentation() + "case " + this.condition.secondVariable.value + ":\n");
        }
        else
            sourceCodeContainer.push(this.getIndentation() + "default:\n");
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCsSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '\tbreak;\n');
        return sourceCodeContainer;
    };
    Case.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var temp;
        if (!this.isDefault) {
            if (this.condition.secondVariable instanceof Char_1.default)
                sourceCodeContainer.push(this.getIndentation() + "CASE '" + this.condition.secondVariable.value + "'\n");
            else
                sourceCodeContainer.push(this.getIndentation() + "CASE " + this.condition.secondVariable.value + "\n");
        }
        else
            sourceCodeContainer.push(this.getIndentation() + "DEFAULT\n");
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePseudocode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '\tBREAK\n');
        return sourceCodeContainer;
    };
    Case.prototype.toJSON = function () {
        return {
            statement: 'case',
            level: this.level,
            statementId: this.statementId,
            condition: this.condition,
            childStatement: this.childStatement,
            isDefault: this.isDefault
        };
    };
    Case.prototype.parseChild = function () {
        var newChildStatement = [];
        var tempChild = undefined;
        var object = undefined;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                object = this.childStatement[i];
                if (object.statement == 'declare') {
                    tempChild = Object.assign(new DeclareStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'input') {
                    tempChild = Object.assign(new InputStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'output') {
                    tempChild = Object.assign(new OutputStatement_1.default(undefined, undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'assignment') {
                    tempChild = Object.assign(new AssignmentStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'ifstatement') {
                    tempChild = Object.assign(new IfStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseChild();
                }
                else if (object.statement == 'for') {
                    tempChild = Object.assign(new ForStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'while') {
                    tempChild = Object.assign(new WhileStatement_1.default(undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'switch') {
                    tempChild = Object.assign(new SwitchStatement_1.default(undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                newChildStatement.push(tempChild);
            }
            this.updateChildStatement(newChildStatement);
        }
    };
    Case.prototype.parseAttributes = function () {
        var condition;
        condition = Object.assign(new Condition_1.default(undefined, undefined, undefined, undefined), this.condition);
        condition.parseAttributes();
        this.condition = condition;
    };
    return Case;
}(Statement_1.default));
exports.default = Case;

},{"../../../../utilities/ReturnClone":37,"../../../variable/Char":27,"../../AssignmentStatement":9,"../../DeclareStatement":10,"../../ForStatement":11,"../../IfStatement":12,"../../InputStatement":13,"../../OutputStatement":14,"../../Statement":15,"../../SwitchStatement":16,"../../WhileStatement":17,"../general/Condition":20,"../options/Option":25}],20:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Char_1 = __importDefault(require("../../../variable/Char"));
var Double_1 = __importDefault(require("../../../variable/Double"));
var Float_1 = __importDefault(require("../../../variable/Float"));
var Integer_1 = __importDefault(require("../../../variable/Integer"));
var Long_1 = __importDefault(require("../../../variable/Long"));
var String_1 = __importDefault(require("../../../variable/String"));
var Condition = /** @class */ (function () {
    function Condition(firstVariable, operator, secondVariable, isCustomValue) {
        this.firstVariable = firstVariable;
        this.operator = operator;
        this.secondVariable = secondVariable;
        this.isCustomValue = isCustomValue;
    }
    Condition.prototype.generateBlockCodeText = function () {
        if (this.isCustomValue) {
            if (this.secondVariable instanceof Char_1.default)
                return this.firstVariable.name + ' ' + this.operator + " '" + this.secondVariable.value + "'";
            else if (this.secondVariable instanceof String_1.default)
                return this.firstVariable.name + ' ' + this.operator + " \"" + this.secondVariable.value + "\"";
            else
                return this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value;
        }
        else
            return this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name;
    };
    Condition.prototype.findVariable = function (variable) {
        if (this.firstVariable.name == variable.name)
            return true;
        if (!this.isCustomValue) {
            if (this.secondVariable.name == variable.name)
                return true;
        }
        return false;
    };
    Condition.prototype.cloneCondition = function () {
        return new Condition(this.firstVariable, this.operator, this.secondVariable, this.isCustomValue);
    };
    Condition.prototype.generateCSourceCode = function () {
        var sourceCode = '';
        if (this.isCustomValue) {
            if (this.secondVariable instanceof Char_1.default)
                sourceCode = this.firstVariable.name + ' ' + this.operator + " '" + this.secondVariable.value + "'";
            else if (this.secondVariable instanceof String_1.default)
                sourceCode = 'strcmp(' + this.firstVariable.name + ", \"" + this.secondVariable.value + "\") " + this.operator + ' 0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value;
        }
        else {
            if (this.secondVariable instanceof String_1.default)
                sourceCode = 'strcmp(' + this.firstVariable.name + ", " + this.secondVariable.name + ") " + this.operator + ' 0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name;
        }
        return sourceCode;
    };
    Condition.prototype.generateJavaSourceCode = function () {
        var sourceCode = '';
        if (this.isCustomValue) {
            if (this.secondVariable instanceof Char_1.default)
                sourceCode = this.firstVariable.name + ' ' + this.operator + " '" + this.secondVariable.value + "'";
            else if (this.secondVariable instanceof String_1.default)
                sourceCode = this.firstVariable.name + ".compareTo(\"" + this.secondVariable.value + "\") " + this.operator + ' 0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value;
        }
        else {
            if (this.secondVariable instanceof String_1.default)
                sourceCode = this.firstVariable.name + ".compareTo(\"" + this.secondVariable.name + "\") " + this.operator + ' 0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name;
        }
        return sourceCode;
    };
    Condition.prototype.generateCsSourceCode = function () {
        var sourceCode = '';
        if (this.isCustomValue) {
            if (this.secondVariable instanceof Char_1.default)
                sourceCode = this.firstVariable.name + ' ' + this.operator + " '" + this.secondVariable.value + "'";
            else if (this.secondVariable instanceof String_1.default)
                sourceCode = this.firstVariable.name + ".Compare(\"" + this.secondVariable.value + "\") " + this.operator + ' 0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value;
        }
        else {
            if (this.secondVariable instanceof String_1.default)
                sourceCode = this.firstVariable.name + ".Compare(\"" + this.secondVariable.name + "\") " + this.operator + ' 0';
            else
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name;
        }
        return sourceCode;
    };
    Condition.prototype.generatePythonSourceCode = function () {
        var sourceCode = '';
        if (this.isCustomValue) {
            if (this.firstVariable instanceof Char_1.default || this.secondVariable instanceof Char_1.default) {
                if (this.firstVariable instanceof Char_1.default) {
                    if (this.secondVariable instanceof Integer_1.default || this.secondVariable instanceof Float_1.default
                        || this.secondVariable instanceof Long_1.default || this.secondVariable instanceof Double_1.default) {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + ' chr(' + this.secondVariable.value + ')';
                    }
                    else {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + " '" + this.secondVariable.value + "'";
                    }
                }
                else if (this.secondVariable instanceof Char_1.default) {
                    if (this.firstVariable instanceof Integer_1.default || this.firstVariable instanceof Float_1.default
                        || this.firstVariable instanceof Long_1.default || this.firstVariable instanceof Double_1.default) {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + " ord('" + this.secondVariable.value + "')";
                    }
                    else {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + " '" + this.secondVariable.value + "'";
                    }
                }
            }
            else {
                if (this.firstVariable instanceof String_1.default)
                    sourceCode = this.firstVariable.name + ' ' + this.operator + " \"" + this.secondVariable.value + "\"";
                else
                    sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value;
            }
        }
        else {
            if (this.firstVariable instanceof Char_1.default || this.secondVariable instanceof Char_1.default) {
                if (this.firstVariable instanceof Char_1.default) {
                    if (this.secondVariable instanceof Integer_1.default || this.secondVariable instanceof Float_1.default
                        || this.secondVariable instanceof Long_1.default || this.secondVariable instanceof Double_1.default) {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + ' chr(' + this.secondVariable.name + ')';
                    }
                    else {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + " " + this.secondVariable.name;
                    }
                }
                else if (this.secondVariable instanceof Char_1.default) {
                    if (this.firstVariable instanceof Integer_1.default || this.firstVariable instanceof Float_1.default
                        || this.firstVariable instanceof Long_1.default || this.firstVariable instanceof Double_1.default) {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + " ord(" + this.secondVariable.name + ")";
                    }
                    else {
                        sourceCode = this.firstVariable.name + ' ' + this.operator + " " + this.secondVariable.name;
                    }
                }
            }
            else {
                sourceCode = this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name;
            }
        }
        return sourceCode;
    };
    Condition.prototype.parseAttributes = function () {
        var firstVariable;
        var secondVariable;
        if (this.firstVariable.type == 'int')
            firstVariable = Object.assign(new Integer_1.default(undefined, undefined), this.firstVariable);
        else if (this.firstVariable.type == 'double')
            firstVariable = Object.assign(new Double_1.default(undefined, undefined), this.firstVariable);
        else if (this.firstVariable.type == 'long')
            firstVariable = Object.assign(new Long_1.default(undefined, undefined), this.firstVariable);
        else if (this.firstVariable.type == 'float')
            firstVariable = Object.assign(new Float_1.default(undefined, undefined), this.firstVariable);
        else if (this.firstVariable.type == 'char')
            firstVariable = Object.assign(new Char_1.default(undefined, undefined), this.firstVariable);
        else
            firstVariable = Object.assign(new String_1.default(undefined, undefined), this.firstVariable);
        if (this.secondVariable.type == 'int')
            secondVariable = Object.assign(new Integer_1.default(undefined, undefined), this.secondVariable);
        else if (this.secondVariable.type == 'double')
            secondVariable = Object.assign(new Double_1.default(undefined, undefined), this.secondVariable);
        else if (this.secondVariable.type == 'long')
            secondVariable = Object.assign(new Long_1.default(undefined, undefined), this.secondVariable);
        else if (this.secondVariable.type == 'float')
            secondVariable = Object.assign(new Float_1.default(undefined, undefined), this.secondVariable);
        else if (this.secondVariable.type == 'char')
            secondVariable = Object.assign(new Char_1.default(undefined, undefined), this.secondVariable);
        else
            secondVariable = Object.assign(new String_1.default(undefined, undefined), this.secondVariable);
        this.firstVariable = firstVariable;
        this.secondVariable = secondVariable;
    };
    return Condition;
}());
exports.default = Condition;

},{"../../../variable/Char":27,"../../../variable/Double":28,"../../../variable/Float":29,"../../../variable/Integer":30,"../../../variable/Long":31,"../../../variable/String":32}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Coordinate = /** @class */ (function () {
    function Coordinate(x, y) {
        this.x = x;
        this.y = y;
    }
    return Coordinate;
}());
exports.default = Coordinate;

},{}],22:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../../../utilities/ReturnClone"));
var If_1 = __importDefault(require("./If"));
var Elif = /** @class */ (function (_super) {
    __extends(Elif, _super);
    function Elif(level, statementId, firstCondition, logicalOperator, secondCondition, childStatement) {
        var _this = _super.call(this, level, statementId, firstCondition, logicalOperator, secondCondition, childStatement) || this;
        _this.statementId = _this.generateId(statementId);
        _this.init();
        _this.updateChildLevel();
        return _this;
    }
    Elif.prototype.generateId = function (number) {
        return 'elif-' + number;
    };
    Elif.prototype.writeToCanvas = function (canvas, isClose) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = 'ELSE IF';
        if (this.logicalOperator != undefined && this.secondCondition != undefined)
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' '
                + this.secondCondition.generateBlockCodeText() + ' )';
        else
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' )';
        // ELSE IF( condition )
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE);
        canvas.updateLastPosition();
        if (this.childStatement != null)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas);
        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION);
        if (isClose)
            canvas.writeClosingBlock(this.level, text, 'END IF', this.color);
    };
    Elif.prototype.cloneStatement = function (statementCount) {
        var ifStatement;
        var returnClone;
        var childStatement = [];
        if (this.logicalOperator != undefined) {
            ifStatement = new Elif(this.level, statementCount, this.firstCondition.cloneCondition(), this.logicalOperator, this.secondCondition.cloneCondition());
        }
        else
            ifStatement = new Elif(this.level, statementCount, this.firstCondition.cloneCondition());
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++);
                if (returnClone.result == false)
                    return returnClone;
                childStatement.push(returnClone.statement);
            }
            ifStatement.updateChildStatement(childStatement);
        }
        return new ReturnClone_1.default(ifStatement, true);
    };
    Elif.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? '&&' : '||';
            sourceCode += 'else if(' + this.firstCondition.generateCSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateCSourceCode() + ')\n';
        }
        else {
            sourceCode += 'else if(' + this.firstCondition.generateCSourceCode() + ')\n';
        }
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    Elif.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? '&&' : '||';
            sourceCode += 'else if(' + this.firstCondition.generateJavaSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateJavaSourceCode() + ')\n';
        }
        else {
            sourceCode += 'else if(' + this.firstCondition.generateJavaSourceCode() + ')\n';
        }
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateJavaSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    Elif.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? '&&' : '||';
            sourceCode += 'else if(' + this.firstCondition.generateCsSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateCsSourceCode() + ')\n';
        }
        else {
            sourceCode += 'else if(' + this.firstCondition.generateCsSourceCode() + ')\n';
        }
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCsSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    Elif.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? '&&' : '||';
            sourceCode += 'else if(' + this.firstCondition.generateCSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateCSourceCode() + ')\n';
        }
        else {
            sourceCode += 'else if(' + this.firstCondition.generateCSourceCode() + ')\n';
        }
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCppSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    Elif.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? 'and' : 'or';
            sourceCode += 'elif ' + this.firstCondition.generatePythonSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generatePythonSourceCode() + ':\n';
        }
        else {
            sourceCode += 'elif ' + this.firstCondition.generatePythonSourceCode() + ':\n';
        }
        sourceCodeContainer.push(sourceCode);
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0) {
                var tempPrint = '' + this.getIndentation() + '\t' + "print('')" + '\n';
                sourceCodeContainer.push(tempPrint);
            }
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePythonSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            var tempPrint = '' + this.getIndentation() + '\t' + "print('')" + '\n';
            sourceCodeContainer.push(tempPrint);
        }
        return sourceCodeContainer;
    };
    Elif.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            sourceCode += 'ELSE IF ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' '
                + this.secondCondition.generateBlockCodeText() + '\n';
        }
        else {
            sourceCode += 'ELSE IF ' + this.firstCondition.generateBlockCodeText() + '\n';
        }
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + 'BEGIN\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePseudocode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + 'END\n');
        return sourceCodeContainer;
    };
    Elif.prototype.toJSON = function () {
        return {
            statement: 'elif',
            level: this.level,
            statementId: this.statementId,
            firstCondition: this.firstCondition,
            logicalOperator: this.logicalOperator,
            secondCondition: this.secondCondition,
            childStatement: this.childStatement
        };
    };
    return Elif;
}(If_1.default));
exports.default = Elif;

},{"../../../../utilities/ReturnClone":37,"./If":24}],23:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../../../utilities/ReturnClone"));
var AssignmentStatement_1 = __importDefault(require("../../AssignmentStatement"));
var DeclareStatement_1 = __importDefault(require("../../DeclareStatement"));
var ForStatement_1 = __importDefault(require("../../ForStatement"));
var IfStatement_1 = __importDefault(require("../../IfStatement"));
var InputStatement_1 = __importDefault(require("../../InputStatement"));
var OutputStatement_1 = __importDefault(require("../../OutputStatement"));
var Statement_1 = __importDefault(require("../../Statement"));
var SwitchStatement_1 = __importDefault(require("../../SwitchStatement"));
var WhileStatement_1 = __importDefault(require("../../WhileStatement"));
var Option_1 = __importDefault(require("../options/Option"));
var Else = /** @class */ (function (_super) {
    __extends(Else, _super);
    function Else(level, statementId, childStatement) {
        var _this = _super.call(this, level) || this;
        _this.statementId = _this.generateId(statementId);
        _this.childStatement = childStatement;
        _this.color = '#2bea15';
        _this.option = undefined;
        _this.init();
        _this.updateChildLevel();
        return _this;
    }
    Else.prototype.generateId = function (number) {
        return 'else-' + number;
    };
    Else.prototype.init = function () {
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this;
    };
    Else.prototype.updateChildStatement = function (childStatement) {
        this.childStatement = childStatement;
        this.init();
    };
    Else.prototype.writeToCanvas = function (canvas, isClose) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = 'ELSE\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t';
        // ELSE
        var coordinate = canvas.writeText(this.level, text, this.color);
        // Create option button for If
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE);
        canvas.updateLastPosition();
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas);
        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION);
        if (isClose)
            canvas.writeClosingBlock(this.level, text, 'END IF', this.color);
    };
    Else.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.draw(canvas);
    };
    Else.prototype.callClickEvent = function (canvas, x, y) {
        var temp = this.option.clickOption(canvas, x, y);
        var tempChild = undefined;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                tempChild = this.childStatement[i].callClickEvent(canvas, x, y);
                if (tempChild != undefined)
                    break;
            }
        }
        return temp ? temp : tempChild;
    };
    Else.prototype.findVariable = function (variable) {
        var temp = undefined;
        if (this.childStatement == undefined)
            return undefined;
        for (var i = 0; i < this.childStatement.length; i++) {
            temp = this.childStatement[i].findVariable(variable);
            if (temp != undefined)
                return temp;
        }
        return undefined;
    };
    Else.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        var statementFound = false;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                statementFound = this.childStatement[i].findStatement(statement);
                if (statementFound)
                    return true;
            }
        }
        return false;
    };
    Else.prototype.cloneStatement = function (statementCount) {
        var elseStatement;
        var returnClone;
        var childStatement = [];
        elseStatement = new Else(this.level, statementCount++);
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++);
                if (returnClone.result == false)
                    return returnClone;
                childStatement.push(returnClone.statement);
            }
            elseStatement.updateChildStatement(childStatement);
        }
        return new ReturnClone_1.default(elseStatement, true);
    };
    Else.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'else\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    Else.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'else\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCppSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    Else.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'else\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateJavaSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    Else.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'else\n');
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCsSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    Else.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        sourceCode += 'else:\n';
        sourceCodeContainer.push(sourceCode);
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0) {
                var tempPrint = '' + this.getIndentation() + '\t' + "print('')" + '\n';
                sourceCodeContainer.push(tempPrint);
            }
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePythonSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            var tempPrint = '' + this.getIndentation() + '\t' + "print('')" + '\n';
            sourceCodeContainer.push(tempPrint);
        }
        return sourceCodeContainer;
    };
    Else.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var temp;
        sourceCodeContainer.push(this.getIndentation() + 'ELSE\n');
        sourceCodeContainer.push(this.getIndentation() + 'BEGIN\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePseudocode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + 'END\n');
        return sourceCodeContainer;
    };
    Else.prototype.toJSON = function () {
        return {
            statement: 'else',
            level: this.level,
            statementId: this.statementId,
            childStatement: this.childStatement
        };
    };
    Else.prototype.parseChild = function () {
        var newChildStatement = [];
        var tempChild = undefined;
        var object = undefined;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                object = this.childStatement[i];
                if (object.statement == 'declare') {
                    tempChild = Object.assign(new DeclareStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'input') {
                    tempChild = Object.assign(new InputStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'output') {
                    tempChild = Object.assign(new OutputStatement_1.default(undefined, undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'assignment') {
                    tempChild = Object.assign(new AssignmentStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'ifstatement') {
                    tempChild = Object.assign(new IfStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseChild();
                }
                else if (object.statement == 'for') {
                    tempChild = Object.assign(new ForStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'while') {
                    tempChild = Object.assign(new WhileStatement_1.default(undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'switch') {
                    tempChild = Object.assign(new SwitchStatement_1.default(undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                newChildStatement.push(tempChild);
            }
            this.updateChildStatement(newChildStatement);
        }
    };
    return Else;
}(Statement_1.default));
exports.default = Else;

},{"../../../../utilities/ReturnClone":37,"../../AssignmentStatement":9,"../../DeclareStatement":10,"../../ForStatement":11,"../../IfStatement":12,"../../InputStatement":13,"../../OutputStatement":14,"../../Statement":15,"../../SwitchStatement":16,"../../WhileStatement":17,"../options/Option":25}],24:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone_1 = __importDefault(require("../../../../utilities/ReturnClone"));
var AssignmentStatement_1 = __importDefault(require("../../AssignmentStatement"));
var DeclareStatement_1 = __importDefault(require("../../DeclareStatement"));
var ForStatement_1 = __importDefault(require("../../ForStatement"));
var IfStatement_1 = __importDefault(require("../../IfStatement"));
var InputStatement_1 = __importDefault(require("../../InputStatement"));
var OutputStatement_1 = __importDefault(require("../../OutputStatement"));
var Statement_1 = __importDefault(require("../../Statement"));
var SwitchStatement_1 = __importDefault(require("../../SwitchStatement"));
var WhileStatement_1 = __importDefault(require("../../WhileStatement"));
var Condition_1 = __importDefault(require("../general/Condition"));
var Option_1 = __importDefault(require("../options/Option"));
var If = /** @class */ (function (_super) {
    __extends(If, _super);
    function If(level, statementId, firstCondition, logicalOperator, secondCondition, childStatement) {
        var _this = _super.call(this, level) || this;
        _this.logicalOperator = undefined;
        _this.statementId = _this.generateId(statementId);
        _this.firstCondition = firstCondition;
        _this.logicalOperator = logicalOperator;
        _this.secondCondition = secondCondition;
        _this.childStatement = childStatement;
        _this.color = '#2bea15';
        _this.option = undefined;
        _this.init();
        _this.updateChildLevel();
        return _this;
    }
    If.prototype.generateId = function (number) {
        return 'if-' + number;
    };
    If.prototype.init = function () {
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].parent = this;
    };
    If.prototype.updateChildStatement = function (childStatement) {
        this.childStatement = childStatement;
        this.init();
    };
    If.prototype.writeToCanvas = function (canvas, isClose) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = 'IF ';
        if (this.logicalOperator != undefined && this.secondCondition != undefined)
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' '
                + this.secondCondition.generateBlockCodeText() + ' )';
        else
            text += '( ' + this.firstCondition.generateBlockCodeText() + ' )';
        // IF( condition )
        var coordinate = canvas.writeText(this.level, text, this.color);
        // Create option button for IfStatement
        this.parent.option = new Option_1.default(this.parent.statementId, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this.parent);
        this.parent.option.draw(canvas);
        // Create option button for If
        this.createOption(canvas, canvas.PADDING + (this.level * canvas.SPACE) + (this.level * canvas.LINE_HEIGHT), coordinate.y + canvas.SPACE);
        canvas.updateLastPosition();
        if (this.childStatement != undefined)
            for (var i = 0; i < this.childStatement.length; i++)
                this.childStatement[i].writeToCanvas(canvas);
        canvas.createBridge(this.color, this.level, upper, canvas.LAST_POSITION);
        if (isClose)
            canvas.writeClosingBlock(this.level, text, 'END IF', this.color);
    };
    If.prototype.createOption = function (canvas, coorX, coorY) {
        this.option = new Option_1.default(this.statementId, coorX, coorY, canvas.LINE_HEIGHT, canvas.LINE_HEIGHT, this);
        this.option.draw(canvas);
    };
    If.prototype.callClickEvent = function (canvas, x, y) {
        var temp = this.option.clickOption(canvas, x, y);
        var tempChild = undefined;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                tempChild = this.childStatement[i].callClickEvent(canvas, x, y);
                if (tempChild != undefined)
                    break;
            }
        }
        return temp ? temp : tempChild;
    };
    If.prototype.findVariable = function (variable) {
        var temp = undefined;
        if (this.firstCondition.findVariable(variable))
            return this;
        if (this.secondCondition) {
            if (this.secondCondition.findVariable(variable))
                return this;
        }
        if (this.childStatement == undefined)
            return undefined;
        for (var i = 0; i < this.childStatement.length; i++) {
            temp = this.childStatement[i].findVariable(variable);
            if (temp != undefined)
                return temp;
        }
        return undefined;
    };
    If.prototype.findStatement = function (statement) {
        if (statement == this)
            return true;
        var statementFound = false;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                statementFound = this.childStatement[i].findStatement(statement);
                if (statementFound)
                    return true;
            }
        }
        return false;
    };
    If.prototype.cloneStatement = function (statementCount) {
        var ifStatement;
        var returnClone;
        var childStatement = [];
        if (this.logicalOperator != undefined) {
            ifStatement = new If(this.level, statementCount, this.firstCondition.cloneCondition(), this.logicalOperator, this.secondCondition.cloneCondition());
        }
        else
            ifStatement = new If(this.level, statementCount, this.firstCondition.cloneCondition());
        if (this.childStatement) {
            for (var i = 0; i < this.childStatement.length; i++) {
                returnClone = this.childStatement[i].cloneStatement(statementCount++);
                if (returnClone.result == false)
                    return returnClone;
                childStatement.push(returnClone.statement);
            }
            ifStatement.updateChildStatement(childStatement);
        }
        return new ReturnClone_1.default(ifStatement, true);
    };
    If.prototype.generateCSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? '&&' : '||';
            sourceCode += 'if(' + this.firstCondition.generateCSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateCSourceCode() + ')\n';
        }
        else {
            sourceCode += 'if(' + this.firstCondition.generateCSourceCode() + ')\n';
        }
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    If.prototype.generateCppSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? '&&' : '||';
            sourceCode += 'if(' + this.firstCondition.generateCSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateCSourceCode() + ')\n';
        }
        else {
            sourceCode += 'if(' + this.firstCondition.generateCSourceCode() + ')\n';
        }
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCppSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    If.prototype.generateJavaSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? '&&' : '||';
            sourceCode += 'if(' + this.firstCondition.generateJavaSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateJavaSourceCode() + ')\n';
        }
        else {
            sourceCode += 'if(' + this.firstCondition.generateJavaSourceCode() + ')\n';
        }
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateJavaSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    If.prototype.generateCsSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? '&&' : '||';
            sourceCode += 'if(' + this.firstCondition.generateCsSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generateCsSourceCode() + ')\n';
        }
        else {
            sourceCode += 'if(' + this.firstCondition.generateCsSourceCode() + ')\n';
        }
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + '{\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generateCsSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + '}\n');
        return sourceCodeContainer;
    };
    If.prototype.generatePythonSourceCode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            var symbol = this.logicalOperator == 'AND' ? 'and' : 'or';
            sourceCode += 'if ' + this.firstCondition.generatePythonSourceCode() + ' ' + symbol + ' '
                + this.secondCondition.generatePythonSourceCode() + ':\n';
        }
        else {
            sourceCode += 'if ' + this.firstCondition.generatePythonSourceCode() + ':\n';
        }
        sourceCodeContainer.push(sourceCode);
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0) {
                var tempPrint = '' + this.getIndentation() + '\t' + "print('')" + '\n';
                sourceCodeContainer.push(tempPrint);
            }
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePythonSourceCode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            var tempPrint = '' + this.getIndentation() + '\t' + "print('')" + '\n';
            sourceCodeContainer.push(tempPrint);
        }
        return sourceCodeContainer;
    };
    If.prototype.generatePseudocode = function () {
        var sourceCodeContainer = [];
        var sourceCode = '' + this.getIndentation();
        var temp;
        if (this.logicalOperator != undefined && this.secondCondition != undefined) {
            sourceCode += 'IF ' + this.firstCondition.generateBlockCodeText() + ' ' + this.logicalOperator + ' '
                + this.secondCondition.generateBlockCodeText() + '\n';
        }
        else {
            sourceCode += 'IF ' + this.firstCondition.generateBlockCodeText() + '\n';
        }
        sourceCodeContainer.push(sourceCode);
        sourceCodeContainer.push(this.getIndentation() + 'BEGIN\n');
        if (this.childStatement != undefined) {
            if (this.childStatement.length == 0)
                sourceCodeContainer.push('\n');
            else {
                for (var i = 0; i < this.childStatement.length; i++) {
                    temp = this.childStatement[i].generatePseudocode();
                    temp = temp.flat(Infinity);
                    for (var j = 0; j < temp.length; j++)
                        sourceCodeContainer.push(temp[j]);
                }
            }
        }
        else {
            sourceCodeContainer.push('\n');
        }
        sourceCodeContainer.push(this.getIndentation() + 'END\n');
        return sourceCodeContainer;
    };
    If.prototype.toJSON = function () {
        return {
            statement: 'if',
            level: this.level,
            statementId: this.statementId,
            firstCondition: this.firstCondition,
            logicalOperator: this.logicalOperator,
            secondCondition: this.secondCondition,
            childStatement: this.childStatement
        };
    };
    If.prototype.parseChild = function () {
        var newChildStatement = [];
        var tempChild = undefined;
        var object = undefined;
        if (this.childStatement != undefined) {
            for (var i = 0; i < this.childStatement.length; i++) {
                object = this.childStatement[i];
                if (object.statement == 'declare') {
                    tempChild = Object.assign(new DeclareStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'input') {
                    tempChild = Object.assign(new InputStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'output') {
                    tempChild = Object.assign(new OutputStatement_1.default(undefined, undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'assignment') {
                    tempChild = Object.assign(new AssignmentStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'ifstatement') {
                    tempChild = Object.assign(new IfStatement_1.default(undefined, undefined, undefined), object);
                    tempChild.parseChild();
                }
                else if (object.statement == 'for') {
                    tempChild = Object.assign(new ForStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'while') {
                    tempChild = Object.assign(new WhileStatement_1.default(undefined, undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                else if (object.statement == 'switch') {
                    tempChild = Object.assign(new SwitchStatement_1.default(undefined, undefined, undefined, undefined), object);
                    tempChild.parseChild();
                    tempChild.parseAttributes();
                }
                newChildStatement.push(tempChild);
            }
            this.updateChildStatement(newChildStatement);
        }
    };
    If.prototype.parseAttributes = function () {
        var firstCondition = Object.assign(new Condition_1.default(undefined, undefined, undefined, undefined), this.firstCondition);
        firstCondition.parseAttributes();
        this.firstCondition = firstCondition;
        if (this.secondCondition != undefined) {
            var secondCondition = Object.assign(new Condition_1.default(undefined, undefined, undefined, undefined), this.secondCondition);
            secondCondition.parseAttributes();
            this.secondCondition = secondCondition;
        }
    };
    return If;
}(Statement_1.default));
exports.default = If;

},{"../../../../utilities/ReturnClone":37,"../../AssignmentStatement":9,"../../DeclareStatement":10,"../../ForStatement":11,"../../IfStatement":12,"../../InputStatement":13,"../../OutputStatement":14,"../../Statement":15,"../../SwitchStatement":16,"../../WhileStatement":17,"../general/Condition":20,"../options/Option":25}],25:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClick_1 = __importDefault(require("../../../../utilities/ReturnClick"));
var AssignmentStatement_1 = __importDefault(require("../../AssignmentStatement"));
var DeclareStatement_1 = __importDefault(require("../../DeclareStatement"));
var ForStatement_1 = __importDefault(require("../../ForStatement"));
var IfStatement_1 = __importDefault(require("../../IfStatement"));
var InputStatement_1 = __importDefault(require("../../InputStatement"));
var OutputStatement_1 = __importDefault(require("../../OutputStatement"));
var SwitchStatement_1 = __importDefault(require("../../SwitchStatement"));
var WhileStatement_1 = __importDefault(require("../../WhileStatement"));
var OptionSelection_1 = __importDefault(require("./OptionSelection"));
var Option = /** @class */ (function () {
    function Option(optionId, coorX, coorY, width, height, parent) {
        this.optionId = this.generateId(optionId);
        this.coorX = coorX;
        this.coorY = coorY;
        this.width = width;
        this.height = height;
        this.isSelectionActive = false;
        this.parent = parent;
        var splitted = optionId.split('-');
        if (this.parent instanceof IfStatement_1.default || this.parent instanceof DeclareStatement_1.default
            || this.parent instanceof SwitchStatement_1.default || (this.parent instanceof ForStatement_1.default && splitted[splitted.length - 1] == 'outer')
            || (this.parent instanceof WhileStatement_1.default && splitted[splitted.length - 1] == 'outer')
            || this.parent instanceof InputStatement_1.default || this.parent instanceof OutputStatement_1.default
            || this.parent instanceof AssignmentStatement_1.default) {
            this.optionSelection = this.generateCompleteOptions();
        }
        else
            this.optionSelection = this.generateOptions();
    }
    Option.prototype.generateId = function (optionId) {
        return 'opt-' + optionId;
    };
    Option.prototype.generateOptions = function () {
        var temp = [];
        temp.push(new OptionSelection_1.default(this.optionId, 'ADD', '#2948e3', this.coorX + 45, this.coorX, this.coorY, 40, 40, this.parent));
        temp.push(new OptionSelection_1.default(this.optionId, 'PST', '#e65010', this.coorX + 90, this.coorX, this.coorY, 40, 40, this.parent));
        return temp;
    };
    Option.prototype.generateCompleteOptions = function () {
        var temp = [];
        temp.push(new OptionSelection_1.default(this.optionId, 'ADD', '#2948e3', this.coorX + 45, this.coorX, this.coorY, 40, 40, this.parent));
        temp.push(new OptionSelection_1.default(this.optionId, 'PST', '#e65010', this.coorX + 90, this.coorX, this.coorY, 40, 40, this.parent));
        temp.push(new OptionSelection_1.default(this.optionId, 'MOV', '#186e2b', this.coorX + 135, this.coorX, this.coorY, 40, 40, this.parent));
        temp.push(new OptionSelection_1.default(this.optionId, 'CPY', '#4b1363', this.coorX + 180, this.coorX, this.coorY, 40, 40, this.parent));
        temp.push(new OptionSelection_1.default(this.optionId, 'EDT', '#e6b800', this.coorX + 225, this.coorX, this.coorY, 40, 40, this.parent));
        temp.push(new OptionSelection_1.default(this.optionId, 'DEL', '#ad0e0e', this.coorX + 270, this.coorX, this.coorY, 40, 40, this.parent));
        return temp;
    };
    Option.prototype.draw = function (canvas) {
        canvas.createOption(this.coorX, this.coorY);
    };
    Option.prototype.clickOption = function (canvas, x, y) {
        var temp = undefined;
        if (x <= this.coorX + this.width && x >= this.coorX && y <= this.coorY + this.height && y >= this.coorY) {
            if (!this.isSelectionActive) {
                this.showOptionSelections(canvas);
            }
            else {
                this.clearSelection(canvas, this.optionSelection.length + 1);
                this.findChildOptionClick(x, y);
            }
            this.isSelectionActive = !this.isSelectionActive;
            if (!this.isSelectionActive)
                temp = new ReturnClick_1.default(undefined, undefined, true);
        }
        else if (this.isSelectionActive) {
            temp = this.findChildOptionClick(x, y);
        }
        return temp;
    };
    Option.prototype.clearSelection = function (canvas, length) {
        canvas.clearOptions(this.coorX + canvas.LINE_HEIGHT, this.coorY, length);
    };
    Option.prototype.findChildOptionClick = function (x, y) {
        var temp = undefined;
        for (var i = 0; i < this.optionSelection.length; i++) {
            temp = this.optionSelection[i].clickOption(x, y);
            if (temp != undefined)
                break;
        }
        return temp;
    };
    Option.prototype.showOptionSelections = function (canvas) {
        for (var i = 0; i < this.optionSelection.length; i++)
            this.optionSelection[i].draw(canvas);
    };
    return Option;
}());
exports.default = Option;

},{"../../../../utilities/ReturnClick":36,"../../AssignmentStatement":9,"../../DeclareStatement":10,"../../ForStatement":11,"../../IfStatement":12,"../../InputStatement":13,"../../OutputStatement":14,"../../SwitchStatement":16,"../../WhileStatement":17,"./OptionSelection":26}],26:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClick_1 = __importDefault(require("../../../../utilities/ReturnClick"));
var ReturnPaste_1 = __importDefault(require("../../../../utilities/ReturnPaste"));
var AssignmentStatement_1 = __importDefault(require("../../AssignmentStatement"));
var DeclareStatement_1 = __importDefault(require("../../DeclareStatement"));
var ForStatement_1 = __importDefault(require("../../ForStatement"));
var IfStatement_1 = __importDefault(require("../../IfStatement"));
var InputStatement_1 = __importDefault(require("../../InputStatement"));
var OutputStatement_1 = __importDefault(require("../../OutputStatement"));
var SwitchStatement_1 = __importDefault(require("../../SwitchStatement"));
var WhileStatement_1 = __importDefault(require("../../WhileStatement"));
var Case_1 = __importDefault(require("../case/Case"));
var Else_1 = __importDefault(require("../ifs/Else"));
var If_1 = __importDefault(require("../ifs/If"));
var OptionSelection = /** @class */ (function () {
    function OptionSelection(optionId, optionName, optionColor, coorX, currentX, coorY, width, height, parent) {
        this.optionId = optionId;
        this.optionName = optionName;
        this.optionColor = optionColor;
        this.coorX = coorX;
        this.currentX = currentX;
        this.coorY = coorY;
        this.width = width;
        this.height = height;
        this.parent = parent;
    }
    OptionSelection.prototype.draw = function (canvas) {
        canvas.createSelection(this.coorX, this.coorY, this.optionName, this.optionColor);
    };
    OptionSelection.prototype.clickOption = function (x, y) {
        if (x <= this.coorX + this.width && x >= this.coorX && y <= this.coorY + this.height && y >= this.coorY)
            return new ReturnClick_1.default(this.parent, this);
        return undefined;
    };
    OptionSelection.prototype.addStatement = function (mainListStatement, newStatement, targetStatement, optionId) {
        var splitted = optionId.split('-');
        var isInner = splitted[splitted.length - 1] == 'inner' ? true : false;
        // Declare statement is only allowed on level 1
        if (newStatement instanceof DeclareStatement_1.default) {
            if (!this.validateDeclarePlacement(targetStatement, isInner))
                return new ReturnPaste_1.default(false, mainListStatement);
        }
        // Statements must be added after declaration
        if (!this.validateMainListStatement(mainListStatement, newStatement, targetStatement, isInner))
            return new ReturnPaste_1.default(false, mainListStatement);
        return this.paste(mainListStatement, newStatement, targetStatement, isInner);
    };
    OptionSelection.prototype.handleDelete = function (mainListStatement, clipboard) {
        var parentStatement = clipboard.parent;
        if (parentStatement == undefined) {
            if (clipboard instanceof DeclareStatement_1.default) {
                var clipboardIdx = mainListStatement.indexOf(clipboard);
                if (this.isVariableExist(mainListStatement, clipboard, clipboardIdx, false))
                    return new ReturnPaste_1.default(false, mainListStatement);
            }
            mainListStatement = this.removeSourceStatement(mainListStatement, clipboard);
        }
        else
            parentStatement.updateChildStatement(this.removeSourceStatement(parentStatement.childStatement, clipboard));
        return new ReturnPaste_1.default(true, mainListStatement);
    };
    OptionSelection.prototype.validateDeclarePlacement = function (targetStatement, isInner) {
        if (targetStatement != undefined) {
            if (targetStatement instanceof DeclareStatement_1.default || targetStatement instanceof IfStatement_1.default || targetStatement instanceof SwitchStatement_1.default
                || targetStatement instanceof InputStatement_1.default || targetStatement instanceof DeclareStatement_1.default || targetStatement instanceof AssignmentStatement_1.default
                || targetStatement instanceof OutputStatement_1.default
                || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner)) {
                if (targetStatement.level > 1)
                    return false;
            }
            else if (targetStatement instanceof If_1.default || targetStatement instanceof Else_1.default || targetStatement instanceof Case_1.default || (targetStatement instanceof ForStatement_1.default && isInner)
                || (targetStatement instanceof WhileStatement_1.default && isInner)) {
                return false;
            }
        }
        return true;
    };
    OptionSelection.prototype.validateMainListStatement = function (mainListStatement, clipboard, targetStatement, isInner) {
        var returnPaste = undefined;
        var result = true;
        var parentStatement = undefined;
        var pasteResult = [];
        pasteResult = this.pasteTemp(mainListStatement, clipboard, targetStatement, isInner);
        returnPaste = pasteResult[0];
        parentStatement = pasteResult[1];
        mainListStatement = returnPaste.listStatement;
        if (returnPaste.result) {
            var variableFound = false;
            if (mainListStatement != undefined) {
                for (var i = 0; i < mainListStatement.length; i++) {
                    if (mainListStatement[i] instanceof DeclareStatement_1.default) {
                        variableFound = this.isVariableExist(mainListStatement, mainListStatement[i], i, true);
                        if (variableFound) {
                            result = false;
                            break;
                        }
                    }
                }
            }
        }
        if (parentStatement == undefined)
            this.removeSourceStatement(mainListStatement, clipboard);
        else
            parentStatement.updateChildStatement(this.removeSourceStatement(parentStatement.childStatement, clipboard));
        return result;
    };
    OptionSelection.prototype.isVariableExist = function (mainListStatement, declareStatement, index, isBackward) {
        var statement = undefined;
        if (mainListStatement == undefined)
            return false;
        if (isBackward) {
            for (var i = index; i >= 0; i--) {
                statement = mainListStatement[i].findVariable(declareStatement.variable);
                if (statement != undefined)
                    return true;
            }
        }
        else {
            for (var i = index + 1; i < mainListStatement.length; i++) {
                statement = mainListStatement[i].findVariable(declareStatement.variable);
                if (statement != undefined)
                    return true;
            }
        }
        return false;
    };
    OptionSelection.prototype.handlePaste = function (mainListStatement, clipboard, targetStatement, isInner, lastSelectedOption) {
        var returnClone = clipboard.cloneStatement(Math.floor(Math.random() * 1000) + 10000);
        if (clipboard instanceof DeclareStatement_1.default) {
            if (!this.validateDeclarePlacement(targetStatement, isInner))
                return new ReturnPaste_1.default(false, mainListStatement);
        }
        // Statements must be added after declaration
        if (!this.validateMainListStatement(mainListStatement, returnClone.statement, targetStatement, isInner))
            return new ReturnPaste_1.default(false, mainListStatement);
        // Removing statement
        if (lastSelectedOption == 'MOV') {
            if (clipboard.parent == undefined)
                mainListStatement = this.removeSourceStatement(mainListStatement, clipboard);
            else
                clipboard.parent.updateChildStatement(this.removeSourceStatement(clipboard.parent.childStatement, clipboard));
        }
        return this.paste(mainListStatement, clipboard, targetStatement, isInner);
    };
    OptionSelection.prototype.pasteTemp = function (mainListStatement, clipboard, targetStatement, isInner) {
        var parentStatement = undefined;
        if (targetStatement == undefined || targetStatement.parent == undefined) {
            if (targetStatement == undefined || (targetStatement instanceof DeclareStatement_1.default || targetStatement instanceof IfStatement_1.default || targetStatement instanceof SwitchStatement_1.default
                || targetStatement instanceof OutputStatement_1.default || targetStatement instanceof InputStatement_1.default
                || targetStatement instanceof AssignmentStatement_1.default || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner))) {
                mainListStatement = this.pasteStatement(mainListStatement, targetStatement, clipboard);
            }
            else if (targetStatement instanceof If_1.default || targetStatement instanceof Else_1.default || targetStatement instanceof Case_1.default || (targetStatement instanceof ForStatement_1.default && isInner)
                || (targetStatement instanceof WhileStatement_1.default && isInner)) {
                parentStatement = targetStatement;
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard));
            }
        }
        else {
            if (targetStatement instanceof DeclareStatement_1.default || targetStatement instanceof IfStatement_1.default || targetStatement instanceof SwitchStatement_1.default
                || targetStatement instanceof OutputStatement_1.default || targetStatement instanceof InputStatement_1.default
                || targetStatement instanceof AssignmentStatement_1.default || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner)) {
                parentStatement = targetStatement.parent;
                targetStatement.parent.updateChildStatement(this.pasteStatement(targetStatement.parent.childStatement, targetStatement, clipboard));
            }
            else if (targetStatement instanceof If_1.default || targetStatement instanceof Else_1.default || targetStatement instanceof Case_1.default || (targetStatement instanceof ForStatement_1.default && isInner)
                || (targetStatement instanceof WhileStatement_1.default && isInner)) {
                parentStatement = targetStatement;
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard));
            }
        }
        return [new ReturnPaste_1.default(true, mainListStatement), parentStatement];
    };
    OptionSelection.prototype.paste = function (mainListStatement, clipboard, targetStatement, isInner) {
        /** List of possibilities:
          * - Paste after statement
          * -> Applies to DeclareStatement, IfStatement, ForStatement, SwitchStatement, InputStatement
          * - Paste inside a statement
          * -> Applies to If, Elif, Else, ForStatement, Case
        **/
        // Target is located on level 1
        if (targetStatement == undefined || targetStatement.parent == undefined) {
            if (targetStatement == undefined || (targetStatement instanceof DeclareStatement_1.default || targetStatement instanceof IfStatement_1.default || targetStatement instanceof SwitchStatement_1.default
                || targetStatement instanceof OutputStatement_1.default || targetStatement instanceof InputStatement_1.default
                || targetStatement instanceof AssignmentStatement_1.default || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner))) {
                mainListStatement = this.pasteStatement(mainListStatement, targetStatement, clipboard);
            }
            else if (targetStatement instanceof If_1.default || targetStatement instanceof Else_1.default || targetStatement instanceof Case_1.default || (targetStatement instanceof ForStatement_1.default && isInner)
                || (targetStatement instanceof WhileStatement_1.default && isInner)) {
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard));
            }
        }
        // Target is a child of another statement
        else {
            if (targetStatement instanceof DeclareStatement_1.default || targetStatement instanceof IfStatement_1.default || targetStatement instanceof SwitchStatement_1.default
                || targetStatement instanceof OutputStatement_1.default || targetStatement instanceof InputStatement_1.default
                || targetStatement instanceof AssignmentStatement_1.default || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner)) {
                targetStatement.parent.updateChildStatement(this.pasteStatement(targetStatement.parent.childStatement, targetStatement, clipboard));
            }
            else if (targetStatement instanceof If_1.default || targetStatement instanceof Else_1.default || targetStatement instanceof Case_1.default || (targetStatement instanceof ForStatement_1.default && isInner)
                || (targetStatement instanceof WhileStatement_1.default && isInner)) {
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard));
            }
        }
        return new ReturnPaste_1.default(true, mainListStatement);
    };
    OptionSelection.prototype.removeSourceStatement = function (listSourceStatement, clipboard) {
        var sourceStatementIdx = -1;
        sourceStatementIdx = listSourceStatement.indexOf(clipboard);
        if (sourceStatementIdx == -1)
            return listSourceStatement;
        listSourceStatement.splice(sourceStatementIdx, 1);
        return listSourceStatement;
    };
    OptionSelection.prototype.pasteStatement = function (listTargetStatement, targetStatement, clipboard) {
        var tempChildStatement = [];
        if (listTargetStatement != undefined)
            tempChildStatement = listTargetStatement;
        if (targetStatement)
            tempChildStatement.splice(tempChildStatement.indexOf(targetStatement) + 1, 0, clipboard);
        else
            tempChildStatement.unshift(clipboard);
        return tempChildStatement;
    };
    OptionSelection.prototype.purge = function (mainListStatement) {
        if (mainListStatement == undefined || mainListStatement.length == 0)
            return;
        var statement = mainListStatement[0];
        while (mainListStatement.length != 0) {
            this.removeSourceStatement(mainListStatement, mainListStatement[0]);
        }
    };
    return OptionSelection;
}());
exports.default = OptionSelection;

},{"../../../../utilities/ReturnClick":36,"../../../../utilities/ReturnPaste":38,"../../AssignmentStatement":9,"../../DeclareStatement":10,"../../ForStatement":11,"../../IfStatement":12,"../../InputStatement":13,"../../OutputStatement":14,"../../SwitchStatement":16,"../../WhileStatement":17,"../case/Case":19,"../ifs/Else":23,"../ifs/If":24}],27:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Return_1 = __importDefault(require("../../utilities/Return"));
var Variable_1 = __importDefault(require("./Variable"));
var Char = /** @class */ (function (_super) {
    __extends(Char, _super);
    function Char(name, value) {
        return _super.call(this, name, value) || this;
    }
    Char.prototype.validateValue = function () {
        if (this.value.length > 1)
            return new Return_1.default(false, 'Character value cannot be more than 1 character!');
        else
            return new Return_1.default(true, '');
    };
    Char.prototype.toJSON = function () {
        return {
            type: 'char',
            name: this.name,
            value: this.value
        };
    };
    return Char;
}(Variable_1.default));
exports.default = Char;

},{"../../utilities/Return":35,"./Variable":33}],28:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Return_1 = __importDefault(require("../../utilities/Return"));
var Variable_1 = __importDefault(require("./Variable"));
var Double = /** @class */ (function (_super) {
    __extends(Double, _super);
    function Double(name, value) {
        return _super.call(this, name, value) || this;
    }
    Double.prototype.validateValue = function () {
        if (this.value == '')
            return new Return_1.default(false, 'Double value cannot be empty!');
        else if (this.value.includes('.')) {
            if (this.value.split('.')[1].length > 15)
                return new Return_1.default(false, 'Double value cannot store more than 15 decimal digits!');
            else
                return new Return_1.default(true, '');
        }
        else
            return new Return_1.default(true, '');
    };
    Double.prototype.toJSON = function () {
        return {
            type: 'double',
            name: this.name,
            value: this.value
        };
    };
    return Double;
}(Variable_1.default));
exports.default = Double;

},{"../../utilities/Return":35,"./Variable":33}],29:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Return_1 = __importDefault(require("../../utilities/Return"));
var Variable_1 = __importDefault(require("./Variable"));
var Float = /** @class */ (function (_super) {
    __extends(Float, _super);
    function Float(name, value) {
        return _super.call(this, name, value) || this;
    }
    Float.prototype.validateValue = function () {
        if (this.value == '')
            return new Return_1.default(false, 'Float value cannot be empty!');
        else if (this.value.includes('.')) {
            if (this.value.split('.')[1].length > 7)
                return new Return_1.default(false, 'Float value cannot store more than 7 decimal digits!');
            else
                return new Return_1.default(true, '');
        }
        else
            return new Return_1.default(true, '');
    };
    Float.prototype.toJSON = function () {
        return {
            type: 'float',
            name: this.name,
            value: this.value
        };
    };
    return Float;
}(Variable_1.default));
exports.default = Float;

},{"../../utilities/Return":35,"./Variable":33}],30:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Return_1 = __importDefault(require("../../utilities/Return"));
var Variable_1 = __importDefault(require("./Variable"));
var Integer = /** @class */ (function (_super) {
    __extends(Integer, _super);
    function Integer(name, value) {
        return _super.call(this, name, value) || this;
    }
    Integer.prototype.validateValue = function () {
        if (this.value == '')
            return new Return_1.default(false, 'Integer value cannot be empty!');
        else if (this.value.includes('.'))
            return new Return_1.default(false, 'Integer value cannot be floating points!');
        else if (parseInt(this.value) > 2147483647)
            return new Return_1.default(false, 'Integer value cannot exceeds 2147483647!');
        else if (parseInt(this.value) < -2147483647)
            return new Return_1.default(false, 'Integer value cannot subceed -2147483647!');
        else
            return new Return_1.default(true, '');
    };
    Integer.prototype.toJSON = function () {
        return {
            type: 'int',
            name: this.name,
            value: this.value
        };
    };
    return Integer;
}(Variable_1.default));
exports.default = Integer;

},{"../../utilities/Return":35,"./Variable":33}],31:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Return_1 = __importDefault(require("../../utilities/Return"));
var Variable_1 = __importDefault(require("./Variable"));
var Long = /** @class */ (function (_super) {
    __extends(Long, _super);
    function Long(name, value) {
        return _super.call(this, name, value) || this;
    }
    Long.prototype.validateValue = function () {
        if (this.value == '')
            return new Return_1.default(false, 'Long value cannot be empty!');
        else if (parseInt(this.value) > 9223372036854775807)
            return new Return_1.default(false, 'Long value cannot exceeds 9223372036854775807!');
        else if (parseInt(this.value) < -9223372036854775807)
            return new Return_1.default(false, 'Long value cannot subceed -9223372036854775807!');
        else
            return new Return_1.default(true, '');
    };
    Long.prototype.toJSON = function () {
        return {
            type: 'long',
            name: this.name,
            value: this.value
        };
    };
    return Long;
}(Variable_1.default));
exports.default = Long;

},{"../../utilities/Return":35,"./Variable":33}],32:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Return_1 = __importDefault(require("../../utilities/Return"));
var Variable_1 = __importDefault(require("./Variable"));
var String = /** @class */ (function (_super) {
    __extends(String, _super);
    function String(name, value) {
        return _super.call(this, name, value) || this;
    }
    String.prototype.validateValue = function () {
        return new Return_1.default(true, '');
    };
    String.prototype.toJSON = function () {
        return {
            type: 'string',
            name: this.name,
            value: this.value
        };
    };
    return String;
}(Variable_1.default));
exports.default = String;

},{"../../utilities/Return":35,"./Variable":33}],33:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Return_1 = __importDefault(require("../../utilities/Return"));
var Variable = /** @class */ (function () {
    function Variable(name, value) {
        this.name = name;
        this.value = value;
    }
    Variable.prototype.validateName = function () {
        if (this.name.length == 0)
            return new Return_1.default(false, "Variable name cannot be empty!");
        else if (this.name.includes(' '))
            return new Return_1.default(false, "Variable name cannot contain space!");
        else if (this.name.charCodeAt(0) >= 48 && this.name.charCodeAt(0) <= 57)
            return new Return_1.default(false, "Variable name cannot start with numbers!");
        else if (!(this.name.charCodeAt(0) >= 65 && this.name.charCodeAt(0) <= 90) && !(this.name.charCodeAt(0) >= 97 && this.name.charCodeAt(0) <= 122))
            return new Return_1.default(false, "Variable name cannot start with symbols!");
        else
            return new Return_1.default(true, '');
    };
    Variable.prototype.validateValue = function () { return new Return_1.default(true, ''); };
    return Variable;
}());
exports.default = Variable;

},{"../../utilities/Return":35}],34:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Integer_1 = __importDefault(require("../classes/variable/Integer"));
var Long_1 = __importDefault(require("../classes/variable/Long"));
var Float_1 = __importDefault(require("../classes/variable/Float"));
var Double_1 = __importDefault(require("../classes/variable/Double"));
var Char_1 = __importDefault(require("../classes/variable/Char"));
var String_1 = __importDefault(require("../classes/variable/String"));
var DeclareStatement_1 = __importDefault(require("../classes/statement/DeclareStatement"));
var IfStatement_1 = __importDefault(require("../classes/statement/IfStatement"));
var If_1 = __importDefault(require("../classes/statement/helper/ifs/If"));
var Elif_1 = __importDefault(require("../classes/statement/helper/ifs/Elif"));
var Condition_1 = __importDefault(require("../classes/statement/helper/general/Condition"));
var Canvas_1 = __importDefault(require("../classes/canvas/Canvas"));
var Else_1 = __importDefault(require("../classes/statement/helper/ifs/Else"));
var ForStatement_1 = __importDefault(require("../classes/statement/ForStatement"));
var SwitchStatement_1 = __importDefault(require("../classes/statement/SwitchStatement"));
var Case_1 = __importDefault(require("../classes/statement/helper/case/Case"));
var WhileStatement_1 = __importDefault(require("../classes/statement/WhileStatement"));
var Option_1 = __importDefault(require("../classes/statement/helper/options/Option"));
var InputStatement_1 = __importDefault(require("../classes/statement/InputStatement"));
var OutputStatement_1 = __importDefault(require("../classes/statement/OutputStatement"));
var AssignmentStatement_1 = __importDefault(require("../classes/statement/AssignmentStatement"));
var Arithmetic_1 = __importDefault(require("../classes/statement/helper/assignment/Arithmetic"));
var C_1 = __importDefault(require("../classes/languages/C"));
var Java_1 = __importDefault(require("../classes/languages/Java"));
var Python_1 = __importDefault(require("../classes/languages/Python"));
var Cs_1 = __importDefault(require("../classes/languages/Cs"));
var Cpp_1 = __importDefault(require("../classes/languages/Cpp"));
var Pseudocode_1 = __importDefault(require("../classes/languages/Pseudocode"));
$(document).ready(function () {
    // Before insert variable
    var declareVariableNameList;
    var declareVariableValueList;
    var variableIndex = 0;
    // All declared variable names
    var allVariableNames = {};
    // Declared variables
    var listInteger = [];
    var listFloat = [];
    var listLong = [];
    var listDouble = [];
    var listChar = [];
    var listString = [];
    // Statement
    var statementCount = 0;
    // Declared statements
    var listStatement = [];
    // Helper Functions
    function createHint(text, length) {
        var className = "col-sm-" + length;
        var className2 = 'col-' + length;
        var strong = $('<strong></strong>').text(text);
        var div = $('<div></div>').addClass(className).addClass(className2).css('color', 'black').addClass('align-items-center');
        div.append(strong);
        return div;
    }
    function createInputField(inputType) {
        return $('<input></input>').attr({ type: inputType }).addClass('form-control');
    }
    function createCloseBtn() {
        return $('<button></button>').addClass('btn-close').addClass('rmDeclare');
    }
    function createWhiteSpace(length) {
        return $('<div></div>').addClass('col-sm-' + length).addClass('col-' + length);
    }
    function createDeclareDataVariable(isRequired, isNumber) {
        var variableClassName = 'var-name-' + variableIndex;
        var inputClassName = 'input-val-' + variableIndex;
        var hintContainer = $('<div>', { class: 'col-sm-12 col-12 mb-2 d-flex' }).append(createHint('Variable Name', 5), createWhiteSpace(1), createHint('Initial Value', 5));
        var valueField = isNumber ? createInputField('number').addClass(inputClassName) : createInputField('text').addClass(inputClassName);
        var inputContainer = $('<div>', { class: 'col-sm-12 col-12 mb-4 d-flex align-items-center' }).append($('<div>', { class: 'col-sm-5 col-5' }).append(createInputField('text').addClass(variableClassName)), createWhiteSpace(1), $('<div>', { class: 'col-sm-5 col-5' }).append(valueField));
        var container3 = $('<div>', { class: 'col-sm-1 col-1 d-flex justify-content-center' }).append(createCloseBtn().data('value', variableIndex++));
        declareVariableNameList.push(variableClassName);
        declareVariableValueList.push(inputClassName);
        if (!isRequired)
            inputContainer.append(container3);
        $('#pcInputContainer').append($('<div>', { class: 'col-sm-12 col-12' }).append(hintContainer, inputContainer));
    }
    function createSelect(listVariable, length, isAllVariable) {
        var option;
        var className = 'col-sm-' + length;
        var className2 = 'col-' + length;
        var container = $('<div>', { class: className + ' ' + className2 });
        var select = $('<select>', { class: 'form-select col-sm-12 col-12' }).append($('<option>').val(null).text('Choose Variable'));
        for (var _i = 0, listVariable_1 = listVariable; _i < listVariable_1.length; _i++) {
            var variable = listVariable_1[_i];
            if (!isAllVariable)
                option = $('<option>').val(variable.name).text(variable.name);
            else {
                var dataType = void 0;
                if (variable instanceof Integer_1.default)
                    dataType = 'Integer';
                else if (variable instanceof Long_1.default)
                    dataType = 'Long';
                else if (variable instanceof Float_1.default)
                    dataType = 'Float';
                else if (variable instanceof Double_1.default)
                    dataType = 'Double';
                else if (variable instanceof Char_1.default)
                    dataType = 'Char';
                else
                    dataType = 'String';
                option = $('<option>').val(variable.name).text(variable.name + ' (' + dataType + ')');
            }
            select.append(option);
        }
        container.append(select);
        return container;
    }
    function clearError() {
        $('#pcInputErrorContainer').empty();
        $('#pjMessageContainer').empty();
        $('#resultErrorContainer').empty();
        if (declareVariableNameList != undefined) {
            for (var _i = 0, declareVariableNameList_1 = declareVariableNameList; _i < declareVariableNameList_1.length; _i++) {
                var varName = declareVariableNameList_1[_i];
                $('.' + varName).removeClass('input-error');
            }
        }
        if (declareVariableValueList != undefined) {
            for (var _a = 0, declareVariableValueList_1 = declareVariableValueList; _a < declareVariableValueList_1.length; _a++) {
                var varValue = declareVariableValueList_1[_a];
                $('.' + varValue).removeClass('input-error');
            }
        }
        if (caseToBeValidated != undefined) {
            for (var i = 0; i < caseToBeValidated.length; i++)
                $('.' + caseToBeValidated[i]).removeClass('input-error');
        }
        if (assignmentToBeValidated != undefined) {
            for (var i = 0; i < assignmentToBeValidated.length; i++) {
                $('.first-value-' + assignmentToBeValidated[i]).find('select').removeClass('input-error');
                $('.first-value-' + assignmentToBeValidated[i]).removeClass('input-error');
                $('.second-value-' + assignmentToBeValidated[i]).find('select').removeClass('input-error');
                $('.second-value-' + assignmentToBeValidated[i]).removeClass('input-error');
            }
        }
        $('#chosenVariable').removeClass('input-error');
        $('#chosenOutputVariable').removeClass('input-error');
        $('#chosenSwitchVariable').removeClass('input-error');
        $('#chosen-for-loop-variable').removeClass('input-error');
        $('#chosen-for-loop-value').removeClass('input-error');
        $('#update-value-for-loop').removeClass('input-error');
        $('#chosen-asg-variable').removeClass('input-error');
        $('.selected-target-variable-asg').removeClass('input-error');
        $('.first-asg-string-value').find('select').removeClass('input-error');
        $('.second-asg-string-value').find('select').removeClass('input-error');
        $('.begin-idx-string').removeClass('input-error');
        $('.length-idx-string').removeClass('input-error');
        $('input[name=project_name').removeClass('input-error');
        if (ifToBeValidated != undefined) {
            for (var i = 0; i < ifToBeValidated.length; i++) {
                $('#first-if-select-first-variable-' + ifToBeValidated[i]).removeClass('input-error');
                $('#first-if-input-second-variable-' + ifToBeValidated[i]).removeClass('input-error');
                $('#first-if-select-second-variable-' + ifToBeValidated[i]).removeClass('input-error');
                $('#second-if-select-first-variable-' + ifToBeValidated[i]).removeClass('input-error');
                $('#second-if-input-second-variable-' + ifToBeValidated[i]).removeClass('input-error');
                $('#second-if-select-second-variable-' + ifToBeValidated[i]).removeClass('input-error');
            }
        }
    }
    function initInput(title) {
        $('#pcInputErrorContainer').empty();
        $('#pcInputContainer').empty();
        $('#pcInputContainerLower').empty();
        $('#command-name').text(title);
        declareVariableNameList = [];
        declareVariableValueList = [];
        variableIndex = 0;
    }
    function createErrorMessage(message, targetClass) {
        var container = $('<div>', { class: 'col-sm-12 col-12 alert alert-danger' }).text(message);
        targetClass = '#' + targetClass;
        $(targetClass).append(container);
    }
    function insertToVariableList() {
        for (var i = 0; i < declareVariableNameList.length; i++) {
            var variableName = void 0;
            variableName = $('.' + declareVariableNameList[i]).val();
            var variableValue = void 0;
            variableValue = $('.' + declareVariableValueList[i]).val();
            allVariableNames[variableName] = true;
            var variable = void 0;
            if ($('#createVariableBtn').data('value') == 'int') {
                variable = new Integer_1.default(variableName, variableValue);
                listInteger.push(variable);
            }
            else if ($('#createVariableBtn').data('value') == 'long') {
                variable = new Long_1.default(variableName, variableValue);
                listLong.push(variable);
            }
            else if ($('#createVariableBtn').data('value') == 'float') {
                variable = new Float_1.default(variableName, variableValue);
                listFloat.push(variable);
            }
            else if ($('#createVariableBtn').data('value') == 'double') {
                variable = new Double_1.default(variableName, variableValue);
                listDouble.push(variable);
            }
            else if ($('#createVariableBtn').data('value') == 'char') {
                variable = new Char_1.default(variableName, variableValue);
                listChar.push(variable);
            }
            else if ($('#createVariableBtn').data('value') == 'string') {
                variable = new String_1.default(variableName, variableValue);
                listString.push(variable);
            }
            handleAdd(new DeclareStatement_1.default(statementCount++, 1, variable));
        }
    }
    function getVariable(listVariable, variableName) {
        for (var i = 0; i < listVariable.length; i++) {
            if (listVariable[i].name == variableName)
                return listVariable[i];
        }
        return undefined;
    }
    function cloneStatement(statement) {
        if (statement instanceof DeclareStatement_1.default) {
            createErrorMessage('Could not copy declare statement!', 'bcErrorContainer');
            return undefined;
        }
        else {
            var returnClone = void 0;
            returnClone = statement.cloneStatement(statementCount++);
            if (returnClone.result == false) {
                createErrorMessage('Could not copy declare statement!', 'bcErrorContainer');
                return undefined;
            }
            else
                return returnClone.statement;
        }
    }
    // Declare Variable
    $(document).on('click', '.addVariableDeclareBtn', function () {
        if ($(this).data('value') == false)
            createDeclareDataVariable(false, false);
        else
            createDeclareDataVariable(false, true);
    });
    $(document).on('click', '.rmDeclare', function () {
        var varName = 'var-name-' + $(this).data('value');
        var varVal = 'input-val-' + $(this).data('value');
        declareVariableNameList.splice(declareVariableNameList.indexOf(varName), 1);
        declareVariableValueList.splice(declareVariableValueList.indexOf(varVal), 1);
        $(this).parent().parent().parent().remove();
    });
    // Click declare variable button
    $('.declareVariable').on('click', function () {
        var isNumericValue;
        if ($(this).data('value') == 'int')
            initInput('Declare Integer');
        else if ($(this).data('value') == 'long')
            initInput('Declare Long');
        else if ($(this).data('value') == 'float')
            initInput('Declare Float');
        else if ($(this).data('value') == 'double')
            initInput('Declare Double');
        else if ($(this).data('value') == 'char')
            initInput('Declare Char');
        else if ($(this).data('value') == 'string')
            initInput('Declare String');
        if ($(this).data('value') == 'string' || $(this).data('value') == 'char') {
            createDeclareDataVariable(true, false);
            isNumericValue = false;
        }
        else {
            createDeclareDataVariable(true, true);
            isNumericValue = true;
        }
        $('#pcInputContainerLower').append(createGreenButton('Variable').addClass('col-sm-3 col-3 addVariableDeclareBtn').data('value', isNumericValue), $('<div>', { class: 'col-sm-7 col-7' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'createVariableBtn' }).data('value', $(this).data('value')).text('Create'));
    });
    // Click create variable button
    $(document).on('click', '#createVariableBtn', function () {
        clearError();
        var variableName;
        var variableValue;
        var tempAllVariableNames = {};
        for (var i = 0; i < declareVariableNameList.length; i++) {
            variableName = $('.' + declareVariableNameList[i]).val();
            variableValue = $('.' + declareVariableValueList[i]).val();
            var variable = void 0;
            if ($('#createVariableBtn').data('value') == 'int')
                variable = new Integer_1.default(variableName, variableValue);
            else if ($('#createVariableBtn').data('value') == 'long')
                variable = new Long_1.default(variableName, variableValue);
            else if ($('#createVariableBtn').data('value') == 'float')
                variable = new Float_1.default(variableName, variableValue);
            else if ($('#createVariableBtn').data('value') == 'double')
                variable = new Double_1.default(variableName, variableValue);
            else if ($('#createVariableBtn').data('value') == 'char')
                variable = new Char_1.default(variableName, variableValue);
            else
                variable = new String_1.default(variableName, variableValue);
            var returnName = variable.validateName();
            var returnValue = variable.validateValue();
            var tempSameVariableName = tempAllVariableNames[variableName] ? true : false;
            var sameVariableName = allVariableNames[variableName] ? true : false;
            if (tempSameVariableName) {
                $('.' + declareVariableNameList[i]).addClass('input-error');
                createErrorMessage('Variable name must be unique', 'pcInputErrorContainer');
                return;
            }
            else
                tempAllVariableNames[variableName] = true;
            if (!returnName.bool) {
                $('.' + declareVariableNameList[i]).addClass('input-error');
                createErrorMessage(returnName.message, 'pcInputErrorContainer');
                return;
            }
            if (sameVariableName) {
                $('.' + declareVariableNameList[i]).addClass('input-error');
                createErrorMessage('Variable name has been declared before', 'pcInputErrorContainer');
                return;
            }
            if (!returnValue.bool) {
                $('.' + declareVariableValueList[i]).addClass('input-error');
                createErrorMessage(returnValue.message, 'pcInputErrorContainer');
                return;
            }
        }
        // Insert every declared variable and declare statement instance to list
        insertToVariableList();
        // Push statement to canvas
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    // Click input variable button
    $(document).on('click', '.inputVariable', function () {
        var listVariable;
        if ($(this).data('value') == 'int') {
            initInput('Input Integer');
            listVariable = listInteger;
        }
        else if ($(this).data('value') == 'long') {
            initInput('Input Long');
            listVariable = listLong;
        }
        else if ($(this).data('value') == 'float') {
            initInput('Input Float');
            listVariable = listFloat;
        }
        else if ($(this).data('value') == 'double') {
            initInput('Input Double');
            listVariable = listDouble;
        }
        else if ($(this).data('value') == 'char') {
            initInput('Input Char');
            listVariable = listChar;
        }
        else if ($(this).data('value') == 'string') {
            initInput('Input String');
            listVariable = listString;
        }
        $('#pcInputContainer').append($('<div>', { class: 'd-flex align-items-center mb-3' }).append(createHint('Variable Name', 5), createSelect(listVariable, 7).attr('id', 'chosenVariable')));
        $('#pcInputContainerLower').append($('<div>', { class: 'col-sm-10 col-10' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'inputVariableBtn' }).data('value', $(this).data('value')).text('Select'));
    });
    // Click select input variable button
    $(document).on('click', '#inputVariableBtn', function () {
        clearError();
        if ($('#chosenVariable').find('option').filter(':selected').val() == '') {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $('#chosenVariable').addClass('input-error');
        }
        else {
            var variableName = $('#chosenVariable').find('option').filter(':selected').val();
            var variable = undefined;
            var statement = void 0;
            if ($('#inputVariableBtn').data('value') == 'int')
                variable = getVariable(listInteger, variableName);
            else if ($('#inputVariableBtn').data('value') == 'long')
                variable = getVariable(listLong, variableName);
            else if ($('#inputVariableBtn').data('value') == 'float')
                variable = getVariable(listFloat, variableName);
            else if ($('#inputVariableBtn').data('value') == 'double')
                variable = getVariable(listDouble, variableName);
            else if ($('#inputVariableBtn').data('value') == 'char')
                variable = getVariable(listChar, variableName);
            else
                variable = getVariable(listString, variableName);
            if (variable != undefined) {
                statement = new InputStatement_1.default(statementCount++, 1, variable);
                handleAdd(statement);
                restructureStatement();
                turnOffOptions();
                clearSourceCode();
                initInput('Program Input');
                drawCanvas();
            }
        }
    });
    // Click template button
    $(document).on('click', '.generateTemplate', function () {
        initInput('Program Input');
        clearError();
        clearVariableStatementData();
        clearSourceCode();
        blankTemplate();
        if ($(this).data('value') == 'declare')
            declareVariableTemplate();
        else if ($(this).data('value') == 'print')
            simplyPrintTemplate();
        else if ($(this).data('value') == 'io')
            inputOutputTemplate();
        else if ($(this).data('value') == 'nestedif')
            nestedIfTemplate();
        else if ($(this).data('value') == 'nestedfor')
            nestedForTemplate();
        else if ($(this).data('value') == 'menu')
            menuTemplate();
        else if ($(this).data('value') == 'drawsquare')
            drawSquareTemplate();
        else if ($(this).data('value') == 'oddeven')
            oddEvenTemplate();
        finishAction();
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    function deleteVariable(variable) {
        allVariableNames[variable.name] = false;
        if (variable instanceof Integer_1.default)
            listInteger.splice(listInteger.indexOf(variable), 1);
        else if (variable instanceof Long_1.default)
            listLong.splice(listLong.indexOf(variable), 1);
        else if (variable instanceof Float_1.default)
            listFloat.splice(listFloat.indexOf(variable), 1);
        else if (variable instanceof Double_1.default)
            listDouble.splice(listDouble.indexOf(variable), 1);
        else if (variable instanceof Char_1.default)
            listChar.splice(listChar.indexOf(variable), 1);
        else
            listString.splice(listString.indexOf(variable), 1);
    }
    function findVariable(variableName) {
        var tempList = getAllVariables();
        for (var i = 0; i < tempList.length; i++)
            if (tempList[i].name == variableName)
                return tempList[i];
        return undefined;
    }
    // Click output
    $(document).on('click', '.output', function () {
        if ($(this).data('value') == 'variable') {
            initInput('Output Variable');
            var listVariable = getAllVariables();
            var container = $('<div></div>').addClass('d-flex').addClass('align-items-center');
            var select = createSelect(listVariable, 7, true).attr('id', 'chosenOutputVariable');
            container.append(createHint('Variable Name', 5));
            container.append(select);
            container.addClass('mb-3');
            $('#pcInputContainer').append(container);
            var inputBtn = $('<button></button>').addClass('btn btn-primary col-sm-2 col-2').attr('id', 'outputVariableBtn').data('value', $(this).data('value')).text('Select');
            var btmContainer = $('<div>', { class: 'col-sm-12 col-12 d-flex justify-content-evenly align-items-center' }).append($('<div>', { class: 'col-sm-5 col-5' }), $('<div>', { class: 'col-sm-5 col-5 d-flex align-items-center' }).append($('<input>', { class: 'form-check-input col-sm-1 col-1 d-flex align-items-center', type: 'checkbox', id: 'new-line-variable' }), $('<label>', { class: 'form-check-label col-sm-11 col-11 d-flex align-items-center ms-2', for: 'new-line-variable' }).text('Add new line')), inputBtn);
            $('#pcInputContainerLower').append(btmContainer);
        }
        else {
            initInput('Output Text');
            createOutputTextSelection();
        }
    });
    function createOutputTextSelection() {
        var leftSide = $('<div>', { class: 'col-sm-4 col-4 mb-2' }).append($('<div>', { class: 'list-group', id: 'list-tab' }).attr('role', 'tablist').append($('<a>', { class: 'list-group-item list-group-item-action active', id: 'list-home-list' }).attr('data-bs-toggle', 'list').attr('href', '#list-home').text('Text'), $('<a>', { class: 'list-group-item list-group-item-action', id: 'list-profile-list' }).attr('data-bs-toggle', 'list').attr('href', '#list-profile').text('ASCII Code'), $('<a>', { class: 'list-group-item list-group-item-action', id: 'list-messages-list' }).attr('data-bs-toggle', 'list').attr('href', '#list-messages').text('Escape Sequence')));
        var selectAscii = $('<select>', { class: 'form-select mt-2', id: 'select-ascii-code' });
        for (var i = 0; i <= 255; i++)
            selectAscii.append($('<option></option>').val(i).text(i));
        var selectEscape = $('<select>', { class: 'form-select mt-2', id: 'select-escape-seq' }).append($('<option>').val('a').text('\\a'), $('<option>').val('b').text('\\b'), $('<option>').val('f').text('\\f'), $('<option>').val('n').text('\\n'), $('<option>').val('r').text('\\r'), $('<option>').val('t').text('\\t'), $('<option>').val('v').text('\\v'), $('<option>').val('bs').text("\\\\"), $('<option>').val("tick").text("\\'"), $('<option>').val("dtick").text("\\\""), $('<option>').val("qmark").text("\\?"));
        var rightSide = $('<div>', { class: 'col-sm-8 col-8' }).append($('<div>', { class: 'tab-content', id: 'nav-tabContent' }).append($('<div>', { class: 'tab-pane fade show active', id: 'list-home' }).attr('id', 'list-home').attr('role', 'tabpanel').append($('<strong>').text('Input Text'), $('<input>', { type: 'text', class: 'form-control mt-2', id: 'output-text-box' }), $('<div>', { class: 'col-sm-12 col-12 d-flex' }).append($('<div>', { class: 'col-sm-8 col-8 d-flex align-items-center' }).append($('<div>').append($('<input>', { type: 'checkbox', class: 'form-check-input', id: 'new-line-text' }), $('<label>', { class: 'form-check-label ms-2', for: 'new-line-text' }).text('Add new line'))), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-end' }).append($('<button>', { class: 'btn btn-primary mt-2', id: 'btn-submit-output' }).data('value', 'text').text('Create')))), $('<div>', { class: 'tab-pane fade', id: 'list-profile' }).attr('role', 'tabpanel').append($('<strong>').text('ASCII Code'), selectAscii, $('<div>', { class: 'col-sm-12 col-12 d-flex' }).append($('<div>', { class: 'col-sm-8 col-8 d-flex align-items-center' }).append($('<div>').append($('<input>', { type: 'checkbox', class: 'form-check-input', id: 'new-line-ascii' }), $('<label>', { class: 'form-check-label ms-2', for: 'new-line-ascii' }).text('Add new line'))), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-end' }).append($('<button>', { class: 'btn btn-primary mt-2', id: 'btn-submit-output' }).data('value', 'ascii').text('Create')))), $('<div>', { class: 'tab-pane fade', id: 'list-messages' }).attr('role', 'tabpanel').append($('<strong>').text('Escape Sequence'), selectEscape, $('<div>', { class: 'col-sm-12 col-12 d-flex' }).append($('<div>', { class: 'col-sm-8 col-8 d-flex align-items-center' }), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-end' }).append($('<button>', { class: 'btn btn-primary mt-2', id: 'btn-submit-output' }).data('value', 'escape').text('Create'))))));
        $('#pcInputContainer').append($('<div>', { class: 'row' }).append(leftSide, rightSide));
    }
    var ifCount = 1;
    var ifToBeValidated = [];
    var isElsed = false;
    $(document).on('click', '.selection', function () {
        ifCount = 1;
        ifToBeValidated = [];
        isElsed = false;
        if ($(this).data('value') == 'if-else') {
            initInput('Selection Properties');
            createIfSelection();
            $('#pcInputContainerLower').append($('<div>', { class: 'd-flex justify-content-end p-2 col-sm-12 col-12' }).append($('<div>', { class: 'col-sm-10 col-10' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'createIfStatementButton' }).text('Create')));
        }
        else {
            createSwitchSelection('create');
        }
    });
    function createGreenButton(text) {
        var container = $('<div>', { class: 'btn d-flex align-items-center justify-content-center bg-success p-2 text-white bg-opacity-75 p-2 mt-2' }).append($('<i>', { class: 'fas fa-plus me-2' }), $('<div>').text(text));
        return container;
    }
    function createSwitchSelection(type) {
        if (type == 'create')
            initInput('Switch Properties');
        else
            initInput('Edit Switch Statement');
        $('.all-case-container').empty();
        caseToBeValidated = [];
        isDefaulted = false;
        caseCount = 1;
        var listVariable = [];
        listVariable = getSelectedVariables('switch');
        $('#pcInputContainer').append($('<div>', { class: 'd-flex align-items-center mb-3' }).append(createHint('Variable', 5), createSelect(listVariable, 7, true).attr('id', 'chosenSwitchVariable')), $('<div>', { class: 'all-case-container' }));
        if (type == 'update') {
            var variable = clipboard.variable;
            $('#chosenSwitchVariable').find('option[value="' + variable.name + '"]').prop('selected', true);
            createUpdateCase();
        }
        createAdditionalSwitchButton(type);
    }
    function createUpdateCase() {
        var len = clipboard.caseStatement.length;
        var temp = undefined;
        var variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val();
        var variable = findVariable(variableName);
        for (var i = 0; i < len; i++) {
            temp = clipboard.caseStatement[i];
            if (temp.isDefault)
                isDefaulted = true;
            createCaseStatementInput(true, temp.isDefault, variable);
        }
    }
    var caseToBeValidated = [];
    var caseCount = 1;
    var isDefaulted = false;
    $(document).on('click', '#createSwitchCaseBtn', function () {
        handleCreateSwitchButton('create');
    });
    $(document).on('click', '#updateSwitchCaseBtn', function () {
        handleCreateSwitchButton('update');
    });
    function handleCreateSwitchButton(type) {
        clearError();
        var variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val();
        if (variableName == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
        }
        else {
            var variable = findVariable(variableName);
            var statement = createCaseStatement(variable);
            if (statement != undefined) {
                if (type == 'create')
                    handleAdd(statement);
                else {
                    var oldCaseStatement = clipboard.caseStatement;
                    var caseStatement = statement.caseStatement;
                    var tempChildStatement = [];
                    if (returnClick.option.validateMainListStatement(listStatement, statement, clipboard, false)) {
                        for (var i = 0; i < oldCaseStatement.length; i++) {
                            tempChildStatement = [];
                            if (oldCaseStatement[i].childStatement != undefined) {
                                for (var j = 0; j < oldCaseStatement[i].childStatement.length; j++)
                                    tempChildStatement.push(oldCaseStatement[i].childStatement[j]);
                            }
                            caseStatement[i].updateChildStatement(tempChildStatement);
                        }
                        clipboard.updateCaseStatement(caseStatement);
                        clipboard.variable = statement.variable;
                    }
                    else {
                        createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
                    }
                }
                finishAction();
                restructureStatement();
                turnOffOptions();
                clearSourceCode();
                initInput('Program Input');
                drawCanvas();
            }
        }
    }
    function createCaseStatement(variable) {
        var value = '';
        var tempVariable = undefined;
        var caseStatement = [];
        var result;
        var className = '';
        for (var i = 0; i < caseToBeValidated.length; i++) {
            className = '.' + caseToBeValidated[i];
            value = $(className).val();
            if (value == undefined) {
                $(className).addClass('input-error');
                createErrorMessage('Field cannot be empty!', 'pcInputErrorContainer');
                return undefined;
            }
            tempVariable = createVariableFromValue(value);
            if (tempVariable instanceof String_1.default) {
                $(className).addClass('input-error');
                createErrorMessage('Could not compare with String data type', 'pcInputErrorContainer');
                return undefined;
            }
            result = tempVariable.validateValue();
            if (!result.bool) {
                $(className).addClass('input-error');
                createErrorMessage(result.message, 'pcInputErrorContainer');
                return undefined;
            }
            caseStatement.push(new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', tempVariable, true), undefined, false));
        }
        if (isDefaulted) {
            caseStatement.push(new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', variable, true), undefined, true));
        }
        var switchStatement = new SwitchStatement_1.default(1, statementCount++, variable, undefined);
        switchStatement.updateCaseStatement(caseStatement);
        return switchStatement;
    }
    $(document).on('change', '#chosenSwitchVariable', function () {
        clearError();
        changeChosenVariableSwitch();
    });
    function changeChosenVariableSwitch() {
        $('.all-case-container').empty();
        caseToBeValidated = [];
        isDefaulted = false;
        caseCount = 1;
        var variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val();
        if (variableName != '') {
            if (lastSelectedOption == 'EDT' && clipboard instanceof SwitchStatement_1.default) {
                createUpdateCase();
            }
            else {
                var variable = findVariable(variableName);
                createCaseStatementInput(true, false, variable);
            }
        }
    }
    $(document).on('click', '.add-additional-case-btn', function () {
        clearError();
        if (!isDefaulted) {
            var variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val();
            if (variableName == '') {
                $('#chosenSwitchVariable').addClass('input-error');
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            }
            else {
                var variable = findVariable(variableName);
                createCaseStatementInput(false, false, variable);
            }
        }
        else {
            createErrorMessage('Could not add Case after Default', 'pcInputErrorContainer');
        }
    });
    $(document).on('click', '.add-default-btn', function () {
        clearError();
        if (!isDefaulted) {
            var variableName = $('#chosenSwitchVariable').find('option').filter(':selected').val();
            if (variableName == '') {
                $('#chosenSwitchVariable').addClass('input-error');
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            }
            else {
                var variable = findVariable(variableName);
                createCaseStatementInput(false, true, variable);
                isDefaulted = true;
            }
        }
        else {
            createErrorMessage('Could not add more Default', 'pcInputErrorContainer');
        }
    });
    $(document).on('click', '.rmCase', function () {
        clearError();
        var targetId = $(this).data('value');
        var targetClass = '.additional-case-container-' + targetId;
        var idx = caseToBeValidated.indexOf('case-input-' + targetId);
        caseToBeValidated.splice(idx, 1);
        if ($(targetClass).find('div').find('strong').text() == 'Default:')
            isDefaulted = false;
        $(targetClass).remove();
    });
    function createCaseStatementInput(isRequired, isDefault, variable) {
        var className = 'additional-case-container-' + caseCount;
        var inputClassName = 'case-input-' + caseCount;
        var startContainer = $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-end' });
        var textField = $('<input>').attr('type', 'text').addClass('form-control ' + inputClassName);
        var endContainer = $('<div>', { class: 'col-sm-1 col-1 d-flex justify-content-center' });
        var buttonClose = $('<button>', { class: 'btn-close rmCase' }).data('value', caseCount++);
        if (!isDefault) {
            startContainer.append($('<strong>').text('Case:'));
            caseToBeValidated.push(inputClassName);
        }
        else {
            startContainer.append($('<strong>').text('Default:'));
            textField.attr('disabled', 'true');
        }
        if (!isRequired)
            endContainer.append(buttonClose);
        $('.all-case-container').append($('<div>', { class: 'col-sm-12 col-12 mb-2 d-flex justify-content-center align-items-center ' + className }).append(startContainer, $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-center' }).text(variable.name), $('<div>', { class: 'col-sm-1 col-1 d-flex align-items-center' }).text('=='), $('<div>', { class: 'col-sm-3 col-3' }).append(textField), endContainer));
    }
    function oldCreateCaseStatementInput(isRequired, isDefault, variable) {
        var className = 'additional-case-container-' + caseCount;
        var inputClassName = 'case-input-' + caseCount;
        var container = $('<div></div>').addClass('col-sm-12 col-12 mb-2 d-flex justify-content-center align-items-center ' + className);
        var startContainer = $('<div></div>').addClass('col-sm-2 col-2 d-flex justify-content-end');
        var leftContainer = $('<div></div>').addClass('col-sm-4 col-4 d-flex justify-content-center').text(variable.name);
        var mid = $('<div></div>').addClass('col-sm-1 col-1 d-flex align-items-center').text('==');
        var rightContainer = $('<div></div>').addClass('col-sm-3 col-3');
        var textField = $('<input>').attr('type', 'text').addClass('form-control ' + inputClassName);
        var endContainer = $('<div></div>').addClass('col-sm-1 col-1 d-flex justify-content-center');
        var buttonClose = $('<button></button>').addClass('btn-close rmCase').data('value', caseCount++);
        if (!isDefault) {
            startContainer.append($('<strong></strong>').text('Case:'));
            caseToBeValidated.push(inputClassName);
        }
        else {
            startContainer.append($('<strong></strong>').text('Default:'));
            textField.attr('disabled', 'true');
        }
        if (!isRequired)
            endContainer.append(buttonClose);
        rightContainer.append(textField);
        container.append(startContainer);
        container.append(leftContainer);
        container.append(mid);
        container.append(rightContainer);
        container.append(endContainer);
        $('.all-case-container').append(container);
    }
    function createAdditionalSwitchButton(type) {
        var btnId = type == 'create' ? 'createSwitchCaseBtn' : 'updateSwitchCaseBtn';
        var text = type == 'create' ? 'Create' : 'Update';
        $('#pcInputContainerLower').append($('<div>', { class: 'col-sm-12 col-12 d-flex flex-column' }).append($('<div>', { class: 'col-sm-12 col-12' }).append(createGreenButton('Case').addClass('col-sm-3 col-3 add-additional-case-btn'), $('<div>', { class: 'col-sm-9 col-9' })), $('<div>', { class: 'col-sm-12 col-12 d-flex justify-content-center' }).append(createGreenButton('Default').addClass('col-sm-3 col-3 add-default-btn'), $('<div>', { class: 'col-sm-7 col-7' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).text(text))));
    }
    function createIfSelection() {
        var leftSide = $('<div>', { class: 'col-sm-4 col-4 mb-2' }).append($('<div>', { class: 'list-group', id: 'list-tab-if' }).attr('role', 'tablist').append($('<a>', { class: 'list-group-item list-group-item-action active', id: 'list-if-1' }).attr('data-bs-toggle', 'list').attr('href', '#list-1').text('If')), createGreenButton('Else If').addClass('additional-if').data('value', 'elif'), createGreenButton('Else').addClass('additional-if').data('value', 'else'));
        var rightSide = $('<div>', { class: 'col-sm-8 col-8 if-properties-container-' + ifCount }).append($('<div>', { class: 'tab-content', id: 'nav-tabContentIf' }).append(createNewIfTab().append(createIfPropertiesInput(true))));
        $('#pcInputContainer').append($('<div>', { class: 'row' }).append(leftSide, rightSide));
        ifToBeValidated.push(ifCount);
        ifCount++;
    }
    function createNewIfTab() {
        var id = 'list-' + ifCount;
        var tabPane = $('<div>', { class: 'tab-pane fade show', id: id }).attr('role', 'tabpanel');
        if (ifCount == 1)
            tabPane.addClass('active');
        return tabPane;
    }
    $(document).on('click', '.additional-if', function () {
        clearError();
        if ($(this).data('value') == 'elif')
            createAdditionalElif(true);
        else
            createElse(true);
    });
    function createAdditionalElif(isDeletable) {
        if (!isElsed) {
            ifToBeValidated.push(ifCount);
            $('#list-tab-if').append(createNewTab('Else If', isDeletable).data('value', 'elif'));
            var ifInputProperties = createIfPropertiesInput(true);
            var tabContent = createNewIfTab();
            tabContent.append(ifInputProperties);
            $('#nav-tabContentIf').append(tabContent);
            ifCount++;
        }
        else
            createErrorMessage('Could not add else if after else!', 'pcInputErrorContainer');
    }
    function createElse(isDeletable) {
        if (!isElsed) {
            $('#list-tab-if').append(createNewTab('Else', isDeletable).data('value', 'else'));
            isElsed = true;
        }
        else
            createErrorMessage('Could not add else after else!', 'pcInputErrorContainer');
    }
    function createNewTab(text, isDeletable) {
        var a = $('<a></a>').addClass('list-group-item list-group-item-action d-flex justify-content-between align-items-center').attr('data-bs-toggle', 'list').attr('id', 'list-if-' + ifCount).attr('href', '#list-' + ifCount);
        var word = $('<div></div>').text(text);
        var i = $('<i>', { class: 'fas fa-trash delete-if-stmnt' }).css('color', 'red').data('value', ifCount);
        a.append(word);
        if (isDeletable)
            a.append(i);
        return a;
    }
    $(document).on('click', '.delete-if-stmnt', function () {
        var targetId = $(this).data('value');
        if ($('#list-if-' + targetId).data('value') == 'else')
            isElsed = false;
        else if ($('#list-if-' + targetId).data('value') == 'elif') {
            var targetIdx = ifToBeValidated.indexOf(targetId);
            ifToBeValidated.splice(targetIdx, 1);
        }
        $('#list-' + targetId).remove();
        $('#list-if-' + targetId).remove();
        if ($('#list-1').hasClass('active') == true) {
            $("#list-tab-if a[href=\"#list-1\"]").tab('show');
        }
    });
    $(document).on('click', '.delete-additional-condition', function () {
        var targetId = $(this).data('value');
        $('#first-if-input-box-' + targetId).append(createGreenButton('Condition').addClass('p-2 px-3 mt-2 mb-2 add-if-condition-btn').data('value', targetId));
        $('#second-if-input-box-' + targetId).remove();
    });
    $(document).on('click', '#createIfStatementButton', function () {
        clearError();
        var ifStatements = [];
        var tempStatement = undefined;
        var proceed = true;
        for (var i = 0; i < ifToBeValidated.length; i++) {
            tempStatement = handleIfStatementValidation(ifToBeValidated[i]);
            if (tempStatement != undefined) {
                ifStatements.push(tempStatement);
                tempStatement = undefined;
            }
            else {
                proceed = false;
                break;
            }
        }
        if (proceed == true) {
            var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
            if (isElsed)
                ifStatements.push(new Else_1.default(1, statementCount));
            ifStatement.updateIfOperations(ifStatements);
            handleAdd(ifStatement);
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    function handleIfStatementValidation(index) {
        var logicalOperatorClassName = 'lo-if-' + index;
        var isAdditionalCondition = $("input[type='radio'][name='" + logicalOperatorClassName + "']:checked").val() == undefined ? false : true;
        var operators = ['==', '!=', '<', '>', '<=', '>='];
        var logicalOperators = ['AND', 'OR'];
        var firstVariableId1 = '#first-if-select-first-variable-' + index;
        var firstOperatorClassName = 'op-first-' + index;
        var isFirstVariable = $('#first-if-input-second-variable-' + index).val() == undefined ? true : false;
        var secondVariableId1;
        if (isFirstVariable)
            secondVariableId1 = '#first-if-select-second-variable-' + index;
        else
            secondVariableId1 = '#first-if-input-second-variable-' + index;
        var firstTemp = validateIfStatementInput(firstVariableId1, secondVariableId1, isFirstVariable);
        if (firstTemp == undefined)
            return undefined;
        var firstRadio = $("input[type='radio'][name='" + firstOperatorClassName + "']");
        var firstCheckedIdx = -1;
        for (var i = 0; i < firstRadio.length; i++) {
            if (firstRadio[i].checked == true) {
                firstCheckedIdx = i;
                break;
            }
        }
        if (!isAdditionalCondition) {
            if (index == 1)
                return new If_1.default(1, statementCount++, new Condition_1.default(firstTemp[0], operators[firstCheckedIdx], firstTemp[1], !isFirstVariable));
            else
                return new Elif_1.default(1, statementCount++, new Condition_1.default(firstTemp[0], operators[firstCheckedIdx], firstTemp[1], !isFirstVariable));
        }
        var firstVariableId2 = '#second-if-select-first-variable-' + index;
        var secondOperatorClassName = 'op-second-' + index;
        var isSecondVariable = $('#second-if-input-second-variable-' + index).val() == undefined ? true : false;
        var secondVariableId2;
        if (isSecondVariable)
            secondVariableId2 = '#second-if-select-second-variable-' + index;
        else
            secondVariableId2 = '#second-if-input-second-variable-' + index;
        var secondTemp = validateIfStatementInput(firstVariableId2, secondVariableId2, isSecondVariable);
        if (secondTemp == undefined)
            return undefined;
        var logicalRadio = $("input[type='radio'][name='" + logicalOperatorClassName + "']");
        var logicalCheckedIdx = -1;
        for (var i = 0; i < logicalRadio.length; i++) {
            if (logicalRadio[i].checked == true) {
                logicalCheckedIdx = i;
                break;
            }
        }
        var secondRadio = $("input[type='radio'][name='" + secondOperatorClassName + "']");
        var secondCheckedIdx = -1;
        for (var i = 0; i < secondRadio.length; i++) {
            if (secondRadio[i].checked == true) {
                secondCheckedIdx = i;
                break;
            }
        }
        if (index == 1)
            return new If_1.default(1, statementCount++, new Condition_1.default(firstTemp[0], operators[firstCheckedIdx], firstTemp[1], !isFirstVariable), logicalOperators[logicalCheckedIdx], new Condition_1.default(secondTemp[0], operators[secondCheckedIdx], secondTemp[1], !isSecondVariable));
        else
            return new Elif_1.default(1, statementCount++, new Condition_1.default(firstTemp[0], operators[firstCheckedIdx], firstTemp[1], !isFirstVariable), logicalOperators[logicalCheckedIdx], new Condition_1.default(secondTemp[0], operators[secondCheckedIdx], secondTemp[1], !isSecondVariable));
    }
    function validateIfStatementInput(firstValue, secondValue, isVariable) {
        var firstVariable = findVariable($(firstValue).find('option').filter(':selected').val());
        var secondVariable = undefined;
        var listVariable = [];
        if (firstVariable == undefined) {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $(firstValue).addClass('input-error');
            return undefined;
        }
        if (isVariable) {
            secondVariable = findVariable($(secondValue).find('option').filter(':selected').val());
            if (secondVariable == undefined) {
                createErrorMessage('Please select a variable', 'pcInputErrorContainer');
                $(secondValue).addClass('input-error');
                return undefined;
            }
        }
        else {
            secondVariable = createVariableFromValue($(secondValue).val());
            var res = void 0;
            res = secondVariable.validateValue();
            if (!res.bool) {
                createErrorMessage(res.message, 'pcInputErrorContainer');
                $(secondValue).addClass('input-error');
                return undefined;
            }
        }
        if ((firstVariable instanceof String_1.default && !(secondVariable instanceof String_1.default))
            || (secondVariable instanceof String_1.default && !(firstVariable instanceof String_1.default))) {
            if (firstVariable instanceof String_1.default)
                $(firstValue).addClass('input-error');
            else
                $(secondValue).addClass('input-error');
            createErrorMessage('Could not compare other data type with String', 'pcInputErrorContainer');
            return undefined;
        }
        listVariable.push(firstVariable);
        listVariable.push(secondVariable);
        return listVariable;
    }
    function createVariableFromValue(value) {
        var isNumeric = $.isNumeric(value);
        if (isNumeric) {
            if (value.includes('.'))
                return new Double_1.default('placeholder', value);
            else
                return new Long_1.default('placeholder', value);
        }
        else {
            if (value.length == 1)
                return new Char_1.default('placeholder', value);
            else
                return new String_1.default('placeholder', value);
        }
    }
    function createIfPropertiesInput(isRequired, customIfCount) {
        var boxId = isRequired ? 'first-if-input-box-' + ifCount : 'second-if-input-box-' + customIfCount;
        var dataValue = isRequired ? ifCount : customIfCount;
        var divContainer;
        if (isRequired)
            divContainer = $('<div></div>').addClass('p-2').attr('id', boxId);
        else
            divContainer = $('<div></div>').addClass('p-2 border border-1 rounded bg-light').attr('id', boxId);
        var heading1 = $('<strong></strong>').text('Variable');
        var listVariable = getAllVariables();
        var firstSelectId = isRequired ? 'first-if-select-first-variable-' + ifCount : 'second-if-select-first-variable-' + customIfCount;
        var firstSelect = createSelect(listVariable, 12, true).addClass('mb-2').attr('id', firstSelectId);
        var heading2 = $('<strong></strong>').text('Operator');
        var firstRadioSelection = createOperatorRadioSelection(isRequired, dataValue);
        var heading3 = $('<strong></strong>').text('Value Type');
        var valueTypeSelectClassName = isRequired ? 'first-value-type-select' : 'second-value-type-select';
        var valueTypeSelect = $('<select></select>').addClass('form-select mb-2').addClass(valueTypeSelectClassName).data('value', dataValue);
        valueTypeSelect.append($('<option></option>').val('variable').text('Variable'));
        valueTypeSelect.append($('<option></option>').val('custom').text('Custom Value'));
        var heading4 = $('<strong></strong>').text('Value');
        var secondSelectContainerClassName = isRequired ? 'first-second-value-container-' + ifCount : 'second-second-value-container-' + customIfCount;
        var secondSelectContainer = $('<div></div>').addClass(secondSelectContainerClassName);
        var secondSelectId = isRequired ? 'first-if-select-second-variable-' + ifCount : 'second-if-select-second-variable-' + customIfCount;
        var secondSelect = createSelect(listVariable, 12, true).addClass('mb-2').attr('id', secondSelectId);
        secondSelectContainer.append(secondSelect);
        if (!isRequired) {
            divContainer.append(createLogicalOperatorHeader(dataValue));
            divContainer.append(createLogicalOperatorSelection(dataValue));
        }
        divContainer.append(heading1);
        divContainer.append(firstSelect);
        divContainer.append(heading2);
        divContainer.append(firstRadioSelection);
        divContainer.append(heading3);
        divContainer.append(valueTypeSelect);
        divContainer.append(heading4);
        divContainer.append(secondSelectContainer);
        if (isRequired) {
            divContainer.append(createGreenButton('Condition').addClass('p-2 px-3 mt-2 mb-2 add-if-condition-btn').data('value', ifCount));
        }
        return divContainer;
    }
    function createLogicalOperatorHeader(dataValue) {
        var container = $('<div></div>').addClass('d-flex justify-content-between align-items-center');
        var strong = $('<strong></strong>').text('Logical Operator');
        var i = $('<i></i>').addClass('fas fa-trash delete-additional-condition').css('color', 'red').data('value', dataValue);
        container.append(strong);
        container.append(i);
        return container;
    }
    function createLogicalOperatorSelection(dataValue) {
        var container = $('<div></div>').addClass('col-12 col-sm-12 d-flex align-items-center mb-4 mt-2');
        var firstRadioContainer = $('<div></div>').addClass('col-4 col-sm-4 d-flex align-items-center justify-content-start');
        var secondRadioContainer = $('<div></div>').addClass('col-4 col-sm-4 d-flex align-items-center justify-content-start');
        var radioName = 'lo-if-' + dataValue;
        var firstRadio = $('<input>').addClass('me-2').attr('name', radioName).attr('type', 'radio').attr('checked', 'true');
        var firstRadioDesc = $('<strong></strong>').text('AND');
        var secondRadio = $('<input>').addClass('me-2').attr('name', radioName).attr('type', 'radio');
        var secondRadioDesc = $('<strong></strong>').text('OR');
        var separator1 = $('<div></div>').addClass('col-1 col-sm-1');
        var separator2 = $('<div></div>').addClass('col-3 col-sm-3');
        firstRadioContainer.append(firstRadio);
        firstRadioContainer.append(firstRadioDesc);
        secondRadioContainer.append(secondRadio);
        secondRadioContainer.append(secondRadioDesc);
        container.append(firstRadioContainer);
        container.append(separator1);
        container.append(secondRadioContainer);
        container.append(separator2);
        return container;
    }
    function createOperatorRadioSelection(isRequired, customIfCount) {
        var dataValue = isRequired ? ifCount : customIfCount;
        var container = $('<div></div>').addClass('col-12 col-sm-12 d-flex align-items-center mb-2 mt-2');
        var radioContainer1 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer2 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer3 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer4 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer5 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var radioContainer6 = $('<div></div>').addClass('col-2 col-sm-2 d-flex align-items-center justify-content-evenly');
        var word1 = $('<div></div>').text('==');
        var word2 = $('<div></div>').text('!=');
        var word3 = $('<div></div>').text('<');
        var word4 = $('<div></div>').text('>');
        var word5 = $('<div></div>').text('<=');
        var word6 = $('<div></div>').text('>=');
        var className;
        if (isRequired)
            className = 'op-first-' + dataValue;
        else
            className = 'op-second-' + dataValue;
        radioContainer1.append($('<input>').attr('type', 'radio').attr('name', className).attr('checked', 'true'));
        radioContainer1.append(word1);
        radioContainer2.append($('<input>').attr('type', 'radio').attr('name', className));
        radioContainer2.append(word2);
        radioContainer3.append($('<input>').attr('type', 'radio').attr('name', className));
        radioContainer3.append(word3);
        radioContainer4.append($('<input>').attr('type', 'radio').attr('name', className));
        radioContainer4.append(word4);
        radioContainer5.append($('<input>').attr('type', 'radio').attr('name', className));
        radioContainer5.append(word5);
        radioContainer6.append($('<input>').attr('type', 'radio').attr('name', className));
        radioContainer6.append(word6);
        container.append(radioContainer1);
        container.append(radioContainer2);
        container.append(radioContainer3);
        container.append(radioContainer4);
        container.append(radioContainer5);
        container.append(radioContainer6);
        return container;
    }
    $(document).on('click', '.add-if-condition-btn', function () {
        var targetId = $(this).data('value');
        var targetContainerClass = '#list-' + targetId;
        $('#first-if-input-box-' + targetId).children().last().remove();
        $(targetContainerClass).append(createIfPropertiesInput(false, targetId));
    });
    $(document).on('change', '.first-value-type-select', function () {
        var targetId = $(this).data('value');
        $('.first-second-value-container-' + targetId).empty();
        var type = $(this).find('option').filter(':selected').val();
        if (type == 'custom') {
            var input = createInputField('text').addClass('mb-2').attr('id', 'first-if-input-second-variable-' + targetId);
            $('.first-second-value-container-' + targetId).append(input);
        }
        else {
            var listVariable = getAllVariables();
            var select = createSelect(listVariable, 12, true).addClass('mb-2').attr('id', 'first-if-select-second-variable-' + targetId);
            $('.first-second-value-container-' + targetId).append(select);
        }
    });
    $(document).on('change', '.second-value-type-select', function () {
        var targetId = $(this).data('value');
        $('.second-second-value-container-' + targetId).empty();
        var type = $(this).find('option').filter(':selected').val();
        if (type == 'custom') {
            var input = createInputField('text').addClass('mb-2').attr('id', 'second-if-input-second-variable-' + targetId);
            $('.second-second-value-container-' + targetId).append(input);
        }
        else {
            var listVariable = getAllVariables();
            var select = createSelect(listVariable, 12, true).addClass('mb-2').attr('id', 'second-if-select-second-variable-' + targetId);
            $('.second-second-value-container-' + targetId).append(select);
        }
    });
    function getAllVariables() {
        var allVariables = [];
        for (var i = 0; i < listInteger.length; i++)
            allVariables.push(listInteger[i]);
        for (var i = 0; i < listLong.length; i++)
            allVariables.push(listLong[i]);
        for (var i = 0; i < listFloat.length; i++)
            allVariables.push(listFloat[i]);
        for (var i = 0; i < listDouble.length; i++)
            allVariables.push(listDouble[i]);
        for (var i = 0; i < listChar.length; i++)
            allVariables.push(listChar[i]);
        for (var i = 0; i < listString.length; i++)
            allVariables.push(listString[i]);
        return allVariables;
    }
    function getSelectedVariables(type) {
        var allVariables = [];
        for (var i = 0; i < listInteger.length; i++)
            allVariables.push(listInteger[i]);
        for (var i = 0; i < listLong.length; i++)
            allVariables.push(listLong[i]);
        if (type == 'switch') {
            for (var i = 0; i < listChar.length; i++)
                allVariables.push(listChar[i]);
        }
        else if (type == 'repetition') {
            for (var i = 0; i < listFloat.length; i++)
                allVariables.push(listFloat[i]);
            for (var i = 0; i < listDouble.length; i++)
                allVariables.push(listDouble[i]);
        }
        else if (type == 'assignment') {
            for (var i = 0; i < listChar.length; i++)
                allVariables.push(listChar[i]);
            for (var i = 0; i < listFloat.length; i++)
                allVariables.push(listFloat[i]);
            for (var i = 0; i < listDouble.length; i++)
                allVariables.push(listDouble[i]);
        }
        return allVariables;
    }
    $(document).on('click', '#outputVariableBtn', function () {
        clearError();
        var variable = getSelectedOutputVariable();
        if (variable == undefined) {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $('#chosenOutputVariable').addClass('input-error');
        }
        else {
            var isNewLine = $('#new-line-variable').is(':checked');
            var statement = new OutputStatement_1.default(statementCount++, 1, isNewLine, 'variable', variable);
            handleAdd(statement);
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    function getSelectedOutputVariable() {
        if ($('#chosenOutputVariable').find('option').filter(':selected').val() == '')
            return undefined;
        var variableName = $('#chosenOutputVariable').find('option').filter(':selected').val();
        var text = $('#chosenOutputVariable').find('option').filter(':selected').text().split(' ')[1];
        var variable = undefined;
        if (text == '(Integer)')
            variable = getVariable(listInteger, variableName);
        else if (text == '(Long)')
            variable = getVariable(listLong, variableName);
        else if (text == '(Float)')
            variable = getVariable(listFloat, variableName);
        else if (text == '(Double)')
            variable = getVariable(listDouble, variableName);
        else if (text == '(Char)')
            variable = getVariable(listChar, variableName);
        else
            variable = getVariable(listString, variableName);
        return variable;
    }
    $(document).on('click', '#btn-submit-output', function () {
        var output;
        if ($(this).data('value') == 'text') {
            var text = $('#output-text-box').val();
            var newLine = $('#new-line-text').is(':checked');
            output = new OutputStatement_1.default(statementCount++, 1, newLine, 'text', undefined, text);
        }
        else if ($(this).data('value') == 'ascii') {
            var num = $('#select-ascii-code').find('option').filter(':selected').val();
            var newLine = $('#new-line-ascii').is(':checked');
            output = new OutputStatement_1.default(statementCount++, 1, newLine, 'ascii', undefined, undefined, num, undefined);
        }
        else {
            var text = $('#select-escape-seq').find('option').filter(':selected').text();
            output = new OutputStatement_1.default(statementCount++, 1, false, 'escapeseq', undefined, undefined, undefined, text);
        }
        handleAdd(output);
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    // Repetition
    $(document).on('click', '.repetition', function () {
        createRepetitionInput('create', $(this).data('value'));
    });
    function createRepetitionInput(type, clicked) {
        var createBtn;
        var btnId;
        var text;
        if (type == 'create') {
            btnId = 'create-loop-button';
            text = 'Create';
        }
        else {
            btnId = 'update-loop-button';
            text = 'Update';
        }
        if (clicked == 'for') {
            if (type == 'create')
                initInput('For Loop Properties');
            else
                initInput('Edit For Statement');
            createForLoopCondition();
            createForLoopVariableUpdate();
            createBtn = $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).data('value', 'for').text(text);
        }
        else if (clicked == 'do-while') {
            if (type == 'create')
                initInput('Do-While Loop Properties');
            else
                initInput('Edit Do-While Statement');
            createForLoopCondition();
            createBtn = $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).data('value', 'do-while').text(text);
        }
        else if (clicked == 'while') {
            if (type == 'create')
                initInput('While Loop Properties');
            else
                initInput('Edit While Statement');
            createForLoopCondition();
            createBtn = $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).data('value', 'while').text(text);
        }
        $('#pcInputContainerLower').append($('<div>', { class: 'd-flex justify-content-end col-sm-12 col-12' }).append(createBtn));
    }
    function createForLoopCondition() {
        var listVariable = [];
        listVariable = getSelectedVariables('repetition');
        $('#pcInputContainer').append($('<div>', { class: 'p-2 border border-1 rounded bg-light mb-3' }).append($('<div>', { class: 'mb-3' }).append($('<strong>').text('Loop Condition')), $('<div>', { class: 'col-sm-12 col-12 d-flex mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Variable')), createSelect(listVariable, 7, true).attr('id', 'chosen-for-loop-variable')), $('<div>', { class: 'col-sm-12 col-12 d-flex mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Operator')), createOperatorRadioRepetition('op-for')), $('<div>', { class: 'col-sm-12 col-12 d-flex mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Value Type')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<select>', { class: 'form-select choose-for-loop-value-type' }).append($('<option>').val('variable').text('Variable'), $('<option>>').val('custom').text('Custom Value')))), $('<div>', { class: 'col-sm-12 col-12 d-flex mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Value')), $('<div>', { class: 'col-sm-7 col-7 value-container-for-loop' }).append(createSelect(listVariable, 12, true).attr('id', 'chosen-for-loop-value')))));
    }
    function createForLoopVariableUpdate() {
        $('#pcInputContainer').append($('<div>', { class: 'p-2 border border-1 rounded bg-light mb-3' }).append($('<div>', { class: 'mb-3' }).append($('<strong>').text('Variable Update')), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Update Type')), $('<div>', { class: 'col-sm-7 col-7 d-flex justify-content-center align-items-center' }).append($('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-evenly align-items-center' }).append($('<input>').attr('type', 'radio').attr('name', 'update-type-for-loop').attr('checked', 'true'), $('<div>').text('Increment')), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-evenly align-items-center' }).append($('<input>').attr('type', 'radio').attr('name', 'update-type-for-loop'), $('<div>').text('Decrement')), $('<div>', { class: 'col-sm-3 col-3' }))), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Update Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<input>', { class: 'form-control', type: 'number' }).attr('id', 'update-value-for-loop').attr('min', 1)))));
    }
    function createOperatorRadioRepetition(baseClassName) {
        var container = $('<div>', { class: 'col-sm-7 d-flex justify-content-center align-items-center' }).append($('<div>', { class: 'col-2 col-sm-2 d-flex align-items-center justify-content-evenly' }).append($('<input>', { type: 'radio', name: baseClassName }).attr('checked', 'true'), $('<div>').text('==')), $('<div>', { class: 'col-2 col-sm-2 d-flex align-items-center justify-content-evenly' }).append($('<input>', { type: 'radio', name: baseClassName }), $('<div>').text('!=')), $('<div>', { class: 'col-2 col-sm-2 d-flex align-items-center justify-content-evenly' }).append($('<input>', { type: 'radio', name: baseClassName }), $('<div>').text('<')), $('<div>', { class: 'col-2 col-sm-2 d-flex align-items-center justify-content-evenly' }).append($('<input>', { type: 'radio', name: baseClassName }), $('<div>').text('>')), $('<div>', { class: 'col-2 col-sm-2 d-flex align-items-center justify-content-evenly' }).append($('<input>', { type: 'radio', name: baseClassName }), $('<div>').text('<=')), $('<div>', { class: 'col-2 col-sm-2 d-flex align-items-center justify-content-evenly' }).append($('<input>', { type: 'radio', name: baseClassName }), $('<div>').text('>=')));
        return container;
    }
    $(document).on('change', '.choose-for-loop-value-type', function () {
        $('.value-container-for-loop').empty();
        var type = $(this).find('option').filter(':selected').val();
        if (type == 'custom') {
            var input = createInputField('text').addClass('form-control').attr('id', 'chosen-for-loop-value');
            $('.value-container-for-loop').append(input);
        }
        else {
            var listVariable = getSelectedVariables('repetition');
            var select = createSelect(listVariable, 12, true).attr('id', 'chosen-for-loop-value');
            $('.value-container-for-loop').append(select);
        }
    });
    $(document).on('click', '#create-loop-button', function () {
        clearError();
        var statement = createRepetitionStatement($(this).data('value'));
        if (statement == undefined)
            return;
        handleAdd(statement);
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    function createRepetitionStatement(statementType) {
        var statement;
        var loopInput = false;
        var updateValueInput = false;
        var isCustom = false;
        var updateValue;
        loopInput = validateRepetitionInput();
        if (!loopInput)
            return undefined;
        var variable = findVariable($('#chosen-for-loop-variable').find('option').filter(':selected').val());
        var tempVariable;
        if ($('.choose-for-loop-value-type').find('option').filter(':selected').val() == 'custom') {
            isCustom = true;
            tempVariable = createVariableFromValue($('#chosen-for-loop-value').val());
        }
        else {
            isCustom = false;
            tempVariable = findVariable($('#chosen-for-loop-value').find('option').filter(':selected').val());
        }
        var operators = ['==', '!=', '<', '>', '<=', '>='];
        var firstRadio = $("input[type='radio'][name='op-for']");
        var firstCheckedIdx = -1;
        for (var i = 0; i < firstRadio.length; i++) {
            if (firstRadio[i].checked == true) {
                firstCheckedIdx = i;
                break;
            }
        }
        if (statementType == 'for') {
            updateValueInput = validateRepetitionUpdate();
            if (!updateValueInput)
                return undefined;
            updateValue = $('#update-value-for-loop').val();
            var secondRadio = $("input[type='radio'][name='update-type-for-loop']");
            var secondCheckedIdx = -1;
            for (var i = 0; i < secondRadio.length; i++) {
                if (secondRadio[i].checked == true) {
                    secondCheckedIdx = i;
                    break;
                }
            }
            var isIncrement = secondCheckedIdx == 0 ? true : false;
            statement = new ForStatement_1.default(1, statementCount++, undefined, variable, false, isIncrement, parseInt(updateValue), new Condition_1.default(variable, operators[firstCheckedIdx], tempVariable, isCustom));
        }
        else if (statementType == 'do-while') {
            statement = new WhileStatement_1.default(1, statementCount++, false, undefined, new Condition_1.default(variable, operators[firstCheckedIdx], tempVariable, isCustom));
        }
        else {
            statement = new WhileStatement_1.default(1, statementCount++, true, undefined, new Condition_1.default(variable, operators[firstCheckedIdx], tempVariable, isCustom));
        }
        return statement;
    }
    function validateRepetitionInput() {
        var variableName = $('#chosen-for-loop-variable').find('option').filter(':selected').val();
        var tempVariable;
        var result;
        if (variableName == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('#chosen-for-loop-variable').addClass('input-error');
            return false;
        }
        if ($('.choose-for-loop-value-type').find('option').filter(':selected').val() == 'custom') {
            var value = $('#chosen-for-loop-value').val();
            tempVariable = createVariableFromValue(value);
            if (tempVariable instanceof String_1.default) {
                $('#chosen-for-loop-value').addClass('input-error');
                createErrorMessage('Could not compare with String data type', 'pcInputErrorContainer');
                return false;
            }
            result = tempVariable.validateValue();
            if (!result.bool) {
                $('#chosen-for-loop-value').addClass('input-error');
                createErrorMessage(result.message, 'pcInputErrorContainer');
                return false;
            }
        }
        else {
            var variableName_1 = $('#chosen-for-loop-value').find('option').filter(':selected').val();
            if (variableName_1 == '') {
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
                $('#chosen-for-loop-value').addClass('input-error');
                return false;
            }
        }
        return true;
    }
    function validateRepetitionUpdate() {
        var updateValue = $('#update-value-for-loop').val();
        if (updateValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('#update-value-for-loop').addClass('input-error');
            return false;
        }
        return true;
    }
    // Arithmetic Assignment
    var assignmentToBeValidated = [];
    var assignmentCount = 1;
    var assignmentStructure = {};
    $(document).on('click', '.assignment', function () {
        createAssignmentInput('create', $(this).data('value'));
    });
    function createAssignmentInput(type, clicked) {
        assignmentCount = 1;
        assignmentToBeValidated = [];
        var createBtn;
        var btnId;
        var text;
        if (type == 'create')
            text = 'Create';
        else
            text = 'Update';
        if (clicked == 'arithmetic') {
            if (type == 'create') {
                initInput('Arithmetic Assignment');
                btnId = 'create-asg-arithmetic-button';
            }
            else {
                initInput('Edit Arithmetic Assignment');
                btnId = 'update-asg-arithmetic-button';
            }
            createArithmeticAssignmentHeader();
            createArithmeticAssignmentInput();
            createBtn = $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).text(text);
        }
        else if (clicked == 'string') {
            if (type == 'create') {
                initInput('String Assignment');
                btnId = 'create-asg-string-button';
            }
            else {
                initInput('Edit String Assignment');
                btnId = 'update-asg-string-button';
            }
            createActionTypeChoice();
            createGetStringLengthInput();
            createBtn = $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).text(text);
        }
        else if (clicked == 'variable') {
            if (type == 'create') {
                initInput('Variable Assignment');
                btnId = 'create-asg-variable-button';
            }
            else {
                initInput('Edit Variable Assignment');
                btnId = 'update-asg-variable-button';
            }
            createVariableAssignmentInput();
            createBtn = $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: btnId }).text(text);
        }
        $('#pcInputContainerLower').append($('<div>', { class: 'd-flex justify-content-end col-sm-12 col-12' }).append(createBtn));
    }
    // String Assignment
    $(document).on('click', '#create-asg-string-button', function () {
        clearError();
        var statement = undefined;
        if ($('.choose-action-type').find('option').filter(':selected').val() == 'length')
            statement = createStringAssignmentLength();
        else
            statement = createStringAssignmentSub();
        if (statement != undefined) {
            handleAdd(statement);
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    function createStringAssignmentLength() {
        var firstValue = $('.first-asg-string-value').find('select').find('option').filter(':selected').val();
        var secondValue = $('.second-asg-string-value').find('select').find('option').filter(':selected').val();
        var firstVariable;
        var secondVariable;
        if (firstValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('.first-asg-string-value').find('select').addClass('input-error');
            return undefined;
        }
        if (secondValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('.second-asg-string-value').find('select').addClass('input-error');
            return undefined;
        }
        firstVariable = findVariable(firstValue);
        secondVariable = findVariable(secondValue);
        var statement = new AssignmentStatement_1.default(statementCount++, 1, 'length', firstVariable, undefined, undefined, undefined, secondVariable, undefined, undefined, undefined);
        return statement;
    }
    function createStringAssignmentSub() {
        var firstValue = $('.first-asg-string-value').find('select').find('option').filter(':selected').val();
        var secondValue = $('.second-asg-string-value').find('select').find('option').filter(':selected').val();
        var firstVariable;
        var secondVariable;
        var start;
        var length;
        if (firstValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('.first-asg-string-value').find('select').addClass('input-error');
            return undefined;
        }
        if (secondValue == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('.second-asg-string-value').find('select').addClass('input-error');
            return undefined;
        }
        firstVariable = findVariable(firstValue);
        secondVariable = findVariable(secondValue);
        start = $('.begin-idx-string').val();
        if (start == '') {
            createErrorMessage('Input field cannot be empty', 'pcInputErrorContainer');
            $('.begin-idx-string').addClass('input-error');
            return undefined;
        }
        else if (parseInt(start) < 1) {
            createErrorMessage('Start position must be greater than 0', 'pcInputErrorContainer');
            $('.begin-idx-string').addClass('input-error');
            return undefined;
        }
        else if (parseInt(start) > secondVariable.value.length) {
            createErrorMessage('Start position must be less than String length', 'pcInputErrorContainer');
            $('.begin-idx-string').addClass('input-error');
            return undefined;
        }
        length = $('.length-idx-string').val();
        if (length == '') {
            createErrorMessage('Input field cannot be empty', 'pcInputErrorContainer');
            $('.length-idx-string').addClass('input-error');
            return undefined;
        }
        else if (parseInt(length) < 1) {
            createErrorMessage('Length must be greater than 0', 'pcInputErrorContainer');
            $('.length-idx-string').addClass('input-error');
            return undefined;
        }
        else if (parseInt(start) + (parseInt(length) - 1) > secondVariable.value.length) {
            createErrorMessage('String overflow', 'pcInputErrorContainer');
            $('.length-idx-string').addClass('input-error');
            return undefined;
        }
        var statement = new AssignmentStatement_1.default(statementCount++, 1, 'sub', firstVariable, undefined, undefined, undefined, secondVariable, undefined, parseInt(start), parseInt(length));
        return statement;
    }
    $(document).on('change', '.choose-action-type', function () {
        $('.action-select-container').remove();
        if ($(this).find('option').filter(':selected').val() == 'length') {
            createGetStringLengthInput();
        }
        else if ($(this).find('option').filter(':selected').val() == 'sub') {
            createSubstringInput();
        }
    });
    function createActionTypeChoice() {
        var container = $('<div>', { class: 'p-2 border border-1 rounded bg-light col-sm-12 col-12 mb-3' }).append($('<div>', { class: 'mb-3' }).append($('<strong>').text('Action Type')), $('<div>', { class: 'col-sm-12 col-12 mb-3 d-flex align-items-center' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Action')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<select>', { class: 'form-select choose-action-type' }).append($('<option>').val('length').text('Get String Length'), $('<option>').val('sub').text('Get Part of String')))));
        $('#pcInputContainer').append(container);
    }
    function createGetStringLengthInput() {
        var container = $('<div>', { class: 'p-2 border border-1 rounded bg-light col-sm-12 col-12 mb-3 action-select-container' }).append($('<div>', { class: 'mb-3' }).append($('<strong>').text('String Length')), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Target Variable (Integer)')), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Variable (String)')), $('<div>', { class: 'col-sm-1 col-1' })), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append(createSelect(listInteger, 12, false).addClass('first-asg-string-value')), $('<div>', { class: 'col-sm-1 col-1 d-flex justify-content-center' }).text('='), $('<div>', { class: 'col-sm-5 col-5' }).append(createSelect(listString, 12, false).addClass('second-asg-string-value')), $('<div>', { class: 'col-sm-1 col-1' })));
        $('#pcInputContainer').append(container);
    }
    function createSubstringInput() {
        var container = $('<div>', { class: 'p-2 border border-1 rounded bg-light col-sm-12 col-12 mb-3 action-select-container' }).append($('<div>', { class: 'mb-3' }).append($('<strong>').text('Part of String')), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Target Variable (String)')), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Variable (String)')), $('<div>', { class: 'col-sm-1 col-1' })), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append(createSelect(listString, 12, false).addClass('first-asg-string-value')), $('<div>', { class: 'col-sm-1 col-1 d-flex justify-content-center' }).text('='), $('<div>', { class: 'col-sm-5 col-5' }).append(createSelect(listString, 12, false).addClass('second-asg-string-value')), $('<div>', { class: 'col-sm-1 col-1' })), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Start Position')), $('<div>', { class: 'col-sm-1 col-1' })), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-5 col-5' }).append($('<input>', { type: 'number', class: 'form-control begin-idx-string' })), $('<div>', { class: 'col-sm-1 col-1' })), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Length')), $('<div>', { class: 'col-sm-1 col-1' })), $('<div>', { class: 'col-12 col-sm-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }), $('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-5 col-5' }).append($('<input>', { type: 'number', class: 'form-control length-idx-string' })), $('<div>', { class: 'col-sm-1 col-1' })));
        $('#pcInputContainer').append(container);
    }
    // Arithmetic Assignment
    function createArithmeticAssignmentHeader() {
        var listVariable = getSelectedVariables('assignment');
        var container = $('<div>', { class: 'p-2 border border-1 rounded bg-light mb-3' }).append($('<div>', { class: 'mb-3' }).append($('<strong>').text('Target Variable')), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Variable')), $('<div>', { class: 'col-sm-7 col-7' }).append(createSelect(listVariable, 12, true).addClass('selected-target-variable-asg'))));
        $('#pcInputContainer').append(container);
    }
    function createArithmeticAssignmentInput() {
        var listVariable = getSelectedVariables('assignment');
        var firstValueTypeClassName = 'form-select first-select-value-type first-select-value-type-' + assignmentCount;
        var secondValueTypeClassName = 'form-select second-select-value-type second-select-value-type-' + assignmentCount;
        var firstValueContainerClassName = 'first-assignment-value-container first-assignment-value-container-' + assignmentCount;
        var secondValueContainerClassName = 'second-assignment-value-container second-assignment-value-container-' + assignmentCount;
        var container = $('<div>', { class: 'p-2 border border-1 rounded bg-light mb-3' }).append($('<input>', { type: 'hidden', name: 'arithmetic-asg-' + assignmentCount }), $('<div>', { class: 'mb-3' }).append($('<strong>').text('Arithmetic Operation ' + assignmentCount)), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Value Type')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<select>', { class: firstValueTypeClassName }).append($('<option>', { value: 'variable', text: 'Variable' }), $('<option>', { value: 'custom', text: 'Custom Value' }), $('<option>', { value: 'operation', text: 'Arithmetic Operation' })).data('value', assignmentCount))), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3 ' + firstValueContainerClassName }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('First Value')), $('<div>', { class: 'col-sm-7 col-7' }).append(createSelect(listVariable, 12, true).addClass('first-value-' + assignmentCount))).data('value', assignmentCount), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Operator')), $('<div>', { class: 'col-sm-7 col-7 d-flex justify-content-center align-items-center' }).append($('<div>', { class: 'col-sm-1 col-1' }), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount, checked: 'true' }), $('<div>').text('+')), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount }), $('<div>').text('-')), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount }), $('<div>').text('/')), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount }), $('<div>').text('*')), $('<div>', { class: 'col-sm-2 col-2 d-flex justify-content-evenly align-items-center' }).append($('<input>', { type: 'radio', name: 'op-asg-' + assignmentCount }), $('<div>').text('%')), $('<div>', { class: 'col-sm-1 col-1' }))), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3' }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Value Type')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<select>', { class: secondValueTypeClassName }).append($('<option>', { value: 'variable', text: 'Variable' }), $('<option>', { value: 'custom', text: 'Custom Value' }), $('<option>', { value: 'operation', text: 'Arithmetic Operation' })).data('value', assignmentCount))), $('<div>', { class: 'col-sm-12 col-12 d-flex align-items-center mb-3 ' + secondValueContainerClassName }).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Second Value')), $('<div>', { class: 'col-sm-7 col-7' }).append(createSelect(listVariable, 12, true).addClass('second-value-' + assignmentCount))).data('value', assignmentCount));
        assignmentToBeValidated.push(assignmentCount);
        assignmentCount++;
        $('#pcInputContainer').append(container);
    }
    $(document).on('change', '.first-select-value-type', function () {
        var targetId = $(this).data('value');
        var selectValue = $('.first-select-value-type-' + targetId).find('option').filter(':selected').val();
        $('.first-assignment-value-container-' + targetId).empty();
        if (selectValue != 'operation')
            deleteFirstChild(targetId);
        if (selectValue == 'custom') {
            $('.first-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('First Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<input>', { class: 'form-control', type: 'text' }).addClass('first-value-' + targetId)));
        }
        else if (selectValue == 'variable') {
            var listVariable = getSelectedVariables('assignment');
            $('.first-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('First Value')), $('<div>', { class: 'col-sm-7 col-7' }).append(createSelect(listVariable, 12, true).addClass('first-value-' + targetId)));
        }
        else {
            $('.first-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('First Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<strong>').text('Arithmetic Operation ' + assignmentCount)));
            assignmentStructure['first-value-' + targetId] = assignmentCount;
            createArithmeticAssignmentInput();
        }
    });
    $(document).on('change', '.second-select-value-type', function () {
        var targetId = $(this).data('value');
        var selectValue = $('.second-select-value-type-' + targetId).find('option').filter(':selected').val();
        $('.second-assignment-value-container-' + targetId).empty();
        if (selectValue != 'operation')
            deleteSecondChild(targetId);
        if (selectValue == 'custom') {
            $('.second-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Second Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<input>', { class: 'form-control', type: 'text' }).addClass('second-value-' + targetId)));
        }
        else if (selectValue == 'variable') {
            var listVariable = getSelectedVariables('assignment');
            $('.second-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Second Value')), $('<div>', { class: 'col-sm-7 col-7' }).append((createSelect(listVariable, 12, true)).addClass('second-value-' + targetId)));
        }
        else {
            $('.second-assignment-value-container-' + targetId).append($('<div>', { class: 'col-sm-5 col-5' }).append($('<strong>').text('Second Value')), $('<div>', { class: 'col-sm-7 col-7' }).append($('<strong>').text('Arithmetic Operation ' + assignmentCount)));
            assignmentStructure['second-value-' + targetId] = assignmentCount;
            createArithmeticAssignmentInput();
        }
    });
    function deleteFirstChild(targetId) {
        var temp = undefined;
        var idx;
        temp = assignmentStructure['first-value-' + targetId];
        $("input[name='arithmetic-asg-" + temp + "']").parent().remove();
        assignmentStructure['first-value-' + targetId] = undefined;
        idx = assignmentToBeValidated.indexOf(parseInt(temp));
        if (idx != -1)
            assignmentToBeValidated.splice(idx, 1);
        deleteChildAssignment(temp);
    }
    function deleteSecondChild(targetId) {
        var temp = undefined;
        var idx;
        temp = assignmentStructure['second-value-' + targetId];
        $("input[name='arithmetic-asg-" + temp + "']").parent().remove();
        assignmentStructure['second-value-' + targetId] = undefined;
        idx = assignmentToBeValidated.indexOf(parseInt(temp));
        if (idx != -1)
            assignmentToBeValidated.splice(idx, 1);
        deleteChildAssignment(temp);
    }
    function deleteChildAssignment(targetId) {
        var temp = undefined;
        var idx;
        temp = assignmentStructure['first-value-' + targetId];
        if (temp != undefined) {
            $("input[name='arithmetic-asg-" + temp + "']").parent().remove();
            assignmentStructure['first-value-' + targetId] = undefined;
            idx = assignmentToBeValidated.indexOf(parseInt(temp));
            if (idx != -1)
                assignmentToBeValidated.splice(idx, 1);
            deleteChildAssignment(temp);
        }
        temp = assignmentStructure['second-value-' + targetId];
        if (temp != undefined) {
            $("input[name='arithmetic-asg-" + temp + "']").parent().remove();
            assignmentStructure['second-value-' + targetId] = undefined;
            idx = assignmentToBeValidated.indexOf(parseInt(temp));
            if (idx != -1)
                assignmentToBeValidated.splice(idx, 1);
            deleteChildAssignment(temp);
        }
    }
    $(document).on('click', '#create-asg-arithmetic-button', function () {
        clearError();
        var temp = true;
        var value;
        value = $('.selected-target-variable-asg').find('option').filter(':selected').val();
        if (value == '') {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $('.selected-target-variable-asg').addClass('input-error');
            return;
        }
        for (var i = 0; i < assignmentToBeValidated.length; i++) {
            temp = validateArithmeticAssignmentInput(assignmentToBeValidated[i]);
            if (!temp)
                return;
        }
        var assignmentStatement = createArithmeticStatement();
        handleAdd(assignmentStatement);
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    function validateArithmeticAssignmentInput(idx) {
        var firstValueType = $('.first-select-value-type-' + idx).find('option').filter(':selected').val();
        var secondValueType = $('.second-select-value-type-' + idx).find('option').filter(':selected').val();
        var firstVariable;
        var secondVariable;
        if (firstValueType != 'operation') {
            firstVariable = getValue(firstValueType, '.first-value-' + idx);
            if (firstVariable == undefined)
                return false;
        }
        if (secondValueType != 'operation') {
            secondVariable = getValue(secondValueType, '.second-value-' + idx);
            if (secondVariable == undefined)
                return false;
        }
        return true;
    }
    function getValue(valueType, className) {
        var variable;
        if (valueType == 'custom') {
            var value = $(className).val();
            var result = void 0;
            if (value == '') {
                createErrorMessage('Input field cannot be empty', 'pcInputErrorContainer');
                $(className).addClass('input-error');
                return undefined;
            }
            variable = createVariableFromValue(value);
            if (variable instanceof String_1.default) {
                createErrorMessage('Could not assign with String data type', 'pcInputErrorContainer');
                $(className).addClass('input-error');
                return undefined;
            }
            result = variable.validateValue();
            if (!result.bool) {
                createErrorMessage(result.message, 'pcInputErrorContainer');
                $(className).addClass('input-error');
                return undefined;
            }
        }
        else if (valueType == 'variable') {
            var variableName = void 0;
            variableName = $(className).find('select').find('option').filter(':selected').val();
            if (variableName == '') {
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
                $(className).find('select').addClass('input-error');
                return undefined;
            }
            variable = findVariable(variableName);
        }
        return variable;
    }
    function createArithmeticStatement() {
        var firstValueType = $('.first-select-value-type-1').find('option').filter(':selected').val();
        var secondValueType = $('.second-select-value-type-1').find('option').filter(':selected').val();
        var firstVariable = undefined;
        var secondVariable = undefined;
        var firstChild = undefined;
        var secondChild = undefined;
        var isFirstCustom = false;
        var isSecondCustom = false;
        var operators = ['+', '-', '/', '*', '%'];
        var radioClassName = 'op-asg-1';
        var value;
        var targetVariable;
        var listArithmetic = [];
        var listOperator = [];
        var listIsCustom = [];
        value = $('.selected-target-variable-asg').find('option').filter(':selected').val();
        targetVariable = findVariable(value);
        if (firstValueType == 'operation') {
            var temp = assignmentStructure['first-value-1'];
            firstChild = createArithmeticAssignment(temp);
            listArithmetic.push(firstChild);
        }
        else if (firstValueType == 'variable') {
            var variableName = void 0;
            variableName = $('.first-value-1').find('select').find('option').filter(':selected').val();
            firstVariable = findVariable(variableName);
            listArithmetic.push(firstVariable);
            listIsCustom.push(false);
        }
        else {
            isFirstCustom = true;
            var value_1 = $('.first-value-1').val();
            firstVariable = createVariableFromValue(value_1);
            listArithmetic.push(firstVariable);
            listIsCustom.push(true);
        }
        if (secondValueType == 'operation') {
            var temp = assignmentStructure['second-value-1'];
            secondChild = createArithmeticAssignment(temp);
            listArithmetic.push(secondChild);
        }
        else if (secondValueType == 'variable') {
            var variableName = void 0;
            variableName = $('.second-value-1').find('select').find('option').filter(':selected').val();
            secondVariable = findVariable(variableName);
            listArithmetic.push(secondVariable);
            listIsCustom.push(false);
        }
        else {
            isSecondCustom = true;
            var value_2 = $('.second-value-1').val();
            secondVariable = createVariableFromValue(value_2);
            listArithmetic.push(secondVariable);
            listIsCustom.push(true);
        }
        var radio = $("input[type='radio'][name='" + radioClassName + "']");
        var checkedIdx = -1;
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked == true) {
                checkedIdx = i;
                break;
            }
        }
        listOperator.push(operators[checkedIdx]);
        var assignmentStatement = new AssignmentStatement_1.default(statementCount++, 1, 'arithmetic', targetVariable, listArithmetic, listOperator, listIsCustom, undefined, undefined, undefined, undefined);
        return assignmentStatement;
    }
    function createArithmeticAssignment(idx) {
        var firstValueType = $('.first-select-value-type-' + idx).find('option').filter(':selected').val();
        var secondValueType = $('.second-select-value-type-' + idx).find('option').filter(':selected').val();
        var firstVariable = undefined;
        var secondVariable = undefined;
        var firstChild = undefined;
        var secondChild = undefined;
        var isFirstCustom = false;
        var isSecondCustom = false;
        var operators = ['+', '-', '/', '*', '%'];
        var radioClassName = 'op-asg-' + idx;
        if (firstValueType == 'operation') {
            var temp = assignmentStructure['first-value-' + idx];
            firstChild = createArithmeticAssignment(temp);
        }
        else if (firstValueType == 'variable') {
            var variableName = void 0;
            variableName = $('.first-value-' + idx).find('select').find('option').filter(':selected').val();
            firstVariable = findVariable(variableName);
        }
        else {
            isFirstCustom = true;
            var value = $('.first-value-' + idx).val();
            firstVariable = createVariableFromValue(value);
        }
        if (secondValueType == 'operation') {
            var temp = assignmentStructure['second-value-' + idx];
            secondChild = createArithmeticAssignment(temp);
        }
        else if (secondValueType == 'variable') {
            var variableName = void 0;
            variableName = $('.second-value-' + idx).find('select').find('option').filter(':selected').val();
            secondVariable = findVariable(variableName);
        }
        else {
            isSecondCustom = true;
            var value = $('.second-value-' + idx).val();
            secondVariable = createVariableFromValue(value);
        }
        var radio = $("input[type='radio'][name='" + radioClassName + "']");
        var checkedIdx = -1;
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked == true) {
                checkedIdx = i;
                break;
            }
        }
        return new Arithmetic_1.default(firstVariable, secondVariable, firstChild, secondChild, operators[checkedIdx], isFirstCustom, isSecondCustom);
    }
    // Assignment Variable
    function createVariableAssignmentInput() {
        var listVariable = getAllVariables();
        var container = $('<div></div>');
        var container1 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3 mt-2');
        var variableTitle = $('<div></div>').append($('<strong></strong>').text('Variable')).addClass('col-sm-5 col-5');
        var variableSelect = createSelect(listVariable, 7, true).attr('id', 'chosen-asg-variable');
        var container2 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3');
        var valueTypeTitle = $('<div></div>').append($('<strong></strong>').text('Value Type')).addClass('col-sm-5 col-5');
        var valueTypeContainer = $('<div></div>').addClass('col-sm-7 col-7');
        var valueTypeSelect = $('<select></select>').addClass('form-select choose-asg-value-type');
        valueTypeSelect.append($('<option></option>').val('variable').text('Variable'));
        valueTypeSelect.append($('<option></option>').val('custom').text('Custom Value'));
        var container3 = $('<div></div>').addClass('col-sm-12 col-12 d-flex mb-3');
        var valueTitle = $('<div></div>').append($('<strong></strong>').text('Value')).addClass('col-sm-5 col-5');
        var valueContainer = $('<div></div>').addClass('col-sm-7 col-7 value-container-asg');
        var valueSelect = createSelect(listVariable, 12, true).attr('id', 'chosen-asg-value');
        container1.append(variableTitle);
        container1.append(variableSelect);
        container2.append(valueTypeTitle);
        valueTypeContainer.append(valueTypeSelect);
        container2.append(valueTypeContainer);
        container3.append(valueTitle);
        valueContainer.append(valueSelect);
        container3.append(valueContainer);
        container.append(container1);
        container.append(container2);
        container.append(container3);
        $('#pcInputContainer').append(container);
    }
    $(document).on('change', '.choose-asg-value-type', function () {
        $('.value-container-asg').empty();
        var input;
        if ($(this).find('option').filter(':selected').val() == 'custom') {
            input = $('<input>').attr('type', 'text').addClass('form-control').attr('id', 'chosen-asg-value');
        }
        else {
            var listVariable = getAllVariables();
            input = createSelect(listVariable, 12, true).attr('id', 'chosen-asg-value');
        }
        $('.value-container-asg').append(input);
    });
    $(document).on('click', '#create-asg-variable-button', function () {
        clearError();
        var statement = createVariableAssignment();
        if (statement != undefined) {
            handleAdd(statement);
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    function createVariableAssignment() {
        var firstVariableName = $('#chosen-asg-variable').find('option').filter(':selected').val();
        var firstVariable;
        var secondVariable;
        var isCustom = false;
        var result;
        if (firstVariableName == '') {
            createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
            $('#chosen-asg-variable').addClass('input-error');
            return undefined;
        }
        firstVariable = findVariable(firstVariableName);
        if ($('.choose-asg-value-type').find('option').filter(':selected').val() == 'custom') {
            isCustom = true;
            var value = $('#chosen-asg-value').val();
            if (value == '') {
                createErrorMessage('Input field cannot be empty', 'pcInputErrorContainer');
                $('#chosen-asg-value').addClass('input-error');
                return undefined;
            }
            secondVariable = createVariableFromValue(value);
            result = secondVariable.validateValue();
            if (!result.bool) {
                $('#chosen-asg-value').addClass('input-error');
                createErrorMessage(result.message, 'pcInputErrorContainer');
                return undefined;
            }
        }
        else {
            isCustom = false;
            var value = $('#chosen-asg-value').find('option').filter(':selected').val();
            if (value == '') {
                createErrorMessage('Please choose a variable', 'pcInputErrorContainer');
                $('#chosen-asg-value').addClass('input-error');
                return undefined;
            }
            secondVariable = findVariable(value);
        }
        if (firstVariable instanceof String_1.default || secondVariable instanceof String_1.default) {
            if (firstVariable instanceof String_1.default && secondVariable instanceof String_1.default) { }
            else {
                $('#chosen-asg-value').addClass('input-error');
                createErrorMessage('Could not assign other data type with String data type', 'pcInputErrorContainer');
                return undefined;
            }
        }
        var statement = new AssignmentStatement_1.default(statementCount++, 1, 'variable', firstVariable, undefined, undefined, undefined, secondVariable, isCustom, undefined, undefined);
        return statement;
    }
    // Canvas logic
    initializeCanvas();
    var blockCanvasInstance; // instance of Class Canvas
    var canvas;
    var option = undefined;
    // Variables to handle canvas interaction (add, mov, pst, edt)
    var clipboard = undefined;
    var lastSelectedOption = undefined;
    var returnClick = undefined;
    // Initialize Canvas
    function initializeCanvas() {
        canvas = document.getElementById('block-code-canvas');
        resizeCanvas();
        handleCanvasClick();
        blockCanvasInstance = new Canvas_1.default(canvas, canvas.getContext('2d'), 40, 30, 5);
        setTimeout(function () {
            option = new Option_1.default('special', blockCanvasInstance.PADDING, blockCanvasInstance.PADDING, blockCanvasInstance.LINE_HEIGHT, blockCanvasInstance.LINE_HEIGHT, undefined);
            option.draw(blockCanvasInstance);
            blockCanvasInstance.updateLastPosition();
        }, 50);
    }
    // Resize Canvas
    function resizeCanvas() {
        var cv;
        var con = $("#block-code-container");
        cv = $("#block-code-canvas")[0];
        var aspect = cv.height / cv.width;
        var width = con.width();
        var height = con.height();
        width = width * 2;
        if (width < 1034) {
            width = 1034;
        }
        canvas.width = width;
        canvas.height = height * 10;
    }
    function drawCanvas() {
        blockCanvasInstance.clearCanvas();
        var statement;
        option.draw(blockCanvasInstance);
        blockCanvasInstance.updateLastPosition();
        for (var i = 0; i < listStatement.length; i++) {
            statement = listStatement[i];
            statement.writeToCanvas(blockCanvasInstance);
        }
    }
    function turnOffOptions() {
        if (option != undefined)
            option.isSelectionActive = false;
        if (listStatement != undefined)
            for (var i = 0; i < listStatement.length; i++)
                listStatement[i].turnOffOption();
    }
    // Handle Event
    function handleCanvasClick() {
        canvas.addEventListener('click', function (event) {
            $('#bcErrorContainer').empty();
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            var statement;
            returnClick = option.clickOption(blockCanvasInstance, x, y);
            if (!returnClick) {
                for (var i = 0; i < listStatement.length; i++) {
                    statement = listStatement[i];
                    returnClick = statement.callClickEvent(blockCanvasInstance, x, y);
                    if (returnClick != undefined)
                        break;
                }
            }
            if (returnClick != undefined) {
                if (returnClick.isClose != undefined) {
                    finishAction();
                    return;
                }
                if (returnClick.option.optionName == 'ADD') {
                    clipboard = returnClick.statement;
                    lastSelectedOption = returnClick.option.optionName;
                }
                else if (returnClick.option.optionName == 'PST') {
                    handlePaste();
                }
                else if (returnClick.option.optionName == 'MOV') {
                    clipboard = returnClick.statement;
                    lastSelectedOption = returnClick.option.optionName;
                }
                else if (returnClick.option.optionName == 'CPY') {
                    if (returnClick.statement instanceof DeclareStatement_1.default) {
                        createErrorMessage('Could not copy declare statement!', 'bcErrorContainer');
                        finishAction();
                        restructureStatement();
                        turnOffOptions();
                        clearSourceCode();
                        initInput('Program Input');
                        drawCanvas();
                        return;
                    }
                    clipboard = cloneStatement(returnClick.statement);
                    lastSelectedOption = returnClick.option.optionName;
                }
                else if (returnClick.option.optionName == 'EDT') {
                    $('html, body').animate({
                        scrollTop: $('#accordionProgramInput').offset().top
                    }, 300);
                    clipboard = returnClick.option.parent;
                    lastSelectedOption = returnClick.option.optionName;
                    handleEdit();
                }
                else if (returnClick.option.optionName == 'DEL') {
                    clipboard = returnClick.statement;
                    lastSelectedOption = returnClick.option.optionName;
                    handleDelete();
                }
            }
        });
    }
    function handleAdd(statement) {
        var returnPaste;
        // Initialize
        if (lastSelectedOption == undefined && clipboard == undefined && returnClick == undefined) {
            listStatement.push(statement);
        }
        // Action taken, user chose ADD
        else if (lastSelectedOption == 'ADD' && returnClick != undefined) {
            returnPaste = returnClick.option.addStatement(listStatement, statement, clipboard, returnClick.option.optionId);
            if (returnPaste.result == true) {
                finishAction();
                listStatement = returnPaste.listStatement;
            }
            else {
                if (statement instanceof DeclareStatement_1.default)
                    deleteVariable(statement.variable);
                createErrorMessage('Could not add statement here', 'bcErrorContainer');
                finishAction();
            }
        }
    }
    function handlePaste() {
        var returnPaste;
        if (clipboard == undefined) {
            createErrorMessage('Clipboard is empty!', 'bcErrorContainer');
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
            return;
        }
        if (clipboard.findStatement(returnClick.statement)) {
            createErrorMessage('Could not paste statement here!', 'bcErrorContainer');
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
            return;
        }
        var splitted = returnClick.option.optionId.split('-');
        var isInner = splitted[splitted.length - 1] == 'inner' ? true : false;
        if (lastSelectedOption == 'MOV' || lastSelectedOption == 'CPY') {
            returnPaste = returnClick.option.handlePaste(listStatement, clipboard, returnClick.statement, isInner, lastSelectedOption);
            listStatement = returnPaste.listStatement;
            if (returnPaste.result == false) {
                createErrorMessage('Could not paste statement here!', 'bcErrorContainer');
            }
        }
        finishAction();
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    }
    function handleEdit() {
        if (clipboard instanceof DeclareStatement_1.default) {
            initInput('Edit Declare Statement');
            createEditDeclare();
        }
        else if (clipboard instanceof InputStatement_1.default) {
            initInput('Edit Input Statement');
            createEditInput();
        }
        else if (clipboard instanceof OutputStatement_1.default) {
            createEditOutput();
        }
        else if (clipboard instanceof IfStatement_1.default) {
            initInput('Edit If Statement');
            createEditIfElse();
        }
        else if (clipboard instanceof SwitchStatement_1.default) {
            initInput('Edit Switch Statement');
            createSwitchSelection('update');
        }
        else if (clipboard instanceof ForStatement_1.default) {
            createRepetitionInput('update', 'for');
        }
        else if (clipboard instanceof WhileStatement_1.default) {
            if (clipboard.isWhile)
                createRepetitionInput('update', 'while');
            else
                createRepetitionInput('update', 'do-while');
        }
        else if (clipboard instanceof AssignmentStatement_1.default) {
            if (clipboard.type == 'variable') {
                createAssignmentInput('update', 'variable');
            }
            else if (clipboard.type == 'arithmetic') {
                createAssignmentInput('update', 'arithmetic');
            }
            else {
                createAssignmentInput('update', 'string');
            }
        }
    }
    // Edit Declare Statement
    function createEditDeclare() {
        var targetVariable = clipboard.variable;
        var variableClassName = 'var-name-' + variableIndex;
        var inputClassName = 'input-val-' + variableIndex;
        var isNumber = false;
        if (targetVariable instanceof Char_1.default || targetVariable instanceof String_1.default)
            isNumber = false;
        else
            isNumber = true;
        var hintContainer = $('<div>', { class: 'col-sm-12 col-12 mb-2 d-flex' }).append(createHint('Variable Name', 5), createWhiteSpace(1), createHint('Initial Value', 5));
        var valueField = isNumber ? createInputField('number').addClass(inputClassName).val(targetVariable.value) : createInputField('text').addClass(inputClassName).val(targetVariable.value);
        var inputContainer = $('<div>', { class: 'col-sm-12 col-12 mb-4 d-flex align-items-center' }).append($('<div>', { class: 'col-sm-5 col-5' }).append(createInputField('text').addClass(variableClassName).val(targetVariable.name).attr('disabled', 'true')), createWhiteSpace(1), $('<div>', { class: 'col-sm-5 col-5' }).append(valueField));
        declareVariableNameList.push(variableClassName);
        declareVariableValueList.push(inputClassName);
        $('#pcInputContainer').append($('<div>', { class: 'col-sm-12 col-12' }).append(hintContainer, inputContainer));
        $('#pcInputContainerLower').append($('<div>', { class: 'col-sm-10 col-10' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'editDeclareVariableBtn' }).text('Update'));
    }
    // Update Declare Statement 
    $(document).on('click', '#editDeclareVariableBtn', function () {
        clearError();
        var targetVariable = clipboard.variable;
        var tempVariable;
        var val = $('.input-val-0').val();
        if (targetVariable instanceof Integer_1.default)
            tempVariable = new Integer_1.default('tmp', val);
        else if (targetVariable instanceof Long_1.default)
            tempVariable = new Long_1.default('tmp', val);
        else if (targetVariable instanceof Float_1.default)
            tempVariable = new Float_1.default('tmp', val);
        else if (targetVariable instanceof Double_1.default)
            tempVariable = new Double_1.default('tmp', val);
        else if (targetVariable instanceof String_1.default)
            tempVariable = new String_1.default('tmp', val);
        else if (targetVariable instanceof Char_1.default)
            tempVariable = new Char_1.default('tmp', val);
        var returnValue = tempVariable.validateValue();
        if (!returnValue.bool) {
            $('.input-val-0').addClass('input-error');
            createErrorMessage(returnValue.message, 'pcInputErrorContainer');
            return;
        }
        clipboard.variable.value = $('.input-val-0').val();
        finishAction();
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    // Edit Input Statement
    function createEditInput() {
        var targetVariable = clipboard.variable;
        var classType;
        var listVariable;
        if (targetVariable instanceof Integer_1.default) {
            listVariable = listInteger;
            classType = 'int';
        }
        else if (targetVariable instanceof Long_1.default) {
            listVariable = listLong;
            classType = 'long';
        }
        else if (targetVariable instanceof Float_1.default) {
            listVariable = listFloat;
            classType = 'float';
        }
        else if (targetVariable instanceof Double_1.default) {
            listVariable = listDouble;
            classType = 'double';
        }
        else if (targetVariable instanceof Char_1.default) {
            listVariable = listChar;
            classType = 'char';
        }
        else {
            listVariable = listString;
            classType = 'string';
        }
        $('#pcInputContainer').append($('<div>', { class: 'd-flex align-items-center mb-3' }).append(createHint('Variable Name', 5), createSelect(listVariable, 7).attr('id', 'chosenVariable')));
        $('#pcInputContainerLower').append($('<div>', { class: 'col-sm-10 col-10' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'editInputVariableBtn' }).data('value', classType).text('Update'));
    }
    // Update Input Statement
    $(document).on('click', '#editInputVariableBtn', function () {
        clearError();
        if ($('#chosenVariable').find('option').filter(':selected').val() == '') {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $('#chosenVariable').addClass('input-error');
        }
        else {
            var variableName = $('#chosenVariable').find('option').filter(':selected').val();
            var variable = undefined;
            var statement = void 0;
            if ($('#editInputVariableBtn').data('value') == 'int')
                variable = getVariable(listInteger, variableName);
            else if ($('#editInputVariableBtn').data('value') == 'long')
                variable = getVariable(listLong, variableName);
            else if ($('#editInputVariableBtn').data('value') == 'float')
                variable = getVariable(listFloat, variableName);
            else if ($('#editInputVariableBtn').data('value') == 'double')
                variable = getVariable(listDouble, variableName);
            else if ($('#editInputVariableBtn').data('value') == 'char')
                variable = getVariable(listChar, variableName);
            else
                variable = getVariable(listString, variableName);
            if (variable != undefined) {
                statement = new InputStatement_1.default(statementCount++, 1, variable);
                // validate chosen variable has been declared
                if (returnClick.option.validateMainListStatement(listStatement, statement, clipboard, false))
                    clipboard.variable = variable;
                else
                    createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
            }
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    // Edit Output Statement
    function createEditOutput() {
        var statement = clipboard;
        if (statement.type == 'variable')
            createEditOutputVariable();
        else
            createEditOutputText();
    }
    function createEditOutputVariable() {
        initInput('Edit Output Variable');
        var listVariable = getAllVariables();
        $('#pcInputContainer').append($('<div>', { class: 'd-flex align-items-center mb-3' }).append(createHint('Variable Name', 5), createSelect(listVariable, 7, true).attr('id', 'chosenOutputVariable')));
        $('#pcInputContainerLower').append($('<div>', { class: 'col-sm-12 col-12 d-flex justify-content-evenly align-items-center' }).append($('<div>', { class: 'col-sm-5 col-5' }), $('<div>', { class: 'col-sm-5 col-5 d-flex align-items-center' }).append($('<input>', { class: 'form-check-input col-sm-1 col-1 d-flex align-items-center', type: 'checkbox', id: 'new-line-variable' }), $('<label>', { class: 'form-check-label col-sm-11 col-11 d-flex align-items-center ms-2', for: 'new-line-variable' }).text('Add new line')), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'editOutputVariableBtn' }).text('Update')));
    }
    function createEditOutputText() {
        initInput('Edit Output Text');
        var leftSide = $('<div>', { class: 'col-sm-4 col-4 mb-2' }).append($('<div>', { class: 'list-group', id: 'list-tab' }).attr('role', 'tablist').append($('<a>', { class: 'list-group-item list-group-item-action active', id: 'list-home-list' }).attr('data-bs-toggle', 'list').attr('href', '#list-home').text('Text'), $('<a>', { class: 'list-group-item list-group-item-action', id: 'list-profile-list' }).attr('data-bs-toggle', 'list').attr('href', '#list-profile').text('ASCII Code'), $('<a>', { class: 'list-group-item list-group-item-action', id: 'list-messages-list' }).attr('data-bs-toggle', 'list').attr('href', '#list-messages').text('Escape Sequence')));
        var selectAscii = $('<select>', { class: 'form-select mt-2', id: 'select-ascii-code' });
        for (var i = 0; i <= 255; i++)
            selectAscii.append($('<option></option>').val(i).text(i));
        var selectEscape = $('<select>', { class: 'form-select mt-2', id: 'select-escape-seq' }).append($('<option>').val('a').text('\\a'), $('<option>').val('b').text('\\b'), $('<option>').val('f').text('\\f'), $('<option>').val('n').text('\\n'), $('<option>').val('r').text('\\r'), $('<option>').val('t').text('\\t'), $('<option>').val('v').text('\\v'), $('<option>').val('bs').text("\\\\"), $('<option>').val("tick").text("\\'"), $('<option>').val("dtick").text("\\\""), $('<option>').val("qmark").text("\\?"));
        var rightSide = $('<div>', { class: 'col-sm-8 col-8' }).append($('<div>', { class: 'tab-content', id: 'nav-tabContent' }).append($('<div>', { class: 'tab-pane fade show active', id: 'list-home' }).attr('id', 'list-home').attr('role', 'tabpanel').append($('<strong>').text('Input Text'), $('<input>', { type: 'text', class: 'form-control mt-2', id: 'output-text-box' }), $('<div>', { class: 'col-sm-12 col-12 d-flex' }).append($('<div>', { class: 'col-sm-8 col-8 d-flex align-items-center' }).append($('<div>').append($('<input>', { type: 'checkbox', class: 'form-check-input', id: 'new-line-text' }), $('<label>', { class: 'form-check-label ms-2', for: 'new-line-text' }).text('Add new line'))), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-end' }).append($('<button>', { class: 'btn btn-primary mt-2', id: 'btn-edit-output' }).data('value', 'text').text('Update')))), $('<div>', { class: 'tab-pane fade', id: 'list-profile' }).attr('role', 'tabpanel').append($('<strong>').text('ASCII Code'), selectAscii, $('<div>', { class: 'col-sm-12 col-12 d-flex' }).append($('<div>', { class: 'col-sm-8 col-8 d-flex align-items-center' }).append($('<div>').append($('<input>', { type: 'checkbox', class: 'form-check-input', id: 'new-line-ascii' }), $('<label>', { class: 'form-check-label ms-2', for: 'new-line-ascii' }).text('Add new line'))), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-end' }).append($('<button>', { class: 'btn btn-primary mt-2', id: 'btn-edit-output' }).data('value', 'ascii').text('Update')))), $('<div>', { class: 'tab-pane fade', id: 'list-messages' }).attr('role', 'tabpanel').append($('<strong>').text('Escape Sequence'), selectEscape, $('<div>', { class: 'col-sm-12 col-12 d-flex' }).append($('<div>', { class: 'col-sm-8 col-8 d-flex align-items-center' }), $('<div>', { class: 'col-sm-4 col-4 d-flex justify-content-end' }).append($('<button>', { class: 'btn btn-primary mt-2', id: 'btn-edit-output' }).data('value', 'escape').text('Update'))))));
        $('#pcInputContainer').append($('<div>', { class: 'row' }).append(leftSide, rightSide));
    }
    // Update Output Variable
    $(document).on('click', '#editOutputVariableBtn', function () {
        clearError();
        var variable = getSelectedOutputVariable();
        if (variable == undefined) {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $('#chosenOutputVariable').addClass('input-error');
        }
        else {
            var isNewLine = $('#new-line-variable').is(':checked');
            var statement = new OutputStatement_1.default(statementCount++, 1, isNewLine, 'variable', variable);
            if (returnClick.option.validateMainListStatement(listStatement, statement, clipboard, false)) {
                clipboard.variable = variable;
                clipboard.isNewLine = isNewLine;
            }
            else {
                createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
            }
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    // Update Output Text
    $(document).on('click', '#btn-edit-output', function () {
        var output;
        if ($(this).data('value') == 'text') {
            var text = $('#output-text-box').val();
            var newLine = $('#new-line-text').is(':checked');
            output = new OutputStatement_1.default(statementCount++, 1, newLine, 'text', undefined, text);
        }
        else if ($(this).data('value') == 'ascii') {
            var num = $('#select-ascii-code').find('option').filter(':selected').val();
            var newLine = $('#new-line-ascii').is(':checked');
            output = new OutputStatement_1.default(statementCount++, 1, newLine, 'ascii', undefined, undefined, num, undefined);
        }
        else {
            var text = $('#select-escape-seq').find('option').filter(':selected').text();
            output = new OutputStatement_1.default(statementCount++, 1, false, 'escapeseq', undefined, undefined, undefined, text);
        }
        clipboard.isNewLine = output.isNewLine;
        clipboard.type = output.type;
        clipboard.text = output.text;
        clipboard.asciiCode = output.asciiCode;
        clipboard.escapeSequence = output.escapeSequence;
        finishAction();
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    // Edit If-Else
    function createEditIfElse() {
        ifCount = 1;
        ifToBeValidated = [];
        isElsed = false;
        initInput('Edit Selection Properties');
        var ifOperations = clipboard.ifOperations;
        createIfSelection();
        $('#pcInputContainerLower').append($('<div>', { class: 'd-flex justify-content-end p-2 col-sm-12 col-12' }).append($('<div>', { class: 'col-sm-10 col-10' }), $('<button>', { class: 'btn btn-primary col-sm-2 col-2', id: 'updateIfStatementButton' }).text('Update')));
        for (var i = 1; i < ifOperations.length; i++) {
            if (ifOperations[i] instanceof Elif_1.default)
                createAdditionalElif(false);
            else
                createElse(false);
        }
    }
    // Update If-Else
    $(document).on('click', '#updateIfStatementButton', function () {
        clearError();
        var ifStatements = [];
        var tempStatement = undefined;
        var proceed = true;
        for (var i = 0; i < ifToBeValidated.length; i++) {
            tempStatement = handleIfStatementValidation(ifToBeValidated[i]);
            if (tempStatement != undefined) {
                ifStatements.push(tempStatement);
                tempStatement = undefined;
            }
            else {
                proceed = false;
                break;
            }
        }
        if (proceed == true) {
            var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
            var oldIfOperations = clipboard.ifOperations;
            var tempChildStatement = [];
            if (isElsed)
                ifStatements.push(new Else_1.default(1, statementCount));
            ifStatement.updateIfOperations(ifStatements);
            if (returnClick.option.validateMainListStatement(listStatement, ifStatement, clipboard, false)) {
                for (var i = 0; i < oldIfOperations.length; i++) {
                    tempChildStatement = [];
                    if (oldIfOperations[i] instanceof If_1.default) {
                        if (oldIfOperations[i].childStatement != undefined) {
                            for (var j = 0; j < oldIfOperations[i].childStatement.length; j++)
                                tempChildStatement.push(oldIfOperations[i].childStatement[j]);
                        }
                    }
                    else {
                        if (oldIfOperations[i].childStatement != undefined) {
                            for (var j = 0; j < oldIfOperations[i].childStatement.length; j++)
                                tempChildStatement.push(oldIfOperations[i].childStatement[j]);
                        }
                    }
                    ifStatements[i].updateChildStatement(tempChildStatement);
                }
                clipboard.updateIfOperations(ifStatements);
            }
            else
                createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    // Edit Switch Statement
    // Update Repetition Statement
    $(document).on('click', '#update-loop-button', function () {
        clearError();
        var statement = createRepetitionStatement($(this).data('value'));
        if (statement == undefined)
            return;
        // validate chosen variable has been declared
        if (returnClick.option.validateMainListStatement(listStatement, statement, clipboard, false)) {
            if ($(this).data('value') == 'for') {
                clipboard.variable = statement.variable;
                clipboard.isIncrement = statement.isIncrement;
                clipboard.addValueBy = statement.addValueBy;
                clipboard.condition = statement.condition;
            }
            else {
                clipboard.firstCondition = statement.firstCondition;
                clipboard.logicalOperator = statement.logicalOperator;
                clipboard.secondCondition = statement.secondCondition;
            }
        }
        else
            createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
        finishAction();
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    $(document).on('click', '#update-asg-arithmetic-button', function () {
        clearError();
        var temp = true;
        var value;
        value = $('.selected-target-variable-asg').find('option').filter(':selected').val();
        if (value == '') {
            createErrorMessage('Please select a variable', 'pcInputErrorContainer');
            $('.selected-target-variable-asg').addClass('input-error');
            return;
        }
        for (var i = 0; i < assignmentToBeValidated.length; i++) {
            temp = validateArithmeticAssignmentInput(assignmentToBeValidated[i]);
            if (!temp)
                return;
        }
        var assignmentStatement = createArithmeticStatement();
        if (returnClick.option.validateMainListStatement(listStatement, assignmentStatement, clipboard, false)) {
            clipboard.targetVariable = assignmentStatement.targetVariable;
            clipboard.type = assignmentStatement.type;
            clipboard.listArithmetic = assignmentStatement.listArithmetic;
            clipboard.listOperator = assignmentStatement.listOperator;
            clipboard.listIsCustom = assignmentStatement.listIsCustom;
            clipboard.variable = assignmentStatement.variable;
            clipboard.isCustomValue = assignmentStatement.isCustomValue;
            clipboard.start = assignmentStatement.start;
            clipboard.length = assignmentStatement.length;
        }
        else
            createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
        finishAction();
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    });
    $(document).on('click', '#update-asg-string-button', function () {
        clearError();
        var statement = undefined;
        if ($('.choose-action-type').find('option').filter(':selected').val() == 'length')
            statement = createStringAssignmentLength();
        else
            statement = createStringAssignmentSub();
        if (statement != undefined) {
            if (returnClick.option.validateMainListStatement(listStatement, statement, clipboard, false)) {
                clipboard.targetVariable = statement.targetVariable;
                clipboard.type = statement.type;
                clipboard.listArithmetic = statement.listArithmetic;
                clipboard.listOperator = statement.listOperator;
                clipboard.listIsCustom = statement.listIsCustom;
                clipboard.variable = statement.variable;
                clipboard.isCustomValue = statement.isCustomValue;
                clipboard.start = statement.start;
                clipboard.length = statement.length;
            }
            else {
                createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
            }
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    $(document).on('click', '#update-asg-variable-button', function () {
        clearError();
        var statement = createVariableAssignment();
        if (statement != undefined) {
            if (returnClick.option.validateMainListStatement(listStatement, statement, clipboard, false)) {
                clipboard.targetVariable = statement.targetVariable;
                clipboard.type = statement.type;
                clipboard.listArithmetic = statement.listArithmetic;
                clipboard.listOperator = statement.listOperator;
                clipboard.listIsCustom = statement.listIsCustom;
                clipboard.variable = statement.variable;
                clipboard.isCustomValue = statement.isCustomValue;
                clipboard.start = statement.start;
                clipboard.length = statement.length;
            }
            else {
                createErrorMessage('Could not use chosen variable!', 'bcErrorContainer');
            }
            finishAction();
            restructureStatement();
            turnOffOptions();
            clearSourceCode();
            initInput('Program Input');
            drawCanvas();
        }
    });
    function handleDelete() {
        var returnPaste = undefined;
        returnPaste = returnClick.option.handleDelete(listStatement, clipboard);
        if (returnPaste.result == false) {
            createErrorMessage('Variable is used on another statement!', 'bcErrorContainer');
        }
        else {
            if (clipboard instanceof DeclareStatement_1.default) {
                deleteVariable(clipboard.variable);
            }
        }
        finishAction();
        restructureStatement();
        turnOffOptions();
        clearSourceCode();
        initInput('Program Input');
        drawCanvas();
    }
    function finishAction() {
        returnClick = undefined;
        clipboard = undefined;
        lastSelectedOption = undefined;
    }
    function restructureStatement() {
        if (listStatement == undefined)
            return;
        for (var i = 0; i < listStatement.length; i++) {
            listStatement[i].moveToSurface();
            listStatement[i].updateChildLevel();
        }
    }
    // Create template
    function blankTemplate() {
        for (var i = 0; i < listStatement.length; i++) {
            if (listStatement[i] instanceof DeclareStatement_1.default)
                deleteVariable(listStatement[i].variable);
        }
        listStatement = [];
    }
    function declareVariableTemplate() {
        var variableName = 'myNumber';
        var variable;
        allVariableNames[variableName] = true;
        variable = new Integer_1.default(variableName, 50);
        listInteger.push(variable);
        handleAdd(new DeclareStatement_1.default(statementCount++, 1, variable));
    }
    function simplyPrintTemplate() {
        var outputStatement = new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "Hello World!");
        handleAdd(outputStatement);
    }
    function inputOutputTemplate() {
        var variableName = 'myNumber';
        var variable;
        allVariableNames[variableName] = true;
        variable = new Integer_1.default(variableName, 0);
        listInteger.push(variable);
        handleAdd(new DeclareStatement_1.default(statementCount++, 1, variable));
        handleAdd(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'Input number: '));
        handleAdd(new InputStatement_1.default(statementCount++, 1, variable));
        handleAdd(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'The number is: '));
        handleAdd(new OutputStatement_1.default(statementCount++, 1, true, 'variable', variable));
    }
    function nestedIfTemplate() {
        var variableName = 'myScore';
        var variable;
        allVariableNames[variableName] = true;
        variable = new Integer_1.default(variableName, 0);
        listInteger.push(variable);
        handleAdd(new DeclareStatement_1.default(statementCount++, 1, variable));
        handleAdd(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'Input score: '));
        handleAdd(new InputStatement_1.default(statementCount++, 1, variable));
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var firstIf = new If_1.default(1, statementCount++, new Condition_1.default(variable, '<', new Integer_1.default('x', 65), true));
        var secondIf = new Else_1.default(1, statementCount++, undefined);
        var failInnerIf;
        var successInnerIf;
        var temp = [];
        failInnerIf = createIf(variable, 30, 45, ['F', 'E', 'D']);
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'You failed'));
        temp.push(failInnerIf);
        firstIf.updateChildStatement(temp);
        successInnerIf = createIf(variable, 75, 85, ['C', 'B', 'A']);
        temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'You passed!'));
        temp.push(successInnerIf);
        secondIf.updateChildStatement(temp);
        var ifOperations = [];
        ifOperations.push(firstIf);
        ifOperations.push(secondIf);
        ifStatement.updateIfOperations(ifOperations);
        handleAdd(ifStatement);
    }
    function createIf(variable, lower, upper, grades) {
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var firstIf = new If_1.default(1, statementCount++, new Condition_1.default(variable, '<', new Integer_1.default('x', lower), true));
        var secondIf = new Elif_1.default(1, statementCount++, new Condition_1.default(variable, '>=', new Integer_1.default('x', lower), true), 'AND', new Condition_1.default(variable, '<', new Integer_1.default('x', upper), true));
        var thirdIf = new Else_1.default(1, statementCount, undefined);
        var statements = [];
        statements.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'Your grade is ' + grades[0]));
        firstIf.updateChildStatement(statements);
        statements = [];
        statements.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'Your grade is ' + grades[1]));
        secondIf.updateChildStatement(statements);
        statements = [];
        statements.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'Your grade is ' + grades[2]));
        thirdIf.updateChildStatement(statements);
        var ifOperations = [];
        ifOperations.push(firstIf);
        ifOperations.push(secondIf);
        ifOperations.push(thirdIf);
        ifStatement.updateIfOperations(ifOperations);
        return ifStatement;
    }
    function nestedForTemplate() {
        var variable = new Integer_1.default('i', 0);
        var variable2 = new Integer_1.default('j', 0);
        allVariableNames['i'] = true;
        allVariableNames['j'] = true;
        listInteger.push(variable);
        listInteger.push(variable2);
        var declareStatement = new DeclareStatement_1.default(statementCount++, 1, variable);
        var declareStatement2 = new DeclareStatement_1.default(statementCount++, 1, variable2);
        var forStatement = new ForStatement_1.default(1, statementCount++, undefined, variable, true, true, 1, new Condition_1.default(variable, '<', new Integer_1.default('x', 2), true));
        var nestedForStatement = new ForStatement_1.default(1, statementCount++, undefined, variable2, true, true, 1, new Condition_1.default(variable2, '<', new Integer_1.default('x', 3), true));
        var temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'i: '));
        temp.push(new OutputStatement_1.default(statementCount++, 1, false, 'variable', variable));
        temp.push(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, ' j: '));
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'variable', variable2));
        nestedForStatement.updateChildStatement(temp);
        temp = [];
        temp.push(nestedForStatement);
        forStatement.updateChildStatement(temp);
        handleAdd(declareStatement);
        handleAdd(declareStatement2);
        handleAdd(forStatement);
    }
    function menuTemplate() {
        var variable = new Integer_1.default('choice', 0);
        allVariableNames['choice'] = true;
        listInteger.push(variable);
        var declareStatement = new DeclareStatement_1.default(statementCount++, 1, variable);
        var whileStatement = new WhileStatement_1.default(1, statementCount, false, undefined, new Condition_1.default(variable, '!=', new Integer_1.default('x', 4), true));
        var temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "1. Print 'Hello'"));
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "2. Print 'World'"));
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "3. Print 'Lorem'"));
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "4. Exit"));
        temp.push(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, "Choice: "));
        temp.push(new InputStatement_1.default(statementCount++, 1, variable));
        temp.push(createSwitchStatement(variable));
        whileStatement.updateChildStatement(temp);
        handleAdd(declareStatement);
        handleAdd(whileStatement);
    }
    function createSwitchStatement(variable) {
        var switchStatement = new SwitchStatement_1.default(1, statementCount++, variable, undefined);
        var temp = [];
        var caseStatements = [];
        var firstCase = new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 1), true), undefined, false);
        var secondCase = new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 2), true), undefined, false);
        var thirdCase = new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 3), true), undefined, false);
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "Hello"));
        firstCase.updateChildStatement(temp);
        temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "World"));
        secondCase.updateChildStatement(temp);
        temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, "Lorem"));
        thirdCase.updateChildStatement(temp);
        temp = [];
        caseStatements.push(firstCase);
        caseStatements.push(secondCase);
        caseStatements.push(thirdCase);
        switchStatement.updateCaseStatement(caseStatements);
        return switchStatement;
    }
    function drawSquareTemplate() {
        var variable = new Integer_1.default('count', 0);
        allVariableNames['count'] = true;
        listInteger.push(variable);
        var i = new Integer_1.default('i', 0);
        var j = new Integer_1.default('j', 0);
        allVariableNames['i'] = true;
        allVariableNames['j'] = true;
        listInteger.push(i);
        listInteger.push(j);
        var declareStatement = new DeclareStatement_1.default(statementCount++, 1, variable);
        var declareI = new DeclareStatement_1.default(statementCount++, 1, i);
        var declareJ = new DeclareStatement_1.default(statementCount++, 1, j);
        var outputStatement = new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'Input square size: ', undefined, undefined);
        var inputStatement = new InputStatement_1.default(statementCount++, 1, variable);
        var forStatement = new ForStatement_1.default(1, statementCount++, undefined, i, true, true, 1, new Condition_1.default(i, '<', variable, false));
        var nestedForStatement = new ForStatement_1.default(1, statementCount++, undefined, j, true, true, 1, new Condition_1.default(j, '<', variable, false));
        var temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, '*'));
        nestedForStatement.updateChildStatement(temp);
        temp = [];
        temp.push(nestedForStatement);
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, ''));
        forStatement.updateChildStatement(temp);
        handleAdd(declareI);
        handleAdd(declareJ);
        handleAdd(declareStatement);
        handleAdd(outputStatement);
        handleAdd(inputStatement);
        handleAdd(forStatement);
    }
    function oddEvenTemplate() {
        var variable = new Integer_1.default('number', 0);
        allVariableNames['number'] = true;
        listInteger.push(variable);
        var outputStatement = new OutputStatement_1.default(statementCount++, 1, false, 'text', undefined, 'Please input a number: ', undefined, undefined);
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var firstIf = new If_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 0), true));
        var secondIf = new Elif_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 1), true));
        var ifOperations = [];
        var temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'The number is an even number'));
        firstIf.updateChildStatement(temp);
        temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'The number is an odd number'));
        secondIf.updateChildStatement(temp);
        ifOperations.push(firstIf);
        ifOperations.push(secondIf);
        ifStatement.updateIfOperations(ifOperations);
        var listArithmetic = [];
        listArithmetic.push(new Arithmetic_1.default(variable, new Integer_1.default('x', 2), undefined, undefined, '%', false, true));
        var assignmentStatement = new AssignmentStatement_1.default(statementCount++, 1, 'arithmetic', variable, listArithmetic, undefined, undefined, undefined, undefined, undefined, undefined);
        handleAdd(new DeclareStatement_1.default(statementCount++, 1, variable));
        handleAdd(outputStatement);
        handleAdd(new InputStatement_1.default(statementCount++, 1, variable));
        handleAdd(assignmentStatement);
        handleAdd(ifStatement);
    }
    // Source Code Logic
    var lastChosenLang = '';
    function clearSourceCode() {
        $('#source-code-container').val('');
    }
    $(document).on('click', '#btn-generate-source-code', function () {
        var language = $('.selected-programming-language').find('option').filter(':selected').val();
        lastChosenLang = language;
        var lang;
        if (language == 'c') {
            lang = new C_1.default(listStatement);
        }
        else if (language == 'cpp') {
            lang = new Cpp_1.default(listStatement);
        }
        else if (language == 'cs') {
            lang = new Cs_1.default(listStatement);
        }
        else if (language == 'java') {
            lang = new Java_1.default(listStatement);
        }
        else if (language == 'python') {
            lang = new Python_1.default(listStatement);
        }
        else {
            lang = new Pseudocode_1.default(listStatement);
        }
        $('#source-code-container').val('');
        $('#source-code-container').val(lang.generateSourceCode());
    });
    var fontSize = 14;
    $(document).on('click', '.change-font-size', function () {
        if ($(this).data('value') == 'plus') {
            if (fontSize == 40)
                return;
            $('#source-code-container').css('font-size', ++fontSize + 'px');
        }
        else {
            if (fontSize == 1)
                return;
            $('#source-code-container').css('font-size', --fontSize + 'px');
        }
        $('#font-size-input').val(fontSize);
    });
    $(document).on('change', '#font-size-input', function () {
        var temp = $('#font-size-input').val();
        var tempFontSize = parseInt(temp);
        if (isNaN(tempFontSize) || tempFontSize < 1 || tempFontSize > 40) {
            fontSize = 14;
            $('#source-code-container').css('font-size', fontSize + 'px');
            $('#font-size-input').val(fontSize);
        }
        else {
            fontSize = tempFontSize;
            $('#source-code-container').css('font-size', fontSize + 'px');
            $('#font-size-input').val(fontSize);
        }
    });
    // Manage project logic
    function parseJSON(object) {
        var statement;
        if (object.statement == 'declare') {
            statement = Object.assign(new DeclareStatement_1.default(undefined, undefined, undefined), object);
            statement.parseAttributes();
        }
        else if (object.statement == 'input') {
            statement = Object.assign(new InputStatement_1.default(undefined, undefined, undefined), object);
            statement.parseAttributes();
        }
        else if (object.statement == 'output') {
            statement = Object.assign(new OutputStatement_1.default(undefined, undefined, undefined, undefined), object);
            statement.parseAttributes();
        }
        else if (object.statement == 'assignment') {
            statement = Object.assign(new AssignmentStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
            statement.parseAttributes();
        }
        else if (object.statement == 'ifstatement') {
            statement = Object.assign(new IfStatement_1.default(undefined, undefined, undefined), object);
            statement.parseChild();
        }
        else if (object.statement == 'for') {
            statement = Object.assign(new ForStatement_1.default(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), object);
            statement.parseChild();
            statement.parseAttributes();
        }
        else if (object.statement == 'while') {
            statement = Object.assign(new WhileStatement_1.default(undefined, undefined, undefined, undefined, undefined), object);
            statement.parseChild();
            statement.parseAttributes();
        }
        else if (object.statement == 'switch') {
            statement = Object.assign(new SwitchStatement_1.default(undefined, undefined, undefined, undefined), object);
            statement.parseChild();
            statement.parseAttributes();
        }
        return statement;
    }
    function loadVariable(object) {
        var variable;
        if (object.type == 'int') {
            variable = Object.assign(new Integer_1.default(undefined, undefined), object);
            listInteger.push(variable);
        }
        else if (object.type == 'double') {
            variable = Object.assign(new Double_1.default(undefined, undefined), object);
            listDouble.push(variable);
        }
        else if (object.type == 'long') {
            variable = Object.assign(new Long_1.default(undefined, undefined), object);
            listLong.push(variable);
        }
        else if (object.type == 'float') {
            variable = Object.assign(new Float_1.default(undefined, undefined), object);
            listFloat.push(variable);
        }
        else if (object.type == 'char') {
            variable = Object.assign(new Char_1.default(undefined, undefined), object);
            listChar.push(variable);
        }
        else {
            variable = Object.assign(new String_1.default(undefined, undefined), object);
            listString.push(variable);
        }
        statementCount++;
        allVariableNames[variable.name] = true;
    }
    function clearVariableStatementData() {
        allVariableNames = {};
        listInteger = [];
        listFloat = [];
        listLong = [];
        listDouble = [];
        listChar = [];
        listString = [];
        statementCount = 0;
        listStatement = [];
    }
    $(document).on('click', '#create-project', function () {
        clearError();
        if ($('input[name=project_name').val() == '') {
            var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-danger').text("Project name can't be empty!");
            $('#pjMessageContainer').append(container);
            $('input[name=project_name').addClass('input-error');
            return;
        }
        var allVariables = getAllVariables();
        if ((allVariables == undefined || allVariables.length == 0) && (listStatement == undefined || listStatement.length == 0)) {
            var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-danger').text("Project is still empty!");
            $('#pjMessageContainer').append(container);
            return;
        }
        var jsonStatements = JSON.stringify(listStatement);
        var jsonVariables = JSON.stringify(allVariables);
        $.ajax({
            type: 'POST',
            url: '/decode/create',
            data: {
                _token: $('input[name=_token]').val(),
                user_id: $('input[name=_user_id]').val(),
                project_name: $('input[name=project_name').val(),
                project_statements: jsonStatements,
                project_variable: jsonVariables
            },
            success: function (data) {
                var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-success').text("Project successfully created!");
                $('#pjMessageContainer').append(container);
                window.location.reload();
            }
        });
    });
    $(document).on('click', '#load-project', function () {
        clearError();
        var id = $(this).data('value');
        $.ajax({
            type: 'POST',
            url: '/decode/load',
            data: {
                _token: $('input[name=_token]').val(),
                project_id: id
            },
            success: function (data) {
                clearVariableStatementData();
                var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-success').text("Project successfully loaded");
                $('#pjMessageContainer').append(container);
                var jsonProjectStatements = JSON.parse(data.project_statements);
                var jsonProjectVariables = JSON.parse(data.project_variable);
                for (var i = 0; i < jsonProjectVariables.length; i++)
                    loadVariable(jsonProjectVariables[i]);
                for (var i = 0; i < jsonProjectStatements.length; i++)
                    listStatement.push(parseJSON(jsonProjectStatements[i]));
                restructureStatement();
                drawCanvas();
            }
        });
    });
    $(document).on('click', '#save-project', function () {
        clearError();
        var project_id = $(this).data('value');
        var allVariables = getAllVariables();
        if ((allVariables == undefined || allVariables.length == 0) && (listStatement == undefined || listStatement.length == 0)) {
            var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-danger').text("Nothing to save");
            $('#pjMessageContainer').append(container);
            return;
        }
        var jsonStatements = JSON.stringify(listStatement);
        var jsonVariables = JSON.stringify(allVariables);
        $.ajax({
            type: 'POST',
            url: '/decode/save',
            data: {
                _token: $('input[name=_token]').val(),
                project_id: project_id,
                project_statements: jsonStatements,
                project_variables: jsonVariables
            },
            success: function (data) {
                var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-success').text("Project saved!");
                $('#pjMessageContainer').append(container);
            }
        });
    });
    $(document).on('click', '.delete-project', function () {
        clearError();
        $('.modal-body').text($(this).parent().parent().find('td').text() + ' will be deleted. Do you want to proceed?');
        $('.confirm-delete-btn').data('value', $(this).data('value'));
    });
    $(document).on('click', '.confirm-delete-btn', function () {
        var project_id = $(this).data('value');
        $('.project-container-' + project_id).remove();
        $.ajax({
            type: 'POST',
            url: '/decode/delete',
            data: {
                _token: $('input[name=_token]').val(),
                project_id: project_id,
            },
            success: function (data) {
                var container = $('<div></div>').addClass('col-12').addClass('col-sm-12').addClass('alert').addClass('alert-success').text("Project deleted");
                $('#pjMessageContainer').append(container);
                initInput('Program Input');
            }
        });
    });
    var path = window.location.href;
    // Download Source Code
    $(document).on('click', '#download-source-code', function () {
        clearError();
        var source_code = $('#source-code-container').val();
        if (source_code == '' || source_code == undefined || source_code.length == 0) {
            createErrorMessage('Source code is empty!', 'resultErrorContainer');
            return;
        }
        var flag = false;
        for (var i = 0; i < source_code.length; i++) {
            if (source_code[i] != ' ') {
                flag = true;
                break;
            }
        }
        if (!flag) {
            createErrorMessage('Source code is empty!', 'resultErrorContainer');
            return;
        }
        $.ajax({
            type: 'POST',
            url: '/decode/download',
            data: {
                _token: $('input[name=_token]').val(),
                source_code: source_code
            },
            success: function (data) {
                var container = $('<div></div>').addClass('col-12 col-sm-12 alert alert-success').text("Source code downloaded!");
                $('#resultErrorContainer').append(container);
                window.location.href = path + '/download/client/' + lastChosenLang;
            }
        });
    });
    $(document).on('click', '.generateTemplate', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $('#block-code-canvas').offset().top
        }, 300);
    });
    $(document).on('click', '#btn-generate-source-code', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $('#source-code-container').offset().top
        }, 300);
    });
});

},{"../classes/canvas/Canvas":1,"../classes/languages/C":2,"../classes/languages/Cpp":3,"../classes/languages/Cs":4,"../classes/languages/Java":5,"../classes/languages/Pseudocode":7,"../classes/languages/Python":8,"../classes/statement/AssignmentStatement":9,"../classes/statement/DeclareStatement":10,"../classes/statement/ForStatement":11,"../classes/statement/IfStatement":12,"../classes/statement/InputStatement":13,"../classes/statement/OutputStatement":14,"../classes/statement/SwitchStatement":16,"../classes/statement/WhileStatement":17,"../classes/statement/helper/assignment/Arithmetic":18,"../classes/statement/helper/case/Case":19,"../classes/statement/helper/general/Condition":20,"../classes/statement/helper/ifs/Elif":22,"../classes/statement/helper/ifs/Else":23,"../classes/statement/helper/ifs/If":24,"../classes/statement/helper/options/Option":25,"../classes/variable/Char":27,"../classes/variable/Double":28,"../classes/variable/Float":29,"../classes/variable/Integer":30,"../classes/variable/Long":31,"../classes/variable/String":32}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Return = /** @class */ (function () {
    function Return(bool, message) {
        this.bool = bool;
        this.message = message;
    }
    return Return;
}());
exports.default = Return;

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClick = /** @class */ (function () {
    function ReturnClick(statement, option, isClose) {
        this.isClose = undefined;
        this.statement = statement;
        this.option = option;
        this.isClose = isClose;
    }
    return ReturnClick;
}());
exports.default = ReturnClick;

},{}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClone = /** @class */ (function () {
    function ReturnClone(statement, result) {
        this.statement = undefined;
        this.statement = statement;
        this.result = result;
    }
    return ReturnClone;
}());
exports.default = ReturnClone;

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnPaste = /** @class */ (function () {
    function ReturnPaste(result, listStatement) {
        this.result = result;
        this.listStatement = listStatement;
    }
    return ReturnPaste;
}());
exports.default = ReturnPaste;

},{}]},{},[34]);
