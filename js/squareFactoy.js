// 创建工厂模式

//1. 创建一个管理者
// 2. 包装创建方块的构造函数（子工厂，生产线）
// 3. 创建一个对外的接口
function SquareFactory() {

}

SquareFactory.prototype.init = function (square, color, action) {
    square.viewContent.style.position = "absolute";
    square.viewContent.style.left = square.x * squareWidth + 'px';
    square.viewContent.style.top = square.y * squareWidth + "px";
    square.viewContent.style.width = square.width + "px";
    square.viewContent.style.height = square.height + "px";
    square.viewContent.style.background = color;
    square.collide = action;
}
// 地板
// x---> 列  y---->行
SquareFactory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x, y, squareWidth, squareWidth);
    this.init(floor, color, collideType.move);
    return floor;
}
// 墙
SquareFactory.prototype.Wall = function (x, y, color) {
    var wall = new Wall(x, y, squareWidth, squareWidth);
    this.init(wall, color, collideType.die);
    return wall;
}
// 蛇头
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var snakehead = new SnakeHead(x, y, squareWidth, squareWidth);
    this.init(snakehead, color, collideType.die);
    snakehead.upDate(x,y);
    return snakehead;
}
// 蛇身
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var snakeBody = new SnakeBody(x, y, squareWidth, squareWidth);
    this.init(snakeBody, color, collideType.die);
    return snakeBody;
}

// 食物

SquareFactory.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, squareWidth, squareWidth);
    this.init(food, color, collideType.eat);
    food.upDate(x,y);
    return food;
}

SquareFactory.create = function (type, x, y, color) {
    if (typeof SquareFactory.prototype[type] == "undefined") {
        throw "not find this type";
    }
    // 让子工厂（构造函数）继承SquareFatory
    SquareFactory.prototype[type].prototype = new SquareFactory();
    return new SquareFactory.prototype[type](x, y, color);
}

