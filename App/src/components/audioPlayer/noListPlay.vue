<style lang="less">
    #audio-player-container{
        width:100%;
        /*position:absolute;*/
        position:fixed;
        bottom:0;
        z-index:999;
        background:#FFF;

    span.flodBtn{
        display:inline-block;
        width:6rem;
        height:2.2rem;
        line-height:2.2rem;
        border:solid #dedede 1px;
        border-bottom:none;
        margin-left:1.4rem;
        position:relative;
        top:1px;
        z-index:99;
        background:#FFF;
        text-align:center;
        font-size:1.2rem;
        color:#e61d25;
    }

    img{
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        width:1.1rem;
        height:0.7rem;
        z-index:9999;
        display:inline-block;
    }

    div.audio-player-box{
        position:relative;
        border-top:1px solid #dfdfdf;
        width:100%;

        bottom:0;
        left:0;
        background:#ffffff;

    div.excerpt-title{
        margin:1rem auto;

    h1{
        font-size:1.2rem;
        color:#131313;
        text-align:center;
        font-weight:normal;
    }

    h2{
        font-size:1.2rem;
        color:#131313;
        text-align:center;
        font-weight:normal;
        color:#e61d25;
    }

    }
    div.range{
        padding:0 1.5rem;
        margin-bottom:.5rem;
        margin-top:5vw;
        height:2rem;

    div.range-body{
        width:100%;
        margin-top:2px;
        background-color:#e7e7e7;
        height:0.3rem;
        position:relative;
        margin-bottom:.5rem;

    div.buffer-progress{
        position:absolute;
        width:100%;
        border-radius:7px;
        background:#e7aaac;
        top:0px;
        height:0.3rem;
    }

    img.audio_loading{
        width:16px;
        height:16px;
        display:inline-block;
        transform:translateY(-4px);
        position:absolute;
    }

    input.play-progress{
        position:absolute;
        width:100%;
        border-radius:7px;
        background:linear-gradient(#ff0000, #ff0000) no-repeat;
        -webkit-appearance:none;
        height:0.3rem;
        top:0px;

    }

    input.play-progress:after{

    }

    input.play-progress::-webkit-slider-runnable-track{
        height:2px;
        width:50%;
        border-radius:10px; /*将轨道设为圆角的*/
        box-shadow:0;

    }

    input[type="range"]::-webkit-slider-thumb{
        -webkit-appearance:none;
        cursor:default;
        position:relative;
        top:0.1rem;
        height:12px;
        width:12px;
        transform:translateX(-1px);
        transform:translateY(-6px);
        background:none repeat scroll 0 0 #F00;
        border:5px solid rgba(0, 0, 0, 0);
        border-radius:6px;
        box-sizing:border-box;

    }

    }
    span.start-time{
        float:left;
    }

    span.end-time{
        float:right;
    }

    }
    }
    div.player-btn{
        text-align:center;
        height:2.25rem;
        position:relative;
        bottom:1rem;
        margin:1rem auto 0 auto;

    a{
        margin:0 2rem;
    }

    a.audio-pre{
        display:inline-block;
        width:1.7rem;
        height:1.75rem;
        background:url("../../assets/images/audiopre.png") no-repeat;
        background-size:1.6rem 1.65rem;
    }

    a.audio-pause{
        display:inline-block;
        width:1.9rem;
        height:2rem;
        background:url("../../assets/images/audioplay.png") no-repeat;
        background-size:1.8rem 2rem;
    }

    a.audio-play{
        display:inline-block;
        width:1.9rem;
        height:2rem;
        background:url("../../assets/images/audiopause.png") no-repeat;
        background-size:1.8rem 2rem;
    }

    a.audio-waiting{
        display:inline-block;
        width:2rem;
        height:2rem;
        background:url("../../assets/images/audioloading.png") no-repeat;
        background-size:2rem 2rem;
        -webkit-animation:loadingFrames 1s 99999;
        -o-animation:loadingFrames 1s 99999;
        animation:loadingFrames 1s 99999;
    }

    @keyframes loadingFrames{
        0%{
            -webkit-transform:rotate(0deg);
            -moz-transform:rotate(0deg);
            -ms-transform:rotate(0deg);
            -o-transform:rotate(0deg);
            transform:rotate(0deg);
        }
        100%{
            -webkit-transform:rotate(360deg);
            -moz-transform:rotate(360deg);
            -ms-transform:rotate(360deg);
            -o-transform:rotate(360deg);
            transform:rotate(360deg);
        }

    }

    a.audio-next{
        display:inline-block;
        width:1.7rem;
        height:1.75rem;
        background:url("../../assets/images/audionext.png") no-repeat;
        background-size:1.6rem 1.65rem;
    }

    }
    }
