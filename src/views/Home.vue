<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Rejestarcja</h1>
        <v-alert type="error" v-if="registerErrorMessage!=null">{{registerErrorMessage}}</v-alert>
        <v-alert type="error" v-for="error in registerErrors" :key="error">{{error}}</v-alert>
        <v-alert type="success" v-if="registerStatus">Konto utworzone. Możesz się zalogować.</v-alert>
        <v-text-field v-model="register.email" type="email" label="Adres email"></v-text-field>
        <v-text-field v-model="register.firstName" label="Imie"></v-text-field>
        <v-text-field v-model="register.indexNumber" type="number" label="Numer indeksu"></v-text-field>
        <v-text-field v-model="register.password" type="password" label="Hasło"></v-text-field>
        <v-text-field v-model="register.confirmPassword" type="password" label="Powtórzone hasło"></v-text-field>
        <v-btn block @click="Register">Zarejestruj</v-btn>
      </v-col>
      <v-col>
        <h1>Logowanie</h1>
        <v-alert type="error" v-if="loginErrorMessage!=null">{{loginErrorMessage}}</v-alert>
        <v-alert type="error" v-for="error in loginErrors" :key="error">{{error}}</v-alert>
        <v-text-field v-model="login.email" type="emial" label="Adres email"></v-text-field>
        <v-text-field v-model="login.password" type="password" label="Hasło"></v-text-field>
        <v-btn block @click="Login">Zaloguj</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data: () => {
    return {
      register: {
            email: null,
            firstName: null,
            indexNumber: null,
            password: null,
            confirmPassword: null
      },
      login: {
        email: null,
        password: null
      },
      registerErrors: [],
      registerErrorMessage: null,
      registerStatus: false,
      loginErrors: [],
      loginErrorMessage: null
    }
  },
  methods: {
    Register(){
      axios.post('https://zaliczenie.btry.eu/api/Auth/Register', this.register)
      .then(response=>{
        if(response.data.isSuccess) this.registerStatus=true
      })
      .catch(reason => {
        this.registerErrorMessage=reason.response.data.message
        if(reason.response.data.hasOwnProperty('errors')){
          this.registerErrors=reason.response.data.errors
        }
      })
    },
    Login(){
      axios.post('https://zaliczenie.btry.eu/api/Auth/Login', this.login)
          .then(response=>{
            this.$store.commit('setToken', response.data.message)
            this.$store.commit('setAuth', true)
            this.$store.commit('setEmail', this.login.email)
            this.$router.push({name: 'Courses'})
          })
          .catch(reason => {
            this.loginErrorMessage=reason.response.data.message
            if(reason.response.data.hasOwnProperty('errors')){
              this.loginErrors=reason.response.data.errors
            }
          })
    }
  },
  mounted(){
    if(this.$store.state.isAuth){
      this.$router.push({name: 'Courses'})
    }
  }
}
</script>
