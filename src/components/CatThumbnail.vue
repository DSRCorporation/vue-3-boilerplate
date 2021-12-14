<template>
  <div class="cat-thumbnail">
    <v-thumbnail>
      <div
        :style="{ 'background-image': imgPath }"
        class="cat-thumbnail__photo"
      ></div>
      <h3 class="cat-thumbnail__name">{{ cat.name }}</h3>
    </v-thumbnail>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import VThumbnail from "@/components/VThumbnail.vue";
import { Cat } from "@/types/cats";

@Options({
  props: {
    cat: Object,
  },
  components: {
    VThumbnail,
  },
})
export default class CatThumbnail extends Vue {
  cat!: Cat;
  //todo get it from the server
  get imgPath() {
    return `url(/cats/${this.cat.id % 6}.jpg)`;
  }
}
</script>

<style scoped lang="scss">
@import "../scss/constants";
@import "../scss/typography";

.cat-thumbnail {
  cursor: pointer;
  user-select: none;

  &__name {
    position: absolute;
    left: $gridSmall;
    bottom: $gridSmall;
    color: $backgroundLightColor;
  }

  &__photo {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
