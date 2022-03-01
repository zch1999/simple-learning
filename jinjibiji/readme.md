#

## HTML

**文档对象模型（DOM）是 HTML 和 XML 文档的编程接**
**如果说浏览器用 HTML 来描述网页的结构并渲染，那么使用 DOM 则可以获取网页的结构并进行操作**

### 事件委托

主要用于代理子 dom 的监听事件，节省开销<br/>

需要注意的是在**document.body** 添加事件委托，每次触发事件时，会产生生等待，产生等待是因为合成器线程于主线程进行通信。passive 设置为 true 时，表示 listener 永远不会调用 preventDefault。根据规范，passive 选项的默认值始终为 false，这引入了处理某些触摸事件（以及其他）的事件监听器在尝试处理滚动时阻止浏览器的主线程的可能性，从而导致滚动处理期间性能可能大大降低。<br/>
为防止出现此问题，某些浏览器（特别是 Chrome 和 Firefox）已将文档级节点 Window，Document 和 Document.body 的 touchstart (en-US)和 touchmove (en-US)事件的 passive 选项的默认值更改为 true。这可以防止调用事件监听器，因此在用户滚动时无法阻止页面呈现。

## CSS

### z-index

- 当同级元素不设置 z-index 或者 z-index 相等时，后面的元素会叠在前面的元素上方；
- 当同级元素 z-index 不同时，z-index 大的元素会叠在 z-index 小的元素上方。

z-index 受父级元素 z-index 的影响

### Grid 布局

它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。

- 采用 Grid 布局的盒子称为**容器**，容器内部采用网格定位的子元素，称为**项目(item)**
- 容器里面的水平区域称为**行(row)**，垂直区域称为**列(column)**
-
