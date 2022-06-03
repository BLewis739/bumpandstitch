<template>
  <div class='page-wrapper'>
    <header class="home-page-header">
      Gallery
    </header>
    <div class='gallery-items-wrapper'>
    <div v-if=this.galleryItems class='all-cards'> 
      <div :key="item.id" v-for="item in galleryItems" @click="navigateItem(item.id)">
        <GearCard :item="item"/>
      </div>
    </div>
    <div v-else>
      Loading items...
    </div>
    </div>
  </div>
</template>

<script>
  import GearCard from '../components/GearCard.vue'
  import galleryData from '../../data/gallery.js'

  export default {
    name: 'GalleryPage',
    data: () => ({
      galleryItems: galleryData
    }),
    components: {
      GearCard
    },
    methods: {
      navigateItem(itemId) {
        this.$router.push(`/gallery/item/${itemId}`)
      }
    }
  }
</script>