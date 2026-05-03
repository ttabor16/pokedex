import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the names of the next 20 location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the names of the previous 20 location areas",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Lists the pokemon found in a provided area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempt to catch a Pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspect pokemon in your pokedex",
      callback: commandInspect,
    }
  };
}