<template>
	<view v-if="goods_info.goods_name" style="padding-bottom: 50px;">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<view class="price">¥{{goods_info.goods_price}}</view>
			<view class="goods-info-body">
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<view class="favi">
					<uni-icons type="star"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">快递：免运费</view>
		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>

		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="customButtonGroup" @click="onClick" @buttonClick="buttonClick"/>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info: {},

				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info:'0'
				}],
				customButtonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
			}
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsDetail(goods_id)
		},
		methods: {
			//获取商品详情数据方法
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				//解决图片地步空白间隙
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
					.replace(/webp/g, 'jpg')
				this.goods_info = res.message
			},
			//轮播图大图预览
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.goods_info.pics.map(item => item.pics_big)
				})
			},
			// 购物车点击事件
			onClick(e){
				if(e.content.text==="购物车"){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			font-size: 18px;
			color: #c00000;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.favi {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 12px;
				width: 120px;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.yf {
			margin: 10px 0;
			color: gray;
			font-size: 12px;
		}
	}
	.goods-carts {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
</style>