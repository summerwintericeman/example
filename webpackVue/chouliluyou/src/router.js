import VueRouter from 'vue-router'

import account from "./main/Account.vue"
import goodslist from "./main/Goodslist.vue"



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
export default router;