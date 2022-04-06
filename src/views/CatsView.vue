<template>
  <article class="cats-view">
    <header class="cats-view__header">
      <h1>
        {{ i18n.t("cats") }}
      </h1>
      <v-search
        class="cats-view__search"
        :label="i18n.t('search')"
        v-model="search"
      ></v-search>

      <wc-button size="big" class="cats-view__add-btn" iconOnly="true">
        <wc-svg-icon slot="icon" href="/icons.svg" symbol="add"></wc-svg-icon>
      </wc-button>
    </header>

    <list-renderer :items="cats" :is-thumbnail="true">
      <template v-slot="{ item }">
        <div class="cat-card">
          <cat-thumbnail :cat="item"></cat-thumbnail>
          <span class="cat-description">
            <span class="cat-description__left">
              <user-avatar :name="item.name"></user-avatar>
              <span>{{ item.name }}</span>
            </span>

            <span class="cat-description__right">
              13
              <wc-svg-icon
                href="/icons.svg"
                symbol="favorite_border"
              ></wc-svg-icon>
            </span>
          </span>
        </div>
      </template>
    </list-renderer>
  </article>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { CatsActionTypes, CatsGetterTypes } from "@/store/cats/types";
import CatThumbnail from "@/components/CatThumbnail.vue";
import { computed, defineComponent, onBeforeMount } from "vue";
import { useI18n } from "vue-i18n";
import ListRenderer from "@/components/ListRenderer.vue";
import UserAvatar from "@/components/user/UserAvatar.vue";
import "@dmitryrazinkov/svg-icon";
import "@dmitryrazinkov/button";
import VSearch from "@/components/VSearch.vue";

export default defineComponent({
  name: "CatsView",
  components: {
    VSearch,
    CatThumbnail,
    ListRenderer,
    UserAvatar
  },
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch(CatsActionTypes.LOAD_CATS);
    });

    const cats = computed(() => store.getters[CatsGetterTypes.GET_CATS]);

    return {
      i18n: useI18n(),
      cats,
    };
  },
  data() {
    return {
      search: "",
    };
  },
});
</script>

<style scoped lang="scss">
@import "../scss/typography";
@import "../scss/breakpoints";

.cats-view {
  --aspect-ratio: 100%;
  --thumbnails-per-row: 6;

  &__header {
    padding: var(--space-xl) 0;
    display: grid;
    grid-column-gap: var(--space-xxxxl);
    grid-row-gap: var(--space-xl);
    grid-template: "head search add-btn" / auto 1fr auto;
    align-items: center;
  }

  h1 {
    grid-area: head;
  }

  &__add-btn {
    grid-area: add-btn;
  }

  &__search {
    grid-area: search;
    --input-background-color: var(--color-key-background-dark);
  }

  padding: 0 var(--space-xl);
}

.cat-card {
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

.cat-description {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-key-background);

  &__left {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-gap: var(--space-xs);
  }

  &__right {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-gap: var(--space-sm);
  }
}

@include breakpoint(xl) {
  .cats-view {
    --thumbnails-per-row: 6;
  }
}

@include breakpoint(lg) {
  .cats-view {
    --thumbnails-per-row: 4;
  }
}

@include breakpoint(md) {
  .cats-view {
    --aspect-ratio: 56.25%;
    --thumbnails-per-row: 2;
  }
}

@include breakpoint(xs) {
  .cats-view {
    --aspect-ratio: 56.25%;
    --thumbnails-per-row: 1;

    &__header {
      grid-template:
        "search search"
        "head add-btn" / 1fr auto;
    }
  }
}
</style>
