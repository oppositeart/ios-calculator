import React from 'react';
import {connect} from 'react-redux';
import {GlobalStateType} from '../../store/store';
import OutputSection from '../OutputSection/OutputSection';
import InputSection from '../InputSection/InputSection';
import {BtnObjType} from '../../store/reducers/btnReducer';

type StatePropsType = {
    output: number,
    buttons: BtnObjType[]
}

type DispatchPropsType = {
    dispatcherFn: any
}

type OwnPropsType = {};

type PropsType = StatePropsType & DispatchPropsType & OwnPropsType;

const CalculatorContainer: React.FC<PropsType> = ({output, buttons, dispatcherFn}) => {
    // TODO: Choose type
    const handleClick = (action: any) => {
        dispatcherFn(action);
    }

    return (
        <div>
            <OutputSection output={output} />
            <InputSection buttons={buttons} handleClick={handleClick} />
        </div>
    );
}

const mapStateToProps = (state: GlobalStateType): StatePropsType => ({
    output: state.mainReducer.currentValue,
    buttons: state.btnReducer.buttons
})

const mapDispatchToProps = (dispatch: any) => ({
    dispatcherFn: (action: any) => dispatch(action)
})

export default connect<StatePropsType, DispatchPropsType, OwnPropsType, GlobalStateType>(mapStateToProps, mapDispatchToProps)(CalculatorContainer);