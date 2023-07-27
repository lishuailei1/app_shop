<template>
	<view>
		<view class="search-box">
			<uni-search-bar focus @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<view class="sugg-list" v-if="searchResults.length !==0">
			<view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="forward" size="13"></uni-icons>
			</view>
		</view>
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" @click="clean"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" type="warning" inverted class="history-item" v-for="(item,index) in histories" :key="index" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,    //定时器
				kw:'',         //搜索关键词
				searchResults:[],  //搜索结果列表
				historyList:[],    //搜索关键字历史记录
			};
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]')
		},
		methods:{
			//输入事件处理函数
			input(e){
				//输入框防抖
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.kw = e
					this.getSearchList()  //根据关键字查询搜索列表
				},500)
			},
			//根据搜索关键字，查询搜索列表
			async getSearchList(){
				if(this.kw.length===0){
					this.searchResults = []
					return
				}
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
				this.searchResults = res.message
				this.saveSearchHistory()
			},
			//点击跳转商品详情
			gotoDetail(item){
				uni.navigateTo({
					// url:'subpkg/goods_detail/goods_detail?goods_id ='+goods_id
					 url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			saveSearchHistory(){
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			//删除历史记录
			clean(){
				this.historyList = []
				uni.setStorageSync('kw','[]')
				
			},
			//点击搜索历史跳转商品列表页面
			gotoGoodsList(kw){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+kw
				})
			}
		},
		computed:{
			histories(){
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
}
.sugg-list{
	padding: 0 5px;
	.sugg-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 13px 0;
		font-size: 12px;
		border-bottom: 1px solid #efefef;
		.goods-name{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}
.history-box{
	padding: 0 5px;
	.history-title{
		height: 40px;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		.history-item{
			margin-top: 5px;
			margin-right: 5px;
		}
	}
}
</style>
