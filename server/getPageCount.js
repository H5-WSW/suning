const express = require("express");
const router = express.Router();

const db=require("./db");



router.get("/getPageCount", async (req, res) => {
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

module.exports = router;