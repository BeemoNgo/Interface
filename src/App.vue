<template>
  <header>
    <navBar /> 
  </header>
  <div> 
    <router-view />
  </div> 
  <footer>
    <footerComponent />
  </footer>
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
</style>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
