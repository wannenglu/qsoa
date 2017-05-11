window.onload = function(){
	
	//导航
	var lisNode = $(".header_nav li");
	var navLine = $(".header_nav .header_nav_line");
	var navNode = $(".header_nav");
	
	lisNode.mouseenter(function(){
		var liX = $(this).position().left;
		navLine.stop().animate({left:liX + "px"},200);
	});
	navNode.mouseleave(function(){
		var currentNode = $(".header_nav .header_nav_current");
		var liX = currentNode.position().left;
		navLine.stop().animate({left:liX + "px"},200);
	});
	lisNode.click(function(){
		$(this).addClass("header_nav_current").siblings("li").removeClass("header_nav_current").stop();
		var currentNode = $(".header_nav .header_nav_current");
		var liX = currentNode.position().left;
		navLine.stop().animate({left:liX + "px"},200);
	});
	
	//个人菜单
	$(".header_user").mouseenter(function(){
		$(".header_user_nav").show();
	});
	$(".header_user").mouseleave(function(){
		$(".header_user_nav").hide();
	});
	
	//退出
	$(".logout").click(function(){
		$.ajax({
			type: "post",
			url: "php/exit.php",
			success: function(){
				$("html").html("退出成功！");
				window.setTimeout(function(){
					window.location.href='login.html';
				},1000);
			},
			error: function(XMLHttpRequest,textStatus,errorThrown){
				//console.log(XMLHttpRequest,textStatus,errorThrown);
				alert("服务忙，请稍后重试2退出!");
			}
		});
		
	});
	
}

//背景切换
var flash = {
	init: function(){
		$(".wallBox_btn").click(function(){
			$(".wallBox").toggle();
		});
		$(".wallBox_top_xx").click(function(){
			$(".wallBox").hide();
		});
		
		var wallBoxUl = $(".wallBox_ul");
		var wallBoxLi = $(".wallBox_ul li")
		var BannerBg = $(".index-box-Banner");
		
		wallBoxLi.click(function(){
			var EleName = $(this).find("img").attr("bgName");
			var urlBg = "images/" + EleName +".jpg";
			$(BannerBg).css("backgroundImage","url(" + urlBg + ")");
			$(BannerBg).attr("bgName",EleName);
			wallBoxLi.siblings(".wallBgSet").removeClass("wallBgSet");
			$(this).addClass("wallBgSet");
		});
		
		$(".wallBtn_left").click(function(){
			var oldpos,nowpos,lastpos;
			lastpos = wallBoxLi.length-1;//得到li的个数
			oldpos = $(".wallBgSet").index();//得到之前位置的值
			nowpos = $(this).index();//得到当前位置的值
			nowpos=oldpos==0?lastpos:oldpos-1;
			
			wallBoxLi.eq(nowpos).addClass("wallBgSet");//给当前的li添加样式
			wallBoxLi.eq(oldpos).removeClass("wallBgSet");//给之前的li移除样式
			
			var EleName = wallBoxLi.eq(nowpos).find("img").attr("bgName");
			var urlBg = "images/" + EleName +".jpg";
			$(BannerBg).css("backgroundImage","url(" + urlBg + ")");
			$(BannerBg).attr("bgName",EleName);
			
		});
		
		$(".wallBtn_right").click(function(){
			var oldpos,nowpos,lastpos;
			lastpos = wallBoxLi.length-1;//得到li的个数
			oldpos = $(".wallBgSet").index();//得到之前位置的值
			nowpos = $(this).index();//得到当前位置的值
			nowpos=oldpos==lastpos?0:oldpos+1;
			
			wallBoxLi.eq(nowpos).addClass("wallBgSet");//给当前的li添加样式
			wallBoxLi.eq(oldpos).removeClass("wallBgSet");//给之前的li移除样式
			
			var EleName = wallBoxLi.eq(nowpos).find("img").attr("bgName");
			var urlBg = "images/" + EleName +".jpg";
			$(BannerBg).css("backgroundImage","url(" + urlBg + ")");
			$(BannerBg).attr("bgName",EleName);
		});
	}
}
//用户
var admin = {
//	init: function(){
//		$.ajax({
//			type: "post",
//			url: "php/adminList.php",
//			dataType: "json",
//			success: function(arr){
//				for(var i=0; i<arr.length;i++){
//					var arr = $.parseJSON(arr[i]);
////					console.log(arr);
////					console.log(arr.email);
//					$(".header_user_img").attr("src","images/" + arr.touxiang + ".png");
//					$(".indexBanner_user_img").attr("src","images/" + arr.touxiang + ".png");
//					$("#user_nickname").html(arr.user_nickname);
//					$(".indexBanner_user_sign").html(arr.user_sign);
//					if(arr.sex == "男"){
//						$(".indexBanner_user_info i").css("backgroundPositionY","-81px");
//					}else if(arr.sex == "女"){
//						$(".indexBanner_user_info i").css("backgroundPositionY","-103px");
//					}
//					$(".indexBoxMain_user_Info span").html(arr.realname);
//					$(".indexBoxMain_user_Info i").html("(" + arr.othername + "_全速)");
//					
//				}
//			},
//			error: function(XMLHttpRequest,textStatus,errorThrown){
//	//					console.log(XMLHttpRequest,textStatus,errorThrown);
//				$("body").remove();
//				
//				window.setTimeout(function(){
//					alert("你未登录,请登录账号再试！");
//					window.location.href='login.html';
//				},100);
//			}
//		});
//	}
	
	init: function(){
		function admin(json){
			this.init(json);
		};
		admin.prototype={
			init:function(json){
				var that=this;
				var el=$(json.el);
				$.ajax({
					type:json.type?json.type:"get",
					url:json.url,
					data:json.data?json.data:"",
					dataType:"json",
					success:function(json){
						$(".header_user_img").attr("src","images/" + json.touxiang + ".png");
						$(".indexBanner_user_img").attr("src","images/" + json.touxiang + ".png");
						$("#user_nickname").html(json.user_nickname);
						$(".indexBanner_user_sign").html(json.user_sign);
						if(json.sex == "男"){
							$(".indexBanner_user_info i").css("backgroundPositionY","-81px");
						}else if(json.sex == "女"){
							$(".indexBanner_user_info i").css("backgroundPositionY","-103px");
						}
						$(".indexBoxMain_user_Info span").html(json.realname);
						$(".indexBoxMain_user_Info i").html("(" + json.othername + "_全速)");
					},
					error:function(xml,status,error){
						alert("请稍后重试");
						console.log(error);
					}
				});
			},
			
			constructor:admin
		}
		
		var admin1 = new admin({
			el:"#header_user",
			type:'get',
			url:'json/admin.json'
		});
	}
	
		
}

