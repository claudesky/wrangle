<template lang="pug">

v-card
  v-container
    v-form(
      @submit.prevent="submit"
    )
      h4.text-center Change Password
      p.text-center.subtitle-2 Please enter your credentials and new password
      v-text-field(
        v-model="email"
        label="email"
        type="email"
        disabled
      )
      v-row
        v-col
          v-text-field(
            v-model="code"
            label="code from email"
            autocomplete="off"
            required
            :disabled="loading"
          )
        v-col(
          cols="2"
        )
          v-container
            v-btn(
              @click="forgotPassword"
              :loading="loading"
              :disabled="loading"
            ) Resend Code
      v-text-field(
        v-model="new_password"
        label="new password"
        type="password"
        autocomplete="new-password"
        required
        :disabled="loading"
      )
      v-text-field(
        v-model="new_password_confirmed"
        label="confirm your new password"
        type="password"
        autocomplete="new-password"
        required
        :disabled="loading"
      )
      v-btn(
        type="submit"
        :loading="loading"
        :disabled="loading"
      ) Submit

</template>

<script lang="ts">
import Vue from 'vue'
import { Auth } from 'aws-amplify'

export default Vue.extend({
  props: {
    email: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      code: '',
      new_password: '',
      new_password_confirmed: '',
    }
  },
  methods: {
    async submit() {
      // check password confirmation
      if (this.new_password != this.new_password_confirmed) {
        this.$toast.error('The passwords do not match')
        return
      }

      // submit password change
      this.loading = true
      Auth.forgotPasswordSubmit(
        this.email,
        this.code,
        this.new_password,
      )
        .then(result => {
          console.debug(result)
          this.$toast.success('Your password has been changed')
          this.$router.push('/login')
        })
        .catch(error => {
          console.error(error)
          this.$toast.error('There was an error')
        })
        .finally(() => this.loading = false)
      // end of submit()
    },
    forgotPassword() {
      // resend password reset code
      this.loading = true
      Auth.forgotPassword(this.email)
        .then(result => {
          console.debug(result)
          this.$toast.info('An email has been sent with your password reset code')
        })
        .catch(error => {
          console.error(error)
          this.$toast.error('There was an error resending the code')
        })
        .finally(() => this.loading = false)
      // end of forgotPassword()
    }
  }
})
</script>
