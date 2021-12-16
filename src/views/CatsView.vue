<template>
  <article class="cats-view">
    <h3>{{ i18n.t("cats") }}</h3>

    <list-renderer :items="cats" thumbnail-width="25%">
      <template v-slot="{ item }">
        <cat-thumbnail :cat="item"></cat-thumbnail>
      </template>
    </list-renderer>
  </article>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { StoreModules } from "@/store/types";
import { CatsActionTypes } from "@/store/cats";
import CatThumbnail from "@/components/CatThumbnail.vue";
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import ListRenderer from "@/components/ListRenderer.vue";

export default defineComponent({
  name: "CatsView",
  components: {
    CatThumbnail,
    ListRenderer,
  },
  setup() {
    const store = useStore();
    store.dispatch(`${StoreModules.CATS}/${CatsActionTypes.LOAD_CATS}`);

    let cats = computed(() => store.state.cats.cats);

    return {
      i18n: useI18n(),
      cats,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../scss/constants";
@import "../scss/typography";

.cats-view {
  h3 {
    padding: $gridSmall 0;
  }

  padding: 0 $gridNormal;
}
</style>
