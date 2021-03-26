export const createReducer = <T>(initialState: T, handlers: any) => {
    return (state = initialState, action: any):T => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}