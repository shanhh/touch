<template>
	<div id="car">
		<div class="header">
			<i class="back" @click="back()"></i>
			<span>购物车</span>
			<span>编辑</span>
		</div>
		<div class="goodEmpty" v-if="goods.length == 0">
			<img src="/static/mineImg/empty-cart.png" alt="">
			<p>看到喜欢的就带回家吧</p>
			<a href="today">今日上新</a>
		</div>
		<ul v-else>
			<li v-for="(item, index) in goods">
				<i :class="item.singleFlag ? 'sureChoice': 'singleChoice'" @click="oneChoice(item)"></i>
				<img :src="item.pgpicurl" alt="">
				<div class="size">
					<p>{{ item.title }}</p>
					<p>黑色 M</p>
				</div>
				<div class="prices">
					<p>￥ {{ item.tuan_price }}</p>
					<p>单独购买￥{{ item.oprice }}</p>
				</div>
				<div class="goodsNumber">
					<i class="reduce" @click="diffGood(item)">-</i>
					<span>{{ item.count }}</span>
					<i class="add" @click="addGood(item)">+</i>
				</div>
			</li>
		</ul>
		<div class="footer">
			<div class="allChoice">
				<i :class="allPriceFlag? 'circle1':'circle'" @click="allGoodChoice()"></i>
				<span>全选</span>
			</div>
			<div class="allprice">
				<p>合计:￥<span>{{ allGoodPrice | number }}</span></p>
				<p>总额:￥<span>{{ allOPrice | number }}</span> 立减:￥<span>{{ allDPrice | number }}</span></p>
			</div>
			<router-link to="/car/pay" tag="div">
				去结算(<span>{{ allGoodCount }}</span>)
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: "car",
		methods: {
			back() {
				history.back();
			},
			oneChoice(item) {
				console.log(this);
				item.singleFlag = !item.singleFlag;
				let num = 0;
				this.goods.map(function(i) {
					if(i.singleFlag == false) {
						num++;
					}
				});
				if(num == 0) {
					this.allPriceFlag = true;
				} else {
					this.allPriceFlag = false;
				}
			},
			allGoodChoice() {
				this.allPriceFlag = !this.allPriceFlag;
				if(this.allPriceFlag == false) {
					this.goods.map(function(j) {
						j.singleFlag = false;
					})
				} else {
					this.goods.map(function(j) {
						j.singleFlag = true;
					})
				}
			},
			diffGood(item) {
				this.$store.commit('REDUCE_GOODSNUM', item);
			},
			addGood(item) {
				this.$store.commit('ADD_GOODSNUM', item);
			}
		},
		computed:{
			goods(){
				return this.$store.state.arr;
				console.log(this.$store.state.arr);
			},
			allGoodPrice() {
				return this.$store.getters.allPrice;
			},
			allGoodCount() {
				return this.$store.getters.goodsCount;
			},
			allOPrice() {
				return this.$store.getters.oPrice;
			},
			allDPrice() {
				return this.$store.getters.differencePrice;
			}
		},
		filters: {
			number(num) {
				return num.toFixed(2);
			}
		}

	}
</script>

