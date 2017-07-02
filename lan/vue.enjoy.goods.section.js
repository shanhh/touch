/*首页商品*/
Vue.component('enjoy-goods',{
	data: function(){
		return {
			goodsLinkBase: window.CONFIG.BASE_URI + '/enjoy/view?id='
		}
	},
	props: {
		goods: {
			required: true
		},
		loadImg: {
			required: true
		}
	},
	template: '<div class="goods">'+
							'<a href="{{goodsLinkBase + goods.encrypt_id}}" class="link">'+
								'<header class="header">'+
									'<h3 class="title" v-text="goods.title"></h3>'+
									'<p class="sub-title" v-text="goods.sub_title"></p>'+
								'</header>'+
								'<div class="zw-container zw-l">'+
									'<div class="inner">'+
										'<img :src="goods.detail_icon" v-if="loadImg">'+
									'</div>'+
								'</div>'+
								'<div class="price l-m-container">'+
									'<span class="key"><i class="iconfont">&#xe636;</i>存入</span>'+
									'<span class="value"><strong v-text="goods.enjoy_price | formatMoneyDisplay" class="amount"></strong><strong class="amount">元</strong>起</span>'+
								'</div>'+
							'</a>'+
						'</div>'
});

/*首页橱窗banner*/
Vue.component('enjoy-section-banner',{
	data: function(){
		return {
			navLinkBase: window.CONFIG.BASE_URI + '/enjoy/category?id=',
			defalutBanner: 'https://s1.lantouzi.com/img/201604/enjoy/xiaolan.jpg'
		}
	},
	props: {
		img: {
			required: false
		},
		id: {
			required: false
		},
		type:{
			required: true
		},
		loadImg: {
			required: true
		}
	},
	computed: {
		imgSrc: function () {
			if (this.type === 'normal') {
				return this.img;
			}else {
				return this.$data.defalutBanner
			}
		}
	},
	template: '<div class="goods-section-banner zw-d">'+
							'<span class="more" v-if="id">浏览全部</span>'+
							'<a href="{{id ? navLinkBase+id : \'javascript:void(0);\'}}">'+
								'<div class="inner">'+
									'<img :src="loadImg ? imgSrc : \'\'" >'+
								'</div>'+
							'</a>'+
						'</div>'
});

/*首页橱窗ad*/
Vue.component('enjoy-section-ad',{
	props: {
		img: {
			required: true,
		},
		link: {
			required: true,
		},
		loadImg: {
			required: true
		}
	},
	template: '<div class="banner-ad">'+
							'<a :href="link"><img :src="loadImg? img : \'\'"></a>'+
						'</div>'
});

