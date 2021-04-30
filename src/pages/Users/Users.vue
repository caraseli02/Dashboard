<template>
  <section class="mx-4">
    <div
      v-if="filtredWorkers && filtredStaff"
      class="flex justify-around items-center"
    >
      <infoCard
        class="transition duration-500 ease-in-out hover:bg-primary transform hover:-translate-y-1 hover:scale-110"
        :class="
          selectedUsers === filtredWorkers
            ? 'bg-primary transform -translate-y-1 scale-110 border boder-2 border-white'
            : ''
        "
        @click.native="usersSelect(filtredWorkers)"
      >
        <template v-slot:svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="text-secondary w-8 h-8 mx-auto"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
        </template>
        <template v-slot:name
          ><span class="block uppercase text-sm tracking-wider text-secondary"
            >Operarios</span
          ></template
        >
        <template v-slot:number
          ><span class="text-2xl lg:text-2xl font-semibold text-primary">{{
            filtredWorkers.length
          }}</span></template
        >
      </infoCard>
      <infoCard
        class="transition duration-500 ease-in-out hover:bg-primary transform hover:-translate-y-1 hover:scale-110"
        :class="
          selectedUsers === filtredStaff
            ? 'bg-primary transform -translate-y-1 scale-110 border boder-2 border-white'
            : ''
        "
        @click.native="usersSelect(filtredStaff)"
      >
        <template v-slot:svg>
          <svg
            width="32px"
            height="32px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="text-secondary w-8 h-8 mx-auto"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm13.1-8.16c.01-.11.02-.22.02-.34 0-.12-.01-.23-.03-.34l.74-.58c.07-.05.08-.15.04-.22l-.7-1.21c-.04-.08-.14-.1-.21-.08l-.86.35c-.18-.14-.38-.25-.59-.34l-.13-.93A.182.182 0 0020.2 3h-1.4c-.09 0-.16.06-.17.15l-.13.93c-.21.09-.41.21-.59.34l-.87-.35c-.08-.03-.17 0-.21.08l-.7 1.21c-.04.08-.03.17.04.22l.74.58a1.953 1.953 0 000 .68l-.74.58c-.07.05-.08.15-.04.22l.7 1.21c.04.08.14.1.21.08l.87-.35c.18.14.38.25.59.34l.13.93c.01.09.08.15.17.15h1.4c.09 0 .16-.06.17-.15l.13-.93c.21-.09.41-.21.59-.34l.87.35c.08.03.17 0 .21-.08l.7-1.21c.04-.08.03-.17-.04-.22l-.73-.58zm-2.6.91a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm.42 3.93l-.5-.87c-.03-.06-.1-.08-.15-.06l-.62.25c-.13-.1-.27-.18-.42-.24l-.09-.66A.15.15 0 0018 10h-1c-.06 0-.11.04-.12.11l-.09.66c-.15.06-.29.15-.42.24l-.62-.25c-.06-.02-.12 0-.15.06l-.5.87c-.03.06-.02.12.03.16l.53.41c-.01.08-.02.16-.02.24 0 .08.01.17.02.24l-.53.41c-.05.04-.06.11-.03.16l.5.87c.03.06.1.08.15.06l.62-.25c.13.1.27.18.42.24l.09.66c.01.07.06.11.12.11h1c.06 0 .12-.04.12-.11l.09-.66c.15-.06.29-.15.42-.24l.62.25c.06.02.12 0 .15-.06l.5-.87c.03-.06.02-.12-.03-.16l-.52-.41c.01-.08.02-.16.02-.24 0-.08-.01-.17-.02-.24l.53-.41c.05-.04.06-.11.04-.17zm-2.42 1.65c-.46 0-.83-.38-.83-.83 0-.46.38-.83.83-.83s.83.38.83.83c0 .46-.37.83-.83.83zM4.74 9h8.53c.27 0 .49-.22.49-.49v-.02a.49.49 0 00-.49-.49H13c0-1.48-.81-2.75-2-3.45v.95c0 .28-.22.5-.5.5s-.5-.22-.5-.5V4.14C9.68 4.06 9.35 4 9 4s-.68.06-1 .14V5.5c0 .28-.22.5-.5.5S7 5.78 7 5.5v-.95C5.81 5.25 5 6.52 5 8h-.26a.49.49 0 00-.49.49v.03c0 .26.22.48.49.48zM9 13c1.86 0 3.41-1.28 3.86-3H5.14c.45 1.72 2 3 3.86 3z"
            ></path>
          </svg>
        </template>
        <template v-slot:name
          ><span class="block uppercase text-sm tracking-wider text-secondary"
            >Tecnicos</span
          ></template
        >
        <template v-slot:number
          ><span class="text-2xl lg:text-2xl font-semibold text-primary">{{
            filtredStaff.length
          }}</span></template
        >
      </infoCard>
    </div>

    <ul
      v-if="selectedUsers"
      class="grid grid-flow-col auto-cols-max py-4 overflow-y-scroll mt-2"
    >
      <li
        @click="selectedUser = user"
        v-for="user in selectedUsers"
        :key="user.author"
        class="w-24 h-24 text-center flex flex-col justify-center items-center mr-2 text-primary transition duration-500 ease-in-out hover:bg- transform hover:-translate-y-1 hover:scale-105"
        :class="
          selectedUser === user
            ? 'bg-secondary border boder-2 transform -translate-y-1 rounded-lg scale-105'
            : `glass-${theme}`
        "
      >
        {{ user.name ? user.name.split(" ")[0] : "" }} <br />
        <span class="text-sm">
          {{ user.surname ? user.surname.split(" ")[0] : "" }}
        </span>
      </li>
    </ul>
    <form
      v-if="selectedUser"
      :class="`glass-${theme} `"
      class="p-2 lg:p-4 max-w-md mx-auto sm:mt-8 relative sm:grid sm:grid-cols-2 sm:gap-4 sm:pt-4"
      @submit.prevent="
        changeUserData({
          id: docRef,
          eatHour: eatHour,
          schedule: schedule,
          workplace: workplace,
        })
      "
    >
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="text-primary absolute right-0 top-0 mr-3 mt-3"
        :class="makeEditable ? 'text-secondary' : ''"
        @click="makeEditable = !makeEditable"
      >
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path
          v-if="makeEditable"
          d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
        ></path>
        <path
          v-else
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        ></path>
      </svg>
      <div class="mt-6 sm:mt-3">
        <label
          class="block text-sm font-medium md:text-lg leading-5 text-secondary"
        >
          Nombre
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <input
            disabled
            :value="selectedUser.name"
            type="text"
            required
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
      </div>
      <div class="mt-3">
        <label
          class="block text-sm font-medium md:text-lg leading-5 text-secondary"
        >
          Apellido
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <input
            disabled
            :value="selectedUser.surname"
            type="text"
            required
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
      </div>
      <div class="mt-3">
        <label
          class="block text-sm font-medium md:text-lg leading-5 text-secondary"
        >
          Email
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <input
            disabled
            :value="selectedUser.email"
            type="text"
            required
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
      </div>
      <div class="mt-3">
        <label
          class="block text-sm font-medium md:text-lg leading-5 text-secondary"
        >
          Hora para comer
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <select
            class="block appearance-none w-full bg-primary border border-gray-200 text-secondary px-3 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="eatHour"
            :disabled="!makeEditable"
          >
            <option value="True">Si</option>
            <option value="False">No</option>
          </select>
        </div>
      </div>
      <div class="mt-3">
        <label
          class="block text-sm font-medium md:text-lg leading-5 text-secondary"
        >
          Jornada de Trabajo
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <input
            v-model="schedule"
            :disabled="!makeEditable"
            type="text"
            required
            class="appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            :class="
              makeEditable
                ? 'border-2 border-red-300'
                : 'border border-gray-300'
            "
          />
        </div>
      </div>
      <div class="mt-3 relative">
        <label
          class="block md:text-lg capitalize tracking-wide text-secondary text-xs"
          for="grid-state"
        >
          Centro de Trabajo
        </label>
        <div class="mt-1 rounded-md shadow-sm">
          <select
            v-model="workplace"
            :disabled="!makeEditable"
            required
            class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          >
            <option value="Palma">Palma de Mallorca</option>
            <option value="Sevilla">Sevilla</option>
            <option value="Valencia">Valencia</option>
            <option value="Malaga">Malaga</option>
            <option value="Tenerife">Tenerife</option>
            <option value="Ibiza">Ibiza</option>
          </select>
        </div>
      </div>
      <div class="mt-6 lg:mt-3">
        <span class="block w-full rounded-md shadow-sm">
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium md:text-lg rounded-md text-primary bg-secondary hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase"
          >
            Cambiar
          </button>
        </span>
      </div>
    </form>
  </section>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import infoCard from "@/pages/Admin/infoCard.vue";
