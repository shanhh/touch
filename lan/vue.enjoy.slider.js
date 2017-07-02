Vue.component('enjoy-slider', {
	data: function(){
		return {
			loaded : false
		}
	},
	props: {
		banner: {
			required: true
		},
		setting: {
			default: function () {
				return {
					autoplay: 4000,
					loop: true,
					lazyLoading: true
				}
			},
			required: false
		}
	},
	template: '<section class="slider-inner">'+
						'<div class="swiper-container" v-el:slider>'+
							'<div class="swiper-wrapper">'+
								'<div class="swiper-slide" v-for="item in banner">'+
									'<div class="slider-item">'+
										'<img :data-src="setting.lazyLoading && item.image" :src="!setting.lazyLoading && item.image" class="{{setting.lazyLoading ? \'swiper-lazy\' : \'\'}}">'+
										'<a v-if="item.link" href="{{item.link}}"></a>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="g-vue-container slider-pagination swiper-pagination swiper-pagination-white" v-show="loaded" transition="g-show" v-el:slider-page></div>'+
						'</div>'+
						'</section>',
	methods: {
		initSlider: function(){
			var vm = this;
			var homeSlider = new Swiper(this.$els.slider,{
				pagination: this.$els.sliderPage,
				autoplay: this.setting.autoplay,
				loop : this.setting.loop,
				iOSEdgeSwipeDetection: true,
				autoplayDisableOnInteraction: false,
				lazyLoading: this.setting.lazyLoading,
				onLazyImageReady: function () {
					vm.$data.loaded = true;
				},
				onImagesReady: function () {
					vm.$data.loaded = true;
				}
			});
		}
	},
	events: {
		'data-ready': function(obj){
			if (obj.type===1 && obj.status===1) {
				var vm = this;
				setTimeout(function(){
					vm.initSlider();
				},0);
			}
		}
	}
});