
原地址
http://www.zcfy.cc/original/understand-javascript-callback-functions-and-use-them-javascript-is-sexy-4642.html

# 理解并使用js回调函数|性感的js

在 JavaScript 中，函数是第一类对象；这意味着，函数是Object类型并且可以像其他对象一样（比如String，Array，Number）以第一类的方式使用，因为他们都是对象。他们可以“被储存进变量中，作为参数传入一个函数，在函数中被创建，并在函数中被返回”。

因为函数是第一类对象，我们可以把函数作为参数传入另外一个函数并且之后可以执行传入的函数或者甚至把函数返回出来以供后面执行。这就是在 JavaScript 中使用回调函数的本质。在余下的文章中我们会学到 JavaScript 回调函数的方方面面。回调函数大概是在 JavaScript 中使用最为广泛的函数式编程技术了，你大概可以在任何JavaScript代码或者jQuery代码中看到它，然而它对许多JavaScript开发者来说还是保持神秘。当你读完这篇文章的时候，它将不再神秘了。

回调函数是由一个叫做函数式编程的编程范式而来的。最基础来说，函数式编程具体规定了把函数作为参数来使用。函数式编程曾经是-当然现在也是，不过程度有所减少-被认为是一种编程大师的特殊技巧。

幸运的是，函数式编程这门技术已经被解释清楚，以至于像你我这样的普通人也可以轻而易举的理解和使用了。函数式编程中一个主要的技巧正好就是回调函数。很快你就会读到，实现一个回调函数就像传入一个普通变量作为参数那样简单。这个技巧如此简单以至于我总是惊奇它经常被放在高级JavaScript主题下。

## 什么是回调或者高阶函数

回调函数，也被称作高阶函数，就是把一个函数作为参数传入“另一个函数”，然后回调函数在“另一个函数”中调用。回调函数本质上是一种模式（对一种问题的确定解决方案），因此使用回调函数我们也称之为回调模式。

思考下面这个在jQuery中回调函数的常见用法：

```
//Note that the item in the click method's parameter is a function, not a variable.
//The item is a callback function
$("#btn_1").click(function() {
  alert("Btn 1 Clicked");
});
```

在以上的例子中可以看到，我们把函数当做一个参数传给一个click方法。click方法则会调用我们传的那个回调函数。这个例子展示了一种典型的回调函数的使用，这是种在jQuery中广泛使用的方式。

思考下面另一个典型的回调函数的例子：

```
var friends = ["Mike", "Stacy", "Andy", "Rick"];

friends.forEach(function (eachName, index){
console.log(index + 1 + ". " + eachName); // 1\. Mike, 2\. Stacy, 3\. Andy, 4\. Rick
});
```

和上面一样，注意我们把一个匿名函数作为参数给 forEach 方法的这种方式。

到此为止我们已经把匿名函数做为参数传给了另一个函数或方法。接下来在我们看更多具体的例子之前，让我们先来理解回调是如何工作的并开始做我们自己的回调函数。

## 回调函数是怎么工作的

我们可以把函数像变量一样在函数中传递和返回，并在另一个函数中使用。当我们把函数作为参数传递给另一个函数，我们只是传递了函数的定义。我们没有在参数中调用函数。换句话来说，我们没有像执行函数一样带着一对括号那样传递函数。

并且因为包含函数有着作为函数定义的回调函数作为参数，它就可以在任何时候调用。

注意回调函数不是立即就执行。它是在包含的函数体中指定的地方“回头调用”。所以，即使第一个jQuery例子张的像这样：
```
//The anonymous function is not being executed there in the parameter. 
//The item is a callback function
$("#btn_1").click(function() {
  alert("Btn 1 Clicked");
});
```
那个匿名函数将会过一会在函数体中调用。即使没有命名，它也可以通过arguments对象在函数体中获得。

### 回调函数是闭包

