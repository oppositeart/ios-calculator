import {createReducer} from '../createReducer';
import {
    ACTION_ADD,
    ACTION_CLEAR, ACTION_DIVIDE,
    ACTION_MULTIPLY,
    ACTION_NUM_PRESS, ACTION_RESULT,
    ACTION_SUBTRACT
} from '../actions/buttonsActions';
import {
    btnAdd,
    btnClear,
    btnDivide, btnMemClear, btnMemSubtract, btnMemAdd, btnMemRead,
    btnMultiply,
    btnPercent,
    btnResult,
    btnSubtract,
    btnToggle,
    getBtnNum
} from '../btnObjects';

export type ClearBtnStageType = 0 | 1;

type InitialStateType = {
    buttons: {[x: string]: any},
    buttonsArray: {}[],
    clearBtnStage: ClearBtnStageType,
    pressedBtnName: string
}

const buttonsObj = {
    btnClear, btnToggle, btnPercent, btnDivide,
    btnMemClear, btnMemRead, btnMemSubtract, btnMemAdd,
    btnNum7: getBtnNum(7), btnNum8: getBtnNum(8), btnNum9: getBtnNum(9), btnMultiply,
    btnNum4: getBtnNum(4), btnNum5: getBtnNum(5), btnNum6: getBtnNum(6), btnSubtract,
    btnNum1: getBtnNum(1), btnNum2: getBtnNum(2), btnNum3: getBtnNum(3), btnAdd,
    btnNum0: getBtnNum(0), btnComma: getBtnNum(','), btnResult
}

const initialState: InitialStateType = {
    buttons: buttonsObj,
    buttonsArray: [
        {btnClear}, {btnToggle}, {btnPercent}, {btnDivide},
        {btnMemClear}, {btnMemRead}, {btnMemSubtract}, {btnMemAdd},
        {btnNum7: getBtnNum(7)}, {btnNum8: getBtnNum(8)}, {btnNum9: getBtnNum(9)}, {btnMultiply},
        {btnNum4: getBtnNum(4)}, {btnNum5: getBtnNum(5)}, {btnNum6: getBtnNum(6)}, {btnSubtract},
        {btnNum1: getBtnNum(1)}, {btnNum2: getBtnNum(2)}, {btnNum3: getBtnNum(3)}, {btnAdd},
        {btnNum0: getBtnNum(0)}, {btnComma: getBtnNum(',')}, {btnResult}
    ],
    clearBtnStage: 0,
    pressedBtnName: ''
}

const getObjFormArr = (array: {}[], keyName: string): {} => {
    let obj: {} = {}
    array.forEach((el: {[k: string]: any}) => {
        if (el.hasOwnProperty(keyName)) {
            obj = {...el[keyName]};
        }
    });
    return obj
}
// Add or Change property of buttonsArray
const addBtnProperty = (array: {}[], keyName: string, value: [string, any]): {}[] => {
    const a: {[k: string]: {}}[] = [...array];
    array.forEach((el: {[k: string]: {}}, index: number) => {
        if (el.hasOwnProperty(keyName)) {
            a[index][keyName] = {...el[keyName], [value[0]]: value[1]}
            return;
        }
    });
    return a;
}

// Change pressed state of action buttons
const createPressActionReducer = (btnName: string): (state: InitialStateType) => InitialStateType => {
    return (state: InitialStateType): InitialStateType => {
        if (state.pressedBtnName === btnName) {
            return state
        }
        let btnArr = addBtnProperty(state.buttonsArray, btnName, ['isPressed', true]);
        if (state.pressedBtnName) {
            btnArr = addBtnProperty(state.buttonsArray, state.pressedBtnName, ['isPressed', false]);
        }
        return {
            ...state,
            buttonsArray: [
                ...btnArr
            ],
            pressedBtnName: btnName
        }
    }
}
// Controls AC/C button state
const createBtnClearStageReducer = (btnStage: ClearBtnStageType): (state: InitialStateType) => InitialStateType => {
    return (state: InitialStateType): InitialStateType => {
        let newState: InitialStateType = {...state};
        if (state.clearBtnStage === 0 && state.pressedBtnName) {
            newState = {
                ...newState,
                buttonsArray: [...addBtnProperty(state.buttonsArray, state.pressedBtnName, ['isPressed', false])],
                pressedBtnName: ''
            }
        }
        if (state.clearBtnStage === btnStage) {
            return newState
        }
        const btnObj: any = getObjFormArr(state.buttonsArray, 'btnClear');
        return {
            ...newState,
            buttonsArray: [...addBtnProperty(state.buttonsArray, 'btnClear', ['name', btnObj? btnObj.nameArr[btnStage] : ''])],
            clearBtnStage: btnStage
        }
    }
}

// Wrap reducer or use just as reducer to add ability to clear pressed btn state
const withClearPressState = (reducer?: ((state: InitialStateType) => InitialStateType)) => {
    return (state: InitialStateType): InitialStateType => {
        const newState = reducer ? {...reducer(state)} : {...state};
        if (!state.pressedBtnName) {
            return newState
        }
        return {
            ...newState,
            buttons: [...addBtnProperty(state.buttonsArray, state.pressedBtnName, ['isPressed', false])],
            pressedBtnName: ''
        }
    }
}

export default createReducer<InitialStateType>(initialState, {
    [ACTION_NUM_PRESS]: withClearPressState(createBtnClearStageReducer(1)),
    [ACTION_ADD]: createPressActionReducer('btnAdd'),
    [ACTION_SUBTRACT]: createPressActionReducer('btnSubtract'),
    [ACTION_MULTIPLY]: createPressActionReducer('btnMultiply'),
    [ACTION_DIVIDE]: createPressActionReducer('btnDivide'),
    [ACTION_RESULT]: withClearPressState(),
    [ACTION_CLEAR]: createBtnClearStageReducer(0)
})