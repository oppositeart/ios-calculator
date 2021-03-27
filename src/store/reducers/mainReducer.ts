import {createReducer} from '../createReducer';
import {BTN_PRESS, BtnPressActionType} from '../actions/numBtnActions';
import {ACTION_ADD, ACTION_MULTIPLY, ACTION_RESULT} from '../actions/actionBtnActions';
import mathCalculation from '../mathCalculation';

export type ValueObjType = {
    value: number,
    action: string
}

type InitialStateType = {
    values: Array<ValueObjType>,
    currentValue: number,
    previewAction: string
}

const initialState: InitialStateType = {
    values: [],
    currentValue: 0,
    previewAction: BTN_PRESS
}

const changeValue = (state: InitialStateType, action: BtnPressActionType): InitialStateType => {
    return {
        ...state,
        currentValue: state.previewAction === action.type ? state.currentValue * 10 + action.value : action.value,
        previewAction: action.type
    };
}
const actionMath = (state: InitialStateType, action: any): InitialStateType => {
    const currentAction = state.previewAction === BTN_PRESS || state.previewAction === ACTION_RESULT ? action.type : state.previewAction;
    const valueObj:ValueObjType = {value: state.currentValue, action: currentAction};
    const valuesArr:ValueObjType[] = state.previewAction === ACTION_RESULT ? [valueObj] : [...state.values, valueObj];
    debugger;
    return {
        ...state,
        values: valuesArr,
        currentValue: mathCalculation(valuesArr),
        previewAction: action.type
    }
}
const actionResult = (state: InitialStateType, action: any): InitialStateType => {
    return {
        ...state,
        currentValue: mathCalculation([...state.values, {value: state.currentValue, action: state.previewAction}]),
        previewAction: action.type
    }
}

export default createReducer<InitialStateType>(initialState, {
    [BTN_PRESS]: changeValue,
    [ACTION_ADD]: actionMath,
    [ACTION_MULTIPLY]: actionMath,
    [ACTION_RESULT]: actionResult
})