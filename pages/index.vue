<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
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
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{ isRegister ? stateObj.register.name : stateObj.login.name }} form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="isRegister ? register() : login()">
                  <v-text-field
                    v-if="isRegister"
                    v-model="username"
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="username"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="email"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="email"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="password"
                    required
                  ></v-text-field>
                  <div class="d-flex justify-space-between">
                    <v-btn type="submit" class="mt-4" color="primary" value="log in">
                      {{ isRegister ? stateObj.register.name : stateObj.login.name }}
                    </v-btn>
                    <v-btn color="primary" class="mt-4" @click="isRegister = !isRegister;">
                      {{ toggleMessage }}
                    </v-btn>
                  </div>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      isRegister: false,
      errorMessage: "",
      error: false,
      stateObj: {
        register: {
          name: 'Register',
          message: 'Aleady have an Acoount?'
        },
        login: {
          name: 'Login',
          message: 'Register'
        }
      }
    };
  },
  methods: {
    async login() {
      try {
        const data = (await this.$axios.post('/auth', {
          email: this.email,
          password: this.password,
        })).data
        localStorage.setItem("token", data.token);
        await this.$router.replace('/post')
      } catch (error) {
        this.errorMessage = error.response.data.error;
        this.error = true;
      }
    },
    async register() {
      try {
        await this.$axios.post('/users', {
          email: this.email,
          password: this.password,
          name: this.username
        })
        this.isRegister = false;
        this.$refs.form.reset();
      } catch (error) {
        this.errorMessage = error.response.data;
        this.error = true;
      }
    },
    close() {
      this.error = false
    }
  },
  computed: {
    toggleMessage: function () {
      return this.isRegister ? this.stateObj.register.message : this.stateObj.login.message
    }
  },
}
;
</script>
