<template>
  <the-header>
    <template #logo>
      <cptm-logo class="w-28 text-white" />
    </template>
    <template #navMobile>
      <e-nav-mobile />
    </template>
  </the-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "../shared/header/TheHeader.vue";
import ENavMobile from "./ENavMobile.vue";
import CptmLogo from "../svg/CptmLogo.vue";

export default defineComponent({
  components: { TheHeader, ENavMobile, CptmLogo },
});
</script>

<style lang="postcss"></style>
