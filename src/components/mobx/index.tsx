import React from "react";
import { autorun, makeAutoObservable, observable, reaction } from "mobx";
import { Button } from "antd";
import { observer } from "mobx-react";
import { MobxMore } from "./MobxMore";

class Doubler {
  // make(Auto)Observable 仅支持已经定义的属性。
  // 确保在你使用 make(Auto)Observable 之前已经为所有属性赋了值。
  // 如果没有正确的配置，已经声明而未初始化的字段（例如：class X { y; }）将无法被正确侦测到。
  data = { value: 0, key: "name" };

  name;

  constructor() {
    this.name = "js";
    // observable.struct 与现有值结构相等的任何赋值都会被忽略。
    makeAutoObservable(this, { data: observable.struct });
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
  console.log("autorun:", doubler.data.value);
});

/**
 * reaction方法：
 * 在doubler.isExceed方法返回值发生改变时触发回调
 * */
reaction(
  () => doubler.isExceed,
  (exceed) => {
    if (exceed) {
      console.log("exceed");
    }
    console.log("reaction:", doubler.data.value);
  }
);
/**
 * 当 observer 需要和装饰器或者其他高阶组件（HOC）一起使用时，
 * 请确保 observer 是最内层的 (最先调用的) 装饰器，否则的话它可能不会工作。
 *
 * 何时使用：
 *  1) 层级很深, 2) 拥有计算属性 3) 需要共享状态给其它 observer components。
 *
 * 优化：
 * 1. 使用大量的小组件
 *  observer 组件将跟踪他们使用的值，并且当它们中任何一个值发生时重新渲染。所以你的组件越小，它们重新渲染产生的变化就越小。
 * 2. 专用组件去渲染列表
 *  https://zh.mobx.js.org/react-optimizations.html#%E4%B8%93%E7%94%A8%E7%BB%84%E4%BB%B6%E5%8E%BB%E6%B8%B2%E6%9F%93%E5%88%97%E8%A1%A8
 * 3. 晚一点使用间接引用值
 *  使用 mobx-react 时，推荐尽可能晚的使用间接引用值。 因为当使用 observable 间接引用值时 MobX 会自动重新渲染组件。
 *  如果间接引用值发生在组件树的层级越深，那么需要重新渲染的组件就越少。
 *    a. <DisplayName name={person.name} /> // 组件的所有者也必须重新渲染。
 *    b. <DisplayName person={person} /> // 改变 name 属性只会触发 DisplayName 重新渲染,
 *
 * 4. mobx-react 是全量包，也会暴露 mobx-react-lite包中的任何方法,其中包含对函数组件的支持。
 *    如果你使用 mobx-react，那就不要添加 mobx-react-lite 的依赖和引用了。
 *
 * 5. observer 会自动的使用 memo
 *
 * 6. useEffect 与 可观察对象（依赖数组可以保持为空，除非是一个不可观察对象的值需要触发autorun重新运行，需要将它添加到这里面。
 *     // 在Effect方法之上触发可观察对象变化。
 *     useEffect(
 *         () =>
 *             autorun(() => {
 *                 if (timer.secondsPassed > 60) alert("Still there. It's a minute already?!!")
 *             }),
 *         []
 *     )
 *
 *  7. API 参考 https://zh.mobx.js.org/api.html#%E6%A0%B8%E5%BF%83-api
 *
 *  8. 最佳实践：
 *   https://zh.mobx.js.org/defining-data-stores.html
 *   https://zh.mobx.js.org/react-integration.html#observer-%E7%BB%84%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%A4%96%E9%83%A8%E7%8A%B6%E6%80%81-%EF%BC%88using-external-state-in-observer-components%EF%BC%89
 * */
export const MobxComp = observer(() => (
  <>
    <Button
      onClick={() => {
        doubler.increment();
      }}
    >
      {doubler.data.value}
    </Button>
    <MobxMore />
  </>
));
