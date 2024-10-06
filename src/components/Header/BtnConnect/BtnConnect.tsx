import { useAppDispatch } from '../../../hooks/redux';
import {
  actionSetModeLoginModal,
  actionSwitchLoginModal,
} from '../../../store/reducer/modal';

function BtnConnect() {
  const dispatch = useAppDispatch();
  return (
    <button
      className="header_btn btn-login"
      type="button"
      onClick={() => {
        dispatch(actionSetModeLoginModal('signin'));
        dispatch(actionSwitchLoginModal());
      }}
    >
      <span>Se connecter</span>
    </button>
  );
}

export default BtnConnect;
