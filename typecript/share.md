
前言
当前 ES6 已经越来越普及，新的 ES6 语法大大简化了 JavaScript 程序的表达方式，比如箭头函数、class、async/await、Proxy等新特性，从此写 JavaScript 更成了一种享受。但是在近一年半的实践中，发现多人维护一个大型项目时，除了使用 ES6 新特性更简单地实现功能之外，另一个重要的事情是如何保证程序的健壮性和可维护性，在这点上，完全无类型检查、表达方式极其灵活的 JavaScript 却显得有点吃力，尤其是当团队人员水平参差不齐时更为严重。后来接触到了 TypeScript，它是 JavaScript 语言的超集，除了支持最新的 JavaScript 语言特性之外，还增加了非常有用的编译时类型检查特性，而代码又最终会编译成 JavaScript 来执行，非常适合原本使用 JavaScript 来开发的大型项目。

我在经过半年多的深入实践，总结了一些使用 TypeScript 的经验，写成了这一篇文章，希望帮助 TypeScript 初学者更轻松地学习。

什么是 TypeScript
TypeScript 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。安德斯·海尔斯伯格，C# 的首席架构师，已工作于 TypeScript 的开发。2012 年十月份，微软发布了首个公开版本的 TypeScript，2013 年 6 月 19 日，在经历了一个预览版之后微软正式发布了正式版 TypeScript 0.9，向未来的 TypeScript 1.0 版迈进了很大一步。

以上解释来源于 百度百科 TypeScript 词条

结合微软开发的开源代码编辑器 Visual Studio Code，使用 TypeScript 开发项目具有以下优点：

可以使用最新的 ES2017 语言特性
非常精准的代码提示
编辑代码时具有即时错误检查功能，可以避免诸如输错函数名这种明显的错误
非常精准的代码重构功能
非常方便的断点调试功能
编辑器集成调试功能
在使用 TypeScript 编写 Node.js 项目时，由于长期使用 JavaScript 而养成随便在对象上附加各种东西的坏习惯，刚使用 TypeScript 时可能会有点不适，另一个不可避免的问题是依赖的代码库不是使用 TypeScript 编写的，由于不能直接通过 import 引用这些模块，在 TypeScript 上使用时会造成一些困难。本文将对初学 TypeScript 时可能会关注的问题作简要的说明。

编写本文时 TypeScript 最新版本为 v2.3.4，Node.js 最新 LTS 版本为 v6.11.0，本文的所有示例代码将基于该环境来运行。

TypeScript 语言走马观花
在学习 TypeScript 前，你最好熟悉 ES6 语法，如果之前未接触过 ES6 可以参考我之前写过的文章 《ES2015 & babel 实战：开发 npm 模块》 及 ES6 语法相关的教程 《ECMAScript 6 入门》。可以使用 TypeScript 官方网站提供的 Playround 工具在线查看 TypeScript 编译为 JavaScript 后的代码，对初学者了解 TypeScript 尤为有用。

其实在 TypeScript 中是可以完全使用纯 JavaScript 语法的（当然如果这样的话就达不到使用 TypeScript 的目的，但是在项目重构为 TypeScript 的初期可以实现 TypeScript 与 JavaScript 并存，逐步替换），比如我们在 Playground 中输入以下代码：

function hello(msg) {
    console.log("hello, " + msg);
}
hello('laolei');
可以看到输出的 JavaScript 代码也跟输入的一模一样。

简单来理解，TypeScript 中的 Type 指的就是在 JavaScript 语法的基础上，增加了静态类型检查，而为了让 TypeScript 起到其应有的作用，在编写程序时我们也加上必要的类型声明，比如：

function hello(msg: string): void {
  console.log(`hello, ${msg}`);
}

hello('laolei');
上例中声明了函数的参数msg为string类型，而返回值为void（没有返回值），可以看到编译后的代码还是与前面例子一样，并没有变化。如果我们将函数调用部分改为hello(123)，将会看到参数123下面画了红线：

ts-01

