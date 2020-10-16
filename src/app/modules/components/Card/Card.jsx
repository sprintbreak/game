import React, { useEffect, useState, useRef } from 'react'
import { CardContainer, CardWrapper, CardContent, CardFooter } from './styled';
import elsa from './../../../../assets/img/elsa.svg';
import elsaWhite from './../../../../assets/img/elsa-white.svg';
import { useOutsideClick } from './../../../shared/helpers/useOutsideClick';


const Card = ({ win = false, color = "default", selected = false, text = "", id = null, onClick = () => {} }) => {

    const [icon, setIcon] = useState(null);

    useEffect(() => {
        if(color === "roja") setIcon(elsaWhite);
        if(color === "blanca") setIcon(elsa);
    }, [icon])

    const [checked, setChecked] = useState(selected);
    
    const handleClick = () => {
        checked ? setChecked(false) : setChecked(true);
        onClick({
            id,
            content: text,
        });
    }
    
    const ref = useRef();
    useOutsideClick(ref, () => setChecked(false))

    return (
        // <CardContainer onClick={handleClick} className={`card ${color}`}>
        <CardContainer ref={ref} onClick={handleClick} className={`card ${color} ${ checked ? "checked" : "" } ${win ? "win" : ""}`}>
            <CardWrapper>
                <CardContent>
                    <p>{text}</p>
                </CardContent>
                <CardFooter>
                    { icon && <img src={icon} alt="elsa" width={75} /> }
                </CardFooter>
            </CardWrapper>
        </CardContainer>
    )
}

export default Card;