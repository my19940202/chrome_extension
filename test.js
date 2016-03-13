var htmlArr = [];
var htmlStr = '';
(function(){
	var count = 0
	var lst = document.getElementsByTagName("iframe")
	var ids = ""
	for (var i=0; i<lst.length;i++) {
		if ('src' in lst[i] && 'height' in lst[i] && 'width' in lst[i]) {
			var src = lst[i].src
			if (src.indexOf("pos.baidu.com") > 0 && lst[i].width > 0 && lst[i].height > 0) {
				ids = ids + "\n" + lst[i].id;
				lst[i].style.cssText = 'border: 1px solid red;';
				var tmp = {
					left: lst[i].offsetLeft,
					top: lst[i].offsetTop,
					height: lst[i].offsetHeight,
					width: lst[i].offsetWidth
				};
				var style0 = 'z-index:999;text-align:center;color:#FFF;position:absolute;background:rgba(0,0,0,0.5);font-size:12px;line-height:' + tmp['height'] + 'px;';
				var style = 'width:' + tmp['width'] + 'px;'
							+ 'height:' + tmp['height'] + 'px;'
							+ 'left:' + tmp['left'] + 'px;'
							+ 'top:' + tmp['top'] + 'px;';
				htmlStr = '<div style="' + style0 + style + '">' + style + '</div>';
				htmlArr.push(htmlStr);
			}
		}
	};
	var body = document.body;
	var div = document.createElement('div');
	div.style.cssText = 'height: 100%;width: 100%;top:0;left:0;';
	div.innerHTML = htmlArr.join('\n');
	// 感觉这样直接 innerHTML 拼接效率不高
	body.innerHTML = body.innerHTML + htmlArr.join('\n');
})();
