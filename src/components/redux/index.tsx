import React from "react";
import { Provider } from "react-redux";
import { NativeRedux } from "./native-redux";
import ReactRedux, { ReactReduxHooks, ReduxRequestToStore } from "./ReactRedux";
import { store } from "./Store";
import { ReduxRtk } from "./rtk";

/**
 * https://cn.redux.js.org
 *
 * 数据流：https://cn.redux.js.org/tutorials/essentials/part-1-overview-concepts#redux-%E6%95%B0%E6%8D%AE%E6%B5%81
 */
export function ReduxComp() {
  return (
    <>
      <h1>Redux</h1>
      <ReduxRtk />
      <NativeRedux />
      <Provider store={store}>
        {" "}
        {/* 为redux 提供 store */}
        <ReactRedux />
        <ReactReduxHooks />
        <ReduxRequestToStore />
      </Provider>
    </>
  );
}
