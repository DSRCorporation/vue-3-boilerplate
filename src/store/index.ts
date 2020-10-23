import { createStore } from "vuex";
import common from "@/store/common";
import cats from "@/store/cats";

export default createStore({
  modules: {
    common,
    cats
  }
});
