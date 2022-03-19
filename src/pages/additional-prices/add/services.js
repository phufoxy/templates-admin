import request from '@/utils/request';

export function add(data = {}) {
  return request('/v1/additional-prices', {
    method: 'POST',
    data,
  });
}

export function update(data = {}) {
  return request(`/v1/additional-prices/${data.id}`, {
    method: 'PUT',
    data,
  });
}

export function details(params = {}) {
  return request(`/v1/additional-prices/${params.id}`, {
    method: 'GET',
    params,
  });
}
