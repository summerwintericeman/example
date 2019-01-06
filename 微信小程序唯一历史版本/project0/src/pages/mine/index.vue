<template>
	<div class="counter">
		<div class="userMess">
			<div class="userImg">
				<img v-bind:src="avatarUrl" />
			</div>
			<div class="nickName">{{nickName}} </div>
		</div>
		<div class="linkList">
			<div @click="skipMyOrder" style="display: none;">
				<span></span>
				<span class="secondSpan">我的订阅</span>
				<span class="thirdSpan"></span>
			</div>
			<div v-show="kuaisu">
				<span></span>
				<span class="secondSpan">
					<navigator target="miniProgram" open-type="navigate" app-id="wx06208eb636fa898b" path="pages/index/main" extra-data="" version="release">快速选号</navigator>
				</span>
				<span class="thirdSpan"></span>
			</div>
			<div>
				<span></span>
				<span class="secondSpan">
					<button open-type="share">推荐好友</button>
				</span>
				<span class="thirdSpan"></span>
			</div>
			<div @click="skipHaoCai" v-show="jinri">
				<span></span>
				<span class="secondSpan">
					<div>今日好彩</div>
				</span>
				<span class="thirdSpan"></span>
			</div>
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

</template>
<script>
	import card from '@/components/card'

	export default {
		data() {
			return {
				userInfo: {},
				avatarUrl: '',
				nickName: '',
				kuaisu: false,
				jinri: false,
			}
		},

		components: {
			card
		},

		methods: {
			bindViewTap() {
				const url = '../logs/main'
				wx.navigateTo({
					url
				})
			},
			getUserInfo() {
				// 调用登录接口
				wx.login({
					success: () => {
						wx.getUserInfo({
							success: (res) => {
								this.userInfo = res.userInfo;
							}
						})
					}
				})
			},
			skipMine() {
				var pages = getCurrentPages() //获取加载的页面
				var currentPage = pages[pages.length - 1] //获取当前页面的对象
				var URL = currentPage.route;
				console.log(URL)
				if(URL != 'pages/mine/main') {
					console.log('跳转到我的');
					wx.redirectTo({
						url: '/pages/mine/main'
					})
				}

			},
			skipIndex() {
				console.log('跳转到首页');
				wx.redirectTo({
					url: '/pages/index/main'
				})
			},
			skipMyOrder() {
				console.log('跳转到我的定阅');
				wx.navigateTo({
					url: '/pages/myOrder/main'
				})
			},
			skipHaoCai() {
				wx.navigateTo({
					url: '/pages/relativeUrl/main'
				})
				//				wx.redirectTo({
				//					url: '/pages/relativeUrl/main'
				//				})
			},
		},
		created() {
			// 调用应用实例的方法获取全局数据
			this.getUserInfo()
		},
		onShareAppMessage(res) {
			if(res.from === 'button') {
				// 来自页面内转发按钮
				console.log(res.target)
			}
			return {
				title: '今天中了么',
				//    path: '/pages/mine/main'
				path: '/pages/index/main',
				imageUrl: 'https://dev-upload-1256413295.cos.ap-guangzhou.myqcloud.com/worldcup/2018/07/04/1530690142584.png'
			}
		},
		onLoad() {
			//修改页面的标题
			wx.setNavigationBarTitle({
				title: '我的'
			});

			var that = this;
			console.log('调用函数获取用户信息');
			wx.getSetting({
				success: function(res) {
					if(res.authSetting['scope.userInfo']) {
						wx.getUserInfo({
							success: function(res) {
								console.log(res.userInfo)
								that.nickName = res.userInfo.nickName;
								that.avatarUrl = res.userInfo.avatarUrl;
							}
						})
					}
				}
			})
			//线上测试https://api.debug.lottery666.com/miniapp/islocal
			var that = this;
			wx.request({
				url: "https://api.lottery666.com/miniapp/islocal",
				header: {
					'content-type': 'application/json' // 默认值
				},
				success: function(res) {
					console.log(res.data.data.islocal);
					if(res.data.data.islocal == 0){
						that.kuaisu = true;
						that.jinri = true;
					}else{
						that.kuaisu = false;
						that.jinri = false;
					}
				}
			})

		}

	}
