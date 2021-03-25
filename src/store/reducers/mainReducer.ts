import {createReducer} from '../createReducer';
import {BTN_PRESS, btnPressActionType} from '../actions/numBtnActions';

type InitialStateType = {
    output: number
}

const initialState: InitialStateType = {
    output: 0
}

const addValue = (state: InitialStateType, action: btnPressActionType): InitialStateType => {
    return {
        ...state,
        output: state.output * 10 + action.value
    }
}

export default createReducer<InitialStateType>(initialState, {
    [BTN_PRESS]: addValue
})