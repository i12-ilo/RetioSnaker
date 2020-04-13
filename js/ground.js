var ground = new Ground(postionX, postionY, td * squareWidth, tr * squareWidth);
ground.init = function () {
    this.viewContent.style.position = "absolute";
    this.viewContent.style.left = this.x + "px";
    this.viewContent.style.top = this.y + "px";
    this.viewContent.style.width = this.width + "px";
    this.viewContent.style.height = this.height + "px";
    this.viewContent.style.backgroundColor = "orange";
    document.body.appendChild(this.viewContent);
    this.squareTable = [
        [],
        [],
        []
    ];
    for (var y = 0; y < tr; y++) {//外层循环
        this.squareTable[y] = new Array(30);
        for (var x = 0; x < td; x++) {
            // 用边界值来区分墙和地板
            if (x == 0 || x == td - 1 || y == 0 || y == tr - 1) {
                var newSquare = SquareFactory.create('Wall', x, y, 'black');//x,y记录的是坐标
            } else {
                var newSquare = SquareFactory.create('Floor', x, y, 'grey');
            }
            this.viewContent.appendChild(newSquare.viewContent);
            this.squareTable[y][x] = newSquare;
        }

    }

}

ground.remove = function (x, y) {// 在场景中删除小方块
    var curSquare = this.squareTable[y][x];
    // Dom中的删除
    this.viewContent.removeChild(curSquare.viewContent);
    // 在数据中删除
    this.squareTable[y][x] = null;

}

ground.append = function (Square) {  // 在场景中添加小方块
    // 在DOM中添加
    this.viewContent.appendChild(Square.viewContent);
    // 在数据中添加
    this.squareTable[Square.y][Square.x] = Square;


}
