import request from '@/utils/request';

export function add(data = {}) {
  return request('/v1/nations', {
    method: 'POST',
    data,
  });
}

export function update(data = {}) {
  return request(`/v1/nations/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export function details(params = {}) {
  return request(`/v1/nations/${params.id}`, {
    method: 'GET',
    params,
  });
}
