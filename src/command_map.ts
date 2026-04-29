import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    const result = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    for (const val of result.results) {
        console.log(val.name);
    }
    state.nextLocationsURL = result.next;
    state.prevLocationsURL = result.previous;
}

export async function commandMapb(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }
    const result = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    for (const val of result.results) {
        console.log(val.name);
    }
    state.nextLocationsURL = result.next;
    state.prevLocationsURL = result.previous;
}