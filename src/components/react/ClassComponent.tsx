import React, { PureComponent } from 'react';
import { Button } from 'antd';

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
