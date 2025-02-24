import { Plugin } from "./utils/plugin";

export const resetPlugin: Plugin = room => {
  return {
    onPlayerChat: function (player, message) {
      if (message.toLowerCase().startsWith("!reset")) {
        setTimeout(() => {
          room.setDiscProperties(0, {
            x: 0,
            y: 0,
          });
        }, 1000);
      }
    },
  };
};
