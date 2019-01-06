<template>
  <div class="counter-warp">
    
    <div class="details"> 
    	<div class="detailMess">
    		<div class="title">
    			<span>{{lotyName}}</span>
    			<span @click="skipHistory(lotyId, lotyName)"> 历史开奖 </span>
    			<span class="imgLishi"></span>
    		</div>
    		<div>
    			<span>{{issue}}期 </span> 
    			<span>　{{time}}</span>
    			<span>　{{week}}</span>
    		</div>
    		<div class="ball">
			 	 		<span class="redBall" v-for="(item,index) in redBall" :key='index'>{{item}}</span>
			 	 		<span class="blueBall" v-for="(item1,index1) in blueBall" :key='index1'>{{item1}}</span>
			 	 </div>
    	</div>
    	<div class="detailMoney">
    		<div class="sail">
    			<span>本期销售  (元)</span> <br />
    			<span>{{dataList.sales}}</span>
    		</div>
    		<div class="allMoney">
    			<span>奖金奖池  (元)</span><br />
    			<span>{{dataList.prizePool}}</span>
    		</div>
    	</div>
    </div>
    
    <div class="rules">
    	<div class="top">
    		<span>奖项</span>
    		<span>中奖条件</span>
    		<span>中奖注数</span>
    		<span>每注奖金(元)</span>
    	</div>
    	<div v-for="(item,index) in rulesList" :key='index'>
    		<span>{{item.levelName}}</span>
    		<span v-bind:class="{'shortArr': item.short}">{{item.rules}}</span>
    		<span>{{item.awardNum}}</span>
    		<span>{{item.bonus}}</span>
    	</div>
    </div>
    <div class="orderShare">
    	<!--<div class="order"  v-show="order">
    		<form   @submit="orderFun"   report-submit='true'>
    	      <button  form-type="submit"   >订阅</button>
    	  </form>
    	</div>
    	<div class="order order1" v-show="!order" >已订阅</div>-->
    	<div class="share" >
    		 <button open-type="share">分享</button>
    	</div>    	
    </div>
    <div class="confirmShow" v-show="show">
    	<div class="confirmBtn">
    		<div>
    			<span></span>
    			<span>订阅成功</span>
    		</div>
    		<div @click="closeOrder">我知道了</div>
    	</div>
    </div>
    <div class="standdard" v-show="allNotice" >	
    	 <div class="imgSt">
    	 	 <img src="../../img/detail/tishi.png"/>
    	 </div>
       <div class="standOk" v-on:click="allNoticeFn">
       	确定
       </div>
       <div class="standConfirm" v-on:click="changeNotice">
       	 <span>
       	 	 <div v-show="notice"></div>
       	 </span>
       	 <span>不再提示</span>
       </div>
       <div class="standArrow">
       	<img src="../../img/detail/tishi1.png"/>
       </div>
       <div class="orderShare1">
    	    <div class="order">订阅</div>
      </div>
    </div>
    
  </div>
</template>

