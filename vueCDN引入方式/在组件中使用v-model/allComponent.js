// 定义一个名为 button-counter 的新组件
Vue.component('propcomponent', {
	data: function() {
		return {
			mess: "prop的测试"
		}
	},
	props: ['value'],
	methods: {
		fn() {
			console.log("触发了函数");
			
		}
	},
	template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
