<style lang="less" scoped="scoped">
    #audio-player-container {
        width: 100%;
        position: absolute;
        bottom: 0;
        z-index: 999;
        background: #FFF;

    span.flodBtn {
        display: inline-block;
        width: 6rem;
        height: 2.2rem;
        line-height: 2.2rem;
        border: solid #dedede 1px;
        border-bottom: none;
        margin-left: 1.4rem;
        position: relative;
        top: 1px;
        z-index: 99;
        background: #FFF;
        text-align: center;
        font-size: 1.2rem;
        color: #e61d25;
    }

    img {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        /*position:absolute;*/
        /*top:-1.8rem;*/
        /*left:1.5rem;*/
        width: 1.1rem;
        height: 0.7rem;
        z-index: 9999;
        display: inline-block;
    }

    div.audio-list {
        max-height: 25rem;
        overflow-y: auto;
        border-top: 1px solid #dfdfdf;

    ul {

    li {
        padding: 0;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #dfdfdf;

    div.title, div.time {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-grow: 8;
        height: 4.6rem;
        line-height: 4.6rem;
        padding: 0 1.5rem;
        padding-right: 0px;
        display: inline-block;
        color: #131313;
        font-size: 1.2rem;

        text-align: left;
    }

    div.time {
        width: 4rem;
        color: #999999;
        font-size: 1.1rem;
        text-align: right;
        padding-right: 1.5rem;
    }

    }
    li:last-child {
        border-bottom: none;
    }

    li.active {

    div.title {
        color: #E61F27;
    }

    }
    li.dis {

    div.title {
        color: #7a7a7a;
    }

    }
    }
    }
    div.audio-player-box {
        position: relative;
        border-top: 1px solid #dfdfdf;
        width: 100%;
        bottom: 0;
        left: 0;
        background: #ffffff;

    div.excerpt-title {
        margin: 1rem auto;

    h1 {
        font-size: 1.2rem;
        color: #131313;
        text-align: center;
        font-weight: normal;
    }

    h2 {
        font-size: 1.2rem;
        color: #131313;
        text-align: center;
        font-weight: normal;
        color: #e61d25;
    }

    }
    div.range {
        padding: 0 1.5rem;
        margin-bottom: .5rem;
        height: 2rem;

    div.range-body {
        width: 100%;
        margin-top: 2px;
        background-color: #e7e7e7;
        height: 0.3rem;
        position: relative;
        margin-bottom: .5rem;

    div.buffer-progress {
        position: absolute;
        width: 100%;
        border-radius: 7px;
        background: #e7aaac;
        top: 0px;
        height: 0.3rem;
    }

    img.audio_loading {
        width: 16px;
        height: 16px;
        display: inline-block;
        transform: translateY(-4px);
        position: absolute;
    }

    input.play-progress {
        position: absolute;
        width: 100%;
        border-radius: 7px;
        background: linear-gradient(#ff0000, #ff0000) no-repeat;
        -webkit-appearance: none;
        height: 0.3rem;
        top: 0px;

    }

    input.play-progress:after {

    }

    input.play-progress::-webkit-slider-runnable-track {
        height: 2px;
        width: 50%;
        border-radius: 10px; /*将轨道设为圆角的*/
        box-shadow: 0;

    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        cursor: default;
        position: relative;
        top: 0.1rem;
        height: 12px;
        width: 12px;
        transform: translateX(-1px);
        transform: translateY(-6px);
        background: none repeat scroll 0 0 #F00;
        border: 5px solid rgba(0, 0, 0, 0);
        border-radius: 6px;
        box-sizing: border-box;

    }

    }
    span.start-time {
        float: left;
    }

    span.end-time {
        float: right;
    }

    }
    }
    div.player-btn {
        text-align: center;
        height: 2.25rem;
        position: relative;
        bottom: 1rem;
        margin: 1rem auto 0 auto;

    a {
        margin: 0 2rem;
    }

    a.audio-pre {
        display: inline-block;
        width: 1.7rem;
        height: 1.75rem;
        background: url("../assets/images/audiopre.png") no-repeat;
        background-size: 1.6rem 1.65rem;
    }

    a.audio-pause {
        display: inline-block;
        width: 1.9rem;
        height: 2rem;
        background: url("../assets/images/audioplay.png") no-repeat;
        background-size: 1.8rem 2rem;
    }

    a.audio-play {
        display: inline-block;
        width: 1.9rem;
        height: 2rem;
        background: url("../assets/images/audiopause.png") no-repeat;
        background-size: 1.8rem 2rem;
    }

    a.audio-waiting {
        display: inline-block;
        width: 1.9rem;
        height: 2rem;
        background: url("../assets/images/audioloading.png") no-repeat;
        background-size: 1.8rem 2rem;
        -webkit-animation: loadingFrames 1s 99999;
        -o-animation: loadingFrames 1s 99999;
        animation: loadingFrames 1s 99999;
    }
    @keyframes loadingFrames {
        0% {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }

    }

    a.audio-next {
        display: inline-block;
        width: 1.7rem;
        height: 1.75rem;
        background: url("../assets/images/audionext.png") no-repeat;
        background-size: 1.6rem 1.65rem;
    }

    }
    }
