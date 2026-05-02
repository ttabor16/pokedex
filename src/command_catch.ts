import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    const pokename = args[0]
    console.log(`Throwing a Pokeball at ${pokename}...`)
    const result = await state.pokeAPI.fetchPokemon(pokename);
    let randomness = Math.random() * result.base_experience;
    if (randomness > (result.base_experience/2)) {
        console.log(`${pokename} was caught!`);
        state.pokedex[pokename] = result;
        return;
    }
    console.log(`${pokename} escaped!`)
}