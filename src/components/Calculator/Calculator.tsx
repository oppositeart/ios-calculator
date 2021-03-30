import React, {useEffect} from 'react';
import s from './Calculator.module.scss';
import OutputSection from '../OutputSection/OutputSection';
import ButtonsSection from '../ButtonsSection/ButtonsSection';

type PropsType = {
    output: string,
    buttons: {[x: string]: any},
    handleClick: (action: () => {}) => void
}

const Calculator: React.FC<PropsType> = ({output, buttons, handleClick}) => {
    useEffect(() => {
        window.addEventListener("resize", onResize);
        onResize();
        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, []);

    const onResize = () => {
       // Aspect ratio of iPhone 6/7/8 Plus
       if (window.innerWidth / window.innerHeight < 0.5625) {
            document.documentElement.style.fontSize = window.innerWidth * 0.0555555555555556 + 'px';
       } else {
          document.documentElement.style.fontSize = window.innerHeight * 0.03125 + 'px';
       }
    }
    return (
        <div className={s.container}>
            <div className={s.content}>
                <OutputSection output={output} />
                <ButtonsSection buttons={buttons} handleClick={handleClick} />
            </div>
        </div>
    );
}

export default Calculator;