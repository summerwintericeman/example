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

//封装的事件函数用来实现时间戳转换年月日时分秒组合时间和周几   才采用$.fn.extend()的方式进行插件封装，可以封装动态的

//$.extend()的方法  只能封装静态的文件  对于一般的js代码可以静态封装，需要创建示例并哟关于节点的需要动态封装
;
(function($) {
	$.fn.getFormatDate = function(timestamp, model) {
		timestamp = "" + timestamp;
		if(timestamp.length == 13) {
			timestamp = parseInt(timestamp);
		} else if(timestamp.length == 10) {
			timestamp = parseInt(timestamp + '000');
		}

		var newDate = new Date(timestamp),
			year = newDate.getFullYear(),
			month = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1),
			day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate(),
			hour = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours(),
			minute = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes(),
			second = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds();
		switch(model) {
			case "year":
				return year;
				break;
			case "month":
				return month;
				break;
			case "day":
				return day;
				break;
			case "hour":
				return hour;
				break;
			case "minute":
				return minute;
				break;
			case "second":
				return second;
				break;
			case "yyyy-mm":
				return year + "-" + month;
				break;
			case "yyyy-mm-dd":
				return year + "-" + month + "-" + day;
				break;
			case "yyyy-mm-dd-h":
				return year + "-" + month + "-" + day + " " + hour;
				break;
			case "yyyy-mm-dd-h-m":
				return year + "-" + month + "-" + day + " " + hour + ":" + minute;
				break;
			case "yyyy-mm-dd-h-m-s":
				return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
				break;
			case "week":
				var dateTime = newDate + "",
					gameTime = '',
					dateTime = dateTime.slice(0, 3);
				switch(dateTime) {
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