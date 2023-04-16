import React from 'react';
import { Button } from 'antd';

function App() {
  const onClick = () => {
    window.open('./about.html');
  };
  return (
    <Button onClick={onClick}>index按钮</Button>
  );
}

export default App;
