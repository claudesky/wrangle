<template lang="pug">

v-app
  Nuxt

</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({

})
</script>

<style lang="scss">

@keyframes autofill {
  0%,100% {
    color: #666;
    background: transparent;
  }
}

input:-webkit-autofill {
  -webkit-animation-delay: 1s; /* Safari support - any positive time runs instantly */
  -webkit-animation-name: autofill;
  -webkit-animation-fill-mode: both;
  animation-name: autofill;
  animation-delay: 1s;
  animation-fill-mode: both;
}
</style>
