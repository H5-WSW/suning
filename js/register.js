/* 整体思路：表单验证 + 图形验证码 + 手机短信验证 + 注册请求 */
$(() => {
    console.log($("#usernameID"));

    /* 测试数据 */
    // $("#usernameID").val("ddd");
    $("#phoneID").val("17776366374");
    $("#password").val("123456");
    $("#msgCode").val("999");

    // $("#usernameID").keyup(function() {
    //     let val = $(this).val().trim();
    //     if (/^[a-zA-Z]{2,6}$/.test(val)) {
    //         $(this).parents(".username").removeClass("form-group-error");
    //         $(this).siblings(".form-group__message").text("");
    //     } else {
    //         $(this).parents(".username").addClass("form-group-error");
    //         $(this).siblings(".form-group__message").text("用户名不规范！");
    //     }
    // })
    // 手机号验证
    // 当鼠标松开手机号时获取值，匹配值是否符合，符合添加信息
    $("#phoneID").keyup(function() {
        let val = $(this).val().trim();
        if (/^1[3-9]\d{9}$/.test(val)) {
            $(this).parents(".phone").removeClass("form-group-error");
            $(this).siblings(".form-group__message").text("");
        } else {
            $(this).parents(".phone").addClass("form-group-error");
            $(this).siblings(".form-group__message").text("手机号码不正确");
        }
    })

    // 密码验证
    $("#password").keyup(function() {
        let val = $(this).val().trim();
        /*密码长度6-20字符（大小写字母和数字）  */
        if (/^[0-9a-zA-Z]{6,20}$/.test(val)) {
            $(this).parents(".password").removeClass("form-group-error");
            $(this).siblings(".form-group__message").text("");
        } else {
            $(this).parents(".password").addClass("form-group-error");
            $(this).siblings(".form-group__message").text("密码不符合规范");
        }
    })


    /* 给手机号码发送短信： */
    /* 思路：给“发送验证码”按钮添加点击事件，当点击按钮的时候，去检查手机号码是否正确，如果手机号码正确，那么就短信，如果不正确那 */
    let randomNumber;

    function getRandom(min, max) {
        return parseInt(Math.random() * (max - min + 1)) + min
    }

    randomNumber = 999;
    $("#msgCodeBtn").click(function() {
        $("#phoneID").trigger("keyup");// 锁定输入的手机号
        let flag = $(".phone").hasClass("form-group-error");
        /* 如果flag的值是flase,那么我们就调用第三方平台发请求 发短信 */
        if (flag) return;
        // randomNumber = getRandom(1000, 9999);
        // randomNumber = 999;
        $.ajax({
            type: 'post',
            url: 'http://route.showapi.com/28-1',
            dataType: 'json',
            data: {
                "showapi_appid": '91032', //这里需要改成自己的appid
                "showapi_sign": 'd57b19c8d2d44aef94aee464768a38d8', //这里需要改成自己的应用的密钥secret
                "mobile": $("#phoneID").val(),
                "content": `{"name":"文顶顶","code":${randomNumber},"minute":"3","comName":"脑子进水集团"}`,
                "tNum": "T150606060601",
            },
            success: (result) => console.log(result)
        });
    });


    /* 注册按钮的处理： */
    /* 思路：点击注册，检查表单手机号、密码验证通过 && 手机短信验证码 把页面数据作为参数提交给服务器： */
    $("#registerBtn").click(function() {

        // $("#usernameID").trigger("keyup");
        $("#phoneID").trigger("keyup");
        $("#password").trigger("keyup");
        // $("#passwordB").trigger("blur");

        if ($(".form-group-error").length != 0) return;
        // if ($("#imageCode").val() != imgCode) {
        //     alert("图形验证码不正确!");
        //     return;
        // }
        if ($("#msgCode").val() != randomNumber + "") {
            alert("手机验证码不正确!");
            return;
        }

        // if (!$("#protocol").is(":checked")) {
        //     alert("请阅读并同意注册协议");
        //     return;
        // }

        /* 发请求给服务器  注册： */
        $.ajax({
            type: "post",
            url: "/register",
            data: `username=${$("#phoneID").val()}&password=${$("#password").val()}&phone=${$("#phoneID").val()}`,
            dataType: "json",
            success: function(response) {
                /* 注册成功： */
                console.log(response, response.status);

                if (response.status == "ok") {
                    console.log("++++");

                    /* 跳转到首页 */
                    window.location.href = "http://127.0.0.1/1910/suning/src/html/home.html";
                } else {
                    /* 注册失败： */
                    alert(response.msg);
                }
            }
        });
    })

});