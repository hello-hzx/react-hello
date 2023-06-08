import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const AppWrapper = styled.div`
  border: 1px solid black;

  .head {
    background-color: pink;
  }
`;

const nameColor = "red";

type ContentProps = {
  nameSize: number;
};
const ContentWrapper = styled.div<ContentProps>`
  border: 1px solid red;

  .name {
    // 使用动态传入的参数
    font-size: ${(props) => props.nameSize}px;
    // 使用其他参数
    color: ${nameColor};
  }
`;

/** css in js
 * styled-components：
 *  https://github.com/styled-components/styled-components
 *
 *
 * */
function CssInJs() {
  return (
    <AppWrapper className="app">
      <h1 className="head">标题</h1>
      {/* classNames 简单使用 */}
      <ContentWrapper
        nameSize={30}
        className={classNames([{ content: true }, "abc"])}
      >
        <span className="name">jack</span>
      </ContentWrapper>
    </AppWrapper>
  );
}

export default CssInJs;
