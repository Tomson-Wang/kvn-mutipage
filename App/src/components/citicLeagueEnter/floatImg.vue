<style lang="less">
  a.float-img-btn{
    display:block;
    width:40px;
    position:fixed;
    z-index:999;

  img{
    width:40px;

  }

  }


</style>
<template>
  <a class="float-img-btn" @touchstart="dragStart" @touchmove="dragOver" :style="[computedStyle]">
    <img src="../../assets/images/cl-enter.png" alt="">
  </a>
</template>
<script>
  export default {
    data(){
      return {
        left:0 ,
        top:0 ,
        middle:{left:0 , top:0}
      }
    } ,
    created(){
      this.left = 60
      this.top = 200
    } ,
    computed:{
      computedStyle(){
        let $that = this
        let imgLeft = $that.left > 0 ? ($that.left + 40 > window.screen.availWidth ? window.screen.availWidth - 40 : $that.left) : 0
        let imgtop = $that.top > 0 ? ($that.top + 60 > window.screen.availHeight ? window.screen.availHeight - 60 : $that.top) : 0

        return {
          left:imgLeft + 'px' ,
          top:imgtop + 'px'
        }
      }
    } ,
    methods:{
      dragStart(e){
        this.middle.left = this.left - e.touches[0].pageX
        this.middle.top = this.top - e.touches[0].pageY
        e.preventDefault()
      } ,
      dragOver(e){
        this.left = e.touches[0].pageX + this.middle.left
        this.top = e.touches[0].pageY + this.middle.top
      }
    }
  }
</script>
