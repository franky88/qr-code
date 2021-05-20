<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <AdOnQRGenerator/>
</template>

<script>
import AdOnQRGenerator from './components/AdOnQRGenerator';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    AdOnQRGenerator
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  /* background-color:wheat; */
}
</style>
