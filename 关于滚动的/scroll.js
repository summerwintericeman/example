;
(function($) {
	$.fn.ScrollFn = function(containNote, endHeight, callback) {
		//console.log(this);//代表视口也就是总体的节点
		//确定 1：滚动元素 -- 具有较高的高度  2：固定元素即窗口高度 固定的高度 里面嵌套滚动元素
		//总体的思路是 滚动的距离 + 窗口高度 应该和 滚动元素的高度相当 这时候元素元素刚好滚动到底部  再次基础上可以调整灵敏度
		var view = $(this);
		var viewHeight = view.height(); //窗口的高度 
		view.css({
			"overflow-y": "scroll"
		})
		var endHeight = endHeight; //距离底部的距离  
		var contain = $(containNote);
		var containHeight = contain.height(); //滚动元素的高度
		var scrollTimer = '';
		view.scroll(function(e) {
			if(scrollTimer) {
				clearTimeout(scrollTimer);
			}
			scrollTimer = setTimeout(function() {
				var scrollHeight = e.currentTarget.scrollTop; //滚动的高度
				//窗口的高度 + 滚动的高度   =  滚动元素的高度
				var result = parseInt(containHeight) - parseInt(viewHeight) - parseInt(scrollHeight) - endHeight;
				console.log(result);
				if(result <= 0) {
					console.log("距离底部" + endHeight + "px");
					callback();
				}
			}, 300)
		})
		//去到某个滚动位置的函数
		function goScrollPosition(num) {
			view.scrollTop(num);
		}
	}
})(jQuery);