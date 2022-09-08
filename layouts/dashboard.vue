<template>
  <v-app>
    <v-navigation-drawer app permanent style="border-right: 1px solid rgba(0, 0, 0, 0.12)">
      <client-only>
        <v-list>
          <v-list-item link to="/about" class="px-2">
            <v-avatar
              class="mr-5"
              color="brown lighten-4"
              size="48"
            >
              <span class="white--text text-h5">{{ returnFirstLetter(user.name) }}</span>
            </v-avatar>
            <div class="v-flex">
              <h1>{{ valueExists(user.name) }}</h1>
              <h3>{{ valueExists(user.email) }}</h3>
            </div>
          </v-list-item>
        </v-list>
      </client-only>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          :to="item.router"
          nuxt
          v-for="item in items"
          :key="item.title"
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
    <v-app-bar flat app fixed elevation="1" height="102px">
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        color="blue-grey"
        class="ma-2 white--text"
        @click="show = true"
      >
        Created new post
        <v-icon
          right
          dark
        >
          mdi-note-edit-outline
        </v-icon>
      </v-btn>
      <v-btn
        color="blue-grey"
        class="ma-2 white--text"
        @click="logOut"
      >
        Log out
        <v-icon
          right
          dark
        >
          mdi-exit-to-app
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <CreatedPost
        :visible="show"
        @close="close"
      />
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'Dashboard',
  computed: {
    ...mapState('user', ['user']),
  },
  mounted() {
    this.$store.dispatch('user/getUser')
  },
  data() {
    return {
      show: false,
      items: [
        {title: 'Posts', icon: 'mdi-view-dashboard', router: '/post'},
        {title: 'Users', icon: 'mdi-help-box', router: '/users'},
      ],
      username: '',
    }
  },
  methods: {
    valueExists(item) {
      return item || null
    },
    returnFirstLetter(name) {
      return name ? name[0] : ''
    },
    logOut() {
      localStorage.removeItem('token');
      this.$router.replace('/');
    },
    close() {
      this.show = false
    }
  }
}
</script>
