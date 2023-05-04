import React from 'react';
import { Provider } from 'react-redux';
import { NativeRedux } from './native-redux';
import ReactRedux from './ReactRedux';
import { store } from './Store';

// https://redux.js.org/
// https://www.redux.org.cn/
export const ReduxComp = () => (
  <>
    <h1>Redux</h1>
    <NativeRedux />
    <Provider store={store}>
      <ReactRedux />
    </Provider>
  </>
);