/*首页秒杀*/
Vue.component('enjoy-miaosha',{
	data: function(){
		return {
			goodsLinkBase: window.CONFIG.BASE_URI + '/enjoy/view?id=',
			showCountdown: false,
			countdown: {
				h: '',
				m: '',
				s: ''
			},
			diffTime: 0
		}
	},
	props: {
		item: {
			required: true,
		}
	},
	computed: {
		hours: function(){
			if (this.item.items[0].stime) {
				return new Date(this.item.items[0].stime.replace(/\-/g, '/')).getHours();
			} else {
				return '';
			}
		}
	},
	methods: {
		initTime: function () {
			// 第一次拿到服务器时间，和本地时间对比下
			var serverTime = window.CONFIG.SERVER_TIME;
			var localTime = new Date().getTime();
			this.$data.diffTime = serverTime - localTime;
		},
		initCountDown: function(){
			var startTime = new Date(this.item.items[0].stime.replace(/\-/g, '/')).getTime(),
					leftTime = startTime - (Date.now() + this.$data.diffTime);
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
		this.initCountDown();
	},
	template: '<div class="miaosha">'+
							'<header class="header">'+
								'<div class="l-m-container">'+
									'<span class="icon"></span>'+
									'<span class="title" v-if="showCountdown" transition="g-show"><span v-text="hours"></span>点场</span>'+
									'<div class="countdown g-vue-container" v-show="showCountdown" transition="g-show" v-el:countdown>'+
										'<span class="name">倒计时</span>'+
										'<span class="time" v-text="countdown.h">00</span>:'+
										'<span class="time" v-text="countdown.m">00</span>:'+
										'<span class="time" v-text="countdown.s">00</span>'+
									'</div>'+
									'<span class="title s" v-if="!showCountdown" transition="g-show">每日限量秒杀</span>'+
								'</div>'+
							'</header>'+
							'<div class="main">'+
								'<div class="one zw-l" v-if="item.items.length===1">'+
									'<div class="inner">'+
										'<a href="{{goodsLinkBase+item.items[0].encrypt_id}}">'+
											'<img :src="item.items[0].img">'+
										'</a>'+
									'</div>'+
								'</div>'+
								'<div class="three l-m-container" v-if="item.items.length>1">'+
									'<div class="ms-goods" v-for="goods in item.items">'+
										'<a href="{{goodsLinkBase+goods.encrypt_id}}" class="link">'+
											'<div class="inner">'+
												'<div class="status">'+
													'<div class="sold-out l-h-center l-flex l-flex-vc" v-if="goods.is_sold_out">抢光了</div>'+
													'<img :src="goods.img">'+
												'</div>'+
											'</div>'+
											'<p class="price"><span class="tag" v-if="goods.manner" v-text="goods.manner"></span><span v-text="goods.amount"></span></p>'+
										'</a>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'
});

/*首页商品橱窗*/
Vue.component('enjoy-section',{
	data: function(){
		return {
			loadImg: false,
		}
	},
	props: {
		section: {
			required: true
		},
		index: {
			required: true
		}
	},
	computed: {
		style: function(){
			if (this.index===0) {
				return 'recommend';
			}else {
				return 'normal';
			}
		}
	},
	template: '<div><section class="goods-section" v-el:section>'+
							'<div class="{{style}}">'+
								'<enjoy-section-banner :type="style" :img="section.wap_ad_img" :load-img="loadImg" :id="section.id"></enjoy-section-banner>'+
								'<div class="list">'+
									'<template v-for="goods in section.goods">'+
										'<enjoy-goods :goods="goods" :load-img="loadImg"></enjoy-goods>'+
									'</template>'+
								'</div>'+
							'</div>'+
						'</section>'+
						'<enjoy-section-ad v-if="section.event_img" :link="section.event_url" :load-img="loadImg" :img="section.event_img"></enjoy-section-ad></div>',
	ready: function () {
		var vm = this;
		// console.log('load:'+ this.index);
		setTimeout(function () {
			vm.$data.loadImg = true;
		},1);
	}
});

/*category页面推荐位*/
Vue.component('enjoy-category-ad',{
	props: {
		img: {
			required: true,
		},
		link: {
			required: true,
		}
	},
	template: '<div class="enjoy-category-ad g-vue-container zw-l">'+
							'<div class="inner">'+
								'<a href="/enjoy/view?id={{link}}"><img :src="img"></a>'+
							'</div>'+
						'</div>'
});

/*category页面商品*/
Vue.component('enjoy-category-goods',{
	props: {
		goods: {
			required: true,
		}
	},
	template: '<div class="enjoy-category-goods l-left">'+
							'<a href="{{goods.url}}" class="link l-m-container">'+
								'<div class="img-container l-m-container zw-l">'+
									'<div class="inner"><img :src="goods.detail_icon"></div>'+
								'</div>'+
								'<p class="title" v-text="goods.name"></p>'+
								'<div class="price clearfix">'+
									'<span class="origin l-left" v-if="!goods.forex_cost"><span v-text="goods.cost | formatMoneyDisplay"></span>元</span>'+
									'<span class="origin l-left" v-if="goods.forex_cost"><span v-text="goods.forex_cost"></span></span>'+
									'<span class="now l-right">'+
										'<span class="key"><i class="iconfont">&#xe636;</i>存入</span>'+
										'<span class="value"><strong v-text="goods.enjoy_price | formatMoneyDisplay" class="amount"></strong><strong class="amount">元</strong>起</span>'+
									'</span>'+
								'</div>'+
							'</a>'+
						'</div>'
});

/*category页面商品*/
Vue.component('enjoy-category-goods-big',{
	props: {
		goods: {
			required: true,
		}
	},
	template: '<div class="enjoy-category-goods-big">'+
							'<a href="{{goods.url}}" class="link">'+
								'<div class="img-container l-m-container zw-l">'+
									'<div class="inner"><img :src="goods.detail_icon_big"></div>'+
									'<div class="origin">'+
										'官方价：'+
										'<span class="info" v-if="!goods.forex_cost"><span v-text="goods.cost | formatMoneyDisplay"></span>元</span>'+
										'<span class="info" v-if="goods.forex_cost"><span v-text="goods.forex_cost"></span></span>'+
									'</div>'+
								'</div>'+
								'<div class="price l-m-container">'+
									'<p class="now">'+
										'<span class="key"><i class="iconfont">&#xe636;</i>存入</span>'+
										'<span class="value"><strong v-text="goods.enjoy_price | formatMoneyDisplay" class="amount"></strong><strong class="amount">元</strong>起</span>'+
									'</p>'+
									'<p class="income">'+
										'<span class="key"><i class="iconfont">&#xe636;</i>还享额外收益</span>'+
										'<span class="value"><strong v-text="goods.income | fen2yuan" class="amount"></strong><strong class="amount">元</strong></span>'+
									'</p>'+
									'<div class="btn">免费拿</div>'+
								'</div>'+
							'</a>'+
						'</div>'
});

/*category页面底部导航*/
Vue.component('enjoy-category-nav',{
	data: function(){
		return {
			navLinkBase: window.CONFIG.BASE_URI + '/enjoy/category?id='
		}
	},
	props: {
		navs: {
			required: true
		}
	},
	template: '<div class="enjoy-category-nav">'+
							'<p class="go-home"><a href="/enjoy"><i class="iconfont">&#xe608;</i>去享乐计划首页</a></p>'+
							'<div class="nav-main">'+
								'<header class="header l-m-container"><i class="iconfont">&#xe628;</i>逛逛其他品类</header>'+
								'<nav class="main">'+
									'<a href="{{navLinkBase+nav.class_id}}" v-for="nav in navs" class="link">'+
										'<li class="item">'+
											'<img :src="nav.category_img" v-if="nav.category_img" class="img">'+
											'<span class="name">{{nav.name}}</span>'+
										'</li>'+
									'</a>'+
								'</nav>'+
							'</div>'+
						'</div>'
});

/*百亿秒杀模块*/
Vue.component('baiyi-miaosha',{
	props: {
		miaosha: {
			required: true,
		}
	},
	template: '<div class="miaosha baiyi">'+
							'<header class="header" v-if="miaosha.goods && miaosha.goods.length>0">'+
								'<div class="l-m-container">'+
									'<span class="title">'+
										'<span v-text="miaosha.title" class="main-title"></span>'+
										'<span v-text="miaosha.sub_title" class="sub-title"></span>'+
									'</span>'+
								'</div>'+
							'</header>'+
							'<div class="main">'+
								'<template v-for="goods in miaosha.goods">'+
									'<baiyi-miaosha-goods :goods="goods"></baiyi-miaosha-goods>'+
								'</template>'+
							'</div>'+
							'<img :src="miaosha.ad_img" v-if="showAdImg(miaosha)">'+
						'</div>',
	methods: {
		showAdImg: function(miaosha){
			if (!miaosha.ad_img) return false;
			if (miaosha.display_time) {
				var time = new Date(miaosha.display_time.replace(/\-/g, '/'));
				if (window.CONFIG.SERVER_TIME > +time) {
					return true;
				} else {
					return false;
				}
			}
			return true;
		}
	}
});

/*百亿秒杀商品*/
Vue.component('baiyi-miaosha-goods',{
	data: function(){
		return {
			goodsLinkBase: window.CONFIG.BASE_URI + '/enjoy/view?id=',
			showCountdown: false,
			countdown: {
				m1: '',
				m2: '',
				s1: '',
				s2: ''
			},
			finished: [],
			reduce: {},
			reduceCountdown: {
				m: '',
				s: ''
			},
			showReduceCountdown: false,
			diffTime: 0
		}
	},
	props: {
		goods: {
			required: true,
		}
	},
	computed: {
		reduceCountdownFwd: function () {
			return {
				m: this.reduceCountdown.m.toString() + '分',
				s: this.reduceCountdown.s.toString() + '秒'
			}
		},
		goodsPrice: function (){
			if (this.goods.reduce.length === this.$data.finished.length) {  // 降价计划完成后，显示最后的价格
				if (Util.isEmptyObject(this.$data.reduce)) {
					return this.goods.reduce[this.goods.reduce.length-1].amount;
				} else {
					return this.$data.reduce.amount;
				}		
			} else if (!Util.isEmptyObject(this.$data.reduce)) {
				return this.$data.reduce.amount + this.$data.reduce.cut_amount;
			} else {
				return this.goods.amount;
			}
		}
	},
	methods: {
		initTime: function () {
			// 第一次拿到服务器时间，和本地时间对比下
			var serverTime = window.CONFIG.SERVER_TIME;
			var localTime = new Date().getTime();
			this.$data.diffTime = serverTime - localTime;
		},
		initReduce: function () {
			var startTime = new Date(this.reduce.time.replace(/\-/g, '/')).getTime(),
					leftTime = startTime - (Date.now() + this.$data.diffTime);
			if (leftTime>0) {
				var countdown = new Countdown({
					ele: this.$els.reduce
				});
				var countdownFmt = Countdown.format,
						self = this;
				countdown.start(leftTime, true);
				setTimeout(function(){
					self.$data.showReduceCountdown = true; // 延迟一点显示的效果好
				},1000);
				var processing = function(e){
					var d = e.detail.leftTime;
					self.$data.reduceCountdown.m = countdownFmt(d).m;
					self.$data.reduceCountdown.s = countdownFmt(d).s;
				};
				var finished = function(e){
					e.target.removeEventListener(e.type, arguments.callee);
					self.$data.showReduceCountdown = false;
					self.checkNext();
				};
				this.$els.reduce.addEventListener('countdownProcess',processing,false);
				this.$els.reduce.addEventListener('countdownFinished',finished,false);
			}
		},
		checkNext: function () {
			if (this.goods.reduce && this.goods.reduce.length !== 0) {
				var vm = this;
				var temp = [];
				vm.$data.finished = [];
				this.goods.reduce.forEach(function(item){
					var startTime = new Date(item.time.replace(/\-/g, '/')).getTime(),
							leftTime = startTime - (Date.now() + vm.$data.diffTime);
					if (leftTime >0 ) { // 有效的计划
						temp.push(item);
					} else { // 过期的计划
						vm.$data.finished.push(item.id);
					}
				});
				if (temp.length!==0) {
					this.$data.reduce = temp[0]; // 只需要使用第一个有效计划就可以
					this.initReduce();
				}
			}
		},
		initCountDown: function () {
			var startTime = new Date(this.goods.start_time.replace(/\-/g, '/')).getTime(),
					leftTime = startTime - (Date.now() + this.$data.diffTime);
			if (leftTime>0) {
				var countdown = new Countdown({
					ele: this.$els.countdown
				});
				var countdownFmt = Countdown.format,
						self = this;
				countdown.start(leftTime, true);
				this.$data.showCountdown = true;
				this.$els.countdown.addEventListener('countdownProcess',function(e){
					var d = e.detail.leftTime;
					self.$data.countdown.m1 = countdownFmt(d).mm.toString().split('')[0];
					self.$data.countdown.m2 = countdownFmt(d).mm.toString().split('')[1];
					self.$data.countdown.s1 = countdownFmt(d).ss.toString().split('')[0];
					self.$data.countdown.s2 = countdownFmt(d).ss.toString().split('')[1];
				});
				this.$els.countdown.addEventListener('countdownFinished',function(e){
					self.$data.showCountdown = false;
				});
			}	
		}
	},
	ready: function () {
		this.initTime();
		this.initCountDown();
		if (!this.goods.is_sold_out) {
			this.checkNext();
		}
	},
	template: '<div class="baiyi-goods clearfix">'+
							'<div class="left l-left">'+
								'<div class="img-container">'+
									'<div v-if="goods.is_sold_out">'+
										'<img :src="goods.img_sold_out">'+
									'</div>'+
									'<div v-if="!goods.is_sold_out">'+
										'<a href="{{goodsLinkBase + goods.encrypt_id}}">'+
											'<img :src="goods.img">'+
										'</a>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="right l-left">'+
								'<h3 class="title l-ellipsis" v-text="goods.title"></h3>'+
								'<div class="countdown" v-show="showCountdown" v-el:countdown>'+
									'<a href="{{goodsLinkBase + goods.encrypt_id}}">'+
									'<div class="main">'+
										'<span class="number n1" v-text="countdown.m1"></span>'+
										'<span class="number n2" v-text="countdown.m2"></span>'+
										'<span class="number n3" v-text="countdown.s1"></span>'+
										'<span class="number n4" v-text="countdown.s2"></span>'+
									'</div>'+
									'</a>'+
								'</div>'+
								'<div class="info" v-show="!showCountdown">'+
									'<p class="price">'+
										'原存入：<span v-text="goods.price" class="origin"></span>'+
										'现仅需存：<span class="now"><strong v-text="goodsPrice | formatMoneyDisplay"></strong><strong>元</strong></span>'+
									'</p>'+
									'<div class="reduce" v-show="!goods.is_sold_out">'+
										'<a href="{{ goodsLinkBase + goods.encrypt_id}}" class="g-btn goods-btn">先下手为强</a>'+
										'<p class="time" v-el:reduce v-show="showReduceCountdown">'+
											'<span class="strong" v-text="reduceCountdownFwd.m" v-show="reduceCountdown.m>0"></span>'+
											'<span class="strong" v-text="reduceCountdownFwd.s"></span>后，'+
											'降价<span class="strong" v-text="reduce.cut_amount | fen2yuan"></span>元'+
										'</p>'+
									'</div>'+
									'<div class="soldout" v-show="goods.is_sold_out">'+
										'<a href="{{goods.sold_out_btn_link}}" v-text="goods.sold_out_btn_text" class="g-btn goods-btn"></a>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'
});