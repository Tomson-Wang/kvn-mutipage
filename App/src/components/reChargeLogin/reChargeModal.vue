<template>
    <div class="reCharge-tip">
        <div>
            <h1>温馨提示</h1>
            <p>亲爱的用户,您好。<br>中信书院暂时只提供<br>IOS端用户充值功能。<br>如果您不使用苹果设备登录，<br>【中信书院】APP，<br>将无法消费所充值金额，<br>请知悉。</p>
            <a @click="hideModal">确<span>定</span></a>
        </div>
    </div>
</template>
<style>
    /*浮层*/
    .reCharge-tip{
        position:fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.85);
        display: flex;
        justify-content:center;
        align-items: center;
        color: #FFFFFF;
    }
    .reCharge-tip div{
        margin:0 3rem;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .reCharge-tip div h1{
        /*margin-top: 7.5rem;*/
        margin-bottom: 3.5rem;
        font-size: 1.75rem;
    }
    .reCharge-tip div p{
        font-size: 1rem;
        line-height: 1.5;
        text-align: center;
    }
    .reCharge-tip div a{
        font-size: 1.4rem;
        margin-top: 16rem;
        display: block;
        text-align: center;
        color: #FFFFFF;
        border-bottom: solid 1px #ffffff;
    }
    .reCharge-tip div a span{
        margin-left: 1rem;
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
            hideModal(){
                var $this = this
                $this.$bus.$emit('showReChargeModal')
            }
        }
    }
</script>