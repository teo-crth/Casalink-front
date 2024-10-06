import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { SignupCredentialsI } from '../../../@types/signupCredentials';
import actionCheckSignup from '../../../store/thunks/checkSignup';
import { actionSwitchLoginModal } from '../../../store/reducer/modal';
import {
  validateEmail,
  validePassword,
  valideName,
} from '../../../utils/regexValidator';
import { actionChangeOpenPopup } from '../../../store/reducer/popup';

interface SignupFormProps extends SignupCredentialsI {
  changeFieldSignup: (
    name: 'email' | 'password' | 'passwordConfirm' | 'firstname' | 'lastname',
    value: string
  ) => void;
}
function SignupForm({
  email,
  password,
  passwordConfirm,
  firstname,
  lastname,
  changeFieldSignup,
}: SignupFormProps) {
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const errorMessages = useAppSelector((state) => state.user.error);

  const handleValidation = (name: string, value: string) => {
    let error = '';
    if (name === 'email' && !validateEmail(value)) {
      error = 'Email invalide';
    } else if (name === 'password' && !validePassword(value)) {
      error = `Mot de passe invalide`;
    } else if (name === 'passwordConfirm' && value !== password) {
      error = `Mot de passe différent`;
    } else if (
      (name === 'firstname' || name === 'lastname') &&
      !valideName(value)
    ) {
      error = 'Nom invalide';
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (name: keyof SignupCredentialsI, value: string) => {
    changeFieldSignup(name, value);
    handleValidation(name, value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultAction = await dispatch(actionCheckSignup());
    if (actionCheckSignup.fulfilled.match(resultAction)) {
      dispatch(actionChangeOpenPopup({ content: 'Inscription réussis' }));
      dispatch(actionSwitchLoginModal());
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Inscription</h1>
      <div className="login_field">
        <input
          value={email}
          onChange={(e) => {
            handleChange('email', e.target.value);
          }}
          className="input_required"
          type="text"
          name="username"
          id="username"
          required
        />
        <label htmlFor="username">Email</label>
        {errors.email && <span className="errorMessage">{errors.email}</span>}
      </div>
      <div className="login_field">
        <input
          value={password}
          onChange={(e) => {
            handleChange('password', e.target.value);
          }}
          className="input_required"
          type="password"
          name="password"
          id="password"
          required
        />
        <label htmlFor="password">Mot de passe</label>
        {errors.password && (
          <span className="errorMessage">{errors.password}</span>
        )}
      </div>
      <div className="login_field">
        <input
          value={passwordConfirm}
          onChange={(e) => {
            handleChange('passwordConfirm', e.target.value);
          }}
          className="input_required"
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          required
        />
        <label htmlFor="passwordConfirm">Confirmation</label>
        {errors.passwordConfirm && (
          <span className="errorMessage">{errors.passwordConfirm}</span>
        )}
      </div>
      <div className="login_field">
        <input
          value={firstname}
          onChange={(e) => {
            handleChange('firstname', e.target.value);
          }}
          className="input_required"
          type="text"
          name="firstname"
          id="firstname"
          required
        />
        <label htmlFor="firstname">Prénom</label>
        {errors.firstname && (
          <span className="errorMessage">{errors.firstname}</span>
        )}
      </div>
      <div className="login_field">
        <input
          value={lastname}
          onChange={(e) => {
            handleChange('lastname', e.target.value);
          }}
          className="input_required"
          type="text"
          name="lastname"
          id="lastname"
          required
        />
        <label htmlFor="lastname">Nom</label>
        {errors.lastname && (
          <span className="errorMessage">{errors.lastname}</span>
        )}
      </div>
      <span className="errorMessage">{errorMessages}</span>
      <button type="submit">S&apos;inscrire</button>
    </form>
  );
}

export default SignupForm;
