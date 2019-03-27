window.onload = function () {

    /**
     *  @param 参数说明
     * isAll(true/false):为true代表对整个盒子内所有的区域进行匹配，默认为false,
     * tabColumn:这个是加给tab栏切换的。加给最外层盒子
     * priceName:加上这个class,代表对价格进行匹配。只能加到具体的数字上
     * @param 价格匹配的时候
     * titleName:加上这个class,代表对商家标题进行匹配
     * merchantItem：这个是给所有要检索的区块class,元素必须是需要检索的部分，不能包含其他的区块;
     * pushDistrict:加上这个class，是告诉搜索匹配的元素放在那块区域
     * searchBox:这个是加给搜索框的
     * maxPriceSearch:加上这个class,代表对对可接受的最大价格进行匹配。只显示低于该价格的,加给输入框的
     * minPriceSearch:加上这个class,代表对可接受的最小价格进行匹配，只显示低于改价格的，加给输入框的
     * submitBox:这个是加给按钮的
     * listDom:匹配的区域
     * domlist:具体匹配的内容
     * valueText：input用户输入的内容，不区分大小写
     * arr：暂存数据
     */
    // 获取元素
    const getDom = function (dom) {
        if (typeof dom != "string") {
            return console.log("传入的dom类型有误")
        }
        return document.querySelector(dom)
    }
    const getAllDom = function (dom) {
        if (typeof dom != "string") {
            return console.log("传入的dom类型有误")
        }
        return document.querySelectorAll(dom)
    }
    const getClassDom = function (dom) {
        if (typeof dom != "string") {
            return console.log("传入的dom类型有误")
        }
        return document.getElementsByClassName(dom);
    }
    const removeAllError = function () {
        if (getAllDom(".result-text")) {
            for (let index = 0; index < getAllDom(".result-text").length; index++) {
                const element = getAllDom(".result-text")[index];
                element.parentNode.removeChild(element)
            }
        }
    };
    (function () {
        for (let index = 0; index < getAllDom(".tabchange").length; index++) {
            const element = getAllDom(".tabchange")[index];
            element.style.display = "none";
        }
        getAllDom(".tabchange")[0].style.display = "block";
    })();
    for (let index = 0; index < getAllDom(".tabColumn span").length; index++) {
        const element = getAllDom(".tabColumn span")[index];
        element.index = index;
        element.onclick = function () {
            for (let index = 0; index < getAllDom(".tabColumn span").length; index++) {
                const element = getAllDom(".tabColumn span")[index];
                element.style.cssText = "background-color: #eee;color:#000";
            }
            this.style.cssText = "background-color: #000;color:#fff"
            for (let index = 0; index < getAllDom(".tabchange").length; index++) {
                const element = getAllDom(".tabchange")[index];
                element.style.display = "none";
            }
            getAllDom(".tabchange")[this.index].style.display = "block";
        }
    }
    // 若查找无结果
    function noResult(listDom) {
        removeAllError();
        isTab()
        let p = document.createElement("p");
        p.classList.add("result-text");
        p.innerText = "暂无你要查找的内容";
        listDom[0].parentNode.insertBefore(p, listDom[0])
        for (let index = 0; index < listDom.length; index++) {
            const element = listDom[index];
            element.style.display = "none";
        }
    };
    // 循环对数据进行匹配
    function dataListMatch(listDom, domList, value, arr) {
        for (let index = 0; index < domList.length; index++) {
            const element = domList[index].innerText.toLowerCase();
            let lowText = value.toLowerCase()
            if (element.indexOf(lowText) != -1) {
                arr.push(listDom[index])
            }
        };
    };
    // 如果有tab栏，搜索之后影藏tab栏
    function isTab() {
        if (getAllDom(".tabColumn").length > 0) {
            for (let index = 0; index < getAllDom(".tabColumn").length; index++) {
                const element = getAllDom(".tabColumn")[index];
                element.style.display = "none";
            }
        }
    };
    // 清除克隆元素
    function clearClone() {
        let arr = getAllDom(".cloneItem")
        if (arr.length) {
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                element.remove();
            }
        };
    }
    //  对应的元素显示与隐藏
    function statusOperate(listDom, arr) {
     
        clearClone()
        if (getAllDom(".tabColumn").length) {
            if (getDom(".tabColumn").style.display != "none") {
                isTab();
            }
            for (let index = 0; index < listDom.length; index++) {
                const element = listDom[index];
                element.style.display = "none";
            }
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                let cloneAfter = element.cloneNode(true);
                cloneAfter.classList.add("cloneItem");
                if (getAllDom(".pushDistrict").length) {
                    getAllDom(".pushDistrict")[0].style.display = "block";
                    getAllDom(".pushDistrict")[0].appendChild(cloneAfter);
                } else {
                    return console.log("请给结果留给位置");
                }
                cloneAfter.style.display = "block";
            };
            arr = [];
        } else {
            for (let index = 0; index < listDom.length; index++) {
                const element = listDom[index];
                element.style.display = "none";
            }
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                let cloneAfter = element.cloneNode(true);
                cloneAfter.classList.add("cloneItem");
                if (getAllDom(".pushDistrict").length) {
                    getAllDom(".pushDistrict")[0].style.display = "block";
                    getAllDom(".pushDistrict")[0].appendChild(cloneAfter);
                } else {
                    return console.log("请给结果留给位置");
                }
                cloneAfter.style.display = "block";
            }
            isTab()
            arr = [];
        }
    };
    // 价格匹配
    function priceMatch(listDom, priceDom, arr, condition) {
        let valueText = null;
        let maxPrice = null;
        let minPrice = null;
      // 下次搜索之前销毁之前克隆到页面上的元素。
        clearClone()
        if (condition < 2) {
            valueText = parseInt(getDom(".searchBox").value.trim());
        } else {
            maxPrice = parseInt(getDom(".maxPriceSearch").value.trim());
            minPrice = parseInt(getDom(".minPriceSearch").value.trim())
        }
        if (!valueText) {
            return console.log("请输入查找内容");
        };
        for (let index = 0; index < priceDom.length; index++) {
            const element = priceDom[index]; // 获取要匹配的元素;
            var tempNum = parseInt(element.innerText.trim());
            if (condition === 0) {
                if (valueText >= tempNum) {
                    arr.push(listDom[element.index])
                }
            } else if (condition === 1) {
                if (valueText <= tempNum) {
                    arr.push(listDom[element.index])
                }
            } else if (condition === 2) {
                if (tempNum >= minPrice || tempNum <= maxPrice) {
                    arr.push(listDom[element.index])
                }
            }
        }
    }
    // 总处理函数
    function searchInt(isAll = false) {
        clearClone()
        removeAllError()
        // 获取元素
        let listDom = getAllDom(".merchantItem");
        let priceDom = [];
        let titleDom = [];
        if (getAllDom(".merchantItem .priceName")) {
            for (let index = 0; index < getAllDom(".priceName").length; index++) {
                const element = getAllDom(".priceName")[index];
                if (!element.classList.contains("cloneItem")) {
                    element.index = index;
                    priceDom.push(element)
                }
            }
        };
        if (getAllDom(".merchantItem .titleName")) {
            for (let index = 0; index < getAllDom(".titleName").length; index++) {
                const element = getAllDom(".titleName")[index];
                if (!element.classList.contains("cloneItem")) {
                    element.index = index;
                    titleDom.push(element)
                }
            }
        };
        if (isAll) {
            let arr = null;
            let valueText = getDom(".searchBox").value;
            dataListMatch(listDom, listDom, valueText, arr);
            statusOperate(listDom, arr);
        } else {
            if (!listDom.length) {
                return console.log("请保证对应父级搜索匹配class名正确");
            } else {
                if (!priceDom.length && !titleDom.length) {
                    return console.log("请保证页面内有搜索条件class")
                } else if (priceDom.length && !titleDom.length) {
                    let arr = [];
                    if (!getDom(".searchBox")) {
                        return console.log("请给搜索框正确的class")
                    } else if (getAllDom(".maxPriceSeach").length && !getAllDom(".minPriceSeach").length) {
                        priceMatch(listDom, priceDom, arr, 0);
                    } else if (!getAllDom(".maxPriceSeach").length && getAllDom(".minPriceSeach").length) {
                        priceMatch(listDom, priceDom, arr, 1);
                    } else if (getAllDom(".maxPriceSeach").length && getAllDom(".minPriceSeach").length) {
                        priceMatch(listDom, priceDom, arr, 2);
                    } else {
                        let valueText = getDom(".searchBox").value;
                        if (!valueText) {
                            return console.log("请输入查找内容")
                        }
                        dataListMatch(listDom, priceDom, valueText, arr);
                    }

                    if (arr.length < 1) {
                        noResult(listDom)
                    } else {
                        statusOperate(listDom, arr);
                        arr = []
                    }

                } else if (titleDom.length && !priceDom.length) {
                    let arr = [];
                    if (!getDom(".searchBox")) {
                        return console.log("请给搜索框正确的class")
                    }
                    let valueText = getDom(".searchBox").value
                    if (!valueText) {
                        noResult(listDom)
                        return console.log("请输入查找内容")
                    }
                    dataListMatch(listDom, titleDom, valueText, arr)
                    if (arr.length < 1) {
                        noResult(listDom);
                    } else {
                        statusOperate(listDom, arr);
                    }
                } else {
                    return console.log("给任意一个搜索条件class")
                }
            }
        }
    };
    // 默认监听
    // 监听回车键
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            searchInt()
        }
    };
    // 监听submit提交
    if (getDom(".submitBox") && getDom(".submitBox").type === "submit") {
        getDom(".submitBox").onsubmit = function () {
            searchInt()
        }
    }
    // 监听点击事件
    if (!getDom(".submitBox")) {
        return console.log("请给搜索按钮一个正确的class")
    }

    getDom(".submitBox").onclick = function () {
        searchInt()
    }
}