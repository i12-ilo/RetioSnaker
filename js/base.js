//这个文件中放置一些公用的方法  使用的频率比较高的方法都会放在这个里面
// 1. 继承
// 2. 扩展
// 3.单例

var tool = {
    inherit: function (target, origin) {//继承方法
        var F = function () { };
        F.prototype = origin.prototype;
        target.prototype = new F();
        target.prototype.construcotr = target;

    },
    extends: function (origin) {//扩展的方法
        var target = function () {
            //加载私有的属性方法  this.x = x; this.y = y; this.width = width; this.height = height;
            origin.apply(this, arguments);
            //最终new的时候，相当于是对象调用，this还是指向对象
        }
        this.inherit(target, origin);//这一步是继承父类的原型方法
        return target;

    },
    single: function (origin) {
        // 这也是创建一个origin的子类
        // 单例  ---->原理：形成了闭包，一直存在内存之中，一直可以被访问到
        var target = (function () {
            let instance;
            return function () {
                if (typeof instance == "object") {
                    return instance;
                }
                origin && origin.apply(this, arguments);// 让target可以有this.x = x......
                instance = this;
            }

        })();
        origin && this.inherit(target, origin);//让target这个构造函数可以拥有origin的原型
        return target;

    }
}

// function Square(x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
// }
// Square.prototype.collide = function () {
//     console.log("collide");
// }
// function Food() { };
// // tool.inherit(Food, Square);// 继承了Square的原型
// // var f = new Food();
// // console.log(f.collide());

// // var Food = tool.extends(Square);//以Square作为父类来创建一个子类
// // var f = new Food(10,10,100,100);
// // console.log(f)

// var TestSquare = tool.single(Square);
// // tool.single 调用了之后放回了一个内部的target的构造函数,instance只能被target访问到
// // 第一次new的时候这个类的私有属性instance还是undefined,等第一次new完之后，下一次返回的永远是第一次new时所创建的对象
// var s1 = new TestSquare(10,10,100,100);

// var s2 = new TestSquare(10,67,100,100);
