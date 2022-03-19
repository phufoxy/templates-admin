import request from '@/utils/request';
import { omit } from 'lodash';
import { Helper, variables } from '@/utils';

export function get(params = {}) {
  return request('/v1/service-pack-types', {
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
  return request(`/v1/service-pack-types/${id}`, {
    method: 'DELETE',
    parse: true,
  });
}
