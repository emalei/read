<template>
  <div>
    <a-row class="search_header" type="flex" justify="space-between" align="middle">
      <a-col>
        <a-icon type="search"></a-icon>
      </a-col>
      <a-col>
        <a-input v-model="searchTxt" :allowClear="true" placeholder="搜索你感兴趣的内容"></a-input>
      </a-col>
      <a-col>
        <a-button type="link" @click="onSearch" v-if="searchTxt">搜索</a-button>
        <a-button type="link" @click="onCancel" v-else>取消</a-button>
      </a-col>
    </a-row>
    <section class="m-pad search_section">
      <div @click="goBookDetail(items)" v-for="(items,k) in searchList" :key="k">
        <div>{{items.name}}</div>
        <div>{{items.author}} · {{items.words}} · {{items.start}}</div>
        <div>{{items.updateNow}} · {{items.newChapter}}</div>
      </div>
    </section>
  </div>
</template>

<script>
import weblist from "@/web-config/index";
import { mapGetters } from "vuex";
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
        start: "" //状态
      },
      searchList: [],
      loading: false,
      searchTxt: "" //搜索文字
    };
  },
  computed: mapGetters({
    HISTORY: "getHistory"
  }),
  methods: {
    //取消搜素
    onCancel() {
		console.log(2);
      this.$router.go(-1);
    },
    goBookDetail(bookDetail) {
      //跳转书籍详情
      let bookInfo = {
        ...bookDetail,
        id: bookDetail.config.id + "_" + bookDetail.bookUrl.replace(/\//g, "")
      };
      this.$store.dispatch("setHistory", bookInfo);
      this.$router.push("/detail/" + bookInfo.id);
    },
    onSearch() {
      weblist.map(item => {
        const config = item.config;
        this.searchApi(config, this.searchTxt);
      });
    },
    searchApi(config, v) {
      this.loading = true;
      this.$axios
        .post("/getBodyByUrl", {
          url: config.search.searchUrl + encodeURI(v)
        })
        .then(
          res => {
            this.loading = false;
            let dom = document.createElement("div");
            dom.innerHTML = res.body;
            let selector = config.search.selector;
            if (dom.querySelector(selector.list)) {
              this.searchList = [];
              [...dom.querySelectorAll(selector.list)].map(item => {
                let opt = { config };
                Object.keys(this.listOpt).map(k => {
                  if (selector[k]) {
                    const attr = selector[k].split("|")[1];
                    const sel = selector[k].split("|")[0];
                    if (attr && item.querySelector(sel)) {
                      opt[k] = item.querySelector(sel).getAttribute(attr);
                    } else if (item.querySelector(sel)) {
                      opt[k] = item.querySelector(sel).innerHTML;
                    } else {
                      opt[k] = "无";
                    }
                  } else {
                    opt[k] = "无";
                  }
                });
                this.searchList.push(opt);
              });
            }
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
.search_header {
  box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.1);
  /deep/.ant-input-affix-wrapper {
    .ant-input {
      border: 0;
      height: 0.8rem;
      padding: 0;
      &:hover {
        border: 0;
        box-shadow: none;
      }
    }
  }
  .ant-col:nth-child(1) {
    padding: 0 0.1rem 0 0.2rem;
    font-size: 0.4rem;
  }
  .ant-col:nth-child(2) {
    flex: 1;
  }
  .ant-btn-link {
	color: #999;
	padding-left: 0;
  }
}
.search_section {
  height: calc(100vh - 0.8rem);
  overflow-y: auto;
  background: #fbfbfb;
  > div {
    padding: 0.3rem 0;
    border-bottom: 1px solid #f7f7e9;
    div {
      &:first-child {
        font-size: 0.3rem;
        font-weight: bold;
      }
      &:nth-child(2),
      &:nth-child(3) {
        color: #ccc;
        font-size: 0.24rem;
      }
    }
  }
}
</style>
