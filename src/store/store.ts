import {combineReducers, compose, createStore} from 'redux';
import mainReducer from './reducers/mainReducer';
import btnReducer from './reducers/btnReducer';

type ReducerType = {
    mainReducer: ReturnType<typeof mainReducer>,
    btnReducer: ReturnType<typeof btnReducer>,
};

const rootReducer = combineReducers<ReducerType>({
    mainReducer,
    btnReducer
})

// Chrome Redux devtool
const composeEnhancers = (process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers());

export type GlobalStateType = ReturnType<typeof rootReducer>;

export default store;