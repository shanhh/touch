/*
alert组件 
在当前页面弹窗一个alert弹窗，可以使用slot，是个页面弹窗单一，或需要slot的情况，如果需要多个弹窗请使用vue.msgbox.js。
props: 无。 
监听的事件:
	1，show-alert 功能：开启弹窗 参数: setting 
		setting 对象可以包含的属性：
	setting = {
		custom_class: '', //组件最外层的css class
		showClose: false, //是否显示右上角的关闭按钮
		title: '',//弹窗的标题，默认是'提示'两个字
		title_html: '',//弹窗的标题 如果需要传进来html
		msg: '',//弹窗的消息提示
		msg_html: '',//弹窗的html消息信息
		cancel: '',//取消按钮的文案，不传不会显示取消按钮
		confirm: '',//确定按钮的文案，不传不会显示确定按钮
		custom_click: true, //是否需要处理自定义的点击事件，如果true，记得添加事件user-click
		callback_data: ''//需要回调的数据
	}
	2，hide-alert 功能：关闭弹窗 参数: 无
发出的事件：
	1 user-confirm 当用户点击确认按钮，如果有callback_data，会传callback_data
	2 user-cancel 当用户点击取消按钮，如果有callback_data，会传callback_data
	3 user-close 当用户点击关闭按钮，如果有callback_data，会传callback_data
	4 user-click 当用户点击弹层任何地方时都触发，可以自定义点击事件，会传点击的event
*/
Vue.component('alert-component', {
	data: function(){
		return {
			show: false,
			setting: {
				title: '提示'
			}
		};
	},
	props: {
	},
	template: '<div>'+
						'<section v-show="show" class="c-alert-container {{setting.custom_class ? setting.custom_class : \'\' }}" v-on:click="click_holder($event)" transition="g-show" >'+
							'<div class="c-alert l-h-center">'+
								'<div v-if="setting.showClose" class="al-close" v-on:click="close"><i class="iconfont">&#xe61b;</i></div>'+
								'<slot></slot>'+
								'<h3 class="al-title" v-if="setting.title" v-text="setting.title"></h3>'+
								'<div class="al-title-html" v-if="setting.title_html" v-html="setting.title_html"></div>'+
								'<p class="al-msg" v-if="setting.msg" v-text="setting.msg"></p>'+
								'<div class="al-msg-html" v-if="setting.msg_html" v-html="setting.msg_html"></div>'+
								'<div class="al-action">'+
									'<a class="g-btn g-btn-small-major btn-cancel" v-on:click="cancel" v-if="setting.cancel" v-text="setting.cancel"></a>'+
									'<a class="g-btn g-btn-small-major btn-confirm" v-on:click="confirm" v-if="setting.confirm" v-text="setting.confirm"></a>'+
								'</div>'+
							'</div>'+
						'</section>'+
						'</div>',
	methods: {
		close: function(){
			this.$data.show = false;
			//Util && Util.removeClass(document.documentElement,'g-noscroll');
			this.$dispatch('user-close',this.$data.setting.callback_data);
		},
		cancel: function(){
			this.$data.show = false;
			//Util && Util.removeClass(document.documentElement,'g-noscroll');
			this.$dispatch('user-cancel',this.$data.setting.callback_data);
		},
		confirm: function(){
			this.$data.show = false;
			//Util && Util.removeClass(document.documentElement,'g-noscroll');
			this.$dispatch('user-confirm',this.$data.setting.callback_data);
		},
		click_holder: function(e) {
			if (this.$data.setting.custom_click) {
				this.$dispatch('user-click', {event: e});
			}
		}
	},
	events: {
		'show-alert': function(setting){
			if (setting) {
				this.$data.setting = setting;
				this.$data.show = true;
				//Util && Util.addClass(document.documentElement,'g-noscroll');
			}
		},
		'hide-alert': function(){
			this.$data.show = false;
			//Util && Util.removeClass(document.documentElement,'g-noscroll');
		}
	}
});