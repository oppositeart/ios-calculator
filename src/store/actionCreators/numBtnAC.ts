import {BTN_PRESS} from '../actions/numBtnActions';

export type BtnPressActionACType = {
    type: typeof BTN_PRESS,
    value: number
}

export const btnPressAC = (value: number): BtnPressActionACType => ({
    type: BTN_PRESS,
    value
})