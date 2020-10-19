import React, { useEffect, useState } from "react";
import Websocket from 'react-websocket';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons';
import { GoogleLogin } from 'react-google-login';
import { Container, LoginsContainer } from './styled';
import { TextField } from '@material-ui/core';
import { login, logout, register, setSessionState } from './../../../store/actions/loginActions';
import GitHubLogin from 'react-github-login';
import Button from './../../../components/Button/Button';
import { Alert } from '@material-ui/lab';
import logo from './../../../../../assets/img/logo.png';
import config from '../../../../config/config';
// import { useForm } from 'react-hook-form'

const Login = props => {

  const { error, id, loginAction, registerLogin, setSessionState, logged } = props;
  // const { register, handleSubmit, watch, errors } = useForm();
  // const formRef = React.useRef(null);

  const history = useHistory();
  const [loginLocal, setLoginLocal] = useState(false);

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [inputErrors, setInputErrors] = useState({
    user: false,
    pass: false,
    email: false
  });
  // loginRegister reemplaza el 'register' del ejemplo
  const [loginRegister, setLoginRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  React.useEffect(() => {
    if(logged) {
      // setWebsocketState(ws.current);
      history.replace("/home");
    }
  }, [logged]);

  const validateInputs = () => {
    if(user === "" && pass === "") {
      setInputErrors({ ...inputErrors, user: true, pass: true })
      return false;
    }
    if(user === "" || pass === "") {
      if(user === '') {
        setInputErrors({ ...inputErrors, user: true })
        return false;
      }
      if(pass === '') {
        setInputErrors({ ...inputErrors, pass: true })
        return false;
      }
    } else {
      return true;
    }
  }

  const validateEmail = () => {
    if(email === "") {
      setInputErrors({ ...inputErrors, email: true })
      return false;
    } else {
      return true;
    }
  }

  const handleLoginWithUser = () => {
    if(validateInputs()) {
      setSessionState({
        origin: 'santander',
        nickname: user
      })
      loginAction(id, {
        origin: 'santander',
        data: { 
          username: user, 
          password: pass 
        } 
      })
    }
  }

  const handleRegisterClick = () => {
    if(validateInputs() && validateEmail()) {
      setLoginRegister(false);
      registerLogin(id, { data: {
        username: user,
        password: pass,
        email,
        fullname: ''
      }}).then(() => setRegisterSuccess(true))
    }
  }

  const handleGoogleLoginSuccess = response => {
    setSessionState({
      origin: "google",
      origin_id: response.googleId,
      token: response.idToken
    })
    loginAction(id, { origin: 'google', data: response })
  }
  const handleGoogleLoginFailure = response => {
    console.error(JSON.stringify(response));
  }

  const handleGitHubLoginSuccess = response => {
    console.log(JSON.stringify(response))
    setSessionState({
      origin: "github",
      code: response.code,
    })
    loginAction(id, { origin: 'github', data: response })
  }
  const handleGitHubLoginFailure = response => {
    console.error(JSON.stringify(response));
  }

  return (
      <Container>
        <div className="wrapper">
          <div className="logo">
            <a href="/game">
              <img src={logo} alt="Sprint Break" />
            </a>
          </div>
          { !loginLocal ? (<LoginsContainer>

            <h4>Elegí cómo ingresar:</h4>

            <GoogleLogin
              clientId="245942166200-hfb8qrm6m9cgip71l5iuteujhnriidn9.apps.googleusercontent.com"
              onSuccess={handleGoogleLoginSuccess} 
              onFailure={handleGoogleLoginFailure}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <GoogleLoginButton onClick={renderProps.onClick} />
              )}
            />
            <GitHubLogin
              className="github-button"
              clientId="fd748d5a725cf8407786"
              onSuccess={handleGitHubLoginSuccess}
              onFailure={handleGitHubLoginFailure}
            >
              <GithubLoginButton />
            </GitHubLogin>
           

          </LoginsContainer>) : null }

          { !loginLocal ?
            (<Button className="new-user" onClick={()=>setLoginLocal(true)}>Ingresar usuario</Button>) : null }

          { loginLocal ? 
            (<div className="form">
              <h4>Ingresá tus datos:</h4>
              <div className="input-group">              
                <TextField
                  onChange={e => setUser(e.target.value)}
                  id="username"
                  label="Nombre de usuario"
                  name="username"
                  autoComplete="username"
                  error={inputErrors.user}
                  helperText={inputErrors.user ? 'Este campo es requerido' : null}
                />
                <TextField
                  onChange={e => setPass(e.target.value)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={inputErrors.pass}
                  helperText={inputErrors.pass ? 'Este campo es requerido' : null}
                />
                { loginRegister ? (<TextField
                  onChange={e => setEmail(e.target.value)}
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  error={inputErrors.email}
                  helperText={inputErrors.email ? 'Este campo es requerido' : null}
                />) : null }
                { !loginRegister && <Button className="button" onClick={handleLoginWithUser}>Entrar</Button> }
                { !loginRegister && <Button className="button" onClick={() => setLoginRegister(true)}>Soy nuevo</Button> }
                { loginRegister && <Button className="button" onClick={handleRegisterClick}>Registrarme</Button> }
                { loginRegister && <Button className="button" onClick={() => setLoginRegister(false)}>Cancelar</Button> }
                </div>
                { error && <Alert severity="error">{error}</Alert> }
                { registerSuccess && <Alert severity="success">Registro completado. Ya podés ingresar.</Alert> }
            </div>) : null }
        </div>
      </Container>
  );
}

const mapStateToProps = state => {
  return {
    error: state.appReducer.error,
    id: state.appReducer.user_id,
    logged: state.appReducer.logged
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginAction: (id, data) => dispatch(login(id, data)),
    logoutAction: (id, session) => dispatch(logout(id, session)),
    registerLogin: (id, data) => dispatch(register(id, data)),
    setSessionState: (data) => dispatch(setSessionState(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