</style>
<template>
    <!--v-show="hasShow&&hasBought"-->
    <div id="audio-player-container">
        <div class="audio-player-box">

            <audio autoplay id="audio-play" @progress="bufferedProgress()" :src="audio.src" preload="auto"
                   @waiting="controlAudio('waiting')" @canplay="autoPlay()"
                   @timeupdate="timeUpdate()" @play="setPlayStatus('play')"
                   @ended="controlAudio('end')"
                   @error="controlAudio('waiting')">
                您的浏览器不支持 audio 标签。
            </audio>
            <div class="range">
                <div class="range-body">
                    <div class="buffer-progress" :style="{width:audio.bufferLength+'%'}"></div>
                    <input type="range" class="play-progress" step="0.01"
                           :style="{backgroundSize:audio.playPer + '% 100%'}"
                           :max="audio.allTime" :value="audio.currentTime"
                           @change="controlAudio('changeCurrentTime', $event.target.value,false)"
                           @input="controlAudio('changeCurrentTime', $event.target.value,true)"
                    />
                    <!--<img :style="{left:audio.playPer+'%'}" class="audio_loading"-->
                    <!--src="../../assets/images/proloading.png"-->
                    <!--v-show="audio.bufferImageShow">-->
                </div>
                <span class="start-time">{{audio.currentTime | millisecondToDate}}</span>
                <span class="end-time">{{audio.allTime | millisecondToDate}}</span>
            </div>
            <div class="player-btn">
                <a class="audio-pre" @click="controlAudio('prev')"></a>
                <a :class="playBtnClass"
                   @click="controlAudio('playBtn')"></a>
                <a class="audio-next" @click="controlAudio('next')"></a>
            </div>
        </div>
    </div>
