<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<image class="goods-pic" :src="goods.goods_small_logo || defaultPic"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">¥{{goods.goods_price | tofixed}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{},
			}
		},
		data() {
			return {
					defaultPic:'https://img2.baidu.com/it/u=372601434,3534902205&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
			};
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item{
		display: flex;
		padding: 10px 5px; 
		border-bottom: 1px solid #f0f0f0;
		.goods-item-left{
			margin-right: 5px;
			.goods-pic{
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-item-right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-name{
				font-size: 13px
			}
			.goods-info-box{
				.goods-price{
					font-size: 16px;
					color: #c00000;
				}
			}
		}
	}

</style>