<template>
  <v-container>
    <v-alert v-if="error" type="error" class="align-center">
      <v-row class="center text-center align-center">
        <v-col class="grow">
          {{ errorMessage }}
        </v-col>
        <v-col class="shrink">
          <v-btn
            @click="error = false">
            OK
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-row justify="center">
      <UserCard
        :email="user.email"
        :name="user.name"
      >
        <v-btn @click="deleteUser(user._id)">
          Deleted user
        </v-btn>
      </UserCard>
    </v-row>
  </v-container>
</template>
<script>
import {mapState} from "vuex";

export default {
  layout: "dashboard",
  name: "About",
  data() {
    return {
      error: false,
      errorMessage: ''
    }
  },
  computed: {
    ...mapState('user', ['user']),
  },
  methods: {
    async deleteUser(idPost) {
      if (!idPost) return;
      try {
        await this.$axios.delete(`/users/${idPost}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
        await this.$router.replace('/')
      } catch (error) {
        this.errorMessage = error;
        this.error = true;
      }
    }
  },
  mounted() {
    this.$store.dispatch('user/getUser')
  }
}
</script>
