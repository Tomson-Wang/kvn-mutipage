<template>
    <div class="reCharge-wrap">
        <img src="../../assets/images/syLogo.jpg">
        <div class="title">
            <!--<div class="line"></div>-->
            <div class="ti">给中信书院账号充值</div>
            <!--<div class="line"></div>-->
        </div>
        <div class="wx" @click="toLogin(1)"><a>使用当前微信号登陆</a></div>
        <div class="phone" @click="toLogin(2)"><a>使用手机号登陆</a></div>
    </div>
</template>
<style>
    .reCharge-wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .reCharge-wrap img{
        width: 8rem;
        height: 8rem;
        border-radius: 18px;
        margin-bottom: 4.2rem;
        margin-top: 10rem;
        box-shadow: 0 0 1px #cccccc ;
    }
    .reCharge-wrap .title{
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 90%;
        margin-bottom: 2.5rem;
    }
    /*.reCharge-wrap .title div.line{*/
    /*height: 1px;*/
    /*background: #131313;*/
    /*flex-grow:1*/
    /*}*/
    .reCharge-wrap .title div.ti{
        font-size: 1.2rem;
        color: #131313;
        margin: 0 1rem;
    }
    .reCharge-wrap div.wx,div.phone{
        width:88vw;
        height: 3.5rem;
        line-height:3.5rem;
        /*text-align: center;*/
        border-radius: 4px;
        box-sizing: border-box;
        text-align: center;
    }
    .reCharge-wrap div.wx{
        display: inline-block;
        background:#77cf65;
        margin-bottom: 1rem;
    }
    .reCharge-wrap div.wx a{
        background:url("../../assets/images/wxLogo.png") no-repeat left center;
        background-size: 1.6rem 1.25rem;
        padding-left: 2.5rem;
        display: inline-block;
        color: #ffffff;
    }
    .reCharge-wrap div.phone{
        display: inline-block;
        background:#6eb1c4;
    }
    .reCharge-wrap div.phone a{
        background:url("../../assets/images/phoneLogo.png") no-repeat left center;
        background-size: 1rem 1.35rem;
        padding-left: 2.5rem;
        display: inline-block;
        color: #ffffff;
    }
</style>
<script>
    export default {
        data() {
            return {
                msg: 'hello vue'
            }
        },
        methods:{
            toLogin(v){
              if(v==1){
                 window.location.href = '../accountInfo?a_type=1'
              } else {
                 window.location.href = '../phoneReCharge'
              }
            }
        }
    }
</script>