//生日
var birth = {
	index: function(){
//		$.ajax({
//			type:"post",
//			url:"php/birthday.php",
//			dataType: "json",
//			success: function(arr){
//				var frag = document.createDocumentFragment();
//				for(var i=0; i<6;i++){
//					var json = $.parseJSON(arr[i]);
////						console.log(json.time,json.conntent);
//					var time = new Date();
//					var timeY = time.getFullYear();
//					var timeM = json.birthday.slice(5,7);
//					var timeD = json.birthday.slice(8,10);
////					console.log(timeM,timeD);
//					var input = new Date(timeY,timeM-1,timeD); //你要用正则成功的截取正确格式的参数，并注意月份和实际输入的相差1
//					var success = function(){
//					    return Math.abs(input - time) < 7*24*3600*1000 //时间差和一周时间的比较
//					}();
////					console.log(success);
//					if(success == true){
//						var a = "<a href='javascript:void(0)' name="+json.email+">发送祝福</a>";
//					}
//					else{
//						var a = "";
//					}
//					$(frag).prepend("<li class='ibm_birthdayList'>"+
//						"<img class='ibm_birthday_personImg' src='images/"+ json.touxiang +".png' />"+
//						"<div class='ibm_birthday_personCon'>"+
//							"<span>"+json.realname+a+"</span>"+
//							"<span>在"+timeM+"月"+timeD+"日过生日</span>"+
//						"</div>"+
//					"</li>");
//				}
//				$(".ibm_birthdayUl").append($(frag));
//			},
//			error: function(XMLHttpRequest,textStatus,errorThrown){
//				//console.log(XMLHttpRequest,textStatus,errorThrown);
//				alert("主页生日--服务忙，请稍后重试2!");
//			}
//		});

		function birthday(json){
			this.init(json);
		};
		birthday.prototype={
			init:function(json){
				var that=this;
				var el=$(json.el);
				$.ajax({
					type:json.type?json.type:"get",
					url:json.url,
					data:json.data?json.data:"",
					dataType:"json",
					success:function(json){
						var frag = document.createDocumentFragment();
						for(var i in json){
							if(i<6){
								
			//						console.log(json.time,json.conntent);
								var time = new Date();
								var timeY = time.getFullYear();
								var timeM = json[i].birthday.slice(5,7);
								var timeD = json[i].birthday.slice(8,10);
			//					console.log(timeM,timeD);
								var input = new Date(timeY,timeM-1,timeD); //你要用正则成功的截取正确格式的参数，并注意月份和实际输入的相差1
								var success = function(){
								    return Math.abs(input - time) < 7*24*3600*1000 //时间差和一周时间的比较
								}();
			//					console.log(success);
								if(success == true){
									var a = "<a href='javascript:void(0)' name="+json[i].email+">发送祝福</a>";
								}
								else{
									var a = "";
								}
								$(frag).prepend("<li class='ibm_birthdayList'>"+
									"<img class='ibm_birthday_personImg' src='images/"+ json[i].touxiang +".png' />"+
									"<div class='ibm_birthday_personCon'>"+
										"<span>"+json[i].realname+a+"</span>"+
										"<span>在"+timeM+"月"+timeD+"日过生日</span>"+
									"</div>"+
								"</li>");
							}
								
						}
						$(".ibm_birthdayUl").append($(frag));
					},
					error:function(xml,status,error){
						alert("请稍后重试");
						console.log(error);
					}
				});
			},
			
			constructor:birthday
		}
		
		var birthday1 = new birthday({
			el:"#ibm_birthdayUl",
			type:'get',
			url:'json/birthday.json'
		});
	},
	
	birthday: function(){
//		$.ajax({
//			type:"post",
//			url:"php/birthday.php",
//			dataType: "json",
//			success: function(arr){
//				var frag = document.createDocumentFragment();
//				for(var i=0; i<arr.length;i++){
//					var json = $.parseJSON(arr[i]);
////						console.log(json.time,json.conntent);
//					var time = new Date();
//					var timeY = time.getFullYear();
//					var timeM = json.birthday.slice(5,7);
//					var timeD = json.birthday.slice(8,10);
////					console.log(timeM,timeD);
//					var input = new Date(timeY,timeM-1,timeD); //你要用正则成功的截取正确格式的参数，并注意月份和实际输入的相差1
//					var success = function(){
//					    return Math.abs(input - time) < 7*24*3600*1000 //时间差和一周时间的比较
//					}();
////					console.log(success);
//					if(success == true){
//						var a = "<a href='javascript:void(0)' name="+json.email+">发送祝福</a>";
//					}
//					else{
//						var a = "";
//					}
//					$(frag).prepend("<li class='ibm_birthdayList birthdayList'>"+
//						"<img class='ibm_birthday_personImg' src='images/"+ json.touxiang +".png' />"+
//						"<div class='ibm_birthday_personCon'>"+
//							"<span>"+json.realname+a+"</span>"+
//							"<span>在"+timeM+"月"+timeD+"日过生日</span>"+
//						"</div>"+
//					"</li>");
//				}
//				$(".birthdayUl").append($(frag));
//			},
//			error: function(XMLHttpRequest,textStatus,errorThrown){
//				//console.log(XMLHttpRequest,textStatus,errorThrown);
//				alert("生日页--服务忙，请稍后重试2!");
//			}
//		});

		function birthday(json){
			this.init(json);
		};
		birthday.prototype={
			init:function(json){
				var that=this;
				var el=$(json.el);
				$.ajax({
					type:json.type?json.type:"get",
					url:json.url,
					data:json.data?json.data:"",
					dataType:"json",
					success:function(json){
						var frag = document.createDocumentFragment();
						for(var i in json){
		//						console.log(json.time,json.conntent);
							var time = new Date();
							var timeY = time.getFullYear();
							var timeM = json[i].birthday.slice(5,7);
							var timeD = json[i].birthday.slice(8,10);
		//					console.log(timeM,timeD);
							var input = new Date(timeY,timeM-1,timeD); //你要用正则成功的截取正确格式的参数，并注意月份和实际输入的相差1
							var success = function(){
							    return Math.abs(input - time) < 7*24*3600*1000 //时间差和一周时间的比较
							}();
		//					console.log(success);
							if(success == true){
								var a = "<a href='javascript:void(0)' name="+json[i].email+">发送祝福</a>";
							}
							else{
								var a = "";
							}
							$(frag).prepend("<li class='ibm_birthdayList birthdayList'>"+
								"<img class='ibm_birthday_personImg' src='images/"+ json[i].touxiang +".png' />"+
								"<div class='ibm_birthday_personCon'>"+
									"<span>"+json[i].realname+a+"</span>"+
									"<span>在"+timeM+"月"+timeD+"日过生日</span>"+
								"</div>"+
							"</li>");
						}
						$(".birthdayUl").append($(frag));
					},
					error:function(xml,status,error){
						alert("请稍后重试");
						console.log(error);
					}
				});
			},
			
			constructor:birthday
		}
		
		var birthday2 = new birthday({
			el:"#birthdayUl",
			type:'get',
			url:'json/birthday.json'
		});
	}
}

