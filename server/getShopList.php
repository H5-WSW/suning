<?php
header("content-type:text/html;charset=utf-8"); 
# 01-先连接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "suning");   //llll
mysqli_query($db, "set names 'utf8'");  

# 02-查询获取数据库所有的数据
$sql = "SELECT * FROM listphone";                          //llll

$result = mysqli_query($db, $sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);
?>