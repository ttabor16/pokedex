export type CacheEntry<T> = {
    createdAt: number,
    val: T
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    add<T>(key: string, val: T) {
        const entry = {createdAt: Date.now(), val}
        this.#cache.set(key, entry);
    }

    get<T>(key: string): T | undefined{
        const entry = this.#cache.get(key);
        if (entry === undefined) {
            return undefined;
        }
        return entry.val;
    }

    #reap(): void {
        for (const [key, entry] of this.#cache) {
            if (entry.createdAt < (Date.now() - this.#interval)) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    constructor(initial: number) {
        this.#interval = initial;
        this.#startReapLoop();
    }

    stopReapLoop(): void{
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}

