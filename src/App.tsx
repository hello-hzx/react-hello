import React, { useState } from 'react';
import { Button } from 'antd';
import './static/index.less';
import { components } from './components';

function App() {
  const [name, setName] = useState<string>();
  const onClick = () => {
    window.open('./about.html');
  };
  const change = (comp: string) => setName(comp);
  const Comp = components[name];

  return (
    <>
      <div className="start-option">
        <Button onClick={onClick}>多页面</Button>
        <Button onClick={() => change('Axios')}>Axios</Button>
        <Button>Mobx</Button>
        <Button>Redux</Button>
        <Button>React</Button>
        <Button>React Query</Button>
        <Button>React Router</Button>
      </div>
      {
        // @ts-ignore
        name && <Comp />
      }
    </>
  );
}

export default App;
