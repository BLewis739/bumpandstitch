<template>
  <div class='page-wrapper'>
    <header class="home-page-header">
      Details
    </header>
    <div v-if="this.itemData">
      <h2>Gear constructed for {{this.itemData.wrestler}}</h2>
      <div class="photo-container">
      <div :key="photo.index" v-for="photo in this.itemData.gallery_photo_items" class="detail-page-photo">
        <img :src="photo">
      </div>
      </div>
    </div>
    <div v-else>
      Loading details...
    </div>
    <div class="back-button-container">
      <router-link to="/gallery" class='nav-link'>Back to Gallery</router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'GalleryItemPage',
    data: () => ({
      itemData: null
    }),
    mounted() {
      this.getItemDetails()
    },
    methods: {
        async getItemDetails() {
          const res = await axios.get(`https://cashew-gear-backend.herokuapp.com/galleryitems/${this.$route.params.galleryitem_id}`)
          this.itemData = res.data
      },
    }
  }
</script>