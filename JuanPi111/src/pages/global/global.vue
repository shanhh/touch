<template>
	<div id="global">
		<header>
			<span class = "headText">全球购</span>
			<span class = "headImg"></span>
		</header>
		<div class = "imgContainer">
			<div class = "first">
				<div v-for = "item in globalTop">
					<a href="javascript:;" v-for = "item1 in item.data[0].child">
						<img :src="item1.pic" >
					</a>
				</div>
			</div>
		</div>
		<ul class = "imgList" >
			<li class = "listContainer" v-for = "(item,index) in globalImg">
				<a href="javascript:;">
					<router-link :to = "'/adds/'">
						<div class = "mark"></div>
						<img :src="item.shop_cover" class = "img" @click="goAdds(index)">
					</router-link>
					<router-view></router-view>	
				</a>
				<div class = "box">
					<div class = "boxList">
						<div class = "goodsList" v-for = "item1 in item.shop_goods">
							<a href="javascript:;" class = "itema">
								<img :src="item1.pic_url" alt="">
							</a>
							<a href="javascript:;" class = "goodText">
								<div class = "goodPrice">
									<span class = "cprice">￥{{item1.cprice}}</span>
									<span class = "oprice">￥{{item1.oprice}}</span>
								</div>
								<div class = "goodName">{{item1.title}}</div>
							</a>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "global",
		data(){
			return{
				globalTop:[],
				globalImg:[]
			}
		},
		created(){
			this.axios.get("../static/data/globalTop.json").then(
				res=>{
					//console.log(res.data.module_ads.multi_block);
					//console.log(res.data.module_ads.multi_block[0].data[0].child[0]);
					this.globalTop = res.data.module_ads.multi_block;
				}),
			this.axios.get("../static/data/globalImg.json").then(
				res=>{
					console.log(res.data.list);
					this.globalImg = res.data.list;
				})
		},
		methods:{
			goAdds(index){
				console.log(this.globalImg[index]);
			}
		}
	}
</script>
<style>
	body{
		font-family: "微软雅黑";
	}
	#global {
		background: #f4f4f8;
	}
	#global header {
		height: 1.32rem;
		line-height:  1.32rem;
		width:100%;
		background: white;
		border-bottom: 1px solid #dedede;	
	}
	#global .headText{
		display:block;
		text-align: center;
		font-size: 54px;
		color:#333;
	}
	#global .headImg{
		font-family: "juanPiIco";
		position: absolute;
		right:0.35rem;
		top:0;
	}
	#global .headImg:before{
		content: "\e60c";
		font-size: 72px;
	}
	#global .first div:nth-of-type(1),#global .first div:nth-of-type(2),#global .first div:nth-of-type(3),#global .first div:nth-of-type(4),#global .first div:nth-of-type(5){
		overflow: hidden;
	}
	#global .first div:nth-of-type(1) a,#global .first div:nth-of-type(1) img{
		float: left; 
		height: 2.98rem; 
	}
	#global .first div:nth-of-type(2) a,#global .first div:nth-of-type(2) img{
		float: left;
		height: 2.98rem;
	}
	#global .first div:nth-of-type(3) a,#global .first div:nth-of-type(3) img{
		float:left;
		height: 7.55rem; 
	}
	#global .first div:nth-of-type(3){
		margin-top: .5rem;
	}
	#global .first div:nth-of-type(4) a,#global .first div:nth-of-type(4) img{
		float: left;
		height: 2.6392rem; 
	}
	#global .first div:nth-of-type(4){
		margin-top: .5rem;
	}
	#global .first div:nth-of-type(5) a,#global .first div:nth-of-type(5) img{
		height: 2.6392rem;
		float: left; 
	}
	#global .listContainer{
		margin-bottom: 0.3rem;
	}
	/* #global .imgList .listContainer .mark{
		background: url(../../../static/globalImg/top-jiaobiao.png) no-repeat;
	} */
	#global .img{
		height: 5.8866rem;
		display: block;
		width: 100%;
	}
	#global .box{
		background-color: white;
		padding-top: 0.3rem;
	} 
	#global .boxList{
		height: 5.1rem;
		display: flex;
		white-space: nowrap;
		overflow-x: auto;
	}
	#global .goodsList{
		height: 4.5rem;
		width: 2.7rem;
		margin-left: 0.3rem;
	}
	#global .itema,#global .goodsList img{
		display: block;
		height: 2.7rem;
		width: 2.7rem;
	}
	#global .goodText{
		text-align: center;
	}
	#global .cprice{
		font-size: 36px;
		color: #60e;
	}
	#global .oprice{
		font-size: 36px;
		color: #666;
		text-decoration: line-through;
	}
	#global .goodName{
		font-size: 36px;
		color: #666;
    	white-space: normal;
    	word-break: break-all;
	}
</style>