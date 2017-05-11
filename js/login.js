//输入框文字
$("input[focucmsg]").each(function() {
	if($(this).val() == ""){
		$(this).val($(this).attr("focucmsg"));
	}
	$(this).focus(function() {
		if($(this).val() == $(this).attr("focucmsg")) {
			$(this).val("");
			$(this).val("").css("color", "#7c7c7c");
		}
	});
	$(this).blur(function() {
		if(!$(this).val()) {
			$(this).val($(this).attr("focucmsg"));
			$(this).val($(this).attr("focucmsg")).css("color", "#c2c2c2");
		}
	});
});

//密码文字
$(".password span").click(function(){
	$(this).hide();
	$(this).siblings(".pass").focus();
	$(this).siblings(".pass").css("color", "#7c7c7c");
});
$(".pass").blur(function(){
	var pass=$.trim($(this).val());
	var pass_span=$(this).siblings("span");
	if(pass=="" || pass==$.trim(pass_span.html()))
	{
	  pass_span.show();
	}
});

//登陆判断
$("#login").bind("submit",function(){
	var email = $.trim($("#email").val());
	var password = $.trim($("#password").val());
	var pattern = /^[a-z A-Z 0-9 _]+@[a-z A-Z 0-9 _]+(\.[a-z A-Z 0-9 _]+)+(\,[a-z A-Z 0-9 _]+@[a-z A-Z 0-9 _]+(\.[a-z A-Z 0-9 _]+)+)*$/;
	if(email == "" || email == "输入你的邮箱" || password == ""){
		$(".login_wrong").html("请填写完内容").show();
		return false;
	}
	else if(email != "" && !pattern.test(email)){
		$(".login_wrong").html("邮箱格式不正确").show();
		return false;
	}
	else if(pattern.test(email) && password != ""){
		$(".login_wrong").hide();
		return true;
	}
});


