<style lang="less">
    @import 'audioList.less';

    .scroll{
        padding-bottom:10rem;
    }
</style>
<template>
    <div class="list">
        <div v-for="item in playList" @click="play(item)" class="list_item">
            <div :class="['tit', currentItemId== item.id ? 'active' : '']">
                {{item.title}}
            </div>
            <div class="btn">{{item.duration}}</div>
        </div>
    </div>

</template>
<script>
    export default {
        props:['playList'] ,
        data(){
            return {
                currentItemId:-1 ,
                isFirst:false ,
                isLast:false ,
                canClick:true
            }
        } ,
        created(){
            let $this = this
            $this.$bus.$on('audio_prev' , () =>{
                let prevOne = $this.findItem(false)
                $this.play(prevOne)
            })
            $this.$bus.$on('audio_next' , () =>{
                let nextOne = $this.findItem(true)
                $this.play(nextOne)
            })
        } ,
        methods:{
            play(item){
                let $this = this
                if (!item || !$this.canClick) {
                    return
                }

                $this.canClick = false
                setTimeout($this.setCanClick , 1000)
                $this.currentItemId = item.id
                $this.findOne()
                $this.$bus.$emit('play' , {src:item.src , isFirst:this.isFirst , isLast:this.isLast})

            } ,
            setCanClick(){
                this.canClick = true
            } ,
            findOne(){
                let $this = this
                let l = JSON.parse(JSON.stringify($this.playList))
                for (let i = 0 ; i < l.length ; i++) {
                    if (l[i].id == $this.currentItemId) {
                        if (i == 0) {
                            $this.isFirst = true
                        } else if (l.length > 2 && i == (l.length - 1)) {
                            $this.isLast = true
                        } else {
                            $this.isFirst = false
                            $this.isLast = false
                        }
                    }
                }
            } ,
            findItem(direction){
                let $this = this
                let l = JSON.parse(JSON.stringify(this.playList))
                for (let i = 0 ; i < l.length ; i++) {
                    if (l[i].id == this.currentItemId) {
                        if (direction) {
                            if ((i + 1) < l.length) {
                                if (i == l - 1) {
                                    $this.isLast = true
                                } else {
                                    $this.isLast = false
                                }
                                return l[i + 1]
                            } else {
                                return null
                            }
                        } else {
                            if (i > 0) {
                                if (i == 1) {
                                    $this.isFirst = true
                                } else {
                                    $this.isFirst = false
                                }
                                return l[i - 1]
                            } else {

                                return null
                            }
                        }
                    }
                }
            }
        }

    }
</script>