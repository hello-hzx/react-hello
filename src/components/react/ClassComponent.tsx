import React, { PureComponent } from "react";
import { Button } from "antd";

type Props = {};
type State = {
  num: number;
};

/** 类式组件 */
export class ClassComponent extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      num: 0,
    };
  }

  onChange() {
    // 此时 this 为空
    // 方法1：改为箭头函数
    // 方法2：调用时使用箭头函数 onClick={() => this.onChange()}
    // 方法3：手动绑定，bind，call，apply
    this.setState({
      num: 2,
    });

    /**
     * setState 异步：
     *  1. 提高性能，获取多次setState，一次更新
     *  2. 保证 state 与 子组件的 props 的一致性
     *  https://github.com/facebook/react/issues/11527#issuecomment-360199710;
     *
     *  何时同步：react 18之前，这些情况会同步处理
     *    https://zh-hans.react.dev/blog/2022/03/29/react-v18#whats-new-in-react-18
     *
     *  从 18 开始，所有 setState 都是批处理
     *    Starting in React 18 with createRoot, all updates will be automatically batched,
     *    no matter where they originate from.
     *    https://github.com/reactwg/react-18/discussions/21
     *
     *  数据更新：arr = [{name: tom}, {name: jack}]
     *  推荐（虽然只是浅拷贝）： const newArr = [...arr, {name: joe}]; this.steState({ arr: newArr });
     *
     * */
  }

  render() {
    return (
      <Button onClick={() => this.onChange()}>
        <span>
          My class component:
          {this.state.num}
        </span>
      </Button>
    );
    /**
     * 最终会被转为：
     * return (React.createElement(
     *    Button,
     *    { onClick: () => this.onChange() },
     *    React.createElement("span", null, "My class component: ", this.state.num)
     * ));
     *
     * React.createElement 创建出 ReactElement 对象（虚拟节点）
     *
     * 虚拟dom：
     *  1. 最小更新
     *  2. 跨平台 react --> reactNative （将虚拟dom转为web的button，也可以转为移动端的控件UIButton）
     *  3. 命令式编程 ==> 声明式编程
     * */
  }
}
