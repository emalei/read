<template>
	<div class="home">
		<header class="m-pad">
			<a-row type="flex" justify="space-between">
				<a-col>
					<a-button shape="round" size="small" icon="filter" ghost>筛选</a-button>
				</a-col>
				<a-col>书架</a-col>
				<a-col>
					<router-link to="/search"><a-icon type="search"></a-icon></router-link>
				</a-col>
			</a-row>
		</header>
		<section class="m-mag">
			<a-row type="flex" justify="space-between" v-for="(item,key) in WEBLIST" :key="key">
				<a-col>
					{{item.name}}
				</a-col>
				<a-col>
					<a-icon type="setting"></a-icon>
				</a-col>
			</a-row>
		</section>
	</div>
</template>

<script>
	import weblist from "@/web-config/index";
	export default {
		name: 'Home',
		data(){
			return{
				WEBLIST:weblist
			}
		}
	}
</script>
<style lang="less" scoped>
	header {
		background: #ed424b;

		.ant-row-flex {
			height: 1rem;
			line-height: 1rem;
			color: #fff;
			.ant-btn-background-ghost {
				border-color: rgba(255, 255, 255, 0.5);
			}
			a{
				color: #fff;
				font-size: 0.4rem;
			}
		}
	}
	section{
		margin-top:0.2rem;
		.ant-row-flex{
			border-bottom: 1px solid #f7f7e9;
			.ant-col{
				height:0.8rem;
				font-size:0.28rem;
				font-weight:bold;
				line-height:0.8rem;
				&:last-child{
					color:#999;
				}
			}
		}
		
	}
</style>
