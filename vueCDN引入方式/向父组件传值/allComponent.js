// 定义一个名为 button-counter 的新组件
Vue.component('propcomponent', {
	data: function() {
		return {
			mess: "prop的测试"
		}
	},
	methods: {
		fn() {
			console.log("触发了函数");
			
			
		}
	},
	template: '<div><div class="headClass" v-on:click="fn"> 点我触发子组件的函数</div>' +
	'<div class="headClass" v-on:click="$emit(\'enlarge\')"> 点我向父组件发消息，调用父组件函数</div>'+
	'<div class="headClass"  v-on:click="$emit(\'enlarge\',0.05)"> 点我向父组件发消息,传递一些参数</div></div>'
})
