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
    let url = `${PokeAPI.baseURL}/location-area/${locationName}`;

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
    return result;  }
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