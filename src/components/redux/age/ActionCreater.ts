import { Dispatch } from 'redux';
import { request1 } from '../../axios/service';
import { Commit } from '../../axios/service/module/User';

export const changeAgeCreator = (age: number) => ({ type: 'changeAge', age });

export const requestData = () => (dispatch: Dispatch, _getState) => {
  request1.get<Commit[]>({
    url: '/repos/javascript-tutorial/en.javascript.info/commits',
  }).then((res) => {
    dispatch(changeAgeCreator(res.length));
  }).catch((_e) => {
    // ignore
  });
};
