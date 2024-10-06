import { useEffect, useRef, useState } from 'react';
import { X } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux.js';
import { actionSwitchPinModal } from '../../../store/reducer/modal.js';
import {
  actionChangePinErrorMessage,
  actionResetErrorMessage,
} from '../../../store/reducer/user.js';
import './AskPin.scss';
import { actionConnectProfile } from '../../../store/reducer/profile.js';
import { addProfileToLocalStorage } from '../../../localStorage/localStorage.js';

function AskPin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const backgroundRef = useRef<HTMLDivElement>(null);

  const [inputValue, SetInputValue] = useState('');
  const backgroundTaskRef = useRef<HTMLDivElement>(null);
  const selectedProfile = useAppSelector(
    (state) => state.profile.memberSelected
  );

  useEffect(() => {
    if (backgroundTaskRef.current) {
      backgroundTaskRef.current.focus();
    }
  }, []);

  const errorMessage = useAppSelector((state) => state.user.error);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      selectedProfile &&
      selectedProfile.pin &&
      inputValue === selectedProfile.pin.toString()
    ) {
      navigate('/');
      dispatch(actionConnectProfile(selectedProfile));
      addProfileToLocalStorage(selectedProfile);
      dispatch(actionResetErrorMessage());
      return dispatch(actionSwitchPinModal());
    }
    return dispatch(actionChangePinErrorMessage());
  };

  const handleChangePin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    SetInputValue(value);
  };

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (event.target === backgroundRef.current) {
      dispatch(actionSwitchPinModal());
      dispatch(actionResetErrorMessage());
    }
  };

  return (
    <div
      className="formDiv"
      role="button"
      tabIndex={0}
      ref={backgroundRef}
      onClick={handleBackgroundClick}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          dispatch(actionSwitchPinModal());
        }
      }}
    >
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container_btns">
          <button
            type="button"
            className="form_container_btns_exit"
            onClick={() => {
              dispatch(actionSwitchPinModal());
            }}
          >
            <X />
          </button>
        </div>
        <label htmlFor="checkPin" className="form_label">
          Rentrez votre code PIN
        </label>
        <input
          onChange={handleChangePin}
          type="password"
          className="form_input_required"
          value={inputValue}
          placeholder="0000"
          required
        />
        {errorMessage && <div className="form_error">{errorMessage}</div>}
        <button type="submit" className="form_button">
          Valider
        </button>
      </form>
    </div>
  );
}

export default AskPin;
