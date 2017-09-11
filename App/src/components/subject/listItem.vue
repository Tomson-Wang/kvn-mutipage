<template>
    <div>
        <div class="subject-title" v-for="col in colList">
            <div class="subject-info" >
                <h3 class="subject-name">
                    <span class="line"></span>
                    <span class="name">{{col.topicName}}</span>
                    <span class="line"></span>
                </h3>
                <p class="sub-intro">{{col.topicDesc}}</p>
            </div>
            <div class="list-wraper" v-if="col.topicGoodsInfoList && col.topicGoodsInfoList.length>0">
                <div class="list-item" v-for="goods in col.topicGoodsInfoList" @click="goDetail(goods.goodsNum,goods.goodsType,goods.bookId)">
                    <div class="img_box">
                        <img :src="goods.goodsImg">
                        <a>{{goods.goodsType | subText}}</a>
                    </div>
                    <div>
                        <h1>{{goods.goodsTitle}}</h1>
                        <h2 v-if="goods.goodsType===1 || goods.goodsType===6 || goods.goodsType===7">作者：{{goods.goodsAuthor}}</h2>
                        <h2 v-if="goods.goodsType===3">主讲人：{{goods.goodsAuthor}}</h2>
                        <h2 v-if="goods.goodsType===4">主讲人：{{goods.goodsAuthor}}</h2>
                        <p>{{goods.goodsDesc|decode}}</p>
                        <!--<h3 v-if="goods.price>0 && goods.goodsType!==1">{{goods.price | formatPrice}}</h3>-->
                        <!--<h3 v-if="goods.price===0 && goods.goodsType!==1">免费领取</h3>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    /*专题*/
    .subject-title{
        background: #FFF;
        margin-top: 0.5rem;
        padding: 1.5rem 0;

    }
    .subject-title .subject-info{
        border-bottom: solid 1px #f3f3f3;
    }
    .subject-title h3.subject-name{
        font-size: 1.3rem;
        text-align: center;
        margin-bottom: 1.8rem;
        color: #323232;
        display: flex;
        align-items: center;
        padding: 0 1.5rem;
        flex-direction: row;
        /*span{*/
            /*flex-grow:1*/
        /*}*/
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

    .subject-title p.sub-intro{
        color: #848484;
        font-size: 1.2rem;
        line-height: 1.8rem;
        padding: 0 4.65vw;
        padding-bottom: 1rem;
    }
    /*主题3个列表*/
    .list-wraper{
        display: flex;
        flex-direction: column;
        background: #FFF;
        padding: 0 4.65vw;
    }
    .list-item{
        display: flex;
        justify-content: space-between;
        padding: 1.4rem 0;
        border-bottom: solid 1px #f3f3f3;
    }
    .list-item .img_box{
        position: relative;
        width: 25.3vw;
        height: 34.6vw;
    }
    .list-item .img_box img{
        width: 25.3vw;
        height: 34.6vw;
        border: solid 1px #d7d7d7;
        border-radius: 5px
        /*width:8.1rem;*/
        /*height: 11.1rem;*/
    }
    .list-item .img_box a{
        position: absolute;
        right:-1px;
        top:0;
        /*width: 3.7rem;*/
        padding: 0 0.5rem;
        height: 1.7rem;
        line-height: 1.7rem;
        text-align: center;
        display: inline-block;
        background:#d44340;
        color: #ffffff;
        font-weight: normal;
    }
    .list-item div{
        /*display: inline-block;*/
        width: 62.5vw;
        height: 3rem;
        /*background: #F00;*/
        margin-top: 0.4rem;
    }
    .list-item div h1{
        font-size: 1.2rem;
        color: #131313;
        font-weight: normal;
        margin-bottom: 0.9rem;
        overflow:hidden;
        vertical-align:text-top;
        text-overflow:ellipsis;
        max-height:1.2rem;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
        margin-top: 0.5rem;
    }
    .list-item div h2{
        font-size: 1rem;
        color: #999999;
        font-weight: normal;
        margin-bottom: 0.9rem;
        overflow:hidden;
        vertical-align:text-top;
        text-overflow:ellipsis;
        max-height:1.2rem;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
    }
    .list-item div p{
        font-size: 1rem;
        color: #5a5a5a;
        overflow:hidden;
        vertical-align:text-top;
        text-overflow:ellipsis;
        max-height: 3rem;
        line-height: 1.5rem;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        margin-bottom:1.5rem;
    }
    .list-item div h3{
        font-size: 1.3rem;
        color: #B71C21;
        font-weight: normal;
        text-align: right;
    }
</style>
<script>
  export default{
    props:['colList','colGoodsList'],
    data(){
      return {
        msg: 'hello vue'
      }
    },
    methods:{
      goDetail(num,type,id){
        let goods_type = ''
//        1为有声书，2为视频，3为读书会，4为课程 5 年包，6 电子书，7 浓缩书
        switch (type) {
          case 0:
            goods_type = 0
            break
          case 1:
            goods_type = 1
            break
          case 2:
            goods_type = 2
            break
          case 3:
            goods_type = 3
            break
          case 4:
            goods_type = 4
            break
          case 5:
            goods_type = 9
            break
          case 6:
            goods_type = 11
            break
          case 7:
            goods_type = 12
            break
        }
        if (goods_type ===2|| goods_type ===3||goods_type ===4 ||goods_type ===12) {
          window.location.href = "../item/" + num + "?s_type=" + goods_type
        } else {
          if(goods_type===0 ||goods_type ===11){
            goods_type=1
          }
          window.location.href = "../item/" + id + "?s_type=" + goods_type
        }
      }
    }
  }
</script>