//公司公告
var index_notice = {
	init: function(){
//		$.ajax({
//			type:"post",
//			url:"php/comnotice.php",
//			dataType: "json",
//			success: function(arr){
//				var frag = document.createDocumentFragment();
//				for(var i=0; i<arr.length;i++){
//					var json = $.parseJSON(arr[i]);
//					
//					var time = json.time.slice(0,10);
//					
//					$(frag).prepend("<dd class='comNoticeConnect'>"+
//					"<a href='##'>"+
//						"<i></i>"+
//						"<span>"+json.title+"</span>"+
//						"<span>"+time+"</span>"+
//					"</a>"+
//					"</dd>"
//					);
//				}
//				$(".comNotice").append($(frag));
//			},
//			error: function(XMLHttpRequest,textStatus,errorThrown){
//				//console.log(XMLHttpRequest,textStatus,errorThrown);
//				alert("公司公告--服务忙，请稍后重试2!");
//			}
//		});
		
		function index_notice(json){
			this.init(json);
		};
		index_notice.prototype={
			init:function(j){
				var that=this;
				var el=$(j.el);
				$.ajax({
					type:j.type?j.type:"get",
					url:j.url,
					data:j.data?j.data:"",
					dataType:"json",
					success:function(json){
						var frag = document.createDocumentFragment();
						for(var i in json){
		//						console.log(json.time,json.conntent);
							if(i<5){
								var time = json[i].time.slice(0,10);				
								$(frag).prepend("<dd class='comNoticeConnect'>"+
								"<a href='##'>"+
									"<i></i>"+
									"<span>"+json[i].title+"</span>"+
									"<span>"+time+"</span>"+
								"</a>"+
								"</dd>"
								);
							}
								
					}
						$(j.nodeName).append($(frag));
					},
					error:function(xml,status,error){
						alert("请稍后重试");
						console.log(error);
					}
				});
			},
			
			constructor:index_notice
		}
		
		var comnotice = new index_notice({
			el:"#comNotice",
			type:'get',
			url:'json/comNotice.json',
			nodeName:'.comNotice'
		});
		
		var rules = new index_notice({
			el:"#rules",
			type:'get',
			url:'json/rules.json',
			nodeName:'.rules'
		});
	}
}

