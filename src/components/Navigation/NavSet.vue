<template>
  <section v-if="user"
    class="w-full flex justify-around items-center h-16 rounded-none border-none fixed bottom-0 z-10 rounded-t-lg bg-white dark:bg-gray-900">
    <span v-for="(link, index) in links" :key="index" @click="isOpen = false" :class="
        $route.path === link.path
          ? 'opacity-100 shadow-lg text-accent text-xl border border-light-blue-300'
          : 'text-primary shadow-none opacity-50'
      " class="flex justify-center items-center mx-auto rounded-lg p-2">
      <router-link :to="link.path" class="flex justify-center text-primary items-center text-xl" v-if="user">
        <icon-base :icon-name="link.iconName">
          <component class="flex justify-center items-center" v-bind:is="link.component" />
        </icon-base>
      </router-link>{{ $route.path === link.path ? link.name : "" }}
    </span>
  </section>
</template>

<script>
  import IconBase from "@/components/IconBase.vue";
  import IconHome from "@/components/icons/IconHome.vue";
  // import IconCalendar from "@/components/icons/IconCalendar.vue";
  import IconData from "@/components/icons/IconData.vue";
  import IconTime from "@/components/icons/IconTime.vue";
  import IconContact from "@/components/icons/IconContact.vue";
  import IconProfile from "@/components/icons/IconProfile.vue";

  export default {
    name: "Footer",
    components: {
      IconBase,
      IconTime,
      // IconCalendar,
      IconData,
      IconHome,
      IconContact,
      IconProfile,
    },
    data() {
      return {
        isOpen: false,
        links: [
          {
            iconName: "home",
            component: IconHome,
            path: "/",
            name: "Inicio",
          },
          // {
          //   iconName: "calendar",
          //   component: IconCalendar,
          //   path: "/calendar",
          //   name: "Calendar",
          // },
          {
            iconName: "time",
            component: IconTime,
            path: "/dashboard",
            name: "Asistencia",
          },
          {
            iconName: "data",
            component: IconData,
            path: "/datos",
            name: "Datos",
          },
          {
            iconName: "contact",
            component: IconContact,
            path: "/contact",
            name: "Contacto",
          },
        ],
      };
    },
    computed: {
      user() {
        return this.$store.getters["auth/getUser"];
      },
    },
  };
</script>

<style lang="scss" scoped></style>