<template>
  <v-app>
    <Nav v-if="$store.state.isAuth" class="nav"></Nav>
    <router-view class="router-view"></router-view>
  </v-app>
</template>

<script>
import Nav from "./components/Nav";

export default {
  name: 'App',

  components: {
    Nav,
  },

  data: () => ({
    //
  }),
  mounted(){
    if(this.$route.name!=='Home' && !this.$store.state.isAuth){
      this.$router.push({name: 'Home'})
    }
  }
};
</script>

<style lang="scss">
.nav{
  float: left;
  min-height: 100vh;
  position: absolute;
  z-index: 2;
}
.router-view{
  min-height: 100vh;
}
h1{
  margin-bottom: 1rem;
}
</style>
