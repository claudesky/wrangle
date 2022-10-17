<template lang="pug">

v-container
  ChangePasswordForm(
    :email="$route.query.email"
  )

</template>

<script lang="ts">
import Vue from "vue"
import ChangePasswordForm from "~/components/login/ChangePasswordForm.vue"

export default Vue.extend({
    auth: false,
    components: { ChangePasswordForm }
})

</script>
