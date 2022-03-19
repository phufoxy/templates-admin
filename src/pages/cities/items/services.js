import request from '@/utils/request';
import { Helper } from '@/utils';

export function get(params = {}) {
  return request('/v1/cities', {
    method: 'GET',
    params: {
      orderBy: 'id',
      sortedBy: 'desc',
      ...params,
      include: Helper.convertIncludes(['nation']),
      search: Helper.convertParamSearchConvert({
        name: params.name,
      }),
    },
  });
}

export function remove(id) {
  return request(`/v1/cities/${id}`, {
    method: 'DELETE',
    parse: true,
  });
}
