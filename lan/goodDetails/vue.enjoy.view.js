window.install(Vue);

// 标题
Vue.component('goods-title', {
	data: function () {
		return {
			quanyiGoodsType: 2
		}
	},
	props: {
		goods: {
			required: true
		}
	},
	computed: {
		name: function () {
			if (+this.goods.type === this.$data.quanyiGoodsType) {
				return '门市价：';
			} else {
				return '市场价：';
			}
		}
	},
	template: '<section class="title-container section-container">'+
							'<div class="l-m-container">'+
								'<p class="goods-title" v-text="goods.name"></p>'+
								'<p class="goods-sub-title" v-text="goods.intro"></p>'+
								'<p class="goods-price">'+
									'{{name}}'+
									'<span v-if="goods.forex_cost" v-text="goods.forex_cost" class="price"></span>'+
									'<span v-if="!goods.forex_cost" class="price"><span v-text="goods.cost | fen2yuan "></span>元</span>'+
								'</p>'+
							'</div>'+
						'</section>'
});

// 属性选择
Vue.component('goods-attr', {
	props: {
		attr: {
			required: true
		}
	},
	template: '<section class="goods-attr-container">'+
							'<div class="l-m-container clearfix">'+
								'<p class="goods-attr-title"><span v-text="attr.attr_name"></span>：</p>'+
								'<div class="goods-attr-types">'+
									'<template v-for="detail in attr.attr_details">'+
										'<a href="{{ detail.enjoy_goods_id===0 ? \'javascript:void(0);\' : \'/enjoy/view?id=\' + detail.enjoy_encrypt_id }}" class="goods-attr-item" :class="{ \'cur\': detail.selected, \'is-soldout\': detail.enjoy_goods_id===0 }" v-text="detail.attr_detail_name"></a>'+
									'</template>'+
								'</div>'+
							'</div>'+
						'</section>'
});

// 价格选择
Vue.component('goods-price', {
	props: {
		items: {
			required: true
		},
		selected: {
			required: true
		},
		config: {
			required: true
		}
	},
	methods: {
		changeMonth: function (item) {
			if (+item.status!== this.config.OPEN || item.encrypt_id.length === 0) {
				return false;
			}
			this.$dispatch('user-choice-month', item);
		},
		findMatch: function (month) {
			var vm = this;
			var initItem = {};
			this.items.forEach(function (item) {
				if ((item.month === (month ? month : vm.selected)) && +item.status === vm.config.OPEN && item.encrypt_id.length !== 0) {
					initItem = item;
				}
			});
			return initItem;
		}
	},
	created: function () {
		var vm = this;
		var item = this.findMatch();
		var other = [6,3]; // 备选方案
		var flag = true;
		if (Util.isEmptyObject(item)) {
			other.forEach(function (item) {
				var t = vm.findMatch(item);
				if (!Util.isEmptyObject(t)) {
					flag && vm.changeMonth(t);
					flag = false;
				}
			});
		} else {
			this.changeMonth(item);
		}
	},
	template: '<section class="goods-attr-container goods-price-section l-m-container">'+
							'<div class="clearfix">'+
								'<p class="goods-attr-title">存入期限：</p>'+
								'<div class="goods-attr-types">'+
									'<template v-for="item in items">'+
										'<a @click="changeMonth(item)" class="goods-attr-item" :class="{ \'cur\': item.month === selected, \'is-soldout\': +item.status!== config.OPEN || item.encrypt_id.length === 0 }" v-text="item.tag_name"></a>'+
									'</template>'+
								'</div>'+
							'</div>'+
						'</section>'
});

// 商品图片描述
Vue.component('goods-pics', {
	data: function () {
		return {
			appReady: false
		}
	},
	props: {
		goods: {
			required: true
		}
	},
	computed: {
		pics: function () {
			var result = [];
			this.goods.info.detail_img.forEach(function (item) {
				if (item.length>0) {
					result.push(item);
				}
			});
			return result;
		}
	},
	methods: {
		view: function (src) {
			var vm = this;
			if (window.wx) {
				wx.previewImage({
					current: src,
					urls: vm.pics
				});
			}
			if (this.$data.appReady) { // 支持App原生slider
				LTZAPP.displayPicture && LTZAPP.displayPicture({
					urls: vm.pics,
					position: vm.pics.indexOf(src)
				})
			}
		}
	},
	created: function () {
		var vm = this;
		document.addEventListener('LTZAPPReady',function(e){
			vm.$data.appReady = true;
		},false);
	},
	template: '<section class="goods-pics-container">'+
								'<template v-for="pic in pics">'+
									'<img v-lazy="pic" @click="view(pic)">'+
								'</template>'+
						'</section>'
});

