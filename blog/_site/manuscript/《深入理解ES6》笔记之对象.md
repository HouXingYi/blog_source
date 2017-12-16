

# 《深入理解ES6》笔记之对象

## ES6中对象的扩展

### 对象字面量语法扩展

在ES6中通过属性初始化的简写语法，可以消除属性名称与局部变量之间的重复书写。如下：

```
//ES5
var person = {
    name : name,
    age : age
}
```

而在ES6中，可以简写成

```
//ES6
var person = {
    name,
    age 
}
```

对于对象的方法也是一样可以简写，如下：

```
//ES5
var person = {
    name : 'tony',
    sayName : function(){
        console.log(this.name);
    }
}
```

而在ES6中可以将方法简写

```
//ES6
var person = {
    name : 'tony',
    sayName(){
        console.log(this.name);
    }
}
```

ES6可以在对象字面量中使用可计算属性名称，如下:

```
let lastName = "last name";

let person = {
    "first name" : "Nicholas",
    [lastname] : "Zakas"
};

console.log(person["first name"]);    //"Nicholas"
console.log(person[lastname]);        //"Zakas"
```

### 新增方法

Object.assign()对象实现的就是众多库实现的Mixin或extend方法类似。主要的用途是将一个或者多个复制对象的属性和方法赋给接受对象并返回。例子如下:

```
var receiver = {};

Object.assign(receiver,
    {
        type: "js",
        name: "file.js"
    },
    {
        type: "css"
    }
)
```

### 增强对象原型

在ES6中，添加了Object.setPrototypeof()方法，这个方法可以改变任意指定对象的原型，它接受两个参数：被改变原型的对象及替代第一个参数原型的对象。举个例子:

```
let person = {
    getGreeting() {
        return "Hello";
    }
};

let dog = {
    getGreeting() {
        return "Woof";
    }
};

//以person对象为原型
let friend = object.create(person); 
console.log(friend.getgreeting());                           //"Hello"
console.log(Object.getPrototypeOf(friend) === person);       //true

//将原型设为dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getgreeting());                           //"Woof"
console.log(Object.getPrototypeOf(friend) === dog);       //true
```

上面这个例子中friend的原型本来是person后面又将原型改为dog

如果你想重写对象实例的方法，又需要调用与它同名的原型方法，在ES5中我们可以像下面这样：

```
let person = {
    getGreeting() {
        return "Hello";
    }
};

let dog = {
    getGreeting() {
        return "Woof";
    }
};

let friend = {
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
}

//将原型设为person
Object.setPrototypeOf(friend, person);
console.log(friend.getgreeting());                           //"Hello, hi!"
console.log(Object.getPrototypeOf(friend) === person);       //true

//将原型设为dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getgreeting());                           //"Woof, hi!"
console.log(Object.getPrototypeOf(friend) === dog);       //true
```

在ES6中可以简写成下面这样:





















