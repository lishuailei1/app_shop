
import {mapGetters} from 'vuex'

export default {
	onShow() {
		//页面展示，设置数字徽标
		this.setBadge()
	},
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + '' //text的值必须是字符串，不能是数字
			})
		}
	},
	watch:{
		total(){
			this.setBadge()
		}
	}
}