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