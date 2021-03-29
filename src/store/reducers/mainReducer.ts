import {createReducer} from '../createReducer';
import {
    ACTION_ADD, ACTION_CLEAR,
    ACTION_DIVIDE, ACTION_MEM_ADD, ACTION_MEM_CLEAR, ACTION_MEM_READ, ACTION_MEM_SUBTRACT,
    ACTION_MULTIPLY, ACTION_NUM_PRESS, ACTION_PERCENT,
    ACTION_RESULT,
    ACTION_SUBTRACT, ACTION_TOGGLE
} from '../actions/buttonsActions';
import mathCalculation from '../mathCalculation';
import {
    ActionNumBtnPressACType,
    ActionPercentACType,
    ActionResultACType
} from '../actionCreators/buttonsAC';
import {ClearBtnStageType} from './btnReducer';

export type ValueObjType = {
    value: number,
    action: string
}

type InitialStateType = {
    values: Array<ValueObjType>,
    currentValue: number,
    stringValue: string,
    memValue: number,
    previousAction: string,
    clearValueStage: ClearBtnStageType
}

const initialState: InitialStateType = {
    // Used values array to be able to create HISTORY component in future
    values: [],
    currentValue: 0,
    stringValue: '',
    memValue: 0,
    previousAction: ACTION_NUM_PRESS,
    clearValueStage: 0
}

const fixFloatNumber = (a: number, length: number): number => {
    const calcLength = Math.pow(10, length);
    return Math.floor(a * calcLength) / calcLength;
}
const parseValue = (val: string):number => {
    return parseFloat(val.replace(',', '.'));
}

const changeValue = (state: InitialStateType, action: ActionNumBtnPressACType): InitialStateType => {
    const isCommaFlag: boolean = state.stringValue.indexOf(',') > -1;
    if (isCommaFlag && action.value.toString() === ',') {
        return state
    }
    const valueStr: string = action.value.toString();
    let strValue = '';
    if (state.previousAction === action.type) {
        strValue =  valueStr === ',' && state.stringValue === ''
            ? '0' + valueStr
            : state.stringValue + valueStr
    } else {
        strValue = valueStr === ','
            ? '0' + valueStr
            : valueStr
    }
    return {
        ...state,
        //currentValue: state.previousAction === action.type ? state.currentValue * 10 + action.value : action.value,
        // currentValue: state.previousAction === action.type
        //     ? fixFloatNumber(state.currentValue + val, 9)
        //     : action.value,
        stringValue: strValue,
        currentValue:parseValue(strValue),
        previousAction: action.type,
        clearValueStage: 1
    };
}
const actionMath = (state: InitialStateType, action: any): InitialStateType => {
    // If action is the same as previous skip
    if (state.previousAction === action.type) {
        return state
    }
    // If action is different from previous and not input digits or '=', then change action type to current
    if (state.previousAction !== ACTION_NUM_PRESS && state.previousAction !== ACTION_RESULT) {
        let a = [...state.values]
        // If action was ACTION_PERCENT length could be 0
        if (a.length > 0) {
            a[a.length - 1] = {value: a[a.length - 1].value, action: action.type}
        }
        return {
            ...state,
            values: [...a],
            previousAction: action.type
        }
    } else {
        const currentAction = state.previousAction === ACTION_NUM_PRESS || state.previousAction === ACTION_RESULT
            ? action.type
            : state.previousAction;
        // Create object with current value and math action
        const valueObj: ValueObjType = {value: state.currentValue, action: currentAction}
        // If previous action was '=' reset array of values, else push object inside array
        const valuesArr: ValueObjType[] = state.previousAction === ACTION_RESULT
            ? [valueObj]
            : [...state.values, valueObj];
        return {
            ...state,
            values: valuesArr,
            // Calculates values inside of values array
            currentValue: mathCalculation(valuesArr),
            previousAction: action.type
        }
    }
}
const actionPercent = (state: InitialStateType, action: ActionPercentACType): InitialStateType => {
    // Always calculate percent from previous value like IOS calculator
    // Windows calculator calculate in different way
    const percent = (state.currentValue / 100) * (state.values.length > 0
            ? state.values[state.values.length - 1].value
            : 1)
    return {
        ...state,
        // Limit digit capacity after comma
        currentValue: Math.floor(percent * 100000000) / 100000000
    }
}
const actionResult = (state: InitialStateType, action: ActionResultACType): InitialStateType => {
    // If no values return
    if (!state.values.length) {
        return state
    }
    // If action is the same as previous skip
    if (state.previousAction === action.type) {
        return {
            ...state,
            currentValue: mathCalculation([state.values[state.values.length - 1], {value: state.currentValue, action: state.previousAction}]),
            previousAction: action.type
        }
    }
    return {
        ...state,
        values: [...state.values, {value: state.currentValue, action: state.values[state.values.length - 1].action}],
        // Calculates values inside of the values array
        currentValue: mathCalculation([...state.values, {value: state.currentValue, action: state.previousAction}]),
        previousAction: action.type
    }
}
const actionToggle = (state: InitialStateType): InitialStateType => {
    return {
        ...state,
        // Invert value
        currentValue: state.currentValue * -1
    }
}
const actionClear = (state: InitialStateType): InitialStateType => {
    if (state.clearValueStage === 0) {
        return {
            ...state,
            values: [],
            previousAction: ACTION_NUM_PRESS,
            clearValueStage: 0
        }
    }
    return {
        ...state,
        currentValue: 0,
        clearValueStage: 0
    }
}
const actionMemAdd = (state: InitialStateType): InitialStateType => {
    return {
        ...state,
        memValue: state.memValue + state.currentValue
    }
}
const actionMemSubtract = (state: InitialStateType): InitialStateType => {
    return {
        ...state,
        memValue: state.memValue - state.currentValue
    }
}
const actionMemRead = (state: InitialStateType): InitialStateType => {
    return {
        ...state,
        currentValue: state.memValue
    }
}
const actionMemClear = (state: InitialStateType): InitialStateType => {
    return {
        ...state,
        memValue: 0
    }
}

export default createReducer<InitialStateType>(initialState, {
    [ACTION_NUM_PRESS]: changeValue,
    [ACTION_ADD]: actionMath,
    [ACTION_SUBTRACT]: actionMath,
    [ACTION_MULTIPLY]: actionMath,
    [ACTION_DIVIDE]: actionMath,
    [ACTION_PERCENT]: actionPercent,
    [ACTION_RESULT]: actionResult,
    [ACTION_TOGGLE]: actionToggle,
    [ACTION_CLEAR]: actionClear,
    [ACTION_MEM_ADD]: actionMemAdd,
    [ACTION_MEM_SUBTRACT]: actionMemSubtract,
    [ACTION_MEM_READ]: actionMemRead,
    [ACTION_MEM_CLEAR]: actionMemClear
})