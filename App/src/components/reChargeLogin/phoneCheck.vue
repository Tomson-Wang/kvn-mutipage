<template>
    <div class="receive-num">
        <div class="top">
            <div class="top-wrap">
                <div class="phone-wrap">
                    <input id="phoneNum" v-model="phoneNum" type="tel" placeholder="请输入手机号" @keyup="phoneNumChange()">
                    <div class="line"></div>
                    <a id="getCode" v-bind:class="['getCode',codeFlag?'hover':'']" @click="getCode">{{codeCon}}</a>
                </div>
                <div class="code-wrap">
                    <input id="code" v-model="code" type="number" placeholder="验证码" @keyup="codeInput()">
                </div>
            </div>
            <label v-if="!registerFlag">该手机号未注册</label>
        </div>

        <a v-bind:class="['toReCharge',toReChargeFlag?'toReChargeActive':'']" @click="toReCharge()">去充值</a>
    </div>
</template>
<style>
    ::-webkit-input-placeholder { /* WebKit browsers */
        color:    #A9A9A9;
        opacity: 0.5;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #A9A9A9;
        opacity: 0.5;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #A9A9A9;
        opacity: 0.5;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #A9A9A9;
        opacity: 0.5;
    }
    .receive-num{
        width: 100%;
        box-sizing: border-box;
        padding: 0 2rem;
    }
    .top{
        height: 10em;
    }
    .top label{
        color: #cc2324;
        font-size: 1rem;
        margin-top: 0.7rem;
        display: block;
    }
    .receive-num .top-wrap{
        width: 100%;
        height: 8.4rem;
        border: solid 1px #cccccc;
        margin-top: 5.29rem;
        background:rgba(255,255,255,0.3);
        border-radius: 4px;
        /*opacity: 0.6;*/
    }
    .receive-num .top-wrap .phone-wrap{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 4.2rem;
        line-height: 4.2rem;
        border-bottom: 1px #cccccc solid;
    }
    .receive-num .top-wrap .phone-wrap input{
        border: none;
        width: 54vw;
        padding-left: 1.6rem;
        height: 2.5rem;
        line-height: 2.5rem;
        box-sizing: border-box;
        font-size: 1.2rem;
        color: #000000;
        background: none;
    }
    .receive-num .top-wrap .phone-wrap div.line{
        width: 1px;
        height: 2rem;
        background: #cccccc;
    }
    .receive-num .top-wrap .phone-wrap a.getCode{
        display: block;
        width: 33vw;
        text-align: center;
        font-size: 1.2rem;
        color: #c0c0c0;
    }
    .receive-num .top-wrap .phone-wrap a.hover{
        color: #c51e25;
    }
    .receive-num .top-wrap .code-wrap{
        display: flex;
        align-items: center;
        height: 4.2rem;
        line-height: 4.2rem;
    }
    .receive-num .top-wrap .code-wrap input{
        padding-left:1.6rem;
        font-size: 1.2rem;
        color: #000000;
        background: none;
        border: none;
        height: 2.5rem;
        line-height: 2.5rem;
    }
    a.toReCharge{
        display: block;
        width: 100%;
        height: 4.2rem;
        line-height: 4.2rem;
        color: #ffffff;
        background: #d5d5d5;
        margin-top: 2.83rem;
        text-align: center;
        font-size: 1.25rem;
        border-radius: 5px;
    }
    a.toReChargeActive{
        background: #ff6317;
    }
</style>
<script>
    import "whatwg-fetch"
    export default {
        data() {
            return {
                phoneNum: '',
                code:'',
                codeFlag:false,
                toReChargeFlag:false,
                registerFlag:true,
                codeCon:'获取验证码',
                countDown:10
            }
        },
        watch:{
            toReChargeFlag:function(n,o){

            }
        },
        methods:{
            phoneNumChange(){
                if ((/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/).test(this.phoneNum)) {
                    this.codeFlag = true
                    if (this.phoneNum && this.code) {
                        this.toReChargeFlag = true
                    } else {
                        this.toReChargeFlag = false
                    }
                } else {
                    this.codeFlag = false
                    this.toReChargeFlag = false
                }

            },
            codeInput(){
                if ((/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/).test(this.phoneNum) && this.code) {
                    this.toReChargeFlag = true
                } else {
                    this.toReChargeFlag = false
                }
            },
            holdBtnHandler(){
                var content = this.countDown + 's后再次获取';
                this.codeCon = content;
                this.countDown--;
                if (this.countDown >= 0) {
                    setTimeout(this.holdBtnHandler, 1000)
                } else {
                    this.codeCon = '获取验证码';
                    clearTimeout(this.holdBtnHandler,1000)
                }
            },
            getCode(){
                let $this = this
                if ($this.codeFlag){
                    fetch('../caapiv2/getPhoneCode', {
                        credentials: 'same-origin',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            phoneNum: $this.phoneNum
                        })
                    }).then(function (tresponse){
                        return tresponse.json()
                    }).then(function (tjson){
                        console.log(tjson)
                        if (tjson.status == 200) {
                            $this.countDown = 10
                            $this.holdBtnHandler()
                        }
                    })
                } else {
                    return false
                }
            },
            toReCharge(){
                if (this.toReChargeFlag) {
                    localStorage.setItem('phoneNum',this.phoneNum)
                    window.location.href='../accountInfo?a_type=2'
                } else {
                    return false
                }

            }
        }
    }
</script>