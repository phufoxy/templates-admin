import request from '@/utils/request';

export function add(data = {}) {
  return request('/v1/convenients', {
    method: 'POST',
    data,
  });
}

export function update(data = {}) {
  return request(`/v1/convenients/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export function details(params = {}) {
  return request(`/v1/convenients/${params.id}`, {
    method: 'GET',
    params,
  });
}
