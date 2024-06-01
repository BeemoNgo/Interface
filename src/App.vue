<template>
  <div id="app">
    <header>
      <navBar /> 
    </header>
    <main>
      <router-view />
    </main> 
    <footer>
      <footerComponent />
    </footer>
  </div>
</template>

<script>
import navBar from '@/components/Navbar.vue' 
import footerComponent from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    navBar,
    footerComponent
  },
  setup() {
    return {}
  },
  mounted() {
    document.body.style.backgroundColor = "#00001A";
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

nav {
  padding: 30px;
}

nav a.router-link-exact-active {
  color: #8542b9;
}
</style>
