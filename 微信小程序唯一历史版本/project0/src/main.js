import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/index/main', 'pages/counter/main', 'pages/relativeUrl/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#e73b17',
      navigationBarTitleText: '开奖公告',
      navigationBarTextStyle: 'white'
    }
  },
  	data: {
			basic_data: [{
				lotId: 10,
				lotName: '双色球'
			},{
				lotId: 11,
				lotName: '大乐透'
			},{
				lotId: 12,
				lotName: '福彩3D'
			},{
				lotId: 13,
				lotName: '排列三'
			},{
				lotId: 14,
				lotName: '排列五'
			},{
				lotId: 15,
				lotName: '七星彩'
			},{
				lotId: 16,
				lotName: '七乐彩'
			}]
	},
	getName (ID) {
		for(var i = 0 ; i < this.data.basic_data.length; i++){
			if(ID == this.data.basic_data[i].lotId){
				return this.data.basic_data[i].lotName
			}
		}
	},
	getFormIds (formId) {
		var timestamp = parseInt(new Date().getTime()/1000) + 604800;
		console.log(timestamp);
		console.log('收集formId的函数');
		console.log(formId);
		if(formId != "the formId is a mock one"){
			//存储formId 数组的形式存在本地最长30
			formId = {
				formId: formId,
				expire: timestamp
			}
			try {
           var value = wx.getStorageSync('formId');
           if (value) {  
           }else{
           	 value = [];
           }
          if(value.length == 30){
          	value.splice(0,1);
          }
           value.push(formId);
           console.log(value);
            wx.setStorage({
                key:"formId",
                data:value
            })
      } catch (e) {
           // Do something when catch error
      }

		}

	},
	getTimeWeek (timeStr,lotyId) {
		//根据给定的时间2018-07-03 来推算周几并返回彩种的开奖固定时间
		var timeStr = timeStr
    var year = '';
    var week = ''; 
    var minTime = "21:30";
    if(timeStr){
        year = timeStr.slice(0,4) + '-'+ timeStr.slice(4,6) + '-' + timeStr.slice(6,8)
    }     
    var dateTime = new Date(year);
    var timeTemp = Date.parse(dateTime);
    //console.log(timeTemp);
    timeTemp = new Date(timeTemp);               
    if(timeTemp.getDay() == 0) week = '周日' ;
    if(timeTemp.getDay() == 1) week = '周一' ;
    if(timeTemp.getDay() == 2) week = '周二' ;
    if(timeTemp.getDay() == 3) week = '周三' ;
    if(timeTemp.getDay() == 4) week = '周四' ;
    if(timeTemp.getDay() == 5) week = '周五' ;
    if(timeTemp.getDay() == 6) week = '周六' ; 
		if(lotyId == 10){minTime = "21:20";}
    if(lotyId == 11){minTime = "20:35";}
    if(lotyId == 12){minTime = "21:26";}
    if(lotyId == 13){minTime = "20:36";}
    if(lotyId == 14){minTime = "20:36";}
    if(lotyId == 15){minTime = "20:34";}
    if(lotyId == 16){minTime = "21:26";}   
    var data = [week,minTime];
    return data;
    
	}
}