//规章制度
var rules = {
	init: function(){
		$.ajax({
			type:"post",
			url:"php/rules.php",
			dataType: "json",
			success: function(arr){
				var frag = document.createDocumentFragment();
				for(var i=0; i<arr.length;i++){
					var json = $.parseJSON(arr[i]);
					
					var time = json.time.slice(0,10);
					
					$(frag).prepend("<dd class='comNoticeConnect'>"+
					"<a href='##'>"+
						"<i></i>"+
						"<span>"+json.title+"</span>"+
						"<span>"+time+"</span>"+
					"</a>"+
					"</dd>"
					);
				}
				$(".rules").append($(frag));
			},
			error: function(XMLHttpRequest,textStatus,errorThrown){
				//console.log(XMLHttpRequest,textStatus,errorThrown);
				alert("规章制度--服务忙，请稍后重试2!");
			}
		});
	}
}

//消息中心
var allBtnAndOneBtn = {
	init: function(){
		//显示全部、收起
		$(".allBtn").click(function(){
			var div = $(this).parent().find("div")[0];
			var p = $(this).parent().find("p");
			$(div).css("height","auto");
			$(p).removeClass();
			$(div).css("width","1100px");
			$(this).hide();
			$(this).parent().find(".oneBtn").show();
		})
		
		$(".oneBtn").click(function(){
			var div = $(this).parent().find("div")[0];
			var p = $(this).parent().find("p");
			$(div).css("height","30px");
			$(p).addClass("hidden");
			$(div).css("width","995px");
			$(this).hide();
			$(this).parent().find(".allBtn").show();
		})
	}
}

var paging = {
	init: function(){
		$(".tcdPageCode").createPage({
	        pageCount:12,
	        current:1,
	        backFn:function(p){
//	            console.log(p);
	        }
	    });
	}
}

