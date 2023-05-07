import React, { useCallback, useState } from 'react';

/** 函数闭包的体现 */
export const FunctionClosure = () => {
  const [name, setName] = useState('c#');

  /** useCallback 记忆函数，如果[]为空，就是不更新onClick，name由于闭包name一直是‘c#’ */
  const onClick = useCallback(() => {
    setName(`${name}js`);
  }, [name]);

  return (
    <button onClick={onClick}>btn: {name}</button>
  );
};

const fun = (name: string) => () => {
  window.console.log(name);
};

const funJava = fun('java');
const funCSharp = fun('c#');
funJava(); // java
funCSharp(); // c#
funJava(); // java