当我们把一个回调函数作为参数传入另一个函数，回调在包含函数体中某一个位置被调用，就好像回调是在包含函数体中被定义一样。这意味着回调是一个闭包。读我的另一个博文[Understand JavaScript Closures With Ease](http://javascriptissexy.com/understand-javascript-closures-with-ease/)，了解更多关于闭包的事情。众所周知，闭包可以获得包含函数的作用域，这样闭包就可以访问包含函数的内部的变量,甚至也能访问全局的变量。

## 当实现回调函数的基本原则

在不复杂的情况下，回调有一些值得注意的原则在我们实现的时候需要熟悉的

### 使用命名过的或匿名函数作为回调

在先前的jQuery和forEach例子，我们使用定义在包含函数的参数中的匿名函数。这是一种经常使用模式之一。另一个流行的模式是声明一个命名函数然后将这个函数的名字作为参数。考虑以下：
```
// global variable
var allUserData = [];

// generic logStuff function that prints to console
function logStuff (userData) {
    if ( typeof userData === "string")
    {
        console.log(userData);
    }
    else if ( typeof userData === "object")
    {
        for (var item in userData) {
            console.log(item + ": " + userData[item]);
        }

    }

}

// A function that takes two parameters, the last one a callback function
function getInput (options, callback) {
    allUserData.push (options);
    callback (options);

}

// When we call the getInput function, we pass logStuff as a parameter.
// So logStuff will be the function that will called back (or executed) inside the getInput function
getInput ({name:"Rich", speciality:"JavaScript"}, logStuff);
//  name: Rich
// speciality: JavaScript
```
### 传参给回调函数

因为回调函数在执行的时候就是一个正常的函数，那我们自然可以传参给它。我们可以传入任意的包含函数的内容（或者全局内容）作为参数传给回调函数。在之前的例子中，我们传options作为参数给回调函数。下面来传下全局变量和本地变量：
```
//Global variable
var generalLastName = "Clinton";

function getInput (options, callback) {
    allUserData.push (options);
// Pass the global variable generalLastName to the callback function
    callback (generalLastName, options);
}
```

### 在执行回调的时候确保它是个函数

在调用传入的回调函数参数之前检查是否确实是一个函数总是明智的。同样，让这个回调函数可选，也是一个好的实践。

让我们来重构下之前的例子中的getInput函数来保证有适当的检查。

```
function getInput(options, callback) {
    allUserData.push(options);

    // Make sure the callback is a function
    if (typeof callback === "function") {
    // Call it, since we have confirmed it is callable
        callback(options);
    }
}
```

如果getInput函数在没有回调函数作为参数或用非函数代替函数传入的情况下调用的话，没有这些适当的检查，我们的代码将会报一个运行时错误。

### 当使用带有this对象的方法作为回调的问题

当回调是一个使用this对象的方法时，我们要改变下调用回调函数的方式来保持this对象上下文。否则当回调传给一个全局函数的时候，this对象将会指向全局window对象。或者它会指向包含这个方法的对象。

```
// Define an object with some properties and a method
// We will later pass the method as a callback function to another function
var clientData = {
    id: 094545,
    fullName: "Not Set",
    // setUserName is a method on the clientData object
    setUserName: function (firstName, lastName)  {
        // this refers to the fullName property in this object
      this.fullName = firstName + " " + lastName;
    }
}

function getUserInput(firstName, lastName, callback)  {
    // Do other stuff to validate firstName/lastName here

    // Now save the names
    callback (firstName, lastName);
}
```

在下面的例子中，当clientData.setUserName执行的时候，this.fullName将会不在clientData对象上设置fullName属性。反而，它会在window对象上设置fullName属性，原因是getUserInput是一个全局函数。而在全局函数中，this对象指向window对象。

```
getUserInput ("Barack", "Obama", clientData.setUserName);

console.log (clientData.fullName);// Not Set

// The fullName property was initialized on the window object
console.log (window.fullName); // Barack Obama
```

### 使用Call或者Apply函数来保持this

我们可以通过使用Call或者Apply函数解决之前的问题 (我们将会在之后的一篇博客里讨论着两个方法)。暂时，你只需要知道在JavaScript中，每一个函数都有两个方法：Call和Apply。这两个方法用于设置函数中的this对象并且传入参数。

Call把第一个参数的值用于函数内的this对象，然后剩下的参数独立地传给函数（通过逗号分隔）。Apply函数也是把第一个参数的值用于函数内的this对象，然而最后一个参数是一个传给对象的数组（或者arguments对象）。

这听起来很复杂，但是让我们来看看使用Apply或Call是多么简单。想要解决先前例子中的问题，我们将会使用Apply函数：
```
//Note that we have added an extra parameter for the callback object, called "callbackObj"
function getUserInput(firstName, lastName, callback, callbackObj)  {
    // Do other stuff to validate name here

    // The use of the Apply function below will set the this object to be callbackObj
    callback.apply (callbackObj, [firstName, lastName]);
}
```

随着Apply函数正确地设置this对象，我们现在也在clientData对象上可以正确地执行回调并且正确地设置fullName属性了：
```
// We pass the clientData.setUserName method and the clientData object as parameters. The clientData object will be used by the Apply function to set the this object
 getUserInput ("Barack", "Obama", clientData.setUserName, clientData);

// the fullName property on the clientData was correctly set
console.log (clientData.fullName); // Barack Obama
```

我们也可以使用Call函数，但是在这个例子中我们使用Apply函数。

### 允许多个回调函数

我们可以传入不止一个回调函数作为函数的参数，就像我们可以传入不止一个参数。下面是一个典型jQuery AJAX函数：

```
function successCallback() {
    // Do stuff before send
}

function successCallback() {
    // Do stuff if success message received
}

function completeCallback() {
    // Do stuff upon completion
}

function errorCallback() {
    // Do stuff if error received
}

$.ajax({
    url:"http://fiddle.jshell.net/favicon.png",
    success:successCallback,
    complete:completeCallback,
    error:errorCallback

});
```

## "回调地狱"问题和解决方案

进行任何顺序的异步代码执行的时候，经常会出现很多层的回调函数，在某种程度下，会像以下的代码这样。以下的这些凌乱的代码我们称之为回调地狱，因为太多层回调以至于难以理解代码。我从node-mongodb-native中找到下面的代码。以下的代码只是用于展示：

```
var p_client = new Db('integration_tests_20', new Server("127.0.0.1", 27017, {}), {'pk':CustomPKFactory});
p_client.open(function(err, p_client) {
    p_client.dropDatabase(function(err, done) {
        p_client.createCollection('test_custom_key', function(err, collection) {
            collection.insert({'a':1}, function(err, docs) {
                collection.find({'_id':new ObjectID("aaaaaaaaaaaa")}, function(err, cursor) {
                    cursor.toArray(function(err, items) {
                        test.assertEquals(1, items.length);

                        // Let's close the db
                        p_client.close();
                    });
                });
            });
        });
    });
});
```

你可能不会经常在代码里遇到这样的问题，但你总会不时的遇见，这时候你有以下两种解决方案。

1. 相比于在函数的参数中定义一个匿名函数，你可以显示的声明函数并命名，然后用传递函数名的方法代替回调。
2. 模块化：把你的代码模块化，你可以导出一部分代码做特定的事情。然后你在你更大的应用中导入这个模块。

## Make Your Own Callback Functions （ 创建你自己的回调函数 ）

现在你已经完全掌握了JavaScript回调函数的方方面面了，并且你已知道使用回调函数非常简单而强大，所以现在你现在应该着眼于你自己的代码中使用回调函数的机会，因为它会让你：

1. 不重复代码
2. 更多通用的代码，实现更好的抽象
3. 更好的可维护性
4. 更好的可读性
5. 更多专业的函数

创建你自己的回调函数是相当简单的。在下面的例子中，我本可以创建一个函数去做所有的事情：获取用户数据，用数据创建一个通用的诗歌，并且致敬用户。这将会是一个有着众多if/else语句的混乱的函数，并且即使如此它也是非常有局限性，不能够胜任应用需要用用户的数据实现的其他功能。

相反，我把功能的执行交给回调函数，这样获得了数据的主函数就可以通过简单的传用户名和性别的参数给回调函数并执行回调来执行几乎任何任务。

简单来说，getUserInput函数是通用的：它可以执行各种功能的回调：

```
// First, setup the generic poem creator function; it will be the callback function in the getUserInput function below.
function genericPoemMaker(name, gender) {
    console.log(name + " is finer than fine wine.");
    console.log("Altruistic and noble for the modern time.");
    console.log("Always admirably adorned with the latest style.");
    console.log("A " + gender + " of unfortunate tragedies who still manages a perpetual smile");
}

//The callback, which is the last item in the parameter, will be our genericPoemMaker function we defined above.
function getUserInput(firstName, lastName, gender, callback) {
    var fullName = firstName + " " + lastName;

    // Make sure the callback is a function
    if (typeof callback === "function") {
    // Execute the callback function and pass the parameters to it
    callback(fullName, gender);
    }
}
```

调用getUserInput函数并传入genericPoemMaker函数作为回调：

```
getUserInput("Michael", "Fassbender", "Man", genericPoemMaker);
// Output
/* Michael Fassbender is finer than fine wine.
Altruistic and noble for the modern time.
Always admirably adorned with the latest style.
A Man of unfortunate tragedies who still manages a perpetual smile.
*/
```

因为getUserInput函数只是处理获取数据，我们可传入任何的回调给它。比如，我们可以传入一个greetUser函数像下面这样：

```
function greetUser(customerName, sex)  {
   var salutation  = sex && sex === "Man" ? "Mr." : "Ms.";
  console.log("Hello, " + salutation + " " + customerName);
}

// Pass the greetUser function as a callback to getUserInput
getUserInput("Bill", "Gates", "Man", greetUser);

// And this is the output
Hello, Mr. Bill Gates
```

我们像原来那样调用getUserInput函数，但是这次它执行了一个完全不同的任务。

你可以看到，回调函数提供了更多的灵活。虽然先前的例子相对来说比较简单，但是想想看如果你开始使用回调函数你将会节省多少工作量，你代码的抽象程度将会多好。加油，马上用起你的回调函数。

注意以下几种我们经常在JavaScript中使用回调函数的方式，特别是在开发现代web应用程序，库，和框架的时候：

* 用于异步执行
* 在事件监听器/处理器中
* 在setTimeout和setInterval方法中
* 用于通用化：代码简洁

## 最后的话

JavaScript回调函数好用而又强大，它为你的web应用和代码带来了很多好处。当你需要的时候你就应该用回调函数；看看能不能用回调函数来提高你的代码的抽象性，可维护性和可读性。

### 参考

1. http://c2.com/cgi/wiki?FirstClass
2. https://github.com/mongodb/node-mongodb-native
3. http://callbackhell.com/
4. JavaScript Patterns by Stoyan Stefanov (Sep 28, 2010)
















