/*导航*/
Vue.component('enjoy-nav',{
	data: function(){
		return {
			loaded: false,
			loadImg: false,
			lazyImg: false,
			loadNum: 6,
		}
	},
	props: {
		navs: {
			required: true
		},
		setting: {
			required: true
		}
	},
	template: '<nav class="nav {{loaded ? \'loaded\' : \'\' }}">'+
							'<div class="nav-swiper-container" v-el:nav>'+
								'<div class="swiper-wrapper">'+
									'<a class="swiper-slide nav-item" href="{{nav.link}}" v-for="nav in navs">'+
										'<div class="img-container">'+
											'<img class="l-h-center" :src="nav.img ? nav.img : setting.defaultNavImage" v-if="(($index < loadNum) && lazyImg) || loadImg">'+
											'<p v-text="nav.name"></p>'+
										'</div>'+
									'</a>'+
								'</div>'+
							'</div>'+
						'</div>',
	methods: {
		initNav: function(){
			var vm = this;
			var navSlider = new Swiper(this.$els.nav,{
				pagination: this.$els.sliderPage,
				slidesPerView: this.$data.setting.slidesPerView,
				spaceBetween: this.$data.setting.spaceBetween,
				freeMode: true,
				iOSEdgeSwipeDetection: true,
				onTouchStart: function () {
					vm.$data.loadImg = true
				}
			});
		}
	},
	events: {
		'data-ready': function(obj){
			if (obj.type===1 && obj.status===1) {
				var vm = this;
				setTimeout(function(){
					vm.initNav();
					vm.$data.loaded = true;
				},0);
				setTimeout(function(){
					vm.$data.lazyImg = true;
				},1);
			}
		}
	}
});