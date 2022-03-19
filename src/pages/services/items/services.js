import request from '@/utils/request';
import { Helper } from '@/utils';

export function get(params = {}) {
  return request('/v1/service-packs', {
    method: 'GET',
    params: {
      ...params,
      orderBy: 'id',
      sortedBy: 'desc',
      include: Helper.convertIncludes(['user']),
      search: Helper.convertParamSearchConvert({
        name: params.name,
      }),
    },
  });
}

export function update(data = {}) {
  return request(`/v1/service-pack-update-status-admin/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export function remove(data = {}) {
  return request(`/v1/service-packs/${data.id}`, {
    method: 'DELETE',
  });
}
