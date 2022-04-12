export function exampleMiddleware(storeAPI) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            // Do anything here: pass the action onwards with next(action),
            // or restart the pipeline with storeAPI.dispatch(action)
            // Can also use storeAPI.getState() here
            // console.log('exampleMiddleware storeAPI:',storeAPI);
            // console.log('exampleMiddleware getState:',storeAPI.getState());
            // console.log('exampleMiddleware action:',action);

            return next(action)
        }
    }
}