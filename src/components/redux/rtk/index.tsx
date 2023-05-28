import React from 'react';
import {
  Provider, shallowEqual, useDispatch, useSelector,
} from 'react-redux';
import { Button } from 'antd';
import { store } from './Store';
import { addAge } from './modules/Person';

const Show = () => {
  const { person } = useSelector((state: any) => state, shallowEqual);
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(addAge(2));
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
