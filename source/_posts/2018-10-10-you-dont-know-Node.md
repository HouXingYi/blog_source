---
layout: post
title: "[译]你不知道Node（未完成，未上传）"
subtitle: "10 Languages That Compile to JavaScript"
date: 2018-10-10
author: HouXingYi
category: 翻译
tags: JS
finished: true
---

```
原文:https://webapplog.com/you-dont-know-node/
```

# 你不知道Node：核心特性的快速介绍

![dog](/images/youDontKnowNode/pic1.png)

这篇文章是由Kyle Simpson的系列书籍，[You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)。它们是好的JavaScript基础入门书籍。除了一些我将会在文章中强调的不同，Node基本上就是JavaScript。代码在[you-dont-know-node](https://github.com/azat-co/you-dont-know-node)github仓库下的`code`文件夹下。

为什么在意Node？Node是JavaScript而JavaScript几乎要占领世界了。如果更多开发者掌握Node这个世界岂不是变得更好？更好的应用等于更好的人生！

这是一个主观的最有趣的核心特性大合集。这篇文章的重点如下：

1. Event loop（事件循环）：温习下使非阻塞I/O成为可能的核心概念
2. Global（全局变量） 和 process（进程）：如何获得更多信息
3. Event emitters（事件发射器）：基于事件模式的速成课
4. Streams（流） 和 buffers（缓冲区）：处理数据的高效方式
5. Clusters（集群）:像一个专家一样fork进程
6. Handling async errors: AsyncWrap, Domain and uncaughtException
7. C++ addons: Contributing to the core and writing your own C++ addons

## Event Loop

我们可以从Node的核心事件循环开始

![dog](/images/youDontKnowNode/pic2.png)

Node.js Non-Blocking I/O

它允许在处理IO调用的过程中处理其他任务。想想看Nginx vs. Apache。它让Node更快更有效率因为阻塞式I/O十分昂贵！

看下这个在 java 中基础的延迟`println`函数的例子：

```
System.out.println("Step: 1");
System.out.println("Step: 2");
Thread.sleep(1000);
System.out.println("Step: 3");
```

和Node代码是可比较的（实际上不行）：

```
console.log('Step: 1')
setTimeout(function () {
  console.log('Step: 3')
}, 1000)
console.log('Step: 2')
```

实际并不相同。你需要开始用异步的方式思考。Node脚本输出是1，2，3，但如果我们在“Step 2”后放更多语句，它们将会在`setTimeout`回调之前运行。看看以下片段：

```
console.log('Step: 1')
setTimeout(function () {
  console.log('Step: 3')
  console.log('Step 5')
}, 1000);
console.log('Step: 2')
console.log('Step 4')
```

最终产出1，2，4，3，5。这是因为setTimeout把它的回调放入事件循环的未来循环中了。

把事件循环想象成一个永远旋转的循环就像`for`循环或者`while`循环。它只有在现在或者未来没有东西去执行的时候才会停止。

![dog](/images/youDontKnowNode/pic3.png)

Blocking I/O: Multi-Threading Java

事件循环让你的系统更加的有效率，因为现在你可以在你等待你昂贵的输入输出任务结束的时候，你可以做更多事情。

![pic4](/images/youDontKnowNode/pic4.png)

Non-Blocking I/O: Node.js

这与我们当前的直接使用系统线程的并发模型做对比。基于线程的网络设计相对来说更没有效率更难用。此外，Node的使用者不用担心进程的死锁，因为根本就没有锁。

小边注：那么我们仍然可能在Node中写阻塞代码吗？思考下面这个简单但是阻塞的Node代码：

```
console.log('Step: 1')
var start = Date.now()
for (var i = 1; i<1000000000; i++) {
  // This will take 100-1000ms depending on your machine
}
var end = Date.now()
console.log('Step: 2')
console.log(end-start)
```

当然，一般情况下，我们不会在我们的代码中写空循环。Spotting synchronous and thus blocking code might be harder when using other people’s modules.（未翻译）比如，核心的`fs`模块就有两组方法。每组执行相同的功能但用不同的方式。阻塞的`fs`Node方法在名字上带有`Sync`:

```
var fs = require('fs')

var contents = fs.readFileSync('accounts.txt','utf8')
console.log(contents)
console.log('Hello Ruby\n')

var contents = fs.readFileSync('ips.txt','utf8')
console.log(contents)
console.log('Hello Node!')
```

结果对Node/JavaScript新手来说也很容易猜出

```
data1->Hello Ruby->data2->Hello NODE!
```

当我们转为异步方法，就不一样了。这是非阻塞的Node代码：

```
var fs = require('fs');

var contents = fs.readFile('accounts.txt','utf8', function(err,contents){
   console.log(contents);
});
console.log('Hello Python\n');

var contents = fs.readFile('ips.txt','utf8', function(err,contents){
   console.log(contents);
});
console.log("Hello Node!");
```

将会最后打印`contents`因为需要一段时间去执行，他们在回调中。事件循环将会在文件读取结束的时候调用他们：

```
Hello Python->Hello Node->data1->data2
```

所以事件循环和非阻塞I/O非常强大，但你需要写异步代码，大部分在学校都不是学习这种代码。

## Global








