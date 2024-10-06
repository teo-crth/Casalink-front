import './RestrictionEnfant.scss';

import { MemberStateI } from '../../../@types/memberStateI';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionUpdateRole } from '../../../store/thunks/changeProfile';
import { actionChangeRole } from '../../../store/reducer/profile';

import { AppDispatch } from '../../../store';

interface RestrictionPropsI {
  member: MemberStateI;
}

function RestrictionEnfant({ member }: RestrictionPropsI) {
  const dispatch = useAppDispatch<AppDispatch>();

  const role = useAppSelector((state) => {
    const foundMember = state.profile.members.find((m) => m.id === member.id);
    return foundMember ? foundMember.role : 'child';
  });

  const handleCheckboxChange = () => {
    const newRole = role === 'child' ? 'adult' : 'child';
    dispatch(actionUpdateRole({ id: member.id, role: newRole }));
    dispatch(actionChangeRole({ id: member.id, role: newRole }));
  };

  return (
    <div className="settingPage_enfantDiv">
      <label
        htmlFor={`setting-modifTache-${member.id}`}
        className="label_restriction"
      >
        {member.name}
      </label>
      <input
        type="checkbox"
        id={`setting-modifTache-${member.id}`}
        className="settingPageDiv_checkboxRestrict"
        checked={role === 'child'}
        onChange={handleCheckboxChange}
      />
    </div>
  );
}

export default RestrictionEnfant;