编译器报错Argument of type ‘123’ is not assignable to parameter of type ‘string’（参数123不能赋值给string类型），因为123是number类型。需要注意的是，这个错误是在编译代码时发生的，但是 TypeScript 仍然会继续将代码编译为 JavaScript，可以看到编译后的代码也没有变化，**这表明 TypeScript 的类型检查是在编译期进行的，编译后的 JavaScript 代码并不会增加任何类型检查相关的代码，因此我们不需要担心由此带来的性能问题。**也就是说，如果我们的 TypeScript 项目编译成了 JavaScript 再被其他的 JavaScript 程序调用，如果对方传递了不合法的数据类型，程序可能会抛出异常。

我们可以尝试将参数部分msg: string改为msg: any，这时编译器没有给出任何错误，因为**any表示了此参数接受任意类型**。这在使用一些 JavaScript 项目时尤其有用，可以短时间内降低使用 TypeScript 的难度，但是我们应该尽量避免这样用。

TypeScript 中的类型分为基础类型、接口、类、函数、泛型、枚举等几种：

基础类型
以下是 TypeScript 中的几种基础类型：

boolean为布尔值类型，如let isDone: Boolean = false
number为数值类型，如let decimal: number = 6;
string为字符串类型，如let color: string = 'blue'
数组类型，如let list: number[] = [ 1, 2, 3 ]
元组类型，如let x: [ string, number ] = [ "hello", 10 ]
枚举类型，如enum Color { Red, Green, Blue }; let c: Color = Color.Green
any为任意类型，如let notSure: any = 4; notSure = "maybe a string instead"
void为空类型，如let unusable: void = undefined
null和undefined
never表示没有值的类型，如function error(message: string): never { throw new Error(message); }
多种类型可以用|隔开，比如number | string表示可以是number或string类型
never类型是 TypeScript 2.0 新增的，并不如前面几种类型那么常用，详细信息可以参考这里：TypeScript Handbook - Basic Types - Never

接口（interface）
以下是接口的几种常见形式：

// 定义具有 color 和 width 属性的对象
interface SuperConfug {
  color: string;
  width: number;
}

// readonly 表示只读，不能对其属性进行重新赋值
interface Point {
  readonly x: number;
  readonly y: number;
}

// ?表示属性是可选的，
// [propName: string]: any 表示允许 obj[xxx] 这样的动态属性
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

// 函数接口
interface SearchFunc {
  (source: string, subString: string): boolean;
}
实际上 TypeScript 的接口还有很多种的表示形式，详细信息可以参考这里：TypeScript Hankbook - Interfaces

函数
以下是几种函数接口的定义方式：

// 普通函数
function add(a: number, b: number): number {
  return a + b;
}

// 函数参数
function readFile(file: string, callback: (err: Error | null, data: Buffer) => void) {
  fs.readFile(file, callback);
}

// 通过 type 语句定义类型
type CallbackFunction = (err: Error | null, data: Buffer) => void;
function readFile(file: string, callback: CallbackFunction) {
  fs.readFile(file, callback);
}

// 通过 interface 语句来定义类型
interface CallbackFunction {
  (err: Error | null, data: Buffer): void;
}
function readFile(file: string, callback: CallbackFunction) {
  fs.readFile(file, callback);
}
以上几种定义方式有着微妙的差别，还是需要在深入实践 TypeScript 后才能合理地运用。详细信息可以参考这里：TypeScript Handbook - Functions

类
TypeScript 的类定义跟 JavaScript 的定义方法类型一样，但是增加了public, private, protected, readonly等访问控制修饰符：

class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}
需要注意的是，这些修饰符仅在 TypeScript 程序中才有效，如果直接使用 JavaScript 是可以在类外部访问到被声明为 private 或者 protocted 的类成员，也可以修改被声明为 readonly 的成员变量。

如果没有指定访问控制关键字，则默认为 public。

详细信息可以参考这里：TypeScript Handbook - Classes

泛型
TypeScript 的泛型和接口使得具备较强的类型检查能力的同时，很好地兼顾了 JavaScript 语言的动态特性。以下是使用泛型的简单例子：

function identity<T>(arg: T): T {
  return arg;
}

const map = new Map<string, number>();
map.set('a', 123);

function sleep(ms: number): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => resolve(ms), ms);
  });
}
TypeScript 2.0 之后增加了很多泛型相关的语法，比如K extends keyof T这种，对初学者来说理解起来并不容易，平时可能也并不会使用到，详细信息可以参考这里：TypeScript Handbook - Generics

