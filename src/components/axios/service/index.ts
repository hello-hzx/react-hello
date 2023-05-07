import Request from './request';
import { BASE_URL, TIMEOUT } from './config';

/** request 示例，可以有多个 */
export const request1 = new Request({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});
