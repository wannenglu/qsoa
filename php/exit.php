<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>登出页面</title>
	</head>
	 
	<body>
		<?php
			
			session_start();
			require_once('connect.php');
			
			$_email = $_SESSION['email'];
			$newdbaction = 0;
			$rs = mysqli_query($link,"update `user` set login_action='$newdbaction' WHERE email='$_email'");
			
			unset($_SESSION); 
			session_destroy();
		?>
	</body>
</html>