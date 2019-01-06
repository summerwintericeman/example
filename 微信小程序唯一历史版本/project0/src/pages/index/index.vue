<template>
	<div class="counter">

		<div class="notgetUserMess" v-show="!getUser">
			<div class="bgimg"></div>
			<!--每一个bgcolor是一种双色球的种类-->
			<form action="" report-submit='true' v-for="(item,index) in dataList" :key='index' @submit="skipDetail(item.lotyId, item.issue, $event)">
				<button form-type="submit" 　class="listButton bgcolor">
			 <div class="imgLeft" style="display: none;">
			 	<img v-bind:src="item.src"/>
			 </div>
			 <div class="messRight">
			 	<div class="allMesstop">
				 	<span class="title">{{item.lotyName}}</span>
				 	 <div class="date">
				 	 　　　<span>{{item.issue}}期　</span>
				 	 　　　<span>{{item.date}}</span>
				 	 <!--{{item.minTime}}时间-->
				 	      <span>({{item.week}})</span>
				 	 </div>
			 	</div>
			 	 
			 	 <div class="ball">
			 	 		<span class="redBall" v-for="(item1,index1) in item.redBall" :key='index1'>{{item1}}</span>
			 	 		<span class="blueBall" v-for="(item2,index2) in item.blueBall" :key='index2'>{{item2}}</span>
			 	 </div>
			 </div>
			 <div class="messDetail">
			 		<div class="arrowRight"></div>
			 </div>
		<!--</div>-->
		</button>
			</form>
			<!--<img src="data:image/png;base64,{{result}}"/>-->
			<div class="resource">本小程序数据来源于:中国福彩网(http://www.cwl.gov.cn)
			</div>
			<div class="menu">
				<div class="shouye" @click="skipIndex">
					<div class="imgShouye"></div>
					<span>首页</span>
				</div>
				<div class="mine" @click="skipMine">
					<div class="imgMine"></div>
					<span>我的</span>
				</div>
			</div>
		</div>
		<!--授权页面-->
		<div class="getUserMess" v-show="getUser">
			<div class="shouquanimg">
				<img src="../../img/index/shouquan.png" />
			</div>
			<div class="tipMess">您需要授权才能使用哦</div>
			<button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">获取授权</button>
		</div>
		<div class="firstGetUser" v-show="firstGetUser">

			<div class="modalMess">
				<div>
					<img src="../../img/index/shouquan.png" />
					<span>我们需要获取您的公开信息（昵称、头像）才能为您提供更好的服务噢</span>
				</div>
				<div>
					<button @click="cancleGetUser">取消</button>
					<button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">授权</button>
				</div>
			</div>

		</div>

	</div>

</template>
<script>
	import card from '@/components/card'
	import main from '@/main'
	import '@/css/common.css'
	export default {
		data() {
			return {
				motto: 'Hello World',
				userInfo: {},
				dataList: [],
				getUser: false,
				firstGetUser: false,
				result: ''
			}
		},

		components: {
			card
		},
		onLoad(options) {
			//修改页面的标题
			wx.setNavigationBarTitle({
				title: '开奖公告'
			})
			//页面分享的跳转
			if(options.lotyId && options.issue && options.lotyName) {
				wx.navigateTo({
					url: '/pages/counter/main?lotyId=' + options.lotyId + '&issue=' + options.issue + '&lotyName=' + options.lotyName
				})
			}
		},
		mounted() {
			// 一进来看看用户是否授权过
			this.getSetting();

		},
		methods: {
			getSetting() {
				var that = this;
				wx.getSetting({
					success: function(res) {
						if(res.authSetting['scope.userInfo']) {
							wx.getUserInfo({
								success: function(res) {
									//console.log(res.userInfo)
									//用户已经授权过
									//console.log('用户已经授权过');
									that.getUser = false;
									that.firstGetUser = false;
								}
							})
						} else {
							//console.log('用户还未授权过');
							//that.getUser = true;           
							var value = wx.getStorageSync('firstCancel') || 0;
							if(value == 0) {
								that.firstGetUser = true;
								that.getUser = false;
							} else {
								that.firstGetUser = false;
								that.getUser = true;
							}

						}
					}
				})
			},
			getUserInfo1() {
				this.firstGetUser = false;
				console.log('click事件首先触发')
				// 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
				// console.log(wx.canIUse('button.open-type.getUserInfo'))
				if(wx.canIUse('button.open-type.getUserInfo')) {
					// 用户版本可用
				} else {
					console.log('请升级微信版本')
				}
			},
			bindGetUserInfo(e) {
				this.firstGetUser = false;
				var that = this;
				// console.log(e.mp.detail.rawData)
				if(e.mp.detail.rawData) {
					//用户按了允许授权按钮
					console.log('用户按了允许授权按钮');
					that.getUser = false;
					wx.setStorage({
						key: "firstCancel",
						data: 0
					})
				} else {
					//用户按了拒绝按钮
					console.log('用户按了拒绝按钮');
					//第一次需要存储但是还给用户使用第二次才需要进入授权
					var value = wx.getStorageSync('firstCancel') || 0;
					if(value == 0) {
						//表示是第一次进入页面点击的取消
						that.getUser = false;
					} else {
						that.getUser = true;
					}

				}
			},
			bindViewTap() {
				const url = '../../logs/main'
				wx.navigateTo({
					url
				})
			},
			getUserInfo() {
				var that = this;
			},
			skipDetail(lotyId, issue, event) {
				//console.log(event.mp.detail.formId);
				//收集formId的函数
				main.getFormIds(event.mp.detail.formId);
				console.log('跳转到详情');
				//console.log(lotyId);
				//console.log(issue);
				wx.navigateTo({
					url: '/pages/counter/main?lotyId=' + lotyId + '&issue=' + issue
				})
			},
			skipMine() {
				console.log('跳转到我的');
				wx.redirectTo({
					url: '/pages/mine/main'
				})
			},
			skipIndex() {
				var pages = getCurrentPages() //获取加载的页面
				var currentPage = pages[pages.length - 1] //获取当前页面的对象
				var URL = currentPage.route;
				console.log(URL)
				if(URL != 'pages/index/main') {
					console.log('跳转到首页');
					wx.redirectTo({
						url: '/pages/index/main'
					})
				}

			},
			getData() {
				var that = this;
				wx.request({
					url: 'https://api.lottery666.com/info/wechatAward/', //接口地址https://api.lottery666.com/info/award/
					data: {
						identity: 'com.houcai.letoula',
						platform: '3'
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function(res) {
						console.log(res.data.data);
						for(var i = 0; i < res.data.data.length; i++) {
							var lotyName = '双色球';
							var timeStr = res.data.data[i].date;
							var time = '';
							var minTime = "21:30";
							var week = '';
							if(timeStr) {
								time = timeStr.slice(4, 6) + '月' + timeStr.slice(6, 8) + '日';
							}
							var getData = main.getTimeWeek(res.data.data[i].date, res.data.data[i]);
							week = getData[0];
							minTime = getData[1];
							var temp = {
								week: week,
								minTime: minTime,
								date: time,
								issue: res.data.data[i].issue,
								lotyId: res.data.data[i].lotyId,
								src: require('../../img/index/1.png'),
								openCode: res.data.data[i].openCode,
								redBall: [],
								blueBall: [],
								lotyName: lotyName
							};
							var codeStr = res.data.data[i].openCode;
							var List1 = [];
							if(codeStr) {
								List1 = codeStr.split('|');
								var List2 = List1[0].split(',');
								var List3 = [];
								if(List1.length > 1) {
									List3 = List1[1].split(',');
								} else {
									List3 = [];
								}
							}
							temp.redBall = List2;
							temp.blueBall = List3;
							if(res.data.data[i].lotyId == 10) {
								temp.lotyName = '双色球';
								temp.src = require('../../img/index/1.png');
								temp.minTime = "21:20";
								that.dataList.push(temp);
							}
							if(res.data.data[i].lotyId == 11) {
								temp.lotyName = '大乐透';
								temp.src = require('../../img/index/2.png');
								temp.minTime = "20:35";
								that.dataList.push(temp);
							}
							if(res.data.data[i].lotyId == 12) {
								temp.lotyName = '福彩3D';
								temp.src = require('../../img/index/3.png');
								temp.minTime = "21:26";
								that.dataList.push(temp);
							}
							if(res.data.data[i].lotyId == 13) {
								temp.lotyName = '排列三';
								temp.src = require('../../img/index/4.png');
								temp.minTime = "20:36";
								that.dataList.push(temp);
							}
							if(res.data.data[i].lotyId == 14) {
								temp.lotyName = '排列五';
								temp.src = require('../../img/index/5.png');
								temp.minTime = "20:36";
								that.dataList.push(temp);
							}
							if(res.data.data[i].lotyId == 15) {
								temp.lotyName = '七星彩';
								temp.src = require('../../img/index/6.png');
								temp.minTime = "20:34";
								that.dataList.push(temp);
							}
							if(res.data.data[i].lotyId == 16) {
								temp.lotyName = '七乐彩';
								temp.src = require('../../img/index/7.png');
								temp.minTime = "21:26";
								that.dataList.push(temp);
							}
						}
						console.log(that.dataList);
					}
				})
			},
			cancleGetUser() {
				console.log('需要存储');
				this.firstGetUser = false;
				wx.setStorage({
					key: "firstCancel",
					data: 1
				})
			}
		},
		created() {
			// 调用应用实例的方法获取全局数据
			this.getData();
			this.getUserInfo();
		}
	}
</script>

<style scoped>
	.allMesstop{
		height: 32px;
		width: 100%;
		overflow: hidden;
		line-height: 32px;
		color: #666666;
	}
	.date {
		width: 100%;
		line-height: 35px;
	}
	
	.date span {
		float: left;
	}
	.allMesstop .date{
		height: 100%;
		/*line-height: 32px;*/
	}
	.allMesstop .date span{
		height: 100%;
	}
	.firstGetUser {
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
	}
	
	.modalMess {
		padding-top: 20px;
		width: 70%;
		height: 170px;
		background: #FFFFFF;
		position: absolute;
		top: 30%;
		left: 15%;
		border-radius: 5px;
	}
	
	.modalMess div:nth-child(1) {
		line-height: 25px;
		padding: 0 3%;
	}
	
	.modalMess div:nth-child(1) img {
		height: 50px;
		width: 50px;
		display: block;
		margin: 0 auto;
	}
	
	.modalMess div:nth-child(1) span {
		height: 25px;
		line-height: 25px;
	}
	
	.modalMess div:nth-child(2) {
		height: 40px;
		border-top: 1px solid #e4e4e4;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		position: absolute;
		bottom: 0px;
		width: 100%;
	}
	
	.modalMess div:nth-child(2) button:nth-child(1) {
		border-right: 1px solid #e4e4e4;
		border-bottom-left-radius: 5px;
	}
	
	.modalMess div:nth-child(2) button:nth-child(2) {
		color: #429448;
		border-bottom-right-radius: 5px;
	}
	
	.modalMess div:nth-child(2) button {
		line-height: 40px;
		border-radius: 0;
		box-sizing: border-box;
		height: 40px;
		width: 50%;
		background-color: white;
	}
	
	.counter {}
	
	.listButton {
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding-left: 0px;
		padding-right: 0px;
		box-sizing: border-box;
		text-decoration: none;
		border-radius: 0px;
		font-size: 12px;
		-webkit-tap-highlight-color: transparent;
		background-color: transparent;
		line-height: 1;
	}
	
	
	
	.resource {
		color: #999999;
		font-size: 11px;
		text-align: center;
		height: 40px;
		line-height: 40px;
		position: fixed;
		bottom: 50px;
		width: 100%;
		background-color: white;
	}
	
	.notgetUserMess {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		padding-bottom: 100px;
		overflow-y: scroll;
	}
	
	.getUserMess {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		background-color: white;
	}
	
	.shouquanimg {
		height: 300px;
		width: 100%;
		position: relative;
	}
	
	.shouquanimg img {
		height: 109px;
		width: 109px;
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
	}
	
	.bgimg {
		position: fixed;
		z-index: -1;
		top: 0;
		height: 60px;
		width: 100%;
		background-image: url(../../img/index/bg.png);
		background-repeat: no-repeat;
		background-position: 0 0px;
		background-size: 100% 100%;
	}
	
	.counter {
		width: 100%;
		height: 100%;
		padding-top: 10px;
		padding-bottom: 10px;
		font-size: 12px;
		/*background-color: #f1f0f5;*/
	}
	
	.bgcolor {
		box-sizing: border-box;
		width: 100%;
		padding: 10px 12px;
		background-color: #ffffff;
		height: 89px;
		margin: 0px auto;
		border-bottom: 1px solid #e1e1e1;
	}
	
	.bgcolor:nth-child(8) {}
	
	.imgLeft {
		width: 15%;
		height: 100%;
		float: left;
	}
	
	.imgLeft img {
		margin-top: 10px;
		display: block;
		width: 45px;
		height: 45px;
	}
	
	.messRight {
		width: 93%;
	}
	
	.messDetail {
		float: left;
	}
	
	.bgcolor .messRight {
		padding-left: 7px;
	}
	
	.bgcolor .messRight .title {
		text-align: left;
		display: block;
		font-size: 16px;
		color: black;
		font-weight: bold;
		float: left;
		/*width: 20%;*/
		margin-right: 9px;
	}
	.bgcolor .messRight .date{
		float: left;
		width: 80%;
	}
	.messRight .ball {
		margin-top: 5px;
	}
	
	.messRight .ball span {
		margin-right: 6px;
		height: 26px;
		width: 26px;
		line-height: 26px;
	}
	
	.menu {
		background-color: white;
		padding-top: 6px;
		position: fixed;
		bottom: 0;
		border-top: 1px solid #cdcdcf;
		height: 45px;
		width: 100%;
	}
	
	.shouye {
		float: left;
		width: 50%;
		height: 100%;
	}
	
	.mine {
		float: left;
		width: 50%;
		height: 100%;
	}
	
	.shouye>div,
	.mine>div {
		height: 25px;
		width: 25px;
		margin: 0 auto;
	}
	
	.shouye div {
		border-radius: 50%;
		background-image: url(../../img/index/shouye.png);
		background-size: 60% 60%;
		background-repeat: no-repeat;
		background-position: center;
		background-color: #e73b17;
	}
	
	.mine div {
		border-radius: 50%;
		background-image: url(../../img/index/mine.png);
		background-size: 60% 60%;
		background-repeat: no-repeat;
		background-position: center;
		background-color: #989898;
	}
	
	.shouye span {
		color: #e73b17;
	}
	
	.shouye>span,
	.mine>span {
		display: block;
		width: 100%;
		text-align: center;
	}
	
	.tipMess {
		width: 100%;
		line-height: 15px;
		height: 15px;
		text-align: center;
		position: absolute;
		top: 210px;
		font-size: 15px;
		color: #666666;
		font-weight: 400;
	}
</style>