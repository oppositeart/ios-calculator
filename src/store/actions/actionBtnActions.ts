export const ACTION_ADD = 'react-app/actionBtnActions/ACTION_ADD';

type ActionAddType = {
    type: typeof ACTION_ADD
}

export const actionAddAC = (): ActionAddType => ({
    type: ACTION_ADD
})