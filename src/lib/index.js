import vuePdfViewer from './vue-pdf-viewer.vue' // 导入组件 
const pdf = {}
pdf.install = (Vue, options) => {
  if (typeof window !== 'undefined' && window.Vue) {
    Vue = window.Vue
  }
  Vue.component(vuePdfViewer.name, vuePdfViewer)
}
export default pdf