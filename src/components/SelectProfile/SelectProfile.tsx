import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './SelectProfile.scss';
import actionGetMembers from '../../store/thunks/checkProfile';
import { MemberStateI } from '../../@types/memberStateI';
import {
  actionConnectProfile,
  actionSelectProfile,
} from '../../store/reducer/profile';
import baseURL from '../../utils/baseURL';
import { actionSwitchPinModal } from '../../store/reducer/modal.js';
import { addProfileToLocalStorage } from '../../localStorage/localStorage';
import { actionCleanTask } from '../../store/reducer/task';

function SelectProfile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const membersList = useAppSelector((state) => state.profile.members) || [];
  const accountId = useAppSelector((state) => state.user.id);
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);

  useEffect(() => {
    async function fetchMembers() {
      if (accountId) {
        dispatch(actionCleanTask());
        await dispatch(actionGetMembers({ id: accountId }));
      }
    }
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, accountId]);

  const handleSelect = (member: MemberStateI) => {
    dispatch(actionSelectProfile(member));
    if (member.role === 'adult') dispatch(actionSwitchPinModal());
    else if (member.role === 'child') {
      dispatch(actionConnectProfile(member));
      addProfileToLocalStorage(member);
      navigate('/');
    }
  };
  if (!accountId) {
    return null; // ici afficher la page 404
  }
  return (
    <div
      className={`${
        isDarkMode ? 'selectProfile_container-dark' : ''
      } selectProfile_container`}
    >
      <div
        className={`${
          isDarkMode ? 'selectProfile_container-dark_member' : ''
        } selectProfile_container_member`}
      >
        <h3
          className={`${
            isDarkMode ? 'selectProfile_container-dark_member_title' : ''
          } selectProfile_container_member_title`}
        >
          Qui est-ce ?
        </h3>
        <div
          className={`${
            isDarkMode ? 'selectProfile_container-dark_member_list' : ''
          } selectProfile_container_member_list`}
        >
          {membersList.map(
            (member) =>
              member.id !== null && (
                <div
                  key={member.id}
                  className={`${
                    isDarkMode ? 'selectProfile_container-dark_member_card' : ''
                  } selectProfile_container_member_card`}
                >
                  <button
                    type="button"
                    className="selectProfile_container_member_card_link"
                    onClick={() => handleSelect(member)}
                  >
                    selectione
                  </button>
                  <img
                    className="selectProfile_container_member_card_image"
                    src={
                      member.image
                        ? `${baseURL}/${member.image}`
                        : `${baseURL}/uploads/avatars/default-avatar.webp`
                    }
                    alt="avatar de l'utilisateur"
                  />
                  <h4
                    className={`${
                      isDarkMode
                        ? 'selectProfile_container-dark_member_card_name'
                        : ''
                    } selectProfile_container_member_card_name`}
                  >
                    {member.name}
                  </h4>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectProfile;
