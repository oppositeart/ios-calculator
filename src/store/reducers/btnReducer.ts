import {createReducer} from '../createReducer';
import {ACTION_CLEAR} from '../actions/operationBtnActions';
import {
    btnAdd,
    btnClear,
    btnDivide, btnMemClear, btnMemMinus, btnMemPlus, btnMemRead,
    btnMultiply,
    btnPercent,
    btnResult,
    btnSubtract,
    btnToggle,
    getBtnNum
} from '../btnObjects';

export type BtnObjType = {
    name: string,
    // TODO: Choose type
    action: any
}

type InitialStateType = {
    buttons: BtnObjType[]
}

const initialState: InitialStateType = {
    buttons: [
        btnClear, btnToggle, btnPercent, btnDivide,
        btnMemClear, btnMemRead, btnMemMinus, btnMemPlus,
        getBtnNum(7), getBtnNum(8), getBtnNum(9), btnMultiply,
        getBtnNum(4), getBtnNum(5), getBtnNum(6), btnSubtract,
        getBtnNum(1), getBtnNum(2), getBtnNum(3), btnAdd,
        getBtnNum(0), {name: ',', action: null}, btnResult
    ]
}
const actionClear = (state: InitialStateType): InitialStateType => {
    return {
        ...state
    }
}

export default createReducer<InitialStateType>(initialState, {
    [ACTION_CLEAR]: actionClear
})