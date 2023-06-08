import React, { useState } from "react";
import { Button } from "antd";
import { CSSTransition } from "react-transition-group";

/** CSS 动画 */
export function ReactTransitionGroup() {
  const [show, setShow] = useState(true);

  // CSS 动画 https://legacy.reactjs.org/docs/faq-styling.html#can-i-do-animations-in-react
  const style = (
    <style>
      {`
      .hello-enter {
       opacity: 0;
      }
      .hello-enter-active {
        opacity: 1;
        transition: opacity 1s ease;
      }

      .hello-exit {
       opacity: 1;
      }
      .hello-exit-active {
        opacity: 0;
        transition: opacity 1s ease;
      }
      `}
    </style>
  );

  return (
    <div>
      {/* {show && <h1>Hello</h1>} */}
      {style}
      <Button onClick={() => setShow(!show)}>btn</Button>
      <CSSTransition in={show} classNames="hello" timeout={1000} unmountOnExit>
        <h1>Hello</h1>
      </CSSTransition>
    </div>
  );
}
