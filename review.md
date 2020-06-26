# 面试复习

## 一、JS

### 1、Number(),parseInt(),parseFloat()的区别

Number( ):

（1）如果是Boolean值，true和false将分别转换为1和0。
（2）如果是数字值，只是简单的传入和返回。
（3）如果是null值，返回0。
（4）如果是undefined,返回NaN。
（5）如果是字符串，遵循下列规则：
如果字符串截去开头和结尾的空白字符后，不是纯数字字符串，那么最终返回结果为NaN。
如果是字符串中只包含数字（包括前面带正号或负号的情况），则将其转换为十进制数值，即“1”变成1，“123”会变成123，而“011”会变成11（前导的零被忽略了）；
如果字符串中包含有效的浮点格式，如“1.1”，则将其转换为对应的浮点数值（同样也会忽略前导零）；
如果字符串中包含有效的十六进制格式，例如”0xf”，则将其他转换为相同大小的十进制整数值；
如果字符串是空的（不包含任何字符），则将其转换为0；
如果字符串中包含除上述格式之外的字符，则将其他转换成NaN.
（6）如果是对象，则调用对象的valueOf()方法，然后依照前面的规则转换返回的值。如果转换的结果是NaN，则调用的对象的toString()方法，然后再次依照前面的规则转换返回的字符串值。



parseInt( )：

parseInt()函数可以将字符串转换成一个整数，与Number()函数相比，parseInt()函数不仅可以解析纯数字字符串，也可以解析以数字开头的部分数字字符串(非数字部分字符串在转换过程中会被去除)。
（1）如果第一个字符不是数字字符或者负号，parseInt()就会返回NaN; 也就是说，用parseInt()转换空字符串会返回NaN。
（2）如果第一个字符是数字字符，parseInt()会继续解析第二个字符，直到解析完所有后续字符或者遇到了一个非数字字符。
（3）如果字符串以”0x”开头且后跟数字字符，就会将其当作一个十六进制整数。
（4）如果字符串以”0”开头且后跟数字字符，就会将其当作一个八进制整数。
（5）parseInt()函数增加了第二参数用于指定转换时使用的基数（即多少进制）。
（6）当parseInt()函数所解析的是浮点数字符串时，取整操作所使用的方法为“向下取整”。



parseFloat( ):

与parseInt()一样，parseFloat()也可以解析以数字开头的部分数字字符串(非数字部分字符串在转换过程中会被去除)。与parseInt()不同的是，parseFloat()可以将字符串转换成浮点数；但同时，parseFloat()只接受一个参数，且仅能处理10进制字符串。
（1）字符串中的第一个小数点是有效的，而第二个小数点就是无效的了，因此它后面的字符串将被忽略。
（2）如果字符串包含的是一个可解析为整数的数（没有小数点，或者小数点后面都是零），parseFloat()会返回整数。

### 2、随机数

相关函数：

Math.random()：[0,1)随机浮点数

Math.round(num)： num 四舍五入取整

Math.floor(num)：num向下取整，即返回 num 的整数部分。也可以使用 parseInt()方法代替。

```
//取得[n,m]范围随机浮点数
function fullClose(n,m) {
   var result = Math.random()*(m+1-n)+n;
   while (result>m) {
     result = Math.random()*(m+1-n)+n;
   }
   return result;
}
```

```
//取得(n,m)范围随机浮点数
function fullOpen(n,m) {
   var result = Math.random()*(m-n)+n;
   while (result == n) {
     result = Math.random()*(m-n)+n;
   }
   return result;
}
```

```
//取得(n,m]范围随机浮点数
function leftOpen(n,m) {
   var result = Math.random()*(m-n+1)+n-1;
   while (result<n) {
     result = Math.random()*(m-n+1)+n-1;
   }
   return result;
}
```

随机整数：

基础公式：Math.floor(Math.random()\*(m-n+1))+n

全闭区间原理：先生成一个[0,m-n+1)这样左闭右开的区间，然后Math.floor()取到[0,m-n]之间内的任意整数，之后加上区间左端点变成[n,m]内的任意整数，达到目的。

1、全闭区间：

Math.floor(Math.random()*(max-min+1))+min

2、左闭右开：[n,m) == [min,max-1];也就是说n= min ;m = max- 1 ;

Math.floor(Math.random()*(max-min))+min

3、左开右闭：(n,m] == [min + 1,max];也就是说n= min + 1;m = max ;

