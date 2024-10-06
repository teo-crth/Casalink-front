import React, { useEffect, useMemo, useState } from 'react';
import './ProfilePage.scss';
import { format, set } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { MemberStateI } from '../../@types/memberStateI';
import actionGetMembers from '../../store/thunks/checkProfile';
import actionFetchTasks from '../../store/thunks/fetchTasksByProfile';
import DeleteProfileModal from '../Modals/Profile/deleteProfile';
import EditProfileModal from '../Modals/Profile/updateProfileForm.modale';
import AddProfileModal from '../Modals/Profile/addProfile';
import baseURL from '../../utils/baseURL';
import { actionDeleteProfile } from '../../store/thunks/changeProfile';

function ProfilePage() {
  const dispatch = useAppDispatch();
  const accountId = useAppSelector((state) => state.user.id);
  const membersList = useAppSelector((state) => state.profile.members);
  const tasksList = useAppSelector((state) => state.profile.tasks);
  const [cardSelected, setCardSelected] = useState<MemberStateI>(
    membersList[0]
  );
  const selectedProfile = useAppSelector(
    (state) => state.profile.memberSelected
  );
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  useEffect(() => {
    if (accountId) {
      dispatch(actionGetMembers({ id: accountId }));
    }
  }, [dispatch, accountId]);

  useEffect(() => {
    if (membersList.length > 0 && membersList[0]?.id !== undefined) {
      dispatch(
        actionFetchTasks({
          id: membersList[0].id,
          profile_id: null,
        })
      );
    }
  }, [dispatch, membersList]);

  const tasksByMember = useMemo(() => {
    const result = membersList.reduce((acc, member) => {
      if (member.id !== null) {
        const memberTasks = tasksList.filter((task) => {
          return task.profile_id === member.id;
        });
        acc[member.id] = memberTasks;
      }
      return acc;
    }, {} as Record<number, typeof tasksList>);
    return result;
  }, [membersList, tasksList]);

  const handleDeleteClick = (member: MemberStateI) => {
    setCardSelected(member);
    setDeleteModalIsOpen(true);
  };

  const handleEditClick = (member: MemberStateI) => {
    setCardSelected(member);
    setEditModalIsOpen(true);
  };

  const handleAddClick = () => {
    setAddModalIsOpen(true);
  };

  const handleClickOnOtherMemberCard = (member: MemberStateI) => {
    setCardSelected(member);
    setEditModalIsOpen(true);
    console.log('Carte selectionnée', cardSelected);
    console.log('Membre au click sur une autre carte', member);
  };

  const handleCloseModal = () => {
    setDeleteModalIsOpen(false);
    setEditModalIsOpen(false);
    setAddModalIsOpen(false);
  };

  if (!Array.isArray(membersList)) {
    return <div>Erreur : les membres ne sont pas disponibles.</div>;
  }

  return (
    <div
      className={`${
        isDarkMode ? 'profilePage_container-dark' : ''
      } profilePage_container`}
    >
      <div
        className={`${
          isDarkMode ? 'profilePage_container-dark_presentation-dark' : ''
        } profilePage_container_presentation`}
      >
        <h2
          className={`${
            isDarkMode ? 'profilePage_container-dark_presentation_title' : ''
          } profilePage_container_presentation_title`}
        >
          Mon foyer
        </h2>
      </div>
      <div
        className={`${
          isDarkMode ? 'profilePage_container-dark_member' : ''
        } profilePage_container_member`}
      >
        <h3
          className={`${
            isDarkMode ? 'profilePage_container-dark_member_title' : ''
          } profilePage_container_member_title`}
        >
          Membres
        </h3>
        <div
          className={`${
            isDarkMode ? 'profilePage_container-dark_member_list' : ''
          } profilePage_container_member_list`}
        >
          {membersList.map(
            (member) =>
              member.id !== null && (
                <div
                  key={member.id}
                  className="profilePage_container_member_card profilePage_container-dark_member_card"
                >
                  <div className="profilePage_container_member_card_icones profilePage_container-dark_member_card_icones">
                    {selectedProfile?.role === 'adult' && (
                      <>
                        {selectedProfile.id !== member.id && (
                          <FaTrashAlt
                            className="profilePage_container_member_card_iconDelete profilePage_container-dark_member_card_iconDelete"
                            onClick={() => handleDeleteClick(member)}
                          />
                        )}
                        {(member.role === 'child' ||
                          selectedProfile.id === member.id) && (
                          <FaEdit
                            className="profilePage_container_member_card_iconEdit profilePage_container-dark_member_card_iconEdit"
                            onClick={() => handleEditClick(member)}
                          />
                        )}
                      </>
                    )}
                    {selectedProfile?.role === 'child' &&
                      selectedProfile.id === member.id && (
                        <FaEdit
                          className="profilePage_container_member_card_iconEdit profilePage_container-dark_member_card_iconEdit"
                          onClick={() => handleEditClick(member)}
                        />
                      )}
                  </div>
                  <img
                    className="profilePage_container_memberCard_image"
                    src={
                      member.image
                        ? `${baseURL}/${member.image}`
                        : `${baseURL}/uploads/avatars/default-avatar.webp`
                    }
                    alt={`avatar de l'utilisateur ${member.name}`}
                  />
                  <h4 className="profilePage_container_member_card_name profilePage_container-dark_member_card_name">
                    {member.name}
                  </h4>
                  {member.birthdate && (
                    <h5 className="profilePage_container_member_card_birthday profilePage_container-dark_member_card_birthday">
                      Anniversaire :{' '}
                      {format(new Date(member.birthdate), 'dd MMMM yyyy', {
                        locale: fr,
                      })}
                    </h5>
                  )}
                  <h5 className="profilePage_container_member_card_score profilePage_container-dark_member_card_score">
                    Score : {member.score}
                  </h5>
                  <h5 className="profilePage_container_member_card_task-to_do profilePage_container-dark_member_card_task-to_do">
                    Tâches à faire :
                  </h5>
                  {tasksByMember[member.id] &&
                  tasksByMember[member.id].length > 0 ? (
                    tasksByMember[member.id].map((task) => (
                      <div
                        key={task.id}
                        className="profilePage_container_member_card_task profilePage_container-dark_member_card_task"
                      >
                        <div className="profilePage_container_member_card_task_headerDate profilePage_container-dark_member_card_task_headerDate">
                          <p className="profilePage_container_member_card_task_date profilePage_container-dark_member_card_task_date">
                            {format(new Date(task.start_date), 'dd MMMM yyyy', {
                              locale: fr,
                            })}
                          </p>
                        </div>
                        <div className="profilePage_container_member_card_task_containerName profilePage_container-dark_member_card_task_containerName">
                          <h6 className="profilePage_container_member_card_task_name profilePage_container-dark_member_card_task_name">
                            - {task.name}
                          </h6>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Aucune tâche assignée.</p>
                  )}
                </div>
              )
          )}
          {selectedProfile?.role === 'adult' && (
            <div className="profilePage_container_member_card profilePage_container-dark_member_card">
              <img
                className="profilePage_container_memberCard_image addProfile_img"
                src={`${baseURL}/uploads/avatars/default-avatar.webp`}
                alt="avatar de l'utilisateur"
              />
              <h4 className="profilePage_container_member_card_name profilePage_container-dark_member_card_name">
                Ajouter un Profil
              </h4>
              <FaPlusCircle
                className="profilePage_container_member_card_iconAddProfile profilePage_container-dark_member_card_iconAddProfile"
                onClick={() => handleAddClick()}
              />
            </div>
          )}
        </div>
      </div>
      {selectedProfile && deleteModalIsOpen && (
        <DeleteProfileModal
          profile={cardSelected}
          closeModal={handleCloseModal}
        />
      )}
      {selectedProfile && editModalIsOpen && (
        <EditProfileModal
          profile={cardSelected}
          closeModal={handleCloseModal}
        />
      )}
      {addModalIsOpen && <AddProfileModal onClose={handleCloseModal} />}
    </div>
  );
}

export default ProfilePage;
