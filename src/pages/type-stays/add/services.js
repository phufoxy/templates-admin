import request from '@/utils/request';

export function add(data = {}) {
  return request('/v1/stay-of-types', {
    method: 'POST',
    data,
  });
}

export function update(data = {}) {
  return request(`/v1/stay-of-types/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export function details(params = {}) {
  return request(`/v1/stay-of-types/${params.id}`, {
    method: 'GET',
    params,
  });
}
