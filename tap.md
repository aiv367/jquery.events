# jquery.event.tap
tap、taphold两个事件。支持鼠标，手指触摸，触摸笔响应

[Demo](https://aiv367.github.io/jquery.events/demo/tap.html)

## 引入

```html
<script src="jquery.js"></script>
<script src="jquery.event.tap.js"></script>
```
## 使用
```javascript
$('#box').on('tap', evt => console.log(evt));
$('#box').on('taphole', evt => console.log(evt));
```

## 参数
```javascript
$.tap.tapHoldTime = 400; //设置taphold的延时时长
```