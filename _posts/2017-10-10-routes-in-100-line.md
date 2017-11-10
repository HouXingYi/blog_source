---
layout: post
title: "[译]一个100行内的现代js路由"
subtitle: "A modern JavaScript router in 100 lines"
date: 2017-10-10
author: HouXingYi
category: js
tags: routes 路由
finished: true
---
```
原文:http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
作者:Krasimir
```
(这个js路由现在被放项目[Navigo](https://github.com/krasimir/navigo)中。这里还有一篇你可能会感兴趣的文章[Deep dive into client-side routing](http://krasimirtsonev.com/blog/article/deep-dive-into-client-side-routing-navigo-pushstate-hash))

现今到处都是流行的单页面应用（SPA）。这样的应用需要一个坚实的路由机制。像[Emberjs](https://emberjs.com/)这样的框架确实是在建立在一个路由类上的。我不确定这是不是我喜欢的概念，但我确定的是[AbsurdJS](http://absurdjs.com/)需要一个内置的路由。并且这个路由在所有东西齐全的前提下，应该小巧、简单。那就让我们来看看这样一个模块是怎么样的。

## 要求

这个路由应该符合下面几点
1. 应该小于100行
2. 支持像*http://site.com#products/list*这样的hash类型的url
3. 也能使用History API
4. 提供易用的API
5. 不会自动的运行
6. 可选择监听改变

## 单例模式

我决定把路由做成只有一个实例。这也许是个坏决定，因为我就有个项目需要多个路由，但要知道这个不是常有的应用。如果我们使用单例模式，我们就不需要把路由从一个对象传到另一个对象并且我们也不需要创建它。我们只需要一个实例，这样我们就可以自动的创建它。
```
var Router = {
    routes: [],
    mode: null,
    root: '/'
}
```
这里有三个我们需要的属性。
* routes-这个保存着当前已注册的路由
* mode-根据我们使用的是history还是hash显示'hash'或者'history'
* root-应用的根URL路径，只有当我们使用pushState的时候我们才需要

## 配置

我们需要一个方法来初始化路由。我们只需要传两个东西，但是最好在一个函数内做这些。
```
var Router = {
    routes: [],
    mode: null,
    root: '/',
    config: function(options) {
        this.mode = options && options.mode && options.mode == 'history' 
                    && !!(history.pushState) ? 'history' : 'hash';
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
        return this;
    }
}
```

只有当我们想要使用history模式并且支持*pushState*的时候，mode才会等于'history'。否则我们将使用hash。root默认设置为单斜线'/'。

## 获得当前的URL

这是我们的路由的重要部分，因为这将会告诉我们现在在什么地方。

```
getFragment: function() {
    var fragment = '';
    if(this.mode === 'history') {
        fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
    } else {
        var match = window.location.href.match(/#(.*)$/);
        fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
}
```

在两个例子中我们都是用了全局的*window.location*对象。在'history'模式版本中我们需要去掉URL的根部分。我们也需要去掉所有的GET请求参数，我们用如下的正则表达式搞定-`(/\?(.*)$/)`。获取hash的值则更加简单点。注意*clearSlashes*函数的作用。它的用处是去除字符串开头和结尾的斜杠。这是有必要的，因为我们不能强迫开发者使用特定格式的URL。无论他传什么都会转成同样的值。

## 添加和修改路由

当我在制作[AbsurdJS](http://absurdjs.com/)的时候，我总是尝试尽可能多的给开发者控制权。几乎所有的路由插件在执行路由的时候是用字符串路由。然而我更喜欢传一个正则表达式。这更加的灵活，因为有的时候我们也许会做很奇怪的匹配。
```
add: function(re, handler) {
    if(typeof re == 'function') {
        handler = re;
        re = '';
    }
    this.routes.push({ re: re, handler: handler});
    return this;
}
```
这个将*routes*数组进行填充。如果只有一个函数传进来，那么这个函数就会被作为handler，而默认的路由就是一个空字符串。注意这里大部分的函数return this。这可以让我们链式调用方法。
```
remove: function(param) {
    for(var i=0, r; i<this.routes.length, r = this.routes[i]; i++) {
        if(r.handler === param || r.re.toString() === param.toString()) {
            this.routes.splice(i, 1); 
            return this;
        }
    }
    return this;
}
```
只有我们传一个正则表达式或者handler传给*add*方法的时候，路由的删除才会调用。
```
flush: function() {
    this.routes = [];
    this.mode = null;
    this.root = '/';
    return this;
}
```
有的时候我们需要重新初始化类。那么这时候你就可以用上面的*flush*方法。

## 登记

好，现在我们已经有了增加和删除URL的API。我们也可以得到当前的地址了。下一步我们要比较已注册的入口。
```
check: function(f) {
    var fragment = f || this.getFragment();
    for(var i=0; i<this.routes.length; i++) {
        var match = fragment.match(this.routes[i].re);
        if(match) {
            match.shift();
            this.routes[i].handler.apply({}, match);
            return this;
        }           
    }
    return this;
}
```
我们通过传入函数作为参数或者调用*getFragment*方法来获得*fragment*。接下来我们执行一个单纯的循环来遍历routes来查看匹配。只有当正则表达式没有匹配到的时候，变量*match*的值是null。否则*match*的值会像下面这样
```
["products/12/edit/22", "12", "22", index: 1, input: "/products/12/edit/22"]
```
这是一个包含了匹配到的数组和所有可记录的子串的类数组。这意味着如果我们*shift*第一个我们会获得URL动态部分的数组。举例：
```
Router
.add(/about/, function() {
    console.log('about');
})
.add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.add(function() {
    console.log('default');
})
.check('/products/12/edit/22');
```
这段脚本输出
```
products ["12", "22"]
```
到此为止我们处理了动态URL。

## 监听变化

当然我们不能总是调用*check*方法。我们需要当地址栏改变的时候，我们能收到通知。我所说的改变甚至意味着点击浏览器上的后退按钮。如果你用过History API的话你就会知道有一个*popstate*事件。当URL改变的时候就会触发这个事件。然而我发现在一些浏览器中，当页面加载完的时候会分发这个事件。这个情况加上其他的一些问题让我转向了其他的解决方案。因为我希望甚至在模式被设置为hash也能进行监听，我决定采用setinterval。
```
listen: function() {
    var self = this;
    var current = self.getFragment();
    var fn = function() {
        if(current !== self.getFragment()) {
            current = self.getFragment();
            self.check(current);
        }
    }
    clearInterval(this.interval);
    this.interval = setInterval(fn, 50);
    return this;
}
```
我们需要把最近的URL存下来这样我们才能用于对比下一个。

## 改变URL
最后我们需要一个函数能改变当前的地址并触发路由handler
```
navigate: function(path) {
    path = path ? path : '';
    if(this.mode === 'history') {
        history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {        
        window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
    }
    return this;
}
```

同样的，我们根据不同的模式做不同的事。如果History API可用，我们使用*pushState*。否则我们就采用window.location。

## 最终源码

以下是最终源码加一点例子
```
var Router = {
    routes: [],
    mode: null,
    root: '/',
    config: function(options) {
        this.mode = options && options.mode && options.mode == 'history' 
                    && !!(history.pushState) ? 'history' : 'hash';
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
        return this;
    },
    getFragment: function() {
        var fragment = '';
        if(this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    },
    clearSlashes: function(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    add: function(re, handler) {
        if(typeof re == 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ re: re, handler: handler});
        return this;
    },
    remove: function(param) {
        for(var i=0, r; i<this.routes.length, r = this.routes[i]; i++) {
            if(r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1); 
                return this;
            }
        }
        return this;
    },
    flush: function() {
        this.routes = [];
        this.mode = null;
        this.root = '/';
        return this;
    },
    check: function(f) {
        var fragment = f || this.getFragment();
        for(var i=0; i<this.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if(match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }           
        }
        return this;
    },
    listen: function() {
        var self = this;
        var current = self.getFragment();
        var fn = function() {
            if(current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        }
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    },
    navigate: function(path) {
        path = path ? path : '';
        if(this.mode === 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    }
}

// configuration
Router.config({ mode: 'history'});

// returning the user to the initial state
Router.navigate();

// adding routes
Router
.add(/about/, function() {
    console.log('about');
})
.add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
})
.add(function() {
    console.log('default');
})
.check('/products/12/edit/22').listen();

// forwarding
Router.navigate('/about');
```

## 总结

这个路由大概90行。支持hash类型的URL和新的history API。如果你不想仅仅想使用路由这个功能而使用整个框架，这个就对你是有帮助的。

这个类是[AbsurdJS](http://absurdjs.com/)的一部分。在[这里](http://absurdjs.com/pages/api/build-in-components/#router)可以查看文档。
