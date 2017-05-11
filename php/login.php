<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>登陆中……</title>
	</head>
	 
	<body>

<?php
	session_start();
	require_once('connect.php');
	
	$action = $_GET['action'];
	if($action == 'login'){	//登录
		$email = stripslashes(trim($_POST['email']));	//获取用户名
		$password = stripslashes(trim($_POST['password']));	//获取密码
		
		$dbemail = null;	//定义数据库中的email值为空置
		$dbpassword = null;	//定义数据库中的password值为空置
		
		$result = mysqli_query($link,"SELECT * FROM `user` WHERE email='$email'");	//根据$email在数据库中查询

		$md5pass = md5($password);	//密码使用md5加密
		
		while($row = mysqli_fetch_array($result)){
			$dbemail = $row['email'];
			$dbpassword = $row['password'];
			$dbcounts = $row['login_counts'];
			$dbaction = $row['login_action'];
		}
				
		if(is_null($dbemail)){
?>
		<script>
			alert('没有该账号，请核对后再试！');
			window.location.href = '../login.html';
		</script>
<?php
		}else{
			if($dbpassword != $md5pass){
?>
			<script>
				alert('密码错误，请重新输入！');
				window.location.href = '../login.html';
			</script>    
<?php
			}else{
				$_SESSION['email'] = $dbemail;
				$_SESSION['code'] = mt_rand(0,100000);
				$newdbaction = 1;
				$newdbcounts = $dbcounts + 1;
			    $_SESSION['login_time'] = $row['login_time'];
			    $_SESSION['login_counts'] = $newdbcounts;
			    $logintime = time();
			    
			    $rs = mysqli_query($link,"update `user` set login_time='$logintime',login_counts='$newdbcounts',login_action='$newdbaction' WHERE email='$email'");
			    echo "登录成功！跳转中……"; //输出json数据
?>
				<script>
					window.setTimeout(function(){
						window.location.href = '../index.html';
					},1000);
				</script> 
<?php
			}
		}
		
	}
	
?>

	</body>
</html>