# jquery.event.pan
panstart、panmove、panend 三个事件。支持鼠标，手指触摸，触摸笔响应

[Demo](https://aiv367.github.io/jquery.events/demo/pan.html)

## 引入

```html
<script src="jquery.js"></script>
<script src="jquery.event.pan.js"></script>
```
## 使用
```javascript
$('#box').on('panstart', evt => console.log(evt));
$('#box').on('panmove', evt => console.log(evt));
$('#box').on('panend', evt => console.log(evt));
```
## 数据
evt.eventData 包含相关操作数据

```javascript
//panstart evt 操作数据情况
{
	...
	eventData:{
		//panstart的数据
		start:{
			clientX: 621
			clientY: 174
			offsetX: 196
			offsetY: 89.125
			pageX: 621
			pageY: 174
			screenX: 956
			screenY: 350
			targetOffsetX: 8
			targetOffsetY: 64.875
			targetPageX: 425
			targetPageY: 84.875
			whichName: "touch"
		}
	}
	...
}

```

```javascript
//panmove evt 操作数据情况
{
	...
	eventData:{
		//panstart的数据
		start:{
			clientX: 621,
			clientY: 174,
			offsetX: 196,
			offsetY: 89.125,
			pageX: 621,
			pageY: 174,
			screenX: 956,
			screenY: 350,
			targetOffsetX: 8,
			targetOffsetY: 64.875,
			targetPageX: 425,
			targetPageY: 84.875,
			whichName: "touch",
		},
		move:{
			clientX: 565,
			clientY: 165,
			moveX: 1, //和起始坐标的偏移量
			moveY: 6,
			offsetX: 140,
			offsetY: 80.125,
			pageX: 565,
			pageY: 165,
			screenX: 900,
			screenY: 341,
			targetOffsetX: 8,
			targetOffsetY: 64.87,5
			targetPageX: 425,
			targetPageY: 84.875,
			whichName: "touch",
		}
	}
	...
}

```

```javascript
//panend evt 操作数据情况
{
	...
	eventData:{
		//panstart的数据
		start:{
			clientX: 621,
			clientY: 174,
			offsetX: 196,
			offsetY: 89.125,
			pageX: 621,
			pageY: 174,
			screenX: 956,
			screenY: 350,
			targetOffsetX: 8,
			targetOffsetY: 64.875,
			targetPageX: 425,
			targetPageY: 84.875,
			whichName: "touch",
		},
		end:{
			clientX: 571,
			clientY: 201,
			moveX: 7,
			moveY: 42,
			offsetX: 146,
			offsetY: 116.125,
			pageX: 571,
			pageY: 201,
			screenX: 906,
			screenY: 377,
			targetOffsetX: 8,
			targetOffsetY: 64.875,
			targetPageX: 425,
			targetPageY: 84.875,
			whichName: "touch",
		}
	}
	...
}

```