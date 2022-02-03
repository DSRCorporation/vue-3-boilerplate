<template>
  <article class="cats-view">
    <header class="cats-view__header">
      <h1>
        {{ i18n.t("cats") }}
      </h1>
      <v-input
        class="cats-view__search"
        :label="i18n.t('search')"
        v-model="search"
      ></v-input>

      <v-button class="cats-view__add-btn button--icon">
        <svg-icon icon="add"></svg-icon>
      </v-button>
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
              <svg-icon icon="favorite_border"></svg-icon>
            </span>
          </span>
        </div>
      </template>
    </list-renderer>
  </article>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { StoreModules } from "@/store/types";
import { CatsActionTypes } from "@/store/cats/types";
import CatThumbnail from "@/components/CatThumbnail.vue";
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import ListRenderer from "@/components/ListRenderer.vue";
import UserAvatar from "@/components/user/UserAvatar.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";
import { STORE_KEY } from "@/store";

export default defineComponent({
  name: "CatsView",
  components: {
    VInput,
    CatThumbnail,
    ListRenderer,
    UserAvatar,
    SvgIcon,
    VButton,
  },
  beforeCreate() {
    this.$store.dispatch(`${StoreModules.CATS}/${CatsActionTypes.LOAD_CATS}`);
  },
  setup() {
    const store = useStore(STORE_KEY);

    let cats = computed(() => store.state.cats.cats);

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
@import "../scss/constants";
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
    --input-background-color: var(--background-color);
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
  background-color: var(--background-light-color);

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
