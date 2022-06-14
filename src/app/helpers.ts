export function limit(value: number, min: number, max: number) {
    if (min > max) {
        let t = min;
        min = max;
        max = t;
    }
    return value < min ? min : (value > max ? max : value)
}