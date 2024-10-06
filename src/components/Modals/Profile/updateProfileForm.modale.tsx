import { FormEvent, useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionSwitchProfileModal } from '../../../store/reducer/modal';
import { MemberStateI } from '../../../@types/memberStateI';
import {
  actionUpdateProfile,
  actionUploadProfileImage,
} from '../../../store/thunks/changeProfile';
import actionGetMembers from '../../../store/thunks/checkProfile';
import './updateProfileForm.scss';

interface EditProfileModalProps {
  profile: MemberStateI;
  closeModal: () => void;
}

interface UploadProfileImagePayload {
  base64Image: string;
  profileId: number;
}

function EditProfileModal({ profile, closeModal }: EditProfileModalProps) {
  const dispatch = useAppDispatch();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [updatedProfile, setUpdatedProfile] = useState(profile);
  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(
    null
  );
  const errorMessages = useAppSelector((state) => state.user.error);
  const accountId = useAppSelector((state) => state.user.id);
  const currentDate = format(new Date(), 'dd/MM/yyyy');
  const getFileName = (filePath: string) => {
    return filePath.replace(/^.*[\\/]/, '');
  };

  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.focus();
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (profileImageBase64 && updatedProfile.id !== null) {
      const resultAction = await dispatch(
        actionUploadProfileImage({
          base64Image: profileImageBase64,
          profileId: updatedProfile.id,
        })
      );
      if (actionUploadProfileImage.fulfilled.match(resultAction)) {
        setUpdatedProfile((prevProfile) => ({
          ...prevProfile,
          image: resultAction.payload,
        }));
      }
    }

    const resultAction = await dispatch(actionUpdateProfile(updatedProfile));
    if (actionUpdateProfile.fulfilled.match(resultAction)) {
      dispatch(actionSwitchProfileModal());
      dispatch(actionGetMembers({ id: accountId }));
      closeModal();
    }
  };

  useEffect(() => {
    if (accountId) {
      dispatch(actionGetMembers({ id: accountId }));
    }
  }, [dispatch, accountId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChangeBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        if (event.target && typeof event.target.result === 'string') {
          setProfileImageBase64(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundClick = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    if (event.target === backgroundRef.current) {
      dispatch(actionSwitchProfileModal());
      closeModal();
    }
  };

  return (
    <div
      className="profile_background"
      role="button"
      tabIndex={0}
      ref={backgroundRef}
      onClick={handleBackgroundClick}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          handleBackgroundClick(e);
        }
      }}
    >
      <div className="update_modal">
        <form onSubmit={handleSubmit}>
          <h1 className="update_modal_title">
            Modifier le profil de {updatedProfile.name}
          </h1>
          <div className="update_modal_container_inputs">
            <div className="profile_field">
              <label htmlFor="name">Nom</label>
              <input
                value={updatedProfile.name}
                onChange={handleChange}
                className="input_required"
                type="text"
                name="name"
                id="name"
                required
              />
            </div>
            <div className="profile_field birdthdate">
              <label htmlFor="birthdate">Date de naissance</label>
              <input
                value={
                  updatedProfile.birthdate
                    ? format(new Date(updatedProfile.birthdate), 'yyyy-MM-dd')
                    : ''
                }
                onChange={handleDateChange}
                className="input_required"
                type="date"
                min="01/01/1990"
                max={currentDate}
                name="birthdate"
                id="birthdate"
                required
              />
            </div>
            <div className="profile_field image">
              <label htmlFor="image">Modifier sa Photo de profil</label>
              <input
                onChange={handleImageChangeBase64}
                className="profile_field_image"
                type="file"
                accept=".jpeg, .jpg, .png, .webp"
                name="image"
                id="image"
              />
            </div>
            {profile.role === 'adult' && (
              <>
                <div className="profile_field">
                  <label htmlFor="email">Email</label>
                  <input
                    value={updatedProfile.email}
                    onChange={handleChange}
                    className="input_email"
                    type="email"
                    name="email"
                    id="email"
                    placeholder={updatedProfile.email || 'Entrer votre email'}
                  />
                </div>
                <div className="profile_field pin">
                  <label htmlFor="pin">Code Pin</label>
                  <input
                    value={updatedProfile.pin || ''}
                    onChange={handleChange}
                    className="input_pin"
                    type="password"
                    name="pin"
                    placeholder="****"
                    required
                  />
                </div>
              </>
            )}

            <span className="errorMessage">{errorMessages}</span>
            <div className="update_modal_profile_containerButton">
              <button type="submit">Enregistrer les modifications</button>
              <button type="button" onClick={() => closeModal()}>
                Annuler
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
