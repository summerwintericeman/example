// 定义一个名为 button-counter 的新组件
Vue.component('propcomponent1', {
	data: function() {
		return {
			mess: "prop的测试1"
		}
	},
	props: [],
	methods: {
		fn() {
			console.log(this.mess);
		}
	},
	template: '<div><div class="headClass back_gradient" v-on:click="fn"> {{ mess }}</div><div></div></div>'
})

Vue.component('propcomponent2', {
	data: function() {
		return {
			mess: "prop的测试2"
		}
	},
	props: [],
	methods: {
		fn() {
			console.log(this.mess);
		}
	},
	template: '<div><div class="headClass back_gradient" v-on:click="fn"> {{ mess }}</div><div></div></div>'
})