import request from '@/utils/request';

export function add(data = {}) {
  return request('/v1/home-items', {
    method: 'POST',
    data,
  });
}

export function update(data = {}) {
  return request(`/v1/home-items/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export function details(params = {}) {
  return request(`/v1/home-items/${params.id}`, {
    method: 'GET',
    params,
  });
}
