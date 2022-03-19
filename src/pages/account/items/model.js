import * as services from './services';
import { notification } from 'antd';

export default {
  namespace: 'accounts',
  state: {
    data: [],
    pagination: {
      total: 0,
    },
  },
  reducers: {
    INIT_STATE: (state) => ({ ...state, isError: false, data: [] }),
    SET_DATA: (state, { payload }) => ({
      ...state,
      data: payload.parsePayload,
      pagination: payload.pagination,
    }),
    SET_ERROR: (state, { payload }) => ({
      ...state,
      error: {
        isError: true,
        data: {
          ...payload,
        },
      },
    }),
  },
  effects: {
    *GET_DATA({ payload }, saga) {
      try {
        const response = yield saga.call(services.get, payload);
        yield saga.put({
          type: 'SET_DATA',
          payload: response,
        });
      } catch (error) {
        yield saga.put({
          type: 'SET_ERROR',
          payload: error.data,
        });
      }
    },
    *UPDATE({ payload, callback }, saga) {
      try {
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
    *REMOVE({ payload, callback }, saga) {
      try {
        yield saga.call(services.remove, payload.id);
        notification.success({
          message: 'Cập nhật thành công',
          description: 'Bạn đã cập nhật thành công dữ liệu',
        });
        callback(payload);
      } catch (error) {
        callback(null, error);
        notification.error({
          message: 'Thông báo',
          description: 'Bạn vui lòng kiểm tra lại dữ liệu',
        });
      }
    },
  },
  subscriptions: {},
};
