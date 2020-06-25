export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function toShortTime(time) {
    return new Date(time).toLocaleString();
}

export function getTimeDifference(startTime) {
    if (startTime === undefined || startTime === null) {
        return '00:00:00';
    }

    const diff = Date.now() - new Date(startTime);
    const total = diff / 1000;
    
    const h = Math.floor(total / 60 / 60);
    const min = Math.floor((total - (h * 60 * 60)) / 60);
    const sec = Math.floor(total - (h * 60 * 60) - (min * 60));

    return `${pad(h, 2)}:${pad(min, 2)}:${pad(sec, 2)}`
}

function pad(num, places) {
    return String(num).padStart(places, '0');
}

export function isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
}