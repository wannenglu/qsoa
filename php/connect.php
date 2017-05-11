<?php
	header("Content-Type:text/html;charset=utf-8");//设置网页编码
			
	$link = mysqli_connect('localhost:3306','root','','qsoa');//reg为数据库名字
	if (mysqli_connect_errno($link))  //没连上的时候
	{  
		echo "连接 MySQL 失败: ".mysqli_connect_error();  
	}
	
	date_default_timezone_set('PRC');//设置我的默认时区为北京时间
	$time=date('Y-m-d H:i:s');//后端得到时间

	mysqli_set_charset ($link,'utf8');//设置数据库编码
?>