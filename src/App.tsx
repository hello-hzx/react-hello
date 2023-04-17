import React from 'react';
import { Button } from 'antd';
import './index.css';

function App() {
  const onClick = () => {
    window.open('./about.html');
  };
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Button onClick={onClick}>index按钮</Button>
      </div>
      <div className="div-flex">
        <Button onClick={onClick}>index按钮</Button>
      </div>
    </>
  );
}

export default App;
