<style lang="less">
    div.AudioList-container{
        background:#FFF;
        padding:1.8rem 1.5rem;
    }
    div.Audio-box h1{
        font-weight:normal;
        font-size:1.3rem;
        color:#131313;
    }

    div.Audio-item{
        padding:1.6rem 0 0 0;
    }

    div.Audio-item div.audio-img{
        position:relative;
        margin-bottom:1.4rem;
    }

    img.audio-cover{
        width:100%;
        height:16.3rem;
    }

    img.play-btn{
        width:5.4rem;
        height:5.4rem;
        position:absolute;
        left:50%;
        top:50%;
        margin-left:-2.7rem;
        margin-top:-2.7rem;
        z-index:999999;
    }

    div.book-introduce h3{
        width:100%;
        font-size:1.4rem;
        color:#131313;
        font-weight:normal;
        margin-bottom:0.6rem;
        text-align:left;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    div.book-introduce h3 i{
        display:inline-block;
        max-width:80%;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    div.book-introduce h3 span{
        float:right;
    }
    div.book-introduce p{
        font-size:1.2rem;
        color:#949494;
        text-align:left;
        line-height:1.5rem;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    div.video-box{
        position:fixed;
        top:0;
        left:0;
        z-index:999999;
        background:rgba(0, 0, 0, 1);
        width:100%;
        height:100%;
        display:none;
    }
    div.video-box a.close_btn{
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        font-size: 1.5rem;
        color: #FFF;
    }
    video{
        width:100%;
        height: 20rem;
        position: absolute;
        top: 50%;
        margin-top: -10rem;
        background-color:#000000;
    }
</style>
<template>
    <div  class="Audio-item">
        <div class="audio-img">
            <img class="audio-cover" :src="imgurl" />
            <img class="play-btn" src="../../assets/images/play.png" data-url="{{ imgurl }}" @click="playVideo(videoUrl)"/>
        </div>
        <div class="book-introduce">
            <h3><i>{{ videoTitle }}</i></h3>
            <p>{{ videoDescription }}</p>
            <div is="likeComponent"  :item-id="videoId" :like-type="2" :hasLike="hasLike" :like-count="likeNum"></div>
            <div class="clearfix"></div>
        </div>
    </div>
</template>
<script>
  import 'whatwg-fetch'
  import likeComponent from '../likeBtn/likeVideo.vue'  // 点赞
  export default{
    props:['videoId','videoTitle','videoDescription','videoUrl','hasLike','likeNum','imgurl'],
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {
      'likeComponent': likeComponent
    },
    methods:{
      playVideo(src){
        this.$bus.$emit('play', src)
      },
      videoReturn(){
        var vBox = document.getElementsByClassName('video-box')[0]
        var v=document.getElementById('video-player')
        vBox.removeChild(v)
        vBox.style.display = 'none'
      }
    }
  }
</script>