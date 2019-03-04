<template>
	<div>
		这里是webpack使用vue的形式，登录组件
		--- {{msg}}
	</div>
</template>

<script>
	export default{
		data(){
			return{
				msg: "123"
			}
		},
		methods:{
			show(){
				console.log("login组件")
			}
		}
	}
	
</script>

<style scoped="scoped">
	div{
		color: red;
	}
</style>