<style lang="less">
    /*导航信息*/
    .con_nav ul{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2.9rem;
        background: #ffffff;
        margin-bottom: 1px;
    }
    .con_nav ul li{
        width: 3.8rem;
        height: 2.9rem;
        line-height: 2.9rem;

        text-align: center;
        margin: 0 1.4rem;
    }
    .con_nav ul li a{
        color: #d4d4d4;
        font-size: 1.2rem;
    }
    .con_nav ul li.active{
        border-bottom: solid 2px #E61D25;
    }
    .con_nav ul li.active a{
        color: #E61D25;
    }
</style>
<template>
    <div class="tab_info">
        <div class="con_nav">
            <ul>
                <li @click="changeTable(true)" :class="{active:showList}"><a>文字稿</a></li>
                <li @click="changeTable(false)" :class="{active:!showList}"><a>简介</a></li>
            </ul>
        </div>
        <div v-if="showList" is="readPartyDraft" :draft="draftContent"  :has-bought="hasBought" :playFlag="playFlag"></div>
        <div v-if="!showList" is="readPartySynopsis" :synopsis="readPartySynopsis" :has-bought="hasBought" :playFlag="playFlag"></div>
    </div>
</template>
<script>
  import readPartySynopsis from './readPartySynopsis.vue'     //读书会简介
  import readPartyDraft from './readPartyDraft.vue'  //读书会文字稿
  export default{
//    props: ['readPartyId', 'uid', 'detailInfo'],
    props:["readPartySynopsis" , "draftContent" , "mediaUrl" , "hasBought",'playFlag'] ,
    data(){
      return {
        showList: true
      }
    },
    components: {
      'readPartySynopsis':readPartySynopsis,
      'readPartyDraft': readPartyDraft
    },
    methods: {
      changeTable(showFirst){
        this.showList = showFirst
      }
    }
  }
</script>