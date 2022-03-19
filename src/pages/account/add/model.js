import * as services from './services';
import { notification } from 'antd';
import { dataSource } from './data.json';

export default {
  namespace: 'accountsAdd',
  state: {
    data: [],
    error: {
      isError: false,
      data: {},
    },
    details: {},
    nations: [],
    roles: []
  },
  reducers: {
    INIT_STATE: (state) => ({ ...state, isError: false, data: [] }),
    SET_ERROR: (state, { payload }) => ({
      ...state,
      error: {
        isError: true,
        data: {
          ...payload,
        },
      },
    }),
    SET_DETAILS: (state, { payload }) => ({
      ...state,
      details: payload,
    }),
    SET_ROLES: (state, { payload }) => ({
      ...state,
      roles: payload,
    }),
  },
  effects: {
    *GET_ROLES({ payload }, saga) {
      try {
        const response = yield saga.call(services.getRoles, payload);
        if (response) {
          yield saga.put({
            type: 'SET_ROLES',
            payload: response.parsePayload,
          });
        }
      } catch (error) {
        yield saga.put({
          type: 'SET_ERROR',
          payload: error.data,
        });
      }
    },
    *ADD({ payload, callback }, saga) {
      try {
        yield saga.put({
          type: 'INIT_STATE',
        });
        yield saga.call(services.add, payload);
        notification.success({
          message: 'Cập nhật thành công',
          description: 'Bạn đã cập nhật thành công dữ liệu',
        });
        callback(payload);
      } catch (error) {
        notification.error({
          message: 'Thông báo',
          description: 'Bạn vui lòng kiểm tra lại dữ liệu',
        });
        callback(null, error);
      }
    },
    *UPDATE({ payload, callback }, saga) {
      try {
        yield saga.put({
          type: 'INIT_STATE',
        });
        yield saga.call(services.update, payload);
        notification.success({
          message: 'Cập nhật thành công',
          description: 'Bạn đã cập nhật thành công dữ liệu',
        });
        callback(payload);
      } catch (error) {
        notification.error({
          message: 'Thông báo',
          description: 'Bạn vui lòng kiểm tra lại dữ liệu',
        });
        callback(null, error);
      }
    },
    *GET_DETAILS({ payload }, saga) {
      try {
        const response = yield saga.call(services.details, payload);
        if (response) {
          yield saga.put({
            type: 'SET_DETAILS',
            payload: response.parsePayload,
          });
        }
      } catch (error) {
        yield saga.put({
          type: 'SET_ERROR',
          payload: error.data,
        });
      }
    },
  },
  subscriptions: {},
};
