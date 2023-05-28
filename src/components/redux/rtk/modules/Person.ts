import { createSlice } from '@reduxjs/toolkit';

// person slice
const personSlice = createSlice(
  {
    name: 'person',
    initialState: {
      key: '66',
      obj: {
        name: 'Jack',
        age: 12,
      },
    },
    reducers: {
      addAge(state, action) {
        const { payload } = action;
        state.obj.age += payload;
      },
    },
  },
);

export const { addAge } = personSlice.actions;

export default personSlice.reducer;