Math.floor(Math.random()*(max-min))+min+1

4、全开区间：(n,m) == [min + 1,max - 1];也就是说n= min + 1;m = max - 1;

Math.floor(Math.random()*(max-min-1))+min+1

### 3、事件模型

1、观察者模式：

观察者模式又叫做发布订阅者模式(Publish/Subscribe)，它可以让多个观察者对象同时监听某一个主题对象，这个主题对象的状态变化时会通知所有的订阅者，使得它们能够做出反应。
JS的事件模型就是一种观察者模式的体现，当对应的事件被触发时，监听该事件的所有监听函数都会被调用。

2、事件与事件流：

DOM是树形结构，如果同时给父子节点都绑定事件时，当触发子节点的时候涉及到事件流的概念，它描述的是页面中接受事件的顺序。

事件流有两种:（当一个DOM元素绑定多个事件时，首先执行捕获，到达最深层次之后执行冒泡）

1）事件冒泡(Event Bubbling): 是一种从下往上的传播方式。事件最开始由最具体的元素(文档中嵌套层次最深的那个节点接受, 也就是DOM最低层的子节点), 然后逐渐向上传播到最不具体的那个节点，也就是DOM中最高层的父节点。

2）事件捕获(Event Capturing): 与事件冒泡相反。事件最开始由不太具体的节点最早接受事件, 而最具体的节点最后接受事件。

3、事件模型：

1）DOM0级模型：又称为原始事件模型，在该模型中，事件不会传播，即没有事件流的概念。

2）DOM2级模型：属于W3C标准模型，现代浏览器(除IE6-8之外的浏览器)都支持该模型。在该事件模型中，一次事件共有三个过程:

（1）事件捕获阶段(capturing phase)。事件从document一直向下传播到目标元素, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行。

（2）事件处理阶段(target phase)。事件到达目标元素, 触发目标元素的监听函数。

（3）事件冒泡阶段(bubbling phase)。事件从目标元素冒泡到document, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行。

4、事件对象：

当一个事件被触发时，会创建一个事件对象(Event Object), 这个对象里面包含了与该事件相关的属性或者方法。该对象会作为第一个参数传递给监听函数。

- DOM事件模型中的事件对象常用属性:
  - type用于获取事件类型
  - target获取事件目标
  - stopPropagation()阻止事件冒泡
  - preventDefault()阻止事件默认行为

5、事件代理：

事件在冒泡过程中会上传到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，这种方式称为事件代理(Event delegation)。

### 4、JS 判断一个对象是否属于某一类

javascript中检测对象的类型的运算符有：typeof、constructor、instanceof

typeof：typeof是一个一元运算符，返回结果是一个说明运算数类型的字符串。如："number"，"string"，"boolean"，"object"，"function"，"undefined"（可用于判断变量是否存在）。 但 typeof 的能力有限，其对于Date、RegExp、Array类型返回的都是"object"。所以它只在区别对象和原始类型的时候才有用。要区一种对象类型和另一种对象类型，必须使用其他的方法。

instanceof 运算符：instanceof 运算符要求其左边的运算数是一个对象，右边的运算数是对象类的名字或构造函数。如果 object 是 class 或构造函数的实例，则 instanceof 运算符返回 true。如果 object 不是指定类或函数的实例，或者 object 为 null，则返回 false。instanceof方法可以判断变量是否是数组类型，但是只限同一全局环境之内，在一个页面有多个iframe的情况下，instanceof失效。

constructor 属性: JavaScript中，每个对象都有一个constructor属性，它引用了初始化该对象的构造函数，常用于判断未知对象的类型。如给定一个求知的值 通过typeof运算符来判断它是原始的值还是对象。如果是对象，就可以使用constructor属性来判断其类型。

Object.prototype.toString.call()：该方法是目前为止发现的判断一个对象类型的最好的办法。

### 5、instanceof

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof

### 6、new发生了什么

1、创建了一个空对象。

2、设置原型链。

3、让fn的this指向obj，并执行fn的函数体。

4、判断fn的返回值类型，如果是值类型，返回obj。如果是引用类型，就返回这个引用类型的对象。

实现：

```javascript
function objectFactory() {

    var obj = new Object(),

    Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    var ret = Constructor.apply(obj, arguments);

    return typeof ret === 'object' ? ret : obj;

};
```

### 7、JS延迟加载