</style>
<template>
    <!--v-show="hasShow&&hasBought"-->
    <div id="audio-player-container" v-show="hasShow&&hasBought">
        <span class="flodBtn">
            <img v-show="!hasShowList" class="upbtn" src="../assets/images/audio_up.png" @click="fold"/>
            <img v-show="hasShowList" class="upbtn" src="../assets/images/audio_down.png" @click="fold"/>
            列表
        </span>
        <div class="audio-list" v-show="hasShowList">
            <ul>
                <li v-for="(item, index) in playList"
                    :class="[audio.id== item.audioid ? 'active' : ('0'==item.audiolong?'dis':'')]"
                    @click="clickPlayList(index)">
                    <div class="title">{{item.audiotitle}}</div>
                    <div v-if="'0' == item.audiolong" class="time">敬请期待</div>
                    <div v-else class="time">{{item.audiolong | millisecondToDate}}</div>
                </li>
            </ul>
        </div>
        <div class="audio-player-box">
            <div class="excerpt-title">
                <h1 v-show="!audio.bufferFail">{{audio.title}}</h1>
                <h2 v-show="audio.bufferFail">缓冲失败，请检查网络连接</h2>
            </div>
            <audio autoplay id="audio-play" @progress="bufferedProgress()" :src="audio.src" preload="auto"
                   @waiting="controlAudio('waiting')" @canplay="controlAudio('play')"
                   @timeupdate="timeUpdat()" @play="setPlayStatus('play')"
                   @pause="setPlayStatus('pause')" @ended="controlAudio('end')"
                   @error="controlAudio('waiting')">
                您的浏览器不支持 audio 标签。
            </audio>
            <div class="range">
                <div class="range-body">
                    <div class="buffer-progress" :style="{width:audio.bufferLength+'%'}"></div>
                    <input type="range" class="play-progress" step="0.01"
                           :style="{backgroundSize:audio.playPer + '% 100%'}"
                           :max="audio.allTime" :value="audio.currentTime"
                           @change="controlAudio('changeCurrentTime' , $event.target.value,false)"
                           @input="controlAudio('changeCurrentTime' , $event.target.value,true)"
                    />
                    <img :style="{left:audio.playPer+'%'}" class="audio_loading" src="../assets/images/proloading.png"
                         v-show="audio.bufferImageShow">
                </div>
                <span class="start-time">{{audio.currentTime | millisecondToDate}}</span>
                <span class="end-time">{{audio.allTime | millisecondToDate}}</span>
            </div>
            <div class="player-btn">
                <a class="audio-pre" @click="controlAudio('prev')"></a>
                <a :class="[audio.isPlay ? 'audio-play' : (audio.isLoad?'audio-waiting':'audio-pause')]"
                   @click="controlAudio(audio.isPlay ? 'pause' : 'play')"></a>
                <a class="audio-next" @click="controlAudio('next')"></a>
            </div>
        </div>
    </div>
