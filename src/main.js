import Vue from 'vue'
import App from './App.vue'
import vuePdfViewer from './lib/index.js'
console.log(vuePdfViewer)
Vue.use(vuePdfViewer)
new Vue({
  el: '#app',
  render: h => h(App)
})
