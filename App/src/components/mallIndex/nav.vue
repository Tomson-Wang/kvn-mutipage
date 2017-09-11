<template>
  <div class="models">
    <div class="item" v-for="nav in navList" @click="goSectionList(nav.id,nav.itemType)">
      <img :src="nav.itemIcon">
      <span>{{nav.itemName}}</span>
    </div>
  </div>
</template>
<style>
  /*专题部分*/
  .models{
    padding:1rem 0;
    display:flex;
    background:#FFF;
    margin-bottom:0.45rem;
  }

  .models div.item{
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    cursor:pointer;
  }

  .models div.item span{
    font-size:1.1rem;
  }

  .models div.item img{
    width:3.5rem;
    height:3.5rem;
    border-radius:50%;
    margin-bottom:1rem;
    display:block;
  }
</style>
<script>
  export default {
    data(){
      return {
        navList:''
      }
    } ,
    created(){
      this.getNav()
    } ,
    methods:{
      getNav(){
        var $this = this
        fetch(apiHost + '/caapiv2/getNavList' , {
          credentials:'same-origin' ,
          method:'POST' ,
          headers:{
            'Content-Type':'application/json'
          }
        }).then(function (tresponse){
          return tresponse.json()
        }).then(function (tjson){
          if (tjson.data && tjson.data.length > 0) {
            $this.navList = tjson.data
          }
        })
      } ,
      goSectionList(sectionId , sectionType){
        window.location.href = "/section/" + sectionId + "?s_type=" + sectionType
      }
    }
  }
</script>
