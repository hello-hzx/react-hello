import { createStore } from 'redux';

const initStore = {
  name: 'zs',
  age: 11,
};

function reducer(state = initStore, action) {
  switch (action.type) {
    case 'changeName': {
      return { ...state, name: action.name };
    }
    case 'changeAge': {
      return { ...state, age: action.age };
    }
    default: {
      return state;
    }
  }
}
/**
 * 1. 整个应用程序的state被存储在一颗 object tree 中， 方便维护，追踪、修改
 * 2. state只读，唯一修改State的方法一定是触发action
 * 3. 所有的reducer都应该是纯函数
 * */
export const store = createStore(reducer);

export const changeNameCreator = (name: string) => ({ type: 'changeName', name });

/**
 * 规范文件目录
 * store
 *  ActionCreator.ts    action方法
 *  index.ts            定义store
 *  Reducer.ts          reducer方法
 * */
