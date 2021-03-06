import {
    ACTION_ADD, ACTION_CLEAR,
    ACTION_DIVIDE, ACTION_MEM_ADD, ACTION_MEM_CLEAR, ACTION_MEM_READ, ACTION_MEM_SUBTRACT,
    ACTION_MULTIPLY, ACTION_NUM_PRESS,
    ACTION_PERCENT,
    ACTION_RESULT,
    ACTION_SUBTRACT, ACTION_TOGGLE
} from '../actions/buttonsActions';
import {NumBtnValueType} from '../btnObjects';


export type ActionNumBtnPressACType = {
    type: typeof ACTION_NUM_PRESS,
    value: NumBtnValueType
}
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
export type ActionPercentACType = {
    type: typeof ACTION_PERCENT
}
export type ActionResultACType = {
    type: typeof ACTION_RESULT
}
export type ActionToggleACType = {
    type: typeof ACTION_TOGGLE
}
export type ActionClearACType = {
    type: typeof ACTION_CLEAR
}
export type ActionMemClearACType = {
    type: typeof ACTION_MEM_CLEAR
}
export type ActionMemReadACType = {
    type: typeof ACTION_MEM_READ
}
export type ActionMemSubtractACType = {
    type: typeof ACTION_MEM_SUBTRACT
}
export type ActionMemAddACType = {
    type: typeof ACTION_MEM_ADD
}

export const actionNumPressAC = (value: NumBtnValueType): ActionNumBtnPressACType => ({
    type: ACTION_NUM_PRESS,
    value
})
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
export const actionPercentAC = (): ActionPercentACType => ({
    type: ACTION_PERCENT
})
export const actionResultAC = (): ActionResultACType => ({
    type: ACTION_RESULT
})
export const actionToggleAC = (): ActionToggleACType => ({
    type: ACTION_TOGGLE
})
export const actionClearAC = (): ActionClearACType => ({
    type: ACTION_CLEAR
})
export const actionMemAddAC = (): ActionMemAddACType => ({
    type: ACTION_MEM_ADD
})
export const actionMemSubtractAC = (): ActionMemSubtractACType => ({
    type: ACTION_MEM_SUBTRACT
})
export const actionMemReadAC = (): ActionMemReadACType => ({
    type: ACTION_MEM_READ
})
export const actionMemClearAC = (): ActionMemClearACType => ({
    type: ACTION_MEM_CLEAR
})
