<template>
    <div class="video-box">
        <a class="close_btn"  @click="videoReturn()">X</a>
        <video autoplay :src="src"></video>
    </div>
</template>
<style>
    div.video-box{
        position:fixed;
        top:0;
        left:0;
        z-index:999999;
        background:rgba(0, 0, 0, 1);
        width:100%;
        height:100%;
    }
    div.video-box a.close_btn{
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        font-size: 1.5rem;
        color: #FFF;
    }
    video{
        width:100%;
        height: 20rem;
        position: absolute;
        top: 50%;
        margin-top: -10rem;
        background-color:#000000;
    }
</style>
<script>
  import 'whatwg-fetch'
  export default{
    props: ['src'],
    data(){
      return {
      }
    },
    created(){
    },
    methods:{
      videoReturn(){
        var $this = this
        $this.$bus.$emit('close')
      }
    }
  }
</script>