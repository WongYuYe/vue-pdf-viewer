<template>
  <div id="app">
    <button @click="openpdf">openpdf</button>
    <div>{{pdfUrl}}</div>
    <!-- <vue-pdf-viewer :pdfurl="pdfUrl" @closepdf="closepdf" v-show="isshowpdf"></vue-pdf-viewer> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      pdfUrl: "//cdn.mozilla.net/pdfjs/tracemonkey.pdf",
      isshowpdf: false
    }
  },
  methods: {
    openpdf() {
      this.isshowpdf = true;
    },
    closepdf() {
      this.isshowpdf = false;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
