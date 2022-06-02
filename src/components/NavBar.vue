<template>
  <nav>
    <router-link to="/" class='nav-link'>Home</router-link>
    <!-- <router-link to="/gearstyles" class='nav-link'>Styles</router-link> -->
    <router-link to="/gallery" class='nav-link'>Gallery</router-link>
    <router-link to="/about" class='nav-link'>About</router-link>
    <router-link to="/contact" class='nav-link'>Contact</router-link>
    <router-link v-if="isAuthenticated" to="/orders" class='nav-link'>Orders</router-link>
    <router-link v-if="!isAuthenticated" to="/login" class='nav-link'>Admin</router-link>
    <router-link v-else to="/login" class='nav-link'>Log Out</router-link>

  </nav>
</template>

<script>
  export default {
    name: 'NavBar',
    data: ()=> ({
      isAuthenticated: false
    }),
    mounted() {
      this.checkLoginStatus()
    },
    methods: {
      checkLoginStatus() {
        if (localStorage.getItem('access_token')) {
          this.isAuthenticated = true
        } else {
          this.isAuthenticated = false
        }
      }
    }
  }
</script>