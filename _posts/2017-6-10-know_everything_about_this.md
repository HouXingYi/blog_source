---
layout: post
title: "理解JS的this关键字"
subtitle: "在我们的日常开发中经常会用到this，但即使是经常使用this的开发者有时也不能准确的说出this指向什么。我在此参考You Dont Know JS这本书试图把this的机制搞清楚。"
date: 2017-06-10
author: HouXingYi
category: 前端
tags: this js
finished: true
---

## this是什么

this是JavaScript中一个关键字，this提供了一种优雅的方式来隐式传递一个对象引用，因此可以把API设计得更加简洁并且易于复用。  
但是，在平常使用中经常会对this产生一些误解，比较常见的会认为this“指向自身”或者“指向函数的作用域”  

### 指向自身
对于这个误解可以看下以下代码
```
function foo(){
    this.a = 1;
}
foo.a = 0;
foo();
console.log(foo.a);//0
console.log(this.a);//1
console.log(window.a);//1
```
通过以上代码可以看到，this并不指向foo而是指向了window，可见this指向自身并不成立
### 指向函数的作用域
这也是个常见的误解,请看一下代码
```
function foo(){
    var a = 1;
    bar();
}
function bar(){
    console.log( this.a );
}
foo();//undefined
```
这段代码，希望利用this向上查找到a，代替作用域的效果，但并没有成功。
### this究竟是什么
通过以上一些例子，我们可以看到，this的指向飘忽不定,在不同的场景下，this会化身不同的对象。如果不了解this的机制就很难猜到this的指向。  
那么this究竟是什么？  
***先上结论：实际上，this是在运行的时候进行绑定的，并不是在编写时绑定，它指向什么完全取决于函数在哪里被调用。***


## this绑定规则
要确定this的值，首先要看函数的调用位置。找到调用位置后，需要判断应用下面四条规则的哪一条
### 默认绑定
这条规则是无法应用其他规则时的默认规则,请看以下代码
```
function foo(){
    console.log( this.a );
}
var a = 2;
foo();//2
```
在这里，foo()是直接进行调用，因此只能使用默认绑定，this指向全局对象。
### 隐式绑定
这种情况是函数是被某个上下文对象调用的，比如下面的代码
```
var o = {
    a:3,
    foo:function(){
        console.log(this.a);
    }
}
o.foo();
```
#### 隐式丢失
隐式绑定一个常见的问题是被隐式绑定的函数会丢失绑定对象，比较常见的情况如下
```
function foo(){
    console.log(this.a);
}
function doFoo(fn){
    fn();
}
var obj = {
    a : 2,
    foo : foo
}
var a = "global";
doFoo(obj.foo);//global
```
这里没有如预想的应用隐式绑定，而是应用了默认绑定，将this绑定到全局对象上了，这种情况在应用隐式绑定的时候经常遇到。
### 显式绑定
显式绑定通过call()或apply()方法，用于显式的指定this的绑定对象
```
function foo(){
    console.log(this.a);
}
var obj = {
    a : 2
}
foo.call(obj);// 2
```
#### 硬绑定
但是，显式绑定并没有解决我们之前提出的丢失绑定问题，但是显式绑定的一个变种可以解决这个问题
```
function foo(something){
    console.log( this.a,something );
    return this.a + something;
}
function bind(fn,obj){
    return function(){
        return fn.apply(obj,arguments);
    }
}
function doFoo(fn,arg){
    fn(arg);
}
var obj = {
    a:2
};
var bar = bind(foo,obj);
doFoo(bar,3);// 2 3 
```
这里，我们创建了一个bind函数用于绑定函数与上下文对象，这种模式称为*硬绑定*。  
ES5中提供了内置的bind方法
### new绑定
在JS中，对函数使用new操作符的时候，我们称此函数为构造函数，或者更准确的说，对这个函数进行了“构造调用”。  
使用new来调用函数，会自动执行下面的操作。
1. 创建一个全新的对象
2. 这个新对象会被执行[[Prototype]]连接(新对象的_proto_指向函数的原型)
3. 这个新对象会绑定到函数调用的this
4. 如果函数没有返回，自动返回这个新对象  

new是最后一种可以影响函数调用时this绑定行为的方法，我们称之为new绑定

### 优先级

现在我们已经了解了函数调用中this绑定的四条规则，你需要做的就是找到函数的调用位置并判断应当应用哪条规则。如果某个调用位置可以应用多条，我们按照优先级应用这四条规则。  
1. 函数是否在new中调用(new绑定)？如果是的话this绑定的是新创建的对象。 
2. 函数是否通过call、apply(显式绑定)或者硬绑定调用？如果是的话，this绑定的是指定的对象。
3. 函数是否在某个上下文对象中调用(隐式绑定)？如果是的话，this绑定的是那个上下文对象。
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定到全局对象。

## 结束
一般情况下通过以上四种规则就可以理解大部分的this的使用情况。当然除了这些一般的情况下也有一些例外，比如ES6的箭头函数中的this会继承外层函数调用的this绑定。碰到这些例外情况就具体情况具体分析了。





