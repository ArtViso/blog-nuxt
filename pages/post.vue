<template>
  <v-container>
    <v-row justify="center">
      <div v-for="(post, index) in posts"
           :key="index">
        <PostCard
          :title="posts.title"
          :description="posts.description"
          :date-created="posts.dateCreated"
          :likes="posts.likes.length"
        />
      </div>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'dashboard',
  name: 'Posts',
  async asyncData({$axios}) {
    const posts = await $axios.$get(`/posts?limit=52`);
    console.log(posts)
    return {
      posts: posts.data
    }
  },
}
</script>
