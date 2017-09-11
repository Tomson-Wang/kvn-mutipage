<template>
    <div id="audio-container" :style="{left:left+'px',top:top+'px'}">
        <div class="player-btn">
            <a :class="playBtnClass"
               @click="controlAudio('playBtn')"></a>
        </div>
        <div class="audio-player-box">
            <audio id="audio-play" @progress="bufferedProgress()" :src="audio.src" preload="auto"
                   @waiting="controlAudio('waiting')"
                   @canplay="controlAudio('play')"
                   @timeupdate="timeUpdate()" @play="setPlayStatus('play')"
                   @ended="controlAudio('end')"
                   @error="controlAudio('waiting')">
                您的浏览器不支持 audio 标签。
            </audio>
            <div class="range">
                <h1>{{essentialTitle}}</h1>
                <div class="range-body">
                    <div class="buffer-progress" :style="{width:audio.bufferLength+'%'}"></div>
                    <input type="range" class="play-progress" step="0.01"
                           :style="{backgroundSize:audio.playPer + '% 100%'}"
                           :max="audio.allTime" :value="audio.currentTime"
                           @change="controlAudio('changeCurrentTime', $event.target.value,false)"
                           @input="controlAudio('changeCurrentTime', $event.target.value,true)"
                    />
                </div>
                <span class="start-time">{{audio.currentTime | millisecondToDate}}</span>
                <span class="end-time">{{audio.allTime | millisecondToDate}}</span>
            </div>

        </div>
    </div>
</template>
<style lang="less">
    #audio-container{
        width:91vw;
        height:26vw;
        padding:0 1rem;
        box-sizing:border-box;
        background:#fff;
        display:flex;
        align-items:center;
        justify-content:center;
        border:1px solid #ccc;
        position:absolute;
        left:0;
        top:0;
        img{
            -webkit-user-select:none;
            -moz-user-select:none;
            -ms-user-select:none;
            user-select:none;
            width:1.1rem;
            height:0.7rem;
            display:inline-block;
        }
        div.audio-player-box{
            position:relative;
            /*border-top: 1px solid #dfdfdf;*/
            width:80%;
            bottom:0;
            left:0;
            background:#ffffff;
        }
    }

    div.range {
        padding: 0 1.5rem;
        h1 {
            text-align: left;
            margin-bottom: 0.8rem;
            font-size: 1.2rem;
        }
    }

    div.range-body{
        width:100%;
        margin-top:2px;
        background-color:#e7e7e7;
        height:0.3rem;
        position:relative;
        margin-bottom:.5rem;
    }

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
        left:0;

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
        left:0;
        height:12px;
        width:12px;
        transform:translateX(-1px);
        transform:translateY(-6px);
        background:none repeat scroll 0 0 #F00;
        border:5px solid rgba(0, 0, 0, 0);
        border-radius:6px;
        box-sizing:border-box;

    }

    span.start-time{
        float:left;
    }

    span.end-time{
        float:right;
    }

    div.player-btn{
        width:3.6rem;
        height:3.6rem;
        border-radius:50%;
        border:solid 2px #cb1f1f;
        display:flex;
        align-items:center;
        justify-content:center;
    }

    a.audio-pause{
        display:inline-block;
        width:1.6rem;
        height:1.4rem;
        background:url("../../assets/images/esstialPlay.png") no-repeat;
        background-size:1.6rem 1.4rem;
        background-position:center center;
    }

    a.audio-play{
        display:inline-block;
        width:1.6rem;
        height:1.4rem;
        background:url("../../assets/images/esstialPause.png") no-repeat;
        background-size:1.6rem 1.4rem;
        background-position:center center;
    }

    a.audio-waiting{
        display:inline-block;
        width:1.2rem;
        height:1.2rem;
        background:url("../../assets/images/audioloading.png") no-repeat;
        background-size:1.2rem 1.2rem;
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
</style>
<script>

    export default {
        props:['mediaObj' , 'top' , 'left' , 'essentialTitle'] ,
        data(){
            return {
                changeFlag:false ,
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
                    buffTimer:null ,
                    posi:{
                        left:this.left ,
                        top:this.top
                    }
                }
            }
        } ,
        created(){
//      this.controlAudio('setAudio')
//      this.controlAudio('allTime')
        } ,
        computed:{
            playBtnClass(){
                return this.audio.isPlay ? 'audio-play' : (this.audio.isLoad ? 'audio-waiting' : 'audio-pause')
            }
        } ,
        watch:{
            mediaObj:function (n , o){
                this.controlAudio('pause')
                this.audio.src = n.src
                this.controlAudio('setAudio')
//        if (this.audio.src != n.src) {
//          this.controlAudio('pause')
//          this.audio.src = n.src
//          this.controlAudio('setAudio')
//        }
            }
        } ,
        methods:{
            setPlayStatus(v){

                var that = this
                if (v === 'play' && !that.audio.isPlay) {
                    that.audio.isPlay = true
                    that.audio.isLoad = false
                }
            }
            ,

            timeUpdate(){
                this.controlAudio('getCurrentTime')
                this.controlAudio('getBufferPro')
            }
            ,


            rangeTrackPercent(currentTime , allTime){
                let per = currentTime / allTime * 10000
                return Math.ceil(per) / 100
            }
            ,
            bufferedProgress(){
                let that = this
                that.audio.buffTimer = setInterval(function (){
                    that.controlAudio('getBufferPro')
                } , 100)
            }
            ,
            controlAudio(type , value , isPrev){
                let $this = this
                let audioPlay = document.getElementById('audio-play')
                switch (type) {
                    case 'playBtn':
                        if ($this.audio.isPlay || $this.audio.isLoad) {
                            $this.controlAudio('pause')

                        } else {
                            if ($this.changeFlag) {
                                $this.controlAudio('play')
                            } else {
                                $this.changeFlag = true
                                audioPlay.load()
                            }
//
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
                        break
                    case 'play':
//                        trickAction('play_audio=' + encodeURIComponent($this.src))
                        if (!$this.changeFlag) {
                            return
                        }


//            $this.audio.allTime = audioPlay.duration

                        if (audioPlay.paused && $this.changeFlag) {
                            $this.audio.allTime = audioPlay.duration
                            audioPlay.play()
                        }
//                        alert(123)
//                        alert(audioPlay.src)
//                        alert(audioPlay.duration)

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
//                        trickAction('prev_audio')
                        this.$bus.$emit('audio_prev')
//            if ($this.playListIndex <= 0) {
////                            this.controlAudio('setAudio' , this.playList.length - 1 , true)
//              this.controlAudio('pause')
//            } else {
//              this.controlAudio('setAudio', $this.playListIndex - 1, true)
//            }
                        break
                    case 'next':
//                        trickAction('next_audio')
                        this.$bus.$emit('audio_next')
//            if ($this.playListIndex >= this.playList.length - 1) {
////                            this.controlAudio('setAudio' , 0 , false)
//              this.controlAudio('pause')
//            } else {
//              this.controlAudio('setAudio', $this.playListIndex + 1, false)
//            }
                        break
                }
            }

            //        components:{
            //            'playList-component':PlayListComponent
            //        }
        }
    }
</script>