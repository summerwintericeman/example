$(function() {
	var imgList = []; //存放图片的
	$('#fileinput').on("change", function(e) {
		e.preventDefault();
		//现在默认是一个图片 都完成后在考虑多个图片的问题
		var filesLength = $(this)[0].files.length;
		//没有文件上传
		if(filesLength <= 0) {
			return;
		}
		var files = $(this)[0].files[0];
		// 是否支持不支持FileReader
		if(!window.FileReader) {
			return;
		}
		//判断文件是否是图片
		if(/^image/.test(files.type)) {
			var reader = new FileReader();
			// 将图片将转成 base64 格式,并保存在reader中
			reader.readAsDataURL(files);
			// 读取成功后的回调
			reader.onload = function(event) {
				var base64Url = event.target.result; //此步已经获取图片上传后的结果base64编码
				//只需要用img 的src引用即可获得该图片的显示 
				//但是图片的大小还需要处理
				//页面上显示图片
				var img = document.createElement('img');
				img.src = base64Url;
				handleImgSize(img);
			}

		} else {

		}

	})
	//处理图片大小的函数
	function handleImgSize(img) {
		console.log(img.height);
		console.log(img.width);
		if(img.height == 0 && img.width == 0) {
			//
			setTimeout(function() {
				handleImgSize(img);
			}, 500)
		} else if(img.height != 0 && img.width != 0 && (img.height > img.width)) {
			var maxHeigh = img.height,
				maxWidth = img.width,
				endHeight = 400,
				endWidth = parseInt(img.width * 400 / img.height);
			console.log(endWidth)
		} else if(img.height != 0 && img.width != 0 && (img.height < img.width)) {
			var maxHeigh = img.height,
				maxWidth = img.width,
				endWidth = 300,
				endHeight = parseInt(img.height * 300 / img.width);
			console.log(endHeight)
		}
		//获取到图片以后利用canvas压缩图片
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = endWidth;
		canvas.height = endHeight;
		// 核心JS就这个
		context.drawImage(img, 0, 0, endWidth, endHeight);
		var result = canvas.toDataURL()
		
	}

})