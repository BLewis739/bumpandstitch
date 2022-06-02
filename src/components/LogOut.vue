<template>
  <div class='logout-button'>
    <button @click="handleLogOut" class="contact-link">Log Out</button>
  </div>
</template>

<script>
  export default {
    name: 'LogOut',
    methods: {
      handleLogOut(event) {
        event.preventDefault()
        this.$emit("handleLogOut")
      }
    }
  }
</script>