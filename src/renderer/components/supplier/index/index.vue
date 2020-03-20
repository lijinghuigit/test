<template>
  <div class="first-page">
    <center-nav></center-nav>
    <right-nav></right-nav>
  </div>
</template>
<script>
  import CenterNav from './center';
  import RightNav from './right';
  export default {
    name: "supindex",
    components:{
      CenterNav,   
      RightNav
    },
    methods: {
      
    },
    created(){
       console.log('你变了吗')
    }
  }
</script>

<style scoped>
  .first-page{
    position: fixed;
    height: 100%;
    flex: 1;
    display: flex;
    padding-top: 60px;
    background-color: #fff;
  }
  .right{
    overflow: hidden;
  }
</style>
