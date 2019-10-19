$(() => {
    $(".footer1").load("../template/footer-part1.html");
    $(".footer2").load("../template/footer-part2.html");
    let Obox = $(".mglass-box"); //大盒子
    let Obigbox = $(".mglass-big"); //存放2倍图片的盒子
    let Omousebox = $(".mouse-touch"); //随鼠标移动的区域

    // 初始隐藏两个
    Obigbox.hide();
    Omousebox.hide();

    Obox.mousemove(function (e) {
        // 移入显示两个盒子
        Obigbox.show();
        Omousebox.show();
        // console.log(1111111,e);
        // dis==获取跟鼠标移动的mousebox边框到box的距离
        let disY = e.pageY - this.parentNode.offsetTop - (this.offsetHeight / 4);
        let disX = e.pageX - this.parentNode.offsetLeft - (this.offsetWidth / 4);
        // console.log(disY,disX);
        //console.log(Omousebox[0].offsetTop,disY);

        // Omousebox.css({top:disY});
        // Omousebox.css({left:disY})
        // Obigbox.children("img").css({top:-0.5*disY});
        // Obigbox.children("img").css({left:-0.5*disX});
        // if(Omousebox[0].offsetTop >=0 && Omousebox[0].offsetTop<=225.5){
        //     Omousebox.css({top:disY});
        //     Obigbox.children("img").css({top:-0.5*disY});
        // }
        // if(Omousebox[0].offsetLeft >=0 && Omousebox[0].offsetLeft<=225.5){
        //     Omousebox.css({left:disX});
        //     Obigbox.children("img").css({left:-0.5*disX});
        // }
        // if(e.offsetY >=450/4 && Omousebox[0].offsetTop<=450*3/4){
        //     Omousebox.css({top:disY});
        //     Obigbox.children("img").css({top:-0.5*disY});
        // }
        // if(e.offsetX >=450/4 && e.offsetX<=450*3/4){
        //     Omousebox.css({left:disX});
        //     Obigbox.children("img").css({left:-0.5*disX});
        // }


        // 当dis=0时，mousebox与box重叠边框，鼠标距离box边框=225.5
        if (disY >= 0 && disY <= 225.5) {
            Omousebox.css({
                top: disY
            });
            Obigbox.children("img").css({
                top: -2 * disY
            });
        }
        if (disX >= 0 && disX <= 225.5) {
            Omousebox.css({
                left: disX,
            });
            Obigbox.children("img").css({
                left: -2 * disX
            });
        }
    })
    Obox.mouseleave(function () {
        Omousebox.hide();
        Obigbox.hide();
        // Omousebox.hide();
    })
    // 移动切换图的路径
    $(".details-list li").mouseenter(function () {

        console.log($(this).children("img")[0].src);
        $(".mglass-box img")[0].src = $(this).children("img")[0].src.replace("60w_60h", "800w_800h");
        $(".mglass-big img")[0].src = $(this).children("img")[0].src.replace("60w_60h", "800w_800h");

        //60w_60h
        //800w_800h
    })
})