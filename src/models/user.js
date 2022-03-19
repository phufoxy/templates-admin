import * as services from '@/services/login';
import { history } from 'umi';
import { notification } from 'antd';
import { get } from 'lodash';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    authorized: false,
    user: {},
    permissions: ['QLTK', 'QLTK_VIEW', 'QLTK_NEW', 'QLTK_EDIT', 'QLTK_DELETE'],
  },
  effects: {
    *LOGIN({ payload }, { call, put }) {
      try {
        const response = yield call(services.login, payload);
        cookies.set('access_token', response.access_token, { path: '/' });
        notification.success({
          message: 'THÔNG BÁO',
          description: 'Bạn đã đăng nhập thành công!',
        });
        if (payload.isRemember) {
          cookies.set('infoUser', payload, { path: '/' });
        } else {
          cookies.remove('infoUser', { path: '/' });
        }
        const res = yield call(services.me);
        yield put({
          type: 'LOAD_ME',
          payload: res,
        });
      } catch (error) {
        notification.error({
          message: 'THÔNG BÁO',
          description: 'Đăng nhập không thành công. Bạn vui lòng kiểm tra lại thông tin đã nhập.',
        });
        yield put({
          type: 'SET_ERROR',
        });
      }
    },
    *LOAD_CURRENT_ACCOUNT({ _ }, saga) {
      try {
        const response = yield saga.call(services.me);
        if (response) {
          yield saga.put({
            type: 'LOAD_ME',
            payload: response,
          });
        }
      } catch (error) {
        yield saga.put({
          type: 'SET_ERROR',
        });
      }
    },
    *LOAD_ME({ payload = {} }, saga) {
      try {
        const response = payload;
        yield saga.put({
          type: 'SET_STATE',
          payload: {
            id: get(response, 'parsePayload.id'),
            name: get(response, 'parsePayload.full_name'),
            email: get(response, 'parsePayload.email'),
            avatar: get(response, 'parsePayload.avatar'),
            authorized: true,
          },
        });
      } catch (error) {
        yield saga.put({
          type: 'SET_ERROR',
        });
      }
    },
    *LOGOUT(_, saga) {
      try {
        yield saga.call(services.logout);
        cookies.remove('access_token', { path: '/' });
        cookies.remove('token_type', { path: '/' });
        yield saga.put({
          type: 'SET_LOGOUT',
        });
        history.push('/login');
      } catch (error) {
        yield saga.put({
          type: 'SET_ERROR',
        });
      }
    },
  },
  reducers: {
    SET_STATE: (state, { payload }) => ({ ...state, ...payload }),
    SET_LOGOUT: (state) => ({
      ...state,
      user: {},
      authorized: false,
      permissions: [],
    }),
  },
  subscriptions: {
    setup: ({ _ }) => {
      // Load info account
      // dispatch({
      //   type: 'LOAD_CURRENT_ACCOUNT',
      //   payload: cookies.get('infoUser'),
      // });
    },
  },
};
export default UserModel;
