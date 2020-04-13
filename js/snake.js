var snake = new Snake();
snake.head = null;
snake.tail = null;
var directionNum = {
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    },
    bottom: {
        x: 0,
        y: 1
    }
}
snake.init = function () {
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'deeppink');
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green');
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

     //初始化以后把蛇头与蛇尾的信息存储一下
     this.head = snakeHead;
     this.tail = snakeBody2;

    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);
    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);
    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);
    // 实现链表的关系
    //  每个对象上存储两个属性 next,last
    snakeHead.next = snakeBody1;// 蛇头的左边是第一个蛇身
    snakeHead.last = null;  // 蛇头的右边是一个
    snakeBody1.next = snakeBody2;//第一个蛇身的左边是第二个蛇身
    snakeBody1.last = snakeHead;
    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    // 这个属性存储的是蛇走的方向，默认为往右走
    snake.direction = directionNum.right;
}


//蛇走的下一个格子十分关键，如果下一个是墙或者是自己的身体---->die
//如果下一个是食物，floor,------>不会die

// 获取蛇头要走到的下一个格子，要根据下一个格子做出不同的逻辑处理
snake.getCollideSquare = function () {
    var nextSqaure = ground.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    // 根剧取到的不同类型，做出不同的处理
    this.collideMethod[nextSqaure.collide](nextSqaure);
    console.log(nextSqaure.collide)

}
// 碰撞的处理方式（走，吃，挂）
snake.collideMethod = {
    move: function (square, boolean) {
        //在旧蛇头的位置创建一个新身体
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');

        //更新链表的关系
        newBody.next = snake.head.next;	//新身体的左边改成body1，由于没有body1（body1=snake.head.next;）
		newBody.last = null;			//新身体的右边为null
		newBody.next.last = newBody;	//body1的右侧为新身体

        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);

        //在碰撞方块的位置创建一个新蛇头
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'red');
        //更新链表的关系
		newHead.next = newBody;	//蛇头左边是新身体
		newHead.last = null;	//蛇头右边啥也没有
		newBody.last = newHead;	//新身体的右边是蛇头

        ground.remove(square.x, square.y);  //移除掉下一个方块
        ground.append(newHead);

        snake.head = newHead;

        /*
			处理最后一节身体
				1、最后一节身体要不要删除，删除就是走。不删除就是吃。我用一个变量来决定它
				2、如果这个变量没有传，就表示现在要走，走的话就要删除了，删完了还需要添加一个地板
		 */
        if(!boolean){
            var newFloor=SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'grey');
            ground.remove(snake.tail.x,snake.tail.y);
            ground.append(newFloor);
            snake.tail=snake.tail.last;
        }
    },
    eat: function (square) {
        this.move(square, true);
        createFood();
        game.score++;

    },
    die: function () {
        game.over();

    }

}