以上便是 TypeScript 相对于 JavaScript 增加的核心内容，如果你熟悉 ES6 的新语法，那学习 TypeScript 也并不是什么难事，只要多阅读使用 TypeScript 编写的项目源码，适当地查阅语法文档即可。限于篇幅，如果想深入学习 TypeScript ，可以通过以下链接浏览更详细的资料：

TypeScript Handbook （中文版）
TypeScript Document
Hello World 程序
我们先创建一个目录（比如helloworld）用于存放此程序，并执行npm init创建package.json文件：

$ mkdir helloworld
$ cd helloworld
$ Nom init
然后全局安装 tsc 命令：

$ Nom install -g typescript
现在新建文件server.ts：

import * as http from 'http';

const server = http.createServer(function (req, res) {
  res.end('Hello, world');
});

server.listen(3000, function () {
  console.log('server is listening');
});
为了能执行此文件，需要通过 tsc 命令来编译该 TypeScript 源码：

$ tsc server.ts
如果没有什么意外的话，此时控制台会打印出以下的出错信息：

server.ts(1,23): error TS2307: Cannot find module 'http'.
这表示没有找到http这个模块定义（TyprScript 编译时是通过查找模块的 typings 声明文件来判断模块是否存在的，而不是根据真实的 js 文件，下文会详细解释），但是我们当前目录下还是生成了一个新的文件server.js，我们可以试着执行它：

$ node server.js
如果一切顺利，那么控制台将会打印出 server is listening 这样的信息，并且我们在浏览器中访问 http://127.0.0.1:3000 时也能看到正确的结果：Hello, world

现在再回过头来看看刚才的编译错误信息。由于这是一个 Node.js 项目，JavaScript 语言中并没有定义http这个模块，所以我们需要安装 Node.js 运行环境的声明文件：

$ npm install [@types](/user/types)/node --save
安装完毕之后，再重复上文的编译过程，此时 tsc 不再报错了。

大多数时候，为了方便我们可以直接使用 ts-node 命令执行 TypeScript 源文件而不需要预先编译。首先执行以下命令安装 ts-node：

$ npm install -g ts-node
然后使用 ts-node 命令执行即可：

$ ts-node server.ts
tsconfig.json 配置文件
每个 TypeScript 项目都需要一个 tsconfig.json 文件来指定相关的配置，比如告诉 TypeScript 编译器要将代码转换成 ES5 还是 ES6 代码等。以下是我常用的最基本的 tsconfig.json 配置文件：

{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es6",
    "rootDir": "src",
    "outDir": "dist",
    "sourceMap": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true
  }
}
其中：

module和moduleResolution表示这是一个 Node.js 项目，使用 CommonJS 模块机制
target 指定将代码编译到 ES6，如果目标执行系统可能有 Node.js v0.x 的版本，可设置编译到 ES5
rootDir 和 outDir 指定源码输入目录和编译后的代码输出目录
sourceMap 指定编译时生成对应的 SourceMap 文件，这样在调试程序时能快速知道所对应的 TypeScript 源码位置
noImplicit 开头的几个选项指定一些更严格的检查
具体说明可以参考这里的文档：

tsconfig.json 概述
TypeScript 编译选项
使用了这个 tsconfig.json 配置文件之后，我们的源码就需要全部放到 src 目录，否则使用 tsc 编译将会得到类似这样的报错信息：

error TS6059: File '/typescript-example/server.ts' is not under 'rootDir' '/typescript-example/src'. 'rootDir' is expected to contain all source files.
使用第三方模块
一般情况下在 TypeScript 中是不能"直接"使用 npm 上的模块的，比如我们要使用 express 模块，先执行以下命令安装：

$ npm install express --save
然后新建文件 src/server.ts （原本的hello.ts 和 server.ts 文件记得删除）：

import * as express from 'express';

const app = express();
app.get('/', function (req, res) {
  res.end('hello, world');
})

app.listen(3000, function () {
  console.log('server is listening');
});
然后使用以下命令执行：

$ ts-node src/server.ts
如果不出意外，我们将会看到这样的报错信息：