<script>
// Use Vuex
import store from './store'
import main from '@/main'
export default {
	data () {
		return {
			mess: true,
			allNotice: false,
			notice: false,
			order: true,
			show: false,
			lotyId: '',
			issue: '',
			lotyName: '',
			time: '',
			week: '',
			dataList: [],
			rulesList:[],
			redBall: [],
			blueBall: [],
			condition: [
			  {
			  	lotyId: 10,
			  	condition: [
			  	 '中6红+1蓝','中6红','中5红+1蓝','中5红或4红+1蓝','中4红或3红+1蓝','中2红+1蓝或中1红+1蓝或1蓝'
			  	],
			  	shortArr: [0,0,0,0,0,1]
			  },{
			  	lotyId: 11,
			  	condition: [
			  	 '中5红+2蓝','中5红+2蓝','中5红+1蓝','中5红+1蓝','中5红或4红+2蓝','中5红或4红+2蓝','中4红+1蓝或3红+2蓝','中4红+1蓝或3红+2蓝',
			  	 '中4红或3红+1蓝或2红+2蓝','中4红或3红+1蓝或2红+2蓝','中3红或2红+1蓝或1红2蓝或2蓝'
			  	],
			  	shortArr: [0,0,0,0,0,0,0,0,0,1,1]
			  },{
			  	lotyId: 12,
			  	condition: [
			  	 '投注号码与当期公布的中奖号码的3位按位数全部相同','当期摇出的号码3位数中任意两位数字相同,且投注号码与中奖号码的数字相同顺序不限','摇出三位号码各不相同，且投注号码的三个数字与当期中奖号码相同,顺序不限'
			  	],
			  	shortArr: [1,1,1]
			  },{
			  	lotyId: 13,
			  	condition: [
			  	 '投注号码与当期公布的中奖号码的3位按位数全部相同','当期摇出的号码3位数中任意两位数字相同,且投注号码与中奖号码的数字相同顺序不限','摇出三位号码各不相同，且投注号码的三个数字与当期中奖号码相同,顺序不限'
			  	],
			  	shortArr: [1,1,1]
			  },{
			  	lotyId: 14,
			  	condition: [
			  	 '所选号码与中奖号码全部相同且顺序一致'
			  	],
			  	shortArr: [1]
			  },{
			  	lotyId: 15,
			  	condition: [
			  	 '投注号码和开奖号码全部相符且排列一致','投注号码有连续6位号码与开奖号码相同位置的连续6位号码相同','投注号码有连续5位号码与开奖号码相同位置的连续5位号码相同',
			  	 '投注号码有连续4位号码与开奖号码相同位置的连续4位号码相同','投注号码有连续3位号码与开奖号码相同位置的连续3位号码相同','投注号码有连续2位号码与开奖号码相同位置的连续2位号码相同',
			  	],
			  	shortArr: [1,1,1,1,1,1]
			  },{
			  	lotyId: 16,
			  	condition: [
			  	 '投注号码与当期开奖号码中7个基本号码完全相同,顺序不限','投注号码与当期开奖号码中任意6个基本号码及特别号码相同,顺序不限','投注号码与当期开奖号码中任意6个基本号码相同,顺序不限',
			  	 '投注号码与当期开奖号码中任意5个基本号码及特别号码相同,顺序不限','投注号码与当期开奖号码中任意5个基本号码相同,顺序不限',
			  	 '投注号码与当期开奖号码中任意4个基本号码及特别号码相同,顺序不限','投注号码与当期开奖号码中任意4个基本号码相同,顺序不限',
			  	],
			  	shortArr: [1,1,1,1,1,1,1]
			  }
			]
		}
	},
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    },
    allNoticeFn () {
    	//console.log('隐藏所有的提示')
    	this.allNotice = false;
    },
    changeNotice (){
    	//改变是否显示提示信息
    	this.notice = !this.notice;
    	//存储是否提示的选择
    	var value = 0;
    	if(this.notice){
    		value = 1;
    	}
    	wx.setStorage({
            key:"notice",
            data: value
      }) 
    },
    skipHistory (lotyId) {
      //console.log('跳转到历史记录');
      wx.redirectTo ({
        url: '/pages/history/main?lotyId=' + lotyId 
      })
    },
    orderFun (e) {
    	console.log(e.mp.detail.formId)
    	var formId = e.mp.detail.formId;
    	
    	if(formId = "the formId is a mock one"){
    		//表示是在开发环境没有真正的formId
    		formId = '';
    	}
    	var timestamp = parseInt(new Date().getTime()/1000) + 604800;
    	formId = {
    		formId: formId,
				endTime: timestamp
    	}
    	//获取forId并拼接
    	var value = wx.getStorageSync('formId') || [];
    	if(formId){//防止电脑测试时加入空的formId
    		if(value.length == 30){
          	value.splice(0,1);
        }
    		value.push(formId);
    	}
    	var tempStr = JSON.stringify(value);
//  	for(var i = 0; i < value.length; i++){
//  		if(i == value.length-1 ){
//  			tempStr = tempStr +  value[i] ;
//  		}else{
//  			tempStr = tempStr +  value[i] + ',';
//  		}    		
//  	}
    	var  lotyId = this.lotyId;
    	console.log(lotyId);
    	console.log(tempStr);
    	console.log(formId);
    	//赋予新的formId的值
    	formId = tempStr;    
    	console.log(formId)
//  	表示要订阅
		    wx.login({
        success: (res) => {
        	console.log(res);
        	console.log(res.code);
        	wx.request({
//          url: 'https://api.lottery666.com/miniapp/awardSubscribe',
            url: 'https://api.dev.lottery666.com/miniapp/saveFormIds',
            data: {
              code: res.code,
              opt: 'add',
              loty: lotyId,
              form_id: formId
            },
            method: 'POST',
            success: function(res){
            	console.log(res.data.code);
            	//有请求数据表示已经被订阅过
            	if(res.data.code == 200){
                 console.log('订阅成功'); 
            	}        	
            }
         })
        }
      })
    	//console.log('订阅的函数');
    	var flag = true;
    	try {
       var value = wx.getStorageSync('order');       
       if (value && value.length > 0) {
       	value = JSON.parse(value);
       	console.log(value)
       for(var i = 0; i < value.length; i++){
       	if(lotyId == value[i]){
       		//表示已经是订阅过的
       		flag = false;
       		break;
       	}
       }
       if(flag){//表示没有订阅过
       	 this.show = true;
       	 this.order = false;
       	 value.push(lotyId);
       	 value = JSON.stringify(value);
         wx.setStorage({
           key:"order",
           data: value
         })      	 
       }else{
       	//是否提示已经订阅过
       	console.log('已经订阅过')
       }
     }else{
     	this.show = true;
     	this.order = false;
      var temp = [];
      temp.push(lotyId);
      temp = JSON.stringify(temp)
      wx.setStorage({
        key:"order",
        data: temp
      })
     }
     } catch (e) {

     }
    	
    	
    },
    closeOrder () {
    	//console.log('关闭订阅函数');
    	this.show = false;
    }
  },
  created () {
  	
  },
  onShareAppMessage (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '今天中了么',
      //path: '/pages/counter/main?lotyId=' + this.lotyId + '&issue=' + this.issue + '&lotyName=' + this.lotyName
      path: '/pages/index/main?lotyId=' + this.lotyId + '&issue=' + this.issue + '&lotyName=' + this.lotyName,
      success: function(){
      	console.log('分享成功');     	
      },
      fail: function(){
      	console.log('分享失败');
      }
    }
  },
  onLoad (option) {
  	//修改页面的标题
  	wx.setNavigationBarTitle({
      title: '开奖详情'
    })
  	//判断是否显示提示信息
  	var noticeTemp = wx.getStorageSync('notice'); 
//    	if (noticeTemp) {
//    		//console.log(noticeTemp);
//    		this.allNotice = false;
//    	}else{
//    		this.allNotice = true;
//    	}
  	//console.log(option);
    var lotyId = option.lotyId,
        issue = option.issue,
        lotyName = main.getName(lotyId);
    this.lotyId = lotyId;
    this.issue = issue;
    this.lotyName = lotyName;
    //判断是否订阅过
    this.order = true;
  	var value = wx.getStorageSync('order');       
       if (value && value.length > 0) {
       	value = JSON.parse(value);
       	//console.log(value)
       for(var i = 0; i < value.length; i++){
       	if(lotyId == value[i]){
       		//表示已经是订阅过的
          this.order = false;
       		break;
       	}
       }
		}
		//调用接口获取数据
		var that = this;
		wx.request({
        url: 'https://api.lottery666.com/info/szcawarddetail/' + lotyId + '/' + issue + '&jumpType=zixun', 
        data: {
            identity: 'com.houcai.letoula' ,
            platform: '3'
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function(res) {
        	//console.log(res.data);
        	if(res.data.code == 200){
        		console.log(res.data.data);     		
        		var time = res.data.data.openTime;
        		    time = new Date(time * 1000);
        		var Y = time.getFullYear() + '-',
        		    M = (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1) + '月',
                D = time.getDate() + '号',
                h = time.getHours() + ':',
                m = time.getMinutes(),
                s = time.getSeconds();
            var week = ''; 
            if(time.getDay() == 0) week = '周日' ;
            if(time.getDay() == 1) week = '周一' ;
            if(time.getDay() == 2) week = '周二' ;
            if(time.getDay() == 3) week = '周三' ;
            if(time.getDay() == 4) week = '周四' ;
            if(time.getDay() == 5) week = '周五' ;
            if(time.getDay() == 6) week = '周六' ;   
            that.time = M+D;
            that.week = h+m+'('+ week + ')';
        		that.dataList = res.data.data;
        		//处理规则
        		//console.log(res.data.data.levels)
        		var tempRules = [];
        		var shortArr = [];
        		for(var i = 0 ; i < that.condition.length; i++){
        			if(that.condition[i].lotyId == lotyId){
        				tempRules = that.condition[i].condition;
        				shortArr = that.condition[i].shortArr;
        			}
        			
        		}
        		var allRules = [];
        		for(var i = 0 ; i < res.data.data.levels.length; i++){
        			allRules.push({
        				'levelName': res.data.data.levels[i].levelName,
                'awardNum': res.data.data.levels[i].awardNum,
                'bonus': res.data.data.levels[i].bonus,
                'rules': tempRules[i],
                'short': shortArr[i]
        			})
        		}
        		that.rulesList = allRules;
        		//console.log(allRules);
        		//处理开奖码
        		var codeStr = res.data.data.openCode;
        		var List1 = [];
            if(codeStr){
            		List1 = codeStr.split('|');
            		var List2 = List1[0].split(',');
            		var List3 = [];
            		if(List1.length>1){
            		   	List3= List1[1].split(',');
            		}else{
            		   	List3 = [];
            		}
            	}
            	that.redBall = List2;
            	that.blueBall = List3;	
        	}            
        }
    })
//		    wx.login({
//      success: (res) => {
//      	console.log(res);
//      	console.log(res.code);
//      	wx.request({
//          url: 'https://api.lottery666.com/miniapp/awardSubscribe',
//          data: {
//            code: res.code,
//            opt: 'add',
//            loty: lotyId
//          },
//          method: 'POST',
//          success: function(res){
//          	console.log(res.data.code);
//          	//有请求数据表示已经被订阅过
//          	if(res.data.code == 200){
//          		//表示订阅过
//          	var value = wx.getStorageSync('order');   
//          	console.log(value);
//            if (value && value.length > 0) {
//     	          value = JSON.parse(value);
//     	          console.log(value)
////            for(var i = 0; i < value.length; i++){
////     	          if(lotyId == value[i]){
////     		          //表示记录中已经有了
////                  that.order = false;
////     		          break;
////     	          }
////            }
//		          }
//          	wx.setStorage({
//                key:"order",
//                data: value
//            })  
//          	}
//          	
//
//          }
//       })
//      }
//    })
		
  }
  
}
</script>

