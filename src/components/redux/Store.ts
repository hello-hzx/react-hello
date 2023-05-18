import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { nameReducer } from './name/Reducer';
import { ageReducer } from './age/Reducer';

/** 业务被拆分 redux 初始化数据 */
// const initStore:InfoType = {
//   name: 'zs',
//   age: 11,
// };

/** 业务被拆分 */
// function reducer(state = initStore, action) {
//   switch (action.type) {
//     case 'changeName': {
//       return { ...state, name: action.name };
//     }
//     case 'changeAge': {
//       return { ...state, age: action.age };
//     }
//     default: {
//       return state;
//     }
//   }
// }

/**
 * *****************
 *  业务拆分后，多个reducer合并
 * *****************
 * */
const reducer = combineReducers({
  name: nameReducer,
  age: ageReducer,
});

/** 打开 redux-devtool */
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/**
 * 1. 整个应用程序的state被存储在一颗 object tree 中， 方便维护，追踪、修改
 * 2. state只读，唯一修改State的方法一定是触发action
 * 3. 所有的reducer都应该是纯函数
 *
 * 打开 redux-devtool
 * https://github.com/reduxjs/redux-devtools/tree/main/extension#installation
 * */
// export const store = createStore(reducer, applyMiddleware(thunk));
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

/**
 * 规范文件目录
 * store
 *  ActionCreator.ts    action方法
 *  index.ts            定义store
 *  Reducer.ts          reducer方法
 * */
