<?php
header("content-type:text/html;charset=utf-8"); 
# 01-先连接数据库
$db = mysqli_connect("127.0.0.1","root","","suning");    //llll
mysqli_query($db, "set names 'utf8'");      

$sql = "SELECT * FROM likedate";

$result = mysqli_query($db,$sql);
# 03-把数据库中的获取所有数据转换为JSON返回
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
//print_r($data)
echo json_encode($data,true)
?>