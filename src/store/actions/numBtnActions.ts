export const BTN_PRESS = 'react-app/numBtnActions/BTN_PRESSED';

export type BtnPressActionType = {
    type: typeof BTN_PRESS,
    value: number
}

export const btnPressAC = (value: number): BtnPressActionType => ({
    type: BTN_PRESS,
    value
})