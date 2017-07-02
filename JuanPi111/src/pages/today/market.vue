<template>
	<div id="market">
		<div id="adBanner">
			<img src="../../../static/marketImg/5935200cad0a493f548b45d9_750x400.png">
		</div>
		
		<ul class="maretnav">
			<li v-for = "(item,index) in market" @click = "rotate(index)" :class = "{'navColor':index == currentIndex}" class="marketLi">
				<a :href="'#'+index">{{ item.gname}}</a>
			</li>
			
		</ul>
		<div class="marketCon" v-for = "(item,index) in market" >
			<!-- <div  class = "empty" :style = "{'height':value}"></div> -->
			<img :src = "item.img" :id="index" >
			
			<ul>
				<li class="markeList" v-for = "a in item.goodsList" >
					<img :src="a.r2">
					
					<p class="goodInfo">{{ a.q }}</p>
					<p class = "goodPrice">
						<span>专享价</span>
						<span><strong>￥</strong>{{a.u}}</span>
						<s>￥{{ a.i}}</s>
					</p>
					<button class="buyNow">立即购买</button>  
					
				</li>
			</ul>

		</div>
		<a href="#adBanner" class="top"></a>
		<ol class="marketNav" :class = "{'scrollbar':flag}" >
			<li v-for = "(item,index) in market" :class = "{'navColor':currentIndex == index}" @click = "rotate(index)" >
			<a :href="'#'+index">{{ item.gname }}</a></li>
			<li></li>
			<span></span>
		</ol>
	</div>
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
				market:[],
				goodlist:[],
				scroll:'',
				flag:null,
				currentIndex:0,
				value:0+"px",
				scrollFlag: true
				
				
			}
		},
		created(){
			this.axios.get('../../static/data/market.json').then(res=>{
				console.log(res.data.data);
				this.market = res.data.data['1661458'];
			});
		},
		methods:{
			scrollBar() {
	        this.scroll = document.body.scrollTop;
	        if(this.scroll>500){
	        	this.flag = true;
	        }else{
	        	this.flag = false;
	        }

	      },
	      rotate(index){
	      	this.currentIndex = index;
	      	setTimeout(function () {
	      		document.body.scrollTop -= 120;
	      	}, 0)
	      }
	      
		},
		mounted() {
	      window.addEventListener('scroll', this.scrollBar)
	    }
	}


</script>
<style type="text/css">
	#adBanner img{
		width: 100%;
		display: block;
	}
	.maretnav{
		font-size: 0;

	}
	.marketLi{
		/*display: inline-block;*/
		font-size: 42px;
		width:33.33%;
		float: left;
		box-sizing:border-box;
		height: 1.52rem;
		line-height: 1.52rem;
		text-align: center;
		background-color: hsl(185, 87%, 34%);
		border-bottom: 3px solid gray;
		border-right: 4px solid gray;

	}
	.maretnav li a{
		color: hsl(0, 56%, 98%);
	}
	/*商品列表头部*/
	.marketCon{
		background-color:hsl(190, 46%, 90%); 
	}
	.marketCon>img{
		display: block;
		width: 100%;
	}
	/*商品*/
	.markeList{
		background-color: white;
	    width: 46%;
	    display: inline-block;
	    margin-left: 0.31rem;
	    margin-bottom: 0.39rem;
	    text-align: center;
	}
	.markeList img{
		width: 5.76rem;
	}
	.goodInfo{
		font-size: 36px;
		color: #6b6b6b;
		text-align: center;
	}
	.goodPrice{
		color:hsl(185, 84%, 42%);
		font-size: 48px;
		text-align: center;
	}
	.goodPrice span:nth-of-type(1){
		font-size: 36px;
	}
	.goodPrice s{
		color:#d8d8d8;
		font-size: 36px;
	}
	.goodPrice strong{
		font-weight: normal;
		font-size: 36px;
	}
	.buyNow{
		width: 5.28rem;
		height: 0.81rem;
		text-align: center;
		font-size: 36px;
		color: white;
		background-color:hsl(185, 84%, 42%);
		border: 1px solid hsl(185, 84%, 42%);
		border-radius: 6px;
		position: relative;
    	bottom: 26px;


	}
	/*顶置*/
	.top{
		width: 1.5rem;
	    height: 1.5rem;
	    border-radius: 1.70667rem;
	    text-align: center;
	    display: inline-block;
	    border: 1px solid #e7e7e7;
	    margin-right: 0.256rem;
	    margin-top: 0.256rem;
	    position: fixed;
	    bottom:2.0rem;
	    right: 0.04rem;
	    z-index: 10;
	    background:url(../../../static/marketImg/back-top.png) no-repeat 0.3rem center;
	    background-size: 60%; 
	    background-color: #fff;
	}
	/*顶部菜单*/
	.marketNav{
		width: 100%;
		height: 1.49rem;
		position: fixed;
		top: 0;
		left: 0;
		background: #4a4a4a;
		overflow: hidden;
	    overflow-x: scroll;
	    white-space: nowrap; 
	    display: none;
	}
	 .marketNav>li{
		width: 3.07rem;
	    
	    border-right:  1px solid #383838;
	    display: inline-block;
	    text-align: center;
	    font-size: 40px;
	        line-height: 143px;
	}
	.marketNav>li a{
		color: white;
	}
	.marketNav span{
		background: url(../../../static/marketImg/tab_more.png) no-repeat 0.4rem center;
	    background-size: 48%;
	    position: fixed;
	    width: 1.49333rem;
	    height: 1.49rem;
	    display: inline-block;
	    text-align: center;
	    top: 0;
	    right: 0;
	    z-index: 3;
	    background-color: #666;
	}

	/*变颜色*/
	.scrollbar{
		display: block;
	}
	.navColor{
		background-color: hsl(185, 88%, 26%);
	}
	.empty{

	}



</style>