src/server.ts(1,26): error TS7016: Could not find a declaration file for module 'express'.
报错的信息表明没有找到express模块的声明文件。由于 TypeScript 项目最终会编译成 JavaScript 代码执行，当我们在 TypeScript 源码中引入这些被编译成 JavaScript 的模块时，它需要相应的声明文件（.d.ts文件）来知道该模块类型信息，这些声明文件可以通过设置tsconfig.json中的declaration: true来自动生成。而那些不是使用 TypeScript 编写的模块，也可以通过手动编写声明文件来兼容 TypeScript（下文会讲解）。

为了让广大开发者更方便地使用 npm 上众多非 TypeScript 开发的模块，TypeScript 官方建立了一个名叫 DefinitelyTyped 的仓库，任何人都可以通过 GitHub 在上面修改或者新增 npm 模块的声明文件，经多几年多的发展，这个仓库已经包含了大部分常用模块的声明文件，而且仍然在继续不断完善。当遇到缺少模块声明文件的情况，开发者可以尝试通过 npm install @types/xxx 来安装模块声明文件即可。

现在我们尝试执行以下命令安装 express 模块的声明文件：

$ npm install [@types](/user/types)/express --save
没有意外，果然能成功安装。现在再通过 ts-node 来执行的时候，发现已经没有报错了。

如果我们使用的第三方模块在 DefinitelyTyped 找不到对应声明文件，也可以尝试使用require()这个终极的解决方法，它会将模块解析成 any 类型，不好的地方就是没有静态类型检查了。比如：

const express = require('express');

const app = express();
app.get('/', function (req, res) {
  res.end('hello, world');
})

app.listen(3000, function () {
  console.log('server is listening');
});
编写 typings 声明文件
编写 .d.ts 文件还是比较繁琐的，比如要完整地给 express 编写声明文件，首先得了解这个模块都有哪些接口，而且 JavaScript 模块普遍接口比较 灵活，同一个方法名可能接受各种各样的参数组合。所以，大多数情况下我们只会定义我们需要用到的接口，下文以 express 模块为例。

为了验证我们编写的声明文件是否有效，首先执行以下命令将之前安装的声明文件全部删除：

$ rm -rf node_modules/[@types](/user/types)
然后新建文件typings/express.d.ts（TypeScript 默认会自动从 typings 目录加载这些 .d.ts 文件）：

declare module 'express' {

  /** 定义 express() 函数 */
  function express(): express.Application;

  namespace express {

    /** 定义 Application 接口 */
    interface Application {
      /** get 方法 */
      get(path: string, handler: (req: Request, res: Response) => void): void;
      /** listen 方法 */
      listen(port: number, callback: () => void): void;
    }

    /** 定义 Response 接口 */
    interface Request { }

    /** 定义 Response 接口 */
    interface Response {
      end(data: string): void;
    }

  }

  export = express;
}
说明：

第一行的 declare module 'express' 表示定义 express 这个模块，这样在 TypeScript 中就可以直接 import 'express' 引用
最后一行export = express，并且上面分别定义了一个 function express() 和 namespace express，这种写法是比较特殊的，我一时也没法解释清楚，反正多参照DefinitelyTyped 上其他模块的写法即可。这个问题归根结底是 express 模块通过 import * as express from 'express' 引入的时候，express本身又是一个函数，这种写法在早期的 Node.js 版本的程序和 NPM 模块中是比较流行的，但是在使用 ES6 module 语法后，就显得非常别扭
TSLint 代码规范检查
在编写 JavaScript 代码时，我们可以通过 ESLint 来进行代码规范检查，编写 TypeScript 代码时也可以使用 TSLint，两者在配置上也有些相似。对于初学者来说，使用 TSLint 可以知道哪些程序的写法是不被推荐的，从而养成更好的 TypeScript 代码风格。

首先我们执行以下命令安装 TSLint：

$ npm install tslint -g
然后在项目根目录下新建 TSLint 配置文件 tslint.json：

{
  "extends": [
    "tslint:recommended"
  ]
}
这个配置文件指定了使用推荐的 TSLint 配置（tslint:recommended）。然后执行以下命令检查：

$ tslint src/**/*.ts
可以看到以下报错信息：

