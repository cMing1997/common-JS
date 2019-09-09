##### 简介

> 由于平时工作中，大量的时间用来找实现需求的插件，但是找到的插件大都跟需求不一一对应，改起来不如自己写一个，所以就建了这么一个仓库


#### 插件列表 
 - [emoji集成](https://github.com/star-Ming/common-JS/tree/master/emojs.js)

  <img src="https://github.com/CasualMing/common-JS/blob/master/emojs.js/emojiGif.gif" />

 - [3D左右轮播图](https://github.com/CasualMing/common-JS/blob/master/3D轮播图) 

  <img src="./3D轮播图/images/demo.png"/>

 - [搜索测试核心代](https://github.com/CasualMing/common-JS/blob/master/搜索测试/js/index.js)

> 这个是采用最愚蠢的办法，筛选元素，然后将匹配的元素克隆显示，其他的元素隐藏

 - <a href="https://github.com/CasualMing/common-JS/tree/master/%E7%AE%80%E5%8D%95%E5%88%86%E9%A1%B5" target="_blank">ES6简单分页</a>

<img src="./简单分页/img/pagination.gif"/>

- **用于光标处插入**
```javascript
    let lastEditRange;// 最后的光标对象
    // 编辑框按键弹起事件
    editEle.onkeyup = function () {
        // 获取选定对象
        var selection = getSelection();
        // 设置最后光标对象
        lastEditRange = selection.getRangeAt(0);
    };
    editEle.onkeydown=function(e){
        console.log(e)
    }
    // 监听编辑框点击事件
    editEle.onclick = function (e) {
        // ......
    }
    // 元素插入
    function _insertimg(str) {
        var selection = window.getSelection ? window.getSelection() : document.selection;
        document.querySelector(".data-input").focus();
        if (lastEditRange) {
            // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
            selection.removeAllRanges()
            selection.addRange(lastEditRange)
        }
        var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        if (!window.getSelection) {
            var selection = window.getSelection ? window.getSelection() : document.selection;
            var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
            range.pasteHTML(str);
            range.collapse(false);
            range.select();
        } else {
            var hasR = range.createContextualFragment(str);
            var hasR_lastChild = hasR.lastChild;
            while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild
                .previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
                var e = hasR_lastChild;
                hasR_lastChild = hasR_lastChild.previousSibling;
                hasR.removeChild(e)
            }
            range.insertNode(hasR);
            if (hasR_lastChild) {
                range.setEndAfter(hasR_lastChild);
                range.setStartAfter(hasR_lastChild);
            }
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range)
        }
        // 无论如何都要记录最后光标对象
        lastEditRange = selection.getRangeAt(0)
    }
```


- **无限滚动**

```html
 <!--dom结构 -->
    <div class="out-box">
        <div class="reservedHeight">
            <div class="original">
                <!-- .... 这里放原始数据 -->
            </div>
            <div class="clone"></div>
        </div>
    </div>
```
> JS代码如下

 ```javascript
         //	speed 可自行设置文字滚动的速度
        function textScroll(speed = 80) {
            var wrapper = document.querySelector(".reservedHeight");
            var demo1 = document.querySelector(".original");
            var demo2 = document.querySelector(".clone");
            demo2.innerHTML = demo1.innerHTML //克隆demo1为demo2  
            function Marquee() {
                if (demo2.offsetHeight - wrapper.scrollTop <= 0) //当滚动至demo1与demo2交界时  
                    wrapper.scrollTop -= demo1.offsetHeight //demo跳到最顶端  
                else {
                    wrapper.scrollTop++ //如果是横向的 将 所有的 height top 改成 width left  
                }
            }
            var MyMar = setInterval(Marquee, speed) //设置定时器  
            wrapper.onmouseover = function () {
                clearInterval(MyMar)
            } //鼠标移上时清除定时器达到滚动停止的目的  
            wrapper.onmouseout = function () {
                MyMar = setInterval(Marquee, speed)
            } //鼠标移开时重设定时器 
        };
 ```


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
  [图片压缩](https://github.com/CasualMing/common-JS/blob/master/img_squash/)


 -  **倒计时以及相关的函数**

  [倒计时相关集成](https://github.com/CasualMing/common-JS/blob/master/time_go/)
  
  - <a href="./你不知道的 JavaScript（上卷）.pdf"  target="_blank">**你不知道的 JavaScript（上卷）**</a>
  - <a href="./你不知道的 JavaScript（中卷）.pdf"  target="_blank">**你不知道的 JavaScript（中卷）**</a>
  - <a href="./你不知道的 JavaScript（下卷）.pdf"  target="_blank">**你不知道的 JavaScript（下卷）**</a>
