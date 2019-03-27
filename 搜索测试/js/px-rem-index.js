function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var reg = new RegExp("(Android|iPhone|SymbianOS|Windows Phone|iPad|iPod)", "ig");
    var isPC = !reg.test(userAgentInfo);
    return isPC
}
var initFontSize = function () {
    var n = document.getElementsByTagName("html")[0],
        e = document.documentElement.clientWidth;
    if (IsPC()) {
        if (e > 750) {
            n.style.fontSize = "50px"
        } else {
            n.style.fontSize = e / 750 * 50 + "px"
        }
    } else {
        n.style.fontSize = e / 750 * 50 + "px";
    }
};
initFontSize();
window.onresize = function () {
    initFontSize()
};
