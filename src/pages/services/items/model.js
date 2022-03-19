import { notification } from 'antd';
import * as categories from '@/services/categories';
import * as services from './services';

export default {
  namespace: 'services',
  state: {
    data: [],
    pagination: {
      total: 0,
    },
    error: {
      isError: false,
      data: {},
    },
    servicePackTypes: [],
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
    SET_SERVICES_PACK_TYPES: (state, { payload }) => ({
      ...state,
      servicePackTypes: payload.parsePayload,
    }),
  },
  effects: {
    *GET_SERVICES_PACK_TYPES({ payload }, saga) {
      try {
        const response = yield saga.call(categories.getServicePackTypes, payload);
        yield saga.put({
          type: 'SET_SERVICES_PACK_TYPES',
          payload: response,
        });
      } catch (error) {
        yield saga.put({
          type: 'SET_ERROR',
          payload: error.data,
        });
      }
    },
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
        yield saga.call(services.remove, payload);
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
  },
  subscriptions: {},
};
