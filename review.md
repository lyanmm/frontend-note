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

```javascript
//取得[n,m]范围随机浮点数
function fullClose(n,m) {
   var result = Math.random()*(m+1-n)+n;
   while (result>m) {
     result = Math.random()*(m+1-n)+n;
   }
   return result;
}
```

```javascript
//取得(n,m)范围随机浮点数
function fullOpen(n,m) {
   var result = Math.random()*(m-n)+n;
   while (result == n) {
     result = Math.random()*(m-n)+n;
   }
   return result;
}
```

```javascript
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

```javascript
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

Unicode 和 UTF-8的关系：UTF-8 是 Unicode 的实现方式之一

### 21、JS的事件循环（event loop）

因为 JS 是单线程的，在代码执行的时候，通过将不同函数的执行上下文压入执行栈中保证代码的有序执行。在执行同步代码的时候，如果遇到了异步事件，JS 引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当异步事件执行完毕后，再将异步事件对应的回调加入到与当前执行栈中不同的另一个任务队列中等待执行。任务队列可以分为宏任务对列和微任务对列，当当前执行栈中的事件执行完毕后，JS 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。当微任务对列中的任务都执行完成后再去判断宏任务对列中的任务。

微任务包括了 promise 的回调、node 中的 process.nextTick 、对 Dom 变化监听的 MutationObserver。

宏任务包括了 script 脚本的执行、setTimeout ，setInterval ，setImmediate 一类的定时事件，还有如 I/O 操作、UI 渲染等。

总结：

在环境中有个执行栈，事件循环像个轮子一样会取出微任务队列里的任务压到执行栈内，微任务队列无任务后，取出宏任务队列里的任务压到执行栈内。

微/宏任务队列的内的任务来源是在主线程执行过程中的一些异步任务。

<img src="https://user-gold-cdn.xitu.io/2018/5/16/163677dd81721ac8?imageslim" alt="img" style="zoom:67%;" />

### 22、深浅拷贝

1. 概念：

   浅拷贝：将一个对象的属性值复制到另一个对象，如果有的属性的值为引用类型的话，那么会将这个引用的地址复制给对象，因此两个对象会有同一个引用类型的引用。浅拷贝可以使用  Object.assign 和展开运算符来实现。

   深拷贝：如果遇到属性值为引用类型的时候，新建一个该引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。

2. 实现：

   ```javascript
   // 浅拷贝的实现;
   function shallowCopy(object) {
     // 只拷贝对象
     if (!object || typeof object !== object) return;
     // 根据 object 的类型判断是新建一个数组还是对象
     let newObject = Array.isArray(object) ? [] : {};
     // 遍历 object，并且判断是 object 的属性才拷贝
     for (let key in object) {
       if (object.hasOwnProperty(key)) {
         newObject[key] = object[key];
       }
     }
     return newObject;
   }
   
   // 深拷贝的实现;
   function deepCopy(object) {
     if (!object || typeof object !== object) return;
     let newObject = Array.isArray(object) ? [] : {};
     for (let key in object) {
       if (object.hasOwnProperty(key)) {
         newObject[key] =
           typeof object[key] === object ? deepCopy(object[key]) : object[key];
       }
     }
     return newObject;
   }
   ```

### 23、箭头函数

