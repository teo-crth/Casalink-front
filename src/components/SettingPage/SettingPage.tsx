import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import RestrictionEnfant from './RestrictionEnfant/RestrictionEnfant';
import './SettingPage.scss';
import './RestrictionEnfant/RestrictionEnfant.scss';
import actionGetMembers from '../../store/thunks/checkProfile';

function SettingPage() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.modal.darkModeIsActive);
  const accountId = useAppSelector((state) => state.user.id);
  // console.log('je suis accountId', accountId);
  const members = useAppSelector((state) => state.profile.members);
  // const childMembers = useAppSelector((state) => state.profile.members)

  useEffect(() => {
    if (accountId) {
      dispatch(actionGetMembers({ id: accountId }));
    }
  }, [dispatch, accountId]);

  return (
    <div className={`${isDarkMode ? 'settingPage-dark' : ''} settingPage`}>
      <div className="settingPage_notifDiv">
        <h2 className="settingPage_title">Notification</h2>
        <label htmlFor="setting-notif" className="settingPage_notifDiv_label">
          Activer les notifications
        </label>
        <input
          type="checkbox"
          id="setting-notif"
          className="settingPage_checkboxNotif"
        />
      </div>
      <div className="settingPage_restrictionDiv">
        <h2 className="settingPage_restrictionDiv_title">Restrictions</h2>
        <h3 className="settingPage_restrictionDiv_subtitle settingPage-dark_restrictionDiv_subtitle">
          Les profils étant limités en droits
        </h3>
        {members.map((member) => (
          <RestrictionEnfant key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default SettingPage;
