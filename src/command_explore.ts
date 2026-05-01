import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    console.log(`Exploring ${args[0]}`)
    const result = await state.pokeAPI.fetchLocation(args[0]);
    if (!result) {
        console.log("No Pokemon found");
        return;
    }
    console.log("Found Pokemon:")
    for (const val of result.pokemon_encounters) {
        console.log(` - ${val.pokemon.name}`);
    }
}