---
layout: post
title: "nodejs项目部署与发布"
subtitle: ""
date: 2017-10-15
author: HouXingYi
category: nodejs
tags: 部署 发布
finished: true
---

1. 购买自己的域名
2. 购买自己的服务器
3. 域名备案
4. 配置服务器应用环境
5. 安装配置数据库
6. 项目远程部署发布与更新



https://developers.douban.com/wiki/?title=api_v2   豆瓣开放api
https://developers.douban.com/wiki/?title=guide  开放api快速入门  
跨域问题  //直接用jquery的jsonp即可
$.ajax({
    url : "https://api.douban.com/v2/book/1220562",
    type : "get",
    dataType : "jsonp",
    crossDomain : true,
    jsonp : "callback",
    success : function(data){
        console.log(data);
    }
})




## 选购域名服务器及备案

1. 域名  爱名网 阿里云 godady    不备案的话，微信小程序，微信公众号，app之类的就无法上线
.cn比较便宜？    godaddy有可能以后会被墙？比较划算？

dnspod  域名解析   ssl证书不用买，自己可以装

2. 主机选择 ：
    国外：亚马逊AWS linode digitOcean/heroku
    国内：阿里云ECS 青云/UCloud/百度云
    选大厂商，不会关闭 
    选国内不会被墙？
    阿里云校园计划 ， 阿里云新用户30项免费  （现在已经不是学生身份了，残念）
    老师用Ubuntu做为操作系统14.04 64位
    安全组先开放所有端口
    老师的邀请码1abqbf

3. 备案流程

通过阿里云备案
域名注册信息要和备案主体保持一致
算起来大概要一个月
现在先用国内的，后面熟练再试试国外的


## 远程登录服务器




















