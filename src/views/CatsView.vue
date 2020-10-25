<template>
  <article class="cats-view">
    <h3>{{ i18n.t("cats") }}</h3>

    <list-renderer :items="catsStore.cats" thumbnail-width="25%">
      <template v-slot="{ item }">
        <cat-thumbnail :cat="item"></cat-thumbnail>
      </template>
    </list-renderer>
  </article>
</template>

<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import { useStore } from "vuex";
import { StoreModules } from "@/store/types";
import { CatsActionTypes } from "@/store/cats";
import CatThumbnail from "@/components/CatThumbnail.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import ListRenderer from "@/components/ListRenderer.vue";

@Options({ components: { CatThumbnail, ListRenderer } })
export default class CatsView extends Vue {
  //todo vuex typings
  catsStore = setup(() => {
    const store = useStore();

    return {
      loadCats() {
        store.dispatch(`${StoreModules.CATS}/${CatsActionTypes.LOAD_CATS}`);
      },
      cats: computed(() => store.state.cats.cats)
    };
  });

  i18n = setup(() => useI18n());

  async created() {
    await this.catsStore.loadCats();
  }
}
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
