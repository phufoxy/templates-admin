import request from '@/utils/request';

export function add(data = {}) {
  return request('/v1/cancel-policies', {
    method: 'POST',
    data,
  });
}

export function update(data = {}) {
  return request(`/v1/cancel-policies/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export function details(params = {}) {
  return request(`/v1/cancel-policies/${params.id}`, {
    method: 'GET',
    params,
  });
}
