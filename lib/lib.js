
import Room from "./room.js";

export { Room };

export async function getFileText(url) {
    const response = await fetch(url);
    return await response.text();
}

export const debug = true;

export function debugLog(...args) {
    if (debug) {
        console.log(...args);
    }
}

export function debugError(...args) {
    if (debug) {
        console.error(...args);
    }
}