ERROR: src/server.ts[10, 3]: Calls to 'console.log' are not allowed.
ERROR: src/server.ts[5, 14]: non-arrow functions are forbidden
ERROR: src/server.ts[9, 18]: non-arrow functions are forbidden
ERROR: src/server.ts[1, 26]: ' should be "
ERROR: src/server.ts[5, 9]: ' should be "
ERROR: src/server.ts[6, 11]: ' should be "
ERROR: src/server.ts[10, 15]: ' should be "
ERROR: src/server.ts[5, 22]: Spaces before function parens are disallowed
ERROR: src/server.ts[9, 26]: Spaces before function parens are disallowed
从以上信息可以看出，我们短短几行代码违反了 TSLint 推荐的代码规这些规则：

不允许使用 console.log
始终使用箭头函数
字符串使用双引号
函数定义圆括号前无空格
当然这些风格我无法接受，可以通过修改配置文件 tslint.json 来关闭它：

{
  "extends": [
    "tslint:recommended"
  ],
  "rules": {
    "no-console": [
      false
    ],
    "only-arrow-functions": [
      false
    ]
  }
}
以上配置允许使用 console.log 和 function，而字符串使用双引号和圆括号前的空格这两条可以使用 tslint 命令来格式化。执行以下命令检查，并允许 ESLint 尝试自动格式化：

$ tslint --fix src/**/*.ts
此时将会输出 Fixed 6 error(s) in src/server.ts，而src/server.ts文件也将会被格式化成这样：

import * as express from "express";

const app = express();

app.get("/", function(req, res) {
  res.end("hello, world");
});

app.listen(3000, function() {
  console.log("server is listening");
});
由于 TSLint 的规则条目比较多，就不在此赘述，详细信息可以看 TSLint 的文档：https://palantir.github.io/tslint/

发布模块
相比直接使用 JavaScript 编写的 npm 模块，使用 TypeScript 编写的模块需要增加以下几个额外的工作：

发布前将 TypeScript 源码编译成 JavaScript
需要修改 tsconfig.json 的配置，使得编译时生成模块对应的 .d.ts 文件
在 package.json 文件增加 types 属性
我们以输出一个相加两个数值的add()函数作为例子，首先新建文件 src/math.ts：

/**
 * 相加两个数值
 *
 * @param a
 * @param b
 */
export function add(a: number, b: number): number {
  return a + b;
}
然后修改tsconfig.json文件，增加declaration选项：

{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es6",
    "rootDir": "src",
    "outDir": "dist",
    "sourceMap": true,
    "declaration": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true
  }
}
再修改 package.json 文件，在 scripts 中增加 compile 和 prepublish 脚本，以及将 typings 指向对应的 .d.ts 文件：

{
  "main": "dist/math.js",
  "typings": "dist/math.d.ts",
  "scripts": {
    "compile": "rm -rf dist && tsc",
    "prepublish": "npm run compile"
  }
}
如果执行 npm publish 发布模块，它会先执行 npm run compile 来编译 TypeScript 源码，由于我们不能随便上传一些无用的模块到 npm 上，这里就不做实验了，可以手动执行 npm run compile 来编译。编译后，可以看到 dist 目录生成了三个文件：

dist/math.js 为编译后的 JavaScript 文件：

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 相加两个数值
 *
 * @param a
 * @param b
 */
function add(a, b) {
    return a + b;
}
exports.add = add;
//# sourceMappingURL=math.js.map
dist/math.d.ts 为对应的声明文件：

/**
 * 相加两个数值
 *
 * @param a
 * @param b
 */
export declare function add(a: number, b: number): number;
dist/math.js.map 为对应的 SouceMap 文件。

单元测试
要执行使用 TypeScript 编写的单元测试程序，可以有两种方法：

先通过 tsc 编译成 JavaScript 代码后，再执行
直接执行 .ts 源文件
我更倾向于直接执行 .ts 源文件，下文将以 mocha 为例演示。

首先执行以下命令安装所需要的模块：

$ npm install mocha [@types](/user/types)/mocha chai [@types](/user/types)/chai ts-node --save-dev
然后新建单元测试文件 src/test.ts：

import { expect } from 'chai';
import { add } from './math';

describe('测试 math', function () {

  it('add()', function () {
    expect(add(1, 2)).to.equal(3);
  });

});
修改文件 package.json 在 scripts 中增加 test 脚本：

{
  "scripts": {
    "test": "mocha --compilers ts:ts-node/register src/test.ts"
  }
}
说明：通过 mocha 命令的 –compilers 选项指定了 .ts 后缀的文件使用 ts-node 的钩子函数来预编译。

