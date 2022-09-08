<template>
  <v-container fluid>
    <v-card outlined>
      <v-container class="py-8">
        <div class="d-flex justify-center mb-4">
          <v-icon size="40">mdi-emoticon-sad-outline</v-icon>
        </div>

        <div v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </div>
        <div class="text-center" v-else>
          <p class="title text-center my-0 py-0 grey--text text--darken-3">Oops! Something totally went wrong</p>
          <p class="subtitle-1 red--text text-center my-0 py-0">{{error.message}}</p>
          <p class="subtitle-1 red--text text-center my-0 py-0">{{error.statusCode}}</p>
          <NuxtLink to="/post">
            Home page
          </NuxtLink>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
