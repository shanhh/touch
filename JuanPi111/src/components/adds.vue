<template>
	<div id = "adds">
		<header>
			<a href="javascript:;">
			<img src="../../static/addsImg/go_load_new.png">
			</a>
		</header>
		<nav>
			<span class = "first"  @click = "back()"></span>
			<span class = "second">童年时光三架马车专场专场</span>
			<span class = "third"></span>
		</nav>
		<div class = "detailContent">
			<div class = "detail">
				<div class = "detailW">
					<div class = "top">
						<span class = "topFirst">
							<img src="../../static/addsImg/58eee898ad0a49cf398b45cd_180x90.png">
						</span>
						<span class = "topSecond">
							<p class = "topText1">童年时光三架马车专场专场</p>
							<p class = "topText2">共7件商品</p>
						</span>
						<span class = "topThird">
							<p class = "topImg"></p>
							<p class = "topText3">收藏店铺</p>
						</span>
					</div>
					<div class = "bottom">
						<p class = "bottomText">
							<span class = "full">满赠</span>
							<span class = "fullDetail">满1元即赠69元优惠券，限赠一次，数量有限，赠完即止</span>
						</p>
						<p class = "bottomText">
							<span class = "full">满件折</span>
							<span class = "fullDetail">满2件8折</span>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class = "time">
			<p class = "timeP1">距离结束还剩</p>
			<p class = "timeP2">8<span>天</span>8<span>时</span>8<span>分</span>8<span>秒</span></p>
		</div>
		<!-- 爆款热卖 -->
		<div class = "imgContainer">
			<div class = "hotnav" >爆款热卖</div>
			<div v-for = "item in adds" class = "imgDetail">
				<img :src="item.pgpicurl">
				<div class = "imgText">
					<p><span class = 'tuan'>￥{{item.tuan_price}}</span><span class = "ping">拼</span><span class = "oprice">￥{{item.oprice}}</span></p>
					<p class = "title">全球购|{{item.title}}</p>
				</div>
			</div>
		</div>
		<!-- 正在特卖 -->
		<div class = "special">
			<div class = "specialnav" >正在特卖</div>
			<ul class = "specialUl">
				<li>综合</li>
				<li>价格</li>
				<li>销量</li>
				<li>仅看有货</li>
			</ul>	
			<div v-for="item in adds1" class = "imgDetail">
				<img :src="item.pgpicurl" >
				<div class = "imgText">
					<p><span class = 'tuan'>￥{{item.tuan_price}}</span><span class = "ping">拼</span><span class = "oprice">￥{{item.oprice}}</span></p>
					<p class = "title">全球购|{{item.title}}</p>
				</div>
			</div>
		</div>
		<div class = "addsBottom">
			<div class = "search">查看全部商品</div>
			<div class = "content">亲,已经到底了</div>
			<ul class = "bottomUl">
				<li>返回首页</li>
				<li>客户端</li>
				<li>电脑版</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name:"adds",
		data(){
			return{
				adds:[],
				adds1:[]
			}
		},
		created(){
			this.axios.get("../static/data/adds.json").then(res=>{
				console.log(res.data.data.hot);
				this.adds = res.data.data.hot;
				this.adds1 = res.data.data.special;
			})
		},
		methods:{
			back(){
				history.back();
			}
		}
	}
