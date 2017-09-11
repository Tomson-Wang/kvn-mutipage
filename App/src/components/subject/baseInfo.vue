<template>
    <div>
        <!--<div class="Links">-->
            <!--<div class="qrCode-container">-->
                <!--<div class="open-app" @click="downloadApp()">打开【中信书院】APP</div>-->
                <!--<div class="open-wechat" @click="showMention()">关注【中信书院】服务号</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div is="oad"></div>-->
        <div class="weekly-img">
            <img :src="img">
        </div>
    </div>
</template>
<style lang="less">
    /* app 服务号关注 */
    .Links{
        background: #FFF;
    }
    div.Links div.qrCode-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 90%;
        /*height: 4rem;*/
        text-align: center;
        font-size: 1.1rem;
        padding: 0.5rem 0;
        color: #CD1F1F;
        margin:0 auto;
    }
    div.open-app{
        width:48.5%;
        height: 3rem;
        line-height:3rem;
        border:solid 1px #CD1F1F;
        border-radius: 4px;
        margin-right: 1.5%;
    }
    div.open-wechat{
        width:48.5%;
        height: 3rem;
        line-height:3rem;
        border:solid 1px #CD1F1F;
        border-radius: 4px;
        margin-left: 1.5%;
    }
    /* 每天听书图片 */
    div.weekly-img img{
        width: 100%;
        height: 16rem;
        display: block;
        background: #FFF;
    }
</style>
<script>
  import oad from "../openAndDownload/oad.vue"
  export default{
    props:['img'],
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components:{oad} ,
  }
</script>