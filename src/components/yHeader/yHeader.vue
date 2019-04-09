<template>
    <header class="y-app-header">
        <img class="logo" src="./logo.png" alt="">
        <h1 class="text">Yezi Music</h1>
    </header>
</template>

<script>
  export default {
    name: "y-header"
  }
</script>

<style lang="stylus" scoped>
    .y-app-header {
        position: relative;
        height: 44px;
        display: flex
        align-items: center
        justify-content: center
        background-color: rgba(249, 249, 249, .6);
        .logo {
            display: block
            width: 40px
            height: 40px
            margin-right: 10px
        }
        .text {
            display: inline-block;
            vertical-align: top;
            line-height: 44px;
            font-size: 18px;
            font-weight: 500
            color: #7eb758;
        }
    }
</style>