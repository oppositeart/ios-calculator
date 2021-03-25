export const BTN_PRESS = 'react-app/numBtnActions/BTN_PRESSED';

export type btnPressActionType = {
    type: typeof BTN_PRESS,
    value: number
}

export const btnPressAC = (value: number): btnPressActionType => ({
    type: BTN_PRESS,
    value
})