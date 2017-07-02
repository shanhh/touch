<template>
	<div id="search">
		<div class="back">
			<span @click="back"></span>
			<p>全部分类</p>
		</div>
		<div class="search_ipt">
			<form action="">
				<span class="search_ico"></span><input type="text" placeholder="搜索商品">
			</form>
		</div>
		<div class="nav">
			<ul class="left">
				<li class="left_li" v-for="(item,index) in navData" :class="{'choose_color':index === selected}" @click="choose(index)">{{ item.name }}</li>
			</ul>
			<ul class="right">
				<li v-for="(item,index) in navData" v-show="index == selected">
					<div v-for="item1 in item.secondCateList">
						<img :src="'//s2.juancdn.com'+item1.icon+'?iopcmd=convert&dst=webp'" alt="">
						<p>{{ item1.name }}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'search',
		data(){
			return {
				navData: [],
				listData: [],
				selected:0

			}
		},
		methods: {
			back(){
				history.back()
			},
			choose(index){
				this.selected = index;
				// console.log(this.selected);
			}
		},
		created(){
			this.axios.get('../static/data/searchData.json').then(res => {
				//console.log(res.data);
				this.navData = res.data;
			},err => {
				console.log(err);
			})
		}
	}
</script>

<style type="text/css">
	/*#app .tabbar{
		display: none;
	}*/
	#search{
		background-color: #fff;
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 1000;
	}
	.back{
		width: 100%;
		height: 1.32rem;
		line-height: 1.32rem;
		width: 100%;
	    position: relative;
	    z-index: 199;
	    border-bottom: 1px solid #dedede;
	}
	.back span{
		font-family: "juanPiIco";
		font-size: 72px;
		margin-left: 0.36rem;
		vertical-align: top;
		display: inline-block;
	}
	.back span:before{
		content: "\e60b";
	}
	.back p{
		display: inline-block;
		font-size: 54px;
		vertical-align: top;
		width: 10.26rem;
		text-align: center;
		padding-left: 0.32rem;
		color: #333;
	}
	.search_ipt{
		width: 100%;
		height: 0.72rem;
		margin: 0.38rem 0;
	}
	.search_ipt form{
		width: 11.62rem;
		height: 0.93rem;
		margin: 0 0.38rem;
		border: 1px solid #dedede;
		box-sizing: border-box;
		line-height: 0.93rem;
		padding-left: 0.2rem;
	}
	.search_ipt form span{
		display: inline-block;
		width: 0.72rem;
		height: 0.72rem;
		background: url(../../static/directImgs/search.png) no-repeat;
		background-size: 100%;
		position: relative;
		top: -0.05rem;
	}
	.search_ipt form input{
		width: 93%;
    	height: 97%;
		outline: none;
		border: none;
		line-height: 0.93rem;
		vertical-align: top;
		box-sizing: border-box;
		padding-left: 0.2rem;
		font-size: 39px;
		color: #999;
	}
	::-webkit-input-placeholder{
		color: #999;
	};
	.nav{
		position: relative;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}
	.nav .left{
		width: 3.1rem;
		height: 19.2rem;
		background: #f9f9f9;
		font-size: 42px;
		float: left;
	}
	.nav .left .left_li{
		width: 3.14rem;
		height: 1.37rem;
		box-sizing: border-box;
		border-bottom: 1px solid #ebebeb;
    	border-left: 4px solid #f9f9f9;
    	line-height: 1.36rem;
    	text-indent: 1em;
	}
	.nav .right{
		width: 9.31rem;
		height: 19.2rem;
		float: left;
		position: relative;
		z-index: 100;
		background-color: #fff;
		overflow: hidden;
		box-sizing: border-box;
		padding-left: 0.49rem;
		white-space: nowrap;
		overflow-y: scroll;
		padding-bottom: 1.0rem;
	}
	.nav .right li{
		overflow: hidden;
		margin-top: 0.3rem;
	}
	.nav .right li div{
		float: left;
		width: 2.81rem;
		height: 3.1rem;
		font-size: 36px;
		box-sizing: border-box;
		padding: 0 0.44rem;
	}
	.nav .right li div img{
		display: block;
	}
	.nav .right li div p{
		text-align: center;
		line-height: 0.6rem;
		color: #333;
	}
	.nav .left .choose_color{
		color: #ff464e;
    	border-left: 4px solid #ff464e;
    	background-color: #fff;
	}
</style>