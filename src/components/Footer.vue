<template>
  <footer
    class="w-full flex justify-around items-center h-20 rounded-none border-none fixed bottom-0 z-10 rounded-t-lg glass-light"
  >
    <span
      v-for="(link, index) in links"
      :key="index"
      @click="isOpen = false"
      :class="
        $route.path === link.path
          ? 'opacity-100 bg-gray-200'
          : 'opacity-75 shadow-lg'
      "
      class="flex justify-center items-center mx-auto rounded-lg p-2"
    >
      <router-link
        :to="link.path"
        class="flex justify-center text-gray-900 items-center text-xl"
        v-if="user"
      >
        <icon-base :icon-name="link.iconName">
          <component
            class="flex justify-center items-center"
            v-bind:is="link.component"
          />
        </icon-base> </router-link
      >{{ $route.path === link.path ? link.name : "" }}
    </span>
  </footer>
</template>

<script>
import IconBase from "./IconBase.vue";
import IconHome from "./icons/IconHome.vue";
import IconCalendar from "./icons/IconCalendar.vue";
import IconData from "./icons/IconData.vue";
import IconTime from "./icons/IconTime.vue";
import IconContact from "./icons/IconContact.vue";
import IconProfile from "./icons/IconProfile.vue";

export default {
  name: "Footer",
  components: {
    IconBase,
    IconTime,
    IconCalendar,
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
        {
          iconName: "time",
          component: IconTime,
          path: "/dashboard",
          name: "Asistencia",
        },
        {
          iconName: "calendar",
          component: IconCalendar,
          path: "/calendar",
          name: "Calendar",
        },
        {
          iconName: "data",
          component: IconData,
          path: "/data",
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
