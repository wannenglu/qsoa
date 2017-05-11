<?php
	session_start();
	require_once('connect.php');
	
	
	$result = mysqli_query($link,"SELECT * FROM `rules`");
	
	$arr = array();
	while($row = mysqli_fetch_array($result)){
		array_push($arr,json_encode($row));
	}
	
	

	echo json_encode($arr);//返回json类型的数据
?>