</template>
<script>

    //    import PlayListComponent from "playList.vue"
    import {trickAction} from '../../actions/main.js'
    export default {
        props:['mediaObj'] ,
        data(){
            return {
                changeFlag:true ,
                audio:{
                    id:'' ,
                    src:this.mediaObj.src ,
                    isPlay:false ,
                    isLoad:false ,
                    isMuted:false ,
                    volume:100 ,
                    allTime:0 ,
                    currentTime:0 ,
                    playPer:0 ,
                    bufferLength:0 ,
                    bufferFail:false ,
                    bufferImageShow:false ,
                    buffTimer:null
                }
            }
        } ,
        created(){
//            this.audio.src = 'http://112.126.93.98:8080/' + this.mediaObj.src
            let $this = this
            window.onbeforeunload = function () {
                var $this = this
                let date = new Date().getTime()
                console.log(date)
                console.log(that.currentTime)
                trickAction('s_end&&id='+authData.itemId+'&&currentTime='+$this.currentTime+'&&dateTime='+ date)
                return false
            }
            $this.$bus.$on('audio_pause' , () =>{
                $this.controlAudio('pause')
            })
        } ,
        computed:{
            playBtnClass(){
                return this.audio.isPlay ? 'audio-play' : (this.audio.isLoad ? 'audio-waiting' : 'audio-pause')
            }
        } ,
        watch:{
            mediaObj:function (n , o){
                if (this.audio.src != n.src) {
                    trickAction('s_start&&id='+authData.itemId+'&&currentTime='+this.currentTime+'&&dateTime='+ new Date().getTime())
                    this.changeFlag = false
                    this.controlAudio('pause')
                    this.audio.src = n.src
                    this.controlAudio('setAudio')
                }
            }
        } ,
        methods:{
//            trickAction(action){
//                fetch('/zxapi/action_types?' + action , {credentials:'same-origin'})
//        } ,
//            changeAudioTimeStart(){
//                this.changeFlag = false
//            } ,
            setPlayStatus(v){

                var that = this
                if (v === 'play' && !that.audio.isPlay) {
                    that.audio.isPlay = true
                    that.audio.isLoad = false
                }
//                else {
//                    that.audio.isPlay = false
//                    that.audio.isLoad = false
//                }
            } ,
            autoPlay(){

                this.controlAudio('play')

            } ,
            timeUpdate(){
                this.controlAudio('getCurrentTime')
                this.controlAudio('getBufferPro')
            } ,


            rangeTrackPercent(currentTime , allTime){
                let per = currentTime / allTime * 10000
                return Math.ceil(per) / 100
            } ,
            bufferedProgress(){
                let that = this
//                that.controlAudio('play')
                that.buffTimer = setInterval(function (){
                    that.controlAudio('getBufferPro')
                } , 100)
            } ,
            controlAudio(type , value , isPrev){
                let $this = this
                let audioPlay = document.getElementById('audio-play')
                switch (type) {
                    case 'changeAudioTimeStart':
                        $this.changeFlag = false
                        audioPlay.pause()
                        break
                    case 'changeAudioTimeEnd':
                        $this.changeFlag = true
                        audioPlay.currentTime = parseInt($this.audio.currentTime)
                        break
                    case 'playBtn':
                        if ($this.audio.isPlay || $this.audio.isLoad) {
                            $this.controlAudio('pause')
                            trickAction('s_end&&id='+authData.itemId+'&&currentTime='+$this.currentTime+'&&dateTime='+ new Date().getTime())
                        } else {
                            $this.controlAudio('play')
                            trickAction('s_start&&id='+authData.itemId+'&&currentTime='+$this.currentTime+'&&dateTime='+ new Date().getTime())
                        }
                        break
                    case 'setAudio':
                        audioPlay.pause()
                        $this.audio.currentTime = 0
                        $this.audio.playPer = 0
                        $this.audio.bufferLength = 0
                        $this.audio.allTime = 0
                        audioPlay.src = $this.audio.src
                        audioPlay.load()
                        $this.changeFlag = true
                        break
                    case 'allTime':
//                        $this.allTime = audioPlay.duration
                        break
                    case 'play':
                        if (!$this.changeFlag) {
                            return
                        }
                        console.log(audioPlay.duration)
                        $this.audio.allTime = audioPlay.duration
                        if (audioPlay.paused && $this.changeFlag) {
                            audioPlay.play()
                        }

                        $this.audio.isPlay = true
                        $this.audio.isLoad = false
                        break
                    case 'pause':
//                        trickAction('pause_audio')
                        audioPlay.pause()
                        $this.audio.isPlay = false
                        $this.audio.isLoad = false
                        break
                    case 'waiting':
//                        trickAction('waiting_audio')
                        audioPlay.pause()
                        $this.audio.isLoad = true
                        $this.audio.isPlay = false
                        break
                    case 'changeCurrentTime':
//                      aud.isPlay = isPrev
                        $this.audio.currentTime = parseInt(value)
                        $this.audio.playPer = this.rangeTrackPercent(value , audioPlay.duration)
                        audioPlay.currentTime = parseInt(value)
                        if (value == audioPlay.duration) {
                            $this.audio.isPlay = false
                        }
                        break
                    case 'getCurrentTime':
                        if (!$this.audio.isPlay)
                            break
                        $this.audio.allTime = audioPlay.duration
                        console.log(audioPlay.duration)
                        $this.audio.currentTime = audioPlay.currentTime
                        $this.audio.playPer = this.rangeTrackPercent(audioPlay.currentTime , audioPlay.duration)
                        break
                    case 'end':

                        var timeRanges = audioPlay.buffered
                        var timeBuffered = timeRanges.end(timeRanges.length - 1)
                        var bufferPercent = timeBuffered / audioPlay.duration
                        $this.audio.bufferLength = Math.ceil(bufferPercent * 100)
                        if ($this.audio.currentTime < $this.audio.allTime) {
                            $this.audio.bufferFail = true
                            $this.audio.bufferImageShow = false
                        } else {
                            $this.audio.bufferFail = false
                            $this.audio.bufferImageShow = false
                            $this.$bus.$emit('audio_next')
                        }

                        break
                    case 'getBufferPro':
                        var timeRanges = audioPlay.buffered
                        if (timeRanges.length < 1) {
                            break
                        }
                        var timeBuffered = timeRanges.end(0)
                        var bufferPercent = timeBuffered / audioPlay.duration
                        $this.audio.bufferLength = Math.ceil(bufferPercent * 100)
                        if ($this.audio.currentTime <= 0) {
                            break
                        }
                        if ($this.audio.playPer >= $this.audio.bufferLength) {
                            $this.audio.bufferImageShow = true
                        } else {
                            clearInterval($this.audio.buffTimer)
                            $this.audio.bufferImageShow = false
                        }
                        if (audioPlay.networkState) {
                            $this.audio.bufferFail = false
                        } else {
                            if ($this.audio.playPer >= $this.audio.bufferLength) {
                                $this.audio.bufferFail = true
                            }
                        }
                        break
                    case 'autoPlay':
                        audioPlay.autoplay = "autoplay"
                        break
                    case 'prev':

                        break
                    case 'next':
                        this.$bus.$emit('audio_next')
                }
            }

            //        components:{
            //            'playList-component':PlayListComponent
            //        }
        }
    }
</script>