1、将 js 脚本放在文档的底部，使 js 脚本尽可能的在最后来加载执行。

2、script标签添加 defer 属性，这个属性会让脚本的加载与文档的解析同步进行，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。

3、script标签添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后会立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。

4、动态创建 DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。

### 8、浏览器的缓存机制

浏览器的缓存机制指的是通过在一段时间内保留已接收到的 web 资源的一个副本，如果在资源的有效时间内，发起了对这个资源的再一次请求，那么浏览器会直接使用缓存的副本，而不是向服务器发起请求。使用 web 缓存可以有效地提高页面的打开速度，减少不必要的网络带宽的消耗。

web 资源的缓存策略一般由服务器来指定，可以分为两种，分别是<u>强缓存策略</u>和<u>协商缓存策略</u>。

使用强缓存策略时，如果缓存资源有效，则直接使用缓存资源，不必再向服务器发起请求。强缓存策略可以通过两种方式来设置，分别是 http 头信息中的 Expires 属性和 Cache-Control 属性。

服务器通过在响应头中添加 Expires 属性，来指定资源的过期时间。在过期时间以内，该资源可以被缓存使用，不必再向服务器发送请求。这个时间是一个绝对时间，它是服务器的时间，因此可能存在这样的问题，就是客户端的时间和服务器端的时间不一致，或者用户可以对客户端时间进行修改的情况，这样就可能会影响缓存命中的结果。

Expires 是 http1.0 中的方式，因为它的一些缺点，在 http 1.1 中提出了一个新的头部属性就是 Cache-Control 属性，它提供了对资源的缓存的更精确的控制。它有很多不同的值，常用的比如我们可以通过设置 max-age 来指定资源能够被缓存的时间的大小，这是一个相对的时间，它会根据这个时间的大小和资源第一次请求时的时间来计算出资源过期的时间，因此相对于 Expires来说，这种方式更加有效一些。常用的还有比如 private ，用来规定资源只能被客户端缓存，不能够代理服务器所缓存。还有如 no-store ，用来指定资源不能够被缓存，no-cache 代表该资源能够被缓存，但是立即失效，每次都需要向服务器发起请求。

一般来说只需要设置其中一种方式就可以实现强缓存策略，当两种方式一起使用时，Cache-Control 的优先级要高于 Expires 。

使用协商缓存策略时，会先向服务器发送一个请求，如果资源没有发生修改，则返回一个 304 状态，让浏览器使用本地的缓存副本。
如果资源发生了修改，则返回修改后的资源。协商缓存也可以通过两种方式来设置，分别是 http 头信息中的 Etag 和 Last-Modified 属性。

服务器通过在响应头中添加 Last-Modified 属性来指出资源最后一次修改的时间，当浏览器下一次发起请求时，会在请求头中添加一个 If-Modified-Since 的属性，属性值为上一次资源返回时的 Last-Modified 的值。当请求发送到服务器后服务器会通过这个属性来和资源的最后一次的修改时间来进行比较，以此来判断资源是否做了修改。如果资源没有修改，那么返回 304 状态，让客户端使用本地的缓存。如果资源已经被修改了，则返回修改后的资源。使用这种方法有一个缺点，就是 Last-Modified 标注的最后修改时间只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，那么文件已将改变了但是 Last-Modified 却没有改变，这样会造成缓存命中的不准确。

因为 Last-Modified 的这种可能发生的不准确性，http 中提供了另外一种方式，那就是 Etag 属性。服务器在返回资源的时候，在头信息中添加了 Etag 属性，这个属性是资源生成的唯一标识符，当资源发生改变的时候，这个值也会发生改变。在下一次资源请求时，浏览器会在请求头中添加一个 If-None-Match 属性，这个属性的值就是上次返回的资源的 Etag 的值。服务接收到请求后会根据这个值来和资源当前的 Etag 的值来进行比较，以此来判断资源是否发生改变，是否需要返回资源。通过这种方式，比 Last-Modified 的方式更加精确。

当 Last-Modified 和 Etag 属性同时出现的时候，Etag 的优先级更高。使用协商缓存的时候，服务器需要考虑负载平衡的问题，因此多个服务器上资源的 Last-Modified 应该保持一致，因为每个服务器上 Etag 的值都不一样，因此在考虑负载平衡时，最好不要设置 Etag 属性。

