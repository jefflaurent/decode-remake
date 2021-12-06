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

},{"../statement/helper/general/Coordinate":10}],2:[function(require,module,exports){
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
    return DeclareStatement;
}(Statement_1.default));
exports.default = DeclareStatement;

},{"../variable/Char":15,"../variable/Double":16,"../variable/Float":17,"../variable/Integer":18,"../variable/Long":19,"../variable/String":20,"./Statement":5,"./helper/options/Option":13}],3:[function(require,module,exports){
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
    return ForStatement;
}(Statement_1.default));
exports.default = ForStatement;

},{"./DeclareStatement":2,"./Statement":5,"./helper/options/Option":13}],4:[function(require,module,exports){
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
        if (this.ifOperations != undefined)
            for (var i = 0; i < this.ifOperations.length; i++) {
                this.ifOperations[i].level = this.level;
                this.ifOperations[i].updateChildLevel();
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
        if (this.ifOperations != undefined)
            for (var i = 0; i < this.ifOperations.length; i++)
                this.ifOperations[i].parent = this;
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
    return IfStatement;
}(Statement_1.default));
exports.default = IfStatement;

},{"./Statement":5}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Statement = /** @class */ (function () {
    function Statement(level) {
        this.statementId = '';
        this.level = level;
        this.childStatement = undefined;
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
    Statement.prototype.generateId = function (number) { };
    Statement.prototype.writeToCanvas = function (canvas, isClose) { };
    Statement.prototype.updateChildStatement = function (childStatement) { };
    Statement.prototype.callClickEvent = function (canvas, x, y) { };
    return Statement;
}());
exports.default = Statement;

},{}],6:[function(require,module,exports){
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
        for (var i = 0; i < this.caseStatement.length; i++) {
            console.log(this.caseStatement[i]);
            this.caseStatement[i].writeToCanvas(canvas);
        }
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
    return SwitchStatement;
}(Statement_1.default));
exports.default = SwitchStatement;

},{"./Statement":5,"./helper/options/Option":13}],7:[function(require,module,exports){
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
    return WhileStatement;
}(Statement_1.default));
exports.default = WhileStatement;

},{"./Statement":5,"./helper/options/Option":13}],8:[function(require,module,exports){
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
            text = 'CASE ' + this.condition.secondVariable.value + ':\t\t\t\t\t\t';
        else
            text = 'DEFAULT:' + '\t\t\t\t\t\t';
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
    return Case;
}(Statement_1.default));
exports.default = Case;

},{"../../Statement":5,"../options/Option":13}],9:[function(require,module,exports){
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
    return Condition;
}());
exports.default = Condition;

},{"../../../variable/Char":15,"../../../variable/String":20}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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
    return Elif;
}(If_1.default));
exports.default = Elif;

},{"./If":12}],12:[function(require,module,exports){
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
var Statement_1 = __importDefault(require("../../Statement"));
var Option_1 = __importDefault(require("../options/Option"));
var If = /** @class */ (function (_super) {
    __extends(If, _super);
    function If(level, statementId, firstCondition, logicalOperator, secondCondition, childStatement) {
        var _this = _super.call(this, level) || this;
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
    return If;
}(Statement_1.default));
exports.default = If;

},{"../../Statement":5,"../options/Option":13}],13:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DeclareStatement_1 = __importDefault(require("../../DeclareStatement"));
var ForStatement_1 = __importDefault(require("../../ForStatement"));
var IfStatement_1 = __importDefault(require("../../IfStatement"));
var SwitchStatement_1 = __importDefault(require("../../SwitchStatement"));
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
            || this.parent instanceof SwitchStatement_1.default || (this.parent instanceof ForStatement_1.default && splitted[splitted.length - 1] == 'outer'))
            this.optionSelection = this.generateCompleteOptions();
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

},{"../../DeclareStatement":2,"../../ForStatement":3,"../../IfStatement":4,"../../SwitchStatement":6,"./OptionSelection":14}],14:[function(require,module,exports){
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
var SwitchStatement_1 = __importDefault(require("../../SwitchStatement"));
var WhileStatement_1 = __importDefault(require("../../WhileStatement"));
var Case_1 = __importDefault(require("../case/Case"));
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
    OptionSelection.prototype.pasteMove = function (mainListStatement, clipboard, targetStatement, isInner) {
        // Removing statement
        if (clipboard.parent == undefined)
            mainListStatement = this.removeSourceStatement(mainListStatement, clipboard);
        else
            clipboard.parent.updateChildStatement(this.removeSourceStatement(clipboard.parent.childStatement, clipboard));
        /** List of possibilities:
          * - Paste after statement
          * -> Applies to DeclareStatement, IfStatement, ForStatement, SwitchStatement
          * - Paste inside a statement
          * -> Applies to If, Elif, Else, ForStatement, Case
        **/
        // Target is located on level 1
        if (targetStatement.parent == undefined) {
            if (targetStatement instanceof DeclareStatement_1.default || targetStatement instanceof IfStatement_1.default || targetStatement instanceof SwitchStatement_1.default
                || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner))
                mainListStatement = this.pasteStatement(mainListStatement, targetStatement, clipboard);
            else if (targetStatement instanceof If_1.default || targetStatement instanceof Case_1.default || (targetStatement instanceof ForStatement_1.default && isInner)
                || (targetStatement instanceof WhileStatement_1.default && isInner))
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard));
        }
        // Target is a child of another statement
        else {
            if (targetStatement instanceof DeclareStatement_1.default || targetStatement instanceof IfStatement_1.default || targetStatement instanceof SwitchStatement_1.default
                || (targetStatement instanceof ForStatement_1.default && !isInner) || (targetStatement instanceof WhileStatement_1.default && !isInner))
                targetStatement.parent.updateChildStatement(this.pasteStatement(targetStatement.parent.childStatement, targetStatement, clipboard));
            else if (targetStatement instanceof If_1.default || targetStatement instanceof Case_1.default || (targetStatement instanceof ForStatement_1.default && isInner)
                || (targetStatement instanceof WhileStatement_1.default && isInner))
                targetStatement.updateChildStatement(this.pasteStatement(targetStatement.childStatement, undefined, clipboard));
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
    return OptionSelection;
}());
exports.default = OptionSelection;

},{"../../../../utilities/ReturnClick":24,"../../../../utilities/ReturnPaste":25,"../../DeclareStatement":2,"../../ForStatement":3,"../../IfStatement":4,"../../SwitchStatement":6,"../../WhileStatement":7,"../case/Case":8,"../ifs/If":12}],15:[function(require,module,exports){
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

},{"../../utilities/Return":23,"./Variable":21}],16:[function(require,module,exports){
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

},{"../../utilities/Return":23,"./Variable":21}],17:[function(require,module,exports){
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

},{"../../utilities/Return":23,"./Variable":21}],18:[function(require,module,exports){
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

},{"../../utilities/Return":23,"./Variable":21}],19:[function(require,module,exports){
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

},{"../../utilities/Return":23,"./Variable":21}],20:[function(require,module,exports){
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

},{"../../utilities/Return":23,"./Variable":21}],21:[function(require,module,exports){
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

},{"../../utilities/Return":23}],22:[function(require,module,exports){
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
var ForStatement_1 = __importDefault(require("../classes/statement/ForStatement"));
var SwitchStatement_1 = __importDefault(require("../classes/statement/SwitchStatement"));
var Case_1 = __importDefault(require("../classes/statement/helper/case/Case"));
var WhileStatement_1 = __importDefault(require("../classes/statement/WhileStatement"));
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
        var div = $('<div></div>').addClass(className).addClass(className2).css('color', 'black');
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
    }
    function initInputDeclare(title) {
        $('#pcInputErrorContainer').empty();
        $('#pcInputContainer').empty();
        $('#pcInputContainerLower').empty();
        $('#command-name').text(title);
        declareVariableNameList = [];
        declareVariableValueList = [];
        variableIndex = 0;
    }
    function createErrorMessage(message) {
        var container = $('<div></div>').addClass('col-xs-12').addClass('col-sm-12').addClass('alert').addClass('alert-danger').text(message);
        $('#pcInputErrorContainer').append(container);
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
            listStatement.push(new DeclareStatement_1.default(statementCount++, 1, variable));
        }
    }
    // Declare Variable
    $(document).on('click', '.addVariableDeclareBtn', function () {
        console.log($(this).data('value'));
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
                createErrorMessage('Variable name must be unique');
                return;
            }
            else
                tempAllVariableNames[variableName] = true;
            if (!returnName.bool) {
                $('.' + declareVariableNameList[i]).addClass('input-error');
                createErrorMessage(returnName.message);
                return;
            }
            if (sameVariableName) {
                $('.' + declareVariableNameList[i]).addClass('input-error');
                createErrorMessage('Variable name has been declared before');
                return;
            }
            if (!returnValue.bool) {
                $('.' + declareVariableValueList[i]).addClass('input-error');
                createErrorMessage(returnValue.message);
                return;
            }
        }
        // Insert every declared variable and declare statement instance to list
        insertToVariableList();
        // Push statement to canvas
        drawCanvas();
    });
    $('.declareVariable').on('click', function () {
        var isNumericValue;
        if ($(this).data('value') == 'int')
            initInputDeclare('Declare Integer');
        else if ($(this).data('value') == 'long')
            initInputDeclare('Declare Long');
        else if ($(this).data('value') == 'float')
            initInputDeclare('Declare Float');
        else if ($(this).data('value') == 'double')
            initInputDeclare('Declare Double');
        else if ($(this).data('value') == 'char')
            initInputDeclare('Declare Char');
        else if ($(this).data('value') == 'string')
            initInputDeclare('Declare String');
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
    // Helper Functions
    function initInputVariable() {
        $('#pcInputErrorContainer').empty();
        $('#pcInputContainer').empty();
        $('#pcInputContainerLower').empty();
        $('#command-name').text('');
        declareVariableNameList = [];
        declareVariableValueList = [];
        variableIndex = 0;
    }
    // Input to Variable
    $(document).on('click', '.inputVariable', function () {
        if ($(this).data('value') == 'int') {
            initInputDeclare('Declare Integer');
            testing();
        }
        else if ($(this).data('value') == 'long') {
            initInputDeclare('Declare Long');
            testing2();
        }
        else if ($(this).data('value') == 'float') {
            initInputDeclare('Declare Float');
            testing3();
        }
        else if ($(this).data('value') == 'double') {
            initInputDeclare('Declare Double');
            testing4();
        }
        else if ($(this).data('value') == 'char') {
            initInputDeclare('Declare Char');
            testing5();
        }
        else if ($(this).data('value') == 'string')
            initInputDeclare('Declare String');
    });
    // Canvas logic
    initializeCanvas();
    var blockCanvasInstance; // instance of Class Canvas
    var canvas;
    // Variables to handle move and copy
    var originStatement;
    var clipboard = undefined;
    var lastSelectedOption = undefined;
    // Initialize Canvas
    function initializeCanvas() {
        canvas = document.getElementById('block-code-canvas');
        resizeCanvas();
        handleCanvasClick();
        blockCanvasInstance = new Canvas_1.default(canvas, canvas.getContext('2d'), 40, 30, 5);
        setTimeout(function () {
            blockCanvasInstance.createOption(30, 30);
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
        for (var i = 0; i < listStatement.length; i++) {
            statement = listStatement[i];
            statement.writeToCanvas(blockCanvasInstance);
        }
    }
    // Handle Event
    function handleCanvasClick() {
        canvas.addEventListener('click', function (event) {
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            var statement;
            var temp = undefined;
            var returnPaste;
            for (var i = 0; i < listStatement.length; i++) {
                statement = listStatement[i];
                temp = statement.callClickEvent(blockCanvasInstance, x, y);
                if (temp != undefined)
                    break;
            }
            if (temp != undefined) {
                if (temp.option.optionName == 'ARR') {
                }
                else if (temp.option.optionName == 'ADD') {
                }
                else if (temp.option.optionName == 'PST') {
                    if (clipboard == undefined) {
                        alert('Clipboard is empty!');
                    }
                    else {
                        var splitted = temp.option.optionId.split('-');
                        var isInner = splitted[splitted.length - 1] == 'inner' ? true : false;
                        if (lastSelectedOption == 'MOV') {
                            returnPaste = temp.option.pasteMove(listStatement, clipboard, temp.statement, isInner);
                            listStatement = returnPaste.listStatement;
                            if (returnPaste.result == true) {
                                clipboard = undefined;
                                lastSelectedOption = 'PST';
                                restructureStatement();
                                drawCanvas();
                            }
                        }
                    }
                }
                else if (temp.option.optionName == 'MOV' || temp.option.optionName == 'CPY') {
                    clipboard = temp.statement;
                    lastSelectedOption = temp.option.optionName;
                }
                else if (temp.option.optionName == 'DEL') {
                }
                else if (temp.option.optionName == 'EDT') {
                }
            }
        });
    }
    function restructureStatement() {
        if (listStatement == undefined)
            return;
        for (var i = 0; i < listStatement.length; i++) {
            listStatement[i].moveToSurface();
            listStatement[i].updateChildLevel();
        }
    }
    function testing() {
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var ifs = [];
        var firstIf = new If_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt', 5), '==', new Integer_1.default('testInt2', 10), true), undefined, undefined, undefined);
        var child1 = new DeclareStatement_1.default(statementCount++, firstIf.level + 1, new Integer_1.default('myInteger', 10));
        var child2 = new DeclareStatement_1.default(statementCount++, firstIf.level + 1, new Integer_1.default('mySecondInteger', 25));
        var childStatements = [];
        childStatements.push(child1);
        childStatements.push(child2);
        firstIf.updateChildStatement(childStatements);
        var secondIf = new Elif_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt3', 10), '!=', new Integer_1.default('testInt4', 200), false), undefined, undefined, undefined);
        var thirdIf = new Elif_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt4', 10), '!=', new Integer_1.default('testInt6', 200), false), undefined, undefined, undefined);
        ifs.push(firstIf);
        ifs.push(secondIf);
        ifs.push(thirdIf);
        ifStatement.updateIfOperations(ifs);
        ifStatement.writeToCanvas(blockCanvasInstance);
        listStatement.push(ifStatement);
    }
    function testing2() {
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var ifs = [];
        var firstIf = new If_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt5', 5), '==', new Integer_1.default('testInt10', 10), true), undefined, undefined, undefined);
        var child1 = new DeclareStatement_1.default(statementCount++, firstIf.level + 1, new Integer_1.default('myInteger2', 10));
        var child2 = new DeclareStatement_1.default(statementCount++, firstIf.level + 1, new Integer_1.default('mySecondInteger2', 25));
        var childStatements = [];
        childStatements.push(child1);
        childStatements.push(child2);
        firstIf.updateChildStatement(childStatements);
        var secondIf = new Elif_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt6', 10), '!=', new Integer_1.default('testInt8', 200), false), undefined, undefined, undefined);
        var thirdIf = new Elif_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt7', 10), '!=', new Integer_1.default('testInt9', 200), false), undefined, undefined, undefined);
        ifs.push(firstIf);
        ifStatement.updateIfOperations(ifs);
        ifStatement.writeToCanvas(blockCanvasInstance);
        listStatement.push(ifStatement);
    }
    function testing3() {
        var temp = [];
        var ifStatement = new IfStatement_1.default(1, statementCount++, undefined);
        var ifs = [];
        var firstIf = new If_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt', 5), '==', new Integer_1.default('testInt2', 10), true), undefined, undefined, undefined);
        var child1 = new DeclareStatement_1.default(statementCount++, firstIf.level + 1, new Integer_1.default('myInteger', 10));
        var child2 = new DeclareStatement_1.default(statementCount++, firstIf.level + 1, new Integer_1.default('mySecondInteger', 25));
        var childStatements = [];
        childStatements.push(child1);
        childStatements.push(child2);
        firstIf.updateChildStatement(childStatements);
        var secondIf = new Elif_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt3', 10), '!=', new Integer_1.default('testInt4', 200), false), undefined, undefined, undefined);
        var thirdIf = new Elif_1.default(ifStatement.level, statementCount++, new Condition_1.default(new Integer_1.default('testInt4', 10), '!=', new Integer_1.default('testInt6', 200), false), undefined, undefined, undefined);
        ifs.push(firstIf);
        ifs.push(secondIf);
        ifs.push(thirdIf);
        ifStatement.updateIfOperations(ifs);
        temp.push(ifStatement);
        var forStatement = new ForStatement_1.default(1, statementCount++, undefined, new Integer_1.default('testInt', 5), true, true, 1, new Condition_1.default(new Integer_1.default('testInt', 5), '<', new Integer_1.default('testInt2', 10), true));
        forStatement.updateChildStatement(temp);
        forStatement.updateChildLevel();
        forStatement.writeToCanvas(blockCanvasInstance);
        listStatement.push(forStatement);
    }
    function testing4() {
        var temp = [];
        var switchStatement;
        temp.push(new Case_1.default(2, statementCount++, new Condition_1.default(new Integer_1.default('tempInt', 5), '==', new Integer_1.default('tempInt2', 10), true), undefined, false));
        temp.push(new Case_1.default(2, statementCount++, undefined, undefined, true));
        switchStatement = new SwitchStatement_1.default(1, statementCount++, new Integer_1.default('tempInt', 5), undefined);
        switchStatement.updateChildStatement(temp);
        switchStatement.writeToCanvas(blockCanvasInstance);
        listStatement.push(switchStatement);
    }
    function testing5() {
        var temp = [];
        var whileStatement;
        whileStatement = new WhileStatement_1.default(1, statementCount++, true, undefined, new Condition_1.default(new Long_1.default('testLong', '15'), '<', new Long_1.default('testLong2', '500'), false), 'OR', new Condition_1.default(new Double_1.default('testDouble', '15'), '<', new Double_1.default('testDouble2', '500'), true));
        whileStatement.writeToCanvas(blockCanvasInstance);
        listStatement.push(whileStatement);
    }
});

},{"../classes/canvas/Canvas":1,"../classes/statement/DeclareStatement":2,"../classes/statement/ForStatement":3,"../classes/statement/IfStatement":4,"../classes/statement/SwitchStatement":6,"../classes/statement/WhileStatement":7,"../classes/statement/helper/case/Case":8,"../classes/statement/helper/general/Condition":9,"../classes/statement/helper/ifs/Elif":11,"../classes/statement/helper/ifs/If":12,"../classes/variable/Char":15,"../classes/variable/Double":16,"../classes/variable/Float":17,"../classes/variable/Integer":18,"../classes/variable/Long":19,"../classes/variable/String":20}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReturnClick = /** @class */ (function () {
    function ReturnClick(statement, option) {
        this.statement = statement;
        this.option = option;
    }
    return ReturnClick;
}());
exports.default = ReturnClick;

},{}],25:[function(require,module,exports){
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

},{}]},{},[22]);
