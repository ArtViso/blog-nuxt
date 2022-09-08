<template>
  <v-container>
    <v-row justify="center">
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
      <div v-for="(post, index) in posts"
           :key="index">
        <PostCard
          :title="post.title"
          :description="post.description"
          :date-created="post.dateCreated"
          :likes="post.likes.length"
          :id="post.postedBy"
          @deletePost="deletePost(post._id)"
        />
      </div>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'dashboard',
  name: 'Posts',
  data() {
    return {
      posts: [],
      error: false,
      errorMessage: '',
    }
  },
  async asyncData({$axios}) {
    const posts = await $axios.$get(`/posts?limit=20&skip=490`);
    return {
      posts: posts.data
    }
  },
  methods: {
    async getAllPosts() {
      try {
        this.posts = (await this.$axios.get('/posts?limit=20&skip=490')).data.data;
      } catch (error) {
        this.errorMessage = error.response.data.error;
        this.error = true;
      }
    },
    async deletePost(idPost) {
      if (!idPost) return;
      try {
        await this.$axios.delete(`/posts/${idPost}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
        await this.getAllPosts()
      } catch (error) {
        this.errorMessage = error.response.data.error;
        this.error = true;
      }
    },
    createdNewPost() {
      this.show = true
    },
    close() {
      this.show = false
    }
  }
}
</script>
