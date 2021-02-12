<template>
  <div class="read">
    <header @click="init">圣墟</header>
    <section>
      <h1>第一章魂穿赵无极</h1>
      <div>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
    </section>
    <footer>
      <span>1/9</span>
      <span>10%</span>
    </footer>
  </div>
</template>
<script>
export default {
  name: "read",
  data() {
    return {
      startPage: 1 //默认开始章节
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const { query } = this.$route;
      this.startPage = query.startPage || 1;
      this.$axios.post("/saveBookInfo", {
        id: "3344.txt",
        content:"zxczczczxc"
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
  padding: 0 0.48rem;
  header,
  footer {
    font-size: 0.1rem;
    color: #b6b6b6;
    height: 0.8rem;
    line-height: 0.8rem;
  }
  section {
    color: #454545;
    height: calc(100% - 1.6rem);
    h1 {
      font-size: 0.46rem;
      margin-bottom: 0.6rem;
    }
    div {
      font-size: 0.4rem;
      line-height: 0.6rem;
    }
  }
  footer {
    span {
      margin-right: 0.6rem;
    }
  }
}
</style>