</script>
<style>
	body{
		font-family: "微软雅黑";
		background-color: #f4f4f8;
	}
	#adds header{
		height: 1.863rem;
	}
	#adds a,#adds img{
		display: block;
		height: 1.863rem;
	}
	#adds nav{
		height: 1.32rem;
		background-color: white;
		font-size:54px;
		text-align: center;
		line-height: 1.32rem;
	}
	#adds .first{
		font-family: "juanPiIco";
		font-size: 72px;
		display:inline-block;
		position: absolute;
		left:0.3rem;
	}
	#adds .third{
		font-family: "juanPiIco";
		font-size: 90px;
		display: inline-block;
		position: absolute;
		right:0.3rem;
	}
	#adds .first:before{
		content: "\e60b";
	}
	#adds .third:before{
		content: "\e60e";
	}
	#adds .detailContent{
		height: 5.25rem;
		background: url(../../static/addsImg/bg_repeat.png);
	}
	#adds .detail{
		height: 4.65rem;
		padding: 0.3rem;
	}
	#adds .detailW{
		height: 4.65rem;
		background-color: white;
	}
	#adds .top{
		height: 1.47rem;
		padding-top: 0.39rem;
	}
	#adds .topFirst{
		float: left;
		width: 1.35rem;
		height: 1.35rem;
		margin-left: 0.42rem;
		border:1px solid #ebebeb;
	}
	#adds .topFirst img{
		display: inline-block;
		height: 0.675rem;
		vertical-align: middle;
	}
	#adds .topSecond{
		float: left;
		margin-left: 0.42rem;
		height: 1.38rem;
	}
	#adds .topText1{
		font-size: 42px;
		padding-bottom: .3rem;
	}
	#adds .topText2{
		font-size: 36px;
		color:#333;
		opacity: .5;
	}
	#adds .topThird{
		display: inline-block;
		margin-left: 3rem;
		padding-top: .1rem;
	}
	#adds .topImg{
		font-family: "juanPiIco";
		font-size: 72px;
		text-align: center;
		margin-bottom: .1rem;
	}
	#adds .topImg:before{
		content: "\e612";
	}
	#adds .topText3{
		font-size: 30px;
		color:#333;	
	}
	#adds .bottom{
		height: 2.4rem;
		margin-top: .45rem;
	}
	#adds .bottomText{
		height: 0.75rem;
		padding-top: .1rem;
	}
	#adds .full{
		float: left;
		padding: 0 .2rem;
		font-size:36px; 
		color:#ff464e;
		border: 1px solid #ff464e;
		margin: 0 0.42rem;
	}
	#adds .fullDetail{
		float: left;
		font-size: 36px;
		color:#333;	
	}
	#adds .time{
		height: 1.54rem;
	}
	#adds .timeP1{
		font-size: 30px;
		color:#999;
		text-align: center;
		padding-top: .3rem;
	}
	#adds .timeP2{
		color:#333;
		font-size: 42px;
		text-align: center;
	}
	#adds .timeP2:before{
		display: inline-block;
	    content: "";
	    vertical-align: middle;
	    width:0.25rem;
	    height:0.01rem;
	    background-color: #333;
	}
	#adds .timeP2:after{
		display: inline-block;
	    content: "";
	    vertical-align: middle;
	    width:0.25rem;
	    height:0.01rem;
	    background-color: #333;
	}
	#adds .timeP2 span{
		display: inline-block;
		font-size: 24px;
		text-align: center;
		padding: 0 .1rem;
	}
	#adds .hotnav,#adds .specialnav{
		height: 1.44rem;
		line-height: 1.44rem;
		background-color:white;
		font-size: 39px;
		color:#333;
		text-align: center;
	}
	#adds .hotnav:before,#adds .specialnav:before{
		display: inline-block;
	    content: "";
	    vertical-align: middle;
	    width:0.25rem;
	    height:0.01rem;
	    background-color: #333;
	}
	#adds .hotnav:after,#adds .specialnav:after{
		display: inline-block;
	    content: "";
	    vertical-align: middle;
	    width:0.25rem;
	    height:0.01rem;
	    background-color: #333;
	}
	#adds .imgContainer{
		overflow:hidden;
		margin-bottom: .3rem;
	}
	#adds .imgDetail{
		float: left;
		width:49%;
		margin-top: .2rem;
	}
	#adds .imgContainer .imgDetail:nth-child(even){
		margin-right:.2rem;
	}
	#adds .imgDetail img{
		height: 6.21rem; 
		width: 100%;
	}
	#adds .imgText{
		background-color: white;
		padding-bottom: .01rem;
	}
	#adds .tuan{
		font-size:45px;
		color: #60e;
		margin-left: 0.24rem;
		margin-right: 0.12rem;
	}
	#adds .ping{
		font-size:30px;
		display: inline-block;
		background-color: #ff464e;
		color:#fff;
		padding: 0.05rem;
	}
	#adds .oprice{
		font-size: 33px;
		color: #bbb;
		text-decoration: line-through;
	}
	#adds .title{
		font-size: 36px;
		margin-left: 0.24rem;
		padding-bottom: .5rem;
	}
	#adds .special{
		overflow:hidden;
	}
	#adds .specialUl{
		height: .9rem;
		background-color: white;
		text-align: center;
		margin-top: .02rem;
		line-height: .9rem;
	}
	#adds .specialUl li{
		float:left;
		font-size: 42px;
		width: 22%;
	}
	#adds .special .imgDetail:nth-child(odd){
		margin-right:.2rem;
	}
	#adds .addsBottom{
		overflow: hidden;
	}
	#adds .search{
		height: 1.44rem;
		background-color: white;
		font-size: 42px;
		text-align: center;
		line-height: 1.44rem;
		margin-top: .3rem;
	}
	#adds .content{
		height: 6rem;
		font-size: .4rem;
		color:#666;
		text-align: center;
		padding-top: .3rem;
	}
	#adds .bottomUl{
		height: 4rem;
		background-color: white;
	}
	#adds .bottomUl li{
		float: left;
		color: #666;
	    font-size: .55rem;
	    line-height: 2rem;
	    margin: 0 auto;
	    width: 31%;
	    border-right: 1px solid #ebebeb;
	    text-align: center;
	}
</style>