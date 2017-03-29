# JS类库模版

### Page ###
Page() 函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
<table cellspacing="0" cellpadding="0" width="100%">
	<tr>
		<th>属性</th>
		<th>类型</th>
		<th>描述</th>
	</tr>
	<tr>
		<td>onLoad</td>
		<td>Function</td>
		<td>生命周期函数--监听页面加载</td>
	</tr>
	<tr>
		<td>onReady</td>
		<td>Function</td>
		<td>生命周期函数--监听页面初次渲染完成</td>
	</tr>
	<tr>
		<td>onReachBottom</td>
		<td>Function</td>
		<td>页面上拉触底事件的处理函数</td>
	</tr>
	<tr>
		<td>onResize</td>
		<td>Function</td>
		<td>页面相关事件处理函数--监听窗口变化</td>
	</tr>
	<tr>
		<td>其他</td>
		<td>Any</td>
		<td>开发者可以添加任意的函数或数据到 object 参数中，在页面的函数中用 this 可以访问</td>
	</tr>
</table>

##### 示例代码： #####

    <!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>Document</title>
	</head>
	<body>
	    <button onclick="page.test('行间调用')"></button>
	</body>
	</html>

    var page = Page({
            onLoad: function () {
                this.test('触发onLoad');
            },
            onReady:function(){
                alert('触发onReady')
            },
            onReachBottom: function () {
                alert('到底了')
            },
            onResize:function(){
                alert('窗口变化了！')
            },
            test: function (p) {
                alert(p)
            }
        })

