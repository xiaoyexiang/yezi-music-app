<template>
    <div class="building-wrap">
        <img class="building-img" src="./building.png" alt="building">
        <span class="building-text">披星戴月开发中，敬请期待！</span>
    </div>
</template>

<script>
  export default {
    name: "building",
    data() {
      return {
        buildingText: ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .building-wrap {
        display: block
        .building-img {
            display: block
            width: 120px
            height: 120px
            margin: auto
        }
        .building-text {
            display: block
            margin: 15px auto 0
            font-size: 14px
            text-align: center
        }
    }
</style>