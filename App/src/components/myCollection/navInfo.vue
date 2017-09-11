<template>
    <div class="nav-wrap">
        <ul class="nav">
            <li :class="[currentTag === 0?'active': '']" @click="seleTab(0,1)"><a>有声书</a></li>
            <li :class="[currentTag === 1?'active': '']" @click="seleTab(1,3)"><a>大咖领读</a></li>
            <li :class="[currentTag === 2?'active': '']" @click="seleTab(2,4)"><a>课程</a></li>
            <li :class="[currentTag === 3?'active': '']" @click="seleTab(3,7)"><a>浓缩书</a></li>
            <div class="clearfix"></div>
        </ul>
    </div>
</template>
<style lang="less">
    .nav-wrap{
        background:#FFF;
        border:solid 1px #eeeeee;
    }

    .nav-wrap ul.nav{
        height:3.4rem;
        max-height:3.4rem;
        white-space:nowrap;
        padding: 0 1.5rem;
        display:flex;
        align-items:center;
    }

    .nav-wrap ul.nav li{
        height:3.3rem;
        line-height:3.3rem;
        padding:0 0.8rem;
        float:left;
        font-size:1.4rem;
        /*width: 5rem;*/
    }

    .nav-wrap ul.nav li a{
        color:#606060;
    }

    .nav-wrap ul.nav li.active{
        border-bottom:solid 2px #CB1F1F;
        font-size:1.5rem;
    }

    .nav-wrap ul.nav li.active a{
        color:#CB1F1F;
    }
</style>
<script>
    import "whatwg-fetch"

    export default {
        props:['tabList' , 'currentTag'] ,
        data(){
            return {
                infoList:'' ,
                tabInfo:this.tabList ,
                currentId:1 ,
            }
        } ,


        methods:{
            seleTab(i , t){
                this.$bus.$emit('getTabList' , i , t)
            }
        }
    }
</script>