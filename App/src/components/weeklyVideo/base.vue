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
        /*padding: 0 1.5rem;*/
        width: 100%;
        height: 16rem;
        display: block;
        box-sizing: border-box;
        background: #FFF;
    }
    /* 栏目简介 */
    .weekly-synopsis{
        padding: 1.5rem 1.5rem 0 1.5rem;
        background: #FFF;
    }
    .weekly-synopsis h2{
        background: url("../../assets/images/titleIcon.png") no-repeat;
        padding-left: 2rem;
        background-size: 1.1rem 1.1rem;
        color: #323232;
        font-size: 1.5rem;
    }
    .synopsis-content {
        display: block;
        background: #FFF;
        padding: .4rem 0;
    }

    .loading span{
        background:url("../../assets/images/proloading.png") no-repeat;
    }

    .synopsis-content p{
        font-size:1.2rem;
        line-height:2.2rem;
        color:#848484;
        display:inline-block;
        margin:.3rem 0;
        overflow:hidden;
        transition:all 5s linear;
        text-overflow:ellipsis;
        max-height:5.2rem;
        display:-webkit-box;
        -webkit-box-orient:vertical;
    }

    .synopsis.close{
        overflow:hidden;
        vertical-align:text-top;
        /*text-overflow:-o-ellipsis-lastline;*/
        text-overflow:ellipsis;
        max-height:5.2rem;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        transition:all 3s linear;
    }

    .synopsis.open{
        overflow:hidden;
        max-height:100rem;
        height:auto;
        -webkit-line-clamp:initial;
        transition:all 5s linear;
    }

    .fold-btn {
        width: 100%;
        display: block;
        text-align: center;
        padding-bottom: 1rem;
        background: #FFF;
    }
    span{
        margin:.3rem auto;
        padding:.3rem .3rem .3rem 1.7rem;
        font-size:1rem;
        color:#999999;
        display:inline-block;
    }
    .open-synopsis:before{
        content:'';
        display:inline-block;
        margin:-0.1rem -1.7rem auto;
        width:1.6rem;
        height:1.2rem;
        position:absolute;
        background:url('../../assets/images/down.png') no-repeat;
        background-size:1.2rem .7rem;
        background-position:.3rem center;
    }

    .close-synopsis:before{
        content:'';
        display:inline-block;
        margin:-0.1rem -1.7rem auto;
        width:1.6rem;
        height:1.2rem;
        position:absolute;
        background:url('../../assets/images/down.png') no-repeat;
        background-size:1.2rem .7rem;
        background-position:center center;
        -webkit-transform:rotate(180deg);
        -moz-transform:rotate(180deg);
        -ms-transform:rotate(180deg);
        -o-transform:rotate(180deg);
        transform:rotate(180deg);
    }

</style>
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
        <div class="weekly-synopsis">
            <h2>{{name}}</h2>
            <div class="synopsis-content">
                <div style="display: none" class="loading">
                    <span></span>
                </div>
                <p v-if="desc!==''" :class="['synopsis', isOpen?'open':'close']" style="-webkit-box-orient:vertical">{{desc}}</p>
                <p v-if="desc==''" :class="['synopsis', isOpen?'open':'close']" style="-webkit-box-orient:vertical">暂无简介</p>
            </div>
            <div class="fold-btn">
                <span :class="[isOpen?'close-synopsis':'open-synopsis']" v-on:click="fold()"></span>
            </div>
        </div>
    </div>
</template>
<script>
  import oad from "../openAndDownload/oad.vue"
  export default{
    props:['img','name','desc','id'],
    data(){
      return {
        isOpen: false
      }
    },
    components:{oad} ,
    created(){
    },
    methods:{
     fold(){
       var $this = this
       $this.isOpen = !$this.isOpen
     }
    }
  }
</script>