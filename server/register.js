const express = require("express");
const router = express.Router();
const db=require("./db");
router.post("/register", async (req, res) => {
    const {   //post请求获取参数req.body;
        username,
        password,
        phone
    } = req.body;
    // 查询数据，输入的用户名是否存在
    let sql = `SELECT * FROM user WHERE username = '${username}'`;
    let result = await db(sql);
    // 当用户名为空返回error，当用户名不存在则插入数据注册成功
    if (result = "") {
        let response = {};
        response["status"] = "error";
        response["msg"] = "该用户名已经被注册！！";
        res.send(JSON.stringify(result));
    } else {
        let insertSql = `INSERT INTO user (username, password, phone) VALUES ('${username}', '${password}', '${phone}')`;
        result = await db(insertSql);
        let response = {};   //创建空对象
        response["status"] = "success";      //创建键值对
        response["msg"] = "注册成功！！！";
        res.send(JSON.stringify(result));
    }


    // $username = $_REQUEST["phone"];
    // $password = $_REQUEST["password"];
    // $phone    = $_REQUEST["phone"];  

    // # (2) 通过PHP代码来操作数据库
    // # 001 先连接数据库
    // $db = mysqli_connect("127.0.0.1","root","","suning");

    // # 002 先检查当前的用户名是否已经被注册,如果已经被注册，返回错误的提示信息。
    // $sql = "SELECT * FROM user WHERE username = '$username'";

    // #执行查询语句
    // $result = mysqli_query($db, $sql);

    // /* 
    // mysqli_result Object
    // (
    //     [current_field] => 0
    //     [field_count] => 4
    //     [lengths] => 
    //     [num_rows] => 1   表示查询到的结果有一行
    //     [type] => 0
    // )
    // */
    // $response = array("status"=>"","msg"=>"");
    // if(mysqli_num_rows($result) == 1)
    // {
    // /* 该用户名已经被注册！！ */
    // $response["status"] = "error";
    // $response["msg"] = " 该用户名已经被注册！！";
    // echo json_encode($response,true);
    // }else{
    // /* 执行插入语句 */
    // $insertSql = "INSERT INTO `user` (`id`, `username`, `password`, `phone`) VALUES (NULL, '$username', '$password', '$phone')";
    // $res = mysqli_query($db, $insertSql);
    // // echo $insertSql ;
    // $response["status"] = "ok";
    // $response["msg"] = " 恭喜您注册成功！";
    // echo json_encode($response, true);
    // }
})

module.exports = router;