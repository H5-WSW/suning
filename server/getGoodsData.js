const express = require("express");
const router = express.Router();
const db=require("./db");

router.get("/getgoodsdata", async (req, res) => {
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
    res.send(JSON.stringify(result));



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
module.exports = router;