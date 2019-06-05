<template>
    <div class="custom">
        <button class="custom-btn" open-type="contact">
            <i class="icon">&#xe734;</i>在线咨询
        </button>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.custom{
    position:fixed;
    bottom :10%;
    left: 2%;
    .custom-btn{
        i{
            display: inline-block;
            vertical-align:top;
            font-size: 0.5rem;
            color: #fff;
        }
        color: #fff;
        background-color:rgba(0,0,0,0.5);
        vertical-align:top;
        border: 0px;
        display: inline-block;
        border-radius: 45px;
        font-size: 0.4rem;
        padding: 5px;
        line-height: 20px
    }
}
</style>
