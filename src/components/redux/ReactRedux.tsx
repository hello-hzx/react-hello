import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { changeNameCreator } from './Store';

// const state = state => state;
const ReactRedux = (props: any) => {
  // const info = useSelector(state);

  const onClick = () => {
    props.changeName(`${props.name}b`);
  };
  return (
    <>
      <Button onClick={onClick}>ReactRedux: {props.name}</Button>
      {/* <Button onClick={onClick}>ReactRedux: {info.name}</Button> */}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  name: state.name,
});

const mapDispatchToProps = (dispatch) => ({
  changeName: (name: string) => {
    dispatch(changeNameCreator(name));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ReactRedux);
// export default ReactRedux;
