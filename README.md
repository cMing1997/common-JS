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

 -  **倒计时以及相关的函数**

  ```javascript
    /** 
    * 基于原生的不依赖任何插件
    * author 程明锐
    * 创建于 2019/08/22
    * MIT Licensed
    */
    (function (name, definition) {
        var hasDefine = typeof define === 'function';
        var hasExports = typeof module !== 'undefined' && module.exports;

        if (hasDefine) {
            // AMD 模块 or CMD 模块规范
            define(definition);
        } else if (hasExports) {
            // node.js的模块规范
            module.exports = definition();
        } else {
            // 将其挂载到全局对象上
            this[name] = definition();
        }
    })('timeSet', function () {
        var timeSet = {};

        function getDom(dom) {
            if (typeof dom != "string") {
                return console.log("传入的dom类型有误")
            }
            return document.querySelector(dom)
        }
        // 将时间格式化
        function dateFormater(formater, t) {
            let date = t ? new Date(t) : new Date(),
                Y = date.getFullYear() + '',
                M = date.getMonth() + 1,
                D = date.getDate(),
                H = date.getHours(),
                m = date.getMinutes(),
                s = date.getSeconds();
            return formater.replace(/YYYY|yyyy/g, Y)
                .replace(/YY|yy/g, Y.substr(2, 2))
                .replace(/MM/g, (M < 10 ? '0' : '') + M)
                .replace(/DD/g, (D < 10 ? '0' : '') + D)
                .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
                .replace(/mm/g, (m < 10 ? '0' : '') + m)
                .replace(/ss/g, (s < 10 ? '0' : '') + s)
        }
        timeSet.dateFormater = dateFormater;
        // dateFormater('YYYY-MM-DD HH:mm', t) ==> 2019-06-26 18:30;
        function FillInNum(num) {
            if (typeof num != "number") {
                return;
            }
            if (num < 10) {
                return {
                    ten: 0,
                    one: num
                }
            } else {
                return {
                    ten: Math.floor((num % 100) / 10),
                    one: num % 10
                }
            }
        }
        /**
         * 计算时间区域内的分倒计时
        * @param {String} endTime 
        * @param  {Object} options
        * 
        */

        function timeIntervalCountdown({
            openTime,
            endTime,
            callbackEnd,
            callbackInterval,
            ...options
        }) {
            if (!openTime || !options) {
                return
            };
            openTime = dateFormater('YYYY/MM/DD HH:mm:ss', openTime);
            if (endTime) {
                endTime = dateFormater('YYYY/MM/DD HH:mm:ss', openTime);
            }
            // 倒计时
            // 获取当前时间
            let now = new Date().getTime();
            // 设置开始时间
            let open = new Date(openTime).getTime(); // this.curStartTime需要倒计时的日期
            // 设置结束时间
            let end = new Date(endTime).getTime();
            // 时间差
            let leftTime = open - now;
            let rightTime = end - now;
            let day = 0,
                hour = 0,
                min = 0,
                second = 0;
            if (leftTime >= 0) {
                // 天
                day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                if (options.isTenSeparate) {
                    getDom(options.timeDayTen).textContent = FillInNum(day).ten + FillInNum(day).one;
                } else {
                    getDom(options.timeDayTen).textContent = FillInNum(day).ten;
                    getDom(options.timeDayOne).textContent = FillInNum(day).one;
                }
                // 时
                hour = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                if (options.isTenSeparate) {
                    getDom(options.timeHourTen).textContent = FillInNum(day).ten + FillInNum(day).one;
                } else {
                    getDom(options.timeHourTen).textContent = FillInNum(hour).ten;
                    getDom(options.timeHourOne).textContent = FillInNum(hour).one;
                }
                // 分
                min = Math.floor(leftTime / 1000 / 60 % 60);
                if (options.isTenSeparate) {
                    getDom(options.timeMinuteTen).textContent = FillInNum(day).ten + FillInNum(day).one;
                } else {
                    getDom(options.timeMinuteTen).textContent = FillInNum(min).ten;
                    getDom(options.timeMinuteOne).textContent = FillInNum(min).one;
                }
                // 秒
                second = Math.floor(leftTime / 1000 % 60);
                if (options.isTenSeparate) {
                    getDom(options.timeSecondTen).textContent = FillInNum(day).ten + FillInNum(day).one;
                } else {
                    getDom(options.timeSecondTen).textContent = FillInNum(second).ten;
                    getDom(options.timeSecondOne).textContent = FillInNum(second).one;
                }
            } else if (endTime && rightTime >= 0 && leftTime < 0) {
                callbackInterval();
            } else {
                callbackEnd();
            }
            // 等于0的时候不调用
            if (Number(hour) === 0 && Number(day) === 0 && Number(min) === 0 && Number(second) === 0) {
                return;
            } else {
                // 递归每秒调用Countdown方法，显示动态时间效果,
                setTimeout(timeIntervalCountdown, 1000, {
                    openTime,
                    endTime,
                    callbackEnd,
                    callbackInterval,
                    ...options
                });
            }
        };
        timeSet.timeIntervalCountdown = timeIntervalCountdown;

        function judgeTime(timeDate) {
            switch (timeDate) {
                case timeDate < 3 * 60 * 1000: //小于三分钟
                    return "刚刚"
                    break;
                case timeDate > 3 * 60 * 1000 && timeDate <= 60 * 60 * 1000: //大于三分钟小于一个小时
                    return Math.floor(timeDate / 1000 / 60 % 60) + "分钟前"
                    break;
                case timeDate > 60 * 60 * 1000 && timeDate <= 24 * 60 * 60 * 1000: //大于一小时小于一天
                    return Math.floor(timeDate / 1000 / 60 / 60 % 24) + "小时前"
                    break;
                case timeDate > 24 * 60 * 60 * 1000 && timeDate <= 24 * 60 * 60 * 1000 * 7: //大于一天小于一周
                    return Math.floor(timeDate / 1000 / 60 / 60 / 24) + "天前"
                    break;
                case timeDate > 24 * 60 * 60 * 1000 * 7 && timeDate <= 24 * 60 * 60 * 1000 * 7 * 30.5: //大于一周小于一个月
                    return Math.floor(timeDate / 1000 / 60 / 60 / 24 % 7) + "周前"
                    break;
                case timeDate > 24 * 60 * 60 * 1000 * 7 * 30.5 && timeDate <= 24 * 60 * 60 * 1000 * 7 * 30.5 * 365.5: //大于一个月小于一年
                    return Math.floor(timeDate / 1000 / 60 / 60 / 24 / 7 % 365.5) + "月前"
                    break;
                case timeDate > 24 * 60 * 60 * 1000 * 7 * 30.5 * 365.5: //大于一年
                    return "很久之前"
                    break;
            }
        }
        /**
         * time String/Number 为指定的时间
        */
        function timeDepict(time) {
            if (!time) {
                return;
            };
            time = dateFormater('YYYY/MM/DD HH:mm:ss', time);
            // 当前时间
            var curTime = new Date();
            // 指定时间
            var postTime = new Date(time);
            // 获取时间差
            var timeDiff = curTime.getTime() - postTime.getTime();
            if (timeDiff > 0) {
                return judgeTime(timeDiff);
            }
        }
        timeSet.timeDepict = timeDepict;
        return timeSet;
    });
  ```
  
  
  - <a href="./你不知道的 JavaScript（上卷）.pdf"  target="_blank">**你不知道的 JavaScript（上卷）**</a>
  - <a href="./你不知道的 JavaScript（中卷）.pdf"  target="_blank">**你不知道的 JavaScript（中卷）**</a>
  - <a href="./你不知道的 JavaScript（下卷）.pdf"  target="_blank">**你不知道的 JavaScript（下卷）**</a>
