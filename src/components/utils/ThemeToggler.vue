<template>
  <div id="page" v-bind:class="{ 'theme-dark': nightMode }">
    <input type="checkbox" id="theme-toggle" v-model="nightMode" />
    <label @click="toggleTheme" for="theme-toggle"><span></span></label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nightMode: localStorage.getItem("theme") === "dark",
    };
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch("theme/toggleTheme");
    },
  },
};
</script>

<style>
:root {
  --toggle-size: 4rem;
  --switch-w: 1.5em;
  --switch-h: 0.75em;
  --switch-handle-scale: 0.55;
  --switch-off-handle-x: -0.08em;
  --switch-on-handle-x: calc(100% - 0.08em);
  --switch-transition-duration: 0.12s;
}

#page {
  background: #dee6ed;
}
#page.theme-dark {
  background: #090d11;
}

#theme-toggle {
  display: none;
}
#theme-toggle + label {
  font-size: var(--toggle-size);
  display: flex;
  height: var(--switch-h);
  width: var(--switch-w);
  border-radius: calc(var(--switch-h) / 2);
  background-size: auto 8em;
  background-position: bottom;
  background-image: linear-gradient(
    180deg,
    #021037 0%,
    #20206a 19%,
    #4184b1 66%,
    #62e7f7 100%
  );
  transition: var(--switch-transition-duration);
  border: 0.05em solid #eef3f6;
  overflow: hidden;
}
#theme-toggle + label span {
  background: #fffad8;
  border-radius: 50%;
  height: var(--switch-h);
  width: var(--switch-h);
  transform: translateX(var(--switch-off-handle-x))
    scale(var(--switch-handle-scale));
  transition: var(--switch-transition-duration);
  cursor: pointer;
  box-shadow: 0 0 0.25em 0.0625em #fbee8d, 0 0 2em 0 #ffeb3b,
    inset -0.25em -0.25em 0 0 #fbee8e,
    inset -0.3125em -0.3125em 0 0.625em #fff5b2;
  margin-top: var(--switch-off-handle-x);
}
#theme-toggle:checked {
  font-size: var(--switch-font-size);
}
#theme-toggle:checked + label {
  background-position: top;
  border-color: #5983a6;
}
#theme-toggle:checked + label span {
  background: transparent;
  transform: translateX(var(--switch-on-handle-x))
    scale(var(--switch-handle-scale));
  box-shadow: inset -0.1875em -0.1875em 0 0 #fbe7ef,
    inset -0.5625em -0.5625em 0 0 #fffff7;
}

#page {
  height: 5.5vh;
  width: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
}
</style>