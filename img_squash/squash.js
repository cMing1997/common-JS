compress(file) {
    let quality = 0.1 // 默认图片质量为0.7
    let files = file.name
    return new Promise((resolve, rej) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            var res = this.result;
            var img = new Image();
            img.src = res;
            img.onload = function (e) {
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
}