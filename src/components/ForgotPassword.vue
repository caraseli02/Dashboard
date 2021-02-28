<template>
  <section
    :class="`glass-${theme} mt-2 p-2 flex justify-center items-center flex-col`"
  >
    <h1
      class="text-center mb-4 mx-8 glass-${theme} text-xs text-primary font-bold"
    >
      SI HAS OLVIDADO TU CONTRASEÑA, PROPORCIONA TU DIRECCIÓN DE CORREO
      ELECTRÓNICO Y TE ENVIAREMOS UN EMAIL CON INSTRUCCIONES DE CÓMO
      RECUPERARLA.
    </h1>
    <article class="md:w-1/3 p-5 border rounded bg-primary mx-auto">
      <transition name="fade">
        <p
          class="bg-red-100 p-5 my-5 border border-red-200 rounded text-red-500"
          v-if="error"
        >
          {{ error }}
        </p>
      </transition>
      <form @submit.prevent>
        <div class="mb-4">
          <label for="email" class="font-bold text-secondary pb-1">Email</label>
          <input
            type="email"
            placeholder="apimosa@apimosa.es"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
            v-model="email"
            id="emailForgot"
            class="px-4 py-2 border rounded w-full"
            required
          />
        </div>
        <div class="mb-4">
          <button
            type="submit"
            @click="sendEmail"
            class="bg-secondary px-4 py-2 rounded text-primary border border-blue-600 transition duration-500 ease-in-out hover:bg-blue-600"
          >
            <transition name="fade" mode="out-in">
              <span v-if="!emailSending">Enviar</span>
              <span v-else>Sending...</span>
            </transition>
          </button>
        </div>
      </form>
    </article>
    <slot></slot>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      error: null,
      emailSending: false,
    };
  },
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
  methods: {
    sendEmail() {
      console.log(this.email);
      if (!this.email) {
        this.error = "Please type in a valid email address.";
        return;
      }
      this.error = null;
      this.emailSending = true;
      this.$store
        .dispatch("auth/resetPassword", this.email)
        .then(() => {
          this.emailSending = false;
          this.$emit("closePopUp", false);
          this.$alert("Enviando");
        })
        .catch((error) => {
          this.emailSending = false;
          this.error = error.message;
        });
    },
  },
};
</script>