export default {
  name: "Users",
  data() {
    return {
      makeEditable: false,
      selectedUser: null,
      eatHour: null,
      schedule: null,
      workplace: null,
      docRef: null,
      selectedUsers: "",
    };
  },
  components: {
    infoCard,
  },
  watch: {
    selectedUser: function (newValue) {
      if (newValue != null) {
        this.eatHour = newValue.eatHour;
        this.schedule = newValue.schedule;
        this.docRef = newValue.author;
      }
    },
    filtredWorkers: function (newValue) {
      if (newValue != null) {
        this.selectedUsers = newValue;
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
    ...mapGetters({ theme: "theme/getTheme" }, "filtredUsers"),
    ...mapGetters(["filtredWorkers", "filtredStaff"]),
  },
  methods: {
    ...mapActions([
      "getAsist",
      "getUsers",
      "changeUserData",
      "filtredWorkersLenght",
      "filtredStaffLenght",
    ]),
    speakerInitials(speaker) {
      const name = speaker.split(" ");
      return `${name[0].charAt(0)}${
        name[1] ? name[1].charAt(0).toUpperCase() : ""
      }`;
    },
    usersSelect(val) {
      this.selectedUsers = val;
      this.selectedUser = null;
    },
  },
  async mounted() {},
};
</script>
<style lang="">
</style>