<template lang="pug">

v-container
  LoginForm

</template>

<script lang="ts">
import Vue from "vue"
import LoginForm from "../../components/login/LoginForm.vue"

export default Vue.extend({
  components: { LoginForm }
})
</script>
