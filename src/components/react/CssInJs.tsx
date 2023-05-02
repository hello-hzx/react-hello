import React from 'react';
import styled from 'styled-components';

const StyleWrapper = styled.div`
  border: 1px solid black;

  .head {
    background-color: pink;
  }

  .content {

    .name {
      font-size: 25px;
    }
  }

`;

/** css in js: styled-components */
const CssInJs = () => (
  <StyleWrapper className="app">
    <h1 className="head">标题</h1>
    <div className="content">
      <span className="name">jack</span>
    </div>
  </StyleWrapper>
);

export default CssInJs;
