// 业务被拆分
export {};
// import { request1 } from "../axios/service";
// import { Commit } from "../axios/service/module/User";
// import { Dispatch } from "redux";
//
// export const changeNameCreator = (name: string) => ({type: 'changeName', name});
//
// export const changeAgeCreator = (age: number) => ({type: 'changeAge', age});
//
//
// /** 发起请求，将请求存入store */
// export const requestData = () => {
//   return (dispatch: Dispatch, _getState) => {
//     request1.get<Commit[]>({
//       url: '/repos/javascript-tutorial/en.javascript.info/commits',
//     }).then((res) => {
//       dispatch(changeAgeCreator(res.length));
//     }).catch((_e) => {
//       // ignore
//     });
//   };
// };
