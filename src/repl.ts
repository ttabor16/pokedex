import { initState } from "./state.js";

export function startREPL() {
    const state = initState();

    state.readline.prompt();

    state.readline.on("line", async (input: string) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.readline.prompt();
            return;
        }

        const commandName = words[0];
        try {
            const commands = state.commands;
            const cmd = commands[commandName];
            if (!cmd) {
                console.log("Unknown command");
                state.readline.prompt();
                return;
            }
            await cmd.callback(state);
        } catch (err) {
            console.log(`error: ${err}`);
        }
        state.readline.prompt()
    });
}

export function cleanInput(input: string): string[] {
    const returnArray: string[] = [];
    const newInput = input.trim()
    if (newInput.length > 0){
        const newArray = newInput.split(/\s+/);
        for (const word of newArray) {
            returnArray.push(word.toLowerCase())
        }
    }
    return returnArray;
}

