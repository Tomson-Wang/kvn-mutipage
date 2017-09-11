<template>
    <div>
        <iframe :src="iframe" style="display: none"></iframe>
    </div>
</template>
<script>
    export default{
        props:['title'] ,
        data(){
            return {
                iframe:''
            }
        } ,
        watch:{
            title(n , o){
                console.log(n , o)
                if (n != o) {
                    this.setTitle()
                }
            }
        } ,
        created(){
            this.setTitle()
        } , methods:{
            setTitle(){
                document.title = this.title
                // 判断是否为ios设备，ios设备需要通过加载iframe来刷新title
                if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                    this.iframe = '/favicon.ico'
                }
            }
        }
    }
</script>