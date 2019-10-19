<?php
# zs 123
# 001 先连接数据库
$db = mysqli_connect("127.0.0.1", "root", "", "suning");
# 002 先获取用户提交的用户名和密码
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

# 003 根据获取的数据去数据库中进行对比(匹配)
$sql =  "SELECT * FROM user WHERE username='$username'";
$result = mysqli_query($db, $sql); 
# (1) 先检查数据库是否存在指定的用户名,如果没有那么就返回 提示(该用户不存在)
if (mysqli_num_rows($result) == 0)            #   mysqli_num_rows(参数result) 函数返回结果集中行的数量
{
  $response["status"] = "error";
  $response["msg"] = "该用户不存在！！";
  echo json_encode($response, true);          #    json_encode(要编码的值) 用于对变量进行 JSON 编码，该函数如果执行成功返回 JSON 数据，否则返回false
}else{

  # (2) 如果用户存在，那么继续检查密码是否正确，如果不正确，提示(密码不正确)
  // print_r(mysqli_fetch_all($result,MYSQLI_ASSOC)[0]);          
  # 获取数据 mysqli_fetch_all($result,MYSQLI_ASSOC) 从结果集中取得所有行作为关联数组，或数字数组，或二者兼有
  
  $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
  $data = $data[0];
  // print_r($data["password"]);



  if($data["password"] != $password)
  {
    $response["status"] = "error";
    $response["msg"] = "密码不正确！！";
    echo json_encode($response, true);
  }else{

  # (3) 如果用户名和密码都匹配那么就 提示登录成功 => 跳转到首页
    $response["status"] = "success";
    $response["msg"] = "登录成功";
    echo json_encode($response, true);
  }
}

?>