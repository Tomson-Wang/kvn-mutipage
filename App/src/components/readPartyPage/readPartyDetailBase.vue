<style lang="less">
    body{
        overflow-x: hidden;
    }
    .p_top{
        display:flex;
        justify-content:space-between;
        padding:1.3rem 3.75vw;
        background:#ffffff;
    }

    .p_top .book-cover{
        width:25.3vw;
        height:35vw;
        border:1px solid #d7d7d7;
        border-radius: 6px;
    }

    .p_top_right{
        width:62.6vw;
        display:flex;
        flex-direction:column;
    }

    .detail_info{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        flex-grow: 1;
    }

    .base_info{
        width:93%;
    }

    .detail_info .base_info h1{
        font-size:1.3rem;
        color:#131313;
        font-weight:normal;
        margin-bottom:0.6rem;
        width:100%;
        overflow:hidden;
        text-overflow:ellipsis;
        max-width:100%;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
    }

    .detail_info .base_info h2, h3{
        font-size:1rem;
        color:#5a5a5a;
        font-weight:normal;
        margin-bottom:0.6rem;
        overflow:hidden;
        text-overflow:ellipsis;
        max-width:100%;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:1;
    }

    .detail_info .base_info h3 span{
        margin-right:0.4rem;
    }

    .detail_info .base_info div.p_logo{
        width:1.4rem;
        height:1.4rem;
        /*background:url("../../src/assets/images/play_introduce_img_video.png") no-repeat;*/
        /*background-size: 1.4rem 1.4rem;*/
    }

    .detail_info .base_info div.p_logo img{
        width:1.4rem;
        height:1.4rem;
    }

    .buy-box{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .buy-box a{
        display:inline-block;
        color:#ffffff;
        font-size:1.1rem;
        height:2.2rem;
        line-height:2.2rem;
        /*background:#F85913;*/
        border-radius:2px;
        width:6.3rem;
        text-align:center;
    }

    .buy-box a span{
        margin-right:3px;
    }
    .buy-box .has_bought{
        color: #848484;
        border: solid 1px #848484;
    }

    .buy-box .listening{
        color: #fc7205;
        border: solid 1px #fc7205;
    }
    .buy-box .to_buy{
        border: solid 1px #ce1d15;
        color: #ce1d15;
    }
    /*新版点赞、加入书房、已购*/
    div.detail_bot{
        display: flex;
        box-sizing: border-box;
        padding: 0 1.5rem;
        height: 3rem;
        background: #FFf;
        margin-bottom:0.4rem;
        padding-bottom: 0.8rem;
    }
    div.detail_bot div.c{
        flex: 1;
        height: 2rem;
        line-height:2rem;
        text-align: center;
        border-right:1px solid #c5c5c5;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div.detail_bot div.c:last-child{
        border-right: none;
        border-right: none;
        position: relative;
        left:0.75rem
    }
    div.detail_bot div.c:first-child div.like-box{
        position: relative;
        right: 0.6rem;
    }
</style>
<template>
    <div>
        <div class="p_top">
            <img  class="book-cover" :src="readPartyImg">
            <div class="p_top_right">
                <div class="detail_info">
                    <div class="base_info">
                        <h1>{{readPartyTitle}}</h1>
                        <h2>主讲人：<span>{{speaker}}</span></h2>
                    </div>

                </div>

            </div>
        </div>
        <div class="detail_bot">
            <div class="c">
                <div is="likeComponent" :item-id="goodsId" :like-type="3" :liked="hasLike" :like-count="likeNum"></div>
            </div>
            <div class="c">
                <div is="roomBtn" :hasAddRoom="hasAddRoom" :itemId="goodsId" :goodsId="goodsNum"></div>
            </div>
            <div class="c">
                <div class="buy-box">

                <span v-if="rightsType===1">
                    <a @click="toBuy" v-if="price>0" class="to_buy claim"><span>{{price|formatPrice}}</span>购买</a>
                    <div is="free" :price="price"></div>
                </span>
                    <a v-if="rightsType===3" class="has_bought listening">畅听</a>
                    <a v-if="rightsType===2" class="has_bought">已购</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import 'whatwg-fetch'
    import likeComponent from '../likeBtn/likeButton.vue'  // 点赞
    import roomBtn from '../roomEvent/roomBtn.vue'  // 加入移出书房
    import free from '../freeGet/free.vue'  // 加入移出书房
    export default{
        props:["readPartyImg" ,"limitedBuy" ,"readPartyTitle" , "readPartyType" , "mediaType" , "hasLike" ,"hasAddRoom", "listening", "likeNum" , "speaker" , "rightsType" , "price" ,"goodsNum",'readPartyId', "goodsId"] ,
        data(){
            return {
                resId:authData.resId
            }
        } ,
        created(){
          var $this = this
          $this.$bus.$on('changeBuyStatus',function () {
            $this.hasBought = true
          })
        } ,
        components:{
            'likeComponent':likeComponent,
            'roomBtn':roomBtn,
            'free':free
        } ,
        methods:{
            toBuy(){
                let $this = this
                let order = {
                    bookName:$this.readPartyTitle ,
                    img:encodeURIComponent($this.readPartyImg) ,
                    editionTitle:$this.readPartyTitle ,
                    price:$this.price ,
                    goodsId:$this.goodsNum ,
                    orderId:'' ,
                    ref:encodeURIComponent(window.location.href)
                }
                localStorage.setItem('new-order' , JSON.stringify(order))
                 window.location.href = "/wxpay/" + $this.goodsNum + "?limitStatus=" + $this.limitedBuy+'&&s_type=1'
            } ,
            receiveEvent(){
                  var that = this
                  fetch('../caapiv2/freeGet' , {
                    credentials:'same-origin' ,
                    method:'POST' ,
                    headers:{
                      'Content-Type':'application/json'
                    } ,
                    body:JSON.stringify({
                      itemId:authData.itemId
                    })
                  }).then(function (tresponse){
                       return tresponse.json()
                  }).then(function (tjson){
                        console.log(tjson)
                        if (tjson.data) {
                          let data = JSON.parse(JSON.stringify(tjson.data))
                          if (data.receiveState === 1) {
                            that.hasBought = true
                            that.$bus.$emit('showPlayer')
                          }
                        }
                  })
            }
        }
    }
</script>