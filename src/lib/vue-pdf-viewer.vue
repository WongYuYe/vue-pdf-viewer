<template>
  <div id="pdf-viewer">
    <div class="center">
      <div class="contor">
        <button @click="prev">上一页</button>
        <button @click="next">下一页</button>
        <span style="margin: 0 10px; color: #fff">
          当前页：
          <span v-text="pageNum"></span> /
          <span v-text="pageCount"></span>
        </span>
        <button @click="plus">+</button>
        <button @click="minus">-</button>
        <button @click="closepdf">关闭</button>
      </div>
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import PDFJS from "pdfjs-dist";

export default {
  name: "vuePdfViewer",
  props: ["pdfurl"],
  data() {
    return {
      pdfDoc: null, // pdfjs 生成的对象
      pageRendering: false,  //
      pageNumPending: null,
      scale: 1.2, // 放大倍数
      pageNum: 1, // 当前页数
      pageCount: null, // 总页数
      maxscale: 2, // 最大放大倍数
      minscale: 0.8 // 最小放大倍数
    };
  },
  methods: {
    renderPage(pageNum) {
      this.pageRendering = true;
      this.pdfDoc.getPage(pageNum).then(page => {
        const viewport = page.getViewport(this.scale);

        const canvas = this.$refs.canvas;
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        const renderTask = page.render(renderContext);
        // Wait for rendering to finish
        renderTask.promise.then(() => {
          this.pageRendering = false;
          const pageNumPending = this.pageNumPending;
          if (pageNumPending !== null) {
            // New page rendering is pending
            renderPage(pageNumPending);
            this.pageNumPending = null;
          }
        });
      });
    },
    //放大
    plus() {
      if (this.scale >= this.maxscale) return;
      this.scale += 0.1;
      this.queueRenderPage(this.pageNum);
    },
    //缩小
    minus() {
      if (this.scale <= this.minscale) return;
      this.scale -= 0.1;
      this.queueRenderPage(this.pageNum);
    },
    //上一页
    prev() {
      if (this.pageNum <= 1) return;
      this.pageNum--;
      this.queueRenderPage(this.pageNum);
    },
    //下一页
    next() {
      if (this.pageNum >= this.pageCount) return;
      this.pageNum++;
      this.queueRenderPage(this.pageNum);
    },
    closepdf() {
      this.$emit("closepdf");
    },
    /**
     * If another page rendering in progress, waits until the rendering is
     * finised. Otherwise, executes rendering immediately.
     */
    queueRenderPage(pageNum) {
      this.pageRendering
        ? (this.pageNumPending = pageNum)
        : this.renderPage(pageNum);
    }
  },
  mounted() {
    if (!this.pdfurl) return
    PDFJS.getDocument(this.pdfurl).then(pdfDoc => {
      this.pdfDoc = pdfDoc;
      this.pageCount = this.pdfDoc.numPages;
      this.renderPage(this.pageNum);
    });
  }
};
</script>

<style lang="scss" scoped>
#pdf-viewer {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  ::-webkit-scrollbar {
    width: 0
  }
  .center {
    text-align: center;
    height: 100%;
    overflow: auto;
    padding-top: 20px;
    .contor {
      margin-bottom: 10px;
    }
  }
}
</style>