</template>
<script>

  //    import PlayListComponent from "playList.vue"
  import {getBoughtAudioList, trickAction} from '../actions/main.js'
  export default{
    props: ['uid', 'bookId', 'hasBought', 'hasShow'],

    data(){
      return {
        hasShowList: false,
        audio: {
          id: '',
          src: '',
          title: '',
          isPlay: false,
          isLoad: false,
          isMuted: false,
          volume: 100,
          allTime: 0,
          currentTime: 0,
          playPer: 0,
          playListIndex: 0,
          bufferLength: 0,
          bufferFail: false,
          bufferImageShow: false
        },
        playList: []
      }
    },
    created(){
      let that = this
      that.getPlayList()
    },
    watch: {
      hasShow(n, o){
        if (n) {
          this.controlAudio('setAudio', 0)
//          this.controlAudio('autoPlay')
        }
      },
      hasBought(n, o){
        if (n) {
          this.getPlayList();
        }
      }
    },
    methods: {
      setPlayStatus(v){
        var that = this
        if(v ==='play'){
          that.audio.isPlay=true
          that.audio.isLoad=false
        } else {
          that.audio.isPlay=false
          that.audio.isLoad=false
        }
      },
      fold(){
        this.hasShowList = !this.hasShowList
      },
      timeUpdat(){
        this.controlAudio('getCurrentTime')
        this.controlAudio('getBufferPro')
      },
      getPlayList(){
        let that = this
        getBoughtAudioList(function (pl) {
          that.playList = pl
        })
      },
      clickPlayList(i){
        this.controlAudio('setAudio', i)
        trickAction('play_audio=' + encodeURIComponent(this.audio.src))
      },
      rangeTrackPercent(currentTime, allTime){
        let per = currentTime / allTime * 10000
        return Math.ceil(per) / 100
      },
      bufferedProgress(){
        let that = this
        that.controlAudio('play')
        let t=setInterval(function () {
          that.controlAudio('getBufferPro')
        },100)
      },
      controlAudio(type, value, isPrev){

        let audioPlay = document.getElementById('audio-play')
        let aud = this.audio
        switch (type) {
          case 'setAudio':
            let current = this.playList[value]
            if ("0" == current.audiolong) {
              this.controlAudio('setAudio', 0, isPrev)
            } else {
              aud.id = current.audioid
              aud.src = current.audioUrl
              aud.currentTime = 0
              aud.playPer = 0
              aud.bufferLength = 0
              aud.playListIndex = value
              aud.title = current.audiotitle
              aud.allTime = current.audiolong
              audioPlay.src = current.audioUrl
              audioPlay.load()
            }
            break
          case 'allTime':
//                        aud.allTime = audioPlay.duration

            break
          case 'play':
            trickAction('play_audio=' + encodeURIComponent(aud.src))
            audioPlay.play()
            aud.isPlay = true
            break
          case 'pause':
            trickAction('pause_audio')
            audioPlay.pause()
            aud.isPlay = false
            break
          case 'waiting':
            trickAction('waiting_audio')
            audioPlay.pause()
            aud.isLoad = true
            aud.isPlay = false
            break
          case 'changeCurrentTime':
            aud.isPlay = isPrev
            aud.currentTime = parseInt(value)
            aud.playPer = this.rangeTrackPercent(value, audioPlay.duration)
            audioPlay.currentTime = parseInt(value)
            if (value == audioPlay.duration) {
              aud.isPlay = false
            }
            break
          case 'getCurrentTime':
            aud.currentTime = audioPlay.currentTime
            aud.playPer = this.rangeTrackPercent(audioPlay.currentTime, audioPlay.duration)
            break
          case 'end':
            if (aud.playListIndex >= this.playList.length - 1) {
              this.controlAudio('pause')
            } else {
              var timeRanges = audioPlay.buffered
              var timeBuffered = timeRanges.end(timeRanges.length - 1)
              var bufferPercent = timeBuffered / audioPlay.duration
              aud.bufferLength = Math.ceil(bufferPercent * 100)
              if (parseInt(aud.currentTime) < aud.allTime) {
                aud.bufferFail = true
                aud.bufferImageShow = false
              } else {
                aud.bufferFail = false
                aud.bufferImageShow = false
                this.controlAudio('setAudio', aud.playListIndex + 1, false)
              }
            }
            break
          case 'getBufferPro':
            var timeRanges = audioPlay.buffered
            if (timeRanges.length < 1) {
              break
            }
            var timeBuffered = timeRanges.end(0)
            var bufferPercent = timeBuffered / audioPlay.duration
            aud.bufferLength = Math.ceil(bufferPercent * 100)
            console.log(timeRanges)
            if (aud.currentTime <= 0) {
              break
            }
            if (aud.playPer >= aud.bufferLength) {
              aud.bufferImageShow = true
            } else {
              aud.bufferImageShow = false
            }
            if (audioPlay.networkState) {
              aud.bufferFail = false
            } else {
              if (aud.playPer >= aud.bufferLength) {
                aud.bufferFail = true
              }
            }
            break
          case 'autoPlay':
            audioPlay.autoplay = "autoplay"
            break
          case 'prev':
            trickAction('prev_audio')
            if (aud.playListIndex <= 0) {
//                            this.controlAudio('setAudio' , this.playList.length - 1 , true)
              this.controlAudio('pause')
            } else {
              this.controlAudio('setAudio', aud.playListIndex - 1, true)
            }
            break
          case 'next':
            trickAction('next_audio')
            if (aud.playListIndex >= this.playList.length - 1) {
//                            this.controlAudio('setAudio' , 0 , false)
              this.controlAudio('pause')
            } else {
              this.controlAudio('setAudio', aud.playListIndex + 1, false)
            }
            break
        }
      }
    }
//        components:{
//            'playList-component':PlayListComponent
//        }
  }

</script>