// 投资劵
Vue.component('goods-coupon', {
	props: {
		coupon: {
			required: true
		},
		cur: {
			required: true
		}
	},
	computed: {
		isCur: function (){
			return +this.cur.id === +this.coupon.id ? true : false;
		}
	},
	template: '<section class="coupon-card {{isCur ? \'cur\' : \'\'}}">'+
							'<span class="left-border"><i></i></span>'+
							'<span class="right-border"><i></i></span>'+
							'<h3 class="title" v-text="coupon.name"></h3>'+
							'<div class="main">'+
								'<p class="info" v-text="coupon.desc"></p>'+
								'<p class="date">有效期限：<span v-text="coupon.valid_etime"></span></p>'+
							'</div>'+
							'<p class="amount"><strong v-text="coupon.amount | fen2yuan"></strong>元</p>'+
						'</section>'
});

// 投资劵选择
Vue.component('goods-coupons-list', {
	data: function () {
		return {
			show: false,
			scrollY: 0,
			title: ''
		}
	},
	props: {
		coupons: {
			required: true
		},
		cur: {
			required: true
		}
	},
	methods: {
		notUse: function () {
			this.choice({
				id: 0,
				amount: 0
			});
		},
		close: function () {
			this.$data.show = false;
			document.title = this.$data.title;
		},
		choice: function (coupon) {
			this.$dispatch('user-choice-coupon', coupon);
			this.close();
			window.scrollTo(0,this.$data.scrollY);
		}
	},
	events: {
		'choice-coupon': function () {
			this.$data.show = true;
			this.$data.scrollY = window.scrollY;
			this.$data.title = document.title;
			document.title = '选择享乐券';
		}
	},
	template: '<div class="goods-coupons-list g-vue-container" v-show="show" transition="g-show">'+
							'<a class="not-use g-btn g-btn-small-major" @click="notUse">不使用享乐券</a>'+
							'<template v-for="coupon in coupons">'+
								'<goods-coupon :coupon="coupon" :cur="cur" @click="choice(coupon)"></goods-coupon>'+
							'</template>'+
						'</div>'
});

// 视频播放
Vue.component('goods-video', {
	props: {
		video: {
			required: true
		}
	},
	template: '<section class="goods-video-container">'+
								'<video webkit-playsinline playsinline :src="video.src" controls :poster="video.poster"></video>'+
								'<p class="title" v-text="video.title" v-if="video.title"></p>'+
						'</section>'
});

// 积分兑换
Vue.component('goods-jifen', {
	props: {
		jifen: {
			required: true
		},
		useJifenAmount: {
			required: true
		},
		jifenValueAmount: {
			required: true
		}
	},
	computed: {
		max: function () {
			return this.jifen.jifen * Number(this.jifen.jf_limit);
		},
		step: function () {
			return this.jifen.jifen;
		}
	},
	methods: {
		addJifen: function () {
			if (this.useJifenAmount < this.max) {
				this.useJifenAmount = this.useJifenAmount + this.step;
			}
		},
		subJifen: function () {
			var min = this.jifen.jifen;
			if (this.useJifenAmount > min) {
				this.useJifenAmount = this.useJifenAmount - this.step;
			}
		}
	},
	created: function () {
		this.useJifenAmount = this.jifen.jifen;
	},
	template: '<section class="goods-jifen-container">'+
							'<p>'+
								'<span class="title">积分：</span>'+
								'<span class="value" v-if="+jifen.jf_limit===1">'+
									'<span class="jifen">使用<span v-text="jifen.jifen | fen2yuan"></span>积分抵扣本金<span v-text="jifen.amount | fen2yuan"></span>元</span>'+
								'</span>'+
								'<div class="value multi" v-if="+jifen.jf_limit>1">'+
									'<div class="jifen-input">'+
										'<span class="jifen-action" @click="subJifen()">-</span>'+
										'<span class="jifen-value" v-text="useJifenAmount | fen2yuan"></span>'+
										'<span class="jifen-action" @click="addJifen()">+</span>'+
									'</div>'+
									'<p class="tips">使用<span v-text="useJifenAmount | fen2yuan"></span>积分抵扣本金<span v-text="jifenValueAmount | fen2yuan"></span>元</p>'+
								'</div>'+
							'</p>'+
						'</section>',
});

