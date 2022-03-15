import { h } from "vue";
import { PluginOptions, POSITION, TYPE } from "vue-toastification";

export const toastConfig: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: false,
  hideProgressBar: true,
  closeButton: false,
  toastDefaults: {
    [TYPE.DEFAULT]: {
      icon: false,
    },
    [TYPE.INFO]: {
      icon: {
        render: () => h("wc-svg-icon", { href: "/icons.svg", symbol: "info" }),
      },
    },
    [TYPE.ERROR]: {
      icon: {
        render: () =>
          h("wc-svg-icon", { href: "/icons.svg", symbol: "warning" }),
      },
    },
    [TYPE.SUCCESS]: {
      icon: {
        render: () => h("wc-svg-icon", { href: "/icons.svg", symbol: "check" }),
      },
    },
  },
};
