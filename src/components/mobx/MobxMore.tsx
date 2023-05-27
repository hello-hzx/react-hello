import { Button, Input } from 'antd';
import React from 'react';
import { observer } from 'mobx-react';
import { makeAutoObservable } from 'mobx';

class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }
}

const myTimer = new Timer();

const UseProps = observer((props: { timer: any }) => (
  <Input style={{ width: '2rem' }} value={props.timer.secondsPassed} />));
/** mobx 与 react 的更多使用  */
export const MobxMore = observer(() => (
  <>
    <Button
      onClick={() => myTimer.increaseTimer()}
    >
      {/* 1.使用全局变量 */}
      React More：{myTimer.secondsPassed}
    </Button>
    <UseProps timer={myTimer} /> {/* 2.通过props属性传入 */}
  </>
));
