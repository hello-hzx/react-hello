import React, {FC} from 'react';
import {Button} from "antd";

const App: FC = () => {
  const onClick = () => {
    window.open('./about.html');
  };
  return (
      <>
        <Button onClick={onClick}>index按钮</Button>
      </>
  );
};

export default App;
