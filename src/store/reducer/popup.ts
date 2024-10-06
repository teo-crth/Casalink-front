import { createSlice } from '@reduxjs/toolkit';

interface PopupStateI {
  content: string;
  isOpen: boolean;
}

export const initialState: PopupStateI = {
  content: 'test',
  isOpen: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    actionChangeOpenPopup(state, action) {
      const { content } = action.payload;
      state.content = content;
      state.isOpen = true;
    },
    actionChangeClosePopup(state) {
      state.content = '';
      state.isOpen = false;
    },
  },
});

export const { actionChangeOpenPopup, actionChangeClosePopup } =
  popupSlice.actions;
export default popupSlice.reducer;
