<style lang="less">
    @import "../../assets/css/listCommon.css";
</style>
<template>
    <a class="list-item" @click="goItem()">
        <a class="img_box">
            <img v-if="!imgLoadError" :src="goodsImg" @error="onImgLoadError">
            <img v-else src="">
            <span>{{goodsType | cornerText}}</span>
        </a>
        <div>
            <h1>{{goodsTitle}}</h1>
            <h2>{{setTitle(goodsType)}}：{{goodsAuthor}}</h2>
            <p v-html="goodsDesc"></p>

            <h3 v-if="price>0 && goodsType!==1">{{price|formatPrice}}<span>¥15</span></h3>
            <h3 v-if="price===0 && goodsType!==1">免费领取</h3>
        </div>
    </a>
</template>
<script>
    export default {
        props:['goodsId' , 'goodsType' , 'goodsNum' , 'goodsImg' , 'goodsTitle' , 'goodsAuthor' , 'price' , 'goodsDesc'] ,
        data(){
//            let $this = this
            return {
//                'targetHref':'../item/' + $this.goodsNum + '?s_type=' + authData.sectionType,
                'imgLoadError':false
            }
        } ,
        methods:{
            onImgLoadError(){
                this.imgLoadError = true
            } ,
            setTitle(gType){
                let title = ''
                switch (gType) {
                  case 1:
                    title = '作者'
                    break
                  case 3:
                    title = '主讲人'
                    break
                  case 4:
                    title = '主讲人'
                    break
                  case 11:
                    title = '作者'
                    break
                  case 12:
                    title = '作者'
                    break
                }
                return title
            },
            goItem(){
              var $this = this
              if ($this.goodsType===1 || $this.goodsType===11){
                window.location.href='../item/' + $this.goodsId + '?s_type=1'
              } else {
                window.location.href='../item/' + $this.goodsNum + '?s_type=' + $this.goodsType
              }
            }
        }
    }
</script>