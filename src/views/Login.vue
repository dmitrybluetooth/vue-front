<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">Login</div>

          <div class="card-body">
              <div class="row mb-3">
                <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>

                <div class="col-md-6">
                  <input v-model="email" id="email" type="email" class="form-control" name="email" required autocomplete="email" autofocus>
                </div>
              </div>

              <div class="row mb-3">
                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>

                <div class="col-md-6">
                  <input v-model="password" id="password" type="password" class="form-control" name="password" required autocomplete="current-password">
                </div>
              </div>

              <div class="row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button @click.prevent="login" type="submit" class="btn btn-primary">
                    Login
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
  name: "Login",

  data() {
    return {
      email: '',
      password: '',
      remember: false,
    }
  },

  methods: {
    login() {
      this.axios.get('http://localhost/sanctum/csrf-cookie')
        .then(response => {
          this.axios.post('http://localhost/api/login', {
            email: this.email,
            password: this.password,
            remember: this.remember,
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