<template>
	<div id="mine">
		<div class="header">
			<div>
				<span><</span>
				<span>个人中心</span>
			</div>
			<div>
				<a href="javascript:;">注册</a>
				<i class="line"></i>
				<a href="javascript:;">登录</a>
			</div>
		</div>
		<div class="order">
			我的订单
			<i class="arrow"></i>
			<span @click="toAllOrdrers()">全部订单</span>
			
		</div>
		<div class="afterSale">
			<ul>
				<router-link to="/mine/pay" tag="li">
					<i class="pay"></i>
					<p>待付款</p>
				</router-link>
				<router-link to="/mine/conglobation" tag="li">
					<i class="conglobation"></i>
					<p>待成团</p>
				</router-link>
				<router-link to="/mine/take" tag="li">
					<i class="take"></i>
					<p>待收货</p>
				</router-link>
				<router-link to="/mine/refund" tag="li">
					<i class="refund"></i>
					<p>退款/售后</p>

				</router-link>
			</ul>
		</div>
		<div class="mines">
			<p>我的收藏<i class="arrow"></i></p>
			<p>我的优惠券<i class="arrow"></i></p>
			<p>我的拼团<i class="arrow"></i></p>
		</div>
		<div class="serviceCenter">
			<p>客服中心<i class="arrow"></i></p>
			<p>关于卷皮<i class="arrow"></i></p>
		</div>
		<div class="footer-nav">
			<a href="javascript:;">返回首页</a>
			<a href="javascript:;">客户端</a>
			<a href="javascript:;">电脑版</a>
		</div>
		<div class="footer">
			<div class="cut-line"></div>
			<h2>copyright © 武汉奇米网络科技有限公司</h2>
			<div class="cut-empty"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "mine",
		methods: {
			toAllOrdrers() {
				this.$router.push({
					path:'/allOrders'
				})
			}
		}
	}
</script>

<style scoped>
	.header {
		width: 100%;
		height: 4.32rem;
		background-color: #ff464e;
		overflow: hidden;
		background-image: linear-gradient(146deg,#ff464e 34%,#fc7400);
	}
	.header > div:first-of-type {
		height: 1.32rem;
		text-align: center;
	}
	.header > div:nth-of-type(2) {
		height: 2.34rem;
	}
	.header > div:first-of-type > span:first-of-type {
		float: left;
		margin-top: 0.26rem;
    	margin-left: 0.47rem;
		display: inline-block;
		width: 0.72rem;
		height: 0.72rem;
		color: #fff;
		font-size: 72px;
		font-weight: 0;
		transform: scaleY(1.5);
		/*background: url('../../../static/mineImg/back.png') no-repeat center;*/
	}
	.header > div:first-of-type > span:nth-of-type(2) {
		display: inline-block;
		font-size: 0.54rem;
		color: #fff;
		margin-right: 1.2rem;
	}
	.header > div:nth-of-type(2) {
		text-align: center;
		position: relative;
		line-height: 2rem;
	}
	.header a {
		display: inline-block;
		width: 4.08rem;
		height: 2.34rem;
		color: #fff;
		font-size: 0.6rem;
	}
	.header .line {
		height: 0.6rem;
		width: 2px;
		background-color: #fff;
		display: inline-block;
		position: absolute;
		top: 38%;
		left: 50%;
	}
	/*[data-dpr="3"] #mine .header {
	    height: 432px;
	    overflow: hidden;
	}*/
	.order {
		width: 100%;
		height: 1.44rem;
		background-color: #fff;
		border-bottom: 2px solid #f4f4f8;
		font-size: 0.45rem;
		color: #333;
		line-height: 1.44rem;
		text-indent: 0.57rem;
		overflow: hidden;
	}
	.order span {
		float: right;
		color: #999;
	}
	.arrow {
		font-family: "juanPiIco";
		font-size: 0.36rem;
		font-style: normal;
		float: right;
		color: #999;
		position: relative;
    	left: -0.37rem;
	}
	.arrow:before {
		content: "\e61a";
	}
	.afterSale {
		width: 100%;
		height: 2.35rem;
		background-color: #fff;
		margin-bottom: 0.32rem;
	}
	.afterSale ul {
		display: flex;
	}
	.afterSale ul li {
		flex: 1;
		text-align: center;
	}
	.afterSale ul p {
		color: #666;
    	text-align: center;
    	font-size: 0.36rem;
    	margin-top: 7px;
	}
	.mines p, .serviceCenter p {
		width: 100%;
		height: 1.44rem;
		background-color: #fff;
		border-bottom: 2px solid #f4f4f8;
		font-size: 0.45rem;
		color: #333;
		line-height: 1.44rem;
		text-indent: 0.57rem;
	}
	.mines, .serviceCenter {
		margin-bottom: 0.32rem;
	}
	.footer-nav {
		width: 100%;
		height: 1.38rem;
		background-color: #fff;
		line-height: 1.38rem;
		display: flex;
		text-align: center;
		border-bottom: 2px solid #f4f4f8;
	}
	.footer-nav a {
		flex: 1;
		font-size: .36rem;
		color: #666;
	}
	.cut-line {
		width: 100%;
		height: 0.65rem;
		background-color: #fff;
		border-bottom: 2px solid #f4f4f8;
	}
	.cut-empty {
		width: 100%;
		height: 0.85rem;
		background-color: #fff;
	}
	.footer {
		position: relative;
	}
	.footer > h2 {
		font-size: .32rem;
	    color: #bbb;
	    font-weight: 400;
	    background-color: #fff;
	    position: absolute;
	    top: 27%;
	    left: 26%;
	}
	.pay, .conglobation, .take, .refund {
		font-family: "juanPiIco";
		font-size: 0.85rem;
		font-style: normal;
	}
	.pay:before{
		content: "\e614";
	}
	.conglobation:before {
		content: "\e623";
	}
	.take:before {
		content: "\e615";
	}
	.refund:before {
		content: "\e61d";
	}
</style>