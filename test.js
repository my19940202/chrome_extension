// 这次处理的百度广告位比较简单，都是pos.baidu.com下面的iframe，筛选起来比较方便
var htmlArr = [];
var htmlStr = '';
var maskAds = function() {
    var count = 0
    var lst = document.getElementsByTagName("iframe")
    var ids = ""
    // 给所有广告位iframe 加上遮罩层
    for (var i=0; i<lst.length;i++) {
        if ('src' in lst[i] && 'height' in lst[i] && 'width' in lst[i]) {
            var src = lst[i].src
            if (src.indexOf("pos.baidu.com") > 0 && lst[i].width > 0 && lst[i].height > 0) {
                ids = ids + "\n" + lst[i].id;
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
};
// 延迟2秒，等站点的广告全部加载完全，这样获取元素的offsetLeft，offsetTop也许会准确一点（暂时没有验证）
setTimeout(maskAds, 2000);