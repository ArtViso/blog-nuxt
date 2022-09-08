<template>
  <v-card
    class="pa-1 ma-2"
    width="350px"
    height="280px"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content style="word-break: break-word">
        <div class="text-overline mb-4">
          {{email}}
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{ name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{skills}}</v-list-item-subtitle>
        <v-list-item-subtitle>{{details}}</v-list-item-subtitle>
        <v-list-item-subtitle>{{profession}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar
        tile
        size="48"
        color="brown lighten-4"
      >{{initial}}</v-list-item-avatar>
    </v-list-item>
    <v-card-actions>
      <v-spacer></v-spacer>
      <slot></slot>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    name: 'UserCard',
    props: {
      email: {
        type: String,
        default: 'default@gmail.com'
      },
      name: {
        type: String,
        default: 'Name'
      },
      initial: {
        type: String,
        default: 'U'
      },
      details: {
        type: String,
        default: 'Details'
      },
      profession: {
        type: String,
        default: 'Profession'
      },
      skills: {
        type: String,
        default: 'Skills'
      }
    }
  }
</script>
