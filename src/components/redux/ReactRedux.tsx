import React from 'react';
import { Button } from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import { changeNameCreator, InfoType } from './Store';

const ReactRedux = (props: any) => {
  const onClick = () => {
    props.changeName(`${props.name}-toProps`);
  };
  return (
    <Button onClick={onClick}>ReactRedux: {props.name}</Button>
  );
};

const mapStateToProps = (state: InfoType) => ({
  name: state.name,
});

const mapDispatchToProps = (dispatch) => ({
  changeName: (name: string) => {
    dispatch(changeNameCreator(name));
  },
});
/** 方式一用于 类式组件 或 函数式组件  */
export default connect(mapStateToProps, mapDispatchToProps)(ReactRedux);

const state = (data: InfoType) => data;
/** ReactRedux Hooks版 */
export const ReactReduxHooks = () => {
  const info = useSelector(state);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(changeNameCreator(`${info.name}-hook`));
  };
  return (
    <Button onClick={onClick}>ReactReduxHooks: {info.name}</Button>
  );
};
