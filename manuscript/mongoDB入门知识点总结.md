---
layout: post
title: "mongoDB入门知识点总结"
subtitle: ""
date: 2017-10-07
author: HouXingYi
category: mongoDB
tags: 数据库 入门
finished: true
---

在学习nodejs的过程中必不可少要接触数据库，我选择了mongoDB作为我要学习的数据库。下面总结下我学习mongoDB的一些心得体会。

一般不使用原生，js中使用mongoose



## mongoDB简介

mongoDB是一个开源的NoSQL数据库（Not Only SQL）

几个重要的学习渠道：    mongoDB官网，mongoDB国内官方网站www.mongoing.com
                      mongoDB gitHub  等


数据库概念：
1. 有组织地存放数据。
2. 按照不同的需求进行查询。

数据库分类
1. Sql数据库：支持Sql语言的数据库。
2. NoSql数据库：不支持Sql语言的数据库。

为什么要选择MongoDB？
1. 无数据结构限制
没有表结构的概念，每条记录可以有完全不同的结构。
业务开发方便快捷
sql数据库需要事先定义表结构再使用
2. 完全的索引支持
3. 方便的扩展
4. 良好的支持


在学习一项新的系统知识之前，我们一般要了解一些基础的概念。对于学习mongoDB也是同样，我们首先要了解比如mongo，索引，集合，复制集，分片，数据均衡等概念。学会mongoDB的搭建。熟悉mongoDB的使用，包括文档的读写更新删除等。还要学一些简单的mongoDB的运维知识，要能部署mongoDB集群，能处理常见的故障。





## mongoDB基本操作

* show dbs  //展示现有数据库
* show collections //展现当前数据库下的集合
* use dbName  //进入数据库
* db.dropDatabase()   //删除数据库



### 插入与查询

* db.collectionName.insert()   //写入json格式的数据  //mongoDB中没有表，只有集合
* db.collectionName.find()   //查询数据 //find也可以传入参数，同样为json格式，返回符合条件的数据
mongoDB可以使用js语法（比如for循环，可以插入多条数据等）for(i=3;i<100;i++)db.collectionName.insert({x:i})

find().count()计数  find().pretty()美化
find().skip(3).limit(2).sort({x})过滤前三条数据，限制为只返回两条，并用名为x的键进行排序 


### 数据的更新

db.collectionName.update({x:1},{x:999})  //第一个参数为查询条件，第二个参数为更新的数据
db.collectionName.update({x:1},{$set:{y:999}},true)  //$set部分更新  //第三个参数为查找不存在则自动创建数据
db.collectionName.update({x:1},{$set:{y:999}},false,true)  //第四个参数为查找出的多条数据更新，默认情况下是只更新第一条的

### 数据的删除
db.collectionName.drop() //删除整个集合
db.collectionName.remove({c:1}) //删除某个数据

索引的创建

db.collectionName.getIndexes()
db.collectionName.ensureIndex({x:1})


## 索引简介

1. 索引的种类与使用
2. 索引的匹配规则
3. 如何建立合适的索引
4. 索引建立的情况评估


索引类型
_id索引（自动生成唯一索引）




先暂时这样，这样平常应该够用了，有深入的需求再学。



