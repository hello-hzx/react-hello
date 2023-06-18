import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Commit, send1 } from "../../../axios/service/module/User";

export const requestToStoreAction = createAsyncThunk(
  "requestToStoreAction",
  async (_info: any, _store) => {
    const commits = await send1();

    return commits.map((item) => ({ ...item, id: item.sha }));
  }
);

const postsAdapter = createEntityAdapter<Commit>();

// getInitialState 返回{ids: [], entities: {}}规范化状态对象。postsSlice需要为加载状态保留status和error字段
const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
});

// person slice
const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestToStoreAction.pending, () => {})
      .addCase(requestToStoreAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        // 使用' upsertMany ' reducer作为一个可变的更新实用程序
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(requestToStoreAction.rejected, (_state, _action) => {});
  },
});

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // 传入一个选择器，该选择器返回帖子的状态切片
} = postsAdapter.getSelectors((state: any) => state.posts);

export default personSlice.reducer;
