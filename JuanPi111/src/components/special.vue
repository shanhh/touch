<template>
	<div id="special">
		<div class="topMU">
		<span class="resver" @click="backs()"></span>
			<p>{{ getItem.title }}</p>
		<span class="dot"></span>
		</div>
		<div class="line"></div>
		<div class="nameSp">
			<dl>
				<dt><img src="../../static/hyimages/juanpi_files/591ea9b9ad0a49f15d8b45d5_180x90.png"></dt>
				<dd>佣金女装专场</dd>
				<dd>共89件商品</dd>
			</dl>
			<div class="enter">
				<span class="like"></span>
				<p>收藏店铺</p>
			</div>
		</div>
		<div class="coupon">
			<div class="cou">
				
			
				<div class="price"><span>￥</span>5</div>
				<div class="full">
					<p>满5元使用</p>
					<p>仅限当前专场使用</p>
				</div>
				<div class="once">
					<p>立即领取</p>
				</div>
		</div>
	</div>
	<div class="time">
		<p class="p1">距离结束还有</p>
		<p class="p2">- <span>0</span>天<span>23</span>时<span>26</span>分<span>58</span>秒 -</p>
	</div>
	<div class="hot">
		<p>-爆款热卖-</p>
	</div>
	<div class="cloths">
		<dl v-for="item in goods1">
			<dt @click="goComm(item)"><img :src="item.pic_url"></dt>
			<dd>
				<p>￥{{ item.tuan_price}}<span>拼</span><s>{{ item.oprice }}</s></p>
				<p>{{ item.title }}</p>
			</dd>
		</dl>
	</div>

	<div class="hot">
		<p>-正在特卖-</p>
	</div>
	<div class="sort">
		<ul>
			<li @click="all();changeFlag(1)" :class="{lis: flag == 1}" attrNum="1">综合</li>

			<li @click="price();changeFlag(2);" :class="{lis: flag == 2}" attrNum="2">价格
			<span :class="flag != 2 ? 'resvers' : { 'resvers_top': priceBgColor, 'resvers_bottom': !priceBgColor}"></span></li>

			<li @click="sales();changeFlag(3)" :class="{lis: flag == 3}" attrNum="3">销量</li>
			<li @click="onlay();changeFlag(4)" :class="{lis: flag == 4}" attrNum="4">仅看有货<span :class="flag == 4 ? 'mySpan':'myspan'"></span></li>
		</ul>
	</div>
	<div class="cloths">
		<dl v-for="item in goods2">
			<dt @click="goComm(item)"><img :src="item.pic_url"></dt>
			<dd>
				<p>￥{{ item.tuan_price}}<span>拼</span><s>{{ item.oprice }}</s></p>
				<p>{{ item.title }}</p>
			</dd>
		</dl>
	</div>
	<div class="dis" ref="dd">
		<p @click="getEle()">5元优惠券，满5元可用</p>
		<span>立即领取</span>
	</div>

	</div>
	

</template>
<script type="text/javascript">
	export default{
		name:'special',
		data(){
			return{
				id:this.$route.params,
				goods1:[],
				goods2:[],
				scoll :'',
				flag:1,
				flager:true,
				priceBgColor: true
				// console.log(id)
			}
		},
		methods:{
			//跳转到详情页面
			goComm(item){
				this.$router.push('/details/');
				this.$store.commit('CHANGEGOOD', item);
				// this.$store.commit('ADD_GOODSNUM',item)
			},
			//页面滚动 标签显示隐藏
			retScoll(){
				this.scoll = document.body.scrollTop;
				if (this.scoll >200) {
					this.$refs.dd.style.display = "block";
				}else{
					this.$refs.dd.style.display = "none";
				}
				// console.log(this.scoll);

			},
			//返回
			backs(){
				history.back();
			},
			//综合排序
			all(){
				this.axios.get('../../../static/data/goods.json').then(res=>{
					this.goods2 = res.data.data.special;
				})
			},
			//价格排序
			price(){
				this.axios.get('../../../static/data/price1.json').then(res=>{
					this.goods2 = res.data.data.special;
				})
			},
			//销量
			sales(){
				this.axios.get('../../../static/data/salse.json').then(res=>{
					this.goods2 = res.data.data.special;
				})
			},
			//只看有货
			onlay(){
				this.axios.get('../../../static/data/onlay.json').then(res=>{
					this.goods2 = res.data.data.special;
					// this.flag =!this.flag;
				})
			},
			//点击事件 改变样式
			changeFlag (attrNum) {//改变flag值
				if(attrNum == 2){//判断点击的是否是价格排序
					this.flag = attrNum;
					this.priceBgColor = !this.priceBgColor
				}else{
					//只要针对 只看有货 的点击改变样式
					if(this.flag == 4){
						this.flag = false
					}else{
						this.flag = attrNum
					}
				}
			}

		},
		created(){
			this.axios.get('../../../static/data/goods.json').then(res=>{

				this.goods1 = res.data.data.hot;
				console.log(this.goods1);
				this.goods2 = res.data.data.special;
			})
		
		},
		// 页面渲染之后 添加绑定事件
		mounted(){
			// window.addEventListener('scroll',this.retScoll)

		},
		//获取点击对象的数据
		computed:{
			getItem(){
				return this.$store.state.addGood
			}
		}
	}
