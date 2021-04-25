import {ACTION_ADD, ACTION_DIVIDE, ACTION_MULTIPLY, ACTION_SUBTRACT} from './actions/buttonsActions';
import {ValueObjType} from './reducers/mainReducer';

const mathOperations = (a: number, action: string, b: number): number => {
    switch (action) {
        case ACTION_ADD:
            return a + b;
        case ACTION_SUBTRACT:
            return a - b
        case ACTION_MULTIPLY:
            return a * b;
        case ACTION_DIVIDE:
            return a / b;
        default:
            return NaN
    }
}

const mathCalculation = (values: ValueObjType[]): number => {
    let result: number = values[0].value;
    for (let i: number = 1; i < values.length; i++) {
        result = mathOperations(result, values[i - 1].action, values[i].value);
    }
    // If number is float remove unnecessary chars after comma
    return Number.isInteger(result) ? result : Math.floor(result * 10000000) / 10000000;
}

export default mathCalculation;