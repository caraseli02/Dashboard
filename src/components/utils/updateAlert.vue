<template>
  <div class="alert-banner w-full h-screen fixed top-0 z-50">
    <input type="checkbox" class="hidden" id="banneralert" />

    <label
      class="close cursor-pointer flex items-center justify-between w-full p-6 bg-red-700 shadow text-white"
      title="close"
      for="banneralert"
    >
      Instalar version reciente?
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "updateAlert",
};
</script>

<style>
.alert-banner {
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  background-color: rgba(0, 0, 0, 0.4);
}

/*Banner close animation*/
.alert-banner input:checked ~ * {
  -webkit-animation: slide-out-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
    both;
  animation: slide-out-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}
</style>
