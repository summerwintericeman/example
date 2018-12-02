// 定义一个名为 button-counter 的新组件
Vue.component('propcomponent', {
	data: function() {
		return {
			mess: "prop的测试"
		}
	},
	props: ["aa"],
	methods: {
		fn() {
			console.log(this.mess);
		}
	},
	template: '<div><div class="headClass" v-on:click="fn"> {{ mess }}</div><div>{{aa.title}} {{aa.hehe}}</div></div>'
})