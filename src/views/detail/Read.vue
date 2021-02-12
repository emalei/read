<template>
  <div class="read" :class="{night:isNight}">
    <header @click="init">圣墟</header>
    <section>
      <p class="prve" @click="prve"></p>
      <p class="set" @click.stop="visibleSet=!visibleSet"></p>
      <p class="next" @click="next"></p>
      <div class="content" ref="content">
        <h1 v-html="bookInfo.name"></h1>
        <div v-html="bookInfo.content"></div>
      </div>
    </section>
    <a-drawer placement="right" :closable="false" :visible="visibleDir" @close="onClose">
      <myList :list="list" @onSelect="onSelect"></myList>
    </a-drawer>
    <footer>
      <span>1/9</span>
      <span>{{progress}}%</span>
    </footer>
    <div class="float" v-if="visibleSet">
      <div class="add_bookshelf" @click="addBookshelf">加入书架</div>
      <div class="top" :class="{night:isNight}">
        <a-icon type="left"></a-icon>
      </div>
      <div class="bottom" :class="{night:isNight}">
        <a-row type="flex" justify="space-between">
          <a-col>上一章</a-col>
          <a-col>
            <a-progress :percent="Number(progress)" :show-info="false" />
          </a-col>
          <a-col>下一章</a-col>
        </a-row>
        <a-row type="flex" justify="space-between">
          <a-col @click="openDir">
            <a-icon type="unordered-list" />
            <p>目录</p>
          </a-col>
          <a-col @click="onNight">
            <a-icon type="bulb" />
            <p v-if="isNight">白天</p>
            <p v-else>夜间</p>
          </a-col>
          <a-col>
            <a-icon type="setting" />
            <p>设置</p>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script>
import List from "./List";
export default {
  name: "read",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    defaultActive: {
      default: "",
      type: String
    },
    searchbUrl: {
      type: String
    },
    selector: {
      type: String
    }
  },
  components: {
    myList: List
  },
  data() {
    return {
      contents: {},
      active: this.defaultActive,
      progress: 0,
      visibleDir: false,
      visibleSet: false,
      isNight: false
    };
  },
  computed: {
    bookInfo() {
      let bi = this.list.find(item => item.href === this.active);
      if (!bi) {
        bi = this.list[0];
        this.active = bi.href;
      }
      return { ...bi, content: this.contents[this.active] };
    }
  },
  created() {
    this.init();
  },
  methods: {
    addBookshelf(){

    },
    onNight() {
      this.isNight = !this.isNight;
    },
    openDir() {
      this.visibleDir = true;
      this.visibleSet = false;
    },
    prve() {
      this.$refs.content.scrollTo({
        top:
          this.$refs.content.scrollTop -
          this.$refs.content.getBoundingClientRect().height +
          20,
        behavior: "smooth"
      });
      this.visibleSet = false;
    },
    next() {
      this.$refs.content.scrollTo({
        top:
          this.$refs.content.scrollTop +
          this.$refs.content.getBoundingClientRect().height -
          20,
        behavior: "smooth"
      });
      this.visibleSet = false;
    },
    onSelect(item) {
      if (!this.contents[item.href]) {
        this.getChapterContet(this.searchbUrl + item.href, item.href);
      }
      this.active = item.href;
      this.onClose();
    },
    onClose() {
      this.visibleDir = false;
    },
    init() {
      this.getChapterContet(
        this.searchbUrl + this.bookInfo.href,
        this.bookInfo.href
      );
      this.progress = ((this.defaultActive / this.list.length) * 100).toFixed(
        3
      );
      // this.$axios.post("/saveBookInfo", {
      //   id: "3344.txt",
      //   content: "zxczczczxc"
      // });
    },
    getChapterContet(url, id) {
      this.$axios
        .post("/getBodyByUrl", {
          url: url
        })
        .then(res => {
          const dom = this.getHTMLBySeletor(res.body);
          this.$set(this.contents, id, dom.seletor(this.selector).innerHTML);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.read {
  font-family: "黑体";
  background: #f6f6f6;
  height: 100vh;
  header,
  footer {
    padding: 0 0.48rem;
    font-size: 0.1rem;
    color: #b6b6b6;
    height: 0.8rem;
    line-height: 0.8rem;
  }
  section {
    color: #454545;
    padding: 0 0.48rem;
    height: calc(100% - 1.6rem);
    position: relative;
    h1 {
      font-size: 0.46rem;
      margin-bottom: 0.6rem;
    }
    .content {
      font-size: 0.4rem;
      line-height: 0.6rem;
      height: 100%;
      overflow-y: auto;
      position: relative;
      z-index: 2;
    }
    .next,
    .prve,
    .set {
      position: absolute;
      left: 0;
      width: 100%;
      z-index: 3;
      height: 33.33%;
      padding: 0;
      margin: 0;
    }
    .prve {
      top: 0;
    }
    .next {
      bottom: 0;
    }
    .set {
      top: 33.33%;
    }
  }
  footer {
    span {
      margin-right: 0.6rem;
    }
  }
}
.float {
  .top,
  .bottom {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    padding: 0 0.4rem;
    background: #fff;
    border-bottom: 1px solid #eee;
    z-index: 4;
    .anticon-left {
      font-size: 0.4rem;
      color: #666;
    }
  }
  .bottom {
    top: auto;
    bottom: 0;
    color: #666;
    height: auto;
    border-top: 1px solid #eee;
    border-bottom: none;
    line-height: initial;
    .ant-row-flex {
      &:first-child {
        padding: 0.4rem 0;
        .ant-col:nth-child(2) {
          flex: 1;
          padding: 0 0.4rem;
        }
      }
      &:last-child {
        .ant-col {
          text-align: center;
          font-size: 0.2rem;
          .anticon {
            font-size: 0.4rem;
            margin-bottom: 0.2rem;
          }
        }
      }
    }
  }
  .add_bookshelf{
    position: fixed;
    right: 0;
    top: 20%;
    height: 0.8rem;
    line-height: 0.8rem;
    background: #fa5559;
    color: #fff;
    z-index: 5;
    padding: 0 0.4rem;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
}
.night {
    background: #1a1a1a!important;
    color: #b3b1b1!important;
    section,.anticon {
      color: #b3b1b1!important;
    }
    border-color: transparent!important;
    &.bottom,&.top{
    background: #262626!important;
    }
  }
</style>