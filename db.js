// 引入模块
var mysql = require('mysql');
// 连接数据库
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'suning'
});
 
module.exports=function (sql){
    return new Promise((res)=>{
        pool.query(sql,function(err,result){
            // console.log(result);
            res(result)
        });
    })
}

new Promise((res)=>{
    // function（）{}==db（sql）
    pool.query('SELECT 1 + 1 AS solution',function(err,result){   //异步
        // console.log(result);
        res(result)
    });
})

let data 


// let data=await abc()

// let data=await new Promise((res)=>{
//     pool.query('SELECT 1 + 1 AS solution',function(err,result){
//         console.log(result);
//         res(result)
//     });
// })


























 