import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    const pokename = args[0];
    if (!state.pokedex[pokename]) {
        console.log("you have not caught that pokemon");
        return;
    }
    const pokemonInfo = state.pokedex[pokename];
    console.log(`Name: ${pokename}`);
    console.log(`Height: ${pokemonInfo.height}`);
    console.log(`Weight: ${pokemonInfo.weight}`);
    console.log("Stats:");
    for (const pokeStat of pokemonInfo.stats) {
        console.log(`  -${pokeStat.stat.name}: ${pokeStat.base_stat}`);
    }
    console.log("Types:");
    for (const pokeType of pokemonInfo.types) {
        console.log(`  - ${pokeType.type.name}`)
    }
}