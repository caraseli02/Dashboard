<template>
  <article class="max-h-screen flex flex-col justify-aroud items-center">
    <h1 class="text-center mb-4 font-bold text-primary text-2xl">
      APIMOSA APP
    </h1>
    <h2 class="text-center mb-4 text-secondary text-lg">
      Registra tu jornada laboral en un momento.
    </h2>
    <article class="flex flex-col justify-around items-center w-full">
      <section
        v-if="getUser"
        class="flex flex-col justify-between items-center py-8"
      >
        <router-link
          v-for="(link, index) in buttons"
          :key="index"
          :to="link.path"
          class="shadow-lg text-primary bg-secondary w-full mx-8 h-24 text-lg flex flex-col justify-center items-center mb-4 py-2 rounded-lg"
        >
          <icon-base :width="50" :height="50" :icon-name="link.iconName">
            <component
              class="flex justify-center items-center"
              v-bind:is="link.component"
            />
          </icon-base>
          {{ link.text }}
        </router-link>
      </section>
      <section v-else class="flex flex-col justify-between items-center py-8">
        <router-link
          v-for="link in links"
          :key="link.iconName"
          :to="link.path"
          class="shadow-lg bg-gray-100 w-full mx-8 h-20 text-lg flex flex-col justify-center items-center mb-4 rounded-lg"
        >
          <icon-base :width="50" :height="50" :icon-name="link.iconName">
            <component
              class="flex justify-center items-center"
              v-bind:is="link.component"
            />
          </icon-base>
          {{ link.text }}
        </router-link>
      </section>
    </article>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import IconBase from "@/components/IconBase.vue";
// import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconData from "@/components/icons/IconData.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconContact from "@/components/icons/IconContact.vue";
import IconProfile from "@/components/icons/IconProfile.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";
export default {
  props: {},
  name: "Home",
  data() {
    return {
      buttons: [
        {
          text: "Apuntar Entradas/Salidas",
          path: "/dashboard",
          iconName: "time",
          component: IconTime,
        },
        // {
        //   text: "Apuntar Para Otro Dia",
        //   path: "/calendar",
        //   iconName: "calendar",
        //   component: IconCalendar,
        // },
        {
          text: "Mirar Entradas/Salidas",
          path: "/datos",
          iconName: "data",
          component: IconData,
        },
      ],
      links: [
        {
          text: "Inicia sesión",
          path: "/sign-in",
          iconName: "profile",
          component: IconProfile,
        },
        {
          text: "Regístrate",
          path: "/sign-up",
          iconName: "arrowRight",
          component: IconArrowRight,
        },
      ],
    };
  },
  components: {
    IconBase,
    IconTime,
    // IconCalendar,
    IconData,
    IconContact,
    IconProfile,
    IconArrowRight,
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters("auth", ["getUser"]),
  },
};
</script>
