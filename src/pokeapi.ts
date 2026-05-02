import { Cache } from "./pokecache.js";
export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #cache: Cache;

    constructor(cacheInterval: number) {
        this.#cache = new Cache(cacheInterval);
    }

    async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
        let url = `${PokeAPI.baseURL}/location-area`;

        if (pageURL != undefined){
            url = pageURL;
        } 

        const cached = this.#cache.get<ShallowLocations>(url);
    
        if (cached !== undefined) {
            return cached;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result: ShallowLocations = await response.json();
        this.#cache.add(url, result);
        return result;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const cached = this.#cache.get<Location>(url);
    
        if (cached !== undefined) {
            return cached;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result: Location = await response.json();
        this.#cache.add(url, result);
        return result;  
    }

    async fetchPokemon(pokeName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokeName}`;

        const cached = this.#cache.get<Pokemon>(url);

        if (cached !== undefined) {
            return cached;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result: Pokemon = await response.json();
        this.#cache.add(url, result);
        return result;
    }

}

export type ShallowLocations = {
  count: number,
  next: string | null,
  previous: string | null,
  results: { name: string, url: string }[]
};

export type Location = {
    id: number,
    name: string,
    game_index: number,
    encounter_method_rates: {
        encounter_method: { name: string, url: string },
        version_details: { rate: number, version: { name: string, url: string}}[]
    }[],
    location: { name: string, url: string },
    names: {
        name: string,
        language: {name: string, url: string};
    }[],
    pokemon_encounters: {
        pokemon: {name: string, url: string},
        version_details: {
            version: {name: string, url: string},
            max_chance: number,
            encounter_details: {
                    min_level: number,
                    max_level: number,
                    condition_values: any[],
                    chance: number,
                    method: {name: string, url: string}
                }[]
        }[]
    }[]
};

/*
export type Pokemon = {
    id: number,
    name: string,
    base_experience: number,
    height: number,
    is_default: boolean,
    order: number,
    weight: number,
    abilities: {
        is_hidden: boolean,
        slot: number,
        ability: { name: string, url: string }
    }[],
    forms: {
        name: string,
        url: string
    }[],
    game_indices: {
        game_index: number,
        version: { name: string, url: string }
    }[],
    held_items: {
        item: { name: string, url: string },
        version_details: { rarity: number, version: { name: string, url: string}}[] 
    }[],
    location_area_encounters: string,
    moves: {
        move: { name: string, url: string},
        version_group_details: {
            level_learned_at: number,
            version_group: { name: string, url: string},
            move_learn_method: {name: string, url: string }
        }[]
        order: number
    }[],
    species: { name: string, url: string }, 
    sprites: {
        back_default: string,
        back_female: string,
        back_shiny: string,
        back_shiny_femail: string,
        front_defualt: string,
        front_female: string,
        front_shiny: string,
        front_shiny_femail: string
        other: { 
            dream_world: { front_default: string, front_female: string},
            home: { front_default: string, 
                front_female: string,
                front_shiny: string,
                front_shiny_female: string
            },
            "official-artwork": { front_default: string, front_shiny: string},
            showdown: {
                back_default: string,
                back_female: string,
                back_shiny: string,
                back_shiny_female: string,
                front_default: string,
                front_female: string,
                front_shiny: string,
                front_shiny_female: string
            } 
        },
        versions: {
            "generation-i": {
                "red-blue": {
                    back_default: string,
                    back_gray: string,
                    front_default: string,
                    front_gray: string
                },
                yellow: {
                    back_default: string,
                    back_gray: string,
                    front_default: string,
                    front_gray: string
                }
            },
            "generation-ii": {
                crystal: {
                    back_default: string,
                    back_shiny: string,
                    front_default: string,
                    front_shiny: string
                },
                gold: {
                    back_default: string,
                    back_shiny: string,
                    front_default: string,
                    front_shiny: string
                },
                silver: {
                    back_default: string,
                    back_shiny: string,
                    front_default: string,
                    front_shiny: string
                }
            },
            "generation-iii": {
                emerald: { front_default: string, front_shiny: string },
                "firered-leafgreen": {
                    back_default: string,
                    back_shiny: string,
                    front_default: string,
                    front_shiny: string
                },
                "ruby-sapphire": {
                    back_default: string,
                    back_shiny: string,
                    front_default: string,
                    front_shiny: string
                }
            },
            "generation-iv": {
                "diamond-pearl": {
                    back_default: string,
                    back_female: string,
                    back_shiny: string,
                    back_shiny_female: string,
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                },
                "heartgold-soulsilver": {
                    back_default: string,
                    back_female: string,
                    back_shiny: string,
                    back_shiny_female: string,
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                },
                platinum: {
                    back_default: string,
                    back_female: string,
                    back_shiny: string,
                    back_shiny_female: string,
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                }
            },
            "generation-v": {
                animated: {
                    back_default: string,
                    back_female: string,
                    back_shiny: string,
                    back_shiny_female: string,
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                }
            },
            "generation-vi": {
                "omegaruby-alphasapphire": {
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                },
                "x-y": {
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                }
            },
            "generation-vii": {
                icons: { front_default: string, front_female: string },
                "ultra-sun-ultra-moon": {
                    front_default: string,
                    front_female: string,
                    front_shiny: string,
                    front_shiny_female: string
                }
            },
            "generation-viii": {
                icons: { front_default: string, front_female: string }
            }
        },
    },
    cries: { latest: string, legacy: string },
    stats: {
        base_stat: number,
        effort: number,
        stat: { name: string, url: string }
    }[],
    types: {
        slot: number,
        type: { name: string, url: string }
    }[],
    past_types: {
        generation: { name: string, url: string},
        types: {
            slot: number,
            type: { name: string, url: string }
        }[]
    }[],
    past_abilities: {
        generation: { name: string, url: string },
        abilities: {
            ability: string,
            is_hidden: boolean,
            slot: number
        }[]
    }[],
};
*/

export type Pokemon = {
    name: string;
    base_experience: number;
};
