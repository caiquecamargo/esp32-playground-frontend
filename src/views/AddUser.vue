<template>
  <the-main class="flex flex-col pt-14 lg:pt-20 pb-4 px-4">
    <the-title title="Adicionar usuário" />
    <form-field
      label-name="nome do usuário"
      v-model:data-from-parent="user.name"
      :lazy="true"
    />
    <div class="flex justify-around gap-2 mt-6">
      <button
        @click.prevent="onCreate"
        class="btn-xl w-full py-2 rounded bg-secondary text-white"
      >
        Criar usuário
      </button>
    </div>
  </the-main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import TheMain from "../components/shared/main/TheMain.vue";
import TheTitle from "../components/shared/paragraph/TheTitle.vue";
import FormField from "../components/shared/forms/FormField.vue";
import { User } from "../models/IUser";

export default defineComponent({
  components: { TheMain, TheTitle, FormField },
  setup() {
    const user = reactive<User>({
      cardId: "",
      name: "",
    });

    const onCreate = () => {
      const webSocket = new WebSocket("ws://192.168.4.1/ws");
      let timeout;

      webSocket.onopen = () => {
        console.log("Sending message: ", user.name);
        webSocket.send(user.name);
      };

      timeout = setTimeout(() => {
        console.log("Close websocket");
        webSocket.close();
      }, 15000);

      webSocket.onmessage = (event) => {
        console.log("Message received", event.data);
        if (event.data) {
          console.log(JSON.parse(event.data));
          const message = JSON.parse(event.data);
          Object.assign(user, message.data);

          console.log("Usuário criado com sucesso!", user);
        }
      };

      webSocket.onerror = (event) => {
        console.log("Error:", event);
      };

      webSocket.onclose = (event) => {
        console.log("Event closed", event);
      };
    };

    return {
      user,
      onCreate,
    };
  },
});
</script>

<style lang="postcss"></style>
