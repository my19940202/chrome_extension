var htmlArr = [];
var htmlStr = '';
var maskAds = function() {
	var count = 0
	var lst = document.getElementsByTagName("iframe")
	var ids = ""
	for (var i=0; i<lst.length;i++) {
		if ('src' in lst[i] && 'height' in lst[i] && 'width' in lst[i]) {
			var src = lst[i].src
			if (src.indexOf("pos.baidu.com") > 0 && lst[i].width > 0 && lst[i].height > 0) {
				ids = ids + "\n" + lst[i].id;
				// lst[i].style.cssText = 'border: 1px solid red;';
				var tmp = {
					left: lst[i].offsetLeft,
					top: lst[i].offsetTop,
					height: lst[i].offsetHeight,
					width: lst[i].offsetWidth
				};
				// 获取tu
				var tmpsrc = decodeURIComponent(lst[i].src);
				if (tmpsrc.indexOf('&di') > -1 && tmpsrc.indexOf('&dri') > -1) {
					var tu = tmpsrc.split('&di=')[1].split('&dri')[0];
				}
				var prefixStyle = 'z-index:999;text-align:center;color:#FFF;position:absolute;background:rgba(0,0,0,0.5);font-size:12px;width:100%;line-height:' 
				+ tmp['height'] + 'px;height:' 
				+ tmp['height'] +'px;width:' 
				+ tmp['width'] + 'px;';
				var style = 'width:' + tmp['width'] + 'px;'
							+ 'height:' + tmp['height'] + 'px;'
							+ 'left:' + tmp['left'] + 'px;'
							+ 'top:' + tmp['top'] + 'px;';
				var innerText = style.replace(/px;/g, ',') + 'tu=' + tu;
				var adsinfoDiv = document.createElement('div');
				adsinfoDiv.style.cssText = prefixStyle;
				adsinfoDiv.innerHTML = innerText;
				var parentNode = lst[i].parentElement;
				parentNode.insertBefore(adsinfoDiv,lst[i]);

			}
		}
	};
	var body = document.body;
	var div = document.createElement('div');
	div.style.cssText = 'height: 100%;width: 100%;top:0;left:0;';
	// div.innerHTML = htmlArr.join('\n');
	// 感觉这样直接 innerHTML 拼接效率不高
	// body.innerHTML = body.innerHTML + htmlArr.join('\n');
};

setTimeout(maskAds, 1000);