</script>

<style scoped>
	page {
		height: 100%;
	}
	.other-navigator-hover {
		color: red;
	}
	
	.counter {
		width: 100%;
		height: 100%;
		padding-bottom: 10px;
		font-size: 12px;
	}
	
	.userMess {
		height: 180px;
		width: 100%;
		background: -webkit-linear-gradient(#e73b17, #fd7c04);
		position: relative;
	}
	
	.userImg {
		height: 80px;
		width: 80px;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 30px auto;
		border-radius: 50%;
		background-color: white;
		border: 2px solid #ffbda5;
	}
	
	.userImg img {
		display: block;
		height: 80px;
		width: 80px;
		border-radius: 50%;
	}
	
	.nickName {
		width: 100%;
		text-align: center;
		position: absolute;
		bottom: 30px;
		color: white;
		font-size: 20px;
		font-weight: 500;
	}
	
	.linkList {
		padding: 30px 15px 0px 15px;
	}
	
	.linkList div {
		height: 40px;
		width: 100%;
		box-sizing: border-box;
		position: relative;
		margin-bottom: 8px;
	}
	
	.linkList div span {
		float: left;
		display: block;
		height: 100%;
	}
	
	.linkList div:nth-child(1) span:nth-child(1) {
		width: 40px;
		height: 40px;
		background-image: url(../../img/mine/1.png);
		background-repeat: no-repeat;
		background-size: 50%;
		background-position: center;
	}
	
	.linkList div:nth-child(2) span:nth-child(1) {
		width: 40px;
		height: 40px;
		background-image: url(../../img/mine/jsxh.png);
		background-repeat: no-repeat;
		background-size: 50%;
		background-position: center;
	}
	
	.linkList div:nth-child(3) span:nth-child(1) {
		width: 40px;
		height: 40px;
		background-image: url(../../img/mine/3.png);
		background-repeat: no-repeat;
		background-size: 50%;
		background-position: center;
	}
	
	.linkList div:nth-child(4) span:nth-child(1) {
		width: 40px;
		height: 40px;
		background-image: url(../../img/mine/jrhc.png);
		background-repeat: no-repeat;
		background-size: 50%;
		background-position: center;
	}
	
	.linkList div:nth-child(4) span:nth-child(2) div {
		padding: 0;
	}
	
	.linkList .secondSpan {
		font-size: 16px;
		color: black;
		margin-left: 7px;
		line-height: 40px;
		/*font-weight: 600;*/
		width: 84%;
	}
	
	.linkList .secondSpan button {
		width: 100%;
		text-align: left;
		display: block;
		font-size: 16px;
		/*font-weight: 600;*/
		background-color: transparent;
		border-color: transparent;
		border: none;
		outline: none;
		color: black;
		padding: 0;
	}
	
	.linkList .secondSpan button::after {
		border: 0;
	}
	
	.linkList .thirdSpan {
		height: 8px !important;
		width: 8px;
		border-top: 1px solid #dcdcdc;
		border-right: 1px solid #dcdcdc;
		transform: rotate(45deg);
		position: absolute;
		right: 15px;
		top: 13px;
	}
	
	.menu {
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
		background-color: #989898;
	}
	
	.mine div {
		border-radius: 50%;
		background-image: url(../../img/index/mine.png);
		background-size: 60% 60%;
		background-repeat: no-repeat;
		background-position: center;
		background-color: #e73b17;
	}
	
	.mine>span {
		color: #e73b17;
	}
	
	.shouye>span,
	.mine>span {
		display: block;
		width: 100%;
		text-align: center;
	}
</style>