<template>
  <div style="background-color: #f6f6f6" class="py-4 text-center">
    <div class="d-inline-flex flex-column justify-content-center div-width">
      <h1>Hello</h1>
      <p>Sign In or Sign Up to your account</p>
      <b-nav tabs fill>
        <b-nav-item :to="{ name: 'signin' }" active class="signInStyle"
          >Sign In</b-nav-item
        >
        <b-nav-item :to="{ name: 'signup' }"
          ><div class="signUpStyle">Sign Up</div></b-nav-item
        >
      </b-nav>
      <b-container class="border border-top-0 bg-white pb-3">
        <b-form @submit.prevent="logIn" class="m-3">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
            <b-form-input v-model="form.email"></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Password:"
            label-for="input-2"
          >
            <b-form-input v-model="form.password"></b-form-input>
          </b-form-group>
          <BaseButton type="submit" class="mt-5" buttonClass="-fill-gray"
            >Login</BaseButton
          >
        </b-form>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.createFreshForm(),
    }
  },
  methods: {
    logIn() {
      this.$store
        .dispatch('auth/login', {
          email: this.form.email,
          password: this.form.password,
        })
        .then(() => {
          this.$router.push({ name: 'home' })
        })
        .catch((err) => {
          this.status = err.response.status
        })
      this.form = this.createFreshForm()
    },
    createFreshForm() {
      return {
        email: '',
        password: '',
      }
    },
  },
}
</script>

<style scoped>
.div-width {
  width: 400px;
}
p,
h1 {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.signInStyle {
  font-weight: 700;
}
.signUpStyle {
  font-weight: 400;
  color: grey;
}
</style>
