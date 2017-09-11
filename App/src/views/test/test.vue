<template>
  <div class="mallIndex">
    <div is="banner"></div>
    <div is="navComponent"></div>
    <div is="column"></div>
    <div is="floatImg"></div>
  </div>
</template>
<style>
</style>
<script>
  import banner from '@/components/mallIndex/banner.vue'
  import navComponent from '@/components/mallIndex/nav.vue'
  import column from '@/components/mallIndex/column.vue'
  import floatImg from '@/components/citicLeagueEnter/floatImg.vue'

  export default {
    components:{
      'banner':banner ,
      'navComponent':navComponent ,
      'column':column ,
      floatImg
    }
  }
</script>
