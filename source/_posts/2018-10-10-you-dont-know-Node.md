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

实际并不相同。你需要开始用异步的方式思考。Node脚本输出是1，2，3，但如果我们在“Step 2”后放更多语句，它们将会在set、



