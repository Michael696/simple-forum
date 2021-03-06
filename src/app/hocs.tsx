import React from "react";

// export function clickable<TProps, TInjectedKeys extends keyof TProps>(
function clickable<TProps>( // TODO learn more about generics
    Component: React.JSXElementConstructor<TProps>,
    // injector: Pick<TProps, TInjectedKeys>
    onClick?: (props: any) => void
) {
    // console.log('TProps:', TProps);
    return function (props: any) {
        // console.log('props',props);
        // return <span onClick={()=>{console.log('clicked inside')}}>
        const handler = () => {
            if (onClick) {
                onClick(props);
            }
        };
        return <span onClick={handler}>
            <Component {...(props as TProps)}/>
        </span>;
        // return <Component {...(props as TProps)} />;
    };
}

function hoverable<TProps>(
    Component: React.JSXElementConstructor<TProps>,
    // Popup: React.JSXElementConstructor<PProps>, // use it someday
    onEnter: (props: any) => void,
    onLeave: (props: any) => void
) {
    return function (props: any) {
        return (
            <span
                onMouseEnter={() => {
                    onEnter(props);
                }}
                onMouseLeave={() => {
                    onLeave(props);
                }}
            >
            <Component {...(props as TProps)}/>
        </span>
        );
    };
}

export {clickable, hoverable};