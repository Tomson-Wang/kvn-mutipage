<template>
    <div class="sub" @click="goSubDetail(itemId)">
        <img :src="goodsImg">
    </div>
</template>
<style lang="less">
    .subject-wrap .subject .sub{
        width: 41.8vw;
        height: 24.2vw;
        float: left;
        margin-bottom: 3.9vw;
        border-radius: 7px;
        cursor: pointer;
    }
    .subject-wrap .subject .sub img{
        width: 41.8vw;
        height: 24.2vw;
        border-radius: 3px;
        display: inline-block;
    }
    .subject-wrap .subject .sub:nth-child(odd){
        margin-right: 3.4vw;
    }
    .subject-wrap .subject .sub:nth-child(even){
        margin-left: 3.4vw;
    }
</style>
<script>
  export default{
    props:['itemId','goodsImg','goodsType','goodsNum'],
    data(){
      return {
        msg: 'hello vue'
      }
    },
    methods:{
      goSubDetail(){
        var that = this
        window.location.href = "../item/" + that.itemId + "?s_type=6"
      }
    }
  }
</script>