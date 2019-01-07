<template>
    <!--<save-init>-->
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div @click="msg++">点击加1s</div>
        <div @click="click">
            去其他页面
        </div>
        <child></child>
    </div>
    <!--</save-init>-->
</template>

<script>
  import snapShot from '../../../src/vue-snapshot';
  import child from './child';

  export default {
    name: 'HelloWorld',
    components: {
      snapShot,
      child,
    },
    data() {
      return {
        msg: 0,
      };
    },
    methods: {
      click() {
        // this.$keepAlive.useInitData = true
        this.$router.push('/about');
      },
    },
    mounted() {
      console.log('child mounted');
    },
    activated() {
      console.log('child activated');
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
