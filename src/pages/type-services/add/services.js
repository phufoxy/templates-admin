import request from '@/utils/request';

export function add(data = {}) {
  return request('/v1/service-pack-types', {
    method: 'POST',
    data,
  });
}

export function update(data = {}) {
  return request(`/v1/service-pack-types/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export function details(params = {}) {
  return request(`/v1/service-pack-types/${params.id}`, {
    method: 'GET',
    params,
  });
}
