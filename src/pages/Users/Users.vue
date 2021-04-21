<template>
  <section>
    <ul class="grid grid-flow-col auto-cols-max py-2 overflow-y-scroll mt-2">
      <li @click="selectedUser = user" v-for="user in filtredUsers" :key="user.author"
        class="w-24 h-24 text-center flex flex-col justify-center items-center ml-2 text-primary"
        :class="selectedUser === user ? 'glass-blue' : `glass-${theme}`">
        {{ user.name ? user.name.split(" ")[0] : "" }} <br />
        <span class="text-sm">
          {{ user.surname ? user.surname.split(" ")[0] : "" }}
        </span>
      </li>
    </ul>
    <form v-if="selectedUser" :class="`glass-${theme} mx-2 p-2 max-w-md mx-auto sm:mt-8 relative`" @submit.prevent="
        changeUserData({
          id: docRef,
          eatHour: eatHour,
          schedule: schedule,
        })
      ">
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        class="text-primary absolute right-0 top-0 mr-3 mt-3" :class="makeEditable ? 'text-secondary' : ''"
        @click="makeEditable = !makeEditable">
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path v-if="makeEditable"
          d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z">
        </path>
        <path v-else
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">
        </path>
      </svg>
      <div class="mt-6">
        <label class="block text-sm font-medium leading-5 text-secondary">
          Nombre
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <input disabled :value="selectedUser.name" type="text" required
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
        </div>
      </div>
      <div class="mt-3">
        <label class="block text-sm font-medium leading-5 text-secondary">
          Apellido
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <input disabled :value="selectedUser.surname" type="text" required
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
        </div>
      </div>
      <div class="mt-3">
        <label class="block text-sm font-medium leading-5 text-secondary">
          Email
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <input disabled :value="selectedUser.email" type="text" required
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
        </div>
      </div>
      <div class="mt-3">
        <label class="block text-sm font-medium leading-5 text-secondary">
          Hora para comer
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <select
            class="block appearance-none w-full bg-primary border border-gray-200 text-secondary py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="eatHour" :disabled="!makeEditable">
            <option value="True">Si</option>
            <option value="False">No</option>
          </select>
        </div>
      </div>
      <div class="mt-3">
        <label class="block text-sm font-medium leading-5 text-secondary">
          jornada de trabajo
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <input v-model="schedule" :disabled="!makeEditable" type="text" required
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
        </div>
      </div>
      <div class="relative">
        <label class="block mb-2 capitalize tracking-wide text-secondary text-xs mt-4" for="grid-state">
          Centro de Trabajo
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <input disabled :value="selectedUser.workplace" type="text" required
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
        </div>
      </div>
      <div class="mt-6">
        <span class="block w-full rounded-md shadow-sm">
          <button type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary bg-secondary hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase">
            Cambiar
          </button>
        </span>
      </div>
    </form>
  </section>
</template>
<script>
  import { mapState, mapGetters, mapActions } from "vuex";
  export default {
    name: "Users",
    data() {
      return {
        makeEditable: false,
        selectedUser: null,
        eatHour: null,
        schedule: null,
        docRef: null,
      };
    },
    watch: {
      selectedUser: function (newValue) {
        if (newValue != null) {
          this.eatHour = newValue.eatHour;
          this.schedule = newValue.schedule;
          this.docRef = newValue.author;
        }
      },
    },
    computed: {
      // mix this into the outer object with the object spread operator
      ...mapState({
        attendList: (state) => state.attendance,
        users: (state) => state.users,
      }),
      ...mapState("auth", ["user"]),
      ...mapState(["userData"]),
      ...mapGetters({ theme: "theme/getTheme" }),
      filtredUsers: function () {
        return this.users.filter(
          (user) =>
            !/@apimosa\.es$/.test(user.email) &&
            !/vladwebapp@gmail\.com$/.test(user.email)
        );
      },
    },
    methods: {
      ...mapActions(["getAsist", "getUsers", "changeUserData"]),
      speakerInitials(speaker) {
        const name = speaker.split(" ");
        return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0).toUpperCase() : ""
          }`;
      },
    },
    async mounted() {
    },
  };
</script>
<style lang="">
</style>