然后执行以下命令测试：

$ npm test
如无意外，可以看到以下结果：

  测试 math
    ✓ add()

  1 passing (8ms)
从 JavaScript 项目渐进式迁移
如果要将一个已有的 JavaScript 项目迁移到 TypeScript 之上，往往会遇到以下几个问题：

项目代码太多，无法短时间内将源码从 JavaScript 改写为 TypeScript，两者需要共存一段时间
依赖的第三方库没有 .d.ts 文件
原 JavaScript 代码使用了很多的动态特性，无法简单转换代码
针对以上第一个问题，tsconfig.json 文件中有一个 allowJs 选项，将其设置为 true 后即可支持在 TypeScript 代码中直接 import JavaScript 代码，并且具有一定的静态检查能力。以下是一个简单的例子：

首先新建配置文件 tsconfig.json：

{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es6",
    "rootDir": "src",
    "outDir": "dist",
    "sourceMap": true,
    "allowJs": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true
  }
}
然后新建 TypeScript 文件 src/main.ts：

import * as utils from './utils';

console.log(utils.add(1, 2));
新建 JavaScript 文件 src/utils.js：

exports.add = function (a, b) {
  return a + b;
};
执行 tsc 命令即可看到 dist 目录生成了对应的 dist/utils.js 和 dist/main.js 文件。如果去掉 allowJs 选项，则编译时会报错：

src/main.ts(1,24): error TS6143: Module './utils' was resolved to '/tmp/src/utils.js', but '--allowJs' is not set.
在实际项目中，我们可以先从一个 JavaScript 文件入手，将其后缀改为 .ts，然后再逐步更改项目下所有文件。

针对缺少 .d.ts 文件的问题，可以参照上文 编写 typings 声明文件 一节，自行编写必要的 .d.ts 文件。

而对于以上第三个问题，可以将变量类型声明为 any，这实际上是*“取消”了针对该变量的静态检查*，可以像 JavaScript 一样随意赋值。

当然，从 JavaScript 迁移到 TypeScript 还有很多细节，具体可以参考这篇文章：《从 JavaScript 迁移到 TypeScript》

在 Webpack 中使用
Webpack 是当前最流行的前端构建工具之一，要在 Webpack 中使用 TypeScript 可以通过 ts-loader 模块来实现。

首先全局安装 webpack 命令：

$ npm install webpack -g
然后执行以下命令安装 ts-loader 和 typescript 模块：

$ npm install ts-loader typescript --save-dev
新建 Webpack 配置文件 webpack.config.js：

module.exports = {
  entry: './app.ts',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ],
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      }
    ],
  },
};
然后新建 TypeScript 配置文件 tsconfig.json：

{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es6",
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true
  }
}
现在我们来新建 TypeScript 入口程序文件 app.ts：

function add(a: number, b: number): number {
  return a + b;
}

const v = [ 1, 2, 3, 4, 5, 6].reduce(add);
console.log(v);
即可执行 webpack 命令编译代码，其结果如下：

$ webpack

ts-loader: Using typescript@2.3.4 and /tmp/tsconfig.json
Hash: af9d997c471a89158065
Version: webpack 3.0.0
Time: 868ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.57 kB       0  [emitted]  main
   [0] ./app.ts 99 bytes {0} [built]
此时可见到生成了目标文件 bundle.js。

关于 ts-loader 的详细使用方法可参考： https://www.npmjs.com/package/ts-loader

通过开源项目进一步学习
通过学习相关大型开源项目的代码，可以学习到别人是怎么使用 TypeScript 的。以下是当前比较火热的 TypeScript 开源项目：

TypeScript 编译器，其本身也是通过 TypeScript 编写的
Visual Studio Code ，微软开源的跨平台代码编辑器
AngularJS 2，谷歌开源的用于构建跨平台 Web 应用的开发框架
TSLint，一款 TypeScript 代码规范检查工具
Ant Design，一套企业级的 UI 设计语言和 React 实现
RxJS 5，JavaScript 响应式编程库
相关链接
TypeScript Handbook （中文版）
TypeScript 进阶玩法
TypeScript Document
TypeScript 新特性一览
DefinitelyTyped
TSLint
从 JavaScript 迁移到 TypeScript