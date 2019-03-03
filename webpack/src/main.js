//引入jquery
import $ from 'jquery';


//导入样式
import "./css/index.css"

import "./css/index.less"

import "./css/index.scss"

import "bootstrap/dist/css/bootstrap.css"




$(function(){
	$("li:odd").css({
		"backgroundColor": "lightBlue"
	})
	$("li:even").css({
		"backgroundColor": "blue"
	})
})



class Person{
	static info = {
		name: "xx",
		age: 20
	}
}

console.log(Person.info)