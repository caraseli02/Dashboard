<template>
  <header class="rounded-none pb-1 pt-2">
    <div class="mx-auto flex justify-center items-center">
      <nav class="flex items-center justify-between md:justify-between w-full">
        <!-- PROFILE ICON FOR OPEN/CLOSE SIDEBAR -->
        <div v-if="user" @click="toggleSidebar" class="flex items-center ml-2">
          <button class="flex justify-center items-center p-3 rounded-lg"
            :class="showSidebar ? 'bg-gray-300' : 'text-primary bg-primary'" aria-label="Open Menu">
            <icon-base icon-name="profile">
              <icon-profile />
            </icon-base>
          </button>
        </div>
        <!-- Home, Sing-In Sign-Up Btn -->
        <section class="flex justify-between items-center">
          <span v-for="link in links" :key="link.name">
            <router-link :to="link.to" class="ml-2 flex justify-center items-center p-2 rounded-lg text-primary bg-primary"
              v-if="!user && $route.path !== link.to">{{ link.name }}
            </router-link>
          </span>
          <!-- Side Bar -->
        </section>
        <!-- LOGOUT, ThemeToggler Btn -->
        <div class="flex justify-end items-center w-40">
          <ThemeToggler class="mr-10" />
          <button @click="closeSession" class="flex justify-center items-center p-3 rounded-lg text-primary bg-primary mr-2"
            v-if="user">
            Salir
            <icon-base icon-name="arrowRight">
              <icon-arrowRight />
            </icon-base>
          </button>
        </div>

      </nav>
    </div>
  </header>
</template>

<script>
  import IconBase from "@/components/IconBase.vue";
  // import IconMaps from "./icons/IconMaps.vue";
  import IconProfile from "@/components/icons/IconProfile.vue";
  import IconArrowRight from "@/components/icons/IconArrowRight.vue";
  import ThemeToggler from "@/components/utils/ThemeToggler.vue";
  import { mapGetters, mapActions, mapState } from "vuex";

  export default {
    data() {
      return {
        links: [
          {
            name: "Inicio",
            to: "/",
          },
          {
            name: "Entrar",
            to: "/sign-in",
          },
          {
            name: "Registrate",
            to: "/sign-up",
          },
        ],
      };
    },
    components: { IconBase, IconArrowRight, IconProfile, ThemeToggler },
    computed: {
      ...mapGetters("auth", ["getUser"]),
      ...mapState({
        showSidebar: state => state.showSidebar,
        loadingMap: state => state.loadingMap,
      }),
      user() {
        return this.$store.getters["auth/getUser"];
      },
    },
    methods: {
      ...mapActions(["toggleSidebar"]),
      ...mapActions("auth", ["signOut"]),
      async closeSession() {
        await this.signOut().then(() => this.$router.replace("sign-in"));
      },
    },
  };
</script>