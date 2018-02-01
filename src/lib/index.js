import vuePdfViewer from './vue-pdf-viewer.vue' // 导入组件 
export default {
  install(Vue, options) {
    Vue.component(vuePdfViewer.name, vuePdfViewer)
  }
}