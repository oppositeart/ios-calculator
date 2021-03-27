import {ACTION_ADD, ACTION_MULTIPLY} from './actions/actionBtnActions';
import {ValueObjType} from './reducers/mainReducer';

const mathOperations = (a:number, action:string, b: number):number => {
    switch (action) {
        case ACTION_ADD:
            return a + b;
        case ACTION_MULTIPLY:
            return a * b;
        default:
            return NaN
    }
}

const mathCalculation = (values: ValueObjType[]): number => {
    let result = values[0].value;
    debugger;
    for (let i = 1; i < values.length; i++) {
        result = mathOperations(result, values[i - 1].action, values[i].value);
    }
    return result;
}

export default mathCalculation;