强缓存策略和协商缓存策略在缓存命中时都会直接使用本地的缓存副本，区别只在于协商缓存会向服务器发送一次请求。它们缓存不命中时，都会向服务器发送请求来获取资源。在实际的缓存机制中，强缓存策略和协商缓存策略是一起合作使用的。浏览器首先会根据请求的信息判断，强缓存是否命中，如果命中则直接使用资源。如果不命中则根据头信息向服务器发起请求，使用协商缓存，如果协商缓存命中的话，则服务器不返回资源，浏览器直接使用本地资源的副本，如果协商缓存不命中，则浏览器返回最新的资源给浏览器。

解决：（Ajax）

- 在 ajax 发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。
- 在 ajax 发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。

### 9、同源策略和跨域方案

1、同源策略

https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy

![image-20200625221107721](C:\Users\Slade Lyanm\AppData\Roaming\Typora\typora-user-images\image-20200625221107721.png)

2、跨域方案：

1. JSONP

2. CORS:https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

3. Vue.js：使用代理 https://www.cnblogs.com/lihaohua/p/12372267.html

```
// vue.config.js
devServer: {
    proxy: {  //配置跨域
      '/api': {
        target: 'http://121.121.67.254:8185/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：
          http://localhost:8080/api/core/getData/userInfo 时，
          实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api */
          '^/api': '' 
        }
      },
    }
  },
```

等等

### 10、Cookie

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies

