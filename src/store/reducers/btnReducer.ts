import {createReducer} from '../createReducer';
import {
    actionAddAC,
    actionDivideAC,
    actionMultiplyAC,
    actionResultAC,
    actionSubtractAC
} from '../actionCreators/operationBtnAC';
import {btnPressAC} from '../actionCreators/numBtnAC';

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
        {name: 'AC', action: null}, {name: '+/-', action: null}, {name: '%', action: null}, {name: '÷', action: actionDivideAC()},
        {name: 'mc', action: null}, {name: 'mr', action: null}, {name: 'm-', action: null}, {name: 'm+', action: null},
        {name: '7', action: btnPressAC(7)}, {name: '8', action: btnPressAC(8)}, {name: '9', action: btnPressAC(9)}, {name: '×', action: actionMultiplyAC()},
        {name: '4', action: btnPressAC(4)}, {name: '5', action: btnPressAC(5)}, {name: '6', action: btnPressAC(6)}, {name: '-', action: actionSubtractAC()},
        {name: '1', action: btnPressAC(1)}, {name: '2', action: btnPressAC(2)}, {name: '3', action: btnPressAC(3)}, {name: '+', action: actionAddAC()},
        {name: '0', action: btnPressAC(0)}, {name: ',', action: null}, {name: '=', action: actionResultAC()}
    ]
}

export default createReducer<InitialStateType>(initialState, {

})