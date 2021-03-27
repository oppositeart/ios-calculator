import {createReducer} from '../createReducer';
import {BTN_PRESS, BtnPressActionType} from '../actions/numBtnActions';
import {ACTION_ADD, ACTION_MULTIPLY, ACTION_RESULT} from '../actions/actionBtnActions';

type InitialStateType = {
    value: number,
    valuePrev: number | null,
    // TODO: Choose type
    currentAction: string,
    isPendingValue: boolean,

    isChanged: boolean
}

const initialState: InitialStateType = {
    value: 0,
    valuePrev: null,
    currentAction: ACTION_RESULT,
    // Is waiting for new value to input
    isPendingValue: true,

    isChanged: false
}

const calcFn = (value: number, valuePrev: number | null, currentAction: string, reducerAction: string): number => {
    const action = currentAction === ACTION_RESULT ? reducerAction : currentAction;
    let calcValue: number = 0;
    if (valuePrev === null) {
        calcValue = value;
    } else {
        switch (action) {//ACTION_MULTIPLY
            case ACTION_ADD:
                calcValue = valuePrev + value;
                break;
            case ACTION_MULTIPLY:
                calcValue = valuePrev * value;//25
                break
        }
    }
    return calcValue;
}

const changeValue = (state: InitialStateType, action: BtnPressActionType): InitialStateType => {
    return {
        ...state,
        // If waiting for new value use value from action instead of adding digits to current state value
        value: (state.isPendingValue) ? action.value : state.value * 10 + action.value,
        isPendingValue: false
    }
}
// 2 + 2 = 4 + 2 = 0
const actionAdd = (state: InitialStateType, action: any): InitialStateType => {
    if (state.isPendingValue && state.currentAction === action.type) {
        return {
            ...state
        }
    }
    const calcValue = calcFn(state.value, state.valuePrev, state.currentAction, action.type);
    return {
        ...state,
        value: calcValue,//25
        valuePrev: calcValue,//25
        currentAction: action.type,//null
        isPendingValue: true
    }
}
const actionMultiply = (state: InitialStateType, action: any): InitialStateType => {
    if (state.isPendingValue && state.currentAction === action.type) {
        return {
            ...state
        }
    }
    const calcValue = calcFn(state.value, state.valuePrev, state.currentAction, action.type);
    return {
        ...state,
        value: calcValue,
        valuePrev: calcValue,
        currentAction: action.type,
        isPendingValue: true
    }
}
const actionResult = (state: InitialStateType, action: any): InitialStateType => {
    if (state.currentAction === action.type) {
        return {
            ...state
        }
    }
    const calcValue = calcFn(state.value, state.valuePrev, state.currentAction, action.type);
    return {
        ...state,
        value: calcValue,
        valuePrev: 0,
        currentAction: action.type
    }
}

export default createReducer<InitialStateType>(initialState, {
    [BTN_PRESS]: changeValue,
    [ACTION_ADD]: actionAdd,
    [ACTION_MULTIPLY]: actionMultiply,
    [ACTION_RESULT]: actionResult
})