<template>
	<div id="direct">
		<div class="header">
			<span>生活仓库</span>
			<i></i>
		</div>
		<!-- banner1 -->
		<ul class="bannerO">
			<li v-for="item in bannerDataO"><img :src="item.pic" alt=""></li>
		</ul>
		<!-- banner2 -->
		<ul class="bannerT">
			<li v-for="item in bannerDataT"><img :src="item.pic" alt=""></li>
		</ul>
		<!-- banner装扮 -->
		<ul class="bannerTh">
			<li v-for="item in bannerDataTh"><img :src="item.pic" alt=""></li>
		</ul>
		<ul class="bannerF">
			<li v-for="item in bannerDataF"><img :src="item.pic" alt=""></li>
		</ul>
		<!-- banner美食 -->
		<ul class="bannerTh">
			<li v-for="item in bannerDataFm"><img :src="item.pic" alt=""></li>
		</ul>
		<ul class="bannerF">
			<li v-for="item in bannerDataFmn"><img :src="item.pic" alt=""></li>
		</ul>
		<!-- banner清洁 -->
		<ul class="bannerTh">
			<li v-for="item in bannerDataFqj"><img :src="item.pic" alt=""></li>
		</ul>
		<ul class="bannerF">
			<li v-for="item in bannerDataFqjn"><img :src="item.pic" alt=""></li>
		</ul>
		<!-- banner餐厨 -->
		<ul class="bannerTh">
			<li v-for="item in bannerDataFc"><img :src="item.pic" alt=""></li>
		</ul>
		<ul class="bannerF">
			<li v-for="item in bannerDataFcn"><img :src="item.pic" alt=""></li>
		</ul>
		<!-- time -->
		<div class="day_time">
			<img :src="timeData.pic" alt="">
		</div>
		<!-- sort_price -->
		<div class="scroll_nav" :class="{'scrollbar':flag}">
			<div class="sort_price">
				<ul>
					<li class="moren">
						<span>默认</span>
					</li>
					<li class="price">
						<span>价格</span>
						<i></i>
					</li>
					<li class="sales_volume">
						<span>销量</span>
					</li>
				</ul>
			</div>
			<div class="nav">
				<ul>
					<li>
						<span>{{ jxData }}</span>
					</li><li v-for="item in navData">
						<span>{{ item.name }}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="zhanwei" :class="{'zhanweigao':flag}"></div>
		<!-- goods_list -->
		<div class="goodslist">
			<ul>
				<li v-for="item in goodsListData">
					<div class="img">
						<img :src="item.pgpicurl" alt="">
					</div>
					<div class="price">
						<span>
							<i>￥</i>
							{{+item.tuan_price}}
						</span>
						<span>拼</span><span>{{ '￥' + item.oprice }}</span>
					</div>
					<div class="title">
						<span>直发</span>
						<span>{{ item.title }}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "direct",
		data(){
			return {
				bannerDataO: [],	//1
				bannerDataT: [],	//2
				bannerDataTh: [],	//3
				bannerDataF: [],
				bannerDataFm: [],	//4
				bannerDataFmn: [],
				bannerDataFqj: [],	//5
				bannerDataFqjn: [],
				bannerDataFc: [],	//6
				bannerDataFcn: [],
				timeData: [],
				jxData: [],	//精选
				navData: [],
				goodsListData: [],	//商品列表
				scroll: '',
				flag: null
			}
		},
		created(){
			this.axios.get('../static/data/directBanner.json').then(res => {
				this.bannerDataO = res.data.module_ads.multi_block[0].data[0].child;	//banner1
				this.bannerDataT = res.data.module_ads.multi_block[1].data[0].child;	//banner2
				this.bannerDataTh = res.data.module_ads.multi_block[2].data[0].child;	//banner装扮
				this.bannerDataF = res.data.module_ads.multi_block[3].data[0].child;
				this.bannerDataFm = res.data.module_ads.multi_block[4].data[0].child;	//banner美食
				this.bannerDataFmn = res.data.module_ads.multi_block[5].data[0].child;
				this.bannerDataFqj = res.data.module_ads.multi_block[6].data[0].child;	//banner清洁
				this.bannerDataFqjn = res.data.module_ads.multi_block[7].data[0].child;
				this.bannerDataFc = res.data.module_ads.multi_block[8].data[0].child;	//banner清洁
				this.bannerDataFcn = res.data.module_ads.multi_block[9].data[0].child;
				this.timeData = res.data.module_ads.multi_block[10].data[0].child[0];
				 // console.log();
			},err => {
				console.log(err);
			})
			//nav
			this.axios.get('../static/data/directNav.json').then(res => {
				// console.log(res);
				this.jxData = res.data.default_name;
				this.navData = res.data.sub_cate_list;
			},err => {
				console.log(err);
			})
			//good_list
			this.axios.get('../static/data/directList.json').then(res => {
				this.goodsListData = res.data.list;
				//console.log(res.data.list);
			},err => {
				console.log(err);
			})
		},
		methods: {
			scrollBar(){
				this.scroll = document.body.scrollTop;			//
                if(this.scroll>3600){
                    this.flag=true;
                }else{
                    this.flag=false;
                }
			}
		},
		mounted(){
			window.addEventListener('scroll', this.scrollBar);
		}
	}
</script>

