<style lang="less">
    /*简介*/
    .synopsis{
        background: #ffffff;
        padding: 1.3rem 3.75vw;
        font-size: 1.2rem;
        color: #131313;
        line-height: 1.6rem;
        text-indent: 2em;
    }
    .scroll{
        padding-bottom: 10rem;
    }
</style>
<template>
    <div v-bind:class="['p_con synopsis',playFlag?'scroll':'']">{{synopsis}}</div>
</template>
<script>
  export default{
    props: ['synopsis','hasBought','playFlag'],
    data(){
      return {
      }
    }
  }
</script>