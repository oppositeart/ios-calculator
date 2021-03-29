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
    clearBtnStage: ClearBtnStageType,
    pressedBtnName: string
}

const initialState: InitialStateType = {
    buttons: {
        btnClear, btnToggle, btnPercent, btnDivide,
        btnMemClear, btnMemRead, btnMemSubtract, btnMemAdd,
        btnNum7: getBtnNum(7), btnNum8: getBtnNum(8), btnNum9: getBtnNum(9), btnMultiply,
        btnNum4: getBtnNum(4), btnNum5: getBtnNum(5), btnNum6: getBtnNum(6), btnSubtract,
        btnNum1: getBtnNum(1), btnNum2: getBtnNum(2), btnNum3: getBtnNum(3), btnAdd,
        btnNum0: getBtnNum(0), btnComma: getBtnNum(','), btnResult
    },
    clearBtnStage: 0,
    pressedBtnName: ''
}
// Change pressed state of action buttons
const createPressActionReducer = (btnName: string): (state: InitialStateType) => InitialStateType => {
    return (state: InitialStateType): InitialStateType => {
        if (state.pressedBtnName === btnName) {
            return state
        }
        let buttonsObj = {
            ...state.buttons,
            [btnName]:  {
                ...state.buttons[btnName],
                isPressed: true
            }
        }
        if (state.pressedBtnName) {
            buttonsObj = {
                ...buttonsObj,
                [state.pressedBtnName]:  {
                    ...state.buttons[state.pressedBtnName],
                    isPressed: false
                }
            }
        }
        return {
            ...state,
            buttons: {
                ...buttonsObj
            },
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
                buttons: {
                    ...newState.buttons,
                    [newState.pressedBtnName]: {
                        ...newState.buttons[newState.pressedBtnName],
                        isPressed: false
                    }
                },
                pressedBtnName: ''
            }
        }
        if (state.clearBtnStage === btnStage) {
            return newState
        }
        newState = {
            ...newState,
            buttons: {
                ...newState.buttons,
                btnClear: {
                    ...newState.buttons.btnClear,
                    name: newState.buttons.btnClear.nameArr[btnStage]
                }
            },
            clearBtnStage: btnStage
        }

        return newState
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
            buttons: {
                ...newState.buttons,
                [state.pressedBtnName]: {
                    ...newState.buttons[state.pressedBtnName],
                    isPressed: false
                }
            },
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