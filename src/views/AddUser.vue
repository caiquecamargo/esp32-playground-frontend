<template>
  <the-main class="flex flex-col pt-14 lg:pt-20 pb-4 px-4">
    <div class="pt-10">Adicionar usuário</div>
  </the-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheMain from "../components/shared/main/TheMain.vue";

export default defineComponent({
  components: { TheMain },
  setup() {
    const webSocket = new WebSocket("ws://192.168.4.1/ws");

    webSocket.onopen = (event) => {
      console.log(event);

      webSocket.send("Mandando mensagem de teste!");
    };

    webSocket.onmessage = (event) => {
      console.log("message", event);
    };

    webSocket.onclose = (event) => {
      console.log("close", event);
    };
  },
});
</script>

<style lang="postcss"></style>
