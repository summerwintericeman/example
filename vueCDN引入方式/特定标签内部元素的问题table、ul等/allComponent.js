// 定义一个名为 button-counter 的新组件
Vue.component('propcomponent1', {
	data: function() {
		return {
			mess: "特定标签内部的元素"
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

Vue.component('blog-post-row', {
	data: function() {
		return {
			mess: "tr内部的元素"
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