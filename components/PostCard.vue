<template>
  <v-card
    class="pa-1 ma-2 mt-10"
    color="#26c6da"
    dark
    width="350px"
    min-height="400px"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-twitter
      </v-icon>
      <span class="text-h6 font-weight-light">{{ title }}</span>
    </v-card-title>

    <v-card-text class="text-h5 font-weight-bold">
      {{ description }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-content>
          <v-list-item-title>{{
              new Date(dateCreated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })
            }}
          </v-list-item-title>
        </v-list-item-content>
        <v-row
          align="center"
          justify="end"
        >
          <v-icon class="mr-1">
            mdi-heart
          </v-icon>
          <span class="subheading mr-2">{{ likes }}</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        v-if="checkMyID"
        @click="deletePost">
        Deleted post
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import {mapState} from "vuex";

export default {
  name: 'PostCard',
  props: {
    title: {
      type: String,
      default: 'post'
    },
    description: {
      type: String,
      default: 'description',
    },
    dateCreated: {
      type: String,
      default: '',
    },
    likes: {
      type: Number,
      default: 0,
    },
    id: {
      type: String,
      default: '0'
    },
  },
  data() {
    return {
      flag: false
    }
  },
  computed: {
    ...mapState('user', ['user']),
    checkMyID() {
      return this.user._id === this.id;
    }
  },
  methods: {
    deletePost() {
      this.$emit('deletePost')
    }
  }
}
</script>
