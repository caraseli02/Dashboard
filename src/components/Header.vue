<template>
  <header class="px-1 md:px-4 py-2 bg-gray-200 border-b">
    <div class="mx-auto flex justify-center items-center">
      <nav class="flex items-center justify-between md:justify-between w-full">
        <section class="flex justify-start items-center">
          <router-link to="/" class="mr-4 py-2 px-2">
            <icon-base icon-name="home"><icon-home /></icon-base>
          </router-link>
          <router-link
            to="sign-in"
            class="mr-4 p-3 text-lg border-solid border-b-1 border-green-400 flex justify-center"
            v-if="!user && $route.path !== '/sign-in'"
            >Entrar</router-link
          >
          <router-link
            to="sign-up"
            class="mr-4 p-3 text-lg border-b-1 border-green-400"
            v-if="!user && $route.path !== '/sign-up'"
            >Registrate</router-link
          >
          <!-- Side Bar -->
          <sidebar v-if="user" />
        </section>
        <button
          @click="signOut"
          class="bg-white hover:bg-red-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          v-if="user"
        >
          Salir
        </button>
      </nav>
      <!-- <h2 v-if="user">{{ user.email }}</h2> -->
    </div>
  </header>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";
import Sidebar from "./Sidebar.vue";
import IconBase from "./IconBase.vue";
import IconHome from "./icons/IconHome.vue";

export default {
  components: { Sidebar, IconBase, IconHome },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("sign-in");
        });
    },
  },
};
</script>
