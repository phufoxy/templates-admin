import request from '@/utils/request';
import { Helper } from '@/utils';

export function get(params = {}) {
  return request('/v1/utilities', {
    method: 'GET',
    params: {
      orderBy: 'id',
      sortedBy: 'desc',
      ...params,
      search: Helper.convertParamSearchConvert({
        name: params.name,
      }),
    },
  });
}

export function remove(id) {
  return request(`/v1/utilities/${id}`, {
    method: 'DELETE',
    parse: true,
  });
}
