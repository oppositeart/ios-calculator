import {
    ACTION_ADD,
    ACTION_DIVIDE,
    ACTION_MULTIPLY,
    ACTION_RESULT,
    ACTION_SUBTRACT
} from '../actions/operationBtnActions';

export type ActionAddACType = {
    type: typeof ACTION_ADD
}
export type ActionSubtractACType = {
    type: typeof ACTION_SUBTRACT
}
export type ActionMultiplyACType = {
    type: typeof ACTION_MULTIPLY
}
export type ActionDivideACType = {
    type: typeof ACTION_DIVIDE
}
export type ActionResultACType = {
    type: typeof ACTION_RESULT
}

export const actionAddAC = (): ActionAddACType => ({
    type: ACTION_ADD
})
export const actionSubtractAC = (): ActionSubtractACType => ({
    type: ACTION_SUBTRACT
})
export const actionMultiplyAC = (): ActionMultiplyACType => ({
    type: ACTION_MULTIPLY
})
export const actionDivideAC = (): ActionDivideACType => ({
    type: ACTION_DIVIDE
})
export const actionResultAC = (): ActionResultACType => ({
    type: ACTION_RESULT
})