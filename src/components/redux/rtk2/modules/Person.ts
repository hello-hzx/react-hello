import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request1 } from "../../../axios/service";
import { Commit } from "../../../axios/service/module/User";

type PersonStateType = {
  key: string;
  obj: {
    name: string;
    age: number;
  };
};

const initialState: PersonStateType = {
  key: "66",
  obj: {
    name: "Jack",
    age: 12,
  },
};

// person slice
const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addAge(state, action: PayloadAction<number>) {
      const { payload } = action;
      state.obj.age += payload;
    },
  },
  /** 异步请求写法一 */
  // extraReducers: {
  //   [requestToStoreAction.pending]() { // 请求中
  //     console.log('pending');
  //   },
  //   [requestToStoreAction.fulfilled](state, action) { // 响应
  //     const { payload } = action;
  //     console.log('fulfilled', payload);
  //     state.obj.age = payload.length;
  //   },
  //   [requestToStoreAction.rejected](_state, _action) { // 失败
  //     console.log('rejected');
  //   }
  // },

  /** 异步请求写法二 */
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(requestToStoreAction.pending, () => {
  //     })
  //     .addCase(requestToStoreAction.fulfilled, (state, action) => {
  //       const {payload} = action;
  //       console.log('fulfilled', payload);
  //       state.obj.age = payload.length;
  //     })
  //     .addCase(requestToStoreAction.rejected, (_state, _action) => {
  //     })
  // },
});

export const { addAge } = personSlice.actions;

export const requestToStoreAction = createAsyncThunk(
  "request/age",
  async (info: any, store) => {
    const commits = await request1.get<Commit[]>({
      url: "/repos/javascript-tutorial/en.javascript.info/commits",
    });

    // 异步请求写法三（直接不用写一或二）
    const { dispatch } = store;
    dispatch(addAge(commits.length));

    return commits;
  }
);

export default personSlice.reducer;
