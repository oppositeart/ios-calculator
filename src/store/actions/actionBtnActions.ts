export const ACTION_ADD = 'react-app/actionBtnActions/ACTION_ADD';
export const ACTION_MULTIPLY = 'react-app/actionBtnActions/ACTION_MULTIPLY';
export const ACTION_RESULT = 'react-app/actionBtnActions/ACTION_RESULT';

type ActionAddType = {
    type: typeof ACTION_ADD
}
type ActionMultiplyType = {
    type: typeof ACTION_MULTIPLY
}
type ActionResultType = {
    type: typeof ACTION_RESULT
}

export const actionAddAC = (): ActionAddType => ({
    type: ACTION_ADD
})
export const actionMultiplyAC = (): ActionMultiplyType => ({
    type: ACTION_MULTIPLY
})
export const actionResultAC = (): ActionResultType => ({
    type: ACTION_RESULT
})