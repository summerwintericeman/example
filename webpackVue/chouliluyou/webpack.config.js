const path = require('path');
//启用热更新需要 引入webpack  第二部
const webpack = require("webpack");

//把html文件也通过内存访问的插件   只要是插件到需要放到 plugins中
const htmlWebpackPlugin = require("html-webpack-plugin")

//15版本的vueloader兼容办法 14版本的不用  
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
	entry: path.join(__dirname,'./src/main.js'),//需要打包的文件
	output:{
		path: path.join(__dirname,'./dist'),//指定打包好的文件的保存目录
		filename: 'bundle.js'//指定输出文件的名称		
	},
	devServer:{//配置 dev-server参数的第二种形式  相对于直接写webpack-dev-server --open --port 8000 --contentBase src --hot
		//webpack-dev-server --open --port 8000 --contentBase src --hot
		open: true,//自动打开浏览器的配置
		port: 3000,//设置启动的端口
		contentBase: "src",//指定托管目录
		hot: true//是否启用热更新  第一步 还需要其他的操作 才能实现热更新
	},
	plugins:[//启用热跟新的第三部
		new webpack.HotModuleReplacementPlugin(),//new一个热更新的模块对象
		new htmlWebpackPlugin({//传递参数  
			template: path.join(__dirname,"./src/index.html"),//生成页面的参考模板页面以此为版本生成内存中的页面
			filename: "index.html"//生成页面的名称 可修改
		}),
		new VueLoaderPlugin()//15版本的兼容办法
	],
	module:{//用于配置所有的第三方模块加载，列入加载css文件
		rules:[//所有第三方模块的匹配规则
			{test: /\.css$/,use:["style-loader","css-loader"]},//匹配所有.css结尾的文件并用所给插件处理
			{test: /\.less$/,use:["style-loader","css-loader","less-loader"]},//使用less文件  less文件也许要 css 和style
			{test: /\.scss$/,use:["style-loader","css-loader","sass-loader"]},//使用less文件  less文件也许要 css 和style
			{test: /\.(jpg||png||gif||jpeg||bmp)$/,use:"url-loader?limit=21248&name=[hash:8]-[name].[ext]"},//webpack默认只识别js引入不支持url，使用url-loader处理所有的url引入问题，还需要支持url 的file-loader
			//传参数 类似 url 传参   图片默认被识别成base64  图片大于则是链接 小于则base64 name=[name].[ext]前后文件名一致 但是不同文件夹文件名一样的时候会出现问题 因此还需要增加哈希值来区别  [hash:8]-[name].[ext]  [hash:8]哈希有32位截取前8位
			{test: /\.(ttf||eot||svg||woff||woff2)$/,use:'url-loader'},//处理字体文件的
			{test: /\.js$/,use:'babel-loader',exclude:/node_modules/},//配置babel转换es6的办法
			{test: /\.vue$/,use: "vue-loader"}//处理.vue文件 
		]
		
	},
	resolve:{//可以解决vue引入的包是不全的包的问题   设置vue 被导入时的包的路径
		alias:{
//			"vue": "vue/dist/vue.js"
		}
	}
}
