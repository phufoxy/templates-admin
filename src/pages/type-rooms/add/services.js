import request from '@/utils/request';

export function add(data = {}) {
  return request('/v1/room-types', {
    method: 'POST',
    data,
  });
}

export function update(data = {}) {
  return request(`/v1/room-types/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export function details(params = {}) {
  return request(`/v1/room-types/${params.id}`, {
    method: 'GET',
    params,
  });
}
