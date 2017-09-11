<template>
    <div>
        <div v-if="img" class="weekly-img">
            <img :src="img">
        </div>
        <div class="section-info" >
            <h3 class="section-name">
                <span class="line"></span>
                <span class="name">{{itemName}}</span>
                <span class="line"></span>
            </h3>
            <p v-if="desc" class="sub-intro">{{desc?desc:'暂无简介'}}</p>
        </div>
    </div>
</template>
<style lang="less">
    /* 每天听书图片 */
    div.weekly-img img{
        width: 100%;
        height: 16rem;
        display: block;
        background: #FFF;
        margin-bottom: 0.9rem;
    }
    /*标题介绍*/
    .section-info{
        border-bottom: solid 1px #f3f3f3;
        padding-top: 1.5rem;
        background: #FFF;
    }
    h3.section-name{
        font-size: 1.3rem;
        text-align: center;
        margin-bottom: 1.8rem;
        color: #323232;
        display: flex;
        align-items: center;
        padding: 0 1.5rem;
        flex-direction: row;
        span.line{
            height: 0.6rem;
            border-bottom: solid 1px #B71C21;
            border-top: solid 1px #B71C21;
            flex-grow:1
        }
        span.name{
            margin: 0 1rem;
            font-size: 1.5rem;
        }
    }

     p.sub-intro{
        color: #848484;
        font-size: 1.2rem;
        line-height: 1.8rem;
        padding: 0 4.65vw;
        padding-bottom: 1rem;
    }
</style>
<script>
//  import oad from "../openAndDownload/oad.vue"
  export default{
    props:['img','desc','itemName'],
    data(){
      return {
        msg: 'hello vue'
      }
    },
//    components:{oad} ,
  }
</script>