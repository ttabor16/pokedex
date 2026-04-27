import { createInterface } from "readline";
import { getCommands } from "./commands.js";

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    rl.prompt();

    rl.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            rl.prompt();
            return;
        }

        const commandName = words[0];
        try {
            const commands = getCommands();
            const cmd = commands[commandName];
            if (!cmd) {
                console.log("Unknown command");
                rl.prompt();
                return;
            }
            cmd.callback(commands);
            rl.prompt()
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

