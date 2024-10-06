import { FormEvent, useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionSwitchProfileModal } from '../../../store/reducer/modal';
import { actionAddProfile } from '../../../store/thunks/changeProfile';
import actionGetMembers from '../../../store/thunks/checkProfile';
import './addProfile.scss';
import { MemberStateI } from '../../../@types/memberStateI';

interface AddProfileModalProps {
  onClose: () => void;
}

function AddProfileModal({ onClose }: AddProfileModalProps) {
  const dispatch = useAppDispatch();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const errorMessages = useAppSelector((state) => state.user.error);
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const accountId = useAppSelector((state) => state.user.id);

  // Add state for new profile data
  const [newProfile, setNewProfile] = useState<MemberStateI>({
    id: 0,
    name: '',
    birthdate: '2000-01-01',
    score: 0,
    tasks: [],
    image: '',
    role: 'child',
    email: '',
    pin: 0,
    isChecked: false,
  });

  // State to check if the role is adult
  const [isAdultChecked, setIsAdultChecked] = useState(false);

  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Si le champ de date est modifié, on le formate correctement
    if (name === 'birthdate') {
      // Transformer la date au format jj/mm/aaaa en jj-mm-aaaa
      const formattedDate = value.replace(/\//g, '-');
      setNewProfile((prevProfile) => ({
        ...prevProfile,
        [name]: formattedDate,
      }));
    } else {
      setNewProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
    if (name === 'role') {
      setIsAdultChecked(value === 'adult');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultAction = await dispatch(actionAddProfile(newProfile));
    if (actionAddProfile.fulfilled.match(resultAction)) {
      dispatch(actionSwitchProfileModal());
      dispatch(actionGetMembers({ id: accountId }));
      onClose();
    }
  };

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (event.target === backgroundRef.current) {
      dispatch(actionSwitchProfileModal());
      onClose();
    }
  };

  return (
    <div
      className="add_background"
      role="button"
      tabIndex={0}
      ref={backgroundRef}
      onClick={handleBackgroundClick}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          dispatch(actionSwitchProfileModal());
          onClose();
        }
      }}
    >
      <div className="add_modal">
        <form onSubmit={handleSubmit}>
          <h1 className="add_modal_title">Ajouter un nouveau profil</h1>
          <div className="add_modal_container_inputs">
            <div className="profile_field">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                className="input_required"
                id="name"
                name="name"
                value={newProfile.name}
                onChange={handleChange}
                required
                placeholder="Nom du profil"
              />
            </div>
            <div className="profile_field birthdate">
              <label htmlFor="birthdate">Date de naissance</label>
              <input
                className="input_required"
                type="date"
                name="birthdate"
                id="birthdate"
                min="1990-01-01"
                max={currentDate}
                value={format(new Date(newProfile.birthdate), 'yyyy-MM-dd')}
                onChange={handleChange}
                required
              />
            </div>
            <div className="profile_field radio">
              <label htmlFor="role">Type de profil</label>
              <div className="profile_field_role">
                <div className="profile_field_role_adult">
                  <input
                    type="radio"
                    name="role"
                    id="Adulte"
                    value="adult"
                    onChange={handleChange}
                    checked={newProfile.role === 'adult'}
                    className="input_checkbox_adult"
                  />
                  <span className="input_checkbox_adult_title">Adulte</span>
                </div>
                <div className="profile_field_role_child">
                  <input
                    type="radio"
                    name="role"
                    id="Enfant"
                    value="child"
                    onChange={handleChange}
                    checked={newProfile.role === 'child'}
                    className="input_checkbox_child"
                  />
                  <span className="input_checkbox_child_title">Enfant</span>
                </div>
              </div>
            </div>
            {isAdultChecked && (
              <>
                <div className="profile_field">
                  <label htmlFor="email">Email</label>
                  <input
                    className="input_email"
                    type="email"
                    name="email"
                    id="email"
                    value={newProfile.email}
                    onChange={handleChange}
                    placeholder="martin.l@gmail.com"
                  />
                </div>
                <div className="profile_field pin">
                  <label htmlFor="pin">Code Pin</label>
                  <input
                    className="input_pin"
                    type="password"
                    name="pin"
                    value={newProfile.pin}
                    onChange={handleChange}
                    placeholder="0000"
                    required
                  />
                </div>
              </>
            )}
            <span className="errorMessage">{errorMessages}</span>
            <div className="add_modal_profile_containerButton">
              <button type="submit">Ajouter le profil</button>
              <button type="button" onClick={() => onClose()}>
                Annuler
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProfileModal;
