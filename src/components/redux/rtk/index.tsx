import React from 'react';
import { Provider, shallowEqual } from 'react-redux';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@/components/redux/rtk/hooks';
import { store } from './Store';
import { addAge, requestToStoreAction } from './modules/Person';

const Show = () => {
  const { person } = useAppSelector((state) => state, shallowEqual);
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(addAge(2));
        // 这个 @ts-ignore 待解决
        // @ts-ignore
        dispatch(requestToStoreAction({ key: 'a' })); // 这里可以传参（可选）
      }}
    >
      ReduxRtk: {person.obj.age}
    </Button>

  );
};

export const ReduxRtk = () => (
  <Provider store={store}>
    <Show />
  </Provider>
);
