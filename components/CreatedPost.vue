<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      persistent
      max-width="490"
    >
      <v-card>
        <v-alert v-if="error" type="error" class="align-center">
          <v-row class="center text-center align-center">
            <v-col class="grow">
              {{ errorMessage || errorMessage[0]?.message }}
            </v-col>
            <v-col class="shrink">
              <v-btn
                @click="error = false">
                OK
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>
        <v-card-title class="headline">Created New Post</v-card-title>
        <div class="pa-5">
          <v-text-field
            v-model="title"
            label="Title"
            required
          />
          <v-text-field
            v-model="fullText"
            label="Full text"
            required
          />
          <v-text-field
            v-model="description"
            label="Description"
            required
          />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="close"
          >
            Close
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="createdNewPost"
          >
            Created Post
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "CreatedPost",
  data() {
    return {
      title: '',
      fullText: '',
      description: '',
      errorMessage: '',
      error: false
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async createdNewPost() {
      try {
        await this.$axios.post('/posts', {
          title: this.title,
          fullText: this.fullText,
          description: this.description,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
        this.close();
        this.$nuxt.refresh()
      } catch (error) {
        this.errorMessage = error;
        this.error = true;
      }
    }
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set() {
        this.$emit('close')
      }
    }
  },
}
</script>
