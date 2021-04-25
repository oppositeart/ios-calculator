import React, {useEffect} from 'react';
import s from './Calculator.module.scss';
import {OutputSection} from '../OutputSection';
import {ButtonsSection} from '../ButtonsSection';

type PropsType = {
    output: string,
    btnArray: {[x: string]: any},
    handleClick: (action: () => {}) => void
}

const Calculator: React.FC<PropsType> = ({output, btnArray, handleClick}) => {
    // Add resize listener
    useEffect(() => {
        window.addEventListener("resize", onResize);
        onResize();
        return () => {
            window.removeEventListener("resize", onResize);
        }

    }, []);
    // Prevent touch zoom
    useEffect(() => {
        window.addEventListener('touchmove', preventZoom, { passive: false });
        return () => {
            window.removeEventListener('touchmove', preventZoom);
        }

    }, []);

    const onResize = () => {
       // Aspect ratio of iPhone 6/7/8 Plus (width: 414; height: 736; font-size: 24px)
       if (window.innerWidth / window.innerHeight < 0.5625) {
            document.documentElement.style.fontSize = window.innerWidth * 0.0579 + 'px';
       } else {
          document.documentElement.style.fontSize = window.innerHeight * 0.0326 + 'px';
       }
    }
    const preventZoom = (event: any) => {
        event.preventDefault();
    }

    return (
        <div className={s.container}>
            <div className={s.content}>
                <OutputSection output={output} />
                <ButtonsSection btnArray={btnArray} handleClick={handleClick} />
            </div>
        </div>
    );
}

export default Calculator;