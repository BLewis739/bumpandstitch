<template>
  <div class='card'>
    <div class='image-wrapper'>
      <img :src="item.gallery_photo_items[0]"/>
    </div>
    <div class='info-wrapper'>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GearCard',
    props: ['item'],
    methods: {

    }
  }
</script>