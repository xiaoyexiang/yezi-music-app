<template>
    <div class="mine-wrapper">

        <div class="building-wrap">
            <building></building>
        </div>
    </div>
</template>

<script>
  import Building from '@/components/building/building.vue'

  export default {
    name: "mine",
    components: {
      Building
    }
  }
</script>

<style lang="stylus" scoped>
    .building-wrap {
        margin: 60px auto 0
    }
</style>