<style>
	.scrollbar{
		position: fixed;
		top: 0;
		z-index: 10;
		/*visibility: hidden;*/
	}
	.zhanwei{
		width: 100%;
		height: 0;
		position: relative;
		visibility: hidden;
		background-color: red;
	}
	.zhanweigao{
		height: 3rem;
	}
	#direct{
		font-family: "微软雅黑";
		background-color: #f4f4f8;
		padding-bottom: 148px;
		overflow: hidden;
	}
	@font-face{
		font-family: "juanPiIco";
		src: url("../../../static/iconfont.woff");
	}
	#direct .header{
		width: 100%;
		height: 1.32rem;
		line-height: 1.32rem;
		position: relative;
		background-color: #fff;
		border-bottom: 1px solid #dedede;
	}
	#direct .header span{
		position: absolute;
		left: 5%;
		width: 10.26rem;
		padding: 0 1.08rem;
		text-align: center;
		height: 100%;
		font-size: 54px;
		vertical-align: top;
		color: #333;
	}
	#direct .header i{
		display: block;
		font-style: normal;
		font-family: "juanPiIco";
		color: #666;
		font-size: 72px;
		float: right;
		margin-right: 0.47rem;
	}
	#direct .header i:before{
		content: "\e61c";
	}
	#direct .bannerO{
		width: 100%;
		height: 4.76rem;
	}
	#direct .bannerO li{
		display: inline-block;
	}
	#direct .bannerO li:nth-of-type(2){
		border-left: 1px solid #dedede;
		border-right: 1px solid #dedede;
	}
	#direct .bannerO img{
		display: block;
		height: 4.76rem;
	}
	#direct .bannerT{
		width: 100%;
		height: 3.97rem;
		margin-top: 0.39rem;
	}
	#direct .bannerT li{
		display: inline-block;
	}
	#direct .bannerT img{
		display: block;
		height: 3.97rem;
	}
	#direct .bannerTh{
		width: 100%;
		height: 1.49rem;
		margin-top: 0.39rem;
	}
	#direct .bannerTh img,#direct .bannerTh li{
		height: 1.49rem;
	}
	#direct .bannerF{
		width: 100%;
		height: 4.14rem;
	}
	#direct .bannerF img,#direct .bannerF li{
		height: 4.14rem;
	}
	#direct .day_time{
		width: 100%;
		height: 1.59rem;
		margin-top: 0.39rem;
	}
	#direct .day_time img{
		height: 1.59rem;
	}
	/*---scroll_nav-----*/
	#direct .scroll_nav{
		width: 100%;
		height: 2.95rem;
		font-size: 42px;
	}
	#direct .sort_price{
		width: 100%;
		height: 0.9rem;
		padding: 0.15rem 0;
		background: #fff;
	}
	#direct .sort_price ul{
		height: 0.9rem;
		display: flex;
	}
	#direct .sort_price li{
		width: 4.1rem;
		text-align: center;
		line-height: 0.9rem;
		color: #666;
	}
	#direct .sort_price .price{
		border-left: 1px solid #dedede;
		border-right: 1px solid #dedede;
		position: relative;
	}
	#direct .sort_price i{
		display: inline-block;
		position: relative;
		width: 0.29rem;
		height: 0.48rem;
		background: url(../../../static/directImgs/sort_default.png) no-repeat;
		background-size: 100%;
		top: 0.1rem;
		left: 0.1rem;
	}
	#direct .nav{
		height: 1.75rem;
		background-color: #f4f4f8;
	}
	#direct .nav ul{
		height: 1.75rem;
		overflow: hidden;
		overflow-x: scroll;
		white-space: nowrap;
		line-height: 1.75rem;
		padding-left: 0.74rem;
	}
	#direct .nav li{
		display: inline-block;
		text-align: center;
		margin-right: 0.36rem;
	}
	#direct .nav span{
		padding: 0.15rem 0.3rem;
		border: 1px solid #dbdbdb;
		color: #333;
	}
	#direct .goodslist{
		background-color: #fff;
		overflow: hidden;
		width: 100%;
	}
	#direct .goodslist li{
		display: inline-block;
		width: 6.17rem;
		height: 7.9rem;
		vertical-align: middle;
	}
	#direct .goodslist li:nth-child(2n+1){
		margin: 8px 8px 0 0;
	}
	#direct .goodslist li:nth-child(2n){
		margin: 8px 0 0 0;
	}
	#direct .goodslist .img img{
		height: 6.17rem;
		display: block;
	}
	#direct .goodslist .price{
		width: 5.71rem;
		height: 0.72rem;
		font-size: 45px;
		line-height: 0.72rem;
		margin-left: 0.24rem;
	}
	#direct .goodslist .price span:nth-child(1){
		color: #ff464e;
		word-spacing: -0.23rem;
		margin-right: 0.18rem;
	}
	#direct .goodslist .price span:nth-child(1) i{
		font-style: normal;
	}
	#direct .goodslist .price span:nth-child(2){
		color: #fff;
		background-color: #ff464e;
		display: inline-block;
		width: 0.45rem;
	    height: 0.45rem;
	    text-align: center;
	    font-size: 40px;
	    line-height: 0.48rem;
	    margin-right: 0.19rem;
	}
	#direct .goodslist .price span:nth-child(3){
		color: #bbb;
		font-size: 33px;
		text-decoration: line-through;
	}
	#direct .goodslist .title{
		width: 5.96rem;
		height: 0.6rem;
		line-height: 0.6rem;
		margin: 0.06rem 0 0 0.24rem;
		font-size: 33px;
	}
	#direct .goodslist .title span:nth-child(1){
		display: inline-block;
		padding: 0 0.15rem;
		border: 1px solid #ff464e;
		color: #ff464e;
		margin-right: 0.15rem;
	}
</style>