import { useEffect, useState } from 'react';
import './Popup.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionChangeClosePopup } from '../../../store/reducer/popup';

interface PopupPropsI {
  content: string;
}

function Popup({ content }: PopupPropsI) {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    dispatch(actionChangeClosePopup());
  };

  useEffect(() => {
    const duration = 3000;
    setIsVisible(true);
    const timer = setTimeout(() => {
      dispatch(actionChangeClosePopup());
    }, duration);

    return () => clearTimeout(timer);
  }, [content, dispatch]);

  return (
    <div className='container'>
      <button
        type="button"
        className={isVisible ? 'popup popup-isVisible' : 'popup'}
        onClick={handleClick}
      >
        <span className="popup_content">{content}</span>
      </button>
    </div>
  );
}

export default Popup;
