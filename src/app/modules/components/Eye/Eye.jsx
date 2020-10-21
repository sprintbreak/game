import React from 'react'
import { EyeButton } from './styled'
import eyeWhite from './../../../../assets/img/eye-white.svg'
import eyeGrey from './../../../../assets/img/eye-grey.svg'


const Eye = ({ active = false, onClick = () => {} }) => {
    return (
        <EyeButton className={ active ? "active" : "" } onClick={onClick}>
            { active ? 
                (<img src={eyeWhite} alt="eye-white" width={50} />) :
                (<img src={eyeGrey} alt="eye-grey" width={50} />)
            }
        </EyeButton>
    )
}

export default Eye