//公司公告
var timeTable = {
	init: function(){
		function holidayDate(json){
			this.init(json);
		};
		holidayDate.prototype={
			tableHtml:'<table class="table" cellspacing="0" cellpadding="0"></table>',
			init:function(json){
				var that=this;
				var el=$(json.el);
				var tableNode=$(this.tableHtml);
				$.ajax({
					type:json.type?json.type:"get",
					url:json.url,
					data:json.data?json.data:"",
					dataType:"json",
					success:function(json){
						//第一行
						tableNode.append('<tr><td colspan="7">'+json.year+'年'+json.holidayName+'放假安排（'+json.month+'月）</td></tr>');
						//第二行
						tableNode.append('<tr><td>周一</td><td>周二</td><td>周三</td><td>周四</td><td>周五</td><td>周六</td><td>周日</td></tr>');
						//第三到八行——日期行
						
						that.createDate(json,tableNode);

						el.append(tableNode);
					},
					error:function(xml,status,error){
						alert("请稍后重试");
						console.log(error);
					}
				});
			},
			createDate:function(json,tableNode){//第三到八行——日期行
				var holidayDate=new Date(json.year+"/"+(Number(json.month))+"/"+json.date);//相当于"2015/9/27"这里9是指9月
				var holidayWeek=holidayDate.getDay();
				var dValue=json.date%7;//差距的星期天数
				var firstDayWeek;//月份第一天是星期几
				if(holidayWeek==0)
					holidayWeek=7;//日期返回0表示周日，强制变为数字7
				firstDayWeek=holidayWeek-dValue+1;//星期几//返回是1-7

				var boolNum=0;//0表示提示假期的文字不需要换行，1表示换行写提示假期文字
				var forNum=0;//一个月有几天，即循环次数
				if(json.month==2)
				{
					if(json.year%4==0)//闰年
						forNum=29;
					else
						forNum=28;
				}
				else
				{
					if(json.month==1 || json.month==3 || json.month==5 || json.month==7 || json.month==8 ||  json.month==10 ||  json.month==12)
						forNum=31;
					else
						forNum=30;
				}

				//赋值boolNum
				if((forNum==28 && firstDayWeek>4) || (forNum==29 && firstDayWeek>3) || (forNum==30 && firstDayWeek>2) || (forNum==31 && firstDayWeek>1)){
					boolNum=1;
				}

				//假日信息
				var holidayNum=json.holiday.length-1;//假日天数
				var holidayOverMonth;//上班的日子，记录月，可能跨月
				var holidayOverDate=Number(json.holiday[holidayNum])+1;//上班的日子，记录日，可能跨月
				if(holidayOverDate>forNum){
					holidayOverMonth=Number(json.month)+1;
					holidayOverDate=1;
				}else
					holidayOverMonth=json.month;

				var holidayStr=json.month+"月"+json.holiday[0]+"日至"+json.month+"月"+json.holiday[holidayNum]+"日放假"+(holidayNum+1)+"天，"+holidayOverMonth+"月"+holidayOverDate+"日上班。";

				//写入日期的html
				var rows=Math.ceil(forNum/7)+boolNum;
				var num=0;//记录日期
				for(var i=0;i<rows;i++){
					tableNode.append('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
					for(var j=0;j<7;j++)
					{
						if(i==0 && firstDayWeek<=j+1)//日期第一排
						{
							num++;
							var tdObj=tableNode.find('tr:last').children('td').eq(j);
							tdObj.text(num);
						}
						else if(i>0 && i<rows-1)
						{
							num++;
							var tdObj=tableNode.find('tr:last').children('td').eq(j);
							tdObj.text(num);
						}
						else if(i==rows-1){//最后一排
							//console.log(num);
							num++;
							var tdObj=tableNode.find('tr:last').children('td').eq(j);
							if(forNum>=num)
								tdObj.text(num);
							else{
								//console.log(j);
								tdObj.attr('colspan',7-j).text(holidayStr).nextAll('td').remove();
								break;
							}

						}
						//加样式标记
						if(this.boolHoliday(json,num)==='holiday')//放假
						{
							tdObj.addClass('holiday');
						}
						else if(this.boolHoliday(json,num)==="work")
						{
							tdObj.addClass('workDay');
						}
					}
				}
				
			},
			boolHoliday:function(json,dayDate){
				if(dayDate==json.holiday[json.holiday.length-1]+1){
					return 'work';
				}

				for(var i=0;i<json.holiday.length;i++){
					if(json.holiday[i]==dayDate)
					{
						return 'holiday';
					}
				}
			},
			constructor:holidayDate
		};

		var table1=new holidayDate({
			el:"#J_table",
			type:'get',
			url:'json/date.json'
		});

	}
}
