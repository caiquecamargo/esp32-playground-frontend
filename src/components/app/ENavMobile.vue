<template>
  <the-button-link-internal
    class="btn-lg text-white font-bold"
    :to="{ name: 'Home' }"
  >
    Home
  </the-button-link-internal>
  <the-button-link-internal
    class="btn-lg text-white font-bold"
    :to="{ name: 'AddUser' }"
  >
    Adicionar usuário
  </the-button-link-internal>
  <the-button-link-internal
    class="btn-lg text-white font-bold"
    :to="{ name: 'AllUsers' }"
  >
    Ver usuários cadastrados
  </the-button-link-internal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheButtonLinkInternal from "../shared/button/TheButtonLinkInternal.vue";

export default defineComponent({
  components: { TheButtonLinkInternal },
});
</script>

<style lang="postcss"></style>
