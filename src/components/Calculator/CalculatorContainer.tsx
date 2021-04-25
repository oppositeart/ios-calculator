import React from 'react';
import {connect} from 'react-redux';
import {GlobalStateType} from '../../store/store';
import {Calculator} from './';

type StatePropsType = {
    output: string,
    buttons: {[x: string]: any}[]
}

type DispatchPropsType = {
    dispatcherFn: (action: () => {}) => () => void
}

type OwnPropsType = {};

type PropsType = StatePropsType & DispatchPropsType & OwnPropsType;

const CalculatorContainer: React.FC<PropsType> = ({dispatcherFn, ...props}) => {
    const handleClick = (action: () => {}) => {
        dispatcherFn(action);
    }

    return (
        <Calculator handleClick={handleClick} {...props} />
    );
}

const mapStateToProps = (state: GlobalStateType): StatePropsType => ({
    output: state.mainReducer.stringValue,
    buttons: state.btnReducer.buttonsArray,
})

const mapDispatchToProps = (dispatch: any) => ({
    dispatcherFn: (action: () => {}) => dispatch(action)
})

export default connect<StatePropsType, DispatchPropsType, OwnPropsType, GlobalStateType>(mapStateToProps, mapDispatchToProps)(CalculatorContainer);