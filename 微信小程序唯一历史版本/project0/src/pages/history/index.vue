<template>
	<scroll-view class="counter" :style="{'height': screenHeight + 'px'}" :scroll-y="true" @scrolltolower="scrolltolower" @scroll="scroll">
		<div class="bgcolor" v-for="(item,index) in dataList1" :key='index' @click="skipDetail(lotyId, item.issue)">
			<div class="messRight">
				<span>{{item.issue}}期</span>
				<span>{{item.date}}</span>
				<span>{{item.minTime}}({{item.week}})</span>
				<div class="ball">
					<span class="redBall" v-for="(item1,index1) in item.redBall" :key='index1'>{{item1}}</span>
					<span class="blueBall" v-for="(item2,index2) in item.blueBall" :key='index2'>{{item2}}</span>
				</div>
			</div>
			<div class="messDetail">
				<div class="arrowRight"></div>
			</div>
		</div>
	</scroll-view>
</template>
<script>
	import card from '@/components/card'
	import main from '@/main'
	import '@/css/common.css'
	export default {
		data() {
			return {
				lotyId: '',
				lotyName: '',
				userInfo: {},
				dataList1: [],
				scrollHeight: 80,
				scrollNum: 2,
				screenHeight: 670
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
								this.userInfo = res.userInfo
							}
						})
					}
				})
			},
			skipDetail(lotyId, issue) {
				console.log('跳转到详情');
				console.log(lotyId);
				wx.redirectTo({
					url: '/pages/counter/main?lotyId=' + lotyId + '&issue=' + issue
				})
			},
			getData() {
				var that = this;
				wx.request({
					url: 'https://api.lottery666.com/info/award/' + that.lotyId,
					data: {
						identity: 'com.houcai.letoula',
						platform: '3',
						limit: 10,
						issue: 0
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function(res) {
						//console.log(res.data.data);
						var tempList = [];
						for(var i = 0; i < res.data.data.length; i++) {
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
							var week = '';
							var minTime = "21:30";
							var getData = main.getTimeWeek(res.data.data[i].date, res.data.data[i].lotyId);
							week = getData[0];
							minTime = getData[1];
							tempList.push({
								minTime: minTime,
								week: week,
								date: res.data.data[i].date,
								issue: res.data.data[i].issue,
								redBall: List2,
								blueBall: List3
							})
						}
						//console.log(tempList)
						that.dataList1 = tempList;
					}
				})
			},
			getScrollData() {
				var that = this;
				wx.request({
					url: 'https://api.lottery666.com/info/award/' + that.lotyId,
					data: {
						identity: 'com.houcai.letoula',
						platform: '3',
						limit: 10,
						issue: 0,
						page: that.scrollNum
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function(res) {
						that.scrollNum = that.scrollNum + 1;
						console.log(res.data.data);
						var tempList = [];
						for(var i = 0; i < res.data.data.length; i++) {
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
							var week = '';
							var minTime = "21:30";
							var getData = main.getTimeWeek(res.data.data[i].date, res.data.data[i].lotyId);
							week = getData[0];
							minTime = getData[1];
							that.dataList1.push({
								minTime: minTime,
								week: week,
								date: res.data.data[i].date,
								issue: res.data.data[i].issue,
								redBall: List2,
								blueBall: List3
							})
						}
					}
				})
			},
			scrolltolower() {
				//console.log("到底部");
				this.getScrollData();	
			},
			scroll() {
			}
		},
		created() {
			// 调用应用实例的方法获取全局数据
			this.getUserInfo()
		},
		onLoad(option) {
			//修改页面的标题
			wx.setNavigationBarTitle({
				title: '历史开奖'
			})
			console.log(option);
			var lotyId = option.lotyId;
			var lotyName = main.getName(lotyId);
			this.lotyName = lotyName;
			this.lotyId = lotyId;
			//调用接口获取数据
			this.getData();
			//获取屏幕高度
			console.log(wx.getSystemInfoSync().windowHeight);
			this.screenHeight = wx.getSystemInfoSync().windowHeight;
		},
	}
</script>

<style scoped>
	page {
		height: 100%;
	}
	
	.counter {
		width: 100%;
		/*padding-top: 10px;*/
		padding-bottom: 10px;
		font-size: 12px;
		background-color: #f1f0f5;
	}
	
	.bgcolor {
		box-sizing: border-box;
		width: 96%;
		padding: 10px 12px;
		background-color: #ffffff;
		height: 100px;
		margin: 10px auto;
		border-radius: 7px;
		/*box-shadow: 0px 0px 15px #edd1d3;*/
	}
	
	.messRight {
		float: left;
		width: 90%;
	}
	
	.messDetail {
		float: right;
		width: 5%;
		height: 100%;
		position: relative;
	}
	
	.bgcolor .messRight {
		box-sizing: border-box;
		padding-top: 13px;
	}
	
	.bgcolor .messRight>span {
		margin-right: 10px;
		color: black;
	}
	
	.messRight .ball {
		margin-top: 8px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	
	.messRight .ball:nth-last-child(1) {}
	
	.messRight .ball>span {
		margin-right: 5px;
		color: white;
		height: 35px;
		width: 35px;
		display: block;
		float: left;
		border-radius: 50%;
		text-align: center;
		line-height: 35px;
	}
	
	.messDetail .arrowRight {
		height: 10px;
		width: 10px;
		border-top: 1px solid #e5e5e5;
		border-right: 1px solid #e5e5e5;
		transform: rotate(45deg);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		border-color: #cccccc;
	}
	
	.messDetail .arrowRight:active {
		border-color: #fb724b;
	}
</style>