export const addZero = n => n < 10 ? '0' + n : n;

export const formattedTime = (minutes, seconds) => {
    return `${addZero(minutes)}:${addZero(seconds)}`;
}