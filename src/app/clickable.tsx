import React from "react";


/*
export function clickable(Comp: React.FunctionComponent, clickHandler: (e: any) => void) { // TODO typeof Comp !!!!
    return function () {
        return (
            <Comp onClick={clickHandler}/>
        )
    }
}
*/

// export function clickable<TProps, TInjectedKeys extends keyof TProps>(
export function clickable<TProps>( // TODO learn more about generics
    Component: React.JSXElementConstructor<TProps>,
    // injector: Pick<TProps, TInjectedKeys>
    onClick?: (props: any) => void
) {
    // console.log('TProps:', TProps);
    return function (props) {
        // console.log('props',props);
        // return <span onClick={()=>{console.log('clicked inside')}}>
        const handler = () => {
            if (onClick) {
                onClick(props)
            }
        };
        return <span onClick={handler}>
            <Component {...(props as TProps)}/>
        </span>;
        // return <Component {...(props as TProps)} />;
    };
}