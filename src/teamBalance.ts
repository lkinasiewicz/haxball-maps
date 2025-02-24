import { TEAM } from "./constants";
import { Plugin } from "./utils/plugin";

export const teamBalancePlugin: Plugin = room => {
  let nextTeam = TEAM.RED;

  return {
    onPlayerJoin: function (player) {
      room.setPlayerAdmin(player.id, true);
      room.setPlayerTeam(player.id, nextTeam);
      nextTeam = nextTeam === TEAM.RED ? TEAM.BLUE : TEAM.RED;
    },
  };
};
