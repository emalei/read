<template>
	<div>
		<header class="m-pad">
			<a-input-search placeholder="搜索你感兴趣的内容" @search="onSearch" :loading="loading" enter-button />
		</header>
		<section class="m-pad">
			<div @click="goBookDetail(items)" v-for="(items,k) in searchList" :key="k">
				<div>
					{{items.name}}
				</div>
				<div>
					{{items.author}} · {{items.words}} · {{items.start}}
				</div>
				<div>
					{{items.updateNow}} · {{items.newChapter}}
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import weblist from "@/web-config/index";
	import {mapGetters} from 'vuex'
	export default {
		name: "search",
		data() {
			return {
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
		computed:mapGetters({
			HISTORY:'getHistory'
		}),
		methods: {
			goBookDetail(bookDetail){//跳转书籍详情
				let bookInfo = {...bookDetail,id:bookDetail.config.id+'_'+bookDetail.bookUrl.replace(/\//g,'')};
				this.$store.dispatch("setHistory",bookInfo);
				this.$router.push('/detail/'+bookInfo.id);
			},
			onSearch(v) {
				weblist.map(item => {
					const config = item.config;
					this.searchApi(config, v);
				});
			},
			searchApi(config, v) {
				this.loading = true;
				this.$axios.post("/getBodyByUrl", {
					url: config.search.searchUrl + encodeURI(v)
				}).then(res=>{
					this.loading = false;
					let dom = document.createElement("div");
					dom.innerHTML = res.body;
					let selector = config.search.selector;
					if(dom.querySelector(selector.list)){
						this.searchList = [];
						[...dom.querySelectorAll(selector.list)].map(item=>{
							let opt = {config};
							Object.keys(this.listOpt).map(k=>{
								if(selector[k]){
									const attr = selector[k].split('|')[1];
									const sel = selector[k].split('|')[0];
									if(attr && item.querySelector(sel)){
										opt[k] = item.querySelector(sel).getAttribute(attr);
									}else if(item.querySelector(sel)){
										opt[k] = item.querySelector(sel).innerHTML
									}else{
										opt[k] = '无';
									}
								}else{
									opt[k] = '无';
								}
							})
							this.searchList.push(opt);
						})
					}
				},ero=>{
					this.loading = false;
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	header {
		/deep/.ant-input-search {
			.ant-input {
				border: 0;
				height: 0.8rem;
				outline: 0;
			}
		}
	}
	section{
		height: calc(100vh - 0.8rem);
		overflow-y: auto;
		>div{
			padding: 0.3rem 0;
			border-bottom: 1px solid #f7f7e9;
			div{
				&:first-child{
					font-size: 0.3rem;
					font-weight: bold;
				}
				&:nth-child(2),&:nth-child(3){
					color: #ccc;
					font-size: 0.24rem;
				}
			}
		}
	}
</style>
