<template>
	<div id="dress">
			
	<!-- 女装分类  上面一行-->
		<div class="kindClass">
			<div>
				<div class="kind" v-for="item in data">
					<img :src="item.pic"/>
				</div>
			</div>
		</div>
	<!-- 女装分类  下面一行-->
		<div class="kindClass">
			<div>
				<div class="kind" v-for="item in data1">
					<img :src="item.pic"/>
				</div>
			</div>
		</div>
		<!-- 线 -->
		<div class="line"></div>
		<!-- 搭配 热销 一周流行 -->
		<div class="clothing">
			<div v-for="item in data2">
				<img :src="item.pic" >
			</div>
		</div>
		<!-- 线 -->
		<div class="line"></div>
		<!-- 品牌 -->
		<div class="brand">
			
				<div class="brands" v-for="item in data3">
					<img :src="item.pic"  @click="goAdd(item)">
				</div>
			
		</div>
		<!-- 第二行 -->
		<div class="brand">
			
				<div class="brands" v-for="item in data4">
					<img :src="item.pic"  @click="goAdd(item)">
				</div>
			
		</div>
		<div class="line"></div>
		<!-- 上新 -->
		<div class="updata">
			<img :src="data5">
		</div>
		
		<!-- 女装专场 -->
		<div class="specil">
			<div class="lists" v-for="item  in sdata" @click="transmit(item)">
				<img :src="item.pic_url" @click="goAdd(item)">
				<p class="favorAble">{{ item.coupon.rules[0].aeBankInfo}}</p>
				<p class="nameSpecil">{{ item.coupon.abName}}</p>
				<span class="newUp">{{item.residue}}</span>
				<i class="shopLogo">
					<img :src=" item.shop_logo ">
				</i>
			</div>
		</div>
		<div class="top" @click="goTop">
			<img src="../../../static/hyimages/juanpi_files/back-top.png">
		</div>
		<div class="null">
			
		</div>
		<!-- <div v-html="htmlContent"></div> -->

	</div>
</template>
<script type="text/javascript">
	export default{
		name:"dress",
		data(){
			return {
				data:[],
				data1:[],
				data2:[],
				data3:[],
				data4:[],
				data5:[],
				sdata:[],
				sUrl:[],
				htmlContent: ''
			}
		},
		created(){
			this.axios.get('../../../static/data/wClass.json').then(res=>{

				this.data = res.data.module_ads.multi_block[0].data[0].child;
				console.log(res.data.module_ads.multi_block);
				this.data1 = res.data.module_ads.multi_block[1].data[0].child;
				this.data2 = res.data.module_ads.multi_block[2].data[0].child;
				this.data3 = res.data.module_ads.multi_block[3].data[0].child;
				this.data4 = res.data.module_ads.multi_block[4].data[0].child;
				// console.log(this.data4);
				this.data5 = res.data.module_ads.multi_block[5].data[0].child[0].pic;

				console.log(res.data);

			});
			this.axios.get('../../../static/data/Wspecial.json').then(res=>{
				this.sdata = res.data.list;
				// this.sUrl = res.data.list[0].target_url;

				this.sdata.map(item => {
					this.sUrl = item.target_url;
					// console.log(item.target_url);
				});

				// console.log('fjlkdsajflkdsajflkdsafjdslafjlkdsa');
				// console.log(this.sUrl);

				
				
			});


			// this.axios.get('/static/data/info.html').then(response => {
			// 	console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa')
			// 	console.log(response.data);

			// 	this.htmlContent = response.data;
			// })
			
		},
		methods:{
			//在方法中进行路由跳转，并传递参数
			transmit(item){

				// console.log(item)
				
				this.$router.push('/special/'+item.title)


			},
			goTop(){
				document.body.scrollTop=0;
				document.documentElement.scrollTop=0;
			},
			goAdd(item){
				this.$store.commit('ADD_ADSGOOD',item);
			}
		}
	}
</script>
<style type="text/css" scoped>
	/*回到顶部*/
	.top{
		width: 1.2rem;
		height: 1.2rem;
		margin-top: 0.4rem;
		position: fixed;
		bottom: 2rem;
		right: 4%;
		margin-left: 34%;
		z-index: 300;
		background-color: #fff;
		border-radius: 50%;
	}
	.top img{
		width: 100%;
	}
	/*女装分类菜单*/
	.kindClass{
		width: 100%;
		background-color: #fff;

	}
	.kindClass:nth-of-type(1){
		padding-top: 1.14rem;
	}
	.kindClass div{
		width: 100%;
		height: 3rem;
		display: flex;
	}
	.kind{
		width: 100%;
		height: 100%;

	}
	.kind img{
		height:100%; 
		position: relative;
		box-sizing:border-box;
	} 
	/*线*/
	.line{
		width: 100%;
		height: 0.4rem;
		background-color: #f4f4f8;
	}
	/*搭配 热销 一周流行*/
	.clothing{
		width:100%;
		overflow: hidden;
		background-color: #fff;

	}
	.clothing div:nth-of-type(1) {
		width: 50%;
		height: 7.55136rem;
		float: left;
	}
	.clothing div:nth-of-type(1) img{
		width: 100%;
		/*float: left;*/
		height: 100%;
	}
	.clothing div:nth-of-type(2),.clothing div:nth-of-type(3){
		width: 50%;
		float: right;
	}
	.clothing div:nth-of-type(2) img,.clothing div:nth-of-type(3) img{
		width: 100%;
		
	}
	/*品牌列表 四个*/
	.brand{
		width: 100%;
		height: 2.2.9808rem;
		background-color: #fff;
	}
	
	.brands{
		width: 50%;
		display: inline-block;
	}
	.brands img {
		width: 100%;
	}
	/*上新时间提示*/
	.updata{
		/*margin-bottom: 50px;*/
		width: 100%;
		height: 1.58976rem;
	}
	.updata img{
		width: 100%;
	}
	/*空div*/
	.null{
		width: 100%;
		height: 200px;
	}
	/*专场列表*/
	.specil{
		width: 100%;
		background-color: #fff;
		
	}
	.specil div:nth-child(2n+1){
		width: 49.5%;
		display: inline-block;
		margin-right: 0.1rem;
		position: relative;
		margin-top: 0.15rem;
	}
	.specil div:nth-child(2n){
		width: 49.69%;
		display: inline-block;
		/*margin-right: 1px;*/
		position: relative;
		margin-top: 0.15rem;
	}
	.lists img{
		width: 100%;
	}
	.favorAble{
		font-size: 0.39rem;
		color: #ff464e;
		height: 0.72rem;
		line-height: 0.72rem;
		margin-left: 0.24rem;
		margin-right: 0.24rem;
	}
	.nameSpecil{
		font-size: 0.36rem;
		color: #333;
		width: 70%;
		line-height: 0.6rem;
		height: 0.6rem;
		margin-left: 0.24rem;
	}
	/*上新*/
	.newUp{
		font-size: 0.33rem;
		color: #bbb;
		float: right;
		position: absolute;  
		right: 0.4rem;
		bottom:0.05rem;
	}
	/*商品logo*/
	.shopLogo{
		width: 1.5rem;
		height: 1rem;
		line-height: 1rem;
		border-width: 2px;
		position: absolute;
		bottom:1rem;
		right: 0.4rem;
		border:1px solid #ebebeb;
		background-color: #fff;
		z-index: 10;
	}
</style>