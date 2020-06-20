export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function toShortTime(time) {
    return new Date(time).toLocaleString();
}