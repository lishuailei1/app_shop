export default {
	namespaced: true,

	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations: {
		addToCart(state, goods) {
			//根据提交的商品id查询购物车中是否存在这件商品
			const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if (!findResult) {
				//如果购物车中没有这件商品，直接push
				state.cart.push(goods)
			} else {
				//如果购物车中有这件商品只更新数量
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		//将购物车中的数据持久化，存储到本地
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		//更新购物车中商品勾选状态
		updateGoodsState(state, goods) {
			//根据goods_id 查询购物车中对应商品对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			//有商品对象
			if (findResult) {
				//更新对应商品的勾选状态
				findResult.goods_state = goods.goods_state
				//持久化存储到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		//更新商品数量
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				//更新对应商品数量
				findResult.goods_count = goods.goods_count
				//持久化存储到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		//根ID从购物车中删除对应的商品信息
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		//更新所有商品的勾选状态
		updateAllGoodsState(state, newState) {
			//循环更新购物车中每件商品的勾选状态
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		}
	},
	getters: {
		// 购物车中所有商品的总数量
		total(state) {
			// let c = 0
			// state.cart.forEach(x => c += x.goods_count)
			// return c
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		//勾选的商品总数量
		checkedCount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		// 已勾选商品的总价格
		checkedGoodsAmount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price,
				0).toFixed(2)
		}
	}
}