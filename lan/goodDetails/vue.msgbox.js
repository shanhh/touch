/*
MessageBox组件 
在当前页面弹窗一个alert弹窗，适用于页面弹窗较多时使用，无法使用slot，使用slot请使用vue.alert.js。
调用方法：
	var m1 = new MessageBox({
		title: '使用积分消费',
		msg: '确定是够消耗2000积分购买此商品',
		cancel: '取消',
		confirm: '确认'
	},function (type) {
		console.log('User confirmed');
	},function (type) {
		console.log('User ' + type);
	});

	m1.open(); //开起弹窗
	m1.close(); //关闭弹窗

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
	}
*/
!function () {
	var msgboxComponent = {
		name: 'msgbox',
		props: {
			setting: {
				default: function () {
					return {
						title: '提示'
					}
				}
			},
			visible: {
				default: false
			}
		},
		template: '<div>'+
							'<section v-show="visible" class="c-alert-container {{setting.custom_class ? setting.custom_class : \'\' }}" transition="g-show">'+
								'<div class="c-alert l-h-center">'+
									'<div v-if="setting.showClose" class="al-close" v-on:click="handleAction(\'close\')"><i class="iconfont">&#xe61b;</i></div>'+
									'<h3 class="al-title" v-if="setting.title" v-text="setting.title"></h3>'+
									'<div class="al-title-html" v-if="setting.title_html" v-html="setting.title_html"></div>'+
									'<p class="al-msg" v-if="setting.msg" v-text="setting.msg"></p>'+
									'<div class="al-msg-html" v-if="setting.msg_html" v-html="setting.msg_html"></div>'+
									'<div class="al-action">'+
										'<a class="g-btn g-btn-small-major btn-cancel" v-on:click="handleAction(\'cancel\')" v-if="setting.cancel" v-text="setting.cancel"></a>'+
										'<a class="g-btn g-btn-small-major btn-confirm" v-on:click="handleAction(\'confirm\')" v-if="setting.confirm" v-text="setting.confirm"></a>'+
									'</div>'+
								'</div>'+
							'</section>'+
							'</div>',
		methods: {
			preventScroll: function () {
				Util && Util.addClass(document.documentElement,'g-noscroll');
			},
			allowScroll: function () {
				Util && Util.removeClass(document.documentElement,'g-noscroll');
			},
			handleAction: function (action) {
				this.visible = false;
				//this.allowScroll();
				this.callback(action);
			}
		},
		ready: function () {
			//this.preventScroll();
		}
	};

	var MessageBoxConstructor = Vue.extend(msgboxComponent);

	var showMsg = function (options, confirmCallback, cancelCallback) {
		var instance = new MessageBoxConstructor({
			el: document.createElement('div')
		});
		instance['setting'] = options;
		instance.callback = function (action) {
			if (action === 'confirm') {
				if (typeof confirmCallback === 'function' ) {
					confirmCallback(action);
				}
			} else {
				if (typeof cancelCallback === 'function' ) {
					cancelCallback(action);
				}
			}
		}
		document.body.appendChild(instance.$el);
		return instance;
	};

	var MessageBox = function (options, confirmCallback, cancelCallback) {
		this.ins = showMsg(options, confirmCallback ,cancelCallback);
	};

	MessageBox.prototype.open = function () {
		var ins = this.ins;
		Vue.nextTick(function () {
			ins['visible'] = true;
		});
	};

	MessageBox.prototype.close = function () {
		var ins = this.ins;
		Vue.nextTick(function () {
			ins['visible'] = false;
		});
	};

	window.MessageBox = MessageBox;
}();
