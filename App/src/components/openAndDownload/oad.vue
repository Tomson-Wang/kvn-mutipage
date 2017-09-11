<style lang="less">
    /*app 服务号关注*/
    .Links{
        background:#FFF;
    }

    div.mentionPop{
        display:block;
        width:100%;
        height:100%;
        position:fixed;
        top:0;
        left:0;
        z-index:999999999;
        background:rgba(0, 0, 0, 0.8);
        text-align:center;
        padding-top:1.5rem;
        display:none;

    a.closePop{
        position:absolute;
        top:1rem;
        right:1rem;
        color:#FFF;
        border:solid 1px #FFF;
        padding:0.5rem 1rem;
        border-radius:0.5rem;
    }

    img{
        margin-top:7.6rem;
        width:15rem;
        height:15rem;
    }

    p{
        font-size:1.2rem;
        color:#ffffff;
        margin-top:1.7rem;
    }

    }

    div.Links div.qrCode-container{
        display:flex;
        flex-direction:row;
        justify-content:center;
        width:90%;
        /*height: 4rem;*/
        text-align:center;
        font-size:1.1rem;
        padding:0.5rem 0;
        color:#CD1F1F;
        margin:0 auto;
    }

    div.open-app{
        width:48.5%;
        height:3rem;
        line-height:3rem;
        border:solid 1px #CD1F1F;
        border-radius:4px;
        margin-right:1.5%;
    }

    div.open-wechat{
        width:48.5%;
        height:3rem;
        line-height:3rem;
        border:solid 1px #CD1F1F;
        border-radius:4px;
        margin-left:1.5%;
    }
</style>
<template>
    <div v-if="shown" class="Links">
        <div class="mentionPop">
            <a class="closePop" @click="hideMention()">关闭</a>
            <img src="../../assets/images/appqrcode.png" />
            <p>更多操作，请长按二维码关注公众号</p>
        </div>
        <div class="qrCode-container">
            <div class="open-app" @click="downloadApp()">打开【中信书院】APP</div>
            <div class="open-wechat" @click="showMention()">关注【中信书院】服务号</div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                shown:false
            }
        } ,
        created(){
            if (location.href.indexOf('shareref=app0') > 0) {
                this.shown = true
            }
        } ,
        methods:{
            showMention(){
                var d = document.getElementsByClassName('mentionPop')[0]
                d.style.display = 'block'
            } ,
            downloadApp(){
                window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.citicpub.fly"
            } ,

            hideMention(e){
                var d = document.getElementsByClassName('mentionPop')[0]
                d.style.display = 'none'
            } ,
        }
    }
</script>