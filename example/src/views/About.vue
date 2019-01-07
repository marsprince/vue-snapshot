<template>
  <div>
    <div v-for="car in array">{{car}}</div>
    <div @click="click">点击数组+1</div>
    <router-link to="/">回去</router-link>
  </div>
</template>

<script>
  export default {
    name: 'Other',
    data() {
      return {
        array: [0,1]
      }
    },
    methods: {
      click() {
        this.array.push(this.array.length)
      }
    }
  };
</script>

<style scoped>

</style>
