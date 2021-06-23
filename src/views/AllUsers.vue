<template>
  <the-main>
    <div class="pt-10">Ver usuários</div>
  </the-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheMain from "../components/shared/main/TheMain.vue";
import { Api } from "../services";

export default defineComponent({
  components: { TheMain },
  setup() {
    const endpoint = "/user";
    const time = 1000;

    setTimeout(
      () =>
        Api.post({ endpoint }).then((response) =>
          console.log("POST.", response)
        ),
      time
    );

    setTimeout(
      () =>
        Api.get({ endpoint }).then((response) =>
          console.log("GET sem parametros.", response)
        ),
      time * 2
    );

    setTimeout(
      () =>
        Api.get({ endpoint, parameters: "name=gesomel" }).then((response) =>
          console.log("GET com name.", response)
        ),
      time * 3
    );

    setTimeout(
      () =>
        Api.get({ endpoint, parameters: "id=1593" }).then((response) =>
          console.log("GET com id.", response)
        ),
      time * 4
    );

    setTimeout(
      () =>
        Api.put({
          endpoint,
          pathParam: "1593",
          parameters: "name=gesomel",
        }).then((response) => console.log("PUT.", response)),
      time * 5
    );

    setTimeout(
      () =>
        Api.delete({ endpoint, pathParam: "1593" }).then((response) =>
          console.log("DELETE.", response)
        ),
      time * 6
    );
  },
});
</script>

<style lang="postcss"></style>
