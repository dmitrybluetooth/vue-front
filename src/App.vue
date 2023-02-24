<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="!token" :to="{ name: 'login'}">Login</RouterLink>
        <RouterLink v-if="!token" :to="{ name: 'registration'}">Registration</RouterLink>
        <a v-if="token" @click.prevent="logout" href="#">Logout</a>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  data() {
    return {
      token: null
    }
  },

  mounted() {
    this.getToken()
  },

  watch: {
    $route(to, from) {
      this.getToken()
    }
  },

  methods: {
    getToken() {
      this.token = localStorage.getItem('auth_token')
    },

    logout() {
      this.axios.get('http://localhost/sanctum/csrf-cookie')
        .then(response => {
          this.axios.post('http://localhost/api/logout')
            .then(result => {
              localStorage.removeItem('auth_token')
              this.$router.push({name: 'login'})
            })
        })
    }
  }
}

</script>

<style scoped>
  header {
    line-height: 1.5;
    max-height: 100vh;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  nav {
    width: 150%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  nav a:first-of-type {
    border: 0;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }

    nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
</style>
