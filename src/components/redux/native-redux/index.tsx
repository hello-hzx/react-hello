import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { changeAgeCreator, changeNameCreator } from "./ActionCreator";
import { store } from "./Reducer";

/** 原生操作 Redux，Redux 和 React 没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript */
export function NativeRedux() {
  const [name, setName] = useState<string>(store.getState().name);
  useEffect(() => {
    // 订阅数据变化
    const unsubscribe = store.subscribe(() => {
      setName(store.getState().name);
    });
    return () => {
      // 取消订阅
      unsubscribe();
    };
  }, []);
  const onClick = () => {
    store.dispatch(changeNameCreator(`${name}a`));
    store.dispatch(changeAgeCreator(13));
  };
  return <Button onClick={onClick}>NativeRedux：{name}</Button>;
}
