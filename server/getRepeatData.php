<?php
header("content-type:text/html;charset=utf-8"); 
# 01-先连接数据库
$db = mysqli_connect("127.0.0.1","root","","suning");    //llll
mysqli_query($db, "set names 'utf8'");      
// 判断是否传入底部图的数据，从索引0开始
$bottomData = isset($_REQUEST["bottomData"])?($_REQUEST["bottomData"]-1) * 3 : 9999;
// 每页取出多少条数据
$page1 = ($_REQUEST["page"]-1)*1;
$page2 = ($_REQUEST["page"]-1)*4;
$page4 = ($_REQUEST["page"]-1)*6;



$sql1 = "SELECT * FROM indexlcimgl LIMIT $page1,1";
$sql2 = "SELECT * FROM indexlc4imgr LIMIT $page2,4";
$sql4 = "SELECT * FROM indexlclogobottom LIMIT $page4,6";

$result1 = mysqli_query($db,$sql1);
$result2 = mysqli_query($db,$sql2);
$result4 = mysqli_query($db,$sql4);
# 03-把数据库中的获取所有数据转换为JSON返回
// 获取结果集
$data1 = mysqli_fetch_all($result1,MYSQLI_ASSOC);
$data2 = mysqli_fetch_all($result2,MYSQLI_ASSOC);
$data4 = mysqli_fetch_all($result4,MYSQLI_ASSOC);
// 判断是否有bottomData，存在则一起返回该数据
if($bottomData == 9999){
    $data = array("leftImg"=>$data1,"leftFourImg" => $data2,"bottomLogo" => $data4);
    echo json_encode($data,true);
}else{
    $sql3 = "SELECT * FROM indexlcimgbottom2 LIMIT $bottomData,3";
    $result3 = mysqli_query($db,$sql3);
    $data3 = mysqli_fetch_all($result3,MYSQLI_ASSOC);
    $data = array("leftImg"=>$data1,"leftFourImg" => $data2,"bottomTHereImg" => $data3,"bottomLogo" => $data4);
    echo json_encode($data,true);
}

//print_r($data)
// echo json_encode($data,true)
?>