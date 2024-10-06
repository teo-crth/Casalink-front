import { useEffect, useRef } from 'react';
import './Login.scss';
import { X } from 'react-feather';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  actionSetModeLoginModal,
  actionSwitchLoginModal,
} from '../../../store/reducer/modal';
import {
  actionChangeCredentialsSignin,
  actionChangeCredentialsSignup,
  actionResetCredential,
  actionResetErrorMessage,
} from '../../../store/reducer/user';

function Login() {
  const dispatch = useAppDispatch();
  const backgroundRef = useRef<HTMLDivElement>(null);

  const modLoginModal = useAppSelector((state) => state.modal.loginModalIsMode);

  // Input controlled by redux for the login form
  const { emailSignin, passwordSignin } = useAppSelector(
    (state) => state.user.credentials.login
  );

  // Input controlled by redux for the signup form
  const { email, password, passwordConfirm, firstname, lastname } =
    useAppSelector((state) => state.user.credentials.signup);

  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.focus();
    }
  }, []);

  // Prevent the click propagation
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  return (
    <div
      className="login_background"
      role="button"
      tabIndex={0}
      ref={backgroundRef}
      onClick={() => {
        dispatch(actionSwitchLoginModal());
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') dispatch(actionSwitchLoginModal());
      }}
    >
      <div
        className="login_modal"
        role="presentation"
        onClick={handleModalClick}
      >
        <button
          type="button"
          className="exit_button"
          onClick={() => {
            dispatch(actionSwitchLoginModal());
          }}
        >
          <X />
        </button>
        {modLoginModal === 'signin' && (
          <LoginForm
            email={emailSignin}
            password={passwordSignin}
            changeFieldSignin={(name, value) => {
              dispatch(
                actionChangeCredentialsSignin({
                  name,
                  value,
                })
              );
            }}
          />
        )}
        {modLoginModal === 'signup' && (
          <SignupForm
            email={email}
            password={password}
            passwordConfirm={passwordConfirm}
            firstname={firstname}
            lastname={lastname}
            changeFieldSignup={(name, value) => {
              dispatch(
                actionChangeCredentialsSignup({
                  name,
                  value,
                })
              );
            }}
          />
        )}
        {modLoginModal === 'signin' ? (
          <button
            className="login_modal_changeFormBtn"
            type="button"
            onClick={() => {
              dispatch(actionSetModeLoginModal('signup'));
              dispatch(actionResetErrorMessage());
              dispatch(actionResetCredential());
            }}
          >
            Pas de compte ?
          </button>
        ) : (
          <button
            className="login_modal_changeFormBtn"
            type="button"
            onClick={() => {
              dispatch(actionSetModeLoginModal('signin'));
              dispatch(actionResetErrorMessage());
              dispatch(actionResetCredential());
            }}
          >
            Déjà un compte ?
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
