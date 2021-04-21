<template>
  <div
    class="flex lg:flex-col items-center justify-center h-full space-x-4 lg:space-x-0 lg:space-y-4 py-2 lg:py-4 lg:rouded-xl">
    <router-link to="/dashboard" class="group">
      <div :class="
          $route.path === '/dashboard'
            ? 'transform -translate-y-8 lg:-translate-y-0 lg:translate-x-8 duration-300'
            : 'opacity-50'
        "
        class="flex justify-center items-center w-10 h-10 lg:w-14 lg:h-14 rounded-xl bg-secondary text-primary transform shadow-xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
          <path
            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </div>
    </router-link>
    <router-link to="/table" class="group">
      <div :class="
          $route.path === '/table'
            ? 'transform -translate-y-8 lg:-translate-y-0 lg:translate-x-8 duration-300'
            : 'opacity-50'
        "
        class="flex justify-center items-center w-10 h-10 lg:w-14 lg:h-14 rounded-xl bg-secondary text-primary transform shadow-xl">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      </div>
    </router-link>
    <router-link to="/users" class="group">
      <div :class="
          $route.path === '/users'
            ? 'transform -translate-y-8 lg:-translate-y-0 lg:translate-x-8 duration-300'
            : 'opacity-50'
        "
        class="flex justify-center items-center w-10 h-10 lg:w-14 lg:h-14 rounded-xl bg-secondary text-primary transform shadow-xl">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58A2.01 2.01 0 000 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0020 14c-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z">
          </path>
        </svg>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "MainNav",
    data() {
      return {
        isOpen: false,
        links: [
          {
            path: "/",
            name: "dashboard",
          },
        ],
      };
    },
  };
</script>