<?php
	session_start();
	require_once('connect.php');
	
	$_email = $_SESSION['email'];
	$result = mysqli_query($link,"SELECT * FROM `userlist` WHERE email='$_email'");	//根据$_email在数据库中查询
	
	$arr = array();
	while($row = mysqli_fetch_array($result)){
		array_push($arr,json_encode($row));
	}
	
	

	echo json_encode($arr);//返回json类型的数据
?>