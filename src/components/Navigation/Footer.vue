<template>
  <footer>
    <nav-set />
    <legalLinks v-if="!user" />
  </footer>
</template>

<script>
import NavSet from "./NavSet.vue";
import legalLinks from "@/pages/Legal/legalLinks";

export default {
  name: "Footer",
  components: {
    NavSet,
    legalLinks,
  },
  computed: {
    user() {
      return this.$store.getters["auth/getUser"];
    },
  },
};
</script>

<style lang="scss" scoped></style>
