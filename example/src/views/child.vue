<template>
    <div @click="number++">
      子组件: {{number}}
    </div>
</template>

<script>
  export default {
    name: 'child',
    data() {
      return {
        number: 0
      }
    }
  };
</script>

<style scoped>

</style>
