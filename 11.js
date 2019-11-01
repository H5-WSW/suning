const express = require('express');
const {PORT} = require('./config.json');
const app = express();
app.use(express.static('./'))

app.use("/login",async(req,res)=>{
    const {username,password} = req.query;
    let sql = `SELECT * FROM user WHERE username = '${username}'`;
    let result = await db(sql);
    if(result == ""){
        let response = {};
        response["status"] = "error";
        response["msg"] = "该用户不存在";
        res.send(response);
    }
})


app.listen(PORT);