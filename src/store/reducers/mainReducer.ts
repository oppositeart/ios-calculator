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
    ActionResultACType
} from '../actionCreators/buttonsAC';
import {ClearBtnStageType} from './btnReducer';
import {getBtnNum} from '../btnObjects';

export type ValueObjType = {
    value: number,
    action: string
}

type InitialStateType = {
    values: Array<ValueObjType>,
    stringValue: string,
    memValue: number,
    previousAction: string,
    clearValueStage: ClearBtnStageType
}

const initialState: InitialStateType = {
    // Used values array to be able to create HISTORY component in future
    values: [],
    stringValue: '0',
    memValue: 0,
    previousAction: ACTION_NUM_PRESS,
    clearValueStage: 0
}

// Get comma symbol from button object
const commaSymbol: string = getBtnNum(',').name;

const fixFloatNumber = (a: number, length: number): number => {
    const calcLength = Math.pow(10, length);
    return Math.floor(a * calcLength) / calcLength;
}
// Parse string to number replacing commaSymbol to '.' needed to correspond float values
const stringToNum = (str: string): number => {
    return parseFloat(str.replace(commaSymbol, '.'));
}
// Parse number to string replacing '.' to commaSymbol needed to correspond state
const numToString = (num: number): string => {
    return num.toString().replace('.', commaSymbol);
}

const changeValue = (state: InitialStateType, action: ActionNumBtnPressACType): InitialStateType => {
    const valueStr: string = action.value.toString();
    // Prevent adding more then one commaSymbol
    if (state.stringValue.indexOf(commaSymbol) > -1 && valueStr === commaSymbol) {
        return state
    }
    let strValue;
    if (state.previousAction === action.type) {
        strValue = state.stringValue === '0' && valueStr !== commaSymbol
            ? strValue = valueStr
            : state.stringValue + valueStr
    } else {
        strValue = valueStr === commaSymbol
            ? '0' + valueStr
            : valueStr
    }
    return {
        ...state,
        stringValue: strValue,
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
        const valueObj: ValueObjType = {value: stringToNum(state.stringValue), action: currentAction}
        // If previous action was '=' reset array of values, else push object inside array
        const valuesArr: ValueObjType[] = state.previousAction === ACTION_RESULT
            ? [valueObj]
            : [...state.values, valueObj];
        return {
            ...state,
            values: valuesArr,
            // Calculates values inside of values array
            stringValue: numToString(mathCalculation(valuesArr)),
            previousAction: action.type
        }
    }
}
const actionPercent = (state: InitialStateType): InitialStateType => {
    // Always calculate percent from previous value like IOS calculator
    // Windows calculator calculate in different way
    const percent = (stringToNum(state.stringValue) / 100) * (state.values.length > 0
            ? state.values[state.values.length - 1].value
            : 1)
    return {
        ...state,
        // Limit digit capacity after comma
        stringValue: numToString(fixFloatNumber(percent, 9))
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
            stringValue: numToString(
                mathCalculation(
                    [state.values[state.values.length - 1], {value: stringToNum(state.stringValue), action: state.previousAction}]
                )
            ),
            previousAction: action.type
        }
    }
    return {
        ...state,
        values: [...state.values, {value: stringToNum(state.stringValue), action: state.values[state.values.length - 1].action}],
        // Calculates values inside of the values array
        stringValue: numToString(
            mathCalculation(
                [...state.values, {value: stringToNum(state.stringValue), action: state.previousAction}]
            )
        ),
        previousAction: action.type
    }
}
const actionToggle = (state: InitialStateType): InitialStateType => {
    return {
        ...state,
        // Invert value
        stringValue: numToString(stringToNum(state.stringValue) * -1)
    }
}
const actionClear = (state: InitialStateType): InitialStateType => {
    if (state.clearValueStage === 0) {
        return {
            ...state,
            values: [],
            previousAction: ACTION_NUM_PRESS,
            stringValue: '0',
            clearValueStage: 0
        }
    }
    return {
        ...state,
        stringValue: '0',
        clearValueStage: 0
    }
}
const actionMemAdd = (state: InitialStateType): InitialStateType => {
    return {
        ...state,
        memValue: state.memValue + stringToNum(state.stringValue)
    }
}
const actionMemSubtract = (state: InitialStateType): InitialStateType => {
    return {
        ...state,
        memValue: state.memValue - stringToNum(state.stringValue)
    }
}
const actionMemRead = (state: InitialStateType): InitialStateType => {
    return {
        ...state,
        stringValue: numToString(state.memValue)
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