HTTP Cookie（也叫Web Cookie或浏览器Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie使基于[无状态](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview#HTTP_is_stateless_but_not_sessionless)的HTTP协议记录稳定的状态信息成为了可能。新的浏览器API已经允许开发者直接将数据存储到本地，如使用 [Web storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) （本地存储和会话存储）或 [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)。

### 11、documen.write 和 innerHTML 的区别

document.write 的内容会代替整个文档内容，会重写整个页面。

innerHTML 的内容只是替代指定元素的内容，只会重写页面中的部分内容。

![DOM content](https://harttle.land/assets/img/blog/javascript/dom-content.gif)

### 12、DOM

https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction

1、什么是DOM？

MDN：文档对象模型 (DOM) 是HTML和XML文档的编程接口。它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容。DOM 将文档解析为一个由节点和对象（包含属性和方法的对象）组成的结构集合。简言之，它会将web页面和脚本或程序语言连接起来。

人话：DOM就是对文档（HTML/XML）操作的接口。在DOM的概念里，将文档各种节点抽象成了一颗节点树（根节点是document），可以用各种接口对这颗树进行修改，从而改变文档所展示出来的结果。并不是说DOM是一颗节点树，而是因为这些接口的存在，才把文档构建成了一颗树。

2、DOM和JS的关系？

区别：DOM跟编程语言（JS等等）是互相独立的，DOM译为文档对象模型，只是一种模型、结构，很多语言都能使用。

联系：DOM+JS 能组成一个web页面。

3、节点和节点树

1. DOM 的最小组成单位叫做节点（node）。节点树/DOM树 就是由节点组成的。浏览器提供一个原生节点对象 Node ，所有的节点都继承自这个对象，拥有一些共同的属性和方法，这是 DOM 操作的基础。

2. 注意区分 文档节点 和 文档元素 ：在HTML中，文档节点一般就是指根节点document，而文档元素就是指<html>元素，每个文档都只能有一个文档元素。
3. 在HTML中，Node有7种类型：

- `Document`：整个文档树的顶层节点
- `DocumentType`：`doctype`标签（比如`<!DOCTYPE html>`）
- `Element`：网页的各种HTML标签（比如`<body>`、`<a>`等）
- `Attr`：网页元素的属性（比如`class="right"`）
- `Text`：标签之间或标签包含的文本
- `Comment`：注释
- `DocumentFragment`：文档的片段

4. Node原型上定义了许多的方法和属性，document节点也是继承自Node的，所以才能这样使用 document.querySelector 方法等等，还有获取 document.getElementsByTagName('html')[0].nodeType 属性等等。
5. 说白了就是用接口提供的Node对象上的方法和属性来修改和查看DOM树，来对页面修改。

### 13、尾后逗号

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Trailing_commas

对象、数组、函数参数列表等等地方最后的那个逗号

```js
var arr = [
  1, 
  2, 
  3, 
];

arr; // [1, 2, 3]
arr.length; // 3
//带有间隙的数组叫做稀疏数组（sparse 紧凑数组 dense array 没有省略/间隙）
var arr = [1, 2, 3,,,];
arr.length; // 5
```

```js
var object = { 
  foo: "bar", 
  baz: "qwerty",
  age: 42,
};
```

在 JSON 中不允许使用尾后逗号

```js
JSON.parse('[1, 2, 3, 4, ]');
JSON.parse('{"foo" : 1, }');
// SyntaxError JSON.parse: unexpected character 
// at line 1 column 14 of the JSON data
```

### 14、类数组在V8引擎中的实现原理

```javascript
// Appends the arguments to the end of the array and returns the new
// length of the array. See ECMA-262, section 15.4.4.7.
function ArrayPush() {
  // 获取要处理的数组
  var array = TO_OBJECT(this);
  // 获取数组长度
  var n = TO_LENGTH(array.length);
  // 获取函数参数长度
  var m = arguments.length;

  for (var i = 0; i < m; i++) {
    // 将函数参数push进数组
    array[i+n] = arguments[i];
  }

  // 修正数组长度
  var new_length = n + m;
  array.length = new_length;
  // 返回值是数组的长度
  return new_length;
}
```

整个push函数，并没有涉及是否是数组的问题。只关心了length。而因为其对象的特性，所以可以使用方括号来设置属性。

### 15、垃圾回收与内存泄漏

http://www.ruanyifeng.com/blog/2017/04/memory-leak.html

内存泄漏：

1. 使用未声明的变量，意外创建了一个全局变量，而使这个变量一直留在内存中无法被回收。

2. 设置了 setInterval 定时器，忘记取消，如果循环函数有对外部变量的引用的话，那么这个变量会被一直留在内存中，而无法被回收。

3. 获取一个 DOM 元素的引用，后面这个元素被删除，由于保留了对这个元素的引用，所以它也无法被回收。

4. 不合理的使用闭包，导致某些变量一直被留在内存当中。

垃圾回收：

1. 引用计数（reference counting）：语言引擎有一张“引用表”，保存了内存里面所有的资源（通常是各种值）的引用次数。如果一个值的引用次数是0，就表示这个值不再用到了，因此可以将这块内存释放。

   （主动回收的方法就是将对象置为null）

2. 标记-清除（mark and sweep）：JavaScript 中有个全局对象，浏览器中是 window。定期的，垃圾回收期将从这个全局对象开始，找所有从这个全局对象开始引用的对象，再找这些对象引用的对象，对这些活着的对象进行标记，这是标记阶段。清除阶段就是清除那些没有被标记的对象。

3. 不通用的解决方法：多多使用[WeakSet](http://es6.ruanyifeng.com/#docs/set-map#WeakSet) 和 [WeakMap](http://es6.ruanyifeng.com/#docs/set-map#WeakMap)。

### *16、script标签的defer和async属性

如果脚本不改变文档内容，可将 defer/async 属性加入到 script 标签中，加快处理文档的速度。

async：

```text
<script type="text/javascript" src="path/to/script1.js" async></script>
<script type="text/javascript" src="path/to/script2.js" async></script>
```

async标记的Script异步执行下载，并执行。这意味着script下载时并不阻塞HTML的解析，并且下载结束script<u>马上执行</u>。
异步意味着，上述代码script2可能比script1先下载完并执行完。

defer：

```text
<script type="text/javascript" src="path/to/script1.js" defer></script>
<script type="text/javascript" src="path/to/script2.js" defer></script>
```

defer标签的script顺序执行。这种方式也不会阻断浏览器解析HTML。

跟 async不同, defer scripts在整个文档里的script都被下载完才<u>顺序执行</u>。

### 17、什么是polyfill

用于实现浏览器并不支持的原生API的代码。

### 18、健壮地获取文件拓展名

```javascript
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}
```

slice：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice

\>>> (无符号右移)：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Unsigned_right_shift

### 19、防抖与节流

防抖：在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。

节流：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

```javascript
// 函数防抖的实现
function debounce(fn, wait) {
  var timer = null;
  return function () {
    var context = this,
      args = arguments;
    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

// 函数节流的实现;
function throttle(fn, delay) {
  var preTime = Date.now();
  return function () {
    var context = this,
      args = arguments,
      nowTime = Date.now();
    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - preTime >= delay) {
      preTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
```
### 20、ASCII，Unicode 和 UTF-8

http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html









## 二、CSS

## 三、计算机网络

## 四、算法与数据结构

