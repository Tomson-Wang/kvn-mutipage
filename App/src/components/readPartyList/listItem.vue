<style lang="less">
    @import "../../assets/css/listCommon.css";
</style>
<template>

    <a :href="targetHref" class="list-item">
        <a class="img_box">
            <img v-if="!imgLoadError" :src="itemImg" @error="onImgLoadError">
            <img v-else src="">
            <span>大咖领读</span>
        </a>
        <div>
            <h1>{{itemTitle}}</h1>
            <h2>主讲人：{{itemAuthor}}</h2>
            <p v-html="itemDescription"></p>
            <h3 v-if="price>0">{{price | formatPrice}}</h3>
            <h3 v-else>免费领取</h3>
        </div>
    </a>
</template>
<script>
    export default {
        props:['itemId' , 'resId' , 'itemImg' , 'itemTitle' , 'itemAuthor' , 'price' , 'itemDescription'] ,
        data(){
            let $this = this
            return {
                'targetHref':'../item/' + $this.itemId + '?s_type=' + authData.sectionType + '&res_id=' + $this.resId ,
                'imgLoadError':false
            }
        } ,
        methods:{
            onImgLoadError(){
                this.imgLoadError = true
            }
        }
    }
</script>