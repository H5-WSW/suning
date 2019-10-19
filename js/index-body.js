$(() => {
    $.ajax({ //猜你喜欢
        type: "post",
        url: "../server//getLikeDate.php",
        //dataType: "json",
        success(data) {
            var data = JSON.parse(data).splice(0, 25); //转换成字符串,截取前25条数据
            // console.log(data);
            let Oul = document.createElement("ul");
            let html = "";
            // console.log(1111111111);
            for (let i = 0; i < data.length; i++) {
                // console.log(2222222222);
                html += `
                <li>
                    <a class="pro" href="">
                        <img src=${data[i].src} alt="">
                    </a>
                    <p class="desc"><i>自营</i>${data[i].desc}</p>
                    <div class="price-area">
                        <span class="price">￥${data[i].price}</span>
                        <span class="islike">找相似</span>
                    </div>
                    <div class="icon-area">
                       ${getInconArea(data[i].tag)}
                    </div>
                </li>
                `
            };
            Oul.innerHTML = html;
            $(".partLast-like-list").append(Oul);
        }
    })

    // 循环   获取incon-area span
    function getInconArea(data) {
        let str = "";
        let res = JSON.parse(data);

        for (let i = 0; i < res.length; i++) {
            str += `
            <span>${res[i]}</span>
            `;
        };
        // console.log(str);
        return str;
    }


    // 楼层--复用部分（面向对象）
    class getRepeatData {
        constructor(page, bottom, obj) {
            this.obj = obj
            this.page = page;
            this.bottomData = bottom;
        }
        init() {
            this.getAllData();
        }
        getAllData() {
            var vthis = this;
            let data = null; //判断底部是否存在三图的那一模块
            if (this.bottomData == "no") { //不存在，就不获取该模块数据
                data = {
                    page: this.page
                }
            } else {
                data = {
                    page: this.page, //存在，存在就获取该模块数据
                    bottomData: this.bottomData
                }
            }
            console.log(data);
            $.ajax({
                type: "post",
                url: "..//server//getRepeatData.php",
                data: data,
                success(res) {
                    var res = JSON.parse(res);
                    vthis.obj.append(vthis.getLeftImg(res.leftImg)); //左边图
                    vthis.obj.append(vthis.getRightImg(res.leftFourImg)); //右边列表
                    if (res.bottomTHereImg) {
                        vthis.obj.append(vthis.getBottomImgOne(res.bottomTHereImg)); //底部3图
                    };
                    vthis.obj.append(vthis.getBottomImgTow(res.bottomLogo)); //底部list图
                }
            })
        }
        // left-img
        getLeftImg(data) {
            // console.log(data,"====");
            let html = "";
            let Obox = document.createElement("div");
            html = `<img class="bigImg-left" src=${data[0].img}>`;
            Obox = html;
            return Obox;
        }

        // list-right
        getRightImg(data) {
            // console.log(data,"8888888------");
            let Oul = document.createElement("ul");
            let html = "";
            for (let i = 0; i < 4; i++) {
                html += `
                <li class="list-right">
                <p class="title">${data[i].title}</p>
                <p class="des">${data[i].des}</p>
                <img src=${data[i].src}>
                </li>
                `
            };
            Oul.innerHTML = html;
            return Oul;
        }
        //底部3图
        getBottomImgOne(data) {
            // console.log(data,"+++++++999999999");
            let Oul = document.createElement("ul");
            let html = "";
            for (let i = 0; i < 3; i++) {
                html += `
            <li class="thereImg-bottom">
            <div class="bottomImgOng-left-text">
            <p class="title">${data[i].title}</p>
            <p class="des">${data[i].des}</p>
            </div>
            <img  src=${data[i].src}>
            </li>
            `
            };
            Oul.innerHTML = html;
            return Oul;
        }
        //底部list图
        getBottomImgTow(data) {
            // console.log(data,"********");
            let Oul = document.createElement("ul");
            let html = "";
            for (let i = 0; i < 6; i++) {
                html += `
                <li class="logoImg-bottom">
                    <img src=${data[i].img}>
                </li>

                `
            };
            Oul.innerHTML = html;
            return Oul;
        }
    } {
        let res1 = new getRepeatData(1, 1, $(".repeat-main").eq(0));
        res1.init()
        let res2 = new getRepeatData(2, 2, $(".repeat-main").eq(1));
        res2.init()

        let res3 = new getRepeatData(3, "no", $(".repeat-main").eq(2));
        res3.init()
        let res4 = new getRepeatData(4, "no", $(".repeat-main").eq(3));
        res4.init()

        let res5 = new getRepeatData(5, 3, $(".repeat-main").eq(4));
        res5.init()
        let res6 = new getRepeatData(6, 4, $(".repeat-main").eq(5));
        res6.init()

        let res7 = new getRepeatData(7, 5, $(".repeat-main").eq(6));
        res7.init()
        let res8 = new getRepeatData(8, 6, $(".repeat-main").eq(7));
        res8.init()

        let res9 = new getRepeatData(9, "no", $(".repeat-main").eq(8));
        res9.init()
        let res10 = new getRepeatData(10, "no", $(".repeat-main").eq(9));
        res10.init()

        let res11 = new getRepeatData(11, 7, $(".repeat-main").eq(10));
        res11.init()
        let res12 = new getRepeatData(12, 8, $(".repeat-main").eq(11));
        res12.init()

        let res13 = new getRepeatData(13, 9, $(".repeat-main").eq(12));
        res13.init()
        let res14 = new getRepeatData(14, 10, $(".repeat-main").eq(13));
        res14.init()

        let res15 = new getRepeatData(15, 11, $(".repeat-main").eq(14));
        res15.init()
        let res16 = new getRepeatData(16, 12, $(".repeat-main").eq(15));
        res16.init()
    }

    // 轮播图
    let arrImgs = {
        imgs: [
            "//image4.suning.cn/uimg/cms/img/157131211417461481.jpg",
            "//image.suning.cn/uimg/aps/material/157129831055872311.jpg",
            "//oss.suning.com/aps/aps_learning/iwogh/2019/10/17/19/iwoghBannerPicture/948fa739de0640d9a12c798897868ab7.png",
            "//oss.suning.com/aps/aps_learning/iwogh/2019/10/15/14/iwoghBannerPicture/b04fbb81b73d4f0ea7d8ac45899c4ecc.png",
            "//image.suning.cn/uimg/aps/material/157128452666318428.jpg",
            "//image.suning.cn/uimg/aps/material/157086226080443045.jpg",
            "//oss.suning.com/aps/aps_learning/iwogh/2019/10/16/11/iwoghBannerPicture/95ba66b5345e49fcae783b91b79278e8.png",
            "//image5.suning.cn/uimg/cms/img/157130558070015242.jpg"
        ]
    }
    let a = new LbManager(arrImgs, $(".index-lb")[0]);
    a.init(); //初始化
    // 手风琴
    $("#content-sfq dt").eq(0).hide();
    $("#content-sfq dt").mouseover(function () {
        //$("#content-sfq dt").show();
        //$(this).hide();
        //$(this).siblings("dd").css("width",500)
        //$(this).siblings("dd").children("img").css("width",500);
        $("#content-sfq dd").animate({"width":0},{"queue":false});
       $(this).next().animate({"width": 570},{"queue":false});      //    返回当前元素dt的后一个同级元素dd
    //    console.log($(this).next());
    
    });

    // 限时抢购
    $.ajax({
        type: "post",
        url: "../server/getTimeLimit.php",
        success(limitdata) {
            let Oul = document.createElement("ul");
            let html = "";
            var limitdata = JSON.parse(limitdata);
            console.log("888888888888888888888", limitdata);
            for (let i = 0; i < limitdata.length; i++) {
                html += `
                <li>
                    <img src=${limitdata[i].img} alt="">
                    <p class="title">${limitdata[i].title}</p>
                    <p class="price">￥${limitdata[i].price}<span class="del-icon-price">￥${limitdata[i].oldprice}</span></p>
                </li>
            `
            };
            Oul.className = "timeLimit-l-list";
            Oul.innerHTML = html;
            $(".timeLimit-l").append(Oul);

            // 箭头的点击事件
            $(".btn-l").click(() => {
                console.log($(".timeLimit-l-list")[0].offsetLeft);
                
                if (-$(".timeLimit-l-list")[0].offsetLeft < 2000) {
                    $(".timeLimit-l-list")[0].style.left = $(".timeLimit-l-list")[0].offsetLeft - 790 + "px";
                }
            })
            $(".btn-r").click(() => {
                if ($(".timeLimit-l-list")[0].offsetLeft < 0) {
                    $(".timeLimit-l-list")[0].style.left = $(".timeLimit-l-list")[0].offsetLeft + 790 + "px";
                }
            })
        }
    })
    $("header").load("../html/index-header.html")
    $(".footer1").load("../html/footer-part1.html")
    $(".footer2").load("../html/footer-part2.html")

})