<template>
	<view>
		<!-- 选择收货地址盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
			<button class="btn" type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<!-- 渲染收获地址盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：{{address.userName}}</view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：{{address.telNumber}}</view>
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{addStr}}</view>
			</view>
		</view>
		<!-- 底部边框线 -->
		<image class="address-border" src="../../static/tab_icons/cart_border@2x.png" mode=""></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {
				// address: {}
			};
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),
			//选择收获地址
			async chooseAddress() {
				//返回第一项为错误对象，第二项为成功之后的收货地址对象
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				//用户成功的选择了收货地址
				if (err === null && succ.errMsg === "chooseAddress:ok") {
					//为data里面的收货地址对象赋值
					// this.address = succ
					this.updateAddress(succ)
				}
			}
		},
		computed: {
			...mapState('m_user', ['address']),
			//收获详细地址的计算属性
			...mapGetters('m_user', ['addStr'])
		}
	}
</script>

<style lang="scss">
	.address-border {
		display: block;
		width: 100%;
		height: 5px;
	}

	.address-choose-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-right {
				display: flex;
				justify-content: space-between;
			}
		}

		.row2 {
			display: flex;
			// justify-content: space-between;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}
		}
	}
</style>