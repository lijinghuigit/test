<template>
    <div class="box">
            <top-nav></top-nav>
            <bot-nav></bot-nav>
    </div>
</template>

<script>
    import TopNav from './topnav';
    import BotNav from './botnav';
    export default {
        name: "apmaker",
        data(){
            return {
               
            }
        },
        components:{
            TopNav,
            BotNav
        },
    }
</script>

<style scoped>
    .box{
        margin-top: 45px;
        width:98%;
        max-height: 720px;
        /* background: gray; */
        padding: 10px 10px;
    }

</style>