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

},{"../statement/helper/general/Coordinate":13}],2:[function(require,module,exports){
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
var Option_1 = __importDefault(require("./helper/options/Option"));
var Statement_1 = __importDefault(require("./Statement"));
var AssignmentStatement = /** @class */ (function (_super) {
    __extends(AssignmentStatement, _super);
    function AssignmentStatement(statementId, level, firstVariable, secondVariable, operator, isCustomValue) {
        var _this = _super.call(this, level) || this;
        _this.statementId = _this.generateId(statementId);
        _this.firstVariable = firstVariable;
        _this.secondVariable = secondVariable;
        _this.operator = operator;
        _this.isCustomValue = isCustomValue;
        _this.color = '#f4be0b';
        return _this;
    }
    AssignmentStatement.prototype.generateId = function (number) {
        return 'assignment-statement-' + number;
    };
    AssignmentStatement.prototype.writeToCanvas = function (canvas) {
        var text = 'SET ' + this.firstVariable.name + ' = ' + this.generateBlockCodeText();
        var coordinate = canvas.writeText(this.level, text, this.color);
        this.createOption(canvas, coordinate.x + canvas.SPACE, coordinate.y - canvas.LINE_HEIGHT);
    };
    AssignmentStatement.prototype.generateBlockCodeText = function () {
        return this.isCustomValue ? this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.value :
            this.firstVariable.name + ' ' + this.operator + ' ' + this.secondVariable.name;
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
        if (variable.name == this.firstVariable.name)
            return this;
        if (!this.isCustomValue) {
            if (variable.name == this.secondVariable.name)
                return this;
        }
        return undefined;
    };
    AssignmentStatement.prototype.cloneStatement = function (statementCount) {
        return new ReturnClone_1.default(new AssignmentStatement(statementCount, this.level, this.firstVariable, this.secondVariable, this.operator, this.isCustomValue), true);
    };
    return AssignmentStatement;
}(Statement_1.default));
exports.default = AssignmentStatement;

},{"../../utilities/ReturnClone":29,"./Statement":8,"./helper/options/Option":17}],3:[function(require,module,exports){
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
    return DeclareStatement;
}(Statement_1.default));
exports.default = DeclareStatement;

},{"../../utilities/ReturnClone":29,"../variable/Char":19,"../variable/Double":20,"../variable/Float":21,"../variable/Integer":22,"../variable/Long":23,"../variable/String":24,"./Statement":8,"./helper/options/Option":17}],4:[function(require,module,exports){
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
var DeclareStatement_1 = __importDefault(require("./DeclareStatement"));
var Option_1 = __importDefault(require("./helper/options/Option"));
var Statement_1 = __importDefault(require("./Statement"));
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
        var declareStatement = new DeclareStatement_1.default(-1, -1, this.variable);
        this.option = [];
        text += declareStatement.getDeclareStatementText(this.variableIsNew) + '; ';
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
    return ForStatement;
}(Statement_1.default));
exports.default = ForStatement;

},{"../../utilities/ReturnClone":29,"./DeclareStatement":3,"./Statement":8,"./helper/options/Option":17}],5:[function(require,module,exports){
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
    return IfStatement;
}(Statement_1.default));
exports.default = IfStatement;

},{"../../utilities/ReturnClone":29,"./Statement":8,"./helper/ifs/If":16}],6:[function(require,module,exports){
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
    return InputStatement;
}(Statement_1.default));
exports.default = InputStatement;

},{"../../utilities/ReturnClone":29,"../variable/Char":19,"../variable/Double":20,"../variable/Float":21,"../variable/Integer":22,"../variable/Long":23,"./Statement":8,"./helper/options/Option":17}],7:[function(require,module,exports){
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
var Option_1 = __importDefault(require("./helper/options/Option"));
var Statement_1 = __importDefault(require("./Statement"));
var OutputStatement = /** @class */ (function (_super) {
    __extends(OutputStatement, _super);
    function OutputStatement(statementId, level, isNewLine, type, variable, text) {
        var _this = _super.call(this, level) || this;
        _this.variable = undefined;
        _this.text = undefined;
        _this.variable = variable;
        _this.statementId = _this.generateId(statementId);
        _this.isNewLine = isNewLine;
        _this.type = type;
        _this.text = text;
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
    return OutputStatement;
}(Statement_1.default));
exports.default = OutputStatement;

},{"../../utilities/ReturnClone":29,"./Statement":8,"./helper/options/Option":17}],8:[function(require,module,exports){
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
    Statement.prototype.moveToSurface = function () {
        this.level = 1;
        this.parent = undefined;
    };
    Statement.prototype.getParent = function () {
        return this.parent;
    };
    Statement.prototype.generateId = function (number) { };
    Statement.prototype.writeToCanvas = function (canvas, isClose) { };
    Statement.prototype.updateChildStatement = function (childStatement) { };
    Statement.prototype.callClickEvent = function (canvas, x, y) { };
    Statement.prototype.findVariable = function (variable) { return undefined; };
    Statement.prototype.cloneStatement = function (statementCount) { return new ReturnClone_1.default(this, false); };
    Statement.prototype.findStatement = function (statement) { return false; };
    return Statement;
}());
exports.default = Statement;

},{"../../utilities/ReturnClone":29}],9:[function(require,module,exports){
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
var Option_1 = __importDefault(require("./helper/options/Option"));
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
            for (var i = 0; i < this.caseStatement.length; i++)
                this.caseStatement[i].parent = this;
    };
    SwitchStatement.prototype.writeToCanvas = function (canvas) {
        var upper = canvas.LAST_POSITION + canvas.LINE_HEIGHT + canvas.SPACE;
        var text = 'SWITCH (' + this.variable.name + ' )';
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
    return SwitchStatement;
}(Statement_1.default));
exports.default = SwitchStatement;

},{"../../utilities/ReturnClone":29,"./Statement":8,"./helper/options/Option":17}],10:[function(require,module,exports){
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
var Option_1 = __importDefault(require("./helper/options/Option"));
var Statement_1 = __importDefault(require("./Statement"));
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
    return WhileStatement;
}(Statement_1.default));
exports.default = WhileStatement;

},{"../../utilities/ReturnClone":29,"./Statement":8,"./helper/options/Option":17}],11:[function(require,module,exports){
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
var Statement_1 = __importDefault(require("../../Statement"));
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
        if (!this.isDefault)
            text = 'CASE ' + this.condition.secondVariable.value + ':\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t';
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
    return Case;
}(Statement_1.default));
exports.default = Case;

},{"../../../../utilities/ReturnClone":29,"../../Statement":8,"../options/Option":17}],12:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Char_1 = __importDefault(require("../../../variable/Char"));
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
    return Condition;
}());
exports.default = Condition;

},{"../../../variable/Char":19,"../../../variable/String":24}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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
    return Elif;
}(If_1.default));
exports.default = Elif;

},{"../../../../utilities/ReturnClone":29,"./If":16}],15:[function(require,module,exports){
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
var Statement_1 = __importDefault(require("../../Statement"));
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
    return Else;
}(Statement_1.default));
exports.default = Else;

},{"../../../../utilities/ReturnClone":29,"../../Statement":8,"../options/Option":17}],16:[function(require,module,exports){
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
var Statement_1 = __importDefault(require("../../Statement"));
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
    return If;
}(Statement_1.default));
exports.default = If;

},{"../../../../utilities/ReturnClone":29,"../../Statement":8,"../options/Option":17}],17:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClick_1 = __importDefault(require("../../../../utilities/ReturnClick"));
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
            || this.parent instanceof InputStatement_1.default || this.parent instanceof OutputStatement_1.default) {
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
        temp.push(new OptionSelection_1.default(this.optionId, 'DEL', '#ad0e0e', this.coorX + 225, this.coorX, this.coorY, 40, 40, this.parent));
        temp.push(new OptionSelection_1.default(this.optionId, 'EDT', '#e3e029', this.coorX + 270, this.coorX, this.coorY, 40, 40, this.parent));
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

},{"../../../../utilities/ReturnClick":28,"../../DeclareStatement":3,"../../ForStatement":4,"../../IfStatement":5,"../../InputStatement":6,"../../OutputStatement":7,"../../SwitchStatement":9,"../../WhileStatement":10,"./OptionSelection":18}],18:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClick_1 = __importDefault(require("../../../../utilities/ReturnClick"));
var ReturnPaste_1 = __importDefault(require("../../../../utilities/ReturnPaste"));
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
            mainListStatement = returnPaste.listStatement;
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
                || targetStatement instanceof OutputStatement_1.default || targetStatement instanceof InputStatement_1.default || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner))) {
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
                || targetStatement instanceof OutputStatement_1.default || targetStatement instanceof InputStatement_1.default || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner)) {
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
                || targetStatement instanceof OutputStatement_1.default || targetStatement instanceof InputStatement_1.default || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner))) {
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
                || targetStatement instanceof OutputStatement_1.default || targetStatement instanceof InputStatement_1.default || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner)) {
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

},{"../../../../utilities/ReturnClick":28,"../../../../utilities/ReturnPaste":30,"../../DeclareStatement":3,"../../ForStatement":4,"../../IfStatement":5,"../../InputStatement":6,"../../OutputStatement":7,"../../SwitchStatement":9,"../../WhileStatement":10,"../case/Case":11,"../ifs/Else":15,"../ifs/If":16}],19:[function(require,module,exports){
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
    return Char;
}(Variable_1.default));
exports.default = Char;

},{"../../utilities/Return":27,"./Variable":25}],20:[function(require,module,exports){
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
    return Double;
}(Variable_1.default));
exports.default = Double;

},{"../../utilities/Return":27,"./Variable":25}],21:[function(require,module,exports){
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
    return Float;
}(Variable_1.default));
exports.default = Float;

},{"../../utilities/Return":27,"./Variable":25}],22:[function(require,module,exports){
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
    return Integer;
}(Variable_1.default));
exports.default = Integer;

},{"../../utilities/Return":27,"./Variable":25}],23:[function(require,module,exports){
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
    return Long;
}(Variable_1.default));
exports.default = Long;

},{"../../utilities/Return":27,"./Variable":25}],24:[function(require,module,exports){
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
    return String;
}(Variable_1.default));
exports.default = String;

},{"../../utilities/Return":27,"./Variable":25}],25:[function(require,module,exports){
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
    Variable.prototype.validateValue = function () { };
    return Variable;
}());
exports.default = Variable;

},{"../../utilities/Return":27}],26:[function(require,module,exports){
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
        var className2 = 'col-xs-' + length;
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
        return $('<div></div>').addClass('col-sm-' + length).addClass('col-xs-' + length);
    }
    function createDeclareDataVariable(isRequired, isNumber) {
        var container = $('<div></div>').addClass('col-sm-12').addClass('col-xs-12');
        var hintContainer = $('<div></div>').addClass('col-sm-12').addClass('col-xs-12').addClass('mb-2').addClass('d-flex');
        hintContainer.append(createHint('Variable Name', 5));
        hintContainer.append(createWhiteSpace(1));
        hintContainer.append(createHint('Initial Value', 5));
        var inputContainer = $('<div></div>').addClass('col-sm-12').addClass('col-xs-12').addClass('mb-4').addClass('d-flex').addClass('align-items-center');
        var variableClassName = 'var-name-' + variableIndex;
        var inputClassName = 'input-val-' + variableIndex;
        var container1 = $('<div></div>').addClass('col-sm-5').addClass('col-xs-5');
        var container2 = $('<div></div>').addClass('col-sm-5').addClass('col-xs-5');
        var container3 = $('<div></div>').addClass('col-sm-1').addClass('col-xs-1').addClass('d-flex').addClass('justify-content-center');
        container1.append(createInputField('text').addClass(variableClassName));
        if (isNumber)
            container2.append(createInputField('number').addClass(inputClassName));
        else
            container2.append(createInputField('text').addClass(inputClassName));
        container3.append(createCloseBtn().data('value', variableIndex++));
        declareVariableNameList.push(variableClassName);
        declareVariableValueList.push(inputClassName);
        inputContainer.append(container1);
        inputContainer.append(createWhiteSpace(1));
        inputContainer.append(container2);
        if (!isRequired)
            inputContainer.append(container3);
        container.append(hintContainer);
        container.append(inputContainer);
        $('#pcInputContainer').append(container);
    }
    function createSelect(listVariable, length) {
        var className = 'col-sm-' + length;
        var className2 = 'col-xs-' + length;
        var container = $('<div></div>').addClass(className).addClass(className2);
        var select = $('<select></select>').addClass('form-select').addClass('col-sm-12').addClass('col-xs-12');
        var option;
        select.append($('<option></option>').val(null).text('Choose Variable'));
        for (var _i = 0, listVariable_1 = listVariable; _i < listVariable_1.length; _i++) {
            var variable = listVariable_1[_i];
            option = $('<option></option>').val(variable.name).text(variable.name);
            select.append(option);
        }
        container.append(select);
        return container;
    }
    function clearError() {
        $('#pcInputErrorContainer').empty();
        for (var _i = 0, declareVariableNameList_1 = declareVariableNameList; _i < declareVariableNameList_1.length; _i++) {
            var varName = declareVariableNameList_1[_i];
            $('.' + varName).removeClass('input-error');
        }
        for (var _a = 0, declareVariableValueList_1 = declareVariableValueList; _a < declareVariableValueList_1.length; _a++) {
            var varValue = declareVariableValueList_1[_a];
            $('.' + varValue).removeClass('input-error');
        }
        $('#chosenVariable').removeClass('input-error');
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
        var container = $('<div></div>').addClass('col-xs-12').addClass('col-sm-12').addClass('alert').addClass('alert-danger').text(message);
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
        var btn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-3').
            addClass('col-xs-3').addClass('addVariableDeclareBtn').data('value', isNumericValue).text('Add Variable');
        var createBtn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-2').
            addClass('col-xs-2').attr('id', 'createVariableBtn').data('value', $(this).data('value')).text('Create');
        $('#pcInputContainerLower').append(btn);
        $('#pcInputContainerLower').append($('<div></div>').addClass('col-sm-7').addClass('col-xs-7'));
        $('#pcInputContainerLower').append(createBtn);
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
        var container = $('<div></div>').addClass('d-flex').addClass('align-items-center');
        var select = createSelect(listVariable, 7).attr('id', 'chosenVariable');
        container.append(createHint('Variable Name', 5));
        container.append(select);
        container.addClass('mb-3');
        $('#pcInputContainer').append(container);
        var inputBtn = $('<button></button>').addClass('btn').addClass('btn-primary').addClass('col-sm-2').
            addClass('col-xs-2').attr('id', 'inputVariableBtn').data('value', $(this).data('value')).text('Select');
        $('#pcInputContainerLower').append($('<div></div>').addClass('col-sm-10').addClass('col-xs-10'));
        $('#pcInputContainerLower').append(inputBtn);
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
                drawCanvas();
            }
        }
    });
    // Click template button
    $(document).on('click', '.generateTemplate', function () {
        if ($(this).data('value') == 'blank') {
            blankTemplate();
        }
        else if ($(this).data('value') == 'declare') {
            declareVariableTemplate();
        }
        else if ($(this).data('value') == 'print') {
            simplyPrintTemplate();
        }
        else if ($(this).data('value') == 'io') {
            inputOutputTemplate();
        }
        else if ($(this).data('value') == 'nestedif') {
            nestedIfTemplate();
        }
        else if ($(this).data('value') == 'nestedfor') {
            nestedForTemplate();
        }
        else if ($(this).data('value') == 'menu') {
            menuTemplate();
        }
        else if ($(this).data('value') == 'drawsquare') {
            drawSquareTemplate();
        }
        else if ($(this).data('value') == 'oddeven') {
            oddEvenTemplate();
        }
        finishAction();
        restructureStatement();
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
    // Click output
    $(document).on('click', '.output', function () {
        if ($(this).data('value') == 'variable') {
        }
    });
    // Canvas logic
    initializeCanvas();
    var blockCanvasInstance; // instance of Class Canvas
    var canvas;
    var option = undefined;
    // Variables to handle canvas interaction (add, mov, pst)
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
        canvas.width = width;
        // canvas.height = Math.round(width * aspect);
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
                        drawCanvas();
                        return;
                    }
                    clipboard = cloneStatement(returnClick.statement);
                    lastSelectedOption = returnClick.option.optionName;
                }
                else if (returnClick.option.optionName == 'DEL') {
                    clipboard = returnClick.statement;
                    lastSelectedOption = returnClick.option.optionName;
                    handleDelete();
                }
                else if (returnClick.option.optionName == 'EDT') {
                    clipboard = returnClick.statement;
                    lastSelectedOption = returnClick.option.optionName;
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
            return;
        }
        if (clipboard.findStatement(returnClick.statement)) {
            createErrorMessage('Could not paste statement here!', 'bcErrorContainer');
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
        drawCanvas();
    }
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
        var forStatement = new ForStatement_1.default(1, statementCount++, undefined, variable, true, true, 1, new Condition_1.default(variable, '<', new Integer_1.default('x', 2), true));
        var nestedForStatement = new ForStatement_1.default(1, statementCount++, undefined, variable2, true, true, 1, new Condition_1.default(variable2, '<', new Integer_1.default('x', 3), true));
        var temp = [];
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'i: '));
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'variable', variable));
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'text', undefined, 'j: '));
        temp.push(new OutputStatement_1.default(statementCount++, 1, true, 'variable', variable2));
        nestedForStatement.updateChildStatement(temp);
        temp = [];
        temp.push(nestedForStatement);
        forStatement.updateChildStatement(temp);
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
        var secondCase = new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 1), true), undefined, false);
        var thirdCase = new Case_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 1), true), undefined, false);
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
        var declareStatement = new DeclareStatement_1.default(statementCount++, 1, variable);
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
        handleAdd(declareStatement);
        handleAdd(inputStatement);
        handleAdd(forStatement);
    }
    function oddEvenTemplate() {
        var variable = new Integer_1.default('number', 0);
        allVariableNames['number'] = true;
        listInteger.push(variable);
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var firstIf = new If_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 0), true));
        var secondIf = new If_1.default(1, statementCount++, new Condition_1.default(variable, '==', new Integer_1.default('x', 1), true));
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
        handleAdd(new DeclareStatement_1.default(statementCount++, 1, variable));
        handleAdd(new InputStatement_1.default(statementCount++, 1, variable));
        handleAdd(new AssignmentStatement_1.default(statementCount++, 1, variable, new Integer_1.default('x', 2), '%', true));
        handleAdd(ifStatement);
    }
});

},{"../classes/canvas/Canvas":1,"../classes/statement/AssignmentStatement":2,"../classes/statement/DeclareStatement":3,"../classes/statement/ForStatement":4,"../classes/statement/IfStatement":5,"../classes/statement/InputStatement":6,"../classes/statement/OutputStatement":7,"../classes/statement/SwitchStatement":9,"../classes/statement/WhileStatement":10,"../classes/statement/helper/case/Case":11,"../classes/statement/helper/general/Condition":12,"../classes/statement/helper/ifs/Elif":14,"../classes/statement/helper/ifs/Else":15,"../classes/statement/helper/ifs/If":16,"../classes/statement/helper/options/Option":17,"../classes/variable/Char":19,"../classes/variable/Double":20,"../classes/variable/Float":21,"../classes/variable/Integer":22,"../classes/variable/Long":23,"../classes/variable/String":24}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}]},{},[26]);
