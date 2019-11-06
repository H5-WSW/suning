const express = require("express");
const router = express.Router();
const db=require("./db");
router.get("/login", async (req, res) => {
    // req.query获取url参数
    // res.send("aaaa")

    // $username = $_REQUEST["phone"];
    // $password = $_REQUEST["password"];
    const {
        username,
        password
    } = req.query
    let sql = `SELECT * FROM user WHERE username='${username}'`;

    // 接收数据库返回的结果，db(sql)是一个函数
    // $db = mysqli_connect("127.0.0.1","root","","suning");

    // # 002 先检查当前的用户名是否已经被注册,如果已经被注册，返回错误的提示信息。
    // $sql = "SELECT * FROM user WHERE username = '$username'";

    // #执行查询语句
    // $result = mysqli_query($db, $sql);
    let result = await db(sql)

    if (result == "") {
        let response = {}
        response["status"] = "error";
        response["msg"] = "该用户不存在！！";
        // 服务器返回给前端的错误提示信息
        res.send(JSON.stringify(response));
    } else {
        if (result[0].password != password) {
            // $response["status"] = "error";
            // $response["msg"] = "密码不正确！！";
            // echo json_encode($response, true);
            let response = {}
            response["status"] = "error";
            response["msg"] = "密码错误！！";
            // 服务器返回给前端的错误提示信息
            res.send(JSON.stringify(response));
        } else {
            //      $response["status"] = "success";
            //     $response["msg"] = "登录成功";
            //     echo json_encode($response, true);
            let response = {}
            response["status"] = "success";
            response["msg"] = "登陆成功";
            // 服务器返回给前端的错误提示信息
            res.send(JSON.stringify(response));
        }
    }

})


module.exports = router;