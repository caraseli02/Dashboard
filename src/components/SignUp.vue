<template>
  <div class="min-h-screen bg-white flex flex-col">
    <div
      class="flex-1 flex flex-col md:flex-row justify-center pb-12 md:px-16 p-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <img
        class="h-full w-full md:w-2/3 contain z-0"
        src="@/assets/img/asistSvg.svg"
        alt=""
      />
      <div
        class="mx-auto w-full max-w-sm flex-1 z-10 transform -translate-y-20 md:translate-y-0 bg-gradient-to-b from-white to-transparent self-center"
      >
        <div>
          <h2 class="text-3xl leading-9 font-extrabold text-gray-900">
            Registrate
          </h2>
          <p class="mt-2 text-sm leading-5 text-gray-600 max-w">
            Para usar,
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              crea un cuenta.
            </a>
          </p>
        </div>
        <transition name="fade">
          <p
            class="bg-red-100 p-5 my-5 border border-red-200 rounded text-red-500"
            v-if="error"
          >
            {{ error }}
          </p>
        </transition>
        <div class="mt-8">
          <div class="mt-6">
            <form @submit.prevent>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Email
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    type="email"
                    placeholder="apimosa@apimosa.com"
                    v-model="email"
                    id="email"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div class="mt-6">
                <label
                  for="password"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Contraseña
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    type="password"
                    v-model="password"
                    id="password"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div class="mt-6">
                <label
                  for="password"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Repita Contraseña
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    type="password"
                    v-model="passwordRepeat"
                    id="passwordRepeat"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div class="mt-6">
                <span class="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    @click.prevent="validate"
                    class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Confirmar
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="@/assets/img/asistSvg.svg"
        alt=""
      />
    </div> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: null,
      password: null,
      passwordRepeat: null,
      error: null,
    };
  },
  methods: {
    ...mapActions("auth", ["signUpAction"]),
    validate() {
      this.error = null;

      if (!(this.password === this.passwordRepeat)) {
        this.error = "Las contraseñas no son iguales";
      }

      // when valid then sign in
      if (this.error === null) {
        this.signUp();
      }
    },
    async signUp() {
      await this.signUpAction({
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.$router.replace("dashboard");
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
  },
};
</script>
