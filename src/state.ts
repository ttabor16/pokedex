import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import type { Interface } from "node:readline";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface,
    commands: Record<string, CLICommand>,
    pokeAPI: PokeAPI,
    nextLocationsURL: string | null,
    prevLocationsURL: string | null,
    pokedex: Record<string, Pokemon>
}

export function initState (): State {
    const readline = createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        });
    const commands = getCommands();
    const pokeAPI = new PokeAPI(1000);
    const nextLocationsURL = null;
    const prevLocationsURL = null;
    const pokedex = {};
    return {readline, commands, pokeAPI, nextLocationsURL, prevLocationsURL, pokedex};
}