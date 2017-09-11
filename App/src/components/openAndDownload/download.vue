<template>
    <div class="download-wrap" v-if="showDownloadApp">
        <a @click="downloadApp">下载APP,阅读电子书</a>
    </div>
</template>
<style lang="less">
    .download-wrap{
        width: 89vw;
        height: 3.5rem;
        padding: 0 5.5vw;
        position: fixed;
        display: block;
        bottom: 1.5rem;
        background: #FFF;
        z-index: 99;

        a{
            box-sizing: border-box;
            display:block;
            line-height: 3.5rem;
            border: solid 2px #cb1f1f;
            text-align: center;
            color: #cb1f1f;
            font-size: 1.5rem;
            border-radius: 6px;
            background: #FFF;

        }
    }

</style>
<script>
  export default{
    props:['showDownloadApp'],
    data(){
      return {
        showComp:false
      }
    },
    methods:{
      downloadApp(){
        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.citicpub.fly"
      }
    }
  }
</script>