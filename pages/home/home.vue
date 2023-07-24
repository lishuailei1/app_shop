<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
			indicator-active-color="#f00000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<img :src="item.image_src" alt="">
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image class="nav-img" :src="item.image_src">
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}"
							mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2,index2) in item.product_list" :key="index2" v-show="index2 !==0" :url="item2.url">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [], //轮播图数据列表
				navList: [], //分类导航数据列表
				floorList: [], //楼层数据列表
			};
		},
		onLoad() {
			this.getSwiperList() //页面加载，调用获取轮播图的方法
			this.getNavList() //调用分类导航数据方法
			this.getFloorList() //调用楼层数据的方法
		},
		methods: {
			//获取轮播图数据方法
			async getSwiperList() {
				//发送请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) return uni.$showMsg()
				//请求成功
				this.swiperList = res.message
			},
			//获取分类导航数据方法
			async getNavList() {
				//发送请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				//请求成功
				this.navList = res.message
			},
			//分类项被点击时的事件处理函数
			navClickHandler(item) {
				if (item.name == '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			//获取楼层数据方法
			async getFloorList() {
				//发送请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				//请求成功  处理url地址
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url='/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		img {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-between;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;

		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
</style>