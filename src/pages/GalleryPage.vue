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
  import axios from 'axios'
  import GearCard from '../components/GearCard.vue'

  export default {
    name: 'GalleryPage',
    data: () => ({
      galleryItems: []
    }),
    components: {
      GearCard
    },
    mounted() {
      this.getGalleryItems()
    },
    methods: {
      async getGalleryItems() {
        const res = await axios.get(`https://cashew-gear-backend.herokuapp.com/galleryitems/`)
        this.galleryItems = res.data
        console.log(res.data)
      },
      navigateItem(itemId) {
        this.$router.push(`/gallery/item/${itemId}`)
      }
    }
  }
</script>