</script>
<style type="text/css">
	.sort{
		width: 100%;
		padding-bottom: 0.15rem;
		padding-top: 0.15rem;
		background-color: #fff;
		border-bottom: 1px solid #ebebeb;
		text-align: center;
		
	}
	.sort ul{
		width: 100%;
		display: flex;
		font-size: 42px;
		justify-content:space-around;
	}
	.lis{
		color:red;
	}

	/*价格上下*/
	.resvers{
		background: url(../../static/hyimages/juanpi_files/sort-sprite.png)no-repeat;
		vertical-align: middle;
		display: inline-block;
		background-position-x:0;
		width: 0.27rem;
		height: 0.45rem;
		margin-left:0.15rem;
		background-size: 1.47rem;  
	}
	.resvers_top{
		background: url(../../static/hyimages/juanpi_files/sort-sprite.png)no-repeat;
		vertical-align: middle;
		display: inline-block;
		background-position-x:-0.54rem;
		width: 0.27rem;
		height: 0.45rem;
		margin-left:0.15rem;
		background-size: 1.47rem;
	}
	.resvers_bottom{
		background: url(../../static/hyimages/juanpi_files/sort-sprite.png)no-repeat;
		vertical-align: middle;
		display: inline-block;
		background-position-x:-0.27rem;
		width: 0.27rem;
		height: 0.45rem;
		margin-left:0.15rem;
		background-size: 1.47rem;
	}


	.pri{
		background: url(../../static/hyimages/juanpi_files/sort-sprite.png)no-repeat;
		vertical-align: middle;
		display: inline-block;
		background-position-x:-0.54rem;
		width: 0.27rem;
		height: 0.45rem;
		margin-left:0.15rem;
		background-size: 1.47rem;  
	}
	.price{
		background: url(../../static/hyimages/juanpi_files/sort-sprite.png)no-repeat;
		vertical-align: middle;
		display: inline-block;
		background-position-x:-0.27rem;
		width: 0.27rem;
		height: 0.45rem;
		margin-left:0.15rem;
		background-size: 1.47rem;  
	}
	/*只看有货图标*/
	.myspan{
		background: url(../../static/hyimages/juanpi_files/sort-sprite.png)no-repeat;
		background-position-x:-0.81rem;
		background-position-y:-0.09rem;
		margin-left: 0.15rem;
		width: 0.33rem;
		height: 0.27rem;  	
		background-size: 1.47rem;
		display: inline-block;
		vertical-align: middle;

	}
	.mySpan{
		background: url(../../static/hyimages/juanpi_files/sort-sprite.png)no-repeat;
		background-position-x:-1.14rem;
		background-position-y:-0.09rem;
		margin-left: 0.15rem;
		width: 0.33rem;
		height: 0.27rem;  	
		background-size: 1.47rem;
		display: inline-block;
		vertical-align: middle;
	}
	.dis{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		font-size:42px; 
		display: none;

	}
	.dis p{
		display: inline-block;
		padding-top:0.2rem;
		padding-left: 0.3rem; 
		padding-bottom: 0.2rem;
	}
	.dis span{
		float: right;
		border:1px solid red;
		margin-top:0.3rem;
		margin-right: 0.3rem; 
		margin-bottom: 0.2rem;
		padding-right: 0.1rem;
		padding-left: 0.1rem;

		color: red;

	}
	.line{
		width: 100%;
		height: 0.3rem;
		background-color: #f4f4f8;
	}
	/*顶部菜单*/
	.topMU{
		width: 100%;
		height: 1.32rem;
		line-height: 1.32rem;
		font-size: 54px;
		padding-right: 1.08rem;
		padding-left: 108px;
		box-sizing:border-box;
		background-color: #fff;
		text-align: center;
		position: relative;

	}
	.resver{
		font-family: "juanPiIco";
		font-size: 0.7rem;
		position: absolute;
		left: 0.3rem;
	}
	.resver:before{
		content:"\e60b";
	}
	.dot{
		font-family: "juanPiIco";
		font-size: 0.7rem;
		position: absolute;
		right: 0.3rem;
		top:0.1rem;
	}
	.dot:before{
		content:"\e60e";
	}
	.nameSp{
		width: 100%;
		padding-bottom: 0.42rem;
		padding-top: 42px;
		padding-right: 0.42rem;
		padding-left: 0.42rem;
		box-sizing:border-box;
		font-size: 0.42rem;
		background-color: #fff;
		position: relative;

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
		margin-right: 0.25rem;
		position: relative;
		top: -0.1rem;
		line-height: 1;
		vertical-align: middle;
		display: inline-block;
		padding-left: 0.3rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		color: #666;
		font-size: 0.33rem;
		text-align: center;


	}
	.enter p{
		padding-top: 0.2rem;
	}
	.like{
		font-size: 0.7rem;
		font-family: "juanPiIco";



	}
	.like:before{
		content: "\e612";
		
	}
	/*优惠券*/
	.coupon{
		width: 100%;
		box-sizing:border-box;
		background-color: #fff;

		
		
	}
	.cou{
		width: 11.06rem;
		height: 2.16rem;
		/*padding-right: 0.42rem;*/
		/*padding-left: 0.42rem;*/
		background: url(../../static/hyimages/juanpi_files/coupon_bg.png)no-repeat;
		background-size: 100%;
		display: flex;
		font-size: 0.36rem; 
		margin: 0 auto;
		box-sizing: border-box;
	}
	.cou div{
		display: inline-block;
		vertical-align: middle;
		box-sizing: border-box;
	}
	.cou .price{
		width: 3.3rem;
		height: 2.16rem;
		line-height: 1.8rem;
		text-align: center;
		font-size: 108px;
		color: #333;
	}
	.cou .price span:first-child{
		font-size: 48px;
		color: #333;
	}
	.cou .full{
		width: 3.84rem;
		height: 2.16rem;
		font-size: 36px;
		box-sizing: border-box;
		padding-top: 0.68rem;
	}
	.cou .full p{
		line-height: 0.4rem;
		color: #666;
	}
	.cou .once{
		width: 3.84rem;
		height: 2.16rem;
		box-sizing: border-box;
		padding-top: 0.8rem;
		text-align: center;
	}
	.cou .once p{
		display: inline-block;
		line-height: 0.75rem;
		padding: 0 0.38rem;
		font-size: 42px;
		background-color: #ff464e;
		color: #fff;
	}
	.time{
		width: 100%;
		text-align: center;
		padding-top: 0.3rem;
	}
	.p1{
		font-size: 30px;

	}
	.p2{
		font-size: 30px;
		padding-bottom: 0.3rem;
	}
	.p2 span{
		font-size: 42px;
	}
	.hot{
		width: 100%;
		text-align: center;
		background-color: #fff;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
	.hot p{
		font-size: 42px;
	}
	.cloths{
		width: 100%;
	}
	.cloths dl{
		width: 50%;
		font-size: 36px;
		display: inline-block;
	}
	.cloths dl dt{
		width: 100%;
	}
	.cloths dl dt img{
		width: 100%;
	}
	.cloths dl dd {
		padding-left: 0.2rem;
	}
	.cloths dl dd p:first-child{
		color: red;
	}
	.cloths dl dd p:first-child span{
		font-size: 0.3rem;
		background-color: red;
		color: #fff;
		padding: 0.03rem;
		margin-left: 0.1rem;
		margin-right: 0.1rem;
	}
	.cloths dl dd p:first-child s{
		font-size: 30px;
		color: #999;
	}
	.cloths dl dd p:last-child{
		padding-top: 0.1rem;
	}
</style>