<style scoped>
	.header {
		width: 100%;
		height: 1.32rem;
		background-color: #fff;
		border-bottom: 2px solid #f4f4f8;
		overflow: hidden;
		line-height: 1.32rem;
		position: relative;
	}
	.header .back {
		font-family: "juanPiIco";
		font-size: 0.72rem;
		font-style: normal;
		margin-left: 0.3rem;
		position: absolute;
	}
	.header .back:before {
		content: "\e60b";
	}
	.header span:first-of-type {
		font-size: 0.54rem;
		position: absolute;
		left: 44%;
	}
	.header span:nth-of-type(2) {
		font-size: 0.45rem;
		float: right;
		margin-right: 0.42rem;
	}
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 146px;
		background-color: #fff;
		z-index: 99;
		overflow: hidden;
	}
	.footer > div {
		float: left;
	}
	.footer .allChoice {
		width: 3.1rem;
		/*text-align: right;*/
		height: 1.46rem;
		line-height: 1.02rem;
		position: relative;
	}
	.circle, .circle1 {
		font-family: "juanPiIco";
		font-size: 0.6rem;
		font-style: normal;
		color: #9b9b9b;
		position: absolute;
		left: 25%;
    	top: 20%;
	}
	.circle1 {
		color: #ff464e;
	}
	.circle:before {
		content: "\e622";
	}
	.circle1:before {
		content: "\e621";
	}
	.footer .allChoice span {
		font-size: 0.48rem;
		color: #333;
		position: absolute;
		top: 18%;
    	left: 50%;
	}
	.footer .allprice {
		width: 5.42rem;
		height: 1.46rem;
		color: #666;
		text-align: right;
		padding-right: 0.17rem;
		margin-top: 0.16rem;
	}
	.footer .allprice p:first-of-type {
		font-size: 0.42rem;
	}
	.footer .allprice p:first-of-type span {
		color: #ff464e;
	}
	.footer .allprice p:last-of-type {
		font-size: 0.3rem;
		color: #999;
	}
	.footer > div:last-of-type {
		width: 3.72rem;
		background-color: #ff464e;
		color: #fff;
		font-size: 0.54rem;
		height: 1.46rem;
		text-align: center;
		line-height: 1.46rem;
	}
	ul li {
		width: 100%;
		height: 2.94rem;
		background-color: #fff;
		border-bottom: 2px solid #f4f4f8;
		overflow: hidden;
		position: relative;
	}
	ul li .singleChoice {
		font-family: "juanPiIco";
		font-size: 0.6rem;
		font-style: normal;
		color: #9b9b9b;
		position: absolute;
	    left: 3%;
	    top: 39%;
	}
	ul li .sureChoice {
		font-family: "juanPiIco";
		font-size: 0.6rem;
		font-style: normal;
		color: #9b9b9b;
		position: absolute;
	    left: 3%;
	    top: 39%;
	    color: #ff464e;
	}
	ul li .singleChoice:before {
		content: "\e622";
	}
	ul li .sureChoice:before {
		content: "\e621";
	}
	ul li img {
		float: left;
		width: 2.1rem;
		height: 2.1rem;
		margin-left: 150px;
		position: absolute;
    	top: 15%;
	}
	ul li .size {
		position: absolute;
	    left: 32%;
	    top: 15%;
	}
	ul li .size p:first-of-type {
		color: #666;
		margin-bottom: 0.15rem;
	}
	ul li .prices {
	 	position: absolute;
	    right: 3%;
	    top: 15%;
	    text-align: right;
	}
	ul li .prices p:nth-of-type(2) {
		text-decoration: line-through;
		margin-top: 0.15rem;
	}
	ul li > div p:first-of-type {
		font-size: 0.42rem;
	}
	ul li > div p:nth-of-type(2) {
		font-size: 0.36rem;
		color: #bbb;
	}
	ul li .goodsNumber {
		width: 2.51rem;
		height: 0.69rem;
		position: absolute;
		left: 32%;
    	top: 47%;
	}
	li .goodsNumber .reduce, li .goodsNumber .add {
		display: inline-block;
		width: 0.69rem;
		height: 0.69rem;
		background-color: #f4f4f8;
		color: #ccc;
		line-height: 0.69rem;
		font-style: normal;
		text-align: center;
		font-size: 0.42rem;
	}
	li .goodsNumber .add {
		color: #ff464e;
	}
	li .goodsNumber span {
		font-size: 0.42rem;
		color: #333;
	}
	.goodEmpty {
		width: 100%;
		height: 7.81rem;
		background-color: #fff;
		text-align: center;
	}
	.goodEmpty img {
		width: 4.2rem;
		height: 4.2rem;
		margin-top: 0.2rem;
	}
	.goodEmpty p:first-of-type {
		font-size: 0.42rem;
		color: #333;
	}
	.goodEmpty a {
		display: block;
		border: 2px solid  #ff464e;
		color:  #ff464e;
		font-size: 0.42rem;
		width: 3.5rem;
		height: 1.2rem;
		line-height: 1.2rem;
		margin-left: 36%;
		margin-top: 0.6rem;
	}
</style>