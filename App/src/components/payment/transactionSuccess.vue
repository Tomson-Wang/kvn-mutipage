<style lang="less" scoped>
    @import "cover.less";

    .content{

    h1{
        font-size:1.4rem;
        color:#131313;
        margin-bottom:1.9rem;
        font-weight:normal;
    }

    img{
        width:7.8rem;
        height:11rem;
        margin-bottom:1.6rem;
    }

    h2{
        font-size:1.3rem;
        color:#131313;
        line-height:1.6rem;
        font-weight:normal;
    }

    a{
        width: 90%;
        height: 3rem;
        border: solid 1px #B71C21;
        border-radius: 4px;
        font-size: 1.3rem;
        color: #B71C21;
        text-align: center;
        line-height: 3rem;
        margin-top:1.2rem;
        display: block;
    }

    }
</style>
<template>
    <div class="container">
        <div class="content">
            <h1>支付成功</h1>
            <img :src="order.img|decode">
            <!--<h2>{{order.bookName}}</h2>-->
            <h2>{{order.editionTitle}}</h2>
            <a :href="order.ref|decode">立即查看</a>
        </div>
    </div>
</template>
<script>
    export default {
        props:['order']
    }
</script>