// 优惠方案选择
Vue.component('goods-discount', {
	props: {
		defaultType: {
			required: true
		},
		goodsDiscoutType: {
			required: true
		},
		jifenPlans: {
			required: true
		},
		coupons: {
			required: true
		},
		miaosha: {
			required: true
		}
	},
	computed: {
		types: function () {
			return [
				{
					id: 1,
					name: '不使用',
					available: true,
				},
				this.jifenBtn,
				this.couponsBtn
			]
		},
		canUseJifen: function () {
			if (this.jifenPlans.length === 0 || (this.goodsDiscoutType === 4 && this.miaosha)) { //秒杀商品不支持自定义积分购买, 没有积分计划的时候不能选择(积分不足或该月份不支持积分购买)
				return false;
			} else {
				return true;
			}
		},
		canUseCoupons: function () {
			if (this.miaosha || this.coupons.length === 0) { // 秒杀商品不支持享乐券,没有可用券的时候不能选择
				return false;
			} else {
				return true;
			}
		},
		jifenBtn: function () {
			return {
				id: 2,
				name: '用积分',
				available: this.canUseJifen,
			}
		},
		couponsBtn: function () {
			return {
				id: 3,
				name: '用享乐券',
				available: this.canUseCoupons,
			}
		},
		tips: function () {
			if (!this.canUseJifen && !this.canUseCoupons) {
				return '积分不足、暂无可用的享乐券';
			} else if (this.canUseJifen && this.canUseCoupons)  {
				return '可以使用积分或享乐券抵扣本金';
			} else if (this.canUseJifen) {
				return '可以使用积分抵扣本金';
			} else if (this.canUseCoupons) {
				return '可以使用享乐券抵扣本金';
			} else {
				return '';
			}
		}
	},
	methods: {
		changeType: function (item) {
			if (!item.available) {
				return false;
			} else {
				this.defaultType = item.id;
			}
		}
	},
	template: '<section class="goods-attr-container main">'+
							'<div class="clearfix">'+
								'<p class="goods-attr-title">减免方案：</p>'+
								'<div class="goods-attr-types">'+
									'<template v-for="item in types">'+
										'<a @click="changeType(item)" class="goods-attr-item" :class="{ \'cur\': item.id === defaultType, \'is-soldout\': !item.available}" v-text="item.name"></a>'+
									'</template>'+
								'</div>'+
							'</div>'+
							'<p class="tips" v-text="tips"></p>'+
						'</section>'
});

// 秒杀显示
Vue.component('goods-miaosha', {
	data: function(){
		return {
			showCountdown: false,
			countdown: {
				h: '',
				m: '',
				s: ''
			},
			diffTime: 0,
			text: ''
		}
	},
	props: {
		info: {
			required: true
		}
	},
	methods: {
		initTime: function () {
			// 第一次拿到服务器时间，和本地时间对比下
			var serverTime = window.CONFIG.SERVER_TIME;
			var localTime = new Date().getTime();
			this.$data.diffTime = serverTime - localTime;
		},
		initMiaoSha: function () {
			var startTime = new Date(this.info.miaosha_start_time.replace(/\-/g, '/')).getTime();
			var leftTime = startTime - (Date.now() + this.$data.diffTime);
			if (leftTime >0 ) { //秒杀还没开始
				this.initCountDown(leftTime);
				this.$data.text = '距开始还有：';
			} else { //秒杀即将结束
				var endTime = new Date(this.info.miaosha_end_time.replace(/\-/g, '/')).getTime();
				startTime = Date.now() + this.$data.diffTime;
				leftTime = endTime - startTime;
				this.initCountDown(leftTime);
				this.$data.text = '距结束还有：';
			}
		},
		initCountDown: function(leftTime){
			if (leftTime>0) {
				var countdown = new Countdown({
					ele: this.$els.countdown
				});
				var countdownFmt = Countdown.format,
						self = this;
				countdown.start(leftTime, true);
				setTimeout(function(){
					self.$data.showCountdown = true;
				},1000);
				this.$els.countdown.addEventListener('countdownProcess',function(e){
					var d = e.detail.leftTime;
					self.$data.countdown.h = countdownFmt(d).hh;
					self.$data.countdown.m = countdownFmt(d).mm;
					self.$data.countdown.s = countdownFmt(d).ss;
				});
				this.$els.countdown.addEventListener('countdownFinished',function(e){
					self.$data.showCountdown = false;
				});
			}	
		}
	},
	ready: function(){
		this.initTime();
		this.initMiaoSha();
	},
	template: '<section class="goods-countdown l-m-container">'+
							'<div class="g-vue-container" v-show="showCountdown" transition="g-show" v-el:countdown>'+
								'<span class="tag">秒杀</span>'+
								'<span class="name" v-text="text"></span>'+
								'<span class="time" v-text="countdown.h">00</span>:'+
								'<span class="time" v-text="countdown.m">00</span>:'+
								'<span class="time" v-text="countdown.s">00</span>'+
							'</div>'+
						'</section>'
});
