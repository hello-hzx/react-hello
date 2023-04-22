import { AxiosResponse } from 'axios';
import request from '../index';

request.request({
  url: '/repos/javascript-tutorial/en.javascript.info/commits',
}).then((res: AxiosResponse) => {
  window.console.log(res);
});
