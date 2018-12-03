//******************************************************
//getFormatDate(1542421075000, "yyyy-mm-dd-h-m-s");
//getFormatDate(1542421075000, "yyyy-mm-dd-h-m");
//getFormatDate(1542421075000, "yyyy-mm-dd-h");
//getFormatDate(1542421075000, "yyyy-mm-dd");
//getFormatDate(1542421075000, "yyyy-mm");
//getFormatDate(1542421075000, "year");
//getFormatDate(1542421075000, "month");
//getFormatDate(1542421075000, "day");
//getFormatDate(1542421075000, "hour");
//getFormatDate(1542421075000, "minute");
//getFormatDate(1542421075000, "second");
//******************************************************   

//封装的事件函数用来实现时间戳转换年月日时分秒组合时间和周几   才采用$.fn的方式进行插件封装，其实完全可以用js文件解决这里只是卫视实验封装

;
(function($) {
	$.fn.getFormatDate = function(timestamp, model) {
		timestamp = "" + timestamp;
		if(timestamp.length == 13) {
			timestamp = parseInt(timestamp);
		} else if(timestamp.length == 10) {
			timestamp = parseInt(timestamp + '000');
		}
		
		var newDate = new Date(timestamp);
		switch(model) {
			case "year":
				return newDate.getFullYear();
				break;
			case "month":
				return newDate.getMonth() + 1;
				break;
			case "day":
				return newDate.getDate();
				break;
			case "hour":
				return newDate.getHours();
				break;
			case "minute":
				return newDate.getMinutes();
				break;
			case "second":
				return newDate.getSeconds();
				break;
			case "yyyy-mm":
				return newDate.getFullYear() + "-" + (newDate.getMonth() + 1);
				break;
			case "yyyy-mm-dd":
				return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
				break;
			case "yyyy-mm-dd-h":
				return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours();
				break;
			case "yyyy-mm-dd-h-m":
				return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes();
				break;
			case "yyyy-mm-dd-h-m-s":
				return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
				break;
			case "week":
				var dateTime = newDate + "",
				gameTime = '',
		    	dateTime =  dateTime.slice(0,3);
		    	switch(dateTime){
				 	 case "Mon": 
				 	 gameTime = "星期一";
				 	 break;
				 	 case "Tue": 
				 	 gameTime = "星期二";
				 	 break;
				 	 case "Wed": 
				 	 gameTime = "星期三";
				 	 break;
				 	 case "Thu": 
				 	 gameTime = "星期四";
				 	 break;
				 	 case "Fri": 
				 	 gameTime = "星期五";
				 	 break;
				 	 case "Sat": 
				 	 gameTime = "星期六";
				 	 break;
				 	 case "Sun": 
				 	 gameTime = "星期日";
				 	 break;
				}
		    	return gameTime;
		    	break;
		}
	}
})(jQuery);