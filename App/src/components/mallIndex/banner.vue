<template>
    <div class="banner-box">
        <div class="search-icon"><a href="/search"><img src="../../assets/images/searchBtn.png" alt=""></a></div>
        <div class="bd swipe" id='mySwipe'>
            <ul class="swipe-wrap">
                <li v-for="banner in bannerInfo">
                    <div class="m-width">
                        <a @click="bannerHref(banner.bannerHref,banner.itemId,banner.goodsNum,banner.itemType)"><img
                                :src="banner.bannerImgUrl" /></a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="banner-btn">
            <div class="hd">
                <ul>
                    <li v-for="(banner,index) in bannerInfo" :class="activeTab(index)" @click="slideToCur(index)">1</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    @import "../../assets/css/banner.css";
    /*搜索按钮*/
    .search-icon{
        position: absolute;
        top:1rem;
        right:1rem;
        width: 3rem;
        height: 3rem;
        border-radius: 1.5rem;
        z-index: 1;
        a{
            -webkit-tap-highlight-color:rgba(255,0,0,0);
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
    /*导航*/
    .banner img{
        width:100%;
        height:15rem;
    }

    .banner-box .hd ul li{
        width:0.5rem;
        height:0.5rem;
        border-radius:50%;
        text-indent:-9999px;
        margin-right:0.4rem;
        background:rgba(255,255,255,0.4);
        cursor:pointer;
    }

    li.on{
        background:#FFF;
        width:0.5rem;
        height:0.5rem;
    }

    .swipe{
        overflow:hidden;
        visibility:hidden;
        position:relative;
    }

    .swipe-wrap{
        overflow:hidden;
        position:relative;
    }

    .swipe-wrap > li{
        float:left;
        width:100%;
        position:relative;
    }
</style>
<script>
    import Swipe from '../../assets/js/swipe.js'
    import 'whatwg-fetch'

    export default {
        data(){
            return {
                bannerInfo:[] ,
                mySwipe:{} ,
                currentTab:'' ,
                currentItem:0
            }
        } ,
        created(){
            var $this = this

            $this.getBanner()
            $this.$bus.on('tabChange' , function (index){
                $this.currentTab = index
            })
        } ,

        methods:{
            getBanner(){
                var $this = this
                fetch(apiHost +'/caapiv2/getBannerList' , {
                    credentials:'same-origin' ,
                    method:'POST' ,
                    headers:{
                        'Content-Type':'application/json'
                    } ,

                }).then(function (tresponse){
                    return tresponse.json()
                }).then(function (tjson){
                    if (tjson.data && tjson.data.bannerList && tjson.data.bannerList.length > 0) {
                        for (let i = 0 ; i < tjson.data.bannerList.length ; i++) {
                            $this.bannerInfo.push(tjson.data.bannerList[i])
                        }
                        $this.$nextTick($this.swipe)
                    }
                })

            } ,
            activeTab(i){
                let $this = this
                if (i == $this.currentItem)
                    return 'on'


            } ,
            bannerHref(url , itemId , goodsNum, sectionType){
                if (url) {
                    window.location.href = url
                } else {
                    let newType = 0
                    let id=''
                    switch (sectionType) {
                      case 0:
                        newType = 1
                        id = itemId
                        break
                      case 1:
                        newType = 4
                        id = goodsNum
                        break
                      case 2:
                        newType = 3
                        id = goodsNum
                        break
                      case 4:
                        newType = 9
                        id = itemId
                        break
                      case 5:
                        newType = 6
                        id = itemId
                        break
                      case 6:
                        newType = 12
                        id = goodsNum
                        break
                    }
                    window.location.href = "item/" + id + "?s_type=" + newType
                }
            }
            ,
            swipe(){
                var $this = this;
                var elem = document.getElementById('mySwipe')
//                $('.hd>ul>li').eq(0).addClass('on').siblings().removeClass('on')
                $this.mySwipe = Swipe(elem , {
                    startSlide:0 ,
                    continuous:true ,
                    speed:1000 ,
                    auto:4000 ,
                    callback:function (index , element){
                        $this.currentItem = index
//                        $('.hd>ul>li').eq(index).addClass('on').siblings().removeClass('on')
                    } ,
                })
            }
            ,
            slideToCur(index){
                var self = this
                self.mySwipe.slide(index , 300)
            }
            ,
        }
    }
</script>
