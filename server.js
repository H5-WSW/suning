const express = require('express');
const db = require("./db")
const app = express();

const {
    PORT
} = require('./config.json')

// let data = await db('SELECT 1 + 1 AS solution')


app.use(express.static('./'), express.json(), express.urlencoded())



app.get("/getLikeDate", async (req, res) => {
    let sql = `SELECT * FROM likedate`;
    let result = await db(sql);
    res.send(result);



    //     header("content-type:text/html;charset=utf-8"); 
    // # 01-先连接数据库
    // $db = mysqli_connect("127.0.0.1","root","","suning");    //llll
    // mysqli_query($db, "set names 'utf8'");      

    // $sql = "SELECT * FROM likedate";

    // $result = mysqli_query($db,$sql);
    // # 03-把数据库中的获取所有数据转换为JSON返回
    // $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    // //print_r($data)
    // echo json_encode($data,true)
})


app.get("/getPageCount", async (req, res) => {
    let sql = `SELECT * FROM listphone`;
    let result = await db(sql);
    res.send(String(Math.ceil(result.length / 20)));



    //     # 01-先连接数据库
    // $db = mysqli_connect("127.0.0.1", "root", "", "suning");   //llll
    // mysqli_query($db, "set names 'utf8'");  

    // # 02-查询获取数据库所有的数据
    // $sql = "SELECT * FROM listphone";                          //llll

    // $result = mysqli_query($db, $sql);
    // $count = ceil(mysqli_num_rows($result) / 20);
    // echo '{"count":'.$count."}";
})

app.get("/getShopList", async (req, res) => {
    let sql = `SELECT * FROM listphone`;
    let result = await db(sql);
    res.send(result);





    //     # 01-先连接数据库
    // $db = mysqli_connect("127.0.0.1", "root", "", "suning");   //llll
    // mysqli_query($db, "set names 'utf8'");  

    // # 02-查询获取数据库所有的数据
    // $sql = "SELECT * FROM listphone";                          //llll

    // $result = mysqli_query($db, $sql);
    // $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    // echo json_encode($data,true);
})

app.get("/getThereNavData1", async (req, res) => {
    let sql = `SELECT * FROM sanjinavdata`;
    let result = await db(sql);
    res.send(result);


    //     # 01-先连接数据库
    // $db = mysqli_connect("127.0.0.1", "root", "", "suning");   //llll
    // mysqli_query($db, "set names 'utf8'");  

    // # 02-查询获取数据库所有的数据
    // $sql = "SELECT * FROM sanjinavdata";                          //llll

    // $result = mysqli_query($db, $sql);

    // $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    // echo json_encode($data,true)
})

//   3个 未检测
app.get("/getThereNavData2", async (req, res) => {
    let sql = `SELECT * FROM sanji2navdata`;
    let result = await db(sql);
    res.send(result);



    //     # 01-先连接数据库
    // $db = mysqli_connect("127.0.0.1", "root", "", "suning");   //llll
    // mysqli_query($db, "set names 'utf8'");  

    // # 02-查询获取数据库所有的数据
    // $sql = "SELECT * FROM sanji2navdata";                          //llll

    // $result = mysqli_query($db, $sql);

    // $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    // echo json_encode($data,true)
})

app.get("/getTimeLimit", async (req, res) => {
let sql = `SELECT * FROM timelimitdata`;
let result = await db(sql);
res.send(result);


    // # 01-先连接数据库
    // $db = mysqli_connect("127.0.0.1", "root", "", "suning");   //llll
    // mysqli_query($db, "set names 'utf8'");  

    // # 02-查询获取数据库所有的数据
    // $sql = "SELECT * FROM timelimitdata";                          //llll

    // $result = mysqli_query($db, $sql);
    // $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    // echo json_encode($data,true);

})

app.get("/getTowNavData",async (req,res) => {
let sql = `SELECT * FROM erjinavdata`;
let result = await db(sql);
res.send(result);


//     # 01-先连接数据库
// $db = mysqli_connect("127.0.0.1", "root", "", "suning");   //llll
// mysqli_query($db, "set names 'utf8'");  

// # 02-查询获取数据库所有的数据
// $sql = "SELECT * FROM erjinavdata";                          //llll

// $result = mysqli_query($db, $sql);

// $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
// echo json_encode($data,true)
})














app.get("/getgoodsdata", async (req, res) => {
    const { //get请求获取参数 req.query
        page,
        type
    } = req.query;
    let sql = "";
    // 查询获取数据库所有的数据
    if (type == 0) {
        sql = `SELECT * FROM listphone LIMIT ${page}, 20`;
    } else if (type == 1) {
        sql = `SELECT * FROM listphone ORDER BY price DESC LIMIT ${page}, 20`;
    } else {
        sql = `SELECT * FROM listphone ORDER BY price ASC LIMIT ${page}, 20`;
    }
    // 把结果从数据库返回，并发送给前端
    let result = await db(sql);
    res.send(result);



    // $db = mysqli_connect("127.0.0.1","root","","suning");    //llll
    // mysqli_query($db, "set names 'utf8'");      

    // # 获取参数
    // $page = ($_REQUEST["page"] -1 ) * 20;
    // $type = $_REQUEST["sortType"];

    // # 02-查询获取数据库所有的数据
    // if($type == 0)
    // {
    //   $sql = "SELECT * FROM listphone LIMIT $page, 20";                     //llll
    // }elseif($type == 1){
    //   $sql = "SELECT * FROM listphone ORDER BY price DESC LIMIT $page, 20";  //llll
    // }else{
    //   $sql = "SELECT * FROM listphone ORDER BY price ASC LIMIT $page, 20";   //llll
    // }

    // $result = mysqli_query($db,$sql);
    // # 03-把数据库中的获取所有数据转换为JSON返回
    // $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    // echo json_encode($data,true)
})

app.post("/register", async (req, res) => {
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
        res.send(result);
    } else {
        let insertSql = `INSERT INTO user (username, password, phone) VALUES ('${username}', '${password}', '${phone}')`;
        result = await db(insertSql);
        let response = {};   //创建空对象
        response["status"] = "success";      //创建键值对
        response["msg"] = "注册成功！！！";
        res.send(result);
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

app.get("/login", async (req, res) => {
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
        res.send(response)
    } else {
        if (result[0].password != password) {
            // $response["status"] = "error";
            // $response["msg"] = "密码不正确！！";
            // echo json_encode($response, true);
            let response = {}
            response["status"] = "error";
            response["msg"] = "密码错误！！";
            // 服务器返回给前端的错误提示信息
            res.send(response)
        } else {
            //      $response["status"] = "success";
            //     $response["msg"] = "登录成功";
            //     echo json_encode($response, true);
            let response = {}
            response["status"] = "success";
            response["msg"] = "登陆成功";
            // 服务器返回给前端的错误提示信息
            res.send(response)
        }
    }

})


app.listen(PORT)