<template>
  <v-container>
    <v-row justify="center">
      <div v-for="(user, index) in users"
           :key="index">
        <UserCard
          :email="user.email"
          :name="user.name"
          :initial="user.name[0]?.toUpperCase()"
          :skills="user.skills"
          :details="user.details"
          :profession="user.profession"
        />
      </div>
    </v-row>
  </v-container>
</template>
<script>
import {mapState} from 'vuex'
export default {
  layout: "dashboard",
  name: "Users",
  computed: {
    ...mapState('users', ['users'])
  },
  mounted() {
    this.$store.dispatch('users/getUsers')
  }
}
</script>
