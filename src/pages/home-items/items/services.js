import request from '@/utils/request';

export function get(params = {}) {
  return request('/v1/home-items', {
    method: 'GET',
    params: {
      orderBy: 'numerical_order',
      sortedBy: 'asc',
      ...params,
    },
  });
}

export function remove(id) {
  return request(`/v1/home-items/${id}`, {
    method: 'DELETE',
    parse: true,
  });
}

export function sort(data) {
  return request(`/v1/home-items-sort`, {
    method: 'POST',
    data,
  });
}
