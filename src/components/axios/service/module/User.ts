import { request1 } from '../index';

type Commit = {
  author: any,
  commit: any,
  committer: any
  [key: keyof any]: any,
};

/** 发送请求 */
request1.get<Commit[]>({
  url: '/repos/javascript-tutorial/en.javascript.info/commits',
}).then((res) => {
  window.console.log(res);
});

// request1.request({
//   url: '/repos/javascript-tutorial/zh.javascript.info/issues',
//   params: {
//     id: 1,
//   }
// }).then((res: AxiosResponse) => {
//   window.console.log(res);
// });
