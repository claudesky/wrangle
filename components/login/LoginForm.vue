<template lang="pug">

v-card
  v-container
    v-form(
      @submit.prevent="submit"
    )
      h4.text-center Welcome back
      p.text-center.subtitle-2 Please enter your credentials
      v-text-field(
        v-model="email"
        label="email"
        type="email"
        required
        :disabled="loading"
      )
      v-text-field(
        v-model="password"
        label="password"
        type="password"
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
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js'

export default Vue.extend({
  data() {
    return {
      loading: false,
      email: '',
      password: '',
    }
  },
  methods: {
    async submit() {
      this.loading = true
      let user: CognitoUser = await Auth.signIn(this.email, this.password)
        .catch(error => {
          console.error(error)
          if (error.code == 'PasswordResetRequiredException') {
            // Password reset is required, send to update password
            this.$toast.info("A passsword reset was requested")
            this.$router.push({
              path: '/login/update-password',
              query: { email: this.email },
            })
          }

          return undefined
        })

      if (!user) {
        // Login failure
        this.loading = false
        return
      }

      if (user.challengeName && user.challengeName == 'NEW_PASSWORD_REQUIRED') {
        const newPassword = prompt('Please enter a new password', '') as string

        user = await Auth.completeNewPassword(user, newPassword)
      }

      const jwtToken = (user
        .getSignInUserSession()?.getAccessToken()?.getJwtToken() ||
        false)

      this.$auth.setUserToken(jwtToken)

      console.debug(jwtToken)

      this.$auth.setUser(user)
    }
  }
})
</script>
