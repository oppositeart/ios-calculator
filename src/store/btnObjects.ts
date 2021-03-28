import {
    actionAddAC, actionClearAC, ActionClearACType, actionDivideAC, actionMultiplyAC,
    ActionNumBtnPressACType,
    actionNumPressAC, actionPercentAC, actionResultAC,
    actionSubtractAC, actionToggleAC
} from './actionCreators/operationBtnAC';

export type NumBtnObjType = {
    name: string,
    action: ActionNumBtnPressACType
}
export type OperationBtnObjType = {
    name: string,
    action: any
}
export type ClearBtnObjType = {
    name: string,
    altName: string,
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
    action: actionAddAC()
}
export const btnSubtract: OperationBtnObjType = {
    name: '-',
    action: actionSubtractAC()
}
export const btnMultiply: OperationBtnObjType = {
    name: '×',
    action: actionMultiplyAC()
}
export const btnDivide: OperationBtnObjType = {
    name: '÷',
    action: actionDivideAC()
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
    altName: 'C',
    action: actionClearAC()
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