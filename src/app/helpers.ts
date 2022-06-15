export function limit(value: number, min: number, max: number) {
    if (min > max) {
        let t = min;
        min = max;
        max = t;
    }
    return value < min ? min : (value > max ? max : value)
}

export function debug(...args: any) {
    if (args[0] === true) {
        console.log(...(args.slice(1)));
    } else {
        if (localStorage.getItem('_DEBUG')) {
            console.log(...args);
        }
    }
}