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
    memValue: number,
    previousAction: string,
    clearValueStage: ClearBtnStageType
}

const initialState: InitialStateType = {
    // Used values array to be able to create HISTORY component in future
    values: [],
    currentValue: 0,
    memValue: 0,
    previousAction: ACTION_NUM_PRESS,
    clearValueStage: 0
}

const changeValue = (state: InitialStateType, action: ActionNumBtnPressACType): InitialStateType => {
    return {
        ...state,
        currentValue: state.previousAction === action.type ? state.currentValue * 10 + action.value : action.value,
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
    // If action is the same as previous or value hasn't changed skip
    if (state.previousAction === action.type || state.previousAction !== ACTION_NUM_PRESS) {
        return state
    }
    return {
        ...state,
        currentValue: (state.currentValue / 100) *
            (state.values.length > 1 ? state.values[state.values.length - 1].value : 1),
        previousAction: action.type
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
    console.log(state.clearValueStage);
    if (state.clearValueStage === 0) {
        return {
            ...state,
            values: [],
            //previousAction: ACTION_NUM_PRESS,
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