function debug(...args: any) {
    if (args[0] === true) {
        console.log(...(args.slice(1)));
    } else {
        if (localStorage.getItem('_DEBUG')) {
            console.log(...args);
        }
    }
}

export {debug};