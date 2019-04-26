//导入vue  注意这里导入的包说不的完整的，script直接引入的是完整的，
import Vue from 'vue';

//导入App组件
import app from "./App.vue"

import VueRouter from 'vue-router'

import account from "./main/Account.vue"
import goodslist from "./main/Goodslist.vue"

Vue.use(VueRouter)

//创建路由对象
var router = new VueRouter({
	routes: [
		{
			path: '/account',
			component: account
		},
		{
			path: '/goodslist',
			component: goodslist
		}
	]
})

var vm = new Vue({
	el: "#app",
	render: c => c(app),
	router//router挂载
})


//app是通过 vm实例的 render 渲染的   只能放在 el 对应的位置上 

// account 等组件是通过 路由组件匹配监听的 只能放在 router-view 中