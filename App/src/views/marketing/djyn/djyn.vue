<style lang="less">
  @root :"../../..";
  .swiper-button-next{

    background:url("@{root}/assets/images/arr.png") no-repeat !important;
  }

  .player_wraper{
    height:100%;
    overflow:hidden;
    overflow-y:auto;

  .back{
    position:relative;
    display:block;
    width:3rem;
    height:3rem;
    background:url("@{root}/assets/images/back1.png") no-repeat;
    background-size:100%;
    margin-top:1.6rem;
  }

  img{
    width:100%;
    margin-top:1.6rem;
  }

  }
</style>
<template>
  <div class="player_wraper">
    <div class="p_con">
      <i @click="goBack" class="back"></i>

      <div is="playList" :playList="editionList" :hasBought='rightsType'></div>
      <img @click="goToBook" :src="gotoImg" alt="">
    </div>
    <div v-show="showAudio" :mediaObj="mediaObj" is="AudioPlayer"></div>

  </div>
</template>
<script>
  import playList from '@/components/djyn/audioList.vue'
  import AudioPlayer from '@/components/audioPlayer/noListPlay.vue'

  export default {
    data(){
      return {

        editionList:longAudios ,
        showAudio:false ,
        mediaObj:{} ,
        currentEdition:{} ,
        gotoImg:"../../assets/images/goto.jpg"
      }
    } ,
    components:{
      playList ,
      AudioPlayer
    } ,
    created(){
      let $this = this


      $this.$bus.$on('showPlayer' , function (){
        $this.$bus.$emit('play' , this.mediaObj)
      })
      $this.$bus.on('play' , function (itemObj){
        if (itemObj) {
          $this.showAudio = true

          $this.mediaObj = {
            src:itemObj.src ,
            isFirst:itemObj.isFirst ,
            isLast:itemObj.isLast
          }
        }
      })
    } ,
    methods:{
      goBack(){
        this.$bus.$emit('audio_pause')
        goBackEvent()
      } ,
      goToBook(){
        location.href = "https://v.yunpub.cn/item/7939?s_type=1&c_ref=jd"
      }
    }

  }
</script>
