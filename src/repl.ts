import { initState } from "./state.js";

export function startREPL() {
    const State = initState();

    State.readline.prompt();

    State.readline.on("line", async (input: string) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            State.readline.prompt();
            return;
        }

        const commandName = words[0];
        try {
            const commands = State.commands;
            const cmd = commands[commandName];
            if (!cmd) {
                console.log("Unknown command");
                State.readline.prompt();
                return;
            }
            cmd.callback(State);
            State.readline.prompt()
        } catch (error) {
            console.log(error);
        }
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

