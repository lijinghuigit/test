<template>
    <div class="bac">
        <left-nav></left-nav>
        <right-nav></right-nav>
    </div>
</template>

<script>
    import LeftNav from './methods';
    import RightNav from './meright'
    export default {
        name: "method",
        components:{
            LeftNav,
            RightNav,
        }
    }
</script>

<style scoped>
    .bac{
        background-color: #fff;
        width:100%;
        height: 830px;
    }

</style>