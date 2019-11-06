$(() => {
    /* (1)实现切换的功能 */
    $(".login-tab-item").mouseenter(function () {
        /* 03-当鼠标移入的时候，设置当前标签的选中状态,排他 */
        $(this).children("span").addClass("active").siblings().removeClass("active");
        console.log($(this));
        $(this).children("i").addClass("active")
        let index = $(this).index();
        /* 设置让内容切换显示 */
        //    $(".content").children().eq(index).addClass("current").siblings().removeClass("current");   
    })
    $(".login-tab-item i").eq(1).hide();
    $(".login-tab-item span").eq(0).css("color","#f60");
   
    $(".login-tab-item").on("click", function () {
        $(".login-tab-item").children().css("color","#333");
        $(this).children("span").css("color","#f60");
        $(".login-tab-item").children("i").hide();
        $(this).children("i").show();
    })



    /* (2)登录按钮的点击事件 */
    $("#loginBtn").click(function () {
        let usernameVal = $("#userName-ID").val();
        let passwordVal = $("#password-ID").val();
        console.log($(usernameVal),$(passwordVal));
        
        // console.log("------",$(usernameVal).text(),$(passwordVal).text());
        $.ajax({
            type: "get",
            url: "/login",
            data: `username=${usernameVal}&password=${passwordVal}`,
            dataType: "json",
            success: function (response) {
                /* 登录成功 */
                if (response.status == "success") {
                    /* 跳转到首页 */
                     console.log("11111111111");
                     
                    window.location.href = "http://127.0.0.1/1910/suning/src/html/1index-body.html";
                } else {
                    /* 注册失败： */
                    alert(response.msg);
                }

                /* 登录失败 */
            }
        });

    })
    $(".footer2").load("../html/footer-part2.html")
})