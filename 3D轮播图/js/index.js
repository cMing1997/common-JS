window.onload = function (params) {
    (function (params) {
        const getDom = function (dom) {
            if (typeof dom != "string") return;
            return document.querySelector(dom);
        }
        const getAllDom = function (dom) {
            if (typeof dom != "string") return;
            return document.querySelectorAll(dom)
        }
        //初始化样式
        getAllDom(".carousel-img")[0].classList.add("previous");
        getAllDom(".carousel-img")[1].classList.add("active");
        getAllDom(".carousel-img")[2].classList.add("next");
        getDom(".carousel-map").style.height = getDom(".active").clientHeight + 1 + "px";

        let rotateFn = function (params) {
            if (!getDom(".next").nextElementSibling) {
                getDom(".carousel-img").classList.add("next");
                getAllDom(".next")[1].classList.add("active");
                getAllDom(".active")[0].classList.remove("active");
                getDom(".active").previousElementSibling.classList.add("previous");
                getAllDom(".next")[1].classList.remove("next");
                getAllDom(".previous")[0].classList.remove("previous");
            } else {
                getDom(".previous").classList.remove("previous");
                getDom(".next").nextElementSibling.classList.add("next");
                getDom(".active").classList.add("previous");
                getDom(".active").classList.remove("active");
                getDom(".next").classList.add("active");
                getDom(".next").classList.remove("next");
            }
        }
        let timeId = setInterval(rotateFn, 1000);
        getDom(".carousel-btn-left").addEventListener("click", function () {
            clearInterval(timeId);
            if (!getDom(".previous").previousElementSibling) {
                getAllDom(".carousel-img")[getAllDom(".carousel-img").length - 1].classList.add("previous");
                getDom(".previous").classList.add("active");
                getAllDom(".active")[1].classList.add("next");
                getAllDom(".previous")[0].classList.remove("previous");
                getAllDom(".active")[1].classList.remove("active");
                getAllDom(".next")[1].classList.remove("next");
            } else {
                if (getDom(".active").previousElementSibling) {
                    getDom(".active").previousElementSibling.classList.add("active");
                    getAllDom(".active")[1].classList.remove("active");
                    getDom(".active").nextElementSibling.classList.add("next");
                    if (getDom(".carousel-img").classList.contains("next")) {
                        getDom(".carousel-img").classList.remove("next");
                    } else {
                        getAllDom(".next")[1].classList.remove("next");
                    }

                    getDom(".previous").previousElementSibling.classList.add("previous");
                    getAllDom(".previous")[1].classList.remove("previous");
                } else {
                    getDom(".previous").previousElementSibling.classList.add("previous");
                    getAllDom(".previous")[1].classList.remove("previous");
                    getDom(".previous").nextElementSibling.classList.add("active");
                    getAllDom(".active")[0].classList.remove("active");
                    getDom(".next").previousElementSibling.classList.add("next");
                    getAllDom(".next")[1].classList.remove("next");
                }
            }
            timeId = setInterval(rotateFn, 1000);
        })
        getDom(".carousel-btn-right").addEventListener("click", function () {
            clearInterval(timeId);
            rotateFn();
            timeId = setInterval(rotateFn, 1000);
        })
    })()
}