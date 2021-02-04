<template>
  <div class="min-h-screen bg-transparent flex flex-col">
    <div
      class="flex-1 flex flex-col md:flex-row justify-center pb-12 md:px-16 p-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <img
        class="h-full w-full md:w-2/3 contain z-0"
        src="@/assets/img/asistSvg.svg"
        alt=""
      />
      <div
        class="mx-auto w-full max-w-sm flex-1 z-10 transform -translate-y-20 glass-light p-2 flex justify-center items-center flex-col"
      >
        <div>
          <h2 class="text-3xl leading-9 font-extrabold text-gray-900">
            APIMOSA APP
          </h2>
        </div>
        <!-- <transition name="fade">
          <p
            class="bg-red-100 p-5 my-5 border border-red-200 rounded text-red-500"
            v-if="error"
          >
            {{ error }}
            <button
              @click="error = null"
              class="w-full flex justify-center py-2 px-4 border mt-4 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Cerrar
            </button>
          </p>
        </transition> -->
        <div class="mt-8">
          <div>
            <form @submit.prevent="validate">
              <div v-for="(field, index) in inputs" :key="index" class="mt-6">
                <label
                  for="password"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  {{ field.id }}
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    :placeholder="field.placeholder"
                    :type="field.type"
                    v-model="field.model"
                    :id="field.id"
                    :pattern="field.pattern"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div class="mt-6">
                <span class="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase"
                  >
                    Crear cuenta
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
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      inputs: [
        {
          type: "email",
          placeholder: "apimosa@apimosa.es",
          model: "",
          id: "Email",
          pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
        },
        {
          type: "password",
          placeholder: "Contraseña",
          model: "",
          id: "Contraseña",
        },
        {
          type: "password",
          placeholder: "Repetir contraseña",
          model: "",
          id: "Repetir contraseña",
        },
        {
          type: "text",
          placeholder: "Nombre",
          model: "",
          id: "Nombre",
        },
        {
          type: "text",
          placeholder: "DNI/NIE",
          model: "",
          id: "DNI/NIE",
        },
      ],
      error: null,
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters("notifi", ["notificationMessage"]),
  },
  methods: {
    ...mapActions("auth", ["signUpAction"]),
    ...mapActions("notifi", ["showNotification"]),

    async validate() {
      this.error = null;
      let data = this.inputs.map(input => input.model);

      if (!(data[1] === data[2])) {
        this.$store.commit("notifi/SET_NOTIFICATION", {
          notificationMessage: "Las contraseñas no son iguales",
          notificationType: "error",
        });
        this.error = true;
        return;
      }

      // when valid then sign in
      if (this.error === null) {
        await this.signUpAction({
          email: data[0],
          password: data[1],
          name: data[3],
          dni: data[4],
        }).then(() => {
          if (this.notificationMessage) {
            return;
          }
          this.$router.replace("dashboard");
        });
      }
    },
  },
};
</script>
