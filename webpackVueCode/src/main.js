//导入vue  注意这里导入的包说不的完整的，script直接引入的是完整的，
import Vue from 'vue';  //此种办法 需要在webpack.config.js中进行修改
//import Vue from '../node_modules/vue/dist/vue.js';//因此采用这种的办法


//webpack导入组件的形式  使用不完整的vue引入形式，需要这样引入组件
import login from "./login.vue"; 
//默认 webpack 无法打包 .vue文件  需要安装 相关的 loader插件  vue-loader vue-template-compiler 
//配置文件中 新增 配置 方法  {test: /\.vue$/,use: "vue-loader"}

var vm = new Vue({
	 el: "#app",
	 data:{
	 	msg: "123"
	 },
	 methods:{
	 	
	 },
	 render: function(createElements){
	 	return createElements(login)
	 }
})
