<style lang="less">
    /*文字稿*/
    .synopsis{
        background: #ffffff;
        padding: 1.3rem 3.75vw;
        font-size: 1.2rem;
        color: #131313;
        line-height: 1.6rem;
        /*text-indent: 2em;*/
        text-align: justify;
        pre{
           white-space: pre-wrap;
            overflow-x: hidden;
        }
    }
    .scroll{
        padding-bottom: 10rem;
    }
</style>
<template>
    <div>
        <div v-bind:class="['synopsis',playFlag?'scroll':'']"><pre v-html="draft"></pre></div>
    </div>
</template>
<script>
  export default{
    props: ['draft','hasBought','playFlag'],
    data(){
      return {
//        showPlayer: false
      }
    },
    created() {
      /*监听播放按钮的触发*/
    }
  }
</script>