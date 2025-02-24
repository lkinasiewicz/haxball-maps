import { Room } from "../types/haxball-api";

export type PluginConfig = Partial<Room>;
export type Plugin = (room: Room) => PluginConfig;

function applyPlugin(room: Room, pluginConfig: PluginConfig) {
  for (const key in pluginConfig) {
    const defaultFunction = room[key];
    room[key] = function (...args) {
      defaultFunction?.(...args);
      pluginConfig[key](...args);
    };
  }
}

export function applyPlugins(room: Room, ...plugins: Plugin[]) {
  plugins.forEach(plugin => applyPlugin(room, plugin(room)));
}
