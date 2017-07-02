Vue.component('enjoy-fresh-alert', {
	data: function(){
		return {
			show: false,
			selectedOne: 0,
			title: '你喜欢看视频OR听音乐',
			step: 1
		};
	},
	props: {
		goods: {
			type: Object,
			required: true
		}
	},
	template: '<div>'+
						'<section v-show="show" class="enjoy-fresh-alert-container" transition="g-show" >'+
							'<div class="enjoy-fresh-alert l-h-center">'+
								'<div class="al-close" v-on:click="close"><i class="iconfont">&#xe61a;</i></div>'+
								'<h3 class="al-title" v-text="title"></h3>'+
								'<div class="al-action" v-if="step === 1">'+
									'<label class="item high">'+
										'<div class="radio-container"><input type="radio" v-model="selectedOne" value="1"></div>'+
										'<div class="select-detail">'+
											'<img class="logo" src="https://s1.lantouzi.com/img/20173/7955cce8b7d47be160bc0c5f98549292.png">'+
											'<div class="name">视频类VIP会员<span class="tail">爱奇艺视频/腾讯视频/乐视视频</span></div>'+
										'</div>'+
									'</label>'+
									'<label class="item high">'+
										'<div class="radio-container"><input type="radio" v-model="selectedOne" value="2"></div>'+
										'<div class="select-detail">'+
											'<img class="logo" src="https://s1.lantouzi.com/img/20173/397b1b10775b5736c357b10dbfdab580.png">'+
											'<div class="name">音乐类VIP会员<span class="tail">网易音乐/虾米音乐/QQ音乐</span></div>'+
										'</div>'+
									'</label>'+
								'</div>'+
								'<div class="al-action" v-if="+step === 2 && +selectedOne === 1">'+
									'<template v-if="goods.shipin && goods.shipin.length > 0">'+
										'<label class="item" v-for="good in goods.shipin">'+
											'<div class="radio-container"><input type="radio" :value="good.goods_id" v-on:click="selectGood(good.goods_id)"></div>'+
											'<div class="select-detail">'+
												'<img class="logo" :src="good.icon">'+
												'<div class="name" v-text="good.goods_name"></div>'+
											'</div>'+
										'</label>'+
									'</template>'+
								'</div>'+
								'<div class="al-action" v-if="+step === 2 && +selectedOne === 2">'+
									'<template v-if="goods.yinyue && goods.yinyue.length > 0">'+
										'<label class="item" v-for="good in goods.yinyue">'+
											'<div class="radio-container"><input type="radio" :value="good.goods_id" v-on:click="selectGood(good.goods_id)"></div>'+
											'<div class="select-detail">'+
												'<img class="logo" :src="good.icon">'+
												'<div class="name" v-text="good.goods_name"></div>'+
											'</div>'+
										'</label>'+
									'</template>'+
								'</div>'+
							'</div>'+
						'</section>'+
						'</div>',
	methods: {
		close: function(){
			this.$data.show = false;
			this.$data.step = 1;
			this.$data.title = '你喜欢看视频OR听音乐';
			this.$data.selectedOne = '';
			this.$dispatch('user-close',this.$data.callback_data);
		},
		selectGood: function(id) {
			window.location.href = '/zt/enjoy_fresh?id=' + id;
			return;
		}
	},
	watch: {
		selectedOne: function(v) {
			if (v) {
				var vm = this;
				setTimeout(function() {
					vm.$data.step = 2;
					vm.$data.title = '你常用哪一个？';
				}, 500);
				
			}
		}
	},
	events: {
		'show-enjoy-fresh-alert': function(){
			this.$data.show = true;
		},
		'hide-enjoy-fresh-alert': function(){
			this.close();
		}
	},
	ready: function() {

	}
});