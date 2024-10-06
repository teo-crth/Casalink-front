import modalReducer from './modal';
import userReducer from './user';
import profileReducer from './profile';
import taskSlice from './task';
import popupSlice from './popup';

const reducer = {
  user: userReducer,
  modal: modalReducer,
  profile: profileReducer,
  popup: popupSlice,
  task: taskSlice,
};

export default reducer;
