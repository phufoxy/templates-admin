import request from '@/utils/request';

export function add(data = {}) {
  return request('/v1/utilities', {
    method: 'POST',
    data,
  });
}

export function update(data = {}) {
  return request(`/v1/utilities/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export function details(params = {}) {
  return request(`/v1/utilities/${params.id}`, {
    method: 'GET',
    params,
  });
}
