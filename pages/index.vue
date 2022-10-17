<template lang="pug">

div
  p Welcome
  NuxtLink(
    to="/login"
  ) Please Login

</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'guest',
  auth: false,
}
</script>
