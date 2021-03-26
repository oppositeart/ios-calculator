import {createReducer} from '../createReducer';
import {BTN_PRESS, BtnPressActionType} from '../actions/numBtnActions';
import {ACTION_ADD} from '../actions/actionBtnActions';

type InitialStateType = {
    value: number,
    output: number,
    // TODO: Choose type
    currentAction: any,
    isPendingValue: boolean
}

const initialState: InitialStateType = {
    value: 0,
    output: 0,
    currentAction: null,
    isPendingValue: true
}

const changeValue = (state: InitialStateType, action: BtnPressActionType): InitialStateType => {
    return {
        ...state,
        output: (state.isPendingValue) ? action.value : state.output * 10 + action.value,
        isPendingValue: false
    }
}

const actionAdd = (state: InitialStateType): InitialStateType => {
    const addValue = state.value + state.output;
    return {
        ...state,
        currentAction: ACTION_ADD,
        output: addValue,
        value: addValue,
        isPendingValue: true
    }
}

export default createReducer<InitialStateType>(initialState, {
    [BTN_PRESS]: changeValue,
    [ACTION_ADD]: actionAdd
})