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
        font-size:1.2rem;
        color:#131313;
        margin-bottom:1.5rem;
        text-align:left;
    }

    p.count-down{
        font-size:2rem;
        color:#FF0000;
        font-weight:bolder;

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
    <div class="cover_wrapper">
        <div v-if="(!transactionSuccess && !EbookPaySuc) && !transactionFailed" class="container">
            <div class="content">
                <h1>支付成功,交易确认中...</h1>
                <p v-show="!hasNoResult" class="count-down" v-text="countDown"></p>
                <p v-if="hasNoResult">您的订单正在处理中，请关注服务号，稍后在服务号的【我家书房】菜单中查看您所购买的商品。</p>
                <p v-if="hasNoResult">如果24小时后仍未获得您所购买的商品,请拨打客服电话010-84849312，联系客服进行人工处理。</p>
                <a v-if="hasNoResult" @click="close">关闭</a>
            </div>
        </div>
        <div v-if="EbookPaySuc" is="EbookPaySuc" :order="order"></div>
        <div v-if="transactionSuccess" is="transactionS" :order="order"></div>
        <div v-if="transactionFailed" is="transactionF"></div>
    </div>
</template>
<script>
  import transactionS from './transactionSuccess.vue'
  import EbookPaySuc from './EbookPaySuc.vue'
  import transactionF from './transactionFailed.vue'
    export default {
        props:{
            order:Object,
            orderId:String
        } ,
        data(){
            return {
                countDown:15 ,
                hasNoResult:false ,
                transactionSuccess:false ,
                EbookPaySuc: false,
                transactionFailed:false ,
                countDownTimer:null ,
                checkerTimer:null
            }
        } ,
        components:{
            transactionS ,
            transactionF,
            EbookPaySuc
        } ,
        computed:{
            showConfirm(){
                return !this.hasResult && !this.transactionSuccess && !this.EbookPaySuc && !this.transactionFailed
            }
        } ,
        methods:{
            startCountDown(){
                let $this = this
                $this.checkerTimer = setInterval($this.checkPaymentResult , 3 * 1000)
                $this.countDownTimer = setInterval($this.countDownFn , 1 * 1000)
            } ,
            countDownFn(){
                let $this = this
                if ($this.countDown > 0) {
                    console.log('cd')
                    $this.countDown = $this.countDown - 1
                } else {
                    $this.clearTimer();
                    $this.hasNoResult = true
                }
            } ,
            clearTimer(){
                let $this = this
                clearInterval($this.checkerTimer)
                clearInterval($this.countDownTimer)
            } ,
            checkPaymentResult(){
                let $this = this
                fetch('/caapiv2/checkOrderState' , {
                    credentials:'same-origin' ,
                    method:'POST' ,
                    headers:{
                        'Content-Type':'application/json'
                    } ,
                    body:JSON.stringify({
                        "orderId":$this.orderId
                    })
                }).then(function (tresponse){
                    return tresponse.json()
                }).then(function (tjson){
                    if (tjson.data && typeof tjson.data.payStatus != 'undefined') {
                        $this.clearTimer()
                        if (tjson.data.payStatus == 2) {
                          if (authData.type==2){
                            $this.EbookPaySuc = true
                            $this.transactionSuccess = false
                          } else {
                            $this.EbookPaySuc = false
                            $this.transactionSuccess = true
                          }
                        } else if (tjson.data.payStatus == 1) {
                            $this.transactionFailed = true
                        }
                    }

                })

            } ,
            close(){
                wx.closeWindow()
            }
        }
    }
</script>