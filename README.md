##### 简介

> 由于平时工作中，大量的时间用来找实现需求的插件，但是找到的插件大都跟需求不一一对应，改起来不如自己写一个，所以就建了这么一个仓库


#### 插件列表 
 - [emoji集成](https://github.com/star-Ming/common-JS/tree/master/emojs.js)

  <img src="https://github.com/CasualMing/common-JS/blob/master/emojs.js/emojiGif.gif" />

 - <a href="https://github.com/star-Ming/common-JS/tree/master/3D%E8%BD%AE%E6%92%AD%E5%9B%BE" target="_blank">3D左右轮播图</a>
 
  <img src="./3D轮播图/images/demo.png"/>

 - <a href="https://github.com/CasualMing/common-JS/blob/master/%E6%90%9C%E7%B4%A2%E6%B5%8B%E8%AF%95/js/index.js" target="_blank">搜索测试核心代码</a>

> 这个是采用最愚蠢的办法，筛选元素，然后将匹配的元素克隆显示，其他的元素隐藏

 - <a href="https://github.com/CasualMing/common-JS/tree/master/%E7%AE%80%E5%8D%95%E5%88%86%E9%A1%B5" target="_blank">ES6简单分页</a>

<img src="./简单分页/img/pagination.gif"/>


 - **回到顶部（带动画）**
 
 ```javascript
	// 回到顶部
	function backTop() {
		let timer = null;
		cancelAnimationFrame(timer);
		timer = requestAnimationFrame(function fn() {
	let oTop = document.body.scrollTop || document.documentElement.scrollTop;
		if (oTop > 0) {
			document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
			timer = requestAnimationFrame(fn);
		} else {
			cancelAnimationFrame(timer);
		  }
	   });
	};

 ```

 - **判断滚动**
 
	```javascript
	   // 判断滚动
        window.onscroll = function() {
            let top = document.body.scrollTop || document.documentElement.scrollTop
            if (top >= distanceTopHeight) {
                $(".navigate")[0].style.cssText = "position:fixed;left:50%;transform: translateX(-50%);top:0px";
            } else {
                $(".navigate")[0].style.cssText = "position:relative";
            }
        };
	```

 - **滚动到指定位置**

 ```javascript
    // 滚动到指定位置  number:距离顶部的位置。time:滚动的时间
      const ScrollTop = (number = 0, time) => {
            if (!time) {
                document.body.scrollTop = document.documentElement.scrollTop = number;
                return number;
            }
            const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
            let spacingInex = time / spacingTime; // 计算循环的次数
            let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
            let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
            let scrollTimer = setInterval(() => {
                if (spacingInex > 0) {
                    spacingInex--;
                    ScrollTop(nowTop += everTop);
                } else {
                    clearInterval(scrollTimer); // 清除计时器
                }
            }, spacingTime);
     };
 ```

 - **图片压缩**

  ```javascript
	compress(file) {
         let quality = 0.1 // 默认图片质量为0.7
         let files = file.name
         return new Promise((resolve, rej) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
               var res = this.result;
               var img = new Image();
               img.src = res;
               img.onload = function(e) {
                  var that = this;
                  //生成canvas
                  var canvas = document.createElement('canvas');
                  var ctx = canvas.getContext('2d');
                  var w = that.width;
                  var h = that.height
                  // 创建属性节点
                  var anw = document.createAttribute("width");
                  anw.nodeValue = w;
                  var anh = document.createAttribute("height");
                  anh.nodeValue = h;
                  canvas.setAttributeNode(anw);
                  canvas.setAttributeNode(anh);
                  ctx.drawImage(that, 0, 0, w, h);
                  // 图像质量
                  // quality值越小，所绘制出的图像越模糊
                  var base64 = canvas.toDataURL('image/jpeg', quality);
                  // 将以base64的图片url数据转换为文件
                  var arr = base64.split(','),
                  mime = arr[0].match(/:(.*?);/)[1],
                  bstr = atob(arr[1]),
                  n = bstr.length,
                  u8arr = new Uint8Array(n);
                  while (n--) {
                     u8arr[n] = bstr.charCodeAt(n);
                  }
                  var file = new File([u8arr], files, {
                       type: mime
                  });
                  resolve(file);
               }
            }
        })
    },
  ```
  
  
  - <a href="./你不知道的 JavaScript（上卷）.pdf"  target="_blank">**你不知道的 JavaScript（上卷）**</a>
  - <a href="./你不知道的 JavaScript（中卷）.pdf"  target="_blank">**你不知道的 JavaScript（中卷）**</a>
  - <a href="./你不知道的 JavaScript（下卷）.pdf"  target="_blank">**你不知道的 JavaScript（下卷）**</a>
