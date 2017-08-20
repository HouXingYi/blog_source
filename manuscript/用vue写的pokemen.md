# Vue.js Pokemon Battle Tutorial
## vue.js神奇宝贝战斗教程


https://medium.com/coding-artist/vue-js-pokemon-battle-tutorial-380cd72eb681



接下来你将看见什么：一个使用Vue.js神奇宝贝战斗的详细制作过程。我很努力的不去做假设，但确实有很多东西需要经历（我光写这篇文章就花了15个小时）。如果你想学习更多的有关Vue.js的基础知识制作有趣的apps，你可以来看我的视频课程[Power Up With Pure CSS Images & Vue.js to Make Fun Apps](https://codingartist.io/pure-css-vue-js/).在这个课程中，我们会讨论更多有关Vue.js的基础细节问题。

查看全部源码: http://codepen.io/mikemang/pen/zNJZYg/
查看在线demo: http://codepen.io/mikemang/live/zNJZYg



## Introduction

从学习毕业之后，我决定我要致力于web开发。我很快意识到，我需要更加具体的关注我想要集中的web开发技能。

有一定的经验之后，我终于在前端特别是偏设计方面找到了兴趣。相比于制作动态web应用，我更喜欢一些小的应用，比如Mad Libs，Connect 4等等.

虽然有可能这不合你的胃口，但是我认为制作有趣的，小型的web apps是一个学习新框架的好方法。在尝试了React和Vue.js之后，我疯狂的爱上了Vue提供的可读性和易用性，特别是对于像我这样的人来说（翻译的不准确）。

然而，无论是React还是Vue.js，都有非常多的制作我喜欢的那种有趣的小巧的web应用教程。所以，我认为写一篇超级详细的用vue.js制作神奇宝贝战斗是一件非常酷的事情。

如果你还没有读过我上一篇博客，我不喜欢做假设并且我确实很喜欢把事情分解。无论这是你的Vue.js的第一篇介绍还是你只是想找些与众不同的，我希望你能享受这篇博文。

## 分解开来

在我开始之前，先把我们要做什么分解下。

首先，我们由一个[template](https://codepen.io/mikemang/pen/rjKaGW)开始，这个template就是我们神奇宝贝战斗app的container。快去fork。

我不会详细说明我如何码出这个的。如果你不熟悉纯css图像并好奇我如何做到的，我建议你读我的另一篇博文[Beginner’s Guide to Pure CSS Images.](https://medium.com/coding-artist/a-beginners-guide-to-pure-css-images-ef9a5d069dd2)

有了这个template之后，我们需要添加以下东西：

1. 两个神奇宝贝的图片
2. 名字，等级和每个神奇宝贝的HP
3. 战斗中的选项将会放在右下角的白盒子中
4. 战斗中的文字更新将会放在战斗选项的左边

就功能性来说，我们需要做以下几点：

1. 允许使用者用他们的神奇宝贝攻击对方的神奇宝贝并造成伤害
2. 使用者的神奇宝贝攻击完了之后，对方的也可以攻击使用者的并造成伤害
3. 如果没有神奇宝贝昏厥的话继续战斗，如果有的话则停止战斗
4. 在战斗的过程中更新战斗信息
5. 一场战斗结束后允许启动一场新的战斗

## 将模板填满

首先，我们看看我们有什么。
















































