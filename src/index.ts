import "./types/haxball-api.d";
import { powerPlugin } from "./power";
import { resetPlugin } from "./reset";
import { teamBalancePlugin } from "./teamBalance";
import { applyPlugins } from "./utils/plugin";

const room = HBInit({
  roomName: "Jeze",
  playerName: "",
  noPlayer: true,
  public: false,
  maxPlayers: 12,
  token: window.process?.env?.HEADLESS_TOKEN,
});

applyPlugins(room, powerPlugin, resetPlugin, teamBalancePlugin);

// expose hbRomm globally to allow control from headless server console
// @ts-ignore
window.hbRoom = room;
