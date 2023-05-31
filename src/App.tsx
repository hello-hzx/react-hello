import React, { useState } from 'react';
import { Button } from 'antd';
import '@/static/index.less';
import components from '@/components';

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
        <Button onClick={() => change('AxiosComp')}>Axios</Button>
        <Button onClick={() => change('MobxComp')}>Mobx</Button>
        <Button onClick={() => change('ReduxComp')}>Redux</Button>
        <Button onClick={() => change('ReactComp')}>React</Button>
        <Button>React Query</Button>
        <Button onClick={() => change('RouterComp')}>React Router</Button>
      </div>
      {
        name && <Comp />
      }
    </>
  );
}

export default App;
