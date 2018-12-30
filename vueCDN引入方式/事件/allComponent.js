// 定义一个名为 button-counter 的新组件
Vue.component('allcomponent', {
  data: function () {
    return {
      mess: "事件的测试"
    }
  },
  methods: {
  	fn(){
  		console.log(this.mess);
  		alert(this.mess);	
  	}
  },
  template: '<div class="headClass back_gradient" v-on:click="fn"> {{ mess }} </div>'
})