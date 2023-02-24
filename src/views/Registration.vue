<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">Register</div>

          <div class="card-body">
              <div class="row mb-3">
                <label for="name" class="col-md-4 col-form-label text-md-end">Name</label>

                <div class="col-md-6">
                  <input v-model="name" id="name" type="text" class="form-control" name="name" required autocomplete="name" autofocus>
                </div>
              </div>

              <div class="row mb-3">
                <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>

                <div class="col-md-6">
                  <input v-model="email" id="email" type="email" class="form-control" name="email" required autocomplete="email">
                </div>
              </div>

              <div class="row mb-3">
                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                <div class="col-md-6">
                  <input v-model="password" id="password" type="password" class="form-control" name="password" required autocomplete="new-password">
                </div>
              </div>

              <div class="row mb-3">
                <label for="password-confirm" class="col-md-4 col-form-label text-md-end">Confirm Password</label>

                <div class="col-md-6">
                  <input v-model="password_confirmation" id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-md-6 offset-md-4">
                  <button @click.prevent="register" type="submit" class="btn btn-primary">
                    Register
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Registration",

  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
  },

  methods: {
    register() {
      this.axios.get('http://localhost/sanctum/csrf-cookie')
        .then(response => {
          this.axios.post('http://localhost/api/registration', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation
          })
            .then(result => {
              localStorage.setItem('auth_token', result.data.success.token)
              this.$router.push({name: 'home'})
            })
            .catch(error => {
              console.log(error)
            })
        })
    }
  }
}
</script>

<style scoped>

</style>
