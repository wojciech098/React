<template>
  <v-card>
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-avatar
              color="teal"
              size="38">
            <span class="white--text headline">{{ $store.state.email[0] }}</span>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-title>{{ $store.state.email }}</v-list-item-title>

        <v-btn
            icon
            @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="pushLocation(item.location)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
name: "Nav",
  data: ()=>{
  return {
    mini: true,
    drawer: null,
    items: [
      {
        title: 'Przedmioty',
        icon: 'mdi-book',
        location: 'Courses'
      },
      {
        title: 'Niezdane egzaminy',
        icon: 'mdi-text-box-remove',
        location: 'NotPassedExams'
      }
    ]
  }
  },
  methods:{
    pushLocation(name){
      if(this.$route.name!==name){
        this.$router.push({name: name})
      }
    }
  }
}
</script>

<style scoped>
</style>