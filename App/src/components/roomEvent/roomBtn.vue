<template>
        <div>
                <a v-if="!added" class="addRoom" @click="addgoods"><img src="../../assets/images/add.png"></a>
                <a v-if="added" class="removeRoom" @click="removegoods"><img src="../../assets/images/remove.png"></a>
        </div>
</template>
<style>
     a.addRoom, a.removeRoom{
        background: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
     /*a.addRoom{*/
             /*width: 1.6rem;*/
             /*height: 1.4rem;*/
             /*display: inline-block;*/
             /*background-size: 1.4rem 1.6rem;*/
             /*background: url("../../assets/images/add.png") no-repeat;*/
     /*}*/
     /*a.removeRoom{*/
             /*width: 1.6rem;*/
             /*height: 1.4rem;*/
             /*display: inline-block;*/
             /*background-size: 1.4rem 1.6rem;*/
             /*background: url("../../assets/images/remove.png") no-repeat;*/
     /*}*/
    a img{
        width: 1.6rem;
        height: 1.4rem;
    }
</style>
<script>
  export default{
    props:['hasAddRoom','itemId','goodsId'],
    data(){
      return {
        msg: 'hello vue',
        added: this.hasAddRoom
      }
    },
    watch:{
      hasAddRoom(n,o){
        if(n!=o){
          this.added=n
        }
      },
    },
    methods:{
      removegoods(){
        var $this = this
//        $this.added = false
        fetch('../caapiv2/removegoods' , {
          credentials:'same-origin' ,
          method:'POST' ,
          headers:{
            'Content-Type':'application/json'
          } ,
          body:JSON.stringify({
            "itemId":$this.itemId,
            "goodsNum":$this.goodsId
          })
        }).then(function (tresponse){
          return tresponse.json()
        }).then(function (tjson){
          $this.added = false
        })
      },
      addgoods(){
        var $this = this
        $this.added = true
        fetch('../caapiv2/addgoods' , {
          credentials:'same-origin' ,
          method:'POST' ,
          headers:{
            'Content-Type':'application/json'
          } ,
          body:JSON.stringify({
            "itemId":$this.itemId,
            "goodsNum":$this.goodsId
          })
        }).then(function (tresponse){
          return tresponse.json()
        }).then(function (tjson){
          $this.added = true
        })
      }
    }
  }
</script>