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
                getDom(options.timeDayTen).textContent = day;
            } else {
                getDom(options.timeDayTen).textContent = FillInNum(day).ten;
                getDom(options.timeDayOne).textContent = FillInNum(day).one;
            }
            // 时
            hour = Math.floor(leftTime / 1000 / 60 / 60 % 24);
            if (options.isTenSeparate) {
                getDom(options.timeHourTen).textContent =hour;
            } else {
                getDom(options.timeHourTen).textContent = FillInNum(hour).ten;
                getDom(options.timeHourOne).textContent = FillInNum(hour).one;
            }
            // 分
            min = Math.floor(leftTime / 1000 / 60 % 60);
            if (options.isTenSeparate) {
                getDom(options.timeMinuteTen).textContent = min;
            } else {
                getDom(options.timeMinuteTen).textContent = FillInNum(min).ten;
                getDom(options.timeMinuteOne).textContent = FillInNum(min).one;
            }
            // 秒
            second = Math.floor(leftTime / 1000 % 60);
            if (options.isTenSeparate) {
                getDom(options.timeSecondTen).textContent = second;
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