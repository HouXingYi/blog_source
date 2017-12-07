
# 《深入理解ES6》笔记之函数


## 函数形参的默认值

在ES6中可以为函数形参指定默认值，如下：

```
function makeRequest(url, timeout = 2000,callback = function() {}) {

    //函数的其余部分

}
```

还可以使用非原始值传参,如下面这样

```
let value = 5;

function() {
    return value++;
}

function add(first,second = getValue()){
    return first+second;
}

console.log(add(1,1));     //2
console.log(add(1));       //6
console.log(add(1));       //7
```

getValue在声明的时候不会调用，只有在调用add且不传入第二个参数时才会调用。

## 不定参数

在函数的命名参数前添加三个点(...)就表明这是一个不定参数，该参数为一个数组，包含着自它之后传入的所有参数，通过这个数组名即可逐一访问里面的参数。

```
function checkArgs(normalPara,...args){
    console.log(normalPara);
    console.log(args.length);
    console.log(arguments.length);
    console.log(args[0],arguments[1]);
    console.log(args[1],arguments[2]);
}

checkArgs("a","b","c");
```
调用checkArgs()，输出以下内容
```
a
2
3
b b
c c
```

## 箭头函数




























