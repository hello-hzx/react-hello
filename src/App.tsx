import React, { useState } from 'react';
import {
  SiRedux,
  SiAxios,
  SiMobx,
  SiReact,
  SiReactrouter,
} from 'react-icons/si';
import { Button } from 'antd';
import '@/asset/index.less';
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
        <Button
          icon={<SiAxios />}
          onClick={() => change('AxiosComp')}
        >Axios
        </Button>
        <Button
          icon={<SiMobx />}
          onClick={() => change('MobxComp')}
        >Mobx
        </Button>
        <Button
          icon={<SiRedux />}
          onClick={() => change('ReduxComp')}
        >Redux
        </Button>
        <Button
          icon={<SiReact />}
          onClick={() => change('ReactComp')}
        >React
        </Button>
        <Button icon={<SiReactrouter />} onClick={() => change('RouterComp')}>React
          Router
        </Button>
      </div>
      {
        name && <Comp />
      }
    </>
  );
}

export default App;
