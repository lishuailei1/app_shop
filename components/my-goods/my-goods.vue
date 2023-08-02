<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio v-if="showRadio" :checked="goods.goods_state" color="#c00000" @click="radioClickHandler"></radio>
			<image class="goods-pic" :src="goods.goods_small_logo || defaultPic"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">¥{{goods.goods_price | tofixed}}</view>
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {},
			},
			showRadio: {
				typeof: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultPic: 'https://img2.baidu.com/it/u=372601434,3534902205&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
			};
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			//radio组件点击时间处理函数
			radioClickHandler() {
				this.$emit('radio-change', {
					//商品ID
					goods_id: this.goods.goods_id,
					//商品最新勾选状态
					goods_state: !this.goods.goods_state
				})
			},
			//监听number-box组件数量变化的事件
			numChangeHandler(val) {
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 5px;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;

			.goods-name {
				font-size: 13px
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.goods-price {
					font-size: 16px;
					color: #c00000;
				}
			}
		}
	}
</style>