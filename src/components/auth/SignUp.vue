<template>
  <div class="min-h-screen bg-transparent flex flex-col">
    <div
      class="flex-1 flex flex-col md:flex-row justify-center pb-12 md:px-16 p-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <!-- <img
        class="h-full w-full md:w-2/3 contain z-0"
        src="@/assets/img/asistSvg.svg"
        alt=""
      /> -->
      <div
        :class="`mx-auto w-full max-w-sm flex-1 z-10 transform glass-${theme} p-2 flex justify-center items-center flex-col`"
      >
        <div>
          <h2 class="text-3xl leading-9 font-extrabold text-primary">
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
              class="w-full flex justify-center py-2 px-4 border mt-4 border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
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
                  :for="field.id"
                  class="block text-sm font-medium leading-5 text-secondary"
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
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div class="relative">
                <label
                  class="block mb-2 uppercase tracking-wide text-secondary text-xs  mt-4"
                  for="grid-state"
                >
                  Centro de Trabajo
                </label>
                <select
                  class="block appearance-none w-full bg-primary border border-gray-200 text-secondary py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  v-model="workplace"
                  id="grid-state"
                >
                  <option value="Palma">Palma de Mallorca</option>
                  <option value="Sevilla">Sevilla</option>
                  <option value="Valencia">Valencia</option>
                  <option value="Malaga">Malaga</option>
                  <option value="Tenerife">Tenerife</option>
                  <option value="Ibiza">Ibiza</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-secondary"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="mt-6">
                <span class="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary bg-secondary hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase"
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
      workplace: null,
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
          placeholder: "Apellido",
          model: "",
          id: "Apellido",
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
    ...mapGetters({ theme: "theme/getTheme" }),
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
          surname: data[4],
          dni: data[5],
          workplace: this.workplace,
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
