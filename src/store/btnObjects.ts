import {
    actionAddAC, actionClearAC, ActionClearACType, actionDivideAC, actionMultiplyAC,
    ActionNumBtnPressACType,
    actionNumPressAC, actionPercentAC, actionResultAC,
    actionSubtractAC, actionToggleAC
} from './actionCreators/buttonsAC';

export type NumBtnObjType = {
    name: string,
    action: ActionNumBtnPressACType
}
export type OperationBtnObjType = {
    name: string,
    action: any,
    isPressed?: boolean
}
export type ClearBtnObjType = {
    name: string,
    nameArr: string[],
    action: ActionClearACType
}

export type NumBtnValueType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const getBtnNum = (value: NumBtnValueType): NumBtnObjType => {
    return {
        name: value.toString(),
        action: actionNumPressAC(value)
    }
}
export const btnAdd: OperationBtnObjType = {
    name: '+',
    action: actionAddAC(),
    isPressed: false
}
export const btnSubtract: OperationBtnObjType = {
    name: '-',
    action: actionSubtractAC(),
    isPressed: false
}
export const btnMultiply: OperationBtnObjType = {
    name: '×',
    action: actionMultiplyAC(),
    isPressed: false
}
export const btnDivide: OperationBtnObjType = {
    name: '÷',
    action: actionDivideAC(),
    isPressed: false
}
export const btnPercent: OperationBtnObjType = {
    name: '%',
    action: actionPercentAC()
}
export const btnResult: OperationBtnObjType = {
    name: '=',
    action: actionResultAC()
}
export const btnToggle: OperationBtnObjType = {
    name: '+/-',
    action: actionToggleAC()
}
export const btnClear: ClearBtnObjType = {
    name: 'AC',
    nameArr: ['AC', 'C'],
    action: actionClearAC()
}
export const btnComma: OperationBtnObjType = {
    name: ',',
    action: null
}
export const btnMemClear: OperationBtnObjType = {
    name: 'mc',
    action: null
}
export const btnMemRead: OperationBtnObjType = {
    name: 'mr',
    action: null
}
export const btnMemMinus: OperationBtnObjType = {
    name: 'm-',
    action: null
}
export const btnMemPlus: OperationBtnObjType = {
    name: 'm+',
    action: null
}