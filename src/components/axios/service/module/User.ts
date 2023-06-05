import { request1 } from '../index';

export type Commit = {
  author: any,
  commit: any,
  committer: any
  [key: keyof any]: any,
};

/** 发送请求 */
export const send1 = async () => request1.get<Commit[]>({
  url: '/repos/javascript-tutorial/en.javascript.info/commits',
});

// request1.request({
//   url: '/repos/javascript-tutorial/zh.javascript.info/issues',
//   params: {
//     id: 1,
//   }
// }).then((res: AxiosResponse) => {
//   window.console.log(res);
// });
