<template>
<div id="details" ref="showSahde">
<div class="allDiv" ref="allDiv"></div>
	<span class="resver" @click="backs()"></span>
	<div class="imgs" >
		<img :src="comms.pic_url">
	</div>
	<div class="price">
		<div class="priTop">
			<div class="p1">
				<span class="priceT"><i>￥</i>{{ comms.tuan_price}}</span>
				<s>￥{{ comms.oprice}}</s>
				<span class="post">包邮</span>
				<span class="post">拼团价</span>
				<span class="group">1891已团</span>
			</div>
			<div class="p2">
				<a href="##">{{ comms.title }}</a>
			</div>
			<p class="p3">
				<a href="##"><img src="" />24小时发货</a>
				<a href="##"><img src="" />7天包退</a>
				<a href="##"><img src="" />售后补贴</a>
			</p>		
		</div>
	</div>
	<!-- 线 -->
	<div class="line"></div>
	<div class="team">
		<!-- <p class="addT">可直接参加TA们的团</p> -->
		<div class="city">
			<dl>
				<dt><img src="../../static/hyimages/juanpi_files/46.jpg"></dt>
				<dd>温暖</dd>
				<dd>朝阳市</dd>
			</dl>
		</div> 
	
		<div class="goAdd">
			<dl>
				<dd>还差<i>1</i>人成团</dd>
				<dd>剩余22:38:15</dd>
				<dt>去参团</dt>
			</dl>
		</div>
	</div>
	<div class="line"></div>
	<div class="refued">
		<p>开团后邀请好友参团，人数不足自动退款</p>
		<span>＞</span>
	</div>
	<div class="line"></div>
	<div class="sales">
		<dl>
			<dt>促销</dt>
			<dd><span>满减</span>满59元减5元，满79减10元</dd>
			<dd><span>满减</span>满59元减5元，满79减10元数量有限</dd>
		</dl>
	</div>
	<div class="line"></div>
	<div class="refued">
		<p>请选择颜色、分类</p>
		<span>></span>
	</div>
	<div class="line"></div>
	<div class="nameSp">
		<dl>
			<dt><img src="../../static/hyimages/juanpi_files/591ea9b9ad0a49f15d8b45d5_180x90.png"></dt>
			<dd>佣金女装专场</dd>
			<dd>共89件商品</dd>
		</dl>
		<div class="enter">
			进入专场
			<span>＞</span>
		</div>
	</div>
	<div class="line"></div>
	<div class="commidy">
		<ul>
			<li>商品信息</li>
			<li>商品参数</li>
			<li>咨询与售后</li>

		</ul>
	</div>
	<div class="line"></div>
	<div class="remind">
		<p><i>商家提醒：</i>此商品由品牌商从【<span>
		广东广州</span>】通过【<span>申通E物流发货</span>】</p>
	</div>
	<div class="line"></div>
	<div class="clos">
		<p>该商品已通过卷皮人工质检，品质有保证</p>
	</div>
	<div class="imgs">
			<img src="../../static/hyimages/juanpi_files/592e2ba9a43d1f0fe15ce2ce_750x533.jpg">
		</div>

	<div class="nulls">
		
	</div>
	<div class="bottomBar">
		<div class="bar">
			<img src="../../static/hyimages/juanpi_files/icon_mypt.png">
			<p>我的拼团</p>
		</div>
		<div class="bar">
			<img src="../../static/hyimages/juanpi_files/下载.png">
			<p>购物车</p>
		</div>
		<div class="buy">
			<div class="aloneBy">
				<p>￥69.80</p>
				<p>单独购买</p>
			</div>
			<div class="teamBuy" @click="showDiv()">
				<p>￥59.80</p>
				<p>立即开团<span>2人成团</span></p>
			</div>
		</div>
		
	</div>
	
		
	
	<div class="shopping" ref="shoppings">
		<img :src="comms.pic_url">
		<span class="close" @click="clo()">X</span>
		<div class="minPrice">
			<p>￥{{ comms.oprice }}</p>
			<p>请选择颜色 尺码</p>
		</div>
		<div class="Csize">
			<p class="cAnds">颜色</p>
			<p class="flower">花色</p>
			<p class="cAnds">尺码</p>
			<div class="sizeChange">
			<ul>
				<li>S</li>
				<li>M</li>
				<li>L</li>
				<li>XL</li>
				<li>XXL</li>
			</ul>
				
			</div>
			<div class="buyNum">
				<span class="shopp">购买数量</span>
				<div class="numChange" >
					 <span class="reduce" @click="reduce()">-</span>
					 <span class="num">{{ comms.count || 0 }}</span>
					 <span class="add" @click="toCar()">+</span>
				</div>
			</div>
			<div class="joinCart">
				<span>立即开团</span>
				<span @click="goCart()">加入购物车</span>
			</div>
		</div>
		
	 </div>
	
