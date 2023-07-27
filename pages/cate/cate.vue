<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh+'px'}">
				<block v-for="(item,index) in cateList" :key="index">
						<view :class="['left-scroll-view-item',index===active?'active':'']" @click="activeChange(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height: wh+'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,index2) in cateLevel2" :key="index2">
					<view class="cate-lv2-title">/{{item2.cat_name}}/</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon.replace('dev','web')" mode=""></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//窗口可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度
				wh:0,
				cateList:[],   //分类数据列表
				active:0,      //默认激活项
				cateLevel2:[]  ,//二级分类列表
				scrollTop:0
			};
		},
		onLoad(){
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getCateList()   //获取分类数据列表方法
		},
		methods:{
			//获取分类列表
			async getCateList(){
				//发送请求
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status !==200) return uni.$showMsg()
				//请求成功
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children
			},
			activeChange(index){
				this.active = index
				this.cateLevel2 = this.cateList[index].children
				this.scrollTop = this.scrollTop === 0 ? 1:0
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
				})
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width: 120px;
		.left-scroll-view-item{
			text-align: center;
			line-height: 60px;
			background-color: #f7f7f7;
			font-size: 12px;
			&.active {
				position: relative;
				background-color: #fff;
				&::before{
					content:'';
					display:block;
					width: 3px;
					height: 30px;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
					background-color: #f00000;
				}
			}
		}
	}
	.right-scroll-view{
		.cate-lv2-title{
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
		}
		.cate-lv3-list{
			display: flex;
			flex-wrap: wrap;
			.cate-lv3-item{
				width: 33.33%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 10px;
				image{
					width: 60px;
					height: 60px;
				background-color: blueviolet;
				}
				text{
					font-size: 12px;
				}
			}
		}
	}
}
</style>
