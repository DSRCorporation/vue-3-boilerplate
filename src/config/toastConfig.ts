import { h } from "vue";
import { PluginOptions, POSITION, TYPE } from "vue-toastification";
import SvgIcon from "@/components/SvgIcon.vue";

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
        render: () => h(SvgIcon, { icon: "info" }),
      },
    },
    [TYPE.ERROR]: {
      icon: {
        render: () => h(SvgIcon, { icon: "warning" }),
      },
    },
    [TYPE.SUCCESS]: {
      icon: {
        render: () => h(SvgIcon, { icon: "check" }),
      },
    },
  },
};
