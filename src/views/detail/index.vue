<template>
  <div class="detail">
	  <a-row type="flex" justify="space-between" align="middle" class="m-pad detail_header">
		  <a-col>
			  <img :src="bookInfo.homeImg" alt="">
		  </a-col>
		  <a-col>
			  <h1>{{bookInfo.name}}</h1>
			  <p>{{bookInfo.author}}</p>
			  <p>{{bookInfo.type}}</p>
		  </a-col>
	  </a-row>
	  <section class="m-pad detail_section">
		  <h2>简介</h2>
		{{bookInfo.introduction}}
	  </section>
	  <section class="m-pad detail_list">
		  <h2>目录</h2>
		  <List :list="bookInfo.list"></List>
	  </section>
	  <div class="detail_reading">
		  <Read v-if="bookInfo.list.length>0" :selector="myHistory.config.content.text" :searchbUrl="searchbUrl" :list="bookInfo.list"></Read>
	  </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getHTMLBySeletor } from "@/plugins/libiary/public.js";
import List from "./List"
import Read from "./Read"
console.log(getHTMLBySeletor);
export default {
  name: "search",
  data() {
    return {
      id: this.$route.params.id,
      bookInfo: {
        name: "", //小说名称
		introduction:"",//简介
		homeImg:"",//封面
		author:"",//作者
		updateNow:"",//最近更新时间
		list:[],//章节列表
		type:"",//小说类别
      },
      searchList: [],
	  loading: false,
	  searchbUrl:''
    };
  },
  computed: {
    ...mapGetters({
      HISTORY: "getHistory"
    }),
    myHistory() {
      return this.HISTORY[this.id];
    }
  },
  components:{
	  List,
	  Read
  },
  created() {
    this.requireBookDetail(this.myHistory);
  },
  methods: {
    requireBookDetail(detail) {
      this.loading = true;
	  const { config } = detail;
	  this.searchbUrl = config.webUrl + detail.bookUrl;
      this.$axios
        .post("/getBodyByUrl", {
          url: this.searchbUrl
        })
        .then(
          res => {
			this.loading = false;
			const dom = this.getHTMLBySeletor(res.body);
			this.bookInfo.name = dom.seletor(config.detail.name).innerText;
			this.bookInfo.introduction = dom.seletor(config.detail.introduction).innerText;
			this.bookInfo.author = dom.seletor(config.detail.author).innerText;
			this.bookInfo.updateNow = dom.seletor(config.detail.updateNow).innerText;
			this.bookInfo.homeImg = dom.seletor(config.detail.homeImg);
			this.bookInfo.list = [...dom.seletorAll(config.detail.list)].slice(config.detail.startIndex).map(item=>{
				return {
					name:item.innerText,
					href:item.getAttribute('href')
				}
			});
			this.bookInfo.type = dom.seletor(config.detail.type).innerText;
          },
          ero => {
            this.loading = false;
          }
        );
    }
  }
};
</script>

<style lang="less" scoped>
.detail{
	position: relative;
	background-color: #fbfbfb;
	&::before{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 5rem;
		content: ' ';
		background-image: radial-gradient(#f38a90,#ed424b);
		z-index: 0;
	}
}
.detail_header{
	height: 4.2rem;
	.ant-col:first-child{
		width: 1.2rem;
	}
	.ant-col:last-child{
		width: 4.2rem;
		color: #fff;
		font-size: 0.24rem;
		h1{
			color: #fff;
			font-size: 0.4rem;
		}
	}
}
.detail_section{
	position: relative;
	background: #fff;
	border-top-left-radius: 0.4rem;
	border-top-right-radius: 0.4rem;
	min-height: 1rem;
	padding-top: 0.4rem;
	padding-bottom: 0.4rem;
	h2{
		font-size: 0.4rem;
	}
}
.detail_list{
	margin-top: 0.2rem;
	background: #fff;
	padding-top: 0.2rem;
	padding-bottom: 0.4rem;
	h2{
		font-size: 0.4rem;
	}
}
.detail_reading{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
}
</style>
