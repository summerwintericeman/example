$(function() {
	var imgList = []; //存放图片的
	$('#fileinput').on("change", function(e) {
		e.preventDefault();
		//现在默认是一个图片 都完成后在考虑多个图片的问题
		var filesLength = $(this)[0].files.length;
		//没有文件上传
		if(filesLength <= 0) {
			return;
		} else if(filesLength > 4) {
			console.log("最多传四张图片")
			return;
		}
		// 是否支持不支持FileReader
		if(!window.FileReader) {
			return;
		}
		for(var i = 0; i < filesLength; i++) {
			var files = $(this)[0].files[i];
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
					img.onload = function() {
						handleImgSize(img);
					}
				}

			} else {
				console.log("非图片文件")
			}
		}

	})
	//处理图片大小的函数
	function handleImgSize(img) {
		
	}
	
	function showImg(){
		var html = "";
		for(var i = 0; i < imgList.length; i++){
			html += '<img id="img'+ i + '" src="'+ imgList[i] + ' "/>';
		}
		$("#imgAll").html(html)
	}
})