</div>
	
	

</template>
<script type="text/javascript">
	export default{
		name:"details",
		data(){
			return {

			}
		},
		methods:{
			//跳转到购物车页面
			goCart(item){
				this.$router.push('/car/');

			},
			//调用添加count值的方法
			toCar() {
				this.$store.commit('ADD_GOODSNUM', this.comms);
				console.log(this.$store.state.arr);
			},
			//调用减少count值的方法
			reduce(){
				this.$store.commit('REDUCE_GOODSNUM', this.comms)
			},
			//关闭页面
			clo(){
				this.$refs.shoppings.style.display="none";
				this.$refs.allDiv.style.display="none"
			},
			//显示div
			showDiv(){
				this.$refs.shoppings.style.display="block";
				this.$refs.allDiv.style.display="block"
				
			},
			//返回
			backs(){
				history.back();
			}
		},
		computed:{
			//获取点击对象的信息
			comms(){
				return this.$store.state.good;
				// console.log(this.item);
			}
		},
		//在页面创建之后调用一次添加count的方法
		created() {
			// console.log(this.comms)
			// this.$store.commit('ADD_GOODSNUM', this.comms);
		},
		mounted() {
			// console.log(this.comms);
		}

		
	}
</script>
<style type="text/css" scoped>
/*返回按钮*/
	.resver{
		font-family: "juanPiIco";
		font-size: 0.7rem;
		position: absolute;
		left: 0.3rem;
		background-color: #fff;
		border-radius: 50%;
		width: 0.8rem;
		margin-top: 0.1rem;
		
	}
	.resver:before{
		content:"\e60b";
	}
    .allDiv{
    	width: 100%;
    	height: 100%;
    	background-color: rgba(0,0,0,0.7);
    	z-index: 999;
    	position: fixed;
    	top: 0;
    	left: 0;
    	display: none;
    }
	/*购物车小页面*/
	.shopping{
		width: 100%;
		position: fixed;
		background-color:#fff; 
		top:10.1rem;
		height: 12.0rem;
		padding-left: 0.42rem;
		z-index: 1000;
		display: none;
	}
	.close{
		float: right;
		font-size: 0.6rem;
		margin-right: 1rem;
		color: #666;
	}
	.shopping>img{
		position: absolute;
		top: -1.2rem;
		width: 3.0rem;
	}
	.minPrice{
		margin-left: 3.6rem;
		display: inline-block;
		vertical-align: top;
		font-size: 42px;
		line-height: 0.8rem;
	}
	.minPrice p:first-child{
		color: red;
		font-size: 0.66rem;
	}
	.Csize{
		width:100%;
	}
	.cAnds{
		margin: 0.3rem 0 0.3rem 0;
		font-size: 50px;
	}
	.flower{
		font-size: 42px;
		color: #fff;
		background-color:#ff464e;
		height: 0.96rem;
		width: 30%;
		line-height: 0.9rem;
		text-align: center; 
	}

	.sizeChange{
		font-size: 50px;
		width: 100%;
		overflow: hidden;
	}
	.sizeChange ul{
		width: 100%;
		/*display: flex;*/
	}
	.sizeChange ul li{
		width: 30%;
		margin-top: 0.18rem;
		height: 0.96rem;
		line-height: 0.96rem;
		display: block;
		text-align: center;
		/*overflow: hidd*/
		color: #333;
		border: 1px solid #333;
		align-item:center;
		float: left;
		margin-right: 0.2rem;
	}
	.buyNum{
		width:100%;
		font-size: 50px;
		margin-top: 0.3rem;
		
	}
	.shopp{
		float: left;
	}
	.numChange{
		float: right;
		margin-right: .8rem;
	}
	.numChange .reduce{
		color: red;
		width: 0.6rem;
		height: 0.6rem;
		display: inline-block;
		border: 1px solid #333;
		line-height: 0.6rem;
		background-color: #f7f7f7;
		text-align: center;
		margin-right: 0.1rem;
	}
	.add{
		color: red;
		width: 0.6rem;
		height: 0.6rem;
		display: inline-block;
		border: 1px solid #333;
		line-height: 0.6rem;
		background-color: #f7f7f7;
		text-align: center;
		margin-left: 0.1rem;
	}
	.joinCart{
		width: 100%;
		clear: both;
		padding-top: 0.4rem;

	}
	.joinCart span{
		font-size: 60px;
		color: #fff;
		background-color: #ff464e;
		width: 45%;
		display: inline-block;
		margin-right: 0.2rem;
		text-align: center;
		padding-top:0.1rem;
		padding-bottom: 0.1rem;
		border-radius: 0.1rem; 
	}


	/*底部的菜单*/
	.bottomBar{
		width: 100%;
		position: fixed;
		bottom: 0;
		display: flex;
		font-size: 0.42rem;
		z-index: 100;
		background-color: #fff;	
		height: 1.44rem;
		/*padding-left: 3.3rem;*/
		line-height: 1.44rem;
		box-sizing:border-box;
	}
	.bar{
		/*padding-top: 0.15rem;*/
		font-size: 30px;
		width:1.65rem;
		height: 100%;
		text-align: center;
		padding-top: 0.15rem;
		/*display: flex;*/
	}
	.bar img{
		width: 0.72rem;
		height: 0.72rem;
		display: block;
		margin: 0 auto;
	}
	.bar p{
		height: 0.3rem;
		line-height: 0.3rem;
		font-size: 30px;
	}

	.buy .aloneBy{
		display: flex;
		width: 3.42rem;
		height: 1.44rem;
		background-color: #f88;
		box-sizing: border-box;
		padding-top: 0.13rem;
		display: inline-block;
	}
	.buy .aloneBy p:first-child{
		height: 0.60rem;
		line-height: 0.60rem;
		text-align: center;
		font-size: 42px;
		font-weight: bold;
		color: #fff;
	}
	.buy .aloneBy p:last-child{
		height: 0.50rem;
		line-height: 0.50rem;
		text-align: center;
		font-size: 36px;
		font-weight: bold;
		color: #fff;
	}
	.buy .teamBuy{
		width: 5.7rem;
		height: 1.44rem;
		background-color: #ff464e;
		box-sizing: border-box;
		padding-top: 0.13rem;
		z-index: 11;
		float: right;
	}
	.buy .teamBuy p:first-child{
		height: 0.60rem;
		line-height: 0.60rem;
		text-align: center;
		font-size: 42px;
		font-weight: bold;
		color: #fff;
	}
	.buy .teamBuy p:last-child{
		height: 0.50rem;
		line-height: 0.50rem;
		text-align: center;
		font-size: 36px;
		font-weight: bold;
		color: #fff;
	}
	.buy .teamBuy p:last-child span{
		background: #fff;
		color: #ff464e;
		margin-left: 0.1rem;
		padding: 0 0.05rem;
	}






	#details{
		background: #fff;
		overflow: hidden;
	}
	.imgs{
		width: 100%;
		background-color: #fff;
		overflow: hidden;
	}
	.imgs img{
		width: 100%;
		float: left;

	}
	/*价格显示*/
	.price{
		width: 100%;
		background-color: #fff;
		overflow: hidden;
		height: 3.5rem;

	}
	.priTop{
		width: 100%;
		overflow: hidden;

	}
	.p1{
		background-color: #fff;
		width:100%;
		padding-bottom: 0.12rem;
		/*padding-top: 0.12rem;*/
		padding-right: 0.42rem;
		padding-left: 0.42rem;
		box-sizing:border-box;
		line-height: 0.78rem;
		/*height: 0.66rem;*/
		overflow: hidden;
	}
	.priceT i{
		font-style: normal;
		font-size: 0.48rem;
		color: #ff464e;
	}
	.priceT{
		font-size: 0.66rem;
		color: #ff464e;
		vertical-align: middle;
		overflow: hidden;


	}
	.p1 s{
		font-size: 0.36rem;
		color: #bbb;
		vertical-align: middle;

	}
	
	/*包邮 拼团*/
	.post{
		border:1px;
		font-size: 0.33rem;
		background-color: #ff464e;
		color: #fff;
		padding-right:0.15rem;
		padding-left: 0.15rem;
		height: 0.45rem;
		line-height: 0.45rem;
		vertical-align: middle;

	}
	.group{
		font-size: 0.36rem;
		/*line-height: 0.66rem;*/
		color: #999;
		float: right;
		/*line-height: 1;*/
		display: inline-block;
		vertical-align: middle;

	}
	.p2{
		background-color: #fff;
		width: 100%;
	    height: 0.78rem;
	    overflow: hidden;
	    margin-bottom: 0.15rem;


	}
	.p2>a{
		font-size: 0.54rem;
		padding-right: 0.42rem;
		padding-left: 0.42rem;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		display: block;

	}
	.p3{
		padding-top: 0.3rem;
		border-top: 1px solid #ebebeb;
		width:100%;
		background-color: #fff;
		padding-left: 0.43rem;
		padding-bottom: 0.75rem;
		box-sizing:border-box;
	}
	.p3 a:before{
		content: "";
		display: inline-block;
		width: 0.3rem;
		height: 0.3rem;
		margin-left: 0.15rem;
		margin-right: 0.12rem;
		vertical-align: middle;
		background: url(../../static/hyimages/juanpi_files/right.png)no-repeat;
		display: inline-block;
		background-size: contain;

	}
	.p3 a{
		float: left;
		font-size: 0.33rem;
		background-color: #fff;
	}
	/*线*/
	.line{
		width: 100%;
		height: 0.3rem;
		background-color: #ebebeb;
		clear: both;
	}
	.team{
		width: 100%;
		margin-bottom: 0.3rem;
		padding-left: 0.42rem;
		box-sizing:border-box;
		padding-left: 0.42rem;
		padding-right: 0.42rem;
		overflow: hidden;
	}
	.addT{
		font-size: 0.42rem;
		line-height: 1.08rem;
		color: #666;
		padding-bottom: 0.3rem;


	}
	/*参团*/
	.city{
		width: 50%; 
		float: left;

	}
	.city dl{
		overflow: hidden;
		width: 100%;
		padding-top: 0.1rem;
	}
	.city dl dt{
		float: left;
	}
	.city dl dt img{
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 0.2rem;

	}
	.city dl dd{
		font-size: 0.36rem;
		color: #999;
		line-height: 0.65rem;
	}
	/*去成团*/
	.goAdd{
		display: inline-block;
		float: right;
		font-size: 0.36rem;
		width: 50%;
		color: #999;
		position: relative;


	}
	.goAdd dl{
		width: 100%;
		padding-top: 0.25rem;

	}
	.goAdd dl dt{
		float: right;
		line-height: 0.72rem;
		width: 1.68rem;
		text-align: center;
		color: #ff464e;
		position: absolute;
		top: 0.5rem;
		right: 0;
		border:1px solid;
	}
	.goAdd dl dd{
		float: right;
		margin-right: 2rem;
		line-height: 0.6rem;
	}
	.refued{
		width: 100%;
		font-size: 0.45rem;
		color: #666;
	}
	.refued p{
		display: inline-block;
		height: 1.44rem;
		line-height: 1.44rem;
		margin-bottom: 0.3rem;
		padding-right: 0.42rem;
		padding-left: 0.42rem;
		box-sizing:border-box;


	}
	.refued span{
		color: #333;
		font-weight: bold;
		float: right;
		margin-top: 0.42rem;
		margin-right: 0.5rem;

	}
	/*促销*/
	.sales{
		width: 100%;
		padding-left: 0.42rem;
		padding-right: 0.42rem;
		box-sizing:border-box;
		padding-top: 0.36rem;
		padding-bottom: 0.36rem;

	}
	.sales dl{
		width: 100%;

	}
	.sales dl dt{
		float: left;
		font-size: 0.42rem;
		margin-right: 0.5rem;
		height: 1.26rem;

	}
	.sales dl dd{
		font-size: 0.36rem;
		line-height: 0.7rem;
		color: #333;
	}
	.sales dl dd span{
		margin-right: 0.24rem;
		font-size: 0.3rem;
		padding:0.03rem;
		color: #ff464e;
		border:1px solid #ff464e;
		line-height: 1;
		margin-top: -39px;
	}
	.nulls{
		width: 100%;
		height: 4rem;
		background-color: #fff;
		display: block;
	}
	.nameSp{
		width: 100%;
		padding-bottom: 0.42rem;
		padding-top: 42px;
		padding-right: 0.42rem;
		padding-left: 0.42rem;
		box-sizing:border-box;
		font-size: 0.42rem;

	}
	.nameSp dl{
		width: 60%;
		display: inline-block;

	} 
	.nameSp dl dt{
		
		height: 1.35rem;
		line-height: 1.35rem;
		width: 1.35rem;
		border:1px solid #e7e7e7;
		vertical-align: middle;
		float: left;
		margin-right: 0.3rem;
		font-size: 0.42rem;
	}
	.nameSp dl dt img{
		width: 100%;
		display: block;
		top: 50%;
		left: 50%;
		border:0;
		margin-top: 0.3rem;
	}
	.nameSp dl dd:nth-of-type(1){
		line-height: 0.6rem;
		height: 0.9rem;
		font-size: 0.42rem;

	}
	.nameSp dl dd:nth-of-type(2){
		line-height: 0.45rem;
		height: 0.45rem;
		font-size: 0.3rem;
		color: #666;
		text-align: left;


	}
	.enter{
		float: right;
		position: relative;
		top: 0.18rem;
		line-height: 1;
		vertical-align: middle;
		display: inline-block;
		padding-left: 0.3rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		border:1px solid #4a4a4a;
		color: #666;
		font-size: 0.33rem;


	}
	.enter span{
		float: right;
		margin-right: 0.1rem;
		margin-left: 0.3rem;
	}
	/*商品信息*/
	.commidy{
		width: 100%;
		
	}
	.commidy ul{
		width:100%;
		font-size: 0.42rem;
		height: 1.44rem;
		line-height: 1.44rem;
		text-align: center;
		background-color: #fff;
	}
	.commidy ul li{
		float: left;
		width: 33.33%;
		height: 100%;

	}
	.commidy ul li:hover{
		border-bottom: 4px solid #ff464e;
	}
	.remind{
		width:100%;
		font-size: 0.42rem;
		padding-bottom: 0.27rem;
		padding-top: 0.42rem;
		padding-right: 0.42rem;
		padding-left: 0.42rem;
		box-sizing:border-box;
	}
	.remind p{
		color:#9b9b9b;
	}
	.remind p i{
		font-style: normal;
		color: #f70;
	}
	.remind p span{
		color: #4a4a4a;
	}
	.clos{
		width: 100%;
		margin-top: 0.3rem;
		line-height: 1.08rem;
		color: #ff464e;
		text-align: center;
		font-size:0.42rem; 
	}
</style>