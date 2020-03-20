<template>
    <div class="bac">
        <left-nav></left-nav>
        <right-nav></right-nav>
    </div>
</template>

<script>
    import LeftNav from './left';
    import RightNav from './right';
    export default {
        name: "dofa",
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