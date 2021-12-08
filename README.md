# like
点赞动画

## like 使用方法

首先引入插件 `like.js` 和 `like.css`

```javascript
<script src="like.js"></script>
<script>
  var like = new Like({
    element: document.querySelector('.like'),
    value: value,
    click: true,
    callback: function(val) {
      console.log(val)
    }
  })
</script>
```
## like 参数说明

| 参数  | 值    | 说明       |
| :---: | :---: | :--------- |
| element     | `dom 对象`（必须）  | 点赞的dom区块 |
| value     |  0（必须）  | 点赞时的数字 |
| click     |  false  | 默认是否可以点击 |
| callback     |  `func`  | 如果设置click就会返回数字 |

## like 内置 API 

#### like.updateValue(val)

`val` 是一个数字类型，可以手动配置点赞初始化的数量。

#### `like.addNum(val)`

`val` 是一个数字类型，可以手动配置点赞 +1。

#### `like.reduceNum(val)`

`val` 是一个数字类型，可以手动配置点赞 -1。