<style>
page{
	height: 100%;
	width: 100%;
}
button{
	height: 100%;
	width: 100%;
}
.counter-warp {
	width: 100%;
	height: 100%;
  padding-top: 10px;
  position: relative;
  font-size: 12px;
  background-color: #f1f0f5;
  overflow-y: scroll;
  padding-bottom: 75px;
}
.counter-warp .details{
	box-sizing: border-box;
	padding: 10px 10px 3px 10px;
	width: 96%;
	margin: 0 auto;
	border-radius: 5px;
	background-color: white;
}
.detailMess{
	min-height: 75px;
	padding: 0 4px;
}
.detailMess div:nth-child(2){
	/*margin-top: 8px;*/
	color: #666666;
}
.detailMess .title span:nth-child(1){
	font-size: 17px;
	color: black;
}
.detailMess .title span:nth-child(2){
	margin-top: 3px;
	height: 15px;
	line-height: 15px;
	float: right;
	color: #fa9232;
}
.imgLishi{
	margin-top: 3px;
	margin-right:5px;
	display: block;
	height: 13px;
	width: 13px;
	float: right;
	background-image: url(../../img/detail/lishijilu.png);
	background-position: center;
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.detailMoney{
	box-sizing: border-box;
	padding-top: 10px;
	height: 55px;
	border-top: 1px solid #f3f3f3;
}
.detailMoney>div{
	box-sizing: border-box;
	width: 50%;
	float: left;
}
.sail{
	border-right: 1px solid #f3f3f3;
}
.detailMoney>div>span{
	display: block;
	width: 100%;
	text-align: center;
	color: #666666;
}
.detailMoney>div>span:nth-child(3){
	/*margin-top: 3px;*/
	font-size: 16px;
	font-weight: 400;
	color: black;
}
.ball{
	margin-top: 8px;
	margin-bottom: 9px;
	display: block;
	height: 35px;
	/*display: flex;
	flex-direction: row;
	justify-content: space-around;*/
}
.ball>span{
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
.ball .blueBall{
	background-color: #1775e7;
}
.ball .redBall{
	background-color: #e73b17;
}
.rules{
	margin-top: 13px;
	/*min-height:200px ;*/
	background-color: white;
}
.rules div:nth-child(2n+1){
	background-color: white;
}
.rules div:nth-child(2n){
	background-color: #f1f0f5;
}
.rules div:nth-last-child(1){
	/*margin-bottom: 45px !important;*/
}
.rules>div{
	  min-height: 41px;
		display: flex;
		justify-content:center;
    align-items: center;
		text-align: center;	
}
.rules .top{
	color: #666666;
	height: 43px;
	line-height: 43px !important;
	background-color: white;
	/*font-weight:bold;*/

}
.rules>div>span{
	padding: 3px 0;
	/*flex: 1;*/
}

.rules div span{
		line-height: 22px;
}
.rules .top span{
	/*display: block;*/
	height: 43px;
line-height: 43px !important;
}
.rules>div span:nth-child(1){
	flex: 1;
}
.shortArr{
	text-align: left;
}
.rules>div span:nth-child(2){
	flex: 2;
}
.rules .top span:nth-child(2){
	text-align: center;
}
.rules>div span:nth-child(3){
	flex: 1;
}
.rules>div span:nth-child(4){
	flex: 1;
}
.orderShare ,.orderShare1{
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	height: 75px;
	width: 100%;
	padding: 19px 10%;
	background-color: white;
	/*display: flex;
	flex-direction: row;
	justify-content: space-around;*/
}
.orderShare1{
	z-index:-1;
	background-color: rgba(0,0,0,0.1);
}
/*.orderShare div ,.orderShare1 div{
	float: left;
	height: 35px;
	min-width: 40%;
	border-radius: 5px;
	color: white;
	font-size: 16px;
	font-weight: 600;
	text-align: center;
	line-height: 35px;
	position: absolute;
}*/
.orderShare .order,
.orderShare1 .order{
	background-color: #e73b17;
	left: 7%;
}
.orderShare .order1{
	left: 7%;
	background-color: #c1c1c1;
}
.orderShare .share{
	/*right: 7%;*/
	/*用来仅显示分享的设置*/
	/*width: 260px;*/
	background-color: #e73b17;
	display: block;
	/*margin: 0 auto;*/
	/*隐藏订阅的样式*/
	width: 100%;
	height:40px;
	border-radius: 10px;
	
}
button{
	height: 40px;
	border: none;
	line-height: 40px;
	font-size: 16px;
	background-color: #e73b17;
	width: 100%;
	color: white;
}
button::after {
  border: 0;
} 
.order button{
	background-color: #e73b17;
}
.confirmShow{
	/*display: none;*/
	position: fixed;
	height: 100%;
	width: 100%;
	top: 0;
	bottom: 0;
	background-color: rgba(0,0,0,0.4);
	z-index: 10;
}
.confirmBtn{
	height: 236px;
	width: 247px;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	background-color: white;
	box-sizing: border-box;
	padding: 50px;
	border-radius: 5px;
}
.confirmBtn div span:nth-child(1){
	display: block;
	height: 50px;
	width: 50px;
	border-radius:50%;
	background-image: url(../../img/detail/queren.png);
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100%;
	margin: 0 auto;
}
.confirmBtn div span:nth-child(2){
	margin-top: 10px;
	display: block;
	width: 100%;
	text-align: center;
	font-size: 14px;
	color: black;
}
.confirmBtn div:nth-child(2){
	height: 40px;
	width: 150px;
	border-radius: 5px;
	background-color: #e73b17;
	color: white;
	font-size: 16px;
	text-align: center;
	line-height: 40px;
	margin-top: 36px;
}
.standdard{
	position: fixed;
	height: 100%;
	width: 100%;
	top: 0;
	bottom: 0;
	background-color: rgba(0,0,0,0.4);
	z-index: 5;
}
.imgSt{
	margin: 0 auto;
	width: 70%;
	margin-top: 30px;
	height: 360px;
	
}
.imgSt img{
	display: block;
	height: 100%;
	width: 100%;
}
.standOk{
	height: 44px;
	width: 70%;
	border-radius: 0 0  5px 5px;
	background-color: white;
	margin: 0 auto;
	text-align: center;
	line-height: 44px;
	color: rgb(10,139,255);
	font-size: 15px;
	border-top: 1px solid rgb(229,229,229);
}
.standConfirm{
	height: 20px;
	width: 90px;
	margin: 0 auto;
	margin-top: 8px;
	letter-spacing:1px;

}
.standConfirm span{
	display: block;
	height: 100%;
	float: left;
}
.standConfirm span:nth-child(1){
	border: 1px solid white;
	border-radius: 50%;
	width: 13px;
	height: 13px;
	margin-top:3%;
  margin-right:5px;
  position: relative;
}
.standConfirm span:nth-child(1) div{
	border-radius: 50%;
	width: 9px;
	height: 9px;
	border: none;
	background-color: white;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	margin:  auto;
}
.standConfirm span:nth-child(2){
	color: white;
	font-size: 15px;
}
.standArrow{
	height: 80px;
	width: 70%;
	margin: 0 auto;
	position: relative;
}
.standArrow img{
	display: block;
	width: 30%;
	height: 100%;
	position: absolute;
	left: 20%;
}

</style>