[https://es6.ruanyifeng.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0](https://es6.ruanyifeng.com/#docs/function#箭头函数)

注意事项：

由于箭头函数使得`this`从“动态”变成“静态”，下面两个场合不应该使用箭头函数。

第一个场合是定义对象的方法，且该方法内部包括`this`。

```javascript
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}
```

上面代码中，`cat.jumps()`方法是一个箭头函数，这是错误的。调用`cat.jumps()`时，如果是普通函数，该方法内部的`this`指向`cat`；如果写成上面那样的箭头函数，使得`this`指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致`jumps`箭头函数定义时的作用域就是全局作用域。

*** 注意区分Node.js环境与浏览器环境，在Node.js中，this指向global，为{}，即使提前设置了全局变量也取不出；在浏览器中，正正指向Window对象，如果在前面 var 了一个变量，对象里的箭头函数里的this可以输出全局中 var 的变量。

第二个场合是需要动态`this`的时候，也不应使用箭头函数。

```javascript
var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
```

上面代码运行时，点击按钮会报错，因为`button`的监听函数是一个箭头函数，导致里面的`this`就是全局对象。如果改成普通函数，`this`就会动态指向被点击的按钮对象。

另外，如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。

### 24、函数柯里化

[https://es6.ruanyifeng.com/#docs/function#%E9%80%92%E5%BD%92%E5%87%BD%E6%95%B0%E7%9A%84%E6%94%B9%E5%86%99](https://es6.ruanyifeng.com/#docs/function#递归函数的改写)

柯里化：将多参数的函数转换成单参数的形式，常用于函数式编程。

```javascript
// es6 实现
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}
```

### 25、什么是 XSS 攻击？如何防范 XSS 攻击？

https://juejin.im/post/5bad9140e51d450e935c6d64

1. 概念：XSS攻击是指跨站脚本攻击，是一种代码注入攻击。攻击者通过在网站注入恶意脚本，使之在用户的浏览器上运行，从而盗取用户的信息如 cookie 等。

2. 攻击类型：XSS 一般分为存储型、反射型和 DOM 型。

   存储型：恶意代码提交到了网站的数据库中，当用户请求数据的时候，服务器将其拼接为 HTML 后返回给了用户，从而导致了恶意代码的执行。

   反射型：攻击者构建了特殊的 URL，当服务器接收到请求后，从 URL 中获取数据，拼接到 HTML 后返回，从而导致了恶意代码的执行。

   DOM 型：攻击者构建了特殊的 URL，用户打开网站后，js 脚本从 URL 中获取数据，从而导致了恶意代码的执行。

3. 防范：

   XSS 攻击的预防可以从两个方面入手，一个是恶意代码提交的时候，一个是浏览器执行恶意代码的时候。

   对于第一个方面，如果我们对存入数据库的数据都进行的转义处理，但是一个数据可能在多个地方使用，有的地方可能不需要转义，由于我们没有办法判断数据最后的使用场景，所以直接在输入端进行恶意代码的处理，其实是不太可靠的。

   因此我们可以从浏览器的执行来进行预防，一种是使用纯前端的方式，不用服务器端拼接后返回。另一种是对需要插入到 HTML 中的代码做好充分的转义。对于 DOM 型的攻击，主要是前端脚本的不可靠而造成的，我们对于数据获取渲染和字符串拼接的时候应该对可能出现的恶意代码情况进行判断。

   还有一些方式，比如使用 CSP ，CSP 的本质是建立一个白名单，告诉浏览器哪些外部资源可以加载和执行，从而防止恶意代码的注入攻击。还可以对一些敏感信息进行保护，比如 cookie 使用 http-only ，使得脚本无法获取。也可以使用验证码，避免脚本伪装成用户执行一些操作。

   ps.CSP：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP

### 26、什么是 CSRF 攻击？如何防范 CSRF 攻击？

1. 概念：CSRF 攻击指的是跨站请求伪造攻击，攻击者诱导用户进入一个第三方网站，然后该网站向被攻击网站发送跨站请求。如果用户在被攻击网站中保存了登录状态，那么攻击者就可以利用这个登录状态，绕过后台的用户验证，冒充用户向服务器执行一些操作。CSRF 攻击的本质是利用了 cookie 会在同源请求中携带发送给服务器的特点，以此来实现用户的冒充。

2. 类型：

   第一种是 GET 类型的 CSRF 攻击，比如在网站中的一个 img 标签里构建一个请求，当用户打开这个网站的时候就会自动发起提交。

   第二种是 POST 类型的 CSRF 攻击，比如说构建一个表单，然后隐藏它，当用户进入页面时，自动提交这个表单。

   第三种是链接类型的 CSRF 攻击，比如说在 a 标签的 href 属性里构建一个请求，然后诱导用户去点击。

3. 防范 ：

   1）同源检测的方法，服务器根据 http 请求头中 origin 或者 referer 信息来判断请求是否为允许访问的站点，从而对请求进行过滤。当 origin 或者 referer 信息都不存在的时候，直接阻止。这种方式的缺点是有些情况下 referer 可以被伪造。还有就是这种方法同时把搜索引擎的链接也给屏蔽了，所以一般网站会允许搜索引擎的页面请求，但是相应的页面请求这种请求方式也可能被攻击者给利用。

   2）使用 CSRF Token 来进行验证，服务器向用户返回一个随机数 Token ，当网站再次发起请求时，在请求参数中加入服务器端返回的 token ，然后服务器对这个 token 进行验证。这种方法解决了使用 cookie 单一验证方式时可能会被冒用的问题，但是这种方法存在一个缺点就是，我们需要给网站中的所有请求都添加上这个 token，操作比较繁琐。还有一个问题是一般不会只有一台网站服务器，如果我们的请求经过负载平衡转移到了其他的服务器，但是这个服务器的 session 中没有保留这个 token 的话，就没有办法验证了。这种情况我们可以通过改变 token 的构建方式来解决。

   3）使用双重 Cookie 验证的办法，服务器在用户访问网站页面时，向请求域名注入一个Cookie，内容为随机字符串，然后当用户再次向服务器发送请求的时候，从 cookie 中取出这个字符串，添加到 URL 参数中，然后服务器通过对 cookie 中的数据和参数中的数据进行比较，来进行验证。使用这种方式是利用了攻击者只能利用 cookie，但是不能访问获取 cookie 的特点。并且这种方法比 CSRF Token 的方法更加方便，并且不涉及到分布式访问的问题。这种方法的缺点是如果网站存在 XSS 漏洞的，那么这种方式会失效。同时这种方式不能做到子域名的隔离。

   4）使用在设置 cookie 属性的时候设置 Samesite ，限制 cookie 不能作为被第三方使用，从而可以避免被攻击者利用。Samesite 一共有两种模式，一种是严格模式，在严格模式下 cookie 在任何情况下都不可能作为第三方 Cookie 使用，在宽松模式下，cookie 可以被请求是 GET 请求，且会发生页面跳转的请求所使用。

   ps. Samesite的拓展阅读：

   Samesite Cookie 表示同站 cookie，避免 cookie 被第三方所利用。

   将 Samesite 设为 strict ，这种称为严格模式，表示这个 cookie 在任何情况下都不可能作为第三方 cookie。

   将 Samesite 设为 Lax ，这种模式称为宽松模式，如果这个请求是个 GET 请求，并且这个请求改变了当前页面或者打开了新的页面，那么这个 cookie 可以作为第三方 cookie，其余情况下都不能作为第三方 cookie。

   使用这种方法的缺点是，因为它不支持子域，所以子域没有办法与主域共享登录信息，每次转入子域的网站，都回重新登录。还有一个问题就是它的兼容性不够好。

### 27、什么是点击劫持？如何防范点击劫持？

点击劫持是一种视觉欺骗的攻击手段，攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。

可以在 http 相应头中设置 X-FRAME-OPTIONS 来防御用 iframe 嵌套的点击劫持攻击。通过不同的值，可以规定页面在特定的一些情况才能作为 iframe 来使用。

### 28、什么是 MVVM？比之 MVC 有什么区别？什么又是 MVP ？

MVC、MVP 和 MVVM 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化我们的开发效率。

比如说我们实验室在以前项目开发的时候，使用单页应用时，往往一个路由页面对应了一个脚本文件，所有的页面逻辑都在一个脚本文件里。页面的渲染、数据的获取，对用户事件的响应所有的应用逻辑都混合在一起，这样在开发简单项目时，可能看不出什么问题，当时一旦项目变得复杂，那么整个文件就会变得冗长，混乱，这样对我们的项目开发和后期的项目维护是非常不利的。

MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。其中 View 负责页面的显示逻辑，Model 负责存储页面的业务数据，以及对相应数据的操作。并且 View 和 Model 应用了观察者模式，当 Model 层发生改变的时候它会通知有关 View 层更新页面。Controller 层是 View 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，Controller 中的事件触发器就开始工作了，通过调用 Model 层，来完成对 Model 的修改，然后 Model 层再去通知 View 层更新。

MVP 模式与 MVC 唯一不同的在于 Presenter 和 Controller。在 MVC 模式中我们使用观察者模式，来实现当 Model 层数据发生变化的时候，通知 View 层的更新。这样 View 层和 Model 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题。MVP 的模式通过使用 Presenter 来实现对 View 层和 Model 层的解耦。MVC 中的Controller 只知道 Model 的接口，因此它没有办法控制 View 层的更新，MVP 模式中，View 层的接口暴露给了 Presenter 因此我们可以在 Presenter 中将 Model 的变化和 View 的变化绑定在一起，以此来实现 View 和 Model 的同步更新。这样就实现了对 View 和 Model 的解耦，Presenter 还包含了其他的响应逻辑。

MVVM 模式中的 VM，指的是 ViewModel，它和 MVP 的思想其实是相同的，不过它通过双向的数据绑定，将 View 和 Model 的同步更新给自动化了。当 Model 发生变化的时候，ViewModel 就会自动更新；ViewModel 变化了，View 也会更新。这样就将 Presenter 中的工作给自动化了。我了解过一点双向数据绑定的原理，比如 vue 是通过使用数据劫持和发布订阅者模式来实现的这一功能。



MVC：当View中有事件触发了，或者直接影响Controller ，就会调用绑定过的Controller 的函数，Controller 里的函数就会调用Model里的函数，Model内保存的数据改变之后，View也做出相应的变化。但是这种模式导致了VC、VM耦合度高，不利于排错和复用。

ps. MV之间是观察者模式，V在M中注册了，当M改变，才会通知这些注册过的V。

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020105.png" alt="img" style="zoom:80%;" />

MVP：与MVC相比，View不依赖Model，可以将View抽离出来做成组件，它只需要提供一系列接口提供给上层（Presenter）操作。当View改变时，触发Presenter里的方法，这些方法会改变Model，然后在Presenter里会把改变后的Model传回给View进行渲染。如图所示的View--》Presenter--》Model--》Presenter--》View。



<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020109.png" alt="img" style="zoom:80%;" />

MVVM：MVVM把View和Model的同步逻辑自动化了。以前Presenter负责的View和Model同步不再手动地进行操作，而是交给框架所提供的数据绑定功能进行负责，只需要告诉它View显示的数据对应的是Model哪一部分即可。以Vue.js举例。

Model：data(){ return {...} }  ，仅仅关注数据。

View：通过使用模板语法来声明式的将数据渲染进DOM，当ViewModel对Model进行更新的时候，会通过数据绑定更新到View。

ViewModel：ViewModel大致上就是MVC的Controller和MVP的Presenter了，业务逻辑主要集中在这里，一大核心就是数据绑定。与MVP不同的是，没有了View为Presente提供的接口，之前由Presenter负责的View和Model之间的数据同步交给了ViewModel中的数据绑定进行处理，当Model发生变化，ViewModel就会自动更新；ViewModel变化，Model也会更新。（在Vue.js中的部分就是new Vue()这个对象。）

在Vue.js中，ViewModel数据绑定是用数据劫持&发布-订阅模式的方式实现的。

数据劫持：当你把一个普通的 JavaScript 对象传入 Vue 实例作为 `data` 选项，Vue 将遍历此对象所有的 property，并使用 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 把这些 property 全部转为 [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#定义_getters_与_setters)。`Object.defineProperty` 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

发布-订阅模式：当data发生改变（发布），订阅它的视图就会作出相应的改变。

具体响应式原理见官网：https://cn.vuejs.org/v2/guide/reactivity.html

双向绑定/MVVM：https://segmentfault.com/a/1190000006599500

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020110.png" alt="img" style="zoom:80%;" />

### 29、什么是 Virtual DOM

Virtual DOM的概念有很多解释，从我的理解来看，主要是三个方面，分别是：一个对象，两个前提，三个步骤。

一个对象指的是Virtual DOM是一个基本的JavaScript对象，也是整个Virtual DOM树的基本。

两个前提分别是JavaScript很快和直接操作DOM很慢，这是Virtual DOM得以实现的两个基本前提。得益于V8引擎的出现，让JavaScript可以高效地运行，在性能上有了极大的提高。直接操作DOM的低效和JavaScript的高效相对比，为Virtual DOM的产生提供了大前提。

三个步骤指的是Virtual DOM的三个重要步骤，分别是：生成Virtual DOM树、对比两棵树的差异、更新视图。

https://github.com/y8n/blog/issues/5

https://www.zhihu.com/question/31809713

### 30、谈谈你对 webpack 的看法

我当时使用 webpack 的一个最主要原因是为了简化页面依赖的管理，并且通过将其打包为一个文件来降低页面加载时请求的资源数。

我认为 webpack 的主要原理是，它将所有的资源都看成是一个模块，并且把页面逻辑当作一个整体，通过一个给定的入口文件，webpack 从这个文件开始，找到所有的依赖文件，将各个依赖文件模块通过 loader 和 plugins 处理后，然后打包在一起，最后输出一个浏览器可识别的 JS 文件。在webpack中一切皆模块。

Webpack 具有四个核心的概念，分别是 Entry（入口）、Output（输出）、loader 和 Plugins（插件）。

Entry 是 webpack 的入口起点，它指示 webpack 应该从哪个模块开始着手，来作为其构建内部依赖图的开始。

Output 属性告诉 webpack 在哪里输出它所创建的打包文件，也可指定打包文件的名称，默认位置为 ./dist。

loader 可以理解为 webpack 的编译器，它使得 webpack 可以处理一些非 JavaScript 文件。在对 loader 进行配置的时候，test 属性，标志有哪些后缀的文件应该被处理，是一个正则表达式。use 属性，指定 test 类型的文件应该使用哪个 loader 进行预处理。常用的 loader 有 css-loader、style-loader 等。

插件可以用于执行范围更广的任务，包括打包、优化、压缩、搭建服务器等等，要使用一个插件，一般是先使用 npm 包管理器进行安装，然后在配置文件中引入，最后将其实例化后传递给 plugins 数组属性。

使用 webpack 的确能够提供我们对于项目的管理，但是它的缺点就是调试和配置起来太麻烦了。但现在 webpack4.0 的免配置一定程度上解决了这个问题。但是我感觉就是对我来说，就是一个黑盒，很多时候出现了问题，没有办法很好的定位。

拓展阅读：

https://juejin.im/post/5afa9cd0f265da0b981b9af9#heading-0

https://juejin.im/entry/5b5724d05188251aa01647fd

### 31、offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别？

clientWidth/clientHeight 返回的是元素的内部宽度，它的值只包含 content + padding，如果有滚动条，不包含滚动条。
clientTop 返回的是上边框的宽度。
clientLeft 返回的左边框的宽度。

offsetWidth/offsetHeight 返回的是元素的布局宽度，它的值包含 content + padding + border 包含了滚动条。
offsetTop 返回的是当前元素相对于其 offsetParent 元素的顶部的距离。
offsetLeft 返回的是当前元素相对于其 offsetParent 元素的左部的距离。

scrollWidth/scrollHeight 返回值包含 content + padding + 溢出内容的尺寸。
scrollTop 属性返回的是一个元素的内容垂直滚动的像素数。
scrollLeft 属性返回的是元素滚动条到元素左边的距离。

http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html

https://juejin.im/post/5bc9366d5188255c4834e75a

### 32、发布订阅模式与观察者模式

- 观察者模式（Observer Pattern）
  观察者模式：在观察者模式中，观察者需要直接订阅目标事件；在目标发出内容改变的事件后，直接接收事件并作出响应

  ![image-20200628220856570](C:\Users\Slade Lyanm\AppData\Roaming\Typora\typora-user-images\image-20200628220856570.png)

- 发布订阅模式（Pub-Sub Pattern）
  其实24种基本的设计模式中并没有发布订阅模式，只是观察者模式的一个别称。

  在现在的发布订阅模式中，称为发布者的消息发送者不会将消息直接发送给订阅者，这意味着发布者和订阅者不知道彼此的存在。在发布者和订阅者之间存在第三个组件，称为消息代理或调度中心或中间件，它维持着发布者和订阅者之间的联系，过滤所有发布者传入的消息并相应地分发它们给订阅者。

  订阅/发布 模式重点是广播外的消息，这个模式并不关心谁接收事件，只管发送事件。

  ![image-20200628220946058](C:\Users\Slade Lyanm\AppData\Roaming\Typora\typora-user-images\image-20200628220946058.png)

https://www.zhihu.com/question/23486749

https://blog.csdn.net/hf872914334/article/details/88899326

### 33、异步编程的实现方式

js 中的异步机制可以分为以下几种：

第一种最常见的是使用回调函数的方式，使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护。

第二种是 Promise 的方式，使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确。

第三种是使用 generator 的方式，它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部我们还可以将执行权转移回来。当我们遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕的时候我们再将执行权给转移回来。因此我们在 generator 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式我们需要考虑的问题是何时将函数的控制权转移回来，因此我们需要有一个自动执行 generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行。

第四种是使用 async 函数的形式，async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此我们可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。

### 34、URL 和 URI 的区别？

URI: Uniform Resource Identifier      指的是统一资源标识符
URL: Uniform Resource Location        指的是统一资源定位符
URN: Universal Resource Name          指的是统一资源名称

URI 指的是统一资源标识符，用唯一的标识来确定一个资源，它是一种抽象的定义，也就是说，不管使用什么方法来定义，只要能唯一的标识一个资源，就可以称为 URI。

URL 指的是统一资源定位符，URN 指的是统一资源名称。URL 和 URN 是 URI 的子集，URL 可以理解为使用地址来标识资源，URN 可以理解为使用名称来标识资源。

### 35、get 和 post 请求在缓存方面的区别

缓存一般只适用于那些不会更新服务端数据的请求。一般 get 请求都是查找请求，不会对服务器资源数据造成修改，而 post 请求一般都会对服务器数据造成修改，所以，一般会对 get 请求进行缓存，很少会对 post 请求进行缓存。

### 36、mouseover 和 mouseenter 的区别

当鼠标移动到元素上时就会触发 mouseenter 事件，类似 mouseover，它们两者之间的差别是 mouseenter 不会冒泡。

由于 mouseenter 不支持事件冒泡，导致在一个元素的子元素上进入或离开的时候会触发其 mouseover 和 mouseout 事件，但是却不会触发 mouseenter 和 mouseleave 事件。

### 37、剩余参数

function sum(...theArgs) {}

如果函数的最后一个命名参数以`...`为前缀，则它将成为一个由剩余参数组成的真数组，其中从`0`（包括）到`theArgs.length`（排除）的元素由传递给函数的实际参数提供。

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/rest_parameters

### 38、Proxy与Reflect

1. Proxy：

   Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

   Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

   ps. Proxy与getter/setter的区别：proxy的功能更加强大。getter/setter只支持读写。

   https://es6.ruanyifeng.com/#docs/proxy

2. Reflect：

   （1） 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

   （2） 修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`。

   （3） 让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。

   （4）`Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。

   https://es6.ruanyifeng.com/#docs/reflect

### 39、require 模块引入的查找方式

当 Node 遇到 require(X) 时，按下面的顺序处理。

（1）如果 X 是内置模块（比如 require('http')）
　　a. 返回该模块。
　　b. 不再继续执行。

（2）如果 X 以 "./" 或者 "/" 或者 "../" 开头
　　a. 根据 X 所在的父模块，确定 X 的绝对路径。
　　b. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
    	X
    	X.js
    	X.json
   	 X.node

　　c. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
   	 X/package.json（main字段）
  	  X/index.js
	    X/index.json
 	   X/index.node

（3）如果 X 不带路径
　　a. 根据 X 所在的父模块，确定 X 可能的安装目录。
　　b. 依次在每个目录中，将 X 当成文件名或目录名加载。

（4）抛出 "not found"

### 40、什么是Promise

Promise 对象是异步编程的一种解决方案，最早由社区提出。

Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。一个 Promise 实例有三种状态，分别是 pending、resolved 和 rejected，分别代表了进行中、已成功和已失败。实例的状态只能由 pending 转变 resolved 或者 rejected 状态，并且状态一经改变，就凝固了，无法再被改变了。状态的改变是通过 resolve() 和 reject() 函数来实现的，我们可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。

Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### 41、怎么做 JS 代码 Error 统计

error 统计使用浏览器的 window.error 事件。

### 42、多种模式的解释

1. 单例模式：单例模式保证了全局只有一个实例来被访问。比如说常用的如弹框组件的实现和全局状态的实现。
2. 策略模式：用来将方法的实现和方法的调用分离开，外部通过不同的参数可以调用不同的策略。
3. 代理模式：为一个对象提供一个代用品或占位符，以便控制对它的访问。比如说常见的事件代理。
4. 中介者模式：多个对象通过一个中介者进行交流，而不是直接进行交流，这样能够将通信的各个对象解耦。
5. 适配器模式：用来解决两个接口不兼容的情况，不需要改变已有的接口，通过包装一层的方式实现两个接口的正常协作。假如我们需要一种新的接口返回方式，但是老的接口由于在太多地方已经使用了，不能随意更改，这个时候就可以使用适配器模式。比如我们需要一种自定义的时间返回格式，但是我们又不能对 js 时间格式化的接口进行修改，这个时候就可以使用适配器模式。

### 43、Vue 的生命周期

https://juejin.im/entry/5aee8fbb518825671952308c

<img src="C:\Users\Slade Lyanm\AppData\Roaming\Typora\typora-user-images\image-20200628231040301.png" alt="image-20200628231040301" style="zoom:80%;" />

注意：

1. created阶段的ajax请求与mounted请求的区别：前者页面视图未出现，如果请求信息过多，页面会长时间处于白屏状态
2. `mounted` 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 [vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick)

总结：

1）单组件：

1. 初始化组件时，仅执行了beforeCreate/Created/beforeMount/mounted四个钩子函数
2. 当改变data中定义的变量（响应式变量）时，会执行beforeUpdate/updated钩子函数
3. 当切换组件（当前组件未缓存）时，会执行beforeDestory/destroyed钩子函数
4. **初始化和销毁时的生命钩子函数均只会执行一次，beforeUpdate/updated可多次执行**

2）父子组件

1. 仅当子组件完成挂载后，父组件才会挂载
2. 当子组件完成挂载后，父组件会主动执行一次beforeUpdate/updated钩子函数（仅首次）
3. 父子组件在data变化中是分别监控的，但是在更新props中的数据是关联的（可实践）
4. 销毁父组件时，先将子组件销毁后才会销毁父组件

3）兄弟组件

1. 组件的初始化（mounted之前）分开进行，挂载是从上到下依次进行
2. 当没有数据关联时，兄弟组件之间的更新和销毁是互不关联的

### 44、$route 和 $router 的区别

$route 是“路由信息对象”，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数。

[https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1](https://router.vuejs.org/zh/api/#路由对象)

$router 是“路由实例”对象包括了路由的跳转方法，钩子函数等。

[https://router.vuejs.org/zh/api/#router-%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7](https://router.vuejs.org/zh/api/#router-实例属性)

### 45、Vue Router的钩子

`beforeRouteLeave` `beforeEach` `beforeRouteUpdate` `beforeEnter` `beforeRouteEnter` `beforeResolve`  `afterEach` 

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。

### 46、Vue事件修饰符

[https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6](https://cn.vuejs.org/v2/guide/events.html#事件修饰符)

- **`.stop`**：等同于JavaScript中的`event.stopPropagation()`，防止事件冒泡
- **`.prevent`**：等同于JavaScript中的`event.preventDefault()`，防止执行预设的行为（如果事件可取消，则取消该事件，而不停止事件的进一步传播）
- **`.capture`**：与事件冒泡的方向相反，事件捕获由外到内
- **`.self`**：只会触发自己范围内的事件，不包含子元素
- **`.once`**：只会触发一次
- **`.passive`**：告诉浏览器不想阻止事件的默认行为

### 47、Vue 中 mixin 和 mixins 区别

mixin：一般都是Vue.mixin这样用，将一个对象作为全局混入

mixins：一般是在组件内部使用

### 48、常用的Content-Type

1. application/x-www-form-urlencoded：浏览器的原生 form 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。
2. multipart/form-data：该种方式也是一个常见的 POST 提交方式，通常表单上传文件时使用该种方式。
3. application/json：告诉服务器消息主体是序列化后的 JSON 字符串。
4. text/xml：该种方式主要用来提交 XML 格式的数据。

### 49、判断一个对象是否为空对象

```js
function checkNullObj(obj) {
  return Object.keys(obj).length === 0;
}
```

### 50、手写 jsonp

```js
function jsonp(url, params, callback) {
  // 判断是否含有参数
  let queryString = url.indexOf("?") === "-1" ? "?" : "&";

  // 添加参数
  for (var k in params) {
    if (params.hasOwnProperty(k)) {
      queryString += k + "=" + params[k] + "&";
    }
  }

  // 处理回调函数名
  let random = Math.random()
      .toString()
      .replace(".", ""),
    callbackName = "myJsonp" + random;

  // 添加回调函数
  queryString += "callback=" + callbackName;

  // 构建请求
  let scriptNode = document.createElement("script");
  scriptNode.src = url + queryString;

  window[callbackName] = function() {
    // 调用回调函数
    callback(...arguments);

    // 删除这个引入的脚本
    document.getElementsByTagName("head")[0].removeChild(scriptNode);
  };

  // 发起请求
  document.getElementsByTagName("head")[0].appendChild(scriptNode);
}
```

### 51、手写设计模式（观察者、事件派发器、发布订阅...）

https://www.jianshu.com/p/e37ca8369162/

观察者：

```js
var events = (function() {
  var topics = {};

  return {
    // 注册监听函数
    subscribe: function(topic, handler) {
      if (!topics.hasOwnProperty(topic)) {
        topics[topic] = [];
      }
      topics[topic].push(handler);
    },

    // 发布事件，触发观察者回调事件
    publish: function(topic, info) {
      if (topics.hasOwnProperty(topic)) {
        topics[topic].forEach(function(handler) {
          handler(info);
        });
      }
    },

    // 移除主题的一个观察者的回调事件
    remove: function(topic, handler) {
      if (!topics.hasOwnProperty(topic)) return;

      var handlerIndex = -1;
      topics[topic].forEach(function(item, index) {
        if (item === handler) {
          handlerIndex = index;
        }
      });

      if (handlerIndex >= 0) {
        topics[topic].splice(handlerIndex, 1);
      }
    },

    // 移除主题的所有观察者的回调事件
    removeAll: function(topic) {
      if (topics.hasOwnProperty(topic)) {
        topics[topic] = [];
      }
    }
  };
})();
```

事件派发：

```js
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    let callbacks = this.events[event] || [];
    callbacks.push(callback);
    this.events[event] = callbacks;

    return this;
  }

  off(event, callback) {
    let callbacks = this.events[event];
    this.events[event] = callbacks && callbacks.filter(fn => fn !== callback);

    return this;
  }

  emit(event, ...args) {
    let callbacks = this.events[event];
    callbacks.forEach(fn => {
      fn(...args);
    });

    return this;
  }

  once(event, callback) {
    let wrapFun = function(...args) {
      callback(...args);

      this.off(event, wrapFun);
    };
    this.on(event, wrapFun);

    return this;
  }
}
```

待补充...

### 52、闭包

闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。

闭包有两个常用的用途。

闭包的第一个用途是使我们在函数外部能够访问到函数内部的变量。通过使用闭包，我们可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。

函数的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures

## 二、CSS

### 0、命名规范

https://www.zhihu.com/question/19586885

### 1、CSS 盒子模型

盒模型都是由四个部分组成的，分别是margin、border、padding和content。

标准盒模型和IE盒模型的区别在于设置width和height时，所对应的范围不同。

标准盒模型的width和height属性的范围只包含了content；

IE盒模型的width和height属性的范围包含了border、padding和content。

一般来说，我们可以通过修改元素的box-sizing属性来改变元素的盒模型。

https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing

### 2、选择器

（1）ID选择器（#myid）
（2）类选择器（.myclassname）
（3）元素选择器（div,h1,p）
（4）后代选择器（h1 p）
（5）子选择器（ul>li）
（6）通用兄弟选择器（li~a）
（7）相邻兄弟选择器（li+a）
（8）属性选择器（a[rel="external"]）
（9）伪类（a:hover,li:nth-child）
（10）伪元素（::before、::after）
（11）通配符选择器（*）

https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first

### 3、::before 和:after 中双冒号和单冒号有什么区别？解释一下这 2 个伪元素的作用。

在css3中使用单冒号来表示伪类，用双冒号来表示伪元素。但是为了兼容已有的伪元素的写法，在一些浏览器中也可以使用单冒号
来表示伪元素。

伪类一般匹配的是元素的一些特殊状态，如hover、link等，而伪元素一般匹配的特殊的位置，比如after、before等。

### 4、伪类和伪元素的区别

css引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分，比如，一句
话中的第一个字母，或者是列表中的第一个元素。

伪类用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的
元素时，我们可以通过:hover来描述这个元素的状态。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。它们允许我们为元素的某些部分设置样式。比如说，我们可以通过::be
fore来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

有时你会发现伪元素使用了两个冒号（::）而不是一个冒号（:）。这是CSS3的一部分，并尝试区分伪类和伪元素。大多数浏览
器都支持这两个值。按照规则应该使用（::）而不是（:），从而区分伪类和伪元素。但是，由于在旧版本的W3C规范并未对此进行
特别区分，因此目前绝大多数的浏览器都支持使用这两种方式表示伪元素。

最后，伪类与伪元素的区别在于：有没有创建一个文档树之外的元素。

http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/

<img src="http://www.alloyteam.com/wp-content/uploads/2016/05/%E4%BC%AA%E7%B1%BB.png" alt="伪类" style="zoom:80%;" />

<img src="http://www.alloyteam.com/wp-content/uploads/2016/05/%E4%BC%AA%E5%85%83%E7%B4%A0.png" alt="伪元素" style="zoom:80%;" />



### 5、有哪些属性可以继承

一般具有继承性的属性有，字体相关的属性，font-size和font-weight等。文本相关的属性，color和text-align等。
表格的一些布局属性、列表属性如list-style等。还有光标属性cursor、元素可见性visibility。

当一个属性不是继承属性的时候，我们也可以通过将它的值设置为inherit来使它从父元素那获取同名的属性值来继承。

ps. 简洁记忆：一般只有文字的属性能够继承，盒子的属性不能继承。
文字属性：color、 font- 系列、line- 系列、text- 系列。
盒子属性：background- 系列、width、 height、 border- 系列、浮动、定位等。

### 6、CSS 优先级算法

CSS的优先级是根据样式声明的特殊性值来判断的。

选择器的特殊性值分为四个等级，如下：

（1）标签内选择器x,0,0,0
（2）ID选择器0,x,0,0
（3）类选择器/属性选择器/伪类0,0,x,0
（4）元素选择器和伪元素0,0,0,x

计算方法：

（1）每个等级的初始值为0
（2）每个等级的叠加为选择器出现的次数相加
（3）不可进位，比如0,99,99,99 
（4）依次表示为：0,0,0,0
（5）每个等级计数之间没关联
（6）等级判断从左向右，如果某一位数值相同，则判断下一位数值
（7）如果两个优先级相同，则最后出现的优先级高，!important也适用
（8）通配符选择器的特殊性值为：0,0,0,0
（9）继承样式优先级最低，通配符样式优先级高于继承样式
（10）!important（权重），它没有特殊性值，但它的优先级是最高的，为了方便记忆，可以认为它的特殊性值为1,0,0,0,0。

计算实例：

a{color: yellow;} /*特殊性值：0,0,0,1*/
div a{color: green;} /*特殊性值：0,0,0,2*/
.demo a{color: black;} /*特殊性值：0,0,1,1*/
.demo input[type="text"]{color: blue;} /*特殊性值：0,0,2,1*/
.demo \*[type="text"]{color: grey;}    /*特殊性值：0,0,2,0/*

#demo a{color: orange;}  /*特殊性值：0,1,0,1*/
div#demo a{color: red;}   /*特殊性值：0,1,0,2*/

注意：
（1）样式应用时，css会先查看规则的权重（!important），加了权重的优先级最高，当权重相同的时候，会比较规则的特殊性。

（2）特殊性值越大的声明优先级越高。

（3）相同特殊性值的声明，根据样式引入的顺序，后声明的规则优先级高（距离元素出现最近的）

（4） 部分浏览器由于字节溢出问题出现的进位表现不做考虑

<img src="C:\Users\Slade Lyanm\AppData\Roaming\Typora\typora-user-images\image-20200702160434633.png" alt="image-20200702160434633" style="zoom:67%;" />

### 7、如何居中 div

一般常见的几种居中的方法有：

对于宽高固定的元素

（1）我们可以利用margin:0 auto来实现元素的水平居中。

（2）利用绝对定位，设置四个方向的值都为0，并将margin设置为auto，由于宽高固定，因此对应方向实现平分，可以实现水平和垂直方向上的居中。

（3）利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过margin负值来调整元素的中心点到页面的中心。

（4）利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过translate来调整元素的中心点到页面的中心。

（5）使用flex布局，通过align-items:center和justify-content:center设置容器的垂直和水平方向上为居中对齐，然后它的子元素也可以实现垂直和水平的居中。

对于宽高不定的元素，上面的后面两种方法，可以实现元素的垂直和水平的居中。

### 8、display 有哪些值？说明他们的作用。

block	块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
none	元素不显示，并从文档流中移除。
inline	行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
inline-block默认宽度为内容宽度，可以设置宽高，同行显示。
list-item	像块类型元素一样显示，并添加样式列表标记。
table	此元素会作为块级表格来显示。
inherit	规定应该从父元素继承display属性的值。
flex	子元素开启flex布局

### 9、position 的值 relative 和 absolute 定位原点

1. absolute：生成绝对定位的元素，相对于值不为 static的第一个父元素进行定位。
2. fixed （老IE不支持）： 生成绝对定位的元素，相对于浏览器窗口进行定位。
3. relative：生成相对定位的元素，相对于其正常位置进行定位。
4. static：默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right z-index 声明）。
5. inherit：规定从父元素继承 position 属性的值。

### 10、Flex布局

http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

http://www.ruanyifeng.com/blog/2015/07/flex-examples.html

1. 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。

2. 容器属性：

   ~为默认值

   ```css
   flex-direction: row~ | row-reverse | column | column-reverse;/* 默认：从左到右，从上到下*/
   ```

   ```css
   flex-wrap: nowrap~ | wrap/*换行，第一行在上方*/ | wrap-reverse;/*换行，第一行在下方*/
   ```

   ```css
   flex-flow: <flex-direction> || <flex-wrap>;
   /* flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。 */
   ```

   ```css
   justify-content: flex-start~ | flex-end | center | space-between | space-around;
   ```

   ```css
   align-items: flex-start | flex-end | center | baseline（项目的第一行文字的基线对齐） 
   			| stretch~（意为伸展，占满容器整个高度）;
   ```

   ```css
   align-content: flex-start | flex-end | center | space-between | space-around | stretch~;
   /* 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。 */
   ```

   ​							align-content：

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png" alt="img" style="zoom:67%;" />





3. 项目属性：

   ~为默认值

   ```css
   order: <integer>;
   
   /* 项目的排列顺序。数值越小，排列越靠前，默认为0。 */
   ```

   ```css
   flex-grow: <number>; /* default 0 */
   
   /* 项目的放大比例，默认为0，即如果存在剩余空间，也不放大。 */
   /* 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。 */
   ```

   ```css
   flex-shrink: <number>; /* default 1 */
   
   /* 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。负值对该属性无效。 */
   ```

   ```css
   flex-basis: <length> | auto; /* default auto */
   
   /* flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。 */
   ```

   ```css
   flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
   
   /* flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。 */
   /* 该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
   建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。 */
   ```

   ```css
   align-self: auto~ | flex-start | flex-end | center | baseline | stretch;
   
   /* align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。 */
   /* 该属性可能取6个值，除了auto，其他都与align-items属性完全一致 */
   ```

### 11、圣杯布局

圣杯布局（Holy Grail Layout）指的是一种最常见的网站布局。页面从上到下，分成三个部分：头部（header），躯干（body），尾部（footer）。其中躯干又水平分成三栏，从左到右为：导航、主栏、副栏。

可以用Flex布局快速实现。

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071323.png)

### 12、网格布局

http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

1. 概念：采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）。正常情况下n行和m列会产生n x m个单元格。比如，3行3列会产生9个单元格；n行有n + 1根水平网格线，m列有m + 1根垂直网格线，比如三行就有四根水平网格线。

2. 容器属性：

   ```css
   display: grid | inline-grid;
   /* 设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。 */
   ```

![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032504.png)![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032505.png)

​	详情看网址

### 13、多列等高

1. 利用flex布局中项目align-items属性默认为stretch，如果项目未设置高度或设为auto，将占满整个容器的高度
   的特性，来实现多列等高。
2. 子元素设置的padding-bottom尽可能大一些，并且需要设置一样大小的margin-bottom负值去抵消padding-bottom撑大的区域，正负一抵消，对于页面布局不会有影响。另外的话还需要设置父元素overflow：hidden把子元素多出来的色块背景隐藏掉。
3. grid布局。

### 14、li 与 li 之间有看不见的空白间隔是什么原因引起的

浏览器会把inline元素间的空白字符（空格、换行、Tab等）渲染成一个空格。而为了美观。我们通常是一个<li>放在一行，
这导致\<li>换行后产生换行字符，它变成一个空格，占用了一个字符的宽度。

### 15、什么是包含块，对于包含块的理解

包含块（containingblock）就是元素用来计算和定位的一个框。

（1）根元素（很多场景下可以看成是\<html>）被称为“初始包含块”，其尺寸等同于浏览器可视窗口的大小。

（2）对于其他元素，如果该元素的position是relative或者static，则“包含块”由其最近的块容器祖先盒的content box边界形成。

（3）如果元素position:fixed，则“包含块”是“初始包含块”。

（4）如果元素position:absolute，则“包含块”由最近的position不为static的祖先元素建立，具体方式如下：

​	如果该祖先元素是纯inline元素，则规则略复杂：

​	• 假设给内联元素的前后各生成一个宽度为0的内联盒子（inline box），则这两个内联盒子的paddingbox外面的包围盒就是内联元素的“包含块”；

​	• 如果该内联元素被跨行分割了，那么“包含块”是未定义的，也就是CSS2.1规范并没有明确定义，浏览器自行发挥，否则，“包含块”由该祖先的paddingbox边界形成。

​	• 如果没有符合条件的祖先元素，则“包含块”是“初始包含块”。

### 16、width:auto 和 width:100%的区别

width:100%会使元素box的宽度等于父元素的contentbox的宽度。

width:auto会使元素撑满整个父元素，margin、border、padding、content区域会自动分配水平空间。

### 17、绝对定位元素与非绝对定位元素的百分比计算的区别

绝对定位元素的宽高百分比是相对于临近的position不为static的祖先元素的padding box来计算的。

非绝对定位元素的宽高百分比则是相对于父元素的content box来计算的。

### 18、Base64

1. 概念：base64编码是一种图片处理格式，通过特定的算法将图片编码成一长串字符串，在页面上显示的时候，可以用该字符串来代替图片的url属性。

2. 优点：减少一个图片的HTTP请求

3. 缺点：

   1）编码后的大小会比原文件大小大1/3，造成文件体积的增加，影响文件加载速度，增加浏览器对html或css文件解析渲染的时间。

   2）兼容性的问题，ie8以前的浏览器不支持。

### 19、'display'、'position'和'float'的相互关系

![display_float_position](C:\Users\Slade Lyanm\Desktop\display_float_position.png)

### 20、BFC（块级格式化上下文：Block Formatting Context）的理解

https://segmentfault.com/a/1190000013647777

https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context

BFC 是一个独立的布局环境,可以理解为一个容器,在这个容器中按照一定规则进行物品摆放,并且不会影响其它环境中的物品。
如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。
浮动元素会创建 BFC，则浮动元素内部子元素主要受该浮动元素影响，所以两个浮动元素之间是互不影响的。

创建BFC的方法：

1. 根元素或包含根元素的元素
2. 浮动元素 float ＝ left | right 或 inherit（≠ none）
3. 绝对定位元素 position ＝ absolute 或 fixed
4. display ＝ inline-block | flex | inline-flex | table-cell 或 table-caption
5. overflow ＝ hidden | auto 或 scroll (≠ visible)

### 21、IFC（行级格式化上下文：Inline Formatting Context）

在IFC中，盒子水平放置，一个接着一个，从包含块的顶部开始。

1. 内部的盒子会在水平方向，一个个地放置；
2. IFC的高度，由里面最高盒子的高度决定；
3. 当一行不够放置的时候会自动切换到下一行；

### 22、HTML 的文档/标准流（Normal flow）和文本流（Text flow）分别是什么

文档流是相对于盒子模型讲的。
文本流是相对于文字段落讲的。
元素浮动之后，会让它跳出文档流，也就是说当它后面还有元素时，其他元素会无视它所占据了的区域，直接在它身上布局。但是文字却会认同浮动元素所占据的区域，围绕它布局，也就是没有拖出文本流。
但是绝对定位后，不仅元素盒子会拖出文档流，文字也会出文本流。那么后面元素的文本就不会在认同它的区域位置，会直接在它后面布局，不会在环绕。
当然你可以使用 index-z 来让底部的元素到上面来，类似于一个图层的概念。

文档流：https://www.jianshu.com/p/ccbe15f7a6d4

### 23、display 有哪些值，分别什么作用

block	块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
none	元素不显示，并从文档流中移除。
inline	行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
inline-block默认宽度为内容宽度，可以设置宽高，同行显示。
list-item	像块类型元素一样显示，并添加样式列表标记。
table	此元素会作为块级表格来显示。
inherit	规定应该从父元素继承display属性的值。

### 24、浏览器兼容问题

（1）png24位的图片在iE6浏览器上出现背景。
解决方案：做成PNG8，也可以引用一段脚本处理。

（2）浏览器默认的margin和padding不同。
解决方案：加一个全局的*{margin:0;padding:0;}来统一。

（3）IE6双边距bug：在IE6下，如果对元素设置了浮动，同时又设置了margin-left或margin-right，margin值会加倍。

#box{float:left;width:10px;margin:00010px;}

这种情况之下IE会产生20px的距离。
解决方案：在float的标签样式控制中加入\_display:inline;将其转化为行内属性。(_这个符号只有ie6会识别)

（4）渐进识别的方式，从总体中逐渐排除局部。首先，巧妙的使用"\9"这一标记，将IE游览器从所有情况中分离出来。接着，再次使用"+"将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
.bb{
background-color:#f1ee18;/*所有识别*/
.background-color:#00deff\9;/*IE6、7、8识别*/
+background-color:#a200ff;/*IE6、7识别*/
_background-color:#1e0bd1;/*IE6识别*/
}

（5）IE下，可以使用获取常规属性的方法来获取自定义属性，也可以使用getAttribute()获取自定义属性；Firefox下，只能使用getAttribute()获取自定义属性。
解决方法：统一通过getAttribute()获取自定义属性。

（6）IE下，event对象有x、y属性，但是没有pageX、pageY属性;Firefox下，event对象有pageX、pageY属性，但是没有x、y属性。
解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。

（7）Chrome中文界面下默认会将小于12px的文本强制按照12px显示
解决方法：

1.可通过加入CSS属性-webkit-text-size-adjust:none;解决。但是，在chrome更新到27版本之后就不可以用了。

2.还可以使用-webkit-transform:scale(0.5);注意-webkit-transform:scale(0.75);
收缩的是整个span的大小，这时候，必须要将span转换成块元素，可以使用display：block/inline-block/...；

（8）超链接访问过后hover样式就不出现了，被点击访问过的超链接样式不再具有hover和active了。
解决方法：改变CSS属性的排列顺序L-V-H-A

（9）怪异模式问题：漏写DTD声明，Firefox仍然会按照标准模式来解析网页，但在IE中会触发怪异模式。为避免怪异模式给我们带来不必要的麻烦，最好养成书写DTD声明的好习惯。

### 25、margin 重叠问题

margin重叠指的是在垂直方向上，两个相邻元素的margin发生重叠的情况。

一般来说可以分为四种情形：

第一种是相邻兄弟元素的margin-bottom和margin-top的值发生重叠。这种情况下我们可以通过设置其中一个元素为BFC来解决。

第二种是父元素的margin-top和子元素的margin-top发生重叠。它们发生重叠是因为它们是相邻的，所以我们可以通过这一点来解决这个问题。我们可以为父元素设置border-top、padding-top值来分隔它们，当然我们也可以将父元素设置为BFC来解决。

第三种是高度为auto的父元素的margin-bottom和子元素的margin-bottom发生重叠。它们发生重叠一个是因为它们相邻，一个是因为父元素的高度不固定。因此我们可以为父元素设置border-bottom、padding-bottom来分隔它们，也可以为父元素设置一个高度，max-height和min-height也能解决这个问题。当然将父元素设置为BFC是最简单的方法。

第四种情况，是没有内容的元素，自身的margin-top和margin-bottom发生的重叠。我们可以通过为其设置border、padding或者高度来解决这个问题。

ps. 一些具体方法：

1. 外层  padding
2. 透明边框  border:1px solid transparent;
3. 绝对定位  postion:absolute:
4. 外层DIV  overflow:hidden;
5. 内层DIV加  float:left;display:inline;
6. 外层DIV有时会用到  zoom:1;



## 三、计算机网络

## 四、算法与数据结构

