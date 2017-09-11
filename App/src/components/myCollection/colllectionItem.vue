<style lang="less">
    .box{
        display:inline-block;
        width:25.3vw;
        margin-right:8.3vw;

    h3{
        font-size:1.3rem;
        color:#323232;
        margin-bottom:1rem;
        margin-top:1.1rem;
        overflow:hidden;
        text-overflow:ellipsis;
        max-width:25.3vw;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
        font-weight:normal;
    }

    .img_box{
        position:relative;

    img{
        width:25.3vw;
        height:34.6vw;
        border:1px solid #d2d2d2;
        border-radius: 6px;
    }

    span{
        position:absolute;
        right:-1px;
        top:0;
        padding:0 0.5rem;
        height:1.7rem;
        line-height:1.7rem;
        text-align:center;
        display:inline-block;
        background:#ff9518;
        font-size: 1rem;
        color:#ffffff;
        font-weight:normal;
    }

    }
    .conforming{
        width:25.3vw;
        height:34.6vw;
        position:absolute;
        background:rgba(0, 0, 0, .7);
        display:flex;
        flex-direction:column;
        justify-content:center;

    p{
        color:#FFF;
        font-size:1.1rem;
        font-style:normal;
        text-align:center;

    }

    }
    }

    .box:nth-child(3n){
        margin-right:0;
    }
</style>
<template>
    <div class="box">
        <div @click="goTo" class="img_box">
            <img :src="img">
            <span v-if="hasBuy">已购</span>
        </div>
        <h3>{{buyGoodsName}}</h3>
    </div>

</template>
<script>
    export default {
        props:['goodsId' ,'id','goodsType','goodsNum', 'buyGoodsName' , 'img' ,'hasBuy'],
        computed:{
            sType(){
                let $this = this
                let res = ''
                switch ($this.goodsType) {
                    case 1:
                        res = '有声书'
                        break
                    case 4:
                        res = '课程'
                        break
                    case 3:
                        res = '大咖领读'
                        break
                    default:
                        res = false
                        break
                }
                return res
            }
        } ,
        methods:{
            goTo(){
//              1为有声书，2为视频，3为读书会，4为课程 5 年包，6 电子书，7 浓缩书
              let goods_type = ''
              switch (this.goodsType) {
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
                window.location.href = "../item/" + this.goodsNum + "?s_type=" + goods_type
              } else {
                if(goods_type===0 ||goods_type ===11 || goods_type===1){
                  goods_type=1
                }
                window.location.href = "../audios/" + this.goodsNum + "?s_type=" + goods_type
              }
            }
        }
    }
</script>