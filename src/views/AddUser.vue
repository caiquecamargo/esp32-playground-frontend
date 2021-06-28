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
import { defineComponent, reactive, ref } from "vue";
import TheMain from "../components/shared/main/TheMain.vue";
import TheTitle from "../components/shared/paragraph/TheTitle.vue";
import FormField from "../components/shared/forms/FormField.vue";
import { User } from "../models/IUser";

export default defineComponent({
  components: { TheMain, TheTitle, FormField },
  setup() {
    const waitingForCard = ref(false);
    const infoMessage = ref("");
    const user = reactive<User>({
      cardId: "",
      name: "",
    });

    const onCreate = () => {
      const webSocket = new WebSocket("ws://192.168.4.1/ws");
      let timeout;

      webSocket.onopen = () => {
        waitingForCard.value = true;
        infoMessage.value = "Aguardando leitura do cartão...";
        webSocket.send(user.name);
      };

      timeout = setTimeout(() => {
        webSocket.close();
        waitingForCard.value = false;
        infoMessage.value = "Tempo de espera para leitura estourado!";
      }, 15000);

      webSocket.onmessage = (event) => {
        if (event.data) {
          const message = JSON.parse(event.data);
          Object.assign(user, message.data);

          infoMessage.value = `Usuário ${user.name} criado com sucesso!`;
        }
      };

      webSocket.onerror = () => {
        infoMessage.value = "Erro ao criar usuário!";
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
