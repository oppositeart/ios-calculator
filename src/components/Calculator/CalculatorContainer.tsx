import React from 'react';
import {connect} from 'react-redux';
import {GlobalStateType} from '../../store/store';
import {btnPressAC} from '../../store/actions/numBtnActions';
import OutputSection from '../OutputSection/OutputSection';
import InputSection from '../InputSection/InputSection';

type StatePropsType = {
    output: number
}

type DispatchPropsType = {
    btnPressAC: typeof btnPressAC
}

type OwnPropsType = {};

type PropsType = StatePropsType & DispatchPropsType & OwnPropsType;

const CalculatorContainer: React.FC<PropsType> = ({output, btnPressAC}) => {
    return (
        <div>
            <OutputSection output={output} />
            <InputSection clickHandler={btnPressAC} />
        </div>
    );
}

const mapStateToProps = (state: GlobalStateType) => ({
    output: state.mainReducer.output
})

export default connect<StatePropsType, DispatchPropsType, OwnPropsType, GlobalStateType>(mapStateToProps, {btnPressAC})(CalculatorContainer);