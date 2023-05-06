import React from 'react';
import { Provider } from 'react-redux';
import { NativeRedux } from './native-redux';
import ReactRedux, { ReactReduxHooks } from './ReactRedux';
import { store } from './Store';

// https://cn.redux.js.org
export const ReduxComp = () => (
  <>
    <h1>Redux</h1>
    <NativeRedux />
    <Provider store={store}>
      <ReactRedux />
      <ReactReduxHooks />
    </Provider>
  </>
);
