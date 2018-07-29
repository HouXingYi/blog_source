---
layout: post
title: "[译]你的第一个GraphQL组件(有待改进)"
subtitle: "Your first GraphQL component"
date: 2017-12-10
author: HouXingYi
category: 翻译
tags: GraphQL API
finished: true
---

原文链接:[Your first GraphQL component](https://medium.com/@abhiaiyer/your-first-graphql-component-ad018e22972c)

如果你了解我的话你一定知道我有多喜欢GraphQL。最近经常被问到的问题不再是它的原理是什么了，而是

> 我应该如何起步并做点什么？

今天我想帮你获得第一滴血。今天让我们创建一个简单的UI组件，这个组件的后台数据是由GraphQL支持的。

因为这不止是一个纯前端教程，我们将选择一个公开的GraphQL APIs

在这里（https://github.com/APIs-guru/graphql-apis）我们有许多公开的API可供选择，我们可以挑选其中的任意一个。我们决定挑选星球大战的API。

在这里我将一步一步来，所以你应该尝试尽量跟上。你可以在文章的结尾获得Repo的地址。

#### 安装项目

为了将我们从配置地狱中拯救出来，我们使用绝妙（但比较慢:P）的`create-react-app`

```
$ yarn global add create-react-app
$ create-react-app INSERT_YOUR_OWN_NAME
```

好，那么你现在可以去休息下，或者去做一组波比跳。上面这需要一点时间。

好了？那么继续。

```
$ cd INSERT_YOUR_OWN_NAME
$ yarn add apollo-client react-apollo -S
```

#### 开启服务

克隆下面这个仓库:

[**abhiaiyer91/swapi-rest-graphql**
_swapi-rest-graphql - Query the Star Wars API with GraphQL, using the JSON Schema_github.com](https://github.com/abhiaiyer91/swapi-rest-graphql)

```
$ yarn
$ npm start
```

好！这下GraphQL服务就准备妥当了。

#### 建立Apollo客户端

现在已经用`create-react-app`创建了我们的项目模板。

让我们转到src目录下的`App.js`文件。

要想发送一个GraphQL请求，需要做的第一件事情就是建立一个GraphQL客户端，这个客户端就是`networkInterface`。一个networkInterface所做的就是解释你的请求如何在互联网上传送。

```
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000',
  }),
  connectToDevTools: true,
});


import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src="https://cdn-images-1.medium.com/fit/t/1600/480/1*sxMljQ8wgso4cG3PxufTmQ.png" className="App-logo" alt="logo"/>
            <h2>Your first GraphQL Component</h2>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
```

你可以看到我们引入了ApolloClient并且建立了我们的GraphQL客户端。只需要短短几行代码，我们就有了GraphQL客户端。

下一步我们引入`ApolloProvider`，类似与`redux`中的`Provider`，the ApolloProvider is necessary for binding the client and its methods down in your component tree.（不理解）

#### 写一个查询

我们需要一个叫做`graphql-tag`的库，来帮助我们更加容易的建立对我们GraphQL端点的查询。

```
$ yarn add graphql-tag
```

接下转向你的服务http://localhost:3000/graphql，这个服务是星球大战API的GraphQL接口。在这里你可以尝试下各种不同的查询，尝试完了之后，我们再继续。

好了，我保证你玩的很开心。以下是我的尝试:

![pic](https://cdn-images-1.medium.com/max/800/1*mAvGNnVS6AaDVL3sfAEU5w.png)

接下来我们回到App.js我们来引入我们的新库。

```
import gql from 'graphql-tag';

const query = gql`
  {
    people {
      url
      homeworld
      height
      skin_color
      birth_year
      eye_color
      hair_color
      gender
      name
      mass
    }
   }
`;
```

你可以看到我只是单纯的把我的查询拷贝然后粘贴在`gql`字符串模板函数中。

#### 绑定到UI

我们现在已经有一个GraphQL客户端和完成了我们第一次查询。接下来我们需要做的只是绑定到UI中。接下来我要做一个人们名字和homeworld的列表。

要完成这个我需要利用一个Apollo视图层插件`react-apollo`

```
import gql from 'graphql-tag';
import { ApolloProvider, graphql } from 'react-apollo';


const query = gql`
  {
    people {
      url
      homeworld
      height
      skin_color
      birth_year
      eye_color
      hair_color
      gender
      name
      mass
    }
   }
`;

const PeopleContainer = graphql(query);
```

现在我们有了一个PeopleContainer,本质上是一个把查询出来的数据给任意的UI组件的高阶函数。让我们它绑定到一个组件上：

#### 首先无状态组件

这章和GraphQL无关，只和UI开发本身相关。一个惯用的React应用通常由函数组件组成。

函数组件有以下几点关键的优势：

* 它能防止滥用`setState()`API,而使用props代替。
* 它鼓励使用[“smart” vs. “dumb” component pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)。
* 它鼓励更加可复用性和模块化的代码
* 它不鼓励做太多事的巨大的复杂的组件

我们创建People列表和单体Person组件

```
function Person({ url, gender, name, homeworld, height, mass, eye_color, hair_color, skin_color }) {
  return (
    <div style={{ flex: '1 0 300px' }}>
      <div style={{
        border: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '24px'
      }}>
        <h1 style={{
          fontSize: '14px',
          margin: '8px 0'
        }}>{name} -  {gender}</h1>
        <p>
          Height: {height}, Mass: {mass}, Skin: {skin_color}
        </p>
        <p>
          Eye Color: {eye_color}, Hair: {hair_color}
        </p>
        <p>
          <a href={homeworld}>View Homeworld</a>
        </p>
        <p>
          <a href={url}>View More</a>
        </p>
      </div>
    </div>
  );
}

let PeopleList = function PeopleList({ data }) {
  return (
    <div
      style={{
        maxWidth: '680px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          flexWrap: 'wrap',
          display: 'flex',
        }}
      >
        {
          data.loading ? (
            <p>People will be here soon</p>

          ) : (
            data.people.map((person, index) => {
              return <Person key={index} {...person} />
            })
          )
        }
      </div>
    </div>
  );
};

PeopleList = PeopleContainer(PeopleList);
```

现在你加载你的页面你应该看见像下面这样的：

![pic](https://cdn-images-1.medium.com/max/800/1*c8pFUCiYYdWbM2TnatcNVQ.png)

一个用星战API构建的UI。我们做到了。我们创建了你的第一个GraphQL驱动的组件。我为你骄傲！

#### 总结

这感觉不赖吧？用GraphQL构建UI就是这样一件爽快的体验。我们直接去掉了UI需要处理的必需的API界面！这让那些热爱构建良好用户体验的UI的人专注他们热爱的事情：***创造超赞的产品***。简简单单处理数据的问题，从此我们过上的幸福美满的生活。

这是完整的仓库地址
[https://github.com/abhiaiyer91/YourFirstGraphQLComponent](https://github.com/abhiaiyer91/YourFirstGraphQLComponent)











