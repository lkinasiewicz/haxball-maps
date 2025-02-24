import { ballRadius, playerRadius, TEAM } from "./constants";
import { PlayerId } from "./types/haxball-api.d";
import { discsDistance } from "./utils/geometry";
import { Plugin } from "./utils/plugin";

const triggerDistance = ballRadius + playerRadius + 75;
const triggerTouchTime = 80;

const powerShotRatio = {
  [TEAM.RED]: 1.8,
  [TEAM.BLUE]: 1.8,
};

export const powerPlugin: Plugin = room => {
  let playerTouchTime: Record<PlayerId, number> = {};

  function saveTouchTime() {
    room.getPlayerList().forEach(player => {
      const distanceToBall = discsDistance(
        room.getPlayerDiscProperties(player.id),
        room.getDiscProperties(0)
      );
      const touches = distanceToBall < triggerDistance;
      if (touches) {
        playerTouchTime[player.id] = playerTouchTime[player.id] || 0;
        playerTouchTime[player.id]++;
      } else {
        playerTouchTime[player.id] = 0;
      }
    });
  }

  function updateAvatars() {
    Object.entries(playerTouchTime).forEach(([playerId, playerTouchTime]) => {
      if (playerTouchTime >= triggerTouchTime) {
        room.setPlayerAvatar(+playerId, "P");
      } else if (playerTouchTime > 0) {
        const a = Math.round((10 * playerTouchTime) / triggerTouchTime);
        room.setPlayerAvatar(+playerId, "." + a);
      } else {
        room.setPlayerAvatar(+playerId, null);
      }
    });
  }

  function resetTouchTimes() {
    playerTouchTime = {};
    updateAvatars();
  }

  return {
    onPlayerBallKick: function (player) {
      const powerActive = playerTouchTime[player.id] >= triggerTouchTime;
      if (powerActive) {
        const ps = powerShotRatio[player.team];
        room.setDiscProperties(0, {
          xspeed: ps * (room.getDiscProperties(0)?.xspeed ?? 0),
          yspeed: ps * (room.getDiscProperties(0)?.yspeed ?? 0),
        });
        resetTouchTimes();
      }
    },

    onGameStop: function (byPlayer) {
      playerTouchTime = {};
    },

    onGameTick: function () {
      if (room.getPlayerList().filter(p => p.team != 0).length > 0) {
        saveTouchTime();
      }
      updateAvatars();
    },

    onPlayerChat: function (player, message) {
      if (message.toLowerCase().startsWith("!power")) {
        const [_, teamIdString, powerString] = message.split(",");
        const power = Number.parseFloat(powerString);
        const team = Number.parseInt(teamIdString);
        if (!Number.isNaN(power) && !Number.isNaN(team)) {
          powerShotRatio[team] = power;
        }
      }
    },
  };
};
