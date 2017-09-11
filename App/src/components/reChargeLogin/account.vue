<template>
    <div class="wrap">
        <div class="top">
            <div class="balance-info">
                <div class="left">
                    <p>苹果手机账号余额：</p>
                    <p class="sum"><strong>28.0</strong></p>
                    <p>手机用户：155****9542</p>
                </div>
                <div class="right" @click="accountChange"><span></span>切换登陆账户</div>
            </div>
            <div class="recharge">
                <h3>选择充值金额</h3>
                <div class="money">
                    <span v-for="(item,index) in arr" :class="[itemId == index ? 'active' : '']" @click="add(index)">¥ {{item}}</span>
                </div>
            </div>
        </div>
        <div class="reminder">
            <h4>温馨提示</h4>
            <p>1、充值到您苹果手机【中信书院】APP账户中。</p>
            <p>2、现阶段只能给苹果手机端充值。</p>
        </div>
        <div class="pay" >
            <div class="pay-btn">
                <a @click.once="openPayBox">充值</a>
                <!--<a v-else>充值</a>-->
            </div>
        </div>
        <div v-show="paymentSuccess" is="rechargeS" :order="order" :orderId="orderId"></div>
        <div v-show="paymentError" is="rechargeE" v-on:to-parent="bind"></div>
        <div is="setTitle" :title="title"></div>
        <div is="returnAndfocus" :detailPage="detailPage"></div>
    </div>
</template>
<style lang="less">
    @import "wechatRecharge.less";
</style>
<script>
    import "whatwg-fetch"
//    import rechargeS from "../components/wechatRecharge/rechargeSuccess.vue"
//    import rechargeE from "../components/wechatRecharge/rechargeError.vue"
    import setTitle from '../../components/setPageTitle/index.vue'
    import returnAndfocus from '../../components/floatZone/return'
    export default {
        data(){
            return {
                arr : [6,68,118,218,388,698],
                itemId : 0,
                phoneNum: '',
                order: {},
                goodsId: '',
                orderId: '',
                paymentParams: {},
                showPayBtn: false,
                paymentSuccess: false,
                detailPage:false,
                paymentError:false,
                title : "充值"
            }
        },
        components: {
//            rechargeS,
//            rechargeE,
            setTitle,
            returnAndfocus

        },
        created(){
            let $this = this
            $this.phoneNum = localStorage.getItem('phoneNum')
            localStorage.removeItem('phoneNum')
            $this.setOrderInfo()
            $this.createOrder()
        },
        watch: {

        },
        methods: {
            add (ind) {// 添加active类
                this.itemId = ind;
            },
            bind () {// 监听失败弹框
                this.paymentError = false;
            },
            accountChange(){
              window.location.href = '../reChargeLogin?tip=1'
            },
            getOrderInfoFromStorage(key){
                let value = localStorage.getItem(key) || false
                console.log(value)
                localStorage.removeItem(key)
                return value
            },
            setOrderInfo(){
                let $this = this
                let dataStr = $this.getOrderInfoFromStorage('new-order')

                if (dataStr) {
                    let orderData = JSON.parse(dataStr)
                    $this.order = orderData
                    $this.goodsId = orderData.goodsId
                }
            },
            createOrder(){
                let $this = this
                if ($this.goodsId != '') {
                    fetch('/caapiv2/createNewOrder', {
                        credentials: 'same-origin',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "goodsNums": [$this.goodsId]
                        })
                    }).then(function (tresponse) {
                        return tresponse.json()
                    }).then(function (tjson) {
                        if (tjson.data && tjson.data.orderId) {
                            $this.orderId = tjson.data.orderId
                            $this.getPaymentParams();
                        }

                    })
                }
            },
            getPaymentParams(){
                let $this = this
                fetch('/caapiv2/unifiedOrder', {
                    credentials: 'same-origin',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "orderId": $this.orderId
                    })
                }).then(function (tresponse) {
                    return tresponse.json()
                }).then(function (tjson) {
                    if (tjson.data) {
                        $this.paymentParams = tjson.data
                    }

                })
            },
            openPayBox(){
                let $this = this
                $this.showPayBtn = false
                wx.chooseWXPay({
                    "appId": $this.paymentParams.appId,
                    "timestamp": parseInt($this.paymentParams.timeStamp), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    "nonceStr": $this.paymentParams.nonceStr, // 支付签名随机串，不长于 32 位
                    "package": $this.paymentParams.packageName, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    "signType": "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    "paySign": $this.paymentParams.paySign, // 支付签名
                    "appId": $this.paymentParams.appId,
                    success: function (res) {
//                        _hmt.push(['_trackEvent' , 'paySucBtn' , 'click' , 'C_Success_Pay_WLBookPage'])
                        $this.paymentSuccess = true

                    }
                });
            }
        }

    }
</script>