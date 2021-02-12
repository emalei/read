<template>
	<div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getHTMLBySeletor} from '@/plugins/libiary/public.js'
	console.log(getHTMLBySeletor);
	export default {
		name: "search",
		data() {
			return {
				id:this.$route.params.id,
				listOpt: {
					name: "", //小说名称
					bookUrl: "", //书籍链接
					newChapter: "", //最新章节
					newChapterUrl: "", //最新章节
					author: "", //作者
					words: "", //字数
					updateNow: "", //最近更新时间
					start: "", //状态
				},
				searchList: [],
				loading:false
			}
		},
		computed:Object.assign({},mapGetters({
			HISTORY:'getHistory'
		}),{
			myHistory(){
				return this.HISTORY[this.id]
			}
		}),
		created() {
			this.requireBookDetail(this.myHistory);
		},
		methods: {
			requireBookDetail(detail) {
				this.loading = true;
				const {config} = detail;
				this.$axios.post("/getBodyByUrl", {
					url: config.webUrl + detail.bookUrl
				}).then(res=>{
					this.loading = false;
					
				},ero=>{
					this.loading = false;
				})
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
