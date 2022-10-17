<template lang="pug">

v-container
  p This is the home page
  p You are logged in as {{ $auth.user.attributes.email }}
  v-btn(
    @click="logout"
  ) Logout

</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data() {
    return {
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
        .then(result => {
          console.debug(result)
          this.$toast.info('Logged out')
          this.$router.push('/')
        })
    }
  }
})

</script>
