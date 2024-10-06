import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionSwitchLoginModal } from '../../../store/reducer/modal';
import actionCheckLogin from '../../../store/thunks/checkLogin';
import actionGetMembers from '../../../store/thunks/checkProfile';
import { actionChangeOpenPopup } from '../../../store/reducer/popup';

interface LoginFormProps {
  email: string;
  password: string;
  changeFieldSignin: (
    name: 'emailSignin' | 'passwordSignin',
    value: string
  ) => void;
}

function LoginForm({ email, password, changeFieldSignin }: LoginFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const errorMessages = useAppSelector((state) => state.user.error);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultAction = await dispatch(actionCheckLogin());
    if (actionCheckLogin.fulfilled.match(resultAction)) {
      dispatch(actionSwitchLoginModal());
      dispatch(actionGetMembers({ id: resultAction.payload.account.id }));
      dispatch(actionChangeOpenPopup({ content: 'Connexion réussie' }));
      navigate('/profil');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Connexion</h1>
      <div className="login_field">
        <input
          value={email}
          onChange={(e) => {
            changeFieldSignin('emailSignin', e.target.value);
          }}
          className="input_required"
          type="text"
          name="username"
          id="username"
          required
        />
        <label htmlFor="username">Nom d&apos;utilisateur</label>
      </div>
      <div className="login_field">
        <input
          value={password}
          onChange={(e) => {
            changeFieldSignin('passwordSignin', e.target.value);
          }}
          className="input_required"
          type="password"
          name="password"
          id="password"
          required
        />
        <label htmlFor="password">Mot de passe</label>
      </div>
      <span className="errorMessage">{errorMessages}</span>
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default LoginForm;
