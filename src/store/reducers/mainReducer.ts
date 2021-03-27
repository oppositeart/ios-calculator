import {createReducer} from '../createReducer';
import {BTN_PRESS} from '../actions/numBtnActions';
import {
    ACTION_ADD,
    ACTION_DIVIDE,
    ACTION_MULTIPLY,
    ACTION_RESULT,
    ACTION_SUBTRACT
} from '../actions/operationBtnActions';
import mathCalculation from '../mathCalculation';
import {BtnPressActionACType} from '../actionCreators/numBtnAC';

export type ValueObjType = {
    value: number,
    action: string
}

type InitialStateType = {
    values: Array<ValueObjType>,
    currentValue: number,
    previousAction: string
}

const initialState: InitialStateType = {
    values: [],
    currentValue: 0,
    previousAction: BTN_PRESS
}

const changeValue = (state: InitialStateType, action: BtnPressActionACType): InitialStateType => {
    return {
        ...state,
        currentValue: state.previousAction === action.type ? state.currentValue * 10 + action.value : action.value,
        previousAction: action.type
    };
}
const actionMath = (state: InitialStateType, action: any): InitialStateType => {
    // If the same action as previous skip
    if (state.previousAction === action.type) {
        return {...state}
    }
    // If action is different from previous and not input digits or '=', then change action type to current
    if (state.previousAction !== BTN_PRESS && state.previousAction !== ACTION_RESULT) {
        let a = [...state.values];
        a[a.length - 1] = {value: a[a.length - 1].value, action: action.type}
        return {
            ...state,
            values: [...a],
            previousAction: action.type
        }
    } else {
        const currentAction = state.previousAction === BTN_PRESS || state.previousAction === ACTION_RESULT ? action.type : state.previousAction;
        // Create object with current value and math action
        const valueObj: ValueObjType = {value: state.currentValue, action: currentAction}
        // If previous action was '=' reset array of values, else push object inside array
        const valuesArr: ValueObjType[] = state.previousAction === ACTION_RESULT ? [valueObj] : [...state.values, valueObj];
        //const valuesArr: ValueObjType[] =[...state.values, valueObj];
        return {
            ...state,
            values: valuesArr,
            // Calculates values inside of values array
            currentValue: mathCalculation(valuesArr),
            previousAction: action.type
        }
    }
}
const actionResult = (state: InitialStateType, action: any): InitialStateType => {
    return {
        ...state,
        // Calculates values inside of the values array
        currentValue: mathCalculation([...state.values, {value: state.currentValue, action: state.previousAction}]),
        previousAction: action.type
    }
}

export default createReducer<InitialStateType>(initialState, {
    [BTN_PRESS]: changeValue,
    [ACTION_ADD]: actionMath,
    [ACTION_SUBTRACT]: actionMath,
    [ACTION_MULTIPLY]: actionMath,
    [ACTION_DIVIDE]: actionMath,
    [ACTION_RESULT]: actionResult
})