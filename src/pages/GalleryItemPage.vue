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
  import galleryData from '../../data/gallery.js'

  export default {
    name: 'GalleryItemPage',
    data: () => ({
      galleryData: galleryData,
      itemData: null,
      itemIndex: null
    }),
    mounted() {
      this.itemIndex = this.$route.params.galleryitem_id - 1
      // console.log(this.itemData[this.itemIndex].wrestler)
      this.itemData = this.galleryData[this.itemIndex]
    },
    methods: {
    }
  }
</script>