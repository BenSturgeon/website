<template>
  <div class="img-cont">
    <img :src="getImg()" v-bind:alt="alt" />
    <span v-if="false" class="img-caption">{{ alt }}</span>
  </div>
</template>

<script>
export default {
  //declare props for the 'src' and 'alt' of the image
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  methods: {
    /* function to get and return the final url to our processed image
          using the require function */
    getImg() {
      console.log();
    //   return "gofish";
      try {
        // place the '~/' before 'assets/'
        return require(`~/assets/images/${this.src}`);
      } catch (err) {
        console.warn(err);
        // return null if any error
        return null;
      }
    },
  },
};
</script>