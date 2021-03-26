import {createReducer} from '../createReducer';
import {BTN_PRESS, BtnPressActionType} from '../actions/numBtnActions';
import {ACTION_ADD, ACTION_MULTIPLY, ACTION_RESULT} from '../actions/actionBtnActions';

type InitialStateType = {
    value: number,
    valuePrev: number | null,
    // TODO: Choose type
    currentAction: any,
    isPendingValue: boolean
}

const initialState: InitialStateType = {
    value: 0,
    valuePrev: null,
    currentAction: null,
    // Is waiting for new value to input
    isPendingValue: true
}

const changeValue = (state: InitialStateType, action: BtnPressActionType): InitialStateType => {
    return {
        ...state,
        // If waiting for new value use value from action instead of adding digits to current state value
        value: (state.isPendingValue) ? action.value : state.value * 10 + action.value,
        isPendingValue: false
    }
}
const actionAdd = (state: InitialStateType): InitialStateType => {
    if (state.isPendingValue) {
        return {
            ...state
        }
    }
    const calcValue = state.valuePrev === null ? state.value : state.valuePrev + state.value;
    return {
        ...state,
        value: calcValue,
        valuePrev: calcValue,
        currentAction: ACTION_ADD,
        isPendingValue: true
    }
}
const actionMultiply = (state: InitialStateType): InitialStateType => {
    if (state.isPendingValue) {
        return {
            ...state
        }
    }
    const calcValue = state.valuePrev === null ? state.value : state.valuePrev * state.value;
    return {
        ...state,
        value: calcValue,
        valuePrev: calcValue,
        currentAction: ACTION_MULTIPLY,
        isPendingValue: true
    }
}
const actionResult = (state: InitialStateType): InitialStateType => {
    let calcValue: number = 0;
    switch (state.currentAction) {
        case ACTION_ADD:
            calcValue = state.valuePrev === null ? state.value : state.valuePrev + state.value;
            break;
        case ACTION_MULTIPLY:
            calcValue = state.valuePrev === null ? state.value : state.valuePrev * state.value;
            break;
    }
    return {
        ...state,
        value: calcValue,
        valuePrev: null,
        currentAction: null,
        isPendingValue: true
    }
}

export default createReducer<InitialStateType>(initialState, {
    [BTN_PRESS]: changeValue,
    [ACTION_ADD]: actionAdd,
    [ACTION_MULTIPLY]: actionMultiply,
    [ACTION_RESULT]: actionResult
})