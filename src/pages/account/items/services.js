import request from '@/utils/request';
import { omit } from 'lodash';
import { Helper, variables } from '@/utils';

export function get(params = {}) {
  return request('/v1/users', {
    method: 'GET',
    params: {
      ...omit(params, 'full_name'),
      orderBy: 'id',
      sortedBy: 'desc',
      search: Helper.convertParamSearchConvert({
        full_name: params.full_name,
      }),
    },
  });
}

export function remove(id) {
  return request(`/v1/users/${id}`, {
    method: 'DELETE',
    parse: true,
  });
}

export function update(data = {}) {
  return request(`/v1/users/${data.id}`, {
    method: 'PUT',
    data: {
      ...data,
      date_of_birth: Helper.getDateTime({
        value: Helper.setDate({
          ...variables.setDateData,
          originValue: data.date_of_birth,
        }),
        format: variables.DATE_FORMAT.DATE_AFTER,
        isUTC: false,
      }),
    },
  });
}
