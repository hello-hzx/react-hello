import React from 'react';
import { autorun, makeAutoObservable, reaction } from 'mobx';
import { Button } from 'antd';
import { observer } from 'mobx-react';

class Doubler {
  // make(Auto)Observable 仅支持已经定义的属性。
  // 确保在你使用 make(Auto)Observable 之前已经为所有属性赋了值。
  // 如果没有正确的配置，已经声明而未初始化的字段（例如：class X { y; }）将无法被正确侦测到。
  data = { value: 0, key: 'name' };

  name;

  constructor() {
    this.name = 'js';
    makeAutoObservable(this);
  }

  increment() {
    this.data.value++;
    this.data.value++;
  }

  /** get方法自动推断为 computed */
  get isExceed() {
    return this.data.value > 4;
  }
}

const doubler = new Doubler();

/**
 * autorun方法：
 * 1. 第一次执行时触发
 * 2. value 发生开改变时触发
 * */
autorun(() => {
  console.log('autorun:', doubler.data.value);
});

/**
 * reaction方法：
 * 在doubler.isExceed方法返回值发生改变时触发回调
 * */
reaction(
  () => doubler.isExceed,
  (exceed) => {
    if (exceed) {
      console.log('exceed');
    }
    console.log('reaction:', doubler.data.value);
  },
);
/**
 * 当 observer 需要和装饰器或者其他高阶组件（HOC）一起使用时，
 * 请确保 observer 是最内层的 (最先调用的) 装饰器，否则的话它可能不会工作。
 *
 * 优化：
 * 1. 使用大量的小组件
 *  observer 组件将跟踪他们使用的值，并且当它们中任何一个值发生时重新渲染。所以你的组件越小，它们重新渲染产生的变化就越小。
 * 2. 专用组件去渲染列表
 *  https://zh.mobx.js.org/react-optimizations.html#%E4%B8%93%E7%94%A8%E7%BB%84%E4%BB%B6%E5%8E%BB%E6%B8%B2%E6%9F%93%E5%88%97%E8%A1%A8
 * 3. 不要使用数组的索引作为 key
 * 4. 晚一点使用间接引用值
 *  使用 mobx-react 时，推荐尽可能晚的使用间接引用值。 因为当使用 observable 间接引用值时 MobX 会自动重新渲染组件。
 *  如果间接引用值发生在组件树的层级越深，那么需要重新渲染的组件就越少。
 *    a. <DisplayName name={person.name} />
 *    b. <DisplayName person={person} />
 *    a组件，组件的所有者也必须重新渲染。
 *    b组件, 改变 name 属性只会触发 DisplayName 重新渲染,
 * */
export const MobxComp = observer(() => (
  <Button
    onClick={() => {
      doubler.increment();
    }}
  >
    {doubler.data.value}
  </Button>
));
