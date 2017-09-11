<style lang="less">
    /* 听书列表 */
    .video-list{
        margin-top:0.5rem;
        padding:0 1.5rem 1.5rem 1.5rem;
        background: #FFF;
    }
    .video-list .item{
        display: flex;
        flex-direction: column;
        border-bottom: solid 1px #c9c9c9;
        padding-top: 1.5rem;
    }
    .video-list .item:last-child{
        border: none;
    }
    .video-list .item  div.audio-img{
        position:relative;
        display: block;
        width: 100%;
        height:16rem;
        margin-bottom:1.5rem;
        img.audio-cover{
            width:100%;
            height:16rem;
            border-radius: 6px;
            border: none;
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
        .video-info{
            position: absolute;
            bottom: 0;
            background: rgba(0,0,0,0.6);
            width: 100%;
            height: 2.7rem;
            color: #FFF;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 1.1rem;
            box-sizing: border-box;
            font-size: 1rem;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            p.time{
                background: url("../../assets/images/videoTime.png") no-repeat;
                background-size:1.0rem 1.0rem ;
                background-position: left top;
                padding-left: 1.5rem;
            }
        }
    }

    .video-list .item .info{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 1rem;

        .left{
            width: 64vw;
            h3{
                font-size:1.4rem;
                margin-bottom: 1rem;
                color: #323232;
                overflow: hidden;
                vertical-align: text-top;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                font-weight: normal;
            }
            h3.active{
                color: #CB1F1F;
            }
            p{
                display: inline-block;
                font-size: 1.1rem;
                color: #999999;
                line-height: 1.6;
                overflow:hidden;
                vertical-align:text-top;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
            }
        }
        .right{
            width: 4.6rem;
            height: 6.3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            -webkit-box-orient: vertical;
            display: inline-block;
            text-align: right;
            font-size: 1rem;
            position: relative;
            margin-right: 1rem;
            color: #CC2324;
            img{
                width: 4.6rem;
                height: 6.3rem;
                border-radius: 2px;
            }
            span{
                position: absolute;
                bottom: 0;
                height: 1.5rem;
                background: rgba(0,0,0,0.6);
                color: #FFF;
                font-size: 0.9rem;
                line-height: 1.5rem;
                display: block;
                width: 4.6rem;
                border-bottom-left-radius: 2px;
                border-bottom-right-radius: 2px;
                margin: 0;
                padding: 0;
                text-align: center;
            }
        }
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
    <div class="video-list">
        <div  class="item" v-for="item in weeklyVideoList">
            <div class="audio-img">
                <img class="audio-cover" :src="item.goodsImg" />
                <img class="play-btn" src="../../assets/images/play.png" data-url="{{ item.goodsUrl }}" @click="playVideo(item.goodsUrl)"/>
                <div class="video-info">
                    <p class="date">更新：{{item.publishTime | time}}</p>
                    <p class="time">{{item.goodsLong | millisecondToDate}}</p>
                </div>
            </div>
            <div class="info">
                <div class="left">
                    <h3>{{item.goodsTitle}}</h3>
                    <p>{{item.goodsDesc}}</p>
                </div>
                <div class="right" @click="goItemHome(item.bookId)" :class="[currentPlay === item.goodsId?'active': '']">
                    <!--<a @click="goItemHome(item.bookId)" :class="[currentPlay === item.goodsId?'active': '']">查看《{{item.bookName}}》</a>-->
                        <img :src="item.bookCoverImg">
                        <span>查看图书</span>
                </div>
            </div>
        </div>
        <div class="video-box">
            <a class="close_btn"  @click="videoReturn()">X</a>
        </div>
    </div>
</template>
<script>
  export default{
    props:['weeklyVideoList'],
    data(){
      return {
        currentPlay: ''
      }
    },
    methods:{
      goItemHome(v){
        var $this = this
        $this.currentPlay =  v
        window.location.href = "../item/" + v +'?s_type=1'
      },
      playVideo(src){
        var vBox = document.getElementsByClassName('video-box')[0]
        var v = document.createElement('video')
        vBox.appendChild(v)
        vBox.style.display = 'block'
        v.setAttribute("src", src)
        v.setAttribute("id", 'video-player')
        v.play()
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