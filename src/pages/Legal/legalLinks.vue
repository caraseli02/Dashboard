<template lang="">
  <div class="flex flex-wrap justify-start items-start pt-4 ml-2">
    <router-link
      v-for="(link, index) in links"
      :key="index"
      :to="link.url"
      class="inline-flex px-2 py-1 text-blue-600 hover:text-blue-700 focus:text-blue-700 hover:bg-blue-100 focus:bg-blue-100 border border-blue-600 rounded-md mb-1"
    >
      <!-- <i :class="`${link.icon} text-6xl text-white`"></i> -->
      <div class="flex flex-col justify-start items-center">
        <span class="font-medium">{{ link.text }}</span>
      </div>
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      links: [
        { url: "/aviso-legal", text: "Aviso Legal" },
        { url: "/politica-de-cookies", text: "Política de cookies" },
        {
          url: "/politica-privacidad",
          text: "Política de privacidad",
        },
        {
          url: "/terminos-y-condiciones",
          text: "Términos y condiciones",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({ theme: "theme/getTheme" }),
  },
};
</script>
<style lang=""></style>
