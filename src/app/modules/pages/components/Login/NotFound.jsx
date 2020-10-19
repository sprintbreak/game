import React from 'react'
import { Container } from './styled';
import { useHistory } from 'react-router-dom';
import Button from './../../../components/Button/Button';
import logo from './../../../../../assets/img/logo.png';
import deniedSvg from './../../../../../assets/img/access-denied.svg';

const NotFound = () => {

    const history = useHistory();

    return (
        <Container>
            <div className="wrapper">
                <div className="logo">
                    <a href="/game">
                        <img src={logo} alt="Sprint Break" />
                    </a>
                </div>
                <div className="notlogged-content">
                    <img src={deniedSvg} alt="access-denied-svg" width={150} />
                    <h4>404 - No se ha encontrado ninguna página</h4>
                </div>
                <Button onClick={() => history.replace("/")}>Volver</Button>
            </div>
        </Container>
    )
}

export default NotFound
