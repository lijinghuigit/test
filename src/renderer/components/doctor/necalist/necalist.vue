<template>
    <div class="bac" v-loading="tcloading">
        <left-nav ref="tc"></left-nav>
        <right-nav></right-nav>
    </div>
</template>

<script>

    import LeftNav from './left';
    import RightNav from './right'
    export default {
        name: "necalist",
        data(){
          return{
              tcloading:false   //loading加载显示false 如果需要加载修改true即可(目前无加载，不需要可删除)
          }
        },
        components:{
            LeftNav,
            RightNav,
        }
    }
</script>

<style scoped>
    .bac{
        background-color: #fff;
        width: 100%;
        height: 780px;
    }

</style>