<style lang="less" scoped>
    @import "cover.less";

    .content{

    h1{
        font-size:1.2rem;
        color:#131313;
        margin-bottom:1.9rem;
    }

    img{
        width:4.7rem;
        height:4.7rem;
        border-radius:2.35rem;
        margin-bottom:1.6rem;
    }

    p{
        width:90%;
        text-align:left;
        font-size:1.2rem;
        color:#131313;
        margin-bottom:1.9rem;
        line-height:1.6rem;
    }

    a{
        width:12rem;
        height:2.5rem;
        border:solid 1px #B71C21;
        border-radius:12px;
        background:#f8e8e8;
        font-size:1.3rem;
        color:#B71C21;
        text-align:center;
        line-height:2.5rem;
    }

    }
</style>
<template>
    <div class="container">
        <div class="content">
            <h1>交易失败</h1>
            <img src="../../assets/images/failed.png">
            <p>
                1.请确认支付账户信息是否正确；<br>
                2.请确认账户余额是否充足。
            </p>
            <a @click="close">关闭</a>
        </div>
    </div>
</template>
<script>
    export default {
        methods:{
            close(){
                wx.closeWindow();
            }
        }
    }
</script>