# Simple mock server

这是一个简单的支持 `restful` 风格的 `mock` 服务项目。

在互联网上，有很多很多 `mock` 的项目，那么我为什么要造这个轮子呢？很简单，我怕麻烦。因此，我在 2018 年搞了这个项目。当时这个项目就可以完整的支持我的业务需求了。

但是到了 2020 年，我回头来看这个项目，发现我当时写的代码水平有限，功能上虽然满足了当时的需求，但是想要更强大一些的功能却并不支持。

因此，我今年就抽时间，把这个项目好好的规划了一下，重新发布了 `2.0.0` 版本。那么现在看来，已经超额的满足了我当前的需求了。

-----

光阴荏苒，又 5 年过去了。回顾我五年前开发的这个项目，到今天依然算是可用性非常高的一个项目，真的是非常难得。

但是，五年前，全部都是用的 js 语法编写的这个项目。所以，今天，我特地把它升级到了 ts 语法，并且兼容最新的 node v22 版本。

所以，今天我再发布它的 `3.0.0` 版本。

使用方式和之前的版本几乎没有差别，只是语法更新了，采用了我们前端更熟悉的 `import` 语法。

-----

其实，这是一个很纠结的事情。为什么要造轮子？因为怕麻烦。为什么要把这个项目搞复杂？因为太简单。那么怎么在简单和麻烦之前保持一个平衡，这 TM 是个哲学问题！

这里，我需要说明一下，我认为的**麻烦**，是指额外的学习成本。比如其他功能强大的 `mock` 项目，使用它，就得先学习它的很多规则。可是，`mock` 服务对于我们前端开发人员而言，只是一个过渡工具而已。当后端提供好真实的接口后，这玩意儿就随风而去了。所以，为了满足这么个小小的需求，增加学习成本，我是真的不愿意。

而我开发这个项目的初衷就是，把模拟数据复制进去，然后就好了！只要看一下简单的说明就会用了，不需要增加任何额外的学习成本。

因此，我的 `2.0.0` 的版本，依旧支持这种最简单的方式。除此之外，为了满足更高级的一些需求，增加了一些功能，而这些功能都是纯粹的 `javascript`，不需要学习额外的语法。你是前端，你就不用学习，能够顺利的使用这些高级功能。

甚至，说得夸张一点，如果你有时间，你完全可以用这个项目来构建一个真实的后端服务。当然，这在我看来是吃饱了撑的……

-----

To 前端学习者：

如果你是在自学前端，或者自学 `Nodejs`， 希望成为一个全栈工程师，那么，在你的初学阶段，研究我这个项目的源码，也一定是可以收获匪浅的。

如果你已经超过了这个阶段，那么 https://github.com/fengcms/restful-cms-koa 这个项目一定很适合你，这是一个完整的基于 `nodejs` 的后端 `WEB` 框架。目前，这个项目我没有写文档，我会抽时间完善文档的。

欢迎大家关注收藏我的博客 https://blog.csdn.net/fungleo ，博客上有不少干货，相信对于前端学习者来说，还是有价值的。

## 安装

```#
git clone https://github.com/fengcms/simple-mock

cd simple-mock

pnpm install

pnpm start
```

## 简单配置

项目的配置文件在 `config/index.ts` 文件中，每一个配置我都写了详细的注释。

![](https://gitee.com/fungleo/my-article-image/raw/master/image/8c/8bc8c38cbbaecded2058bbe87528b2.jpg)

如上图所示，简单实用，只需要配置 `prefix` `port` `host` 和 `delay` 这四个参数即可。

更多的配置以及功能，请查看 `doc` 目录中的说明文档。

## 简单使用

所有的 `mock` 接口文件，全部放在 `/api` 目录里面。比如，你有一个叫 `book` 的接口，那么，你就再 `/api` 目录下面新建一个文件叫 `book.js`，然后，录入基本结构如下：

```js
export default {
  name: '书本',
  info: '这是一个完整的 RESTFul 接口的演示文件',
  // GET POST /book 接口 的 Mock 数据
  list: {
    get: {},
    post: {}
  },
  // GET PUT DETETE /book/:id 接口 的 Mock 数据
  item: {
    get: {},
    put: {},
    delete: {}
  }
}
```

这是一个完整的 `RESTFul` 模拟接口的基础文件结构。然后，你可以在分别对应的请求方法里面，把你需要的模拟数据复制进去即可。详细的演示代码，可以查看 [/api/book.ts](https://github.com/fengcms/simple-mock/blob/master/api/book.ts) 文件。

如果，你不需要使用某些请求方法，那么可以直接不写就可以了。

导出对象中的 `name` 和 `info` 字段也是可以不写得。写这两个字段是为了便于管理维护，以及 `mock` 服务信息页面上的接口介绍。如下图所示：

![](https://gitee.com/fungleo/my-article-image/raw/master/image/62/307c122634a701d28d1d15821ce795.jpg)

如果你的项目需要多人维护的话，我个人建议还是写上。

## 简单测试

大家可以通过 `postman` 工具来对 `mock` 服务提供的接口进行测试，也可以通过 `curl` 命令来进行调试。如果大家对命令行调试接口有兴趣，可以看我的两篇文章：

[《curl 模拟 GET\POST 请求，以及 curl post 上传文件》](https://blog.csdn.net/FungLeo/article/details/80703365)

[《linux 或 mac 命令行更优雅的使用 curl 命令，以及命令行常用的快捷键说明》](https://blog.csdn.net/FungLeo/article/details/105794798)


我这边的测试截图如下：

![](https://gitee.com/fungleo/my-article-image/raw/master/image/dd/f07efda81b88604dc25566f0703dd7.jpg)

![](https://gitee.com/fungleo/my-article-image/raw/master/image/a9/a06c8ae22bfa63c20a2c1db0813db2.jpg)

## 共同开发

我欢迎各位朋友来补充和完善我的这个项目，你可以 `fork` 我的项目，进行修改后，给我发起一个 `PR`，我会在审查代码后进行合并。

我比较希望各位能够发一些有意思的 `mock` 接口的演示，或者修复我没有发现的问题和 `BUG`，亦或者帮助我完善一些文档。

当然，如果你嫌麻烦，或者有好的建议，也可以直接发 `Issues`，我会回答，或者抽时间去完善你的好想法的哦！

## Copyright and License

Copyright by FungLeo(web@fengcms.com)

Blog: [http://www.fengleo.com](http://www.fengleo.com)

License: MIT
