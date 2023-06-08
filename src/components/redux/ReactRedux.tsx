import React from "react";
import { Button } from "antd";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeNameCreator } from "./name/ActionCreater";
import { requestData } from "./age/ActionCreater";

function ReactRedux(props: any) {
  const onClick = () => {
    props.changeName(`${props.name}-toProps`);
  };
  return <Button onClick={onClick}>ReactRedux: {props.name}</Button>;
}

const mapStateToProps = (state) => ({
  name: state.name.name,
});

const mapDispatchToProps = (dispatch) => ({
  changeName: (name: string) => {
    dispatch(changeNameCreator(name));
  },
});
/**
 * ***********************************
 * 方式一用于 类式组件 或 函数式组件
 * ***********************************
 * */
export default connect(mapStateToProps, mapDispatchToProps)(ReactRedux);

/**
 * ***********************************
 * 方式二 Hooks版
 * ***********************************
 * */
export function ReactReduxHooks() {
  const info = useSelector((state: any) => state, shallowEqual);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(changeNameCreator(`${info.name.name}-hook`));
  };
  return <Button onClick={onClick}>ReactReduxHooks: {info.name.name}</Button>;
}

/**
 * ***********************************
 * 点击发送网络请求得到数据存入store
 *  1. 导入中间件 redux-thunk
 *  2. 再创建store的地方，加入 redux-thunk 实例，此时 dispatch 不仅可以派发对象，还可以派发函数
 * ***********************************
 * */
export function ReduxRequestToStore() {
  const info = useSelector(
    (data: { name: { name: string }; age: { age: number } }) => data,
    shallowEqual
  );
  const dispatch = useDispatch();

  const onClick = () => {
    // 这里不知道是什么问题 强制为 any，在类式组件中使用是没有问题的
    dispatch(requestData() as any);
  };
  return <Button onClick={onClick}>ReduxRequestToStore: {info.age.age}</Button>;
}
