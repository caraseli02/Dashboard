<template>
  <div class="h-screen">
    <div
      class="flex-1 flex flex-col md:flex-row justify-center pb-4 md:px-16 p-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <!-- <img
        class="h-full w-full md:w-2/3 contain z-0"
        src="@/assets/img/asistSvg.svg"
        alt=""
      /> -->
      <div
        :class="`mx-auto w-full max-w-sm z-10 transform glass-${theme} p-2 self-center my-10`"
      >
        <div>
          <h2 class="text-3xl leading-9 font-extrabold text-primary">
            APIMOSA APP
          </h2>
          <span class="mt-2 text-lg leading-5 text-secondary max-w">
            Inicia sesión
          </span>
        </div>
        <!-- <transition name="fade">
          <p
            class="bg-red-100 p-5 my-5 border border-red-200 rounded text-red-500"
            v-if="error"
          >
            {{ error }}
          </p>
        </transition> -->
        <div class="mt-8">
          <div class="mt-6">
            <transition name="slide-fade">
              <form v-if="!showForgotPopUp" @submit.prevent>
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium leading-5 text-secondary"
                  >
                    Email address
                  </label>
                  <div class="mt-1 rounded-md shadow-sm">
                    <input
                      type="email"
                      placeholder="apimosa@apimosa.com"
                      v-model="email"
                      id="email"
                      required
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                <div class="mt-6">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-5 text-secondary"
                  >
                    Password
                  </label>
                  <div class="mt-1 rounded-md shadow-sm">
                    <input
                      type="password"
                      v-model="password"
                      id="password"
                      required
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                <div class="mt-6 flex flex-col items-center justify-between">
                  <div class="flex items-center">
                    <input
                      id="remember_me"
                      type="checkbox"
                      class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label
                      for="remember_me"
                      class="ml-2 block text-sm leading-5 text-secondary"
                    >
                      Remember me
                    </label>
                  </div>

                  <div class="text-sm leading-5 mt-2">
                    <button
                      class="font-medium text-xs text-primary focus:outline-none focus:underline transition ease-in-out duration-150"
                      @click="showForgotPopUp = !showForgotPopUp"
                    >
                      ¿Has olvidado tu contraseña?
                    </button>
                  </div>
                </div>
                <div class="mt-6">
                  <span class="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      @click="signIn"
                      class="w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-primary bg-secondary hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Inicia sesión
                    </button>
                  </span>
                </div>
              </form>
              <forgot-password
                v-on:closePopUp="showForgotPopUp = $event"
                v-if="showForgotPopUp"
                :theme="theme"
              >
                <button
                  class="bg-transparet px-4 py-2 rounded text-red-500 border border-red-600 transition duration-500 ease-in-out hover:bg-red-600 mt-4"
                  type="button"
                  aria-label="like"
                  @click="showForgotPopUp = !showForgotPopUp"
                >
                  Cerrar
                </button>
              </forgot-password>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="`glass-${theme} rounded-none text-secondary w-full h-20 text-lg flex justify-center items-center`"
    >
      ¿No tienes cuenta?
      <router-link
        class="bg-secondary text-primary shadow-lg p-3 rounded-lg ml-4 font-bold text-xl"
        to="/sign-up"
      >
        Regístrate
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ForgotPassword from "@/components/ForgotPassword";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      showForgotPopUp: false,
    };
  },
  components: { ForgotPassword },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters("notifi", ["notificationMessage"]),
    ...mapGetters({ theme: "theme/getTheme" }),
  },
  methods: {
    ...mapActions("auth", ["signInAction"]),
    async signIn() {
      this.error = null;
      await this.signInAction({
        email: this.email,
        password: this.password,
      })
        .then(() => {
          if (this.notificationMessage) {
            return;
          }
          this.$router.replace("dashboard");
        })
        .catch((error) => {
          console.log(error);
          // this.error = error.message;
        });
    },
  },
};
</script>
