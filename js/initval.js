//这个文件中存放一些全局性的东西
// 常用的一些变量
// 创建一个最基础的方块的构造函数
// 根据方块的构造函数，创建多个元素对象
// 存储蛇头和其他格子碰撞的处理方式信息
// 游戏区域大小
var td = 30;//宽度，列数（单位为一个小格子）
var tr = 30;
// 每个方块的宽度
var squareWidth = 20;
// 游戏一开始的坐标
var postionX = 200;
var postionY = 50;
//  蛇移动的间隔时间
var intervalTime = 300;
// 定义最基础的方块的构造函数，每个元素都是从这里继承而来
function Square(x, y, width, height, dom) {
    //dom 创建的小方块要放在哪里（哪个dom对象中）
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement("div");
}

Square.prototype.upDate= function(x,y){
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x*squareWidth+"px";
    this.viewContent.style.top = y*squareWidth+"px";
}

var Ground = tool.single(Square);
// 整个游戏场景，它在页面中只有一个，所以使用单例去继承
var Floor = tool.extends(Square);
var Wall = tool.extends(Square);
var SnakeHead = tool.single(Square);
var SnakeBody = tool.extends(Square);
var Snake = tool.single();
var Food = tool.single(Square);
var Game = tool.single();
// 定义一个全局的变量，来标识小方块的类型
var collideType = {
    move: "move",
    eat: "eat",
    die: "die"
}