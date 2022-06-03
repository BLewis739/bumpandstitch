<template>
<div id="app">
<header class="site-header">
  <div class='site-title'>
  Bump & Stitch
    <div class='sub-heading'>
      Custom Professional Wrestling Gear
    </div>
  </div>
  <NavBar/>
</header>
<main> 
  <router-view></router-view>
</main>
</div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => ({
  }),
  mounted() {
  },
  methods: {

  }

}
</script>

<style>

</style>
