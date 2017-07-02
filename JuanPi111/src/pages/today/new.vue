<template>
<div id="new">
		<swiper :options="swiperOption" ref="mySwiper">
		    <!-- slides -->
		    <swiper-slide v-for="item in adbanner">
		        <img :src="item.pic" class="swiperImg">
		    </swiper-slide>
		    <!-- Optional controls -->
		    <div class="swiper-pagination"  slot="pagination"></div>
		</swiper>
		<ul class="modelBar">
			<li v-for = "(item,index) in navBar ">
				<a >
					<img :src="item.pic">
					<p>{{ item.words }}123</p>
				</a>
			</li>
		</ul>
		<!-- 直发仓，量贩超市，每日抽奖 -->
		<ul class="adslist">
			<li to = "market" tag = "li" v-for = "(item,index) in adsList" @click = "market(index)">
				<img :src="item.pic">
			</li>
		</ul>	
		<div class="goodtopList">
			<img :src="gtopList.pic">
		</div>
		<!-- 商品列表 -->
		<ul class="today_goodlist">
			<li v-for = "item, i in goodList" @click = "nperson(i)">
				<div>
					<img :src="item.pic_url"  class="goodPic">
					<img :src="item.shop_logo"  class="goodlogo">
				</div>
				<div class="today_goodInfo" :class = "{'cText':item.sub_title}">

					<p v-if = " item.coupon " >{{ item.coupon.rules[0].aeBankInfo  }}</p>
					
					<p>{{ item.title }}</p>
					
					<p v-if = "item.sub_title" :class = "{'quanText':item.sub_title}">
						{{ item.sub_title }}
					</p>
					
					<span :class = "{'sText':item.sub_title}">{{ item.residue }}</span>
					
				</div>
			</li>
		</ul>
</div>
</template>
<script type="text/javascript">
	import { swiper,swiperSlide } from 'vue-awesome-swiper'
	export default{
		data(){
			return {
				topBanner:"",
				navBar:[],
				adsList:[],
				adbanner:[],
				gtopList:[],
				goodList:[],
				swiperOption: {
		            autoplay: 1000,
		            direction : 'horizontal',
		            pagination : '.swiper-pagination',
		        }
			}
		},
		created(){

			this.axios.get('../../static/data/lunbo.json').then(res=>{
				console.log(res.data.banner_ads);
				this.adbanner = res.data.banner_ads;
				this.topBanner = res.data.topbanner.pic_url;
				this.navBar = res.data.module_ads.multi_block[0].data[0].child;
				this.adsList =  res.data.module_ads.multi_block[1].data[0].child;
				this.gtopList =  res.data.module_ads.multi_block[2].data[0].child[0];
			}),
			this.axios.get('../../static/data/todaylist.json').then(res=>{
				// console.log(res.data.list);
				this.goodList = res.data.list
				
				console.log(this.goodList);
			})
		},
		methods:{
			market(){
				this.$router.push('/market/')
			},
			nperson(){
				this.$router.push('/newperson/')
			}
		},
		components:{
			swiper, swiperSlide
		}

	}

</script>
<style type="text/css">
	.swiperImg{
		display: block;
		width: 100%;
		margin-top: 1.16rem;	
	}
	.bannerBar{
		width: 100%;
		
	}
	.bannerBar img{
			width: 100%;
			display: block;
		}
	.modelBar{
		width: 100%;
	    padding: 0.38rem 0;
	    height: 1.90rem;
	    background-color: #fff;	
	}
	.modelBar li{
			width: 25%;
		    text-align: center;
		    float: left;
		    line-height: 0.71rem;
		    overflow: hidden;
		  }
	 .modelBar img{
		    	width: 1.20rem;
		    	height: 1.20rem;
		    }
	.modelBar a{
			font-size: 0.36rem;
			color: #666;
		}
	.adslist{
		height: 7.55rem;
		margin: 0.38rem 0 0.38rem 0;
		
	}
	.adslist img{
			display: block;
		    width: 49.9%;
		    float: left;
		}
    .goodtopList img{
    	width: 100%;
    	    height: 1.58rem;
    }
    /*商品列表*/
    .today_goodlist{
    	width: 100%;
    	/*display: inline-block;*/
    	overflow: hidden;
    }
    .goodPic {
    	height: 6.1rem;
    }
    .goodlogo{
		position: absolute;
	    right: 0.3rem;
	    bottom: 0rem;
	    background: #fff
    }
    .today_goodlist li {
    	display: inline-block;
    	width: 6.21rem;
    	background-color: #fff;

    }
    .today_goodlist li:nth-child(2n+1) {
    	margin-right: 0.22rem;
    	width: 49%;
    }
    .today_goodlist li:nth-child(2n) {
    	width: 49%;
    }
    .today_goodlist div:nth-of-type(1){
		position: relative;
    }
    .today_goodInfo{
    	position: relative;
    	line-height: 0.6rem;
    	text-indent: 0.3rem;
    }
     .today_goodInfo p:nth-of-type(1){
		font-size: 0.39rem;
		color: #ff464e;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
    }
    .today_goodInfo p:nth-of-type(2){
		font-size: 0.36rem;
		color: #333;

		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
    }
    /* .today_goodInfo p:nth-of-type(3){
    	margin-left:-0.1rem; 

    }*/
    .today_goodInfo span{
		font-size: 0.33rem;
		color: #bbb;
		position: absolute;
		right: 0;
		bottom: 0;
		
    }
    .cText{
    	text-align: center;
    }
    .quanText{
		text-indent: -0.62rem;
    }
    .today_goodInfo .sText{
    	position: absolute;
    	right: 96px